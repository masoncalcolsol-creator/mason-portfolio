import crypto from "node:crypto";

import { decodeState, encodeState, normalizePhone } from "@/lib/neuraxis-twilio";

export type DerekRuleValue = string | number | boolean | string[] | null;

export type DerekRuleProposal = {
  lenderDisplayName: string;
  lenderSlug: string;
  program: string | null;
  appliesToAllPrograms: boolean;
  fieldKey: string;
  operator: "equals" | "minimum" | "maximum" | "includes" | "excludes" | "not_applicable";
  value: DerekRuleValue;
  temporary: boolean;
  expiresAt: string | null;
  note: string;
  spokenSummary: string;
};

export type DerekPublishedResult = {
  ok: boolean;
  reference: string;
  ruleId?: string;
  spoken: string;
};

export type DerekLenderFlowCallSession = {
  kind: "DEREK_LENDERFLOW_CALL_SESSION";
  callSid: string;
  caller: string;
  issuedAt: number;
  expiresAt: number;
  pending?: DerekRuleProposal;
  /**
   * Short-lived encrypted call state only. These utterances are carried inside the
   * signed session token so clarification answers can complete the same command.
   * They are not written to telemetry, the Hive, Gmail, or LenderFlow.
   */
  draftTurns?: string[];
  clarificationCount?: number;
  /**
   * The most recent publish result is held only long enough for the caller to say
   * "repeat" or press 9. It prevents the operator from losing the reference while
   * avoiding a second automatic rule read-back.
   */
  publishedResult?: DerekPublishedResult;
};

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function hashDerekPin(value: string): string {
  return crypto.createHash("sha256").update(String(value || "").trim(), "utf8").digest("hex");
}

export function verifyDerekPin(value: string, expectedHash: string): boolean {
  const expected = String(expectedHash || "").trim().toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(expected)) return false;
  return safeEqual(hashDerekPin(value), expected);
}

export function createDerekCallSession(
  callSid: string,
  caller: string,
  pending?: DerekRuleProposal,
  draftTurns?: string[],
  clarificationCount = 0,
  publishedResult?: DerekPublishedResult,
): string {
  const now = Date.now();
  const session: DerekLenderFlowCallSession = {
    kind: "DEREK_LENDERFLOW_CALL_SESSION",
    callSid,
    caller: normalizePhone(caller),
    issuedAt: now,
    expiresAt: now + 30 * 60 * 1000,
    ...(pending ? { pending } : {}),
    ...(draftTurns?.length ? { draftTurns } : {}),
    ...(clarificationCount > 0 ? { clarificationCount } : {}),
    ...(publishedResult ? { publishedResult } : {}),
  };
  return encodeState(session);
}

export function validateDerekCallSession(token: string, callSid: string, caller: string): DerekLenderFlowCallSession | null {
  const session = decodeState<DerekLenderFlowCallSession>(token);
  if (!session || session.kind !== "DEREK_LENDERFLOW_CALL_SESSION") return null;
  if (session.expiresAt < Date.now()) return null;
  if (!safeEqual(session.callSid, callSid)) return null;
  if (!safeEqual(session.caller, normalizePhone(caller))) return null;
  return session;
}
