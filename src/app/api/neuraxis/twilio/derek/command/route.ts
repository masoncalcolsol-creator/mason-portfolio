import { after } from "next/server";

import {
  isAffirmative,
  isNegative,
  readTwilioForm,
  say,
  speak,
  speechOrDigits,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";
import {
  createDerekCallSession,
  validateDerekCallSession,
} from "@/lib/derek-lenderflow-auth";
import {
  appendDerekConversationTurn,
  derekConversationInput,
  parseConversationalFicoRule,
} from "@/lib/derek-lenderflow-conversation";
import {
  applyCanonicalLender,
  ensureDerekBridgeCredential,
  resolveCanonicalDerekLender,
  resolveDerekLenderIdentity,
} from "@/lib/derek-lenderflow-resolver";
import {
  fetchDerekWorkroomContext,
  parseDerekRule,
  publishDerekRule,
} from "@/lib/derek-lenderflow";
import { appendCallTurn } from "@/lib/neuraxis-call-telemetry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20;

const MAX_CLARIFICATION_ROUNDS = 4;
const LENDER_HINTS = "HomeXpress Mortgage, Home Express Mortgage, Figure, Homebridge, Rocket Pro, Newrez Wholesale, Angel Oak Mortgage Solutions";

function workroomUrl(requestUrl: string, session: string): string {
  const target = new URL("/api/neuraxis/twilio/derek/workroom", requestUrl);
  target.searchParams.set("session", session);
  return target.toString();
}

function commandUrl(requestUrl: string, session: string): string {
  const target = new URL("/api/neuraxis/twilio/derek/command", requestUrl);
  target.searchParams.set("session", session);
  return target.toString();
}

function isRepeat(value: string): boolean {
  const normalized = String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
  return normalized === "9"
    || /^(repeat|again|repeat that|say it again|reference|confirmation code|receipt)\b/.test(normalized);
}

/** Read the exact structured rule once and collect the one human-authority gate. */
function confirmationResponse(requestUrl: string, token: string, prompt: string): Response {
  const action = commandUrl(requestUrl, token);
  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech dtmf" numDigits="1" timeout="8" speechTimeout="auto" actionOnEmptyResult="true" method="POST" action="${xmlEscape(action)}">
    ${speak(`${prompt} Correct? Say yes or press 1. Say no or press 2.`, requestUrl)}
  </Gather>
  ${say("No confirmation was received. Nothing changed.")}
  <Hangup/>
</Response>`);
}

/** A missed answer gets one short retry without reading the rule a second time. */
function confirmationRetryResponse(requestUrl: string, token: string): Response {
  const action = commandUrl(requestUrl, token);
  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech dtmf" numDigits="1" timeout="7" speechTimeout="auto" actionOnEmptyResult="true" method="POST" action="${xmlEscape(action)}">
    ${speak("Say yes or press 1 to publish. Say no or press 2 to cancel. Say repeat or press 9 to hear the rule again.", requestUrl)}
  </Gather>
  ${say("No confirmation was received. Nothing changed.")}
  <Hangup/>
</Response>`);
}

/** Speak the result once, then offer an optional reference-only repeat. */
function publishedResultResponse(requestUrl: string, token: string, spoken: string): Response {
  const action = commandUrl(requestUrl, token);
  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech dtmf" numDigits="1" timeout="5" speechTimeout="auto" method="POST" action="${xmlEscape(action)}">
    ${speak(`${spoken} Say repeat or press 9 to hear the result reference again. Otherwise you may hang up.`, requestUrl)}
  </Gather>
  <Hangup/>
</Response>`);
}

function receiptStatus(result: Awaited<ReturnType<typeof publishDerekRule>>): string {
  const receipts: string[] = [];
  if (result.hiveReceiptUrl) receipts.push("the Hive receipt was written");
  if (result.emailMessageId) receipts.push("the email receipt was sent to Mason");
  if (!receipts.length) {
    return "The LenderFlow publish receipt is confirmed. Secondary Hive and email delivery were not confirmed.";
  }
  if (receipts.length === 1) return `The LenderFlow publish receipt is confirmed, and ${receipts[0]}.`;
  return `The LenderFlow publish receipt is confirmed, ${receipts[0]}, and ${receipts[1]}.`;
}

function safeFailureDetail(value: string | undefined): string {
  const detail = String(value || "").replace(/\s+/g, " ").trim().slice(0, 240);
  if (!detail) return "LenderFlow did not return a publish receipt.";
  if (/key|token|credential|unauthorized|forbidden/i.test(detail)) {
    return "The private service identity was rejected.";
  }
  return detail;
}

function operationalFailure(message: string): Response {
  // Always return valid 200 TwiML for caller-facing operational failures.
  // Non-2xx Twilio webhook responses trigger Twilio's generic application-error
  // voice instead of playing our controlled US-English message.
  return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say(message)}<Hangup/></Response>`);
}

async function handlePost(request: Request): Promise<Response> {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }

  const url = new URL(request.url);
  const token = url.searchParams.get("session") || "";
  const callSid = params.CallSid || "browser-test";
  const caller = params.From || "";
  const session = validateDerekCallSession(token, callSid, caller);
  if (!session) {
    return operationalFailure("Your private workroom session expired. Nothing changed. Call again and choose room three.");
  }

  const heard = speechOrDigits(params);

  // Every Vercel function invocation receives a short-lived signed workload
  // identity. Use it for both the catalog lookup and the confirmed write.
  const vercelOidcToken = request.headers.get("x-vercel-oidc-token") || "";
  if (vercelOidcToken) process.env.LF_ADMIN_KEY = vercelOidcToken;
  ensureDerekBridgeCredential();

  if (session.publishedResult) {
    if (isRepeat(heard)) {
      return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak(session.publishedResult.spoken, request.url)}<Hangup/></Response>`);
    }
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("The transaction is complete. Goodbye.", request.url)}<Hangup/></Response>`);
  }

  if (session.pending) {
    if (isAffirmative(heard)) {
      const result = await publishDerekRule({
        proposal: session.pending,
        callSid,
        caller,
        spokenCommand: session.pending.note || session.pending.spokenSummary,
      });
      const receiptStatement = receiptStatus(result);
      const spoken = result.ok
        ? `Done. The rule is published. Reference ${result.reference}.${result.ruleId ? ` Rule ID ${result.ruleId}.` : ""} ${receiptStatement} Refresh LenderFlow and rerun the scenario.`
        : `Nothing changed. Reference ${result.reference}. LenderFlow rejected the write: ${safeFailureDetail(result.error)} ${receiptStatement}`;
      const resultToken = createDerekCallSession(
        callSid,
        caller,
        undefined,
        undefined,
        0,
        {
          ok: result.ok,
          reference: result.reference,
          ...(result.ruleId ? { ruleId: result.ruleId } : {}),
          spoken,
        },
      );

      after(async () => {
        try {
          await appendCallTurn({
            callSid,
            room: "private",
            step: result.ok ? "derek_lenderflow_rule_published" : "derek_lenderflow_rule_failed",
            heard: "EXPLICIT_CONFIRMATION",
            response: spoken,
            preserveSpeech: false,
            capturedFields: {
              workroom_id: "NEURAXIS_ROOM_3_DEREK_LENDERFLOW",
              reference: result.reference,
              lender: session.pending?.lenderDisplayName,
              field_key: session.pending?.fieldKey,
              operator: session.pending?.operator,
              value: session.pending?.value,
              program: session.pending?.program,
              permanent: !session.pending?.temporary,
              write_ok: result.ok,
              rule_id: result.ruleId || null,
              hive_receipt_confirmed: Boolean(result.hiveReceiptUrl),
              email_receipt_confirmed: Boolean(result.emailMessageId),
              failure_class: result.ok ? null : safeFailureDetail(result.error),
              service_identity: vercelOidcToken ? "VERCEL_OIDC" : "LEGACY_ENV_KEY",
              operator_flow: "ONE_READBACK_ONE_CONFIRMATION_OPTIONAL_REFERENCE_REPEAT",
            },
          });
        } catch (error) {
          console.error("Derek LenderFlow publish telemetry failed", error);
        }
      });

      return publishedResultResponse(request.url, resultToken, spoken);
    }

    if (isNegative(heard)) {
      return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Canceled. Nothing changed and no lender rule was published.", request.url)}<Hangup/></Response>`);
    }

    if (isRepeat(heard)) {
      return confirmationResponse(request.url, token, session.pending.spokenSummary);
    }

    if ((session.clarificationCount || 0) >= 1) {
      return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("I did not receive a clear yes or no. Nothing changed. Call again when ready.", request.url)}<Hangup/></Response>`);
    }

    const retryToken = createDerekCallSession(callSid, caller, session.pending, undefined, 1);
    return confirmationRetryResponse(request.url, retryToken);
  }

  const draftTurns = appendDerekConversationTurn(session.draftTurns, heard);
  const fullUtterance = derekConversationInput(draftTurns);

  // Fast path: resolve the lender from LenderFlow's lightweight identity catalog,
  // then parse the common FICO command locally. Do not fetch Hive policy or call
  // a model unless this deterministic route cannot understand the requested field.
  const lenderIdentity = await resolveDerekLenderIdentity(fullUtterance);
  const deterministicProposal = parseConversationalFicoRule(
    draftTurns,
    lenderIdentity.ok ? lenderIdentity.lender : undefined,
  );

  let parsed;
  if (deterministicProposal) {
    parsed = { ok: true as const, proposal: deterministicProposal };
  } else {
    let context: string;
    try {
      context = await fetchDerekWorkroomContext();
    } catch (error) {
      console.error("Derek LenderFlow context load failed", error);
      return operationalFailure("The governed workroom context is temporarily unavailable. Nothing changed. Please call again shortly.");
    }
    parsed = await parseDerekRule(fullUtterance, context);
  }

  if (parsed.ok) {
    parsed = lenderIdentity.ok
      ? { ok: true as const, proposal: applyCanonicalLender(parsed.proposal, lenderIdentity.lender) }
      : await resolveCanonicalDerekLender(parsed.proposal, fullUtterance);
  } else if (!lenderIdentity.ok && /which lender|lender name|company name/i.test(parsed.clarification)) {
    parsed = lenderIdentity;
  }

  if (!parsed.ok) {
    const clarificationCount = (session.clarificationCount || 0) + 1;

    if (clarificationCount >= MAX_CLARIFICATION_ROUNDS) {
      const freshToken = createDerekCallSession(callSid, caller);
      const next = workroomUrl(request.url, freshToken);
      return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  ${speak("I cleared only this unfinished draft rather than risk changing the wrong lender. Start again with one company name and one rule.", request.url)}
  <Redirect method="POST">${xmlEscape(next)}</Redirect>
</Response>`);
    }

    const draftToken = createDerekCallSession(callSid, caller, undefined, draftTurns, clarificationCount);
    const action = commandUrl(request.url, draftToken);
    return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" hints="${xmlEscape(LENDER_HINTS)}" timeout="10" speechTimeout="auto" actionOnEmptyResult="true" method="POST" action="${xmlEscape(action)}">
    ${speak(`${parsed.clarification} I kept the usable details you already gave me.`, request.url)}
  </Gather>
  ${speak("I kept the unfinished rule and will ask once more.", request.url)}
  <Redirect method="POST">${xmlEscape(action)}</Redirect>
</Response>`);
  }

  const pendingToken = createDerekCallSession(callSid, caller, parsed.proposal);
  after(async () => {
    try {
      await appendCallTurn({
        callSid,
        room: "private",
        step: "derek_lenderflow_rule_proposed",
        heard: "STRUCTURED_COMMAND_CAPTURED",
        response: parsed.proposal.spokenSummary,
        preserveSpeech: false,
        capturedFields: {
          workroom_id: "NEURAXIS_ROOM_3_DEREK_LENDERFLOW",
          lender: parsed.proposal.lenderDisplayName,
          field_key: parsed.proposal.fieldKey,
          operator: parsed.proposal.operator,
          value: parsed.proposal.value,
          program: parsed.proposal.program,
          permanent: !parsed.proposal.temporary,
          clarification_turns: Math.max(0, draftTurns.length - 1),
          catalog_first_lender_resolution: lenderIdentity.ok,
          deterministic_phone_fast_path: Boolean(deterministicProposal),
          canonical_lender_resolved_before_confirmation: true,
          mutation_status: "AWAITING_EXPLICIT_CONFIRMATION",
          service_identity: vercelOidcToken ? "VERCEL_OIDC" : "LEGACY_ENV_KEY",
          operator_flow: "ONE_READBACK_ONE_CONFIRMATION",
        },
      });
    } catch (error) {
      console.error("Derek LenderFlow proposal telemetry failed", error);
    }
  });
  return confirmationResponse(request.url, pendingToken, parsed.proposal.spokenSummary);
}

export async function POST(request: Request) {
  try {
    return await handlePost(request);
  } catch (error) {
    console.error("Derek Room 3 unhandled webhook failure", error);
    return operationalFailure("Room three hit a temporary processing error. Nothing changed. Please call again shortly.");
  }
}
