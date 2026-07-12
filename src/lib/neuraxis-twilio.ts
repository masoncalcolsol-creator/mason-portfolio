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

export function say(text: string): string {
  return `<Say voice="Polly.Matthew" language="en-US">${xmlEscape(text)}</Say>`;
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

export function auditReference(callSid: string): string {
  const digest = crypto.createHash("sha256").update(`${callSid}:${Date.now()}:${crypto.randomUUID()}`).digest("hex").slice(0, 8).toUpperCase();
  return `NW-${digest}`;
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
