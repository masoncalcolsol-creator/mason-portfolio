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

const HARD_MATCH_FIELDS = new Set([
  "absoluteMinFico",
  "typicalMinFico",
  "minLoanAmount",
  "maxLoanAmount",
  "typicalMaxLtv",
  "purchaseMaxLtv",
  "cashOutMaxLtv",
  "loanTypes",
  "statesServed",
  "statesNotServed",
  "propertyTypes",
  "borrowerTypes",
]);

const FIELD_LABELS: Record<string, string> = {
  absoluteMinFico: "hard minimum FICO",
  typicalMinFico: "typical minimum FICO",
  minLoanAmount: "minimum loan amount",
  maxLoanAmount: "maximum loan amount",
  typicalMaxLtv: "typical maximum LTV or CLTV",
  purchaseMaxLtv: "purchase maximum LTV",
  cashOutMaxLtv: "cash-out maximum LTV",
  loanTypes: "supported loan programs",
  statesServed: "served states",
  statesNotServed: "excluded states",
  propertyTypes: "supported property types",
  borrowerTypes: "supported borrower or income profiles",
};

const STATE_ABBREVIATIONS: Record<string, string> = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA",
  colorado: "CO", connecticut: "CT", delaware: "DE", florida: "FL", georgia: "GA",
  hawaii: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA",
  kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD",
  massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS", missouri: "MO",
  montana: "MT", nebraska: "NE", nevada: "NV", "new hampshire": "NH", "new jersey": "NJ",
  "new mexico": "NM", "new york": "NY", "north carolina": "NC", "north dakota": "ND",
  ohio: "OH", oklahoma: "OK", oregon: "OR", pennsylvania: "PA", "rhode island": "RI",
  "south carolina": "SC", "south dakota": "SD", tennessee: "TN", texas: "TX", utah: "UT",
  vermont: "VT", virginia: "VA", washington: "WA", "west virginia": "WV", wisconsin: "WI",
  wyoming: "WY", "district of columbia": "DC",
};

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

function normalizeState(value: unknown): string {
  const text = clean(value, 80);
  if (/^[a-z]{2}$/i.test(text)) return text.toUpperCase();
  return STATE_ABBREVIATIONS[text.toLowerCase()] || "";
}

function normalizeValue(fieldKey: string, operator: DerekRuleProposal["operator"], value: unknown): DerekRuleValue {
  if (["absoluteMinFico", "typicalMinFico", "minLoanAmount", "maxLoanAmount", "typicalMaxLtv", "purchaseMaxLtv", "cashOutMaxLtv"].includes(fieldKey)) {
    const number = typeof value === "number" ? value : Number(String(value ?? "").replace(/[$,%\s,]/g, ""));
    return Number.isFinite(number) ? number : null;
  }

  if (["loanTypes", "statesServed", "statesNotServed", "propertyTypes", "borrowerTypes"].includes(fieldKey)) {
    const raw = Array.isArray(value) ? value : [value];
    const normalized = raw
      .map((item) => fieldKey.startsWith("states") ? normalizeState(item) : clean(item, 100))
      .filter(Boolean)
      .slice(0, 50);
    return Array.from(new Set(normalized));
  }

  if (value === null || typeof value === "boolean" || typeof value === "number") return value;
  if (Array.isArray(value)) return value.map((item) => clean(item, 100)).filter(Boolean).slice(0, 50);
  if (operator === "not_applicable") return null;
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
    : "as a permanent broker-verified rule";
  const operator = proposal.operator === "minimum"
    ? "minimum"
    : proposal.operator === "maximum"
      ? "maximum"
      : proposal.operator === "excludes"
        ? "exclude"
        : proposal.operator === "includes"
          ? "include"
          : proposal.operator === "not_applicable"
            ? "mark not applicable"
            : "set";
  const label = FIELD_LABELS[proposal.fieldKey] || proposal.fieldKey;
  return `${proposal.lenderDisplayName}, ${scope}: ${operator} ${label} ${spokenValue(proposal.value)}, ${permanence}.`;
}

function invalidRange(fieldKey: string, value: DerekRuleValue): string | null {
  if (typeof value !== "number") return null;
  if (["absoluteMinFico", "typicalMinFico"].includes(fieldKey) && (value < 300 || value > 850)) {
    return "FICO must be between 300 and 850.";
  }
  if (["typicalMaxLtv", "purchaseMaxLtv", "cashOutMaxLtv"].includes(fieldKey) && (value < 0 || value > 100)) {
    return "LTV or CLTV must be between 0 and 100 percent.";
  }
  if (["minLoanAmount", "maxLoanAmount"].includes(fieldKey) && (value <= 0 || value > 100_000_000)) {
    return "Loan amount must be greater than zero and no more than one hundred million dollars.";
  }
  return null;
}

function deferredMatcherRequest(text: string): string | null {
  if (/\b(dti|debt[- ]?to[- ]?income)\b/i.test(text)) return "DTI is stored in the lender profile, but the current matcher does not calculate DTI yet. I will not claim that change affects matching until the matcher is upgraded.";
  if (/\b(dscr|debt service coverage)\b/i.test(text)) return "DSCR appetite is stored in the lender profile, but the current scenario matcher does not calculate DSCR yet. No matching rule was changed.";
  if (/\b(bankrupt|bankruptcy)\b/i.test(text)) return "Bankruptcy tolerance is not yet wired to a structured borrower field in the active matcher. No matching rule was changed.";
  if (/\bforeclosure\b/i.test(text)) return "Foreclosure tolerance is not yet wired to a structured borrower field in the active matcher. No matching rule was changed.";
  if (/\bself[- ]?employed\b/i.test(text)) return "Self-employed appetite is not yet a hard exclusion in the active matcher. No matching rule was changed.";
  if (/\b(hard money|private money)\b/i.test(text)) return "Hard-money appetite is not yet a hard exclusion in the active matcher. No matching rule was changed.";
  return null;
}

function containsBorrowerSpecificData(text: string): boolean {
  return /\b(ssn|social security number|date of birth|dob|borrower named|client named|customer named|home address|account number)\b/i.test(text);
}

function normalizeProposal(parsed: ParsedModelRule): DerekParseResult {
  const lenderDisplayName = clean(parsed.lenderDisplayName, 160);
  const lenderSlug = slugify(clean(parsed.lenderSlug, 160) || lenderDisplayName);
  const fieldKey = clean(parsed.fieldKey, 80);
  const operator = clean(parsed.operator, 40) as DerekRuleProposal["operator"];
  const operators = new Set<DerekRuleProposal["operator"]>(["equals", "minimum", "maximum", "includes", "excludes", "not_applicable"]);
  const program = parsed.appliesToAllPrograms === false ? clean(parsed.program, 120) || null : null;
  const appliesToAllPrograms = parsed.appliesToAllPrograms !== false;
  const value = normalizeValue(fieldKey, operator, parsed.value);
  const temporary = Boolean(parsed.temporary);
  const expiresAt = temporary ? clean(parsed.expiresAt, 30) || null : null;
  const note = clean(parsed.note, 220) || "Broker voice correction after exact read-back and explicit confirmation.";

  if (!lenderDisplayName) return { ok: false, clarification: "Which lender are we changing?" };
  if (!HARD_MATCH_FIELDS.has(fieldKey)) {
    return { ok: false, clarification: "That field is not wired into the active matching engine. I can currently change FICO, loan amount, LTV or CLTV, loan programs, states, property types, and borrower or income-profile categories." };
  }
  if (!operators.has(operator)) return { ok: false, clarification: "Should this be a minimum, maximum, exact value, inclusion, or exclusion?" };
  if (!appliesToAllPrograms && !program) return { ok: false, clarification: "Which lender program does this rule apply to?" };
  if (value === "" || value === undefined || value === null) return { ok: false, clarification: "What exact value or exclusion should I use?" };
  if (Array.isArray(value) && !value.length) return { ok: false, clarification: "What exact program, state, property type, or borrower profile should I include or exclude?" };
  if (temporary && !expiresAt) return { ok: false, clarification: "What date should the temporary rule expire?" };
  if (temporary && expiresAt && (!/^\d{4}-\d{2}-\d{2}$/.test(expiresAt) || new Date(`${expiresAt}T23:59:59Z`).getTime() <= Date.now())) {
    return { ok: false, clarification: "Give me a future expiration date in month, day, and year." };
  }
  const rangeError = invalidRange(fieldKey, value);
  if (rangeError) return { ok: false, clarification: rangeError };

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
  if (containsBorrowerSpecificData(text)) {
    return { ok: false, clarification: "Do not give me borrower personal information. State only the lender-wide or program-wide matching rule." };
  }
  const deferred = deferredMatcherRequest(text);
  if (deferred) return { ok: false, clarification: deferred };

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
      note: "Broker voice correction after exact read-back and explicit confirmation.",
    });
  }

  const heloc = text.match(/(.+?)\s+(?:does not|doesn't|won't|will not)\s+(?:do|offer|take|accept|match)\s+(?:any\s+)?helocs?/i);
  if (heloc) {
    return normalizeProposal({
      lenderDisplayName: clean(heloc[1].replace(/^(hey|okay|so|for)\s+/i, ""), 160),
      fieldKey: "loanTypes",
      operator: "excludes",
      value: ["HELOC"],
      appliesToAllPrograms: true,
      temporary: false,
      note: "Broker voice correction after exact read-back and explicit confirmation.",
    });
  }

  const stateExclusion = text.match(/(.+?)\s+(?:does not|doesn't|won't|will not)\s+(?:lend|operate|match|serve)\s+(?:in\s+)?([a-z ]{2,30})/i);
  if (stateExclusion && normalizeState(stateExclusion[2])) {
    return normalizeProposal({
      lenderDisplayName: clean(stateExclusion[1].replace(/^(hey|okay|so|for)\s+/i, ""), 160),
      fieldKey: "statesNotServed",
      operator: "includes",
      value: [normalizeState(stateExclusion[2])],
      appliesToAllPrograms: true,
      temporary: false,
      note: "Broker voice correction after exact read-back and explicit confirmation.",
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
  if (containsBorrowerSpecificData(text)) return { ok: false, clarification: "Do not give me borrower personal information. State only the lender-wide or program-wide matching rule." };
  const deferred = deferredMatcherRequest(text);
  if (deferred) return { ok: false, clarification: deferred };
  if (!OPENAI_API_KEY) return fallbackParse(text);

  const instructions = `You are the bounded rule translator for Derek Bullen's private LenderFlow phone workroom. Derek is the human mortgage-broker expert. Translate only lender-wide or program-wide matching corrections into structured JSON. Never accept borrower PII or borrower-specific exceptions. You do not redesign the website, change source code, approve credit, quote rates, or make eligibility promises. Never invent a lender, value, program scope, expiration date, or rule. If anything needed is missing, return ready false and one plain clarification question.

Allowed active fieldKey values: ${Array.from(HARD_MATCH_FIELDS).join(", ")}.
Allowed operators: equals, minimum, maximum, includes, excludes, not_applicable.
Use absoluteMinFico for a hard FICO floor. Use loanTypes with excludes for a program the lender does not offer. Use statesNotServed with includes for an excluded state. Use propertyTypes for property categories and borrowerTypes for income or borrower-profile categories. State values must be two-letter US abbreviations. Set appliesToAllPrograms false only when a specific program is explicitly named. Permanent is the default unless Derek explicitly says temporary. The note must be a short generic rationale and must not repeat the full transcript or contain borrower data. Return only JSON:
{"ready":true,"lenderDisplayName":"","lenderSlug":"","program":null,"appliesToAllPrograms":true,"fieldKey":"","operator":"minimum","value":null,"temporary":false,"expiresAt":null,"note":"Broker voice correction after exact read-back and explicit confirmation."}
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

function responseRecord(data: unknown): Record<string, unknown> {
  return data && typeof data === "object" ? data as Record<string, unknown> : {};
}

function ruleIdentifier(data: unknown): string | undefined {
  const record = responseRecord(data);
  const rule = responseRecord(record.rule);
  const resolution = responseRecord(record.resolution);
  return clean(rule.id || record.publishedRuleId || resolution.publishedRuleId || record.receiptId || record.reference || record.id, 180) || undefined;
}

function exactLenderMatch(data: unknown): boolean {
  const record = responseRecord(data);
  const resolved = responseRecord(record.resolvedLender);
  return record.exactLenderMatch === true && Boolean(clean(resolved.slug || record.resolvedLenderSlug, 180));
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
    const declaredOk = responseRecord(data).ok;
    return {
      ok: response.ok && declaredOk !== false,
      status: response.status,
      data,
      endpoint,
      ...(!response.ok || declaredOk === false ? { error: clean(responseRecord(data).error || `LenderFlow returned HTTP ${response.status}`, 500) } : {}),
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
  const confirmationSha256 = crypto.createHash("sha256").update(input.proposal.spokenSummary, "utf8").digest("hex");
  const payload: Record<string, unknown> = {
    action: "publish_broker_verified_rule",
    reference,
    source: "NEURAXIS_ROOM_3_DEREK_LENDERFLOW",
    requireExactLenderMatch: true,
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
      structuredConfirmationSha256: confirmationSha256,
      rawAudioRetained: false,
      rawTranscriptRetained: false,
    },
  };

  const directPath = process.env.LF_DIRECT_RULE_PATH || DEFAULT_DIRECT_PATH;
  const write = await callRuleEndpoint(directPath, payload);
  const identifier = ruleIdentifier(write.data);
  const exactMatch = exactLenderMatch(write.data);
  const success = write.ok && Boolean(identifier) && exactMatch;
  const resultError = success
    ? undefined
    : write.error || (!exactMatch ? "LenderFlow did not confirm an exact canonical lender match" : "LenderFlow did not return a published rule or receipt identifier");

  const receiptPayload = {
    schema_version: "0.2",
    reference,
    status: success ? "PUBLISHED" : "WRITE_FAILED",
    workroom_id: "NEURAXIS_ROOM_3_DEREK_LENDERFLOW",
    human_authority: "Derek Bullen",
    final_system_authority: "Mason Perry",
    confirmed_at: now,
    caller: input.caller ? "AUTHENTICATED_PHONE_SESSION" : "UNKNOWN",
    call_sid_hash: crypto.createHash("sha256").update(input.callSid, "utf8").digest("hex"),
    structured_confirmation_sha256: confirmationSha256,
    raw_audio_retained: false,
    raw_transcript_retained: false,
    structured_rule: input.proposal,
    exact_lender_match_confirmed: exactMatch,
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
        "Confirmed by: Derek Bullen through private NEURAXIS workroom 3",
        `Rule: ${input.proposal.spokenSummary}`,
        `Exact lender identity confirmed: ${exactMatch ? "yes" : "no"}`,
        `LenderFlow rule ID: ${identifier || "none returned"}`,
        `Endpoint: ${write.endpoint}`,
        `Hive receipt: ${hiveReceipt.url || hiveReceipt.error || "not available"}`,
        `Error: ${resultError || "none"}`,
        "Raw audio retained: no",
        "Raw transcript retained: no",
        `Structured confirmation SHA-256: ${confirmationSha256}`,
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
