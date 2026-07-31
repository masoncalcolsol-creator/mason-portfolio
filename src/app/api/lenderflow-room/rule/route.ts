import {
  createHash,
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";

import type { DerekRuleProposal, DerekRuleValue } from "@/lib/derek-lenderflow-auth";
import { publishDerekRule } from "@/lib/derek-lenderflow";
import {
  ensureDerekBridgeCredential,
  resolveCanonicalDerekLender,
} from "@/lib/derek-lenderflow-resolver";
import { requestHasLenderFlowAccess } from "@/lib/lenderflow-room-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const CONFIRMATION_TTL_MS = 10 * 60 * 1000;
const NUMERIC_FIELDS = new Set([
  "absoluteMinFico",
  "typicalMinFico",
  "minLoanAmount",
  "maxLoanAmount",
  "typicalMaxLtv",
  "purchaseMaxLtv",
  "cashOutMaxLtv",
]);
const LIST_FIELDS = new Set([
  "loanTypes",
  "statesServed",
  "statesNotServed",
  "propertyTypes",
  "borrowerTypes",
]);
const ALLOWED_FIELDS = new Set([...NUMERIC_FIELDS, ...LIST_FIELDS]);
const ALLOWED_OPERATORS = new Set([
  "equals",
  "minimum",
  "maximum",
  "includes",
  "excludes",
  "not_applicable",
]);

let gmailTokenCache: { token: string; expiresAt: number } | undefined;
const consumedConfirmationTokens = new Map<string, number>();

type PrepareBody = {
  action: "prepare";
  proposal?: Record<string, unknown>;
};

type PublishBody = {
  action: "publish";
  confirmationToken?: string;
  affirmation?: string;
  confirmedBy?: string;
};

type ConfirmationEnvelope = {
  kind: "LENDERFLOW_HUDDLE_CONFIRMATION";
  issuedAt: number;
  expiresAt: number;
  nonce: string;
  proposal: DerekRuleProposal;
};

function clean(value: unknown, max = 500): string {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function slugify(value: string): string {
  return clean(value, 160).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function signingSecret(): string {
  return process.env.LENDERFLOW_ROOM_SIGNING_SECRET
    || process.env.OPENAI_API_KEY
    || process.env.HIVE_GITHUB_TOKEN
    || process.env.GITHUB_TOKEN
    || "";
}

function base64UrlEncode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payload: string): string {
  const secret = signingSecret();
  if (!secret) throw new Error("LenderFlow room signing secret is unavailable.");
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function safeEqualHex(left: string, right: string): boolean {
  if (!/^[a-f0-9]{64}$/i.test(left) || !/^[a-f0-9]{64}$/i.test(right)) return false;
  return timingSafeEqual(Buffer.from(left, "hex"), Buffer.from(right, "hex"));
}

function createConfirmationToken(proposal: DerekRuleProposal): { token: string; expiresAt: number } {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + CONFIRMATION_TTL_MS;
  const envelope: ConfirmationEnvelope = {
    kind: "LENDERFLOW_HUDDLE_CONFIRMATION",
    issuedAt,
    expiresAt,
    nonce: randomUUID(),
    proposal,
  };
  const payload = base64UrlEncode(JSON.stringify(envelope));
  return { token: `${payload}.${signPayload(payload)}`, expiresAt };
}

function verifyConfirmationToken(token: string): ConfirmationEnvelope | null {
  const [payload, suppliedSignature] = String(token || "").split(".");
  if (!payload || !suppliedSignature) return null;
  let expectedSignature = "";
  try {
    expectedSignature = signPayload(payload);
  } catch {
    return null;
  }
  if (!safeEqualHex(suppliedSignature, expectedSignature)) return null;
  try {
    const envelope = JSON.parse(base64UrlDecode(payload)) as ConfirmationEnvelope;
    if (envelope.kind !== "LENDERFLOW_HUDDLE_CONFIRMATION") return null;
    if (!envelope.proposal || envelope.expiresAt < Date.now()) return null;
    return envelope;
  } catch {
    return null;
  }
}

function normalizeValue(fieldKey: string, value: unknown): DerekRuleValue {
  if (NUMERIC_FIELDS.has(fieldKey)) {
    const number = typeof value === "number"
      ? value
      : Number(String(value ?? "").replace(/[$,%\s,]/g, ""));
    if (!Number.isFinite(number)) throw new Error("The proposed rule requires a valid number.");
    if (["absoluteMinFico", "typicalMinFico"].includes(fieldKey) && (number < 300 || number > 850)) {
      throw new Error("FICO must be between 300 and 850.");
    }
    if (["typicalMaxLtv", "purchaseMaxLtv", "cashOutMaxLtv"].includes(fieldKey) && (number < 0 || number > 100)) {
      throw new Error("LTV or CLTV must be between 0 and 100 percent.");
    }
    if (["minLoanAmount", "maxLoanAmount"].includes(fieldKey) && (number <= 0 || number > 100_000_000)) {
      throw new Error("Loan amount must be greater than zero and no more than one hundred million dollars.");
    }
    return number;
  }

  if (LIST_FIELDS.has(fieldKey)) {
    const values = (Array.isArray(value) ? value : [value])
      .map((item) => clean(item, 100))
      .filter(Boolean)
      .slice(0, 50);
    if (!values.length) throw new Error("The proposed inclusion or exclusion is empty.");
    return Array.from(new Set(values));
  }

  throw new Error("That field is not wired into the active matching engine.");
}

function spokenValue(value: DerekRuleValue): string {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null) return "not applicable";
  return String(value);
}

function initialSummary(proposal: Omit<DerekRuleProposal, "spokenSummary">): string {
  const scope = proposal.appliesToAllPrograms
    ? "for all programs"
    : `for the ${proposal.program || "specified"} program`;
  const action = proposal.operator === "minimum"
    ? "set the minimum to"
    : proposal.operator === "maximum"
      ? "set the maximum to"
      : proposal.operator === "includes"
        ? "include"
        : proposal.operator === "excludes"
          ? "exclude"
          : "set to";
  return `Only ${proposal.lenderDisplayName}, ${scope}: ${proposal.fieldKey} ${action} ${spokenValue(proposal.value)}.`;
}

function buildProposal(input: Record<string, unknown>): DerekRuleProposal {
  const serialized = JSON.stringify(input);
  if (/\b(ssn|social security|date of birth|bank account|routing number|account number)\b/i.test(serialized)) {
    throw new Error("Do not include borrower personal or financial information in a lender-wide rule.");
  }

  const lenderDisplayName = clean(input.lenderDisplayName, 160);
  if (!lenderDisplayName) throw new Error("Which lender are we changing?");
  const fieldKey = clean(input.fieldKey, 80);
  if (!ALLOWED_FIELDS.has(fieldKey)) throw new Error("That field is not wired into the active matching engine.");
  const operator = clean(input.operator, 40) as DerekRuleProposal["operator"];
  if (!ALLOWED_OPERATORS.has(operator)) throw new Error("The rule needs a supported minimum, maximum, exact, inclusion, or exclusion operator.");
  const appliesToAllPrograms = input.appliesToAllPrograms !== false;
  const program = appliesToAllPrograms ? null : clean(input.program, 120) || null;
  if (!appliesToAllPrograms && !program) throw new Error("Program-specific rules require a program name.");
  const temporary = Boolean(input.temporary);
  const expiresAt = temporary ? clean(input.expiresAt, 30) || null : null;
  if (temporary && (!expiresAt || !/^\d{4}-\d{2}-\d{2}$/.test(expiresAt) || new Date(`${expiresAt}T23:59:59Z`).getTime() <= Date.now())) {
    throw new Error("Temporary rules require a future expiration date in YYYY-MM-DD format.");
  }

  const base: Omit<DerekRuleProposal, "spokenSummary"> = {
    lenderDisplayName,
    lenderSlug: slugify(clean(input.lenderSlug, 160) || lenderDisplayName),
    fieldKey,
    operator,
    value: normalizeValue(fieldKey, input.value),
    program,
    appliesToAllPrograms,
    temporary,
    expiresAt,
    note: clean(input.note, 220) || "Broker voice correction after exact read-back and explicit confirmation.",
  };
  return { ...base, spokenSummary: initialSummary(base) };
}

function isAffirmative(value: string): boolean {
  const normalized = clean(value, 140).toLowerCase().replace(/[.!?]+$/g, "");
  return /^(yes|yeah|yep|correct|approved?|confirm|confirmed|do it|publish it|go ahead|that is right|that's right|looks right|make the change)(\b|$)/.test(normalized);
}

function base64UrlEmail(value: string): string {
  return Buffer.from(value, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function googleAccessToken(): Promise<string> {
  if (gmailTokenCache && gmailTokenCache.expiresAt > Date.now() + 60_000) return gmailTokenCache.token;
  const clientId = process.env.GRAY_MATTER_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || "";
  const clientSecret = process.env.GRAY_MATTER_GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET || "";
  const refreshToken = process.env.GRAY_MATTER_GOOGLE_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN || "";
  if (!clientId || !clientSecret || !refreshToken) throw new Error("Gmail OAuth is not configured for LenderFlow receipts.");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Gmail OAuth preflight failed with HTTP ${response.status}.`);
  const data = await response.json() as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error("Gmail OAuth preflight returned no access token.");
  gmailTokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + Math.max(300, data.expires_in || 3600) * 1000,
  };
  return data.access_token;
}

async function sendFallbackReceiptEmail(input: {
  reference: string;
  ruleId?: string;
  proposal: DerekRuleProposal;
  error?: string;
}): Promise<string> {
  const token = await googleAccessToken();
  const from = process.env.GRAY_MATTER_GMAIL_USER || process.env.NEURAXIS_GMAIL_USER || "NULLWORKS.Neuraxis@gmail.com";
  const to = process.env.DEREK_LENDERFLOW_RECEIPT_EMAIL || from;
  const subject = `PUBLISHED — Derek LenderFlow rule ${input.reference}`;
  const body = [
    `Reference: ${input.reference}`,
    "Status: PUBLISHED",
    "Confirmed through: Permanent LenderFlow Huddle",
    `Rule: ${input.proposal.spokenSummary}`,
    `LenderFlow rule ID: ${input.ruleId || "not returned"}`,
    `Secondary receipt retry reason: ${input.error || "primary email receipt was not confirmed"}`,
    "Raw audio retained: no",
    "Raw transcript retained: no",
  ].join("\n");
  const raw = base64UrlEmail([
    `From: ${from}`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${input.reference.toLowerCase()}-huddle@lenderflow.nullworks>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    body,
  ].join("\r\n"));
  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ raw }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Gmail fallback receipt failed with HTTP ${response.status}.`);
  const data = await response.json() as { id?: string };
  if (!data.id) throw new Error("Gmail fallback receipt returned no message ID.");
  return data.id;
}

function cleanConsumedTokens(): void {
  const now = Date.now();
  for (const [hash, expiresAt] of consumedConfirmationTokens.entries()) {
    if (expiresAt < now) consumedConfirmationTokens.delete(hash);
  }
}

export async function POST(request: Request): Promise<Response> {
  if (!requestHasLenderFlowAccess(request)) {
    return Response.json({ ok: false, mutationPerformed: false, error: "LenderFlow room access expired." }, { status: 401 });
  }

  const vercelOidcToken = request.headers.get("x-vercel-oidc-token") || "";
  if (vercelOidcToken) process.env.LF_ADMIN_KEY = vercelOidcToken;
  if (!ensureDerekBridgeCredential()) {
    return Response.json({ ok: false, mutationPerformed: false, error: "The LenderFlow service identity is unavailable." }, { status: 503 });
  }

  let body: PrepareBody | PublishBody;
  try {
    body = await request.json() as PrepareBody | PublishBody;
  } catch {
    return Response.json({ ok: false, mutationPerformed: false, error: "Invalid rule request." }, { status: 400 });
  }

  if (body.action === "prepare") {
    try {
      const proposal = buildProposal(body.proposal || {});
      const canonical = await resolveCanonicalDerekLender(proposal, proposal.lenderDisplayName);
      if (!canonical.ok) {
        return Response.json({ ok: false, mutationPerformed: false, clarification: canonical.clarification }, { status: 422 });
      }
      const confirmation = createConfirmationToken(canonical.proposal);
      return Response.json({
        ok: true,
        mutationPerformed: false,
        exactLenderMatch: true,
        spokenSummary: canonical.proposal.spokenSummary,
        confirmationToken: confirmation.token,
        expiresAt: new Date(confirmation.expiresAt).toISOString(),
        instruction: "Read the spoken summary exactly, then ask for a separate explicit yes or no.",
      });
    } catch (error) {
      return Response.json({
        ok: false,
        mutationPerformed: false,
        clarification: error instanceof Error ? error.message : "The proposed rule is incomplete.",
      }, { status: 422 });
    }
  }

  if (body.action !== "publish") {
    return Response.json({ ok: false, mutationPerformed: false, error: "Unsupported rule action." }, { status: 400 });
  }

  const confirmation = verifyConfirmationToken(body.confirmationToken || "");
  if (!confirmation) {
    return Response.json({ ok: false, mutationPerformed: false, error: "The prepared rule expired or failed verification. Prepare it again." }, { status: 409 });
  }
  if (!isAffirmative(body.affirmation || "")) {
    return Response.json({ ok: false, mutationPerformed: false, error: "No separate explicit approval was detected. Nothing changed." }, { status: 409 });
  }

  cleanConsumedTokens();
  const tokenHash = createHash("sha256").update(body.confirmationToken || "", "utf8").digest("hex");
  if (consumedConfirmationTokens.has(tokenHash)) {
    return Response.json({ ok: false, mutationPerformed: false, error: "That confirmation was already used. Nothing was published twice." }, { status: 409 });
  }

  try {
    // Stop before mutation unless the notification channel can authenticate.
    await googleAccessToken();
  } catch (error) {
    return Response.json({
      ok: false,
      mutationPerformed: false,
      error: error instanceof Error ? error.message : "The receipt email channel is unavailable. Nothing changed.",
    }, { status: 503 });
  }

  consumedConfirmationTokens.set(tokenHash, confirmation.expiresAt);
  const confirmedBy = clean(body.confirmedBy, 80) || "Authorized LenderFlow room participant";
  const result = await publishDerekRule({
    proposal: confirmation.proposal,
    callSid: `HUDDLE-${tokenHash.slice(0, 24)}`,
    caller: "",
    spokenCommand: confirmation.proposal.spokenSummary,
  });

  if (!result.ok) {
    consumedConfirmationTokens.delete(tokenHash);
    return Response.json({
      ok: false,
      mutationPerformed: false,
      reference: result.reference,
      hiveReceiptConfirmed: Boolean(result.hiveReceiptUrl),
      emailReceiptConfirmed: Boolean(result.emailMessageId),
      error: result.error || "LenderFlow rejected the write. Nothing changed.",
    }, { status: 502 });
  }

  let emailMessageId = result.emailMessageId;
  let emailRetryError = "";
  if (!emailMessageId) {
    try {
      emailMessageId = await sendFallbackReceiptEmail({
        reference: result.reference,
        ruleId: result.ruleId,
        proposal: confirmation.proposal,
        error: "Primary receipt delivery was not confirmed.",
      });
    } catch (error) {
      emailRetryError = error instanceof Error ? error.message : "Fallback receipt email failed.";
    }
  }

  return Response.json({
    ok: true,
    mutationPerformed: true,
    confirmedBy,
    reference: result.reference,
    ruleId: result.ruleId,
    spokenSummary: confirmation.proposal.spokenSummary,
    hiveReceiptConfirmed: Boolean(result.hiveReceiptUrl),
    emailReceiptConfirmed: Boolean(emailMessageId),
    emailMessageId: emailMessageId || null,
    warning: emailMessageId ? null : `The rule changed, but the receipt email could not be confirmed: ${emailRetryError || "unknown email failure"}`,
  });
}
