import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const STEWART_ROOM_SLUG = "stewart-field-scope-20260802";
export const STEWART_ROOM_COOKIE = "nw_stewart_room_access";
export const STEWART_PROFILE = "stewart_brothers";

const DEFAULT_PIN_HASH = "ed5154e1696f8c6c6eb02adfeff5b342759bfbb8480fd9293b214998951805f4";
const ACCESS_TTL_SECONDS = 12 * 60 * 60;

function secret(): string {
  return process.env.STEWART_ROOM_SIGNING_SECRET
    || process.env.OPENAI_API_KEY
    || process.env.HIVE_GITHUB_TOKEN
    || process.env.GITHUB_TOKEN
    || "";
}

function expectedPinHash(): string {
  return (process.env.STEWART_ROOM_PIN_SHA256 || DEFAULT_PIN_HASH).trim().toLowerCase();
}

function safeEqualHex(left: string, right: string): boolean {
  if (!/^[a-f0-9]{64}$/i.test(left) || !/^[a-f0-9]{64}$/i.test(right)) return false;
  return timingSafeEqual(Buffer.from(left, "hex"), Buffer.from(right, "hex"));
}

function signature(expiresAt: number): string {
  const key = secret();
  if (!key) return "";
  return createHmac("sha256", key)
    .update(`${STEWART_ROOM_SLUG}:${expiresAt}`)
    .digest("hex");
}

export function verifyStewartPin(pin: string): boolean {
  const normalized = pin.replace(/\D/g, "");
  if (!/^\d{4}$/.test(normalized)) return false;
  const digest = createHash("sha256").update(normalized).digest("hex");
  return safeEqualHex(digest, expectedPinHash());
}

export function createStewartAccessToken(now = Date.now()): { token: string; expiresAt: number; maxAge: number } {
  if (!secret()) throw new Error("Stewart room signing secret is unavailable.");
  const expiresAt = Math.floor(now / 1000) + ACCESS_TTL_SECONDS;
  const token = `${expiresAt}.${signature(expiresAt)}`;
  return { token, expiresAt, maxAge: ACCESS_TTL_SECONDS };
}

export function verifyStewartAccessToken(token: string, now = Date.now()): boolean {
  const [rawExpiry, suppliedSignature] = token.split(".");
  const expiresAt = Number(rawExpiry);
  if (!Number.isInteger(expiresAt) || expiresAt <= Math.floor(now / 1000)) return false;
  const expectedSignature = signature(expiresAt);
  if (!expectedSignature || !suppliedSignature) return false;
  return safeEqualHex(suppliedSignature, expectedSignature);
}

export function readCookie(request: Request, name: string): string {
  const raw = request.headers.get("cookie") || "";
  for (const part of raw.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key !== name) continue;
    try {
      return decodeURIComponent(rest.join("="));
    } catch {
      return rest.join("=");
    }
  }
  return "";
}

export function requestHasStewartAccess(request: Request): boolean {
  return verifyStewartAccessToken(readCookie(request, STEWART_ROOM_COOKIE));
}
