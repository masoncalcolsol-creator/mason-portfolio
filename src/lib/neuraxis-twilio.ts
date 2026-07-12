import crypto from "node:crypto";

export type TwilioForm = Record<string, string>;

export async function readTwilioForm(request: Request): Promise<TwilioForm> {
  return Object.fromEntries(new URLSearchParams(await request.text()));
}

export function xmlEscape(value: string): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function twiml(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/xml; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

/**
 * Safe Twilio-native fallback. The normal NEURAXIS path uses OpenAI Marin
 * through <Play>; this remains available for hard failures and access denial.
 */
export function say(text: string): string {
  return `<Say voice="Polly.Joanna-Generative" language="en-US">${xmlEscape(text)}</Say>`;
}

function stateSecret(): string {
  return process.env.NEURAXIS_STATE_SECRET
    || process.env.TWILIO_AUTH_TOKEN
    || "NULLWORKS-NEURAXIS-LOCAL-STATE";
}

function stateKey(): Buffer {
  return crypto.createHash("sha256").update(stateSecret(), "utf8").digest();
}

export function encodeState(value: unknown): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", stateKey(), iv);
  const plaintext = Buffer.from(JSON.stringify(value), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ciphertext]).toString("base64url");
}

export function decodeState<T>(token: string): T | null {
  try {
    const payload = Buffer.from(token, "base64url");
    if (payload.length < 29) return null;
    const iv = payload.subarray(0, 12);
    const tag = payload.subarray(12, 28);
    const ciphertext = payload.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", stateKey(), iv);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
    return JSON.parse(plaintext) as T;
  } catch {
    return null;
  }
}

/**
 * Uses the OpenAI Marin TTS route without exposing spoken text in the URL.
 */
export function speak(text: string, requestUrl: string): string {
  const origin = new URL(requestUrl).origin;
  const token = encodeState({ text: String(text).slice(0, 4000) });
  const audioUrl = `${origin}/api/neuraxis/twilio/tts?q=${encodeURIComponent(token)}`;
  return `<Play>${xmlEscape(audioUrl)}</Play>`;
}

export function normalizePhone(value: string): string {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 10) digits = `1${digits}`;
  return digits ? `+${digits}` : "";
}

export function validateTwilioRequest(request: Request, params: TwilioForm): boolean {
  const authToken = process.env.TWILIO_AUTH_TOKEN || "";
  if (!authToken) return true;
  const supplied = request.headers.get("x-twilio-signature") || "";
  if (!supplied) return false;
  const payload = Object.keys(params)
    .sort()
    .reduce((value, key) => `${value}${key}${params[key]}`, request.url);
  const expected = crypto.createHmac("sha1", authToken).update(payload, "utf8").digest("base64");
  const left = Buffer.from(supplied);
  const right = Buffer.from(expected);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export function speechOrDigits(params: TwilioForm): string {
  return `${params.SpeechResult || ""} ${params.Digits || ""}`.trim();
}

export function isAffirmative(value: string): boolean {
  const normalized = value.toLowerCase().trim();
  return /^(yes|yeah|yep|yup|correct|affirmative|we do|i do|we are|i am)\b/.test(normalized)
    || normalized === "1";
}

export function isNegative(value: string): boolean {
  const normalized = value.toLowerCase().trim();
  return /^(no|nope|nah|negative|not yet|we don't|we do not|i don't|i do not)\b/.test(normalized)
    || normalized === "2";
}

export function auditReference(callSid: string): string {
  const digest = crypto
    .createHash("sha256")
    .update(`${callSid}:${Date.now()}:${crypto.randomUUID()}`)
    .digest("hex")
    .slice(0, 8)
    .toUpperCase();
  return `NW-${digest}`;
}

export function phoenixGreeting(date = new Date()): {
  greeting: "morning" | "afternoon" | "evening";
  hour: number;
  minute: number;
  clock: string;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Phoenix",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const hour = Number(parts.find((part) => part.type === "hour")?.value || "12") % 24;
  const minute = Number(parts.find((part) => part.type === "minute")?.value || "0");
  const greeting = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
  const displayHour = hour % 12 || 12;
  return { greeting, hour, minute, clock: `${displayHour}:${String(minute).padStart(2, "0")}` };
}

export async function lookupCallerName(phone: string): Promise<{
  name?: string;
  type?: string;
  error?: string;
}> {
  const normalized = normalizePhone(phone);
  const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
  const authToken = process.env.TWILIO_AUTH_TOKEN || "";
  if (!normalized || !accountSid || !authToken) return {};

  try {
    const response = await fetch(
      `https://lookups.twilio.com/v2/PhoneNumbers/${encodeURIComponent(normalized)}?Fields=caller_name`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        },
        cache: "no-store",
      },
    );
    if (!response.ok) return { error: `Lookup ${response.status}` };
    const data = await response.json() as {
      caller_name?: { caller_name?: string | null; caller_type?: string | null } | null;
    };
    const name = data.caller_name?.caller_name?.trim() || undefined;
    const type = data.caller_name?.caller_type?.trim() || undefined;
    return { name, type };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Caller lookup failed" };
  }
}

export async function sendTwilioSms(input: {
  to: string;
  body: string;
  statusCallback?: string;
}): Promise<{ ok: boolean; sid?: string; status?: string; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
  const authToken = process.env.TWILIO_AUTH_TOKEN || "";
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID || "";
  const from = process.env.TWILIO_PHONE_NUMBER || "+19498056990";
  if (!accountSid || !authToken) return { ok: false, error: "TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN missing" };

  const form = new URLSearchParams({
    To: normalizePhone(input.to),
    Body: input.body,
  });
  if (messagingServiceSid) form.set("MessagingServiceSid", messagingServiceSid);
  else form.set("From", from);
  if (input.statusCallback) form.set("StatusCallback", input.statusCallback);

  try {
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      body: form,
      cache: "no-store",
    });
    const text = await response.text();
    let data: { sid?: string; status?: string; message?: string; code?: number } = {};
    try { data = text ? JSON.parse(text) : {}; } catch { data = { message: text }; }
    if (!response.ok) return { ok: false, error: `${data.code || response.status}: ${data.message || "Twilio SMS failed"}` };
    return { ok: true, sid: data.sid, status: data.status };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Twilio SMS network failure" };
  }
}

export async function writeHiveReceipt(input: {
  reference: string;
  category: string;
  payload: unknown;
}): Promise<{ ok: boolean; url?: string; error?: string }> {
  const token = process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
  const repo = process.env.HIVE_REPO || "masoncalcolsol-creator/nullworks-corporate-wifi-hive";
  const branch = process.env.HIVE_BRANCH || "main";
  if (!token) return { ok: false, error: "HIVE_GITHUB_TOKEN missing" };
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const safeReference = input.reference.replace(/[^A-Z0-9-]/gi, "-");
  const path = `hive/events/${stamp}_${input.category}_${safeReference}.json`;
  const [owner, name] = repo.split("/");
  const body = JSON.stringify({
    message: `${input.category}: ${input.reference}`,
    content: Buffer.from(JSON.stringify(input.payload, null, 2), "utf8").toString("base64"),
    branch,
  });
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${name}/contents/${path}`, {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "content-type": "application/json",
        "user-agent": "NULLWORKS-Neuraxis-Audit",
      },
      body,
      cache: "no-store",
    });
    const text = await response.text();
    if (!response.ok) return { ok: false, error: `GitHub receipt write ${response.status}: ${text.slice(0, 500)}` };
    const data = JSON.parse(text) as { content?: { html_url?: string } };
    return { ok: true, url: data.content?.html_url };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "GitHub receipt network failure" };
  }
}
