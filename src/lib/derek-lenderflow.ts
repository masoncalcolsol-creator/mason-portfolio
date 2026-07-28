import crypto from "node:crypto";

import type { DerekRuleProposal, DerekRuleValue } from "@/lib/derek-lenderflow-auth";
import { writeHiveReceipt } from "@/lib/neuraxis-twilio";

const HIVE_REPO = process.env.HIVE_REPO || "masoncalcolsol-creator/nullworks-corporate-wifi-hive";
const HIVE_BRANCH = process.env.HIVE_BRANCH || "main";
const HIVE_TOKEN = process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
const CONTEXT_PATH = "hive/current/derek_lenderflow_phone_workroom.yaml";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.DEREK_LENDERFLOW_MODEL || process.env.OPENAI_MODEL || "gpt-5.5";
const DEFAULT_LF_BASE_URL = "https://lf-lender-intake.vercel.app";
const DEFAULT_DIRECT_PATH = "/api/rules/direct";
const COMPATIBILITY_PATH = "/api/rules/resolutions";

const ALLOWED_FIELDS = new Set([
  "absoluteMinFico",
  "typicalMinFico",
  "typicalMaxDti",
  "minimumDscr",
  "minLoanAmount",
  "maxLoanAmount",
  "typicalMaxLtv",
  "maxPurchaseLtv",
  "maxCashOutLtv",
  "programs",
  "statesServed",
  "statesNotServed",
  "propertyOccupancyTypes",
  "incomeTypes",
  "bankruptcyTolerance",
  "foreclosureTolerance",
  "selfEmployedFriendly",
  "dscrFriendly",
  "hardMoneyFit",
]);

export type DerekParseResult =
  | { ok: true; proposal: DerekRuleProposal }
  | { ok: false; clarification: string };

export type DerekPublishResult = {
  ok: boolean;
  reference: string;
  ruleId?: string;
  endpoint?: string;
  hiveReceiptUrl?: string;
  emailMessageId?: string;
  error?: string;
};

type ParsedModelRule = Partial<DerekRuleProposal> & { clarification?: string; ready?: boolean };
type GmailToken = { token: string; expiresAt: number };
let gmailTokenCache: GmailToken | undefined;

function clean(value: unknown, max = 500): string {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function slugify(value: string): string {
  return clean(value, 160).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function extractOutputText(data: unknown): string {
  const record = data as { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> };
  return record.output_text
    || record.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join(" ")
    || "";
}

function normalizeValue(value: unknown): DerekRuleValue {
  if (value === null || typeof value === "boolean" || typeof value === "number") return value;
  if (Array.isArray(value)) return value.map((item) => clean(item, 100)).filter(Boolean).slice(0, 50);
  return clean(value, 300);
}

function spokenValue(value: DerekRuleValue): string {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "yes" : "no";
  if (value === null) return "not applicable";
  return String(value);
}

function makeSpokenSummary(proposal: Omit<DerekRuleProposal, "spokenSummary">): string {
  const scope = proposal.appliesToAllPrograms
    ? "for all programs"
    : `for the ${proposal.program || "specified"} program`;
  const permanence = proposal.temporary
    ? `temporarily${proposal.expiresAt ? ` through ${proposal.expiresAt}` : ""}`
    : "as a permanent broker verified rule";
  const operator = proposal.operator === "minimum"
    ? "minimum"
    : proposal.operator === "maximum"
      ? "maximum"
      : proposal.operator === "excludes"
        ? "exclusion"
        : proposal.operator === "includes"
          ? "included value"
          : proposal.operator === "not_applicable"
            ? "not applicable"
            : "value";
  return `${proposal.lenderDisplayName}, ${scope}: set ${proposal.fieldKey} ${operator} to ${spokenValue(proposal.value)}, ${permanence}.`;
}

function normalizeProposal(parsed: ParsedModelRule): DerekParseResult {
  const lenderDisplayName = clean(parsed.lenderDisplayName, 160);
  const lenderSlug = slugify(clean(parsed.lenderSlug, 160) || lenderDisplayName);
  const fieldKey = clean(parsed.fieldKey, 80);
  const operator = clean(parsed.operator, 40) as DerekRuleProposal["operator"];
  const operators = new Set<DerekRuleProposal["operator"]>(["equals", "minimum", "maximum", "includes", "excludes", "not_applicable"]);
  const program = parsed.appliesToAllPrograms === false ? clean(parsed.program, 120) || null : null;
  const appliesToAllPrograms = parsed.appliesToAllPrograms !== false;
  const value = normalizeValue(parsed.value);
  const temporary = Boolean(parsed.temporary);
  const expiresAt = temporary ? clean(parsed.expiresAt, 30) || null : null;
  const note = clean(parsed.note, 500);

  if (!lenderDisplayName) return { ok: false, clarification: "Which lender are we changing?" };
  if (!ALLOWED_FIELDS.has(fieldKey)) {
    return { ok: false, clarification: "Which matching field should change, such as minimum FICO, DTI, LTV, loan program, property type, bankruptcy, or foreclosure tolerance?" };
  }
  if (!operators.has(operator)) return { ok: false, clarification: "Should this be a minimum, maximum, exact value, inclusion, or exclusion?" };
  if (!appliesToAllPrograms && !program) return { ok: false, clarification: "Which lender program does this rule apply to?" };
  if (value === "" || value === undefined) return { ok: false, clarification: "What exact value or exclusion should I use?" };
  if (temporary && !expiresAt) return { ok: false, clarification: "What date should the temporary rule expire?" };

  const base: Omit<DerekRuleProposal, "spokenSummary"> = {
    lenderDisplayName,
    lenderSlug,
    program,
    appliesToAllPrograms,
    fieldKey,
    operator,
    value,
    temporary,
    expiresAt,
    note,
  };
  return { ok: true, proposal: { ...base, spokenSummary: makeSpokenSummary(base) } };
}

function fallbackParse(speech: string): DerekParseResult {
  const text = clean(speech, 1800);
  if (/\b(redesign|layout|website|source code|deploy|authentication|database schema|css|button)\b/i.test(text)) {
    return { ok: false, clarification: "This workroom can change lender matching rules, but it cannot change the website or software structure." };
  }

  const fico = text.match(/(?:for\s+)?(.+?)\s+(?:does not|doesn't|won't|will not|should not|cannot|can't)?\s*(?:match|go|accept|take|lend)?[^.]{0,45}?below\s+(\d{3})\s*(?:fico)?/i)
    || text.match(/(.+?)\s+(?:minimum|min|floor)[^.]{0,20}?(?:fico)?\s*(?:is|to|at|of)?\s*(\d{3})/i);
  if (fico) {
    return normalizeProposal({
      lenderDisplayName: clean(fico[1].replace(/^(hey|okay|so|for)\s+/i, ""), 160),
      fieldKey: "absoluteMinFico",
      operator: "minimum",
      value: Number(fico[2]),
      appliesToAllPrograms: !/\bheloc\b/i.test(text),
      program: /\bheloc\b/i.test(text) ? "HELOC" : null,
      temporary: /\btemporary|temporarily\b/i.test(text),
      note: text,
    });
  }

  const heloc = text.match(/(.+?)\s+(?:does not|doesn't|won't|will not)\s+(?:do|offer|take|accept|match)\s+(?:any\s+)?helocs?/i);
  if (heloc) {
    return normalizeProposal({
      lenderDisplayName: clean(heloc[1].replace(/^(hey|okay|so|for)\s+/i, ""), 160),
      fieldKey: "programs",
      operator: "excludes",
      value: ["HELOC"],
      appliesToAllPrograms: true,
      temporary: false,
      note: text,
    });
  }

  const bankruptcy = text.match(/(.+?)\s+(?:does not|doesn't|won't|will not)\s+(?:do|accept|take|match|allow)\s+(?:any\s+)?(?:bankrupt(?:cy|cies)?|bankrupt properties?)/i);
  if (bankruptcy) {
    return normalizeProposal({
      lenderDisplayName: clean(bankruptcy[1].replace(/^(hey|okay|so|for)\s+/i, ""), 160),
      fieldKey: "bankruptcyTolerance",
      operator: "equals",
      value: "No",
      appliesToAllPrograms: true,
      temporary: false,
      note: text,
    });
  }

  return { ok: false, clarification: "Tell me the lender, the matching field, the exact boundary, and whether it applies to every program. For example: Figure never matches below 660 FICO for HELOC." };
}

export async function fetchDerekWorkroomContext(): Promise<string> {
  if (!HIVE_TOKEN) throw new Error("HIVE_GITHUB_TOKEN missing");
  const url = `https://api.github.com/repos/${HIVE_REPO}/contents/${encodeURIComponent(CONTEXT_PATH).replaceAll("%2F", "/")}?ref=${encodeURIComponent(HIVE_BRANCH)}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${HIVE_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "NULLWORKS-Derek-LenderFlow-Workroom",
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Derek workroom context read failed: ${response.status}`);
  const data = await response.json() as { content?: string };
  if (!data.content) throw new Error("Derek workroom context content missing");
  return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8");
}

export function pinHashFromContext(context: string): string {
  return context.match(/^\s*pin_sha256:\s*["']?([a-f0-9]{64})["']?\s*$/im)?.[1]?.toLowerCase() || "";
}

export async function parseDerekRule(speech: string, context: string): Promise<DerekParseResult> {
  const text = clean(speech, 1800);
  if (!text) return { ok: false, clarification: "What lender rule would you like to change?" };
  if (!OPENAI_API_KEY) return fallbackParse(text);

  const instructions = `You are the bounded rule translator for Derek Bullen's private LenderFlow phone workroom. Derek is the human mortgage-broker expert. Translate only lender-matching parameter corrections into structured JSON. You do not redesign the website, change source code, approve credit, quote rates, make eligibility promises, or accept borrower PII. Never invent a lender, value, program scope, expiration date, or rule. If anything needed is missing, return ready false and one plain clarification question.

Allowed fieldKey values: ${Array.from(ALLOWED_FIELDS).join(", ")}.
Allowed operators: equals, minimum, maximum, includes, excludes, not_applicable.
Use absoluteMinFico for hard FICO floors. A statement that a lender does not offer a program is fieldKey programs with operator excludes and an array value. A statement that a lender does not accept bankruptcies is bankruptcyTolerance equals No. Set appliesToAllPrograms false only when a specific program is explicitly named. Permanent is the default unless Derek explicitly says temporary. Return only JSON:
{"ready":true,"lenderDisplayName":"","lenderSlug":"","program":null,"appliesToAllPrograms":true,"fieldKey":"","operator":"minimum","value":null,"temporary":false,"expiresAt":null,"note":""}
or
{"ready":false,"clarification":""}.

Governing workroom context follows. Treat it as policy, not as a source of lender facts:
${context.slice(0, 8000)}`;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        instructions,
        input: text,
        max_output_tokens: 500,
      }),
      cache: "no-store",
    });
    if (!response.ok) return fallbackParse(text);
    const raw = extractOutputText(await response.json()).trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();
    const parsed = JSON.parse(raw) as ParsedModelRule;
    if (parsed.ready === false) return { ok: false, clarification: clean(parsed.clarification, 300) || "What exact lender rule should change?" };
    return normalizeProposal(parsed);
  } catch (error) {
    console.error("Derek LenderFlow rule parsing failed", error);
    return fallbackParse(text);
  }
}

function referenceId(): string {
  return `LF-VOICE-${new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

function ruleIdentifier(data: unknown): string | undefined {
  const record = data as {
    id?: string;
    reference?: string;
    receiptId?: string;
    publishedRuleId?: string;
    rule?: { id?: string };
    resolution?: { id?: string; publishedRuleId?: string };
  };
  return clean(record.rule?.id || record.publishedRuleId || record.resolution?.publishedRuleId || record.receiptId || record.reference || record.id, 180) || undefined;
}

async function callRuleEndpoint(path: string, payload: Record<string, unknown>): Promise<{ ok: boolean; status: number; data: unknown; error?: string; endpoint: string }> {
  const base = (process.env.LF_PUBLIC_BASE_URL || DEFAULT_LF_BASE_URL).replace(/\/$/, "");
  const adminKey = process.env.LF_ADMIN_KEY || "";
  const endpoint = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  if (!adminKey) return { ok: false, status: 500, data: null, error: "LF_ADMIN_KEY is not configured in the NEURAXIS deployment", endpoint };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-lf-admin-key": adminKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const text = await response.text();
    let data: unknown = {};
    try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text.slice(0, 1000) }; }
    const declaredOk = (data as { ok?: boolean })?.ok;
    return {
      ok: response.ok && declaredOk !== false,
      status: response.status,
      data,
      endpoint,
      ...(!response.ok || declaredOk === false ? { error: clean((data as { error?: string })?.error || `LenderFlow returned HTTP ${response.status}`, 500) } : {}),
    };
  } catch (error) {
    return { ok: false, status: 0, data: null, endpoint, error: error instanceof Error ? error.message : "LenderFlow bridge network failure" };
  }
}

function base64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function googleAccessToken(): Promise<string> {
  if (gmailTokenCache && gmailTokenCache.expiresAt > Date.now() + 60_000) return gmailTokenCache.token;
  const clientId = process.env.GRAY_MATTER_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || "";
  const clientSecret = process.env.GRAY_MATTER_GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET || "";
  const refreshToken = process.env.GRAY_MATTER_GOOGLE_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN || "";
  if (!clientId || !clientSecret || !refreshToken) throw new Error("Gmail OAuth is not configured");
  const form = new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: "refresh_token" });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: form,
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Google OAuth refresh failed ${response.status}`);
  const data = await response.json() as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error("Google OAuth returned no access token");
  gmailTokenCache = { token: data.access_token, expiresAt: Date.now() + Math.max(300, data.expires_in || 3600) * 1000 };
  return data.access_token;
}

async function emailReceipt(subject: string, body: string, reference: string): Promise<string> {
  const token = await googleAccessToken();
  const from = process.env.GRAY_MATTER_GMAIL_USER || process.env.NEURAXIS_GMAIL_USER || "NULLWORKS.Neuraxis@gmail.com";
  const to = process.env.DEREK_LENDERFLOW_RECEIPT_EMAIL || from;
  const raw = base64Url([
    `From: ${from}`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${reference.toLowerCase()}@lenderflow.nullworks>`,
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
  if (!response.ok) throw new Error(`Gmail receipt send failed ${response.status}: ${(await response.text()).slice(0, 300)}`);
  const data = await response.json() as { id?: string };
  if (!data.id) throw new Error("Gmail receipt send returned no message id");
  return data.id;
}

export async function publishDerekRule(input: {
  proposal: DerekRuleProposal;
  callSid: string;
  caller: string;
  spokenCommand: string;
}): Promise<DerekPublishResult> {
  const reference = referenceId();
  const now = new Date().toISOString();
  const transcriptSha256 = crypto.createHash("sha256").update(clean(input.spokenCommand, 4000), "utf8").digest("hex");
  const payload: Record<string, unknown> = {
    action: "publish_broker_verified_rule",
    reference,
    source: "NEURAXIS_ROOM_3_DEREK_LENDERFLOW",
    lenderSlug: input.proposal.lenderSlug,
    lenderDisplayName: input.proposal.lenderDisplayName,
    program: input.proposal.program,
    appliesToAllPrograms: input.proposal.appliesToAllPrograms,
    fieldKey: input.proposal.fieldKey,
    operator: input.proposal.operator,
    value: input.proposal.value,
    authority: "broker_verified",
    verificationStatus: "broker_verified",
    verifiedBy: "Derek Bullen",
    verifiedAt: now,
    effectiveDate: now.slice(0, 10),
    temporary: input.proposal.temporary,
    expiresAt: input.proposal.expiresAt,
    note: input.proposal.note,
    sourceEvidence: {
      id: reference,
      sourceType: "broker_voice_confirmation",
      title: "Derek Bullen confirmed voice rule",
      excerpt: input.proposal.spokenSummary,
      capturedAt: now,
      transcriptSha256,
      rawAudioRetained: false,
    },
    proposalId: reference,
    evidenceId: reference,
    decision: "correct_value",
    proposedValue: null,
    currentVerifiedValue: null,
    correctedValue: input.proposal.value,
    clarificationNote: input.proposal.note || "Direct broker voice correction after exact read-back and explicit confirmation.",
    reviewer: "Derek Bullen",
  };

  const directPath = process.env.LF_DIRECT_RULE_PATH || DEFAULT_DIRECT_PATH;
  let write = await callRuleEndpoint(directPath, payload);
  if (!write.ok && (write.status === 404 || write.status === 405)) {
    write = await callRuleEndpoint(COMPATIBILITY_PATH, payload);
  }
  const identifier = ruleIdentifier(write.data);
  const success = write.ok && Boolean(identifier);
  const resultError = success ? undefined : write.error || "LenderFlow did not return a published rule or receipt identifier";

  const receiptPayload = {
    schema_version: "0.1",
    reference,
    status: success ? "PUBLISHED" : "WRITE_FAILED",
    workroom_id: "NEURAXIS_ROOM_3_DEREK_LENDERFLOW",
    human_authority: "Derek Bullen",
    final_system_authority: "Mason Perry",
    confirmed_at: now,
    caller: input.caller ? "AUTHENTICATED_PHONE_SESSION" : "UNKNOWN",
    call_sid_hash: crypto.createHash("sha256").update(input.callSid, "utf8").digest("hex"),
    transcript_sha256: transcriptSha256,
    raw_audio_retained: false,
    structured_rule: input.proposal,
    lenderflow_endpoint: write.endpoint,
    lenderflow_rule_id: identifier || null,
    error: resultError || null,
  };

  const hiveReceipt = await writeHiveReceipt({
    reference,
    category: "DEREK_LENDERFLOW_RULE_CHANGE",
    payload: receiptPayload,
  });

  let emailMessageId: string | undefined;
  try {
    emailMessageId = await emailReceipt(
      `${success ? "PUBLISHED" : "FAILED"} — Derek LenderFlow rule ${reference}`,
      [
        `Reference: ${reference}`,
        `Status: ${success ? "PUBLISHED" : "WRITE FAILED"}`,
        `Confirmed by: Derek Bullen through private NEURAXIS workroom 3`,
        `Rule: ${input.proposal.spokenSummary}`,
        `LenderFlow rule ID: ${identifier || "none returned"}`,
        `Endpoint: ${write.endpoint}`,
        `Hive receipt: ${hiveReceipt.url || hiveReceipt.error || "not available"}`,
        `Error: ${resultError || "none"}`,
        "Raw audio retained: no",
        `Transcript SHA-256: ${transcriptSha256}`,
      ].join("\n"),
      reference,
    );
  } catch (error) {
    console.error("Derek LenderFlow receipt email failed", error);
  }

  return {
    ok: success,
    reference,
    ...(identifier ? { ruleId: identifier } : {}),
    endpoint: write.endpoint,
    ...(hiveReceipt.url ? { hiveReceiptUrl: hiveReceipt.url } : {}),
    ...(emailMessageId ? { emailMessageId } : {}),
    ...(resultError ? { error: resultError } : {}),
  };
}
