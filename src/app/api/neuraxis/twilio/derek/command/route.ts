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
  fetchDerekWorkroomContext,
  parseDerekRule,
  publishDerekRule,
} from "@/lib/derek-lenderflow";
import { appendCallTurn } from "@/lib/neuraxis-call-telemetry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_CLARIFICATION_ROUNDS = 4;

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

function confirmationResponse(requestUrl: string, token: string, prompt: string): Response {
  const action = commandUrl(requestUrl, token);
  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech dtmf" numDigits="1" timeout="8" speechTimeout="auto" actionOnEmptyResult="true" method="POST" action="${xmlEscape(action)}">
    ${speak(`${prompt} Say yes or press 1 to publish it. Say no or press 2 to cancel.`, requestUrl)}
  </Gather>
  ${speak("I need a clear yes or no before anything changes.", requestUrl)}
  <Redirect method="POST">${xmlEscape(action)}</Redirect>
</Response>`);
}

function receiptStatus(result: Awaited<ReturnType<typeof publishDerekRule>>): string {
  const receipts: string[] = [];
  if (result.hiveReceiptUrl) receipts.push("the Hive receipt was written");
  if (result.emailMessageId) receipts.push("the email receipt was sent to Mason");
  if (!receipts.length) return "No receipt delivery was confirmed, so keep the reference number.";
  if (receipts.length === 1) return `${receipts[0]}.`;
  return `${receipts[0]}, and ${receipts[1]}.`;
}

export async function POST(request: Request) {
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
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Your private workroom session expired. Return to the main menu and choose room three.", request.url)}<Hangup/></Response>`, 403);
  }

  const heard = speechOrDigits(params);

  if (session.pending) {
    if (isAffirmative(heard)) {
      const result = await publishDerekRule({
        proposal: session.pending,
        callSid,
        caller,
        spokenCommand: session.pending.note || session.pending.spokenSummary,
      });
      const freshToken = createDerekCallSession(callSid, caller);
      const next = workroomUrl(request.url, freshToken);
      const receiptStatement = receiptStatus(result);
      const spoken = result.ok
        ? `The rule is published. Reference ${result.reference}. ${receiptStatement} Refresh LenderFlow and rerun the Catalina Wine Mixer sample. That lender should no longer match outside the new boundary. What would you like to change next?`
        : `The rule was not changed. Reference ${result.reference}. The LenderFlow write failed, so I did not describe it as complete. ${receiptStatement} You can give me another rule, or try this one again after the bridge is repaired.`;

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
            },
          });
        } catch (error) {
          console.error("Derek LenderFlow publish telemetry failed", error);
        }
      });

      return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak(spoken, request.url)}<Redirect method="POST">${xmlEscape(next)}</Redirect></Response>`);
    }

    if (isNegative(heard)) {
      const freshToken = createDerekCallSession(callSid, caller);
      const next = workroomUrl(request.url, freshToken);
      return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Canceled. Nothing changed and no lender rule was published.", request.url)}<Redirect method="POST">${xmlEscape(next)}</Redirect></Response>`);
    }

    return confirmationResponse(request.url, token, `The pending change is: ${session.pending.spokenSummary}`);
  }

  const draftTurns = appendDerekConversationTurn(session.draftTurns, heard);

  let context: string;
  try {
    context = await fetchDerekWorkroomContext();
  } catch (error) {
    console.error("Derek LenderFlow context load failed", error);
    const next = workroomUrl(request.url, token);
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("The governed workroom context is unavailable, so I will not translate or change a lender rule. Please try again shortly.", request.url)}<Redirect method="POST">${xmlEscape(next)}</Redirect></Response>`, 503);
  }

  const deterministicProposal = parseConversationalFicoRule(draftTurns);
  const parsed = deterministicProposal
    ? { ok: true as const, proposal: deterministicProposal }
    : await parseDerekRule(derekConversationInput(draftTurns), context);

  if (!parsed.ok) {
    const clarificationCount = (session.clarificationCount || 0) + 1;

    if (clarificationCount >= MAX_CLARIFICATION_ROUNDS) {
      const freshToken = createDerekCallSession(callSid, caller);
      const next = workroomUrl(request.url, freshToken);
      return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  ${speak("I got stuck trying to assemble that rule, so I cleared only this unfinished draft instead of asking the same questions forever. Say the complete rule again in one sentence, for example: Change Wholesale minimum FICO to 600.", request.url)}
  <Redirect method="POST">${xmlEscape(next)}</Redirect>
</Response>`);
    }

    const draftToken = createDerekCallSession(callSid, caller, undefined, draftTurns, clarificationCount);
    const action = commandUrl(request.url, draftToken);
    return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" timeout="10" speechTimeout="auto" actionOnEmptyResult="true" method="POST" action="${xmlEscape(action)}">
    ${speak(`${parsed.clarification} I kept everything you already told me. Answer only the missing part.`, request.url)}
  </Gather>
  ${speak("I did not catch the missing detail. I kept the unfinished rule and will ask once more.", request.url)}
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
          mutation_status: "AWAITING_EXPLICIT_CONFIRMATION",
        },
      });
    } catch (error) {
      console.error("Derek LenderFlow proposal telemetry failed", error);
    }
  });
  return confirmationResponse(request.url, pendingToken, `I heard this proposed matching rule: ${parsed.proposal.spokenSummary}`);
}
