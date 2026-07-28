import crypto from "node:crypto";

import { writeHiveReceipt } from "@/lib/neuraxis-twilio";

export type GrayMatterSource = "WEB" | "TWILIO" | "API";
export type GrayMatterPriority = "RED" | "YELLOW" | "GREEN";
export type GrayMatterActionStatus = "OPEN" | "DONE" | "DEFERRED";

export type GrayMatterAction = {
  id: string;
  entry_id: string;
  text: string;
  priority: GrayMatterPriority;
  confidence: "EXPLICIT" | "INFERRED";
  project?: string;
  due_text?: string;
  status: GrayMatterActionStatus;
  created_at: string;
  updated_at: string;
};

export type GrayMatterEntry = {
  id: string;
  captured_at: string;
  local_date: string;
  local_time: string;
  source: GrayMatterSource;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  urgency: GrayMatterPriority;
  transcript_sha256: string;
  gmail_message_id?: string;
  action_ids: string[];
};

export type GrayMatterLedger = {
  schema_version: "0.1";
  system: "GRAY_MATTER_STORAGE_UNIT";
  timezone: "America/Phoenix";
  updated_at: string;
  entries: GrayMatterEntry[];
  actions: GrayMatterAction[];
};

type Classification = {
  title: string;
  summary: string;
  category: string;
  tags: string[];
  urgency: GrayMatterPriority;
  actions: Array<{
    text: string;
    priority: GrayMatterPriority;
    confidence: "EXPLICIT" | "INFERRED";
    project?: string;
    due_text?: string;
  }>;
};

type GmailHeader = { name?: string; value?: string };
type GmailPayload = {
  headers?: GmailHeader[];
  body?: { data?: string };
  parts?: GmailPayload[];
  mimeType?: string;
};
type GmailMessage = {
  id?: string;
  threadId?: string;
  snippet?: string;
  internalDate?: string;
  payload?: GmailPayload;
};

type GithubFile<T> = {
  sha?: string;
  content?: string;
  value?: T;
};

const GMAIL_USER = process.env.GRAY_MATTER_GMAIL_USER
  || process.env.NEURAXIS_GMAIL_USER
  || "NULLWORKS.Neuraxis@gmail.com";
const JOURNAL_LABEL = "GRAY MATTER STORAGE UNIT/JOURNAL ENTRIES";
const DIGEST_LABEL = "GRAY MATTER STORAGE UNIT/DAILY DIGESTS";
const ACTION_LABEL = "GRAY MATTER STORAGE UNIT/ACTION QUEUE";
const RECEIPT_LABEL = "GRAY MATTER STORAGE UNIT/RECEIPTS";
const LEDGER_PATH = "hive/current/gray_matter_action_ledger.json";
const HIVE_REPO = process.env.HIVE_REPO || "masoncalcolsol-creator/nullworks-corporate-wifi-hive";
const HIVE_BRANCH = process.env.HIVE_BRANCH || "main";
const HIVE_TOKEN = process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.GRAY_MATTER_MODEL || process.env.OPENAI_MODEL || "gpt-5.5";

let googleTokenCache: { token: string; expiresAt: number } | undefined;
const gmailLabelCache = new Map<string, string>();

function cleanText(value: unknown, max = 8000): string {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanLine(value: unknown, max = 500): string {
  return cleanText(value, max).replace(/[\r\n]+/g, " ");
}

function base64Url(value: Buffer | string): string {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value, "utf8");
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return Buffer.from(padded, "base64").toString("utf8");
}

function phoenixStamp(date = new Date()): { date: string; time: string; display: string } {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Phoenix",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const pick = (type: string) => parts.find((part) => part.type === type)?.value || "00";
  const localDate = `${pick("year")}-${pick("month")}-${pick("day")}`;
  const localTime = `${pick("hour")}:${pick("minute")}`;
  return { date: localDate, time: localTime, display: `${localDate} ${localTime} America/Phoenix` };
}

function makeEntryId(date = new Date()): string {
  const digest = crypto.createHash("sha256")
    .update(`${date.toISOString()}:${crypto.randomUUID()}`)
    .digest("hex")
    .slice(0, 10)
    .toUpperCase();
  return `GM-${digest}`;
}

function normalizePriority(value: unknown): GrayMatterPriority {
  const upper = cleanLine(value, 20).toUpperCase();
  return upper === "RED" || upper === "YELLOW" || upper === "GREEN" ? upper : "GREEN";
}

function normalizeCategory(value: unknown): string {
  const upper = cleanLine(value, 60).toUpperCase().replace(/[^A-Z0-9_-]/g, "_");
  return upper || "OTHER";
}

function fallbackClassification(transcript: string): Classification {
  const firstSentence = transcript.split(/[.!?]/).map((part) => part.trim()).find(Boolean) || "Voice note";
  const urgency: GrayMatterPriority = /\b(urgent|today|immediately|emergency|must do)\b/i.test(transcript)
    ? "YELLOW"
    : "GREEN";
  const actions: Classification["actions"] = [];
  const actionPattern = /(?:^|[.!?]\s+)(?:i need to|we need to|remember to|remind me to|todo|to do|must|should)\s+([^.!?]+)/gi;
  for (const match of transcript.matchAll(actionPattern)) {
    const text = cleanLine(match[1], 360);
    if (text) actions.push({ text, priority: urgency, confidence: "EXPLICIT" });
  }
  return {
    title: firstSentence.slice(0, 90),
    summary: transcript.slice(0, 320),
    category: "OTHER",
    tags: [],
    urgency,
    actions: actions.slice(0, 8),
  };
}

function extractOutputText(data: unknown): string {
  const record = data as { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> };
  return record.output_text
    || record.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join(" ")
    || "";
}

async function classifyTranscript(transcript: string): Promise<Classification> {
  if (!OPENAI_API_KEY) return fallbackClassification(transcript);
  const instructions = `You are the bounded intake classifier for Mason Perry's private GRAY MATTER STORAGE UNIT. Convert one spoken note into compact metadata. Preserve uncertainty. Do not invent tasks, deadlines, people, projects, or facts. An action is EXPLICIT only when the speaker clearly states an intended action. An INFERRED action must be genuinely useful and clearly labeled. Use RED only for an explicitly stated immediate stop-the-line or safety-critical item; YELLOW for near-term attention; GREEN otherwise. Return only valid JSON with this exact shape: {"title":"","summary":"","category":"WORK|PROJECT|IDEA|PERSONAL|HOUSEHOLD|MEAL|FAMILY|HEALTH|LEGAL|FINANCE|OTHER","tags":[""],"urgency":"RED|YELLOW|GREEN","actions":[{"text":"","priority":"RED|YELLOW|GREEN","confidence":"EXPLICIT|INFERRED","project":"","due_text":""}]}. Keep title under 90 characters, summary under 320 characters, no more than 8 tags and 8 actions.`;
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
        input: transcript,
        max_output_tokens: 650,
      }),
      cache: "no-store",
    });
    if (!response.ok) return fallbackClassification(transcript);
    const raw = extractOutputText(await response.json()).trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();
    const parsed = JSON.parse(raw) as Partial<Classification>;
    const actions = Array.isArray(parsed.actions)
      ? parsed.actions.map((action) => ({
          text: cleanLine(action?.text, 420),
          priority: normalizePriority(action?.priority),
          confidence: cleanLine(action?.confidence, 20).toUpperCase() === "INFERRED" ? "INFERRED" as const : "EXPLICIT" as const,
          project: cleanLine(action?.project, 120) || undefined,
          due_text: cleanLine(action?.due_text, 120) || undefined,
        })).filter((action) => action.text).slice(0, 8)
      : [];
    return {
      title: cleanLine(parsed.title, 90) || fallbackClassification(transcript).title,
      summary: cleanLine(parsed.summary, 320) || transcript.slice(0, 320),
      category: normalizeCategory(parsed.category),
      tags: Array.isArray(parsed.tags)
        ? parsed.tags.map((tag) => cleanLine(tag, 50)).filter(Boolean).slice(0, 8)
        : [],
      urgency: normalizePriority(parsed.urgency),
      actions,
    };
  } catch {
    return fallbackClassification(transcript);
  }
}

async function googleAccessToken(): Promise<string> {
  if (googleTokenCache && googleTokenCache.expiresAt > Date.now() + 60_000) return googleTokenCache.token;
  const clientId = process.env.GRAY_MATTER_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || "";
  const clientSecret = process.env.GRAY_MATTER_GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET || "";
  const refreshToken = process.env.GRAY_MATTER_GOOGLE_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN || "";
  if (!clientId || !clientSecret || !refreshToken) throw new Error("Gray Matter Gmail OAuth is not configured");
  const form = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: form,
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Google OAuth refresh failed ${response.status}: ${(await response.text()).slice(0, 240)}`);
  const data = await response.json() as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error("Google OAuth refresh returned no access token");
  googleTokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + Math.max(300, data.expires_in || 3600) * 1000,
  };
  return data.access_token;
}

async function gmailRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await googleAccessToken();
  const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Gmail API ${path} failed ${response.status}: ${(await response.text()).slice(0, 400)}`);
  return await response.json() as T;
}

async function ensureGmailLabel(name: string): Promise<string> {
  const cached = gmailLabelCache.get(name);
  if (cached) return cached;
  const listed = await gmailRequest<{ labels?: Array<{ id?: string; name?: string }> }>("labels");
  const existing = listed.labels?.find((label) => label.name === name);
  if (existing?.id) {
    gmailLabelCache.set(name, existing.id);
    return existing.id;
  }
  const created = await gmailRequest<{ id?: string }>("labels", {
    method: "POST",
    body: JSON.stringify({
      name,
      messageListVisibility: "show",
      labelListVisibility: "labelShow",
    }),
  });
  if (!created.id) throw new Error(`Gmail label creation returned no id for ${name}`);
  gmailLabelCache.set(name, created.id);
  return created.id;
}

function buildRawMessage(input: {
  subject: string;
  body: string;
  messageId: string;
  extraHeaders?: Record<string, string>;
}): string {
  const headers = [
    `From: ${GMAIL_USER}`,
    `To: ${GMAIL_USER}`,
    `Subject: =?UTF-8?B?${Buffer.from(input.subject, "utf8").toString("base64")}?=`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${input.messageId}@gray-matter.nullworks>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
  ];
  for (const [key, value] of Object.entries(input.extraHeaders || {})) {
    headers.push(`${key}: ${cleanLine(value, 500)}`);
  }
  return base64Url(`${headers.join("\r\n")}\r\n\r\n${input.body}`);
}

async function insertJournalEmail(input: {
  entryId: string;
  subject: string;
  body: string;
  category: string;
  urgency: GrayMatterPriority;
  transcriptHash: string;
  hasActions: boolean;
}): Promise<string> {
  const labels = [await ensureGmailLabel(JOURNAL_LABEL), await ensureGmailLabel(RECEIPT_LABEL)];
  if (input.hasActions) labels.push(await ensureGmailLabel(ACTION_LABEL));
  const raw = buildRawMessage({
    subject: input.subject,
    body: input.body,
    messageId: input.entryId,
    extraHeaders: {
      "X-Gray-Matter-Entry-ID": input.entryId,
      "X-Gray-Matter-Category": input.category,
      "X-Gray-Matter-Urgency": input.urgency,
      "X-Gray-Matter-Transcript-SHA256": input.transcriptHash,
      "X-Gray-Matter-Audio-Retained": "false",
    },
  });
  const inserted = await gmailRequest<GmailMessage>("messages?internalDateSource=dateHeader", {
    method: "POST",
    body: JSON.stringify({ raw, labelIds: labels }),
  });
  if (!inserted.id) throw new Error("Gmail journal insert returned no message id");
  return inserted.id;
}

async function sendDigestEmail(subject: string, body: string, digestId: string): Promise<string> {
  const raw = buildRawMessage({
    subject,
    body,
    messageId: digestId,
    extraHeaders: {
      "X-Gray-Matter-Digest-ID": digestId,
      "X-Gray-Matter-Timezone": "America/Phoenix",
    },
  });
  const sent = await gmailRequest<GmailMessage>("messages/send", {
    method: "POST",
    body: JSON.stringify({ raw }),
  });
  if (!sent.id) throw new Error("Gmail digest send returned no message id");
  const digestLabel = await ensureGmailLabel(DIGEST_LABEL);
  await gmailRequest(`messages/${encodeURIComponent(sent.id)}/modify`, {
    method: "POST",
    body: JSON.stringify({ addLabelIds: [digestLabel] }),
  });
  return sent.id;
}

function defaultLedger(): GrayMatterLedger {
  return {
    schema_version: "0.1",
    system: "GRAY_MATTER_STORAGE_UNIT",
    timezone: "America/Phoenix",
    updated_at: new Date(0).toISOString(),
    entries: [],
    actions: [],
  };
}

function hiveRepoParts(): { owner: string; repo: string } {
  const [owner, repo] = HIVE_REPO.split("/");
  return { owner, repo };
}

function hiveHeaders(): Record<string, string> {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${HIVE_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "content-type": "application/json",
    "user-agent": "NULLWORKS-Gray-Matter-Storage-Unit",
  };
}

async function readLedger(): Promise<GithubFile<GrayMatterLedger>> {
  if (!HIVE_TOKEN) throw new Error("HIVE_GITHUB_TOKEN missing");
  const { owner, repo } = hiveRepoParts();
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(LEDGER_PATH).replaceAll("%2F", "/")}?ref=${encodeURIComponent(HIVE_BRANCH)}`,
    { headers: hiveHeaders(), cache: "no-store" },
  );
  if (response.status === 404) return { value: defaultLedger() };
  if (!response.ok) throw new Error(`Hive ledger read failed ${response.status}: ${(await response.text()).slice(0, 300)}`);
  const data = await response.json() as { sha?: string; content?: string };
  if (!data.content) throw new Error("Hive ledger content missing");
  const value = JSON.parse(Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8")) as GrayMatterLedger;
  return { sha: data.sha, value };
}

async function writeLedger(ledger: GrayMatterLedger, sha?: string): Promise<{ ok: boolean; conflict?: boolean; error?: string }> {
  if (!HIVE_TOKEN) return { ok: false, error: "HIVE_GITHUB_TOKEN missing" };
  const { owner, repo } = hiveRepoParts();
  const payload: Record<string, unknown> = {
    message: `gray matter ledger: ${ledger.updated_at}`,
    content: Buffer.from(JSON.stringify(ledger, null, 2), "utf8").toString("base64"),
    branch: HIVE_BRANCH,
  };
  if (sha) payload.sha = sha;
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(LEDGER_PATH).replaceAll("%2F", "/")}`,
    {
      method: "PUT",
      headers: hiveHeaders(),
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );
  if (response.ok) return { ok: true };
  const text = await response.text();
  return {
    ok: false,
    conflict: response.status === 409 || response.status === 422,
    error: `Hive ledger write failed ${response.status}: ${text.slice(0, 320)}`,
  };
}

async function mutateLedger(mutate: (ledger: GrayMatterLedger) => GrayMatterLedger): Promise<GrayMatterLedger> {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const existing = await readLedger();
    const base = existing.value || defaultLedger();
    const next = mutate({
      ...base,
      entries: [...(base.entries || [])],
      actions: [...(base.actions || [])],
    });
    next.updated_at = new Date().toISOString();
    next.entries = next.entries.slice(-1000);
    next.actions = next.actions.slice(-2000);
    const written = await writeLedger(next, existing.sha);
    if (written.ok) return next;
    if (!written.conflict || attempt === 2) throw new Error(written.error || "Hive ledger mutation failed");
  }
  throw new Error("Hive ledger mutation exhausted retries");
}

function actionLines(actions: Classification["actions"]): string[] {
  if (!actions.length) return ["- None explicitly captured."];
  return actions.map((action, index) => {
    const qualifiers = [action.priority, action.confidence, action.project, action.due_text].filter(Boolean).join(" | ");
    return `- ${index + 1}. ${action.text}${qualifiers ? ` [${qualifiers}]` : ""}`;
  });
}

function journalBody(input: {
  entryId: string;
  stamp: ReturnType<typeof phoenixStamp>;
  source: GrayMatterSource;
  classification: Classification;
  transcript: string;
  transcriptHash: string;
}): string {
  return [
    "GRAY MATTER STORAGE UNIT",
    "",
    `Entry ID: ${input.entryId}`,
    `Captured: ${input.stamp.display}`,
    `Source: ${input.source}`,
    `Category: ${input.classification.category}`,
    `Urgency: ${input.classification.urgency}`,
    `Tags: ${input.classification.tags.join(", ") || "None"}`,
    `Transcript SHA-256: ${input.transcriptHash}`,
    "Audio retained: NO",
    "",
    "SUMMARY",
    input.classification.summary,
    "",
    "ACTION EXTRACTION",
    ...actionLines(input.classification.actions),
    "",
    "TRANSCRIPT",
    input.transcript,
    "",
    "RECEIPT BOUNDARY",
    "The transcript is the preserved human source. Classification, urgency, tags, and inferred actions are machine assistance and remain reviewable. Mason Perry remains final Human Authority.",
  ].join("\n");
}

export async function captureGrayMatter(input: {
  transcript: string;
  source: GrayMatterSource;
  callSid?: string;
}): Promise<{
  ok: boolean;
  entry: GrayMatterEntry;
  actions: GrayMatterAction[];
  warnings: string[];
}> {
  const transcript = cleanText(input.transcript, 18_000);
  if (!transcript) throw new Error("Transcript is empty");
  const capturedAt = new Date();
  const stamp = phoenixStamp(capturedAt);
  const entryId = makeEntryId(capturedAt);
  const transcriptHash = crypto.createHash("sha256").update(transcript, "utf8").digest("hex");
  const classification = await classifyTranscript(transcript);
  const warnings: string[] = [];
  const subject = `GRAY MATTER // ${classification.category} // ${classification.title} // ${stamp.date} ${stamp.time}`;
  const body = journalBody({ entryId, stamp, source: input.source, classification, transcript, transcriptHash });
  let gmailMessageId: string | undefined;
  try {
    gmailMessageId = await insertJournalEmail({
      entryId,
      subject,
      body,
      category: classification.category,
      urgency: classification.urgency,
      transcriptHash,
      hasActions: classification.actions.length > 0,
    });
  } catch (error) {
    warnings.push(error instanceof Error ? error.message : "Gmail journal insert failed");
  }

  const now = capturedAt.toISOString();
  const actions: GrayMatterAction[] = classification.actions.map((action, index) => ({
    id: `${entryId}-A${String(index + 1).padStart(2, "0")}`,
    entry_id: entryId,
    text: action.text,
    priority: action.priority,
    confidence: action.confidence,
    project: action.project,
    due_text: action.due_text,
    status: "OPEN",
    created_at: now,
    updated_at: now,
  }));
  const entry: GrayMatterEntry = {
    id: entryId,
    captured_at: now,
    local_date: stamp.date,
    local_time: stamp.time,
    source: input.source,
    title: classification.title,
    summary: classification.summary,
    category: classification.category,
    tags: classification.tags,
    urgency: classification.urgency,
    transcript_sha256: transcriptHash,
    gmail_message_id: gmailMessageId,
    action_ids: actions.map((action) => action.id),
  };

  try {
    await mutateLedger((ledger) => ({
      ...ledger,
      entries: [...ledger.entries.filter((candidate) => candidate.id !== entry.id), entry],
      actions: [...ledger.actions.filter((candidate) => candidate.entry_id !== entry.id), ...actions],
    }));
  } catch (error) {
    warnings.push(error instanceof Error ? error.message : "Hive action ledger update failed");
  }

  const receipt = await writeHiveReceipt({
    reference: entryId,
    category: "gray_matter_entry_captured",
    payload: {
      event_type: "GRAY_MATTER_ENTRY_CAPTURED",
      truth_state: gmailMessageId ? "GMAIL_ARCHIVED_HIVE_INDEXED" : "HIVE_INDEX_ATTEMPTED_GMAIL_UNAVAILABLE",
      human_authority: "Mason Perry",
      entry,
      action_count: actions.length,
      call_sid: input.callSid || null,
      privacy: {
        transcript_in_hive_receipt: false,
        audio_retained: false,
        gmail_contains_full_transcript: Boolean(gmailMessageId),
      },
      warnings,
      recorded_at: new Date().toISOString(),
    },
  });
  if (!receipt.ok) warnings.push(receipt.error || "Hive capture receipt failed");
  return { ok: Boolean(gmailMessageId) && warnings.length === 0, entry, actions, warnings };
}

export async function getGrayMatterBrief(): Promise<{
  spoken: string;
  todayEntries: GrayMatterEntry[];
  openActions: GrayMatterAction[];
  spillover: GrayMatterAction[];
}> {
  const ledger = (await readLedger()).value || defaultLedger();
  const today = phoenixStamp().date;
  const todayEntries = ledger.entries.filter((entry) => entry.local_date === today);
  const openActions = ledger.actions.filter((action) => action.status === "OPEN");
  const spillover = openActions.filter((action) => phoenixStamp(new Date(action.created_at)).date < today);
  const top = [...openActions]
    .sort((left, right) => {
      const rank = (priority: GrayMatterPriority) => priority === "RED" ? 0 : priority === "YELLOW" ? 1 : 2;
      return rank(left.priority) - rank(right.priority) || left.created_at.localeCompare(right.created_at);
    })
    .slice(0, 5);
  const summary = top.length
    ? top.map((action, index) => `${index + 1}, ${action.text}`).join(". ")
    : "There are no open actions in the Gray Matter ledger.";
  const spoken = `Today you added ${todayEntries.length} Gray Matter ${todayEntries.length === 1 ? "entry" : "entries"}. There are ${openActions.length} open actions, including ${spillover.length} carried forward. ${summary}`;
  return { spoken: spoken.slice(0, 1200), todayEntries, openActions, spillover };
}

function messageHeader(payload: GmailPayload | undefined, name: string): string {
  return payload?.headers?.find((header) => header.name?.toLowerCase() === name.toLowerCase())?.value || "";
}

function messagePlainText(payload: GmailPayload | undefined): string {
  if (!payload) return "";
  if (payload.mimeType === "text/plain" && payload.body?.data) return decodeBase64Url(payload.body.data);
  if (payload.body?.data && !payload.parts?.length) return decodeBase64Url(payload.body.data);
  for (const part of payload.parts || []) {
    const text = messagePlainText(part);
    if (text) return text;
  }
  return "";
}

export async function searchGrayMatter(query: string, maxResults = 5): Promise<Array<{
  id: string;
  subject: string;
  date: string;
  snippet: string;
  excerpt: string;
}>> {
  const cleaned = cleanLine(query, 240);
  if (!cleaned) return [];
  const labelId = await ensureGmailLabel(JOURNAL_LABEL);
  const listed = await gmailRequest<{ messages?: Array<{ id?: string }> }>(
    `messages?labelIds=${encodeURIComponent(labelId)}&q=${encodeURIComponent(cleaned)}&maxResults=${Math.max(1, Math.min(20, maxResults))}`,
  );
  const results = await Promise.all((listed.messages || []).filter((message) => message.id).map(async (message) => {
    const full = await gmailRequest<GmailMessage>(`messages/${encodeURIComponent(message.id as string)}?format=full`);
    const body = messagePlainText(full.payload);
    return {
      id: full.id || message.id as string,
      subject: messageHeader(full.payload, "Subject") || "Gray Matter entry",
      date: messageHeader(full.payload, "Date"),
      snippet: cleanLine(full.snippet, 240),
      excerpt: cleanText(body, 900),
    };
  }));
  return results;
}

export async function sendGrayMatterDailyDigest(): Promise<{
  ok: boolean;
  digestId: string;
  gmailMessageId?: string;
  counts: { todayEntries: number; openActions: number; spillover: number; planning: number };
  warnings: string[];
}> {
  const ledger = (await readLedger()).value || defaultLedger();
  const stamp = phoenixStamp();
  const todayEntries = ledger.entries.filter((entry) => entry.local_date === stamp.date);
  const openActions = ledger.actions.filter((action) => action.status === "OPEN");
  const spillover = openActions.filter((action) => phoenixStamp(new Date(action.created_at)).date < stamp.date);
  const planning = openActions.filter((action) => !action.due_text && action.priority !== "RED");
  const digestId = `GM-DIGEST-${stamp.date}`;
  const formatAction = (action: GrayMatterAction) => `- [${action.priority}] ${action.text}${action.due_text ? ` — Due: ${action.due_text}` : ""}${action.project ? ` — Project: ${action.project}` : ""} (${action.id})`;
  const body = [
    "GRAY MATTER STORAGE UNIT // DAILY TRIAGE",
    `Date: ${stamp.date}`,
    "Timezone: America/Phoenix",
    "",
    "ADDED TODAY",
    ...(todayEntries.length
      ? todayEntries.map((entry) => `- [${entry.urgency}] ${entry.title} — ${entry.summary} (${entry.id})`)
      : ["- No Gray Matter entries were added today."]),
    "",
    "OPEN ACTIONS",
    ...(openActions.length ? openActions.map(formatAction) : ["- No open actions."]),
    "",
    "SPILLED OVER FROM EARLIER DAYS",
    ...(spillover.length ? spillover.map(formatAction) : ["- No spillover items."]),
    "",
    "SHOULD PROBABLY BE PLANNED",
    ...(planning.length ? planning.map(formatAction) : ["- Nothing currently needs a planning slot."]),
    "",
    "TRIAGE RECEIPT",
    `Entries today: ${todayEntries.length}`,
    `Open actions: ${openActions.length}`,
    `Spillover: ${spillover.length}`,
    `Planning candidates: ${planning.length}`,
    "",
    "Machine-extracted actions remain reviewable. Mason Perry remains final Human Authority.",
  ].join("\n");
  const warnings: string[] = [];
  let gmailMessageId: string | undefined;
  try {
    gmailMessageId = await sendDigestEmail(`GRAY MATTER // DAILY TRIAGE // ${stamp.date}`, body, digestId);
  } catch (error) {
    warnings.push(error instanceof Error ? error.message : "Daily digest email failed");
  }
  const bodyHash = crypto.createHash("sha256").update(body, "utf8").digest("hex");
  const receipt = await writeHiveReceipt({
    reference: digestId,
    category: "gray_matter_daily_digest",
    payload: {
      event_type: "GRAY_MATTER_DAILY_DIGEST",
      truth_state: gmailMessageId ? "EMAIL_SENT" : "EMAIL_SEND_FAILED",
      human_authority: "Mason Perry",
      local_date: stamp.date,
      timezone: "America/Phoenix",
      gmail_message_id: gmailMessageId || null,
      body_sha256: bodyHash,
      counts: {
        today_entries: todayEntries.length,
        open_actions: openActions.length,
        spillover: spillover.length,
        planning: planning.length,
      },
      warnings,
      recorded_at: new Date().toISOString(),
    },
  });
  if (!receipt.ok) warnings.push(receipt.error || "Digest Hive receipt failed");
  return {
    ok: Boolean(gmailMessageId) && warnings.length === 0,
    digestId,
    gmailMessageId,
    counts: {
      todayEntries: todayEntries.length,
      openActions: openActions.length,
      spillover: spillover.length,
      planning: planning.length,
    },
    warnings,
  };
}
