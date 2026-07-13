import crypto from "node:crypto";

import {
  normalizePhone,
  sendTwilioSms,
  writeHiveReceipt,
} from "@/lib/neuraxis-twilio";

export type NeuraxisCallRoom = "menu" | "workroom" | "private" | "audit" | "unknown";

export type NeuraxisCallTurn = {
  index: number;
  room: NeuraxisCallRoom;
  step?: string;
  heard?: string;
  response_excerpt?: string;
  captured_fields?: Record<string, unknown>;
  privacy?: "CALLER_SPEECH_PRESERVED" | "METADATA_ONLY_PRIVATE_ROOM";
  recorded_at: string;
};

export type NeuraxisCallState = {
  schema_version: "1.0";
  reference: string;
  call_sid: string;
  caller_number?: string;
  caller_name_lookup?: string;
  caller_type_lookup?: string;
  called_number?: string;
  direction?: string;
  room: NeuraxisCallRoom;
  status: "STARTED" | "IN_PROGRESS" | "ENDED";
  disposition?:
    | "COMPLETED_AUDIT"
    | "ABANDONED_AUDIT"
    | "ABANDONED_AUDIT_BEFORE_FIRST_ANSWER"
    | "CONVERSATION_ENDED"
    | "DISCONNECTED_AFTER_MENU"
    | "DISCONNECTED_BEFORE_SELECTION"
    | "CALL_ENDED";
  started_at: string;
  last_activity_at: string;
  ended_at?: string;
  duration_seconds?: number;
  twilio_status?: string;
  turns: NeuraxisCallTurn[];
  completed_intake?: boolean;
  contact_requested?: boolean;
  audit_answers?: Record<string, unknown>;
  start_alert_sent_at?: string;
  completion_alert_sent_at?: string;
};

type GithubFile = {
  sha?: string;
  content?: string;
};

type MutationResult = {
  ok: boolean;
  created?: boolean;
  state?: NeuraxisCallState;
  error?: string;
};

const HIVE_REPO = process.env.HIVE_REPO || "masoncalcolsol-creator/nullworks-corporate-wifi-hive";
const HIVE_BRANCH = process.env.HIVE_BRANCH || "main";
const HIVE_TOKEN = process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";

function cleanText(value: unknown, max = 1200): string | undefined {
  const cleaned = String(value || "").replace(/\s+/g, " ").trim();
  return cleaned ? cleaned.slice(0, max) : undefined;
}

function safeCallSid(callSid: string): string {
  return String(callSid || "unknown-call").replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 90);
}

export function callTelemetryReference(callSid: string): string {
  const digest = crypto.createHash("sha256").update(String(callSid || "unknown-call")).digest("hex").slice(0, 8).toUpperCase();
  return `CALL-${digest}`;
}

function callStatePath(callSid: string): string {
  return `hive/calls/${safeCallSid(callSid)}.json`;
}

function repoParts(): { owner: string; repo: string } {
  const [owner, repo] = HIVE_REPO.split("/");
  return { owner, repo };
}

function githubHeaders(): Record<string, string> {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${HIVE_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "content-type": "application/json",
    "user-agent": "NULLWORKS-NEURAXIS-Call-Telemetry",
  };
}

async function readCallState(callSid: string): Promise<{ state?: NeuraxisCallState; sha?: string; error?: string }> {
  if (!HIVE_TOKEN) return { error: "HIVE_GITHUB_TOKEN missing" };
  const { owner, repo } = repoParts();
  const path = callStatePath(callSid);
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path).replaceAll("%2F", "/")}?ref=${encodeURIComponent(HIVE_BRANCH)}`,
    { headers: githubHeaders(), cache: "no-store" },
  );
  if (response.status === 404) return {};
  if (!response.ok) return { error: `GitHub call-state read ${response.status}` };
  const data = await response.json() as GithubFile;
  if (!data.content) return { error: "GitHub call-state content missing" };
  try {
    const state = JSON.parse(Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8")) as NeuraxisCallState;
    return { state, sha: data.sha };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Call-state JSON parse failed" };
  }
}

async function writeCallState(state: NeuraxisCallState, sha?: string): Promise<{ ok: boolean; error?: string }> {
  if (!HIVE_TOKEN) return { ok: false, error: "HIVE_GITHUB_TOKEN missing" };
  const { owner, repo } = repoParts();
  const path = callStatePath(state.call_sid);
  const body: Record<string, unknown> = {
    message: `neuraxis call state: ${state.reference}`,
    content: Buffer.from(JSON.stringify(state, null, 2), "utf8").toString("base64"),
    branch: HIVE_BRANCH,
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
  if (!response.ok) return { ok: false, error: `GitHub call-state write ${response.status}: ${(await response.text()).slice(0, 280)}` };
  return { ok: true };
}

async function mutateCallState(
  callSid: string,
  createState: () => NeuraxisCallState,
  mutate: (state: NeuraxisCallState) => NeuraxisCallState,
): Promise<MutationResult> {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const existing = await readCallState(callSid);
    if (existing.error) return { ok: false, error: existing.error };
    const created = !existing.state;
    const base = existing.state || createState();
    const next = mutate({ ...base, turns: [...(base.turns || [])] });
    const written = await writeCallState(next, existing.sha);
    if (written.ok) return { ok: true, created, state: next };
    if (!/409|422/.test(written.error || "") || attempt === 2) return { ok: false, error: written.error };
  }
  return { ok: false, error: "Call-state mutation exhausted retries" };
}

function publicOrigin(requestUrl: string): string {
  const explicit = (process.env.NEURAXIS_PUBLIC_ORIGIN || "").trim().replace(/\/$/, "");
  if (explicit) return explicit;
  const vercelHost = (process.env.VERCEL_PROJECT_PRODUCTION_URL || "").trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (vercelHost) return `https://${vercelHost}`;
  return new URL(requestUrl).origin;
}

export async function ensureIncomingNumberStatusCallback(requestUrl: string): Promise<{
  ok: boolean;
  configured?: boolean;
  phone_number_sid?: string;
  callback?: string;
  error?: string;
}> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
  const authToken = process.env.TWILIO_AUTH_TOKEN || "";
  const phoneNumber = normalizePhone(process.env.TWILIO_PHONE_NUMBER || "+19498056990");
  if (!accountSid || !authToken || !phoneNumber) return { ok: false, error: "Twilio credentials or phone number missing" };

  const callback = `${publicOrigin(requestUrl)}/api/neuraxis/twilio/call-status`;
  const auth = `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`;
  try {
    const list = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/IncomingPhoneNumbers.json?PhoneNumber=${encodeURIComponent(phoneNumber)}&PageSize=1`,
      { headers: { Authorization: auth }, cache: "no-store" },
    );
    if (!list.ok) return { ok: false, error: `Twilio number lookup ${list.status}` };
    const data = await list.json() as {
      incoming_phone_numbers?: Array<{ sid?: string; status_callback?: string | null; status_callback_method?: string | null }>;
    };
    const number = data.incoming_phone_numbers?.[0];
    if (!number?.sid) return { ok: false, error: `Twilio number ${phoneNumber} was not found` };
    if (number.status_callback === callback && String(number.status_callback_method || "POST").toUpperCase() === "POST") {
      return { ok: true, configured: false, phone_number_sid: number.sid, callback };
    }

    const form = new URLSearchParams({ StatusCallback: callback, StatusCallbackMethod: "POST" });
    const update = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/IncomingPhoneNumbers/${encodeURIComponent(number.sid)}.json`,
      {
        method: "POST",
        headers: { Authorization: auth, "content-type": "application/x-www-form-urlencoded" },
        body: form,
        cache: "no-store",
      },
    );
    if (!update.ok) return { ok: false, error: `Twilio status callback update ${update.status}: ${(await update.text()).slice(0, 280)}` };
    return { ok: true, configured: true, phone_number_sid: number.sid, callback };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Twilio status callback configuration failed" };
  }
}

async function notifyMason(body: string, caller?: string): Promise<{ ok: boolean; error?: string; suppressed?: string }> {
  const mason = normalizePhone(process.env.NEURAXIS_MASON_CALLER || "");
  if (!mason) return { ok: false, error: "NEURAXIS_MASON_CALLER missing" };
  if (caller && normalizePhone(caller) === mason) return { ok: true, suppressed: "Mason is the caller" };
  const sent = await sendTwilioSms({ to: mason, body: cleanText(body, 900) || "NEURAXIS call telemetry update." });
  return sent.ok ? { ok: true } : { ok: false, error: sent.error };
}

function blankState(input: {
  callSid: string;
  caller?: string;
  callerName?: string;
  callerType?: string;
  called?: string;
  direction?: string;
  startedAt?: string;
}): NeuraxisCallState {
  const now = input.startedAt || new Date().toISOString();
  return {
    schema_version: "1.0",
    reference: callTelemetryReference(input.callSid),
    call_sid: input.callSid,
    caller_number: normalizePhone(input.caller || "") || undefined,
    caller_name_lookup: cleanText(input.callerName, 100),
    caller_type_lookup: cleanText(input.callerType, 80),
    called_number: normalizePhone(input.called || "") || undefined,
    direction: cleanText(input.direction, 80),
    room: "menu",
    status: "STARTED",
    started_at: now,
    last_activity_at: now,
    turns: [],
    completed_intake: false,
  };
}

export async function startCallTelemetry(input: {
  callSid: string;
  caller?: string;
  callerName?: string;
  callerType?: string;
  called?: string;
  direction?: string;
  callStatus?: string;
}): Promise<MutationResult & { alert?: { ok: boolean; error?: string; suppressed?: string } }> {
  const now = new Date().toISOString();
  const result = await mutateCallState(
    input.callSid,
    () => blankState({ ...input, startedAt: now }),
    (state) => ({
      ...state,
      caller_number: state.caller_number || normalizePhone(input.caller || "") || undefined,
      caller_name_lookup: state.caller_name_lookup || cleanText(input.callerName, 100),
      caller_type_lookup: state.caller_type_lookup || cleanText(input.callerType, 80),
      called_number: state.called_number || normalizePhone(input.called || "") || undefined,
      direction: state.direction || cleanText(input.direction, 80),
      twilio_status: cleanText(input.callStatus, 80) || state.twilio_status,
      last_activity_at: now,
    }),
  );

  if (!result.ok || !result.state || !result.created) return result;

  await writeHiveReceipt({
    reference: result.state.reference,
    category: "neuraxis_call_started",
    payload: {
      event_type: "NEURAXIS_CALL_STARTED",
      truth_state: "OBSERVED",
      ...result.state,
      recorded_at: now,
    },
  }).catch(() => undefined);

  const who = result.state.caller_name_lookup
    ? `${result.state.caller_name_lookup} (${result.state.caller_number || "number unavailable"})`
    : result.state.caller_number || "unknown or blocked number";
  const alert = await notifyMason(
    `NEURAXIS call ${result.state.reference} started from ${who}. No action required; the call is being telemetrized.`,
    result.state.caller_number,
  );

  if (alert.ok && !alert.suppressed) {
    const marked = await mutateCallState(
      input.callSid,
      () => result.state as NeuraxisCallState,
      (state) => ({ ...state, start_alert_sent_at: new Date().toISOString() }),
    );
    if (marked.ok) result.state = marked.state;
  }
  return { ...result, alert };
}

export async function recordRoomSelection(input: {
  callSid: string;
  room: NeuraxisCallRoom;
  caller?: string;
  selection?: string;
}): Promise<MutationResult> {
  const now = new Date().toISOString();
  const result = await mutateCallState(
    input.callSid,
    () => blankState({ callSid: input.callSid, caller: input.caller, startedAt: now }),
    (state) => ({ ...state, room: input.room, status: "IN_PROGRESS", last_activity_at: now }),
  );
  if (result.ok && result.state) {
    await writeHiveReceipt({
      reference: result.state.reference,
      category: "neuraxis_call_room_selected",
      payload: {
        event_type: "NEURAXIS_CALL_ROOM_SELECTED",
        truth_state: "OBSERVED",
        call_sid: input.callSid,
        reference: result.state.reference,
        caller_number: result.state.caller_number || normalizePhone(input.caller || "") || null,
        room: input.room,
        selection: cleanText(input.selection, 120) || null,
        recorded_at: now,
      },
    }).catch(() => undefined);
  }
  return result;
}

export async function appendCallTurn(input: {
  callSid: string;
  room: NeuraxisCallRoom;
  step?: string;
  heard?: string;
  response?: string;
  capturedFields?: Record<string, unknown>;
  preserveSpeech?: boolean;
}): Promise<MutationResult> {
  const now = new Date().toISOString();
  const result = await mutateCallState(
    input.callSid,
    () => blankState({ callSid: input.callSid, startedAt: now }),
    (state) => {
      const turn: NeuraxisCallTurn = {
        index: (state.turns?.length || 0) + 1,
        room: input.room,
        step: cleanText(input.step, 80),
        heard: input.preserveSpeech === false ? undefined : cleanText(input.heard, 1400),
        response_excerpt: input.preserveSpeech === false ? undefined : cleanText(input.response, 520),
        captured_fields: input.capturedFields,
        privacy: input.preserveSpeech === false ? "METADATA_ONLY_PRIVATE_ROOM" : "CALLER_SPEECH_PRESERVED",
        recorded_at: now,
      };
      return {
        ...state,
        room: input.room,
        status: "IN_PROGRESS",
        last_activity_at: now,
        turns: [...(state.turns || []), turn].slice(-30),
      };
    },
  );

  if (result.ok && result.state) {
    const turn = result.state.turns[result.state.turns.length - 1];
    await writeHiveReceipt({
      reference: result.state.reference,
      category: "neuraxis_call_turn",
      payload: {
        event_type: "NEURAXIS_CALL_TURN",
        truth_state: "OBSERVED",
        call_sid: input.callSid,
        reference: result.state.reference,
        caller_number: result.state.caller_number || null,
        room: input.room,
        turn,
      },
    }).catch(() => undefined);
  }
  return result;
}

export async function completeAuditTelemetry(input: {
  callSid: string;
  answers: Record<string, unknown>;
  contactRequested: boolean;
}): Promise<MutationResult & { alert?: { ok: boolean; error?: string; suppressed?: string } }> {
  const now = new Date().toISOString();
  const result = await mutateCallState(
    input.callSid,
    () => blankState({ callSid: input.callSid, startedAt: now }),
    (state) => ({
      ...state,
      room: "audit",
      status: "IN_PROGRESS",
      completed_intake: true,
      contact_requested: input.contactRequested,
      audit_answers: input.answers,
      disposition: "COMPLETED_AUDIT",
      last_activity_at: now,
    }),
  );
  if (!result.ok || !result.state) return result;

  const answers = input.answers as {
    name?: string;
    company?: string;
    title?: string;
    employees?: string;
    ai_tools?: string;
    problems?: string;
  };
  const who = [answers.name, answers.title, answers.company].filter(Boolean).join(", ") || result.state.caller_name_lookup || result.state.caller_number || "unknown caller";
  const alert = await notifyMason(
    `NEURAXIS audit ${result.state.reference} completed by ${who}. Employees: ${answers.employees || "unknown"}. AI: ${answers.ai_tools || "unspecified"}. Issue: ${cleanText(answers.problems, 260) || "not captured"}.`,
    result.state.caller_number,
  );
  if (alert.ok && !alert.suppressed) {
    const marked = await mutateCallState(
      input.callSid,
      () => result.state as NeuraxisCallState,
      (state) => ({ ...state, completion_alert_sent_at: new Date().toISOString() }),
    );
    if (marked.ok) result.state = marked.state;
  }
  return { ...result, alert };
}

function classifyDisposition(state: NeuraxisCallState): NonNullable<NeuraxisCallState["disposition"]> {
  if (state.room === "audit" && state.completed_intake) return "COMPLETED_AUDIT";
  if (state.room === "audit" && state.turns.length > 0) return "ABANDONED_AUDIT";
  if (state.room === "audit") return "ABANDONED_AUDIT_BEFORE_FIRST_ANSWER";
  if ((state.room === "workroom" || state.room === "private") && state.turns.length > 0) return "CONVERSATION_ENDED";
  if (state.room !== "menu" && state.room !== "unknown") return "DISCONNECTED_AFTER_MENU";
  if (state.room === "menu") return "DISCONNECTED_BEFORE_SELECTION";
  return "CALL_ENDED";
}

export async function finalizeCallTelemetry(input: {
  callSid: string;
  caller?: string;
  called?: string;
  callStatus?: string;
  durationSeconds?: number;
  direction?: string;
}): Promise<MutationResult & { alert?: { ok: boolean; error?: string; suppressed?: string } }> {
  const now = new Date().toISOString();
  const result = await mutateCallState(
    input.callSid,
    () => blankState({ callSid: input.callSid, caller: input.caller, called: input.called, direction: input.direction, startedAt: now }),
    (state) => {
      const ended: NeuraxisCallState = {
        ...state,
        caller_number: state.caller_number || normalizePhone(input.caller || "") || undefined,
        called_number: state.called_number || normalizePhone(input.called || "") || undefined,
        direction: state.direction || cleanText(input.direction, 80),
        status: "ENDED",
        twilio_status: cleanText(input.callStatus, 80) || state.twilio_status,
        duration_seconds: Number.isFinite(input.durationSeconds) ? Math.max(0, Number(input.durationSeconds)) : state.duration_seconds,
        ended_at: now,
        last_activity_at: now,
      };
      ended.disposition = classifyDisposition(ended);
      return ended;
    },
  );
  if (!result.ok || !result.state) return result;

  await writeHiveReceipt({
    reference: result.state.reference,
    category: "neuraxis_call_ended",
    payload: {
      event_type: "NEURAXIS_CALL_ENDED",
      truth_state: "OBSERVED",
      ...result.state,
      recorded_at: now,
    },
  }).catch(() => undefined);

  if (result.state.completion_alert_sent_at) return result;

  const lastTurn = [...result.state.turns].reverse().find((turn) => turn.heard);
  const who = result.state.caller_name_lookup
    ? `${result.state.caller_name_lookup} (${result.state.caller_number || "number unavailable"})`
    : result.state.caller_number || "unknown or blocked number";
  const duration = result.state.duration_seconds != null ? `${result.state.duration_seconds}s` : "duration unavailable";
  const summary = lastTurn?.heard ? ` Last caller statement: ${cleanText(lastTurn.heard, 220)}.` : "";
  const alert = await notifyMason(
    `NEURAXIS call ${result.state.reference} ended. ${who}. ${result.state.disposition}. ${duration}.${summary}`,
    result.state.caller_number,
  );
  if (alert.ok && !alert.suppressed) {
    const marked = await mutateCallState(
      input.callSid,
      () => result.state as NeuraxisCallState,
      (state) => ({ ...state, completion_alert_sent_at: new Date().toISOString() }),
    );
    if (marked.ok) result.state = marked.state;
  }
  return { ...result, alert };
}
