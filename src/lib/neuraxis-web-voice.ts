import crypto from "node:crypto";

const HIVE_REPO = process.env.HIVE_REPO || "masoncalcolsol-creator/nullworks-corporate-wifi-hive";
const HIVE_BRANCH = process.env.HIVE_BRANCH || "main";
const HIVE_TOKEN = process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
const PRESSURE_CONFIG_PATH = "hive/current/kaironull_pressure_cooker_phone_workroom.yaml";
const RUNTIME_CONFIG_PATH = "hive/runtime/neuraxis_browser_voice_credentials.enc.json";
const TWILIO_APP_NAME = "NULLWORKS Browser Pressure Cooker";

export const WEB_VOICE_SESSION_COOKIE = "nullworks_voice_session";
export const WEB_VOICE_MAX_SECONDS = 20 * 60;
export const WEB_VOICE_WARNING_SECONDS = [15 * 60, 19 * 60] as const;
export const WEB_VOICE_TOKEN_TTL_SECONDS = 25 * 60;

export type WebVoiceRole = "admin" | "guest";

export type WebVoiceSession = {
  typ: "session";
  room: "pressure";
  role: WebVoiceRole;
  sid: string;
  iat: number;
  exp: number;
};

type WebVoiceInvite = {
  typ: "invite";
  room: "pressure";
  sid: string;
  iat: number;
  exp: number;
};

type TwilioVoiceResources = {
  accountSid: string;
  apiKeySid: string;
  apiKeySecret: string;
  twimlAppSid: string;
  voiceUrl: string;
  statusCallbackUrl: string;
  source: "environment" | "encrypted_hive" | "provisioned";
};

type StoredRuntimeConfig = {
  schema_version: "1.0";
  account_sid: string;
  api_key_sid: string;
  api_key_secret: string;
  twiml_app_sid: string;
  voice_url: string;
  status_callback_url: string;
  created_at: string;
  updated_at: string;
};

type EncryptedEnvelope = {
  schema_version: "1.0";
  algorithm: "aes-256-gcm";
  iv: string;
  tag: string;
  ciphertext: string;
  recorded_at: string;
};

type HiveRead = { content?: string; sha?: string; missing?: boolean };

const resourcePromises = new Map<string, Promise<TwilioVoiceResources>>();

function base64Url(value: Buffer | string): string {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value, "utf8");
  return buffer.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function decodeBase64Url(value: string): Buffer {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 ? "=".repeat(4 - (normalized.length % 4)) : "";
  return Buffer.from(`${normalized}${padding}`, "base64");
}

function hmac(value: string, secret: string): string {
  return base64Url(crypto.createHmac("sha256", secret).update(value, "utf8").digest());
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left, "utf8");
  const b = Buffer.from(right, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function sessionSecret(): string {
  const secret = process.env.NEURAXIS_WEB_VOICE_SESSION_SECRET
    || process.env.TWILIO_AUTH_TOKEN
    || HIVE_TOKEN;
  if (!secret) throw new Error("No server-side secret is available for browser voice sessions.");
  return secret;
}

function signPayload(payload: WebVoiceSession | WebVoiceInvite): string {
  const body = base64Url(JSON.stringify(payload));
  return `${body}.${hmac(body, sessionSecret())}`;
}

function verifySignedPayload<T extends WebVoiceSession | WebVoiceInvite>(token: string, expectedType: T["typ"]): T | null {
  const [body, signature, extra] = String(token || "").split(".");
  if (!body || !signature || extra) return null;
  const expected = hmac(body, sessionSecret());
  if (!safeEqual(signature, expected)) return null;
  try {
    const payload = JSON.parse(decodeBase64Url(body).toString("utf8")) as T;
    const now = Math.floor(Date.now() / 1000);
    if (payload.typ !== expectedType || payload.room !== "pressure" || payload.exp <= now || payload.iat > now + 60) return null;
    return payload;
  } catch {
    return null;
  }
}

export function issueWebVoiceSession(role: WebVoiceRole, ttlSeconds = 30 * 60): { token: string; session: WebVoiceSession } {
  const now = Math.floor(Date.now() / 1000);
  const session: WebVoiceSession = {
    typ: "session",
    room: "pressure",
    role,
    sid: crypto.randomBytes(12).toString("hex"),
    iat: now,
    exp: now + Math.max(300, Math.min(ttlSeconds, 4 * 60 * 60)),
  };
  return { token: signPayload(session), session };
}

export function verifyWebVoiceSession(token: string): WebVoiceSession | null {
  return verifySignedPayload<WebVoiceSession>(token, "session");
}

export function issueWebVoiceInvite(ttlSeconds = 24 * 60 * 60): { token: string; invite: WebVoiceInvite } {
  const now = Math.floor(Date.now() / 1000);
  const invite: WebVoiceInvite = {
    typ: "invite",
    room: "pressure",
    sid: crypto.randomBytes(12).toString("hex"),
    iat: now,
    exp: now + Math.max(15 * 60, Math.min(ttlSeconds, 72 * 60 * 60)),
  };
  return { token: signPayload(invite), invite };
}

export function verifyWebVoiceInvite(token: string): WebVoiceInvite | null {
  return verifySignedPayload<WebVoiceInvite>(token, "invite");
}

export function readWebVoiceSession(request: Request): WebVoiceSession | null {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${WEB_VOICE_SESSION_COOKIE}=([^;]+)`));
  return match?.[1] ? verifyWebVoiceSession(decodeURIComponent(match[1])) : null;
}

export function webVoiceSessionCookie(token: string, maxAgeSeconds: number): string {
  return `${WEB_VOICE_SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`;
}

export function clearWebVoiceSessionCookie(): string {
  return `${WEB_VOICE_SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

function githubHeaders(): Record<string, string> {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${HIVE_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
    "User-Agent": "NULLWORKS-NEURAXIS-Browser-Voice",
  };
}

function repoParts(): { owner: string; repo: string } {
  const [owner, repo] = HIVE_REPO.split("/");
  if (!owner || !repo) throw new Error("HIVE_REPO must be owner/repository.");
  return { owner, repo };
}

async function readHiveFile(path: string): Promise<HiveRead> {
  if (!HIVE_TOKEN) throw new Error("HIVE_GITHUB_TOKEN missing");
  const { owner, repo } = repoParts();
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path).replaceAll("%2F", "/")}?ref=${encodeURIComponent(HIVE_BRANCH)}`,
    { headers: githubHeaders(), cache: "no-store" },
  );
  if (response.status === 404) return { missing: true };
  if (!response.ok) throw new Error(`GitHub read failed for ${path}: ${response.status}`);
  const data = await response.json() as { content?: string; sha?: string };
  if (!data.content) throw new Error(`GitHub file missing content: ${path}`);
  return {
    content: Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8"),
    sha: data.sha,
  };
}

async function writeHiveFile(path: string, content: string, sha?: string): Promise<void> {
  if (!HIVE_TOKEN) throw new Error("HIVE_GITHUB_TOKEN missing");
  const { owner, repo } = repoParts();
  const body: Record<string, unknown> = {
    message: "neuraxis browser voice runtime credentials",
    branch: HIVE_BRANCH,
    content: Buffer.from(content, "utf8").toString("base64"),
  };
  if (sha) body.sha = sha;
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path).replaceAll("%2F", "/")}`,
    {
      method: "PUT",
      headers: githubHeaders(),
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );
  if (!response.ok) throw new Error(`GitHub write failed for ${path}: ${response.status}`);
}

function encryptionKey(accountSid: string, authToken: string): Buffer {
  return crypto.createHash("sha256").update(`NULLWORKS_BROWSER_VOICE\0${accountSid}\0${authToken}`, "utf8").digest();
}

function encryptRuntimeConfig(config: StoredRuntimeConfig, authToken: string): EncryptedEnvelope {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(config.account_sid, authToken), iv);
  cipher.setAAD(Buffer.from(config.account_sid, "utf8"));
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(config), "utf8"), cipher.final()]);
  return {
    schema_version: "1.0",
    algorithm: "aes-256-gcm",
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    ciphertext: ciphertext.toString("base64"),
    recorded_at: new Date().toISOString(),
  };
}

function decryptRuntimeConfig(envelope: EncryptedEnvelope, accountSid: string, authToken: string): StoredRuntimeConfig {
  if (envelope.algorithm !== "aes-256-gcm") throw new Error("Unsupported runtime credential envelope.");
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    encryptionKey(accountSid, authToken),
    Buffer.from(envelope.iv, "base64"),
  );
  decipher.setAAD(Buffer.from(accountSid, "utf8"));
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(envelope.ciphertext, "base64")),
    decipher.final(),
  ]).toString("utf8");
  const config = JSON.parse(plaintext) as StoredRuntimeConfig;
  if (config.account_sid !== accountSid) throw new Error("Runtime credential account mismatch.");
  return config;
}

async function loadStoredRuntimeConfig(accountSid: string, authToken: string): Promise<{ config?: StoredRuntimeConfig; sha?: string }> {
  const stored = await readHiveFile(RUNTIME_CONFIG_PATH);
  if (stored.missing || !stored.content) return {};
  try {
    const envelope = JSON.parse(stored.content) as EncryptedEnvelope;
    return { config: decryptRuntimeConfig(envelope, accountSid, authToken), sha: stored.sha };
  } catch (error) {
    console.error("Encrypted browser voice credential load failed", error instanceof Error ? error.message : "unknown error");
    return { sha: stored.sha };
  }
}

async function saveStoredRuntimeConfig(config: StoredRuntimeConfig, authToken: string, sha?: string): Promise<void> {
  const envelope = encryptRuntimeConfig(config, authToken);
  await writeHiveFile(RUNTIME_CONFIG_PATH, `${JSON.stringify(envelope, null, 2)}\n`, sha);
}

function basicAuth(username: string, password: string): string {
  return `Basic ${Buffer.from(`${username}:${password}`, "utf8").toString("base64")}`;
}

async function twilioFormRequest<T>(url: string, accountSid: string, authToken: string, form: URLSearchParams): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: basicAuth(accountSid, authToken),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form,
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Twilio resource request failed: ${response.status} ${(await response.text()).slice(0, 240)}`);
  return await response.json() as T;
}

async function createApiKey(accountSid: string, authToken: string): Promise<{ sid: string; secret: string }> {
  const result = await twilioFormRequest<{ sid?: string; secret?: string }>(
    `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Keys.json`,
    accountSid,
    authToken,
    new URLSearchParams({ FriendlyName: "NULLWORKS Browser Voice Access Token Key" }),
  );
  if (!result.sid || !result.secret) throw new Error("Twilio API key creation did not return a SID and secret.");
  return { sid: result.sid, secret: result.secret };
}

async function deleteApiKey(accountSid: string, authToken: string, sid: string): Promise<void> {
  await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Keys/${encodeURIComponent(sid)}.json`,
    { method: "DELETE", headers: { Authorization: basicAuth(accountSid, authToken) }, cache: "no-store" },
  ).catch(() => undefined);
}

async function findTwimlApp(accountSid: string, authToken: string): Promise<string | undefined> {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Applications.json?FriendlyName=${encodeURIComponent(TWILIO_APP_NAME)}&PageSize=1`;
  const response = await fetch(url, {
    headers: { Authorization: basicAuth(accountSid, authToken) },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Twilio application lookup failed: ${response.status}`);
  const data = await response.json() as { applications?: Array<{ sid?: string }> };
  return data.applications?.[0]?.sid;
}

async function createTwimlApp(
  accountSid: string,
  authToken: string,
  voiceUrl: string,
  statusCallbackUrl: string,
): Promise<string> {
  const result = await twilioFormRequest<{ sid?: string }>(
    `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Applications.json`,
    accountSid,
    authToken,
    new URLSearchParams({
      FriendlyName: TWILIO_APP_NAME,
      VoiceUrl: voiceUrl,
      VoiceMethod: "POST",
      VoiceFallbackUrl: `${new URL(voiceUrl).origin}/api/neuraxis/voice-web/fallback`,
      VoiceFallbackMethod: "POST",
      StatusCallback: statusCallbackUrl,
      StatusCallbackMethod: "POST",
    }),
  );
  if (!result.sid) throw new Error("Twilio application creation did not return a SID.");
  return result.sid;
}

async function updateTwimlApp(
  accountSid: string,
  authToken: string,
  appSid: string,
  voiceUrl: string,
  statusCallbackUrl: string,
): Promise<void> {
  await twilioFormRequest(
    `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Applications/${encodeURIComponent(appSid)}.json`,
    accountSid,
    authToken,
    new URLSearchParams({
      FriendlyName: TWILIO_APP_NAME,
      VoiceUrl: voiceUrl,
      VoiceMethod: "POST",
      VoiceFallbackUrl: `${new URL(voiceUrl).origin}/api/neuraxis/voice-web/fallback`,
      VoiceFallbackMethod: "POST",
      StatusCallback: statusCallbackUrl,
      StatusCallbackMethod: "POST",
    }),
  );
}

export function publicWebVoiceOrigin(requestUrl: string): string {
  const explicit = (process.env.NEURAXIS_PUBLIC_ORIGIN || "").trim().replace(/\/$/, "");
  if (explicit) return explicit;
  const productionHost = (process.env.VERCEL_PROJECT_PRODUCTION_URL || "").trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (productionHost) return `https://${productionHost}`;
  return new URL(requestUrl).origin;
}

async function provisionTwilioResources(origin: string): Promise<TwilioVoiceResources> {
  const accountSid = (process.env.TWILIO_ACCOUNT_SID || "").trim();
  const authToken = (process.env.TWILIO_AUTH_TOKEN || "").trim();
  if (!/^AC[0-9a-f]{32}$/i.test(accountSid) || !authToken) {
    throw new Error("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required.");
  }

  const voiceUrl = `${origin}/api/neuraxis/voice-web/twiml`;
  const statusCallbackUrl = `${origin}/api/neuraxis/twilio/call-status`;
  const stored = HIVE_TOKEN ? await loadStoredRuntimeConfig(accountSid, authToken) : {};

  const envKeySid = (process.env.TWILIO_API_KEY_SID || "").trim();
  const envKeySecret = (process.env.TWILIO_API_KEY_SECRET || "").trim();
  if ((envKeySid && !envKeySecret) || (!envKeySid && envKeySecret)) {
    throw new Error("TWILIO_API_KEY_SID and TWILIO_API_KEY_SECRET must be configured together.");
  }

  let apiKeySid = envKeySid || stored.config?.api_key_sid || "";
  let apiKeySecret = envKeySecret || stored.config?.api_key_secret || "";
  let twimlAppSid = (process.env.TWILIO_TWIML_APP_SID || "").trim() || stored.config?.twiml_app_sid || "";
  let createdKeySid = "";
  let source: TwilioVoiceResources["source"] = envKeySid ? "environment" : stored.config ? "encrypted_hive" : "provisioned";

  if (!twimlAppSid) {
    twimlAppSid = await findTwimlApp(accountSid, authToken) || await createTwimlApp(accountSid, authToken, voiceUrl, statusCallbackUrl);
    source = "provisioned";
  }
  await updateTwimlApp(accountSid, authToken, twimlAppSid, voiceUrl, statusCallbackUrl);

  if (!apiKeySid || !apiKeySecret) {
    if (!HIVE_TOKEN) throw new Error("A Twilio API key must be configured because encrypted Hive persistence is unavailable.");
    const created = await createApiKey(accountSid, authToken);
    apiKeySid = created.sid;
    apiKeySecret = created.secret;
    createdKeySid = created.sid;
    source = "provisioned";
  }

  if (!/^SK[0-9a-f]{32}$/i.test(apiKeySid) || !/^AP[0-9a-f]{32}$/i.test(twimlAppSid)) {
    throw new Error("Twilio browser voice resource identifiers are invalid.");
  }

  if (HIVE_TOKEN && (!envKeySid || !process.env.TWILIO_TWIML_APP_SID)) {
    const now = new Date().toISOString();
    const config: StoredRuntimeConfig = {
      schema_version: "1.0",
      account_sid: accountSid,
      api_key_sid: apiKeySid,
      api_key_secret: apiKeySecret,
      twiml_app_sid: twimlAppSid,
      voice_url: voiceUrl,
      status_callback_url: statusCallbackUrl,
      created_at: stored.config?.created_at || now,
      updated_at: now,
    };
    try {
      await saveStoredRuntimeConfig(config, authToken, stored.sha);
    } catch (error) {
      if (createdKeySid) await deleteApiKey(accountSid, authToken, createdKeySid);
      throw error;
    }
  }

  return { accountSid, apiKeySid, apiKeySecret, twimlAppSid, voiceUrl, statusCallbackUrl, source };
}

export function ensureTwilioWebVoiceResources(requestUrl: string): Promise<TwilioVoiceResources> {
  const origin = publicWebVoiceOrigin(requestUrl);
  const existing = resourcePromises.get(origin);
  if (existing) return existing;
  const promise = provisionTwilioResources(origin).catch((error) => {
    resourcePromises.delete(origin);
    throw error;
  });
  resourcePromises.set(origin, promise);
  return promise;
}

function createJwt(resources: TwilioVoiceResources, identity: string, ttlSeconds: number): string {
  const now = Math.floor(Date.now() / 1000);
  const header = { typ: "JWT", alg: "HS256", cty: "twilio-fpa;v=1" };
  const payload = {
    jti: `${resources.apiKeySid}-${now}-${crypto.randomBytes(4).toString("hex")}`,
    grants: {
      identity,
      voice: { outgoing: { application_sid: resources.twimlAppSid } },
    },
    iat: now,
    nbf: now - 5,
    exp: now + ttlSeconds,
    iss: resources.apiKeySid,
    sub: resources.accountSid,
  };
  const unsigned = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(payload))}`;
  return `${unsigned}.${hmac(unsigned, resources.apiKeySecret)}`;
}

export async function createTwilioWebVoiceToken(requestUrl: string, session: WebVoiceSession): Promise<{
  token: string;
  identity: string;
  expiresAt: number;
  resourceSource: TwilioVoiceResources["source"];
}> {
  const resources = await ensureTwilioWebVoiceResources(requestUrl);
  const identity = `nw_pressure_${session.role}_${session.sid}`.replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 121);
  const now = Math.floor(Date.now() / 1000);
  return {
    token: createJwt(resources, identity, WEB_VOICE_TOKEN_TTL_SECONDS),
    identity,
    expiresAt: now + WEB_VOICE_TOKEN_TTL_SECONDS,
    resourceSource: resources.source,
  };
}

export async function verifyPressureCookerPasscode(passcode: string): Promise<boolean> {
  const digits = String(passcode || "").replace(/\D/g, "").slice(0, 4);
  if (digits.length !== 4) return false;
  const config = await readHiveFile(PRESSURE_CONFIG_PATH);
  if (!config.content) return false;
  const match = config.content.match(/^\s*pin_sha256:\s*["']?([a-f0-9]{64})/im);
  if (!match?.[1]) return false;
  const actual = crypto.createHash("sha256").update(digits, "utf8").digest("hex");
  return safeEqual(actual.toLowerCase(), match[1].toLowerCase());
}

function optionalRate(name: string): number | null {
  const raw = String(process.env[name] || "").trim();
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : null;
}

export function webVoiceMeterConfig() {
  return {
    currency: "USD",
    hard_limit_seconds: WEB_VOICE_MAX_SECONDS,
    warning_seconds: [...WEB_VOICE_WARNING_SECONDS],
    rates_per_minute: {
      transport: optionalRate("NEURAXIS_WEB_VOICE_TRANSPORT_RATE_USD") ?? 0.004,
      speech: optionalRate("NEURAXIS_WEB_VOICE_SPEECH_RATE_USD"),
      model: optionalRate("NEURAXIS_WEB_VOICE_MODEL_RATE_USD"),
      storage: optionalRate("NEURAXIS_WEB_VOICE_STORAGE_RATE_USD") ?? 0,
    },
    estimate_boundary: "Configured estimates only. Final Twilio and model usage records remain authoritative.",
  };
}
