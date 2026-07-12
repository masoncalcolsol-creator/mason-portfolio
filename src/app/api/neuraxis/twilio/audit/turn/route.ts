import {
  auditReference,
  decodeState,
  encodeState,
  isAffirmative,
  isNegative,
  readTwilioForm,
  say,
  sendTwilioSms,
  speak,
  speechOrDigits,
  twiml,
  validateTwilioRequest,
  writeHiveReceipt,
  xmlEscape,
} from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

type AuditStep =
  | "identity"
  | "employees"
  | "using_ai"
  | "ai_tools"
  | "ai_issues"
  | "issue_example"
  | "improvement_goal"
  | "why_audit_without_ai"
  | "ai_owner"
  | "workflow"
  | "intended_outcome"
  | "recent_failure"
  | "prior_attempts"
  | "consequence_owner";

type AuditState = {
  step: AuditStep;
  callSid: string;
  caller: string;
  callerName?: string;
  callerType?: string;
  startedAt: string;
  branch?: "USES_AI" | "NO_AI";
  answers: Record<string, string>;
};

const prompts: Record<AuditStep, string> = {
  identity: "Say your name, company, and title.",
  employees: "Roughly how many employees are there? Round to the nearest ten or hundred.",
  using_ai: "Are you already using AI anywhere in this workflow or company? Yes or no.",
  ai_tools: "Which AI systems are you using? Names are enough.",
  ai_issues: "Are they causing problems? Yes or no.",
  issue_example: "How are they causing problems? Give me one concrete example.",
  improvement_goal: "What result are you trying to improve, even if the AI is not obviously failing?",
  why_audit_without_ai: "What made you consider an AI audit before using AI?",
  ai_owner: "Who is in charge of the AI today?",
  workflow: "Give me one real workflow to inspect. What starts it, and where should it end?",
  intended_outcome: "What outcome is that workflow supposed to produce?",
  recent_failure: "What is one recent failure, exception, or workaround?",
  prior_attempts: "What has already been tried?",
  consequence_owner: "Who owns the consequence when it fails?",
};

function gatherPrompt(request: Request, state: AuditState, prompt: string, prefix = ""): Response {
  const action = new URL("/api/neuraxis/twilio/audit/turn", request.url);
  action.searchParams.set("state", encodeState(state));
  const spoken = `${prefix ? `${prefix} ` : ""}${prompt}`.trim();
  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" timeout="9" speechTimeout="3" actionOnEmptyResult="true" method="POST" action="${xmlEscape(action.toString())}">
    ${speak(spoken, request.url)}
  </Gather>
  ${speak(`I did not catch that. ${prompt}`, request.url)}
  <Redirect method="POST">${xmlEscape(action.toString())}</Redirect>
</Response>`);
}

function move(state: AuditState, step: AuditStep): AuditState {
  return { ...state, step };
}

async function finishAudit(request: Request, state: AuditState): Promise<Response> {
  const reference = auditReference(state.callSid);
  const continueUrl = new URL(`/ai-audit/continue?ref=${encodeURIComponent(reference)}`, request.url).toString();
  const statusUrl = new URL(`/api/neuraxis/twilio/message-status?ref=${encodeURIComponent(reference)}`, request.url).toString();
  const smsBody = `NULLWORKS AI Audit: ${reference}. Confirm your email or add context: ${continueUrl} This follows your call. Reply STOP to opt out.`;

  const receiptPayload = {
    event_type: "AI_OPERATING_MODEL_CONVERSATIONAL_PHONE_TRIAGE",
    truth_state: "PROPOSED",
    reference,
    call_sid: state.callSid,
    caller_number: state.caller,
    caller_name_lookup: state.callerName || null,
    caller_type_lookup: state.callerType || null,
    branch: state.branch || "UNKNOWN",
    answers: state.answers,
    started_at: state.startedAt,
    completed_at: new Date().toISOString(),
    boundary: "Conversational phone triage only. Human review is required before diagnosis or consequential recommendation.",
  };

  const [sms, receipt] = await Promise.all([
    state.caller
      ? sendTwilioSms({ to: state.caller, body: smsBody, statusCallback: statusUrl })
      : Promise.resolve({ ok: false, error: "Twilio did not provide caller number" }),
    writeHiveReceipt({ reference, category: "ai_audit_conversational_triage", payload: receiptPayload }),
  ]);

  await writeHiveReceipt({
    reference,
    category: "ai_audit_phone_dispatch",
    payload: {
      event_type: "AI_AUDIT_PHONE_DISPATCH",
      truth_state: "OBSERVED",
      reference,
      sms,
      receipt,
      recorded_at: new Date().toISOString(),
    },
  }).catch(() => undefined);

  if (!sms.ok || !receipt.ok) {
    console.error("AI audit handoff incomplete", { reference, sms, receipt });
  }

  const spokenReference = reference.replace("-", " ");
  const closing = sms.ok && receipt.ok
    ? `That is enough for the first pass. I saved the intake as ${spokenReference} and sent you a text. Mason will review the workflow before any diagnosis is made.`
    : receipt.ok
      ? `That is enough for the first pass. I saved the intake as ${spokenReference}. I could not confirm the text, so keep that reference for Mason.`
      : `I created reference ${spokenReference}, but I could not confirm the handoff. Keep that reference and contact Mason directly.`;

  return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak(closing, request.url)}<Hangup/></Response>`);
}

export async function POST(request: Request) {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }

  const token = new URL(request.url).searchParams.get("state") || "";
  const state = decodeState<AuditState>(token);
  if (!state?.step || !state.callSid || !state.answers) {
    const restart = new URL("/api/neuraxis/twilio/audit/start", request.url).toString();
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("The audit session expired. Let's start again.", request.url)}<Redirect method="POST">${xmlEscape(restart)}</Redirect></Response>`);
  }

  const answer = speechOrDigits(params).trim();
  if (!answer) return gatherPrompt(request, state, prompts[state.step], "I did not hear an answer.");

  if (state.step === "using_ai") {
    if (!isAffirmative(answer) && !isNegative(answer)) {
      return gatherPrompt(request, state, prompts.using_ai, "I need a clear yes or no.");
    }
    const usesAi = isAffirmative(answer);
    const next: AuditState = {
      ...state,
      branch: usesAi ? "USES_AI" : "NO_AI",
      step: usesAi ? "ai_tools" : "why_audit_without_ai",
      answers: { ...state.answers, using_ai: usesAi ? "YES" : "NO", using_ai_raw: answer },
    };
    return gatherPrompt(request, next, prompts[next.step], usesAi ? "Okay." : "Understood.");
  }

  if (state.step === "ai_issues") {
    if (!isAffirmative(answer) && !isNegative(answer)) {
      return gatherPrompt(request, state, prompts.ai_issues, "I need a clear yes or no.");
    }
    const hasIssues = isAffirmative(answer);
    const next: AuditState = {
      ...state,
      step: hasIssues ? "issue_example" : "improvement_goal",
      answers: { ...state.answers, ai_causing_issues: hasIssues ? "YES" : "NO", ai_issues_raw: answer },
    };
    return gatherPrompt(request, next, prompts[next.step], hasIssues ? "Good. Let's make it concrete." : "Good. Then let's look for unrealized value.");
  }

  const answers = { ...state.answers, [state.step]: answer };

  switch (state.step) {
    case "identity": {
      const next = { ...move(state, "employees"), answers };
      return gatherPrompt(request, next, prompts.employees, "Got it.");
    }
    case "employees": {
      const next = { ...move(state, "using_ai"), answers };
      return gatherPrompt(request, next, prompts.using_ai, "That gives me the scale.");
    }
    case "ai_tools": {
      const next = { ...move(state, "ai_issues"), answers };
      return gatherPrompt(request, next, prompts.ai_issues);
    }
    case "issue_example":
    case "improvement_goal": {
      const next = { ...move(state, "ai_owner"), answers };
      return gatherPrompt(request, next, prompts.ai_owner);
    }
    case "why_audit_without_ai": {
      const next = { ...move(state, "workflow"), answers };
      return gatherPrompt(request, next, prompts.workflow, "That makes sense.");
    }
    case "ai_owner": {
      const next = { ...move(state, "workflow"), answers };
      return gatherPrompt(request, next, prompts.workflow, "Now let's leave the tool layer and look at the work.");
    }
    case "workflow": {
      const next = { ...move(state, "intended_outcome"), answers };
      return gatherPrompt(request, next, prompts.intended_outcome);
    }
    case "intended_outcome": {
      const next = { ...move(state, "recent_failure"), answers };
      return gatherPrompt(request, next, prompts.recent_failure);
    }
    case "recent_failure": {
      const next = { ...move(state, "prior_attempts"), answers };
      return gatherPrompt(request, next, prompts.prior_attempts);
    }
    case "prior_attempts": {
      const next = { ...move(state, "consequence_owner"), answers };
      return gatherPrompt(request, next, prompts.consequence_owner);
    }
    case "consequence_owner":
      return finishAudit(request, { ...state, answers });
    default:
      return finishAudit(request, { ...state, answers });
  }
}
