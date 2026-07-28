import crypto from "node:crypto";

import { decodeState, encodeState, normalizePhone } from "@/lib/neuraxis-twilio";

export type GrayMatterCallSession = {
  kind: "GRAY_MATTER_CALL_SESSION";
  callSid: string;
  caller: string;
  issuedAt: number;
  expiresAt: number;
};

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function validateGrayMatterWebRequest(request: Request): boolean {
  const expected = process.env.GRAY_MATTER_ACCESS_TOKEN || "";
  if (!expected) return false;
  const authorization = request.headers.get("authorization") || "";
  const bearer = authorization.replace(/^Bearer\s+/i, "").trim();
  const supplied = bearer || request.headers.get("x-gray-matter-token") || "";
  return Boolean(supplied) && safeEqual(supplied, expected);
}

export function isApprovedMasonCaller(caller: string): boolean {
  const approved = normalizePhone(process.env.NEURAXIS_MASON_CALLER || "");
  return Boolean(approved) && normalizePhone(caller) === approved;
}

export function verifyGrayMatterPassphrase(value: string): boolean {
  const expectedHash = (process.env.GRAY_MATTER_PASSPHRASE_SHA256 || "").trim().toLowerCase();
  if (!expectedHash) return false;
  const normalized = String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
  const actualHash = crypto.createHash("sha256").update(normalized, "utf8").digest("hex");
  return safeEqual(actualHash, expectedHash);
}

export function createGrayMatterCallSession(callSid: string, caller: string): string {
  const now = Date.now();
  const session: GrayMatterCallSession = {
    kind: "GRAY_MATTER_CALL_SESSION",
    callSid,
    caller: normalizePhone(caller),
    issuedAt: now,
    expiresAt: now + 30 * 60 * 1000,
  };
  return encodeState(session);
}

export function validateGrayMatterCallSession(token: string, callSid: string, caller: string): GrayMatterCallSession | null {
  const session = decodeState<GrayMatterCallSession>(token);
  if (!session || session.kind !== "GRAY_MATTER_CALL_SESSION") return null;
  if (session.expiresAt < Date.now()) return null;
  if (!safeEqual(session.callSid, callSid)) return null;
  if (!safeEqual(session.caller, normalizePhone(caller))) return null;
  return session;
}
