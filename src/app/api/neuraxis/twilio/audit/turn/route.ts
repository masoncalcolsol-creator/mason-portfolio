import {
  auditReference,
  decodeState,
  encodeState,
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

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const DEFAULT_OPENAI_MODEL = "gpt-5.5";
const RAW_OPENAI_MODEL = (process.env.OPENAI_MODEL || "").trim();
const OPENAI_MODEL = !RAW_OPENAI_MODEL || RAW_OPENAI_MODEL.toLowerCase().includes("luna")
  ? DEFAULT_OPENAI_MODEL
  : RAW_OPENAI_MODEL;

type AuditAnswers = {
  name?: string;
  company?: string;
  title?: string;
  employees?: string;
  using_ai?: string;
  ai_tools?: string;
  problems?: string;
  contact_preference?: string;
};

type AuditState = {
  step: "conversation";
  callSid: string;
  caller: string;
  callerName?: string;
  callerType?: string;
  startedAt: string;
  turns: number;
  answers: AuditAnswers;
  notes: string[];
};

type ModelDecision = {
  acknowledgement?: string;
  answer?: string;
  next_question?: string;
  action?: "continue" | "handoff" | "end";
  contact_requested?: boolean;
  fields?: Partial<AuditAnswers>;
};

const FIELD_KEYS: Array<keyof AuditAnswers> = [
  "name",
  "company",
  "title",
  "employees",
  "using_ai",
  "ai_tools",
  "problems",
  "contact_preference",
];

function cleanSpoken(value: unknown, max = 420): string {
  return String(value || "")
    .replace(/[`*_#{}\[\]]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function extractOutputText(data: unknown): string {
  const record = data as {
    output_text?: string;
    output?: Array<{ content?: Array<{ text?: string }> }>;
  };
  return record.output_text
    || record.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join(" ")
    || "";
}

function mergeAnswers(current: AuditAnswers, incoming?: Partial<AuditAnswers>): AuditAnswers {
  const merged = { ...current };
  if (!incoming) return merged;
  for (const key of FIELD_KEYS) {
    const value = cleanSpoken(incoming[key], key === "problems" ? 800 : 220);
    if (value) merged[key] = value;
  }
  return merged;
}

function nextBroadQuestion(answers: AuditAnswers): string {
  if (!answers.name || !answers.company || !answers.title) {
    return "Give me your name, company, and title. You can say all three together.";
  }
  if (!answers.employees) {
    return "Roughly how many employees are in the organization? A range is fine.";
  }
  if (!answers.using_ai && !answers.ai_tools) {
    return "What AI are you using, if any? Names or a plain description are enough.";
  }
  if (!answers.problems) {
    return "What is going wrong, or what outcome do you want fixed? Give me the broad version.";
  }
  return "I have enough for a first pass. Do you want Mason to contact you, or should I just text you the audit page?";
}

function hasCoreIntake(answers: AuditAnswers): boolean {
  return Boolean(
    answers.name
    && answers.company
    && answers.title
    && answers.employees
    && (answers.using_ai || answers.ai_tools)
    && answers.problems,
  );
}

function staticExplanation(userSpeech: string): string | undefined {
  const normalized = userSpeech.toLowerCase();
  if (/who is mason|what does mason|tell me about mason/.test(normalized)) {
    return "Mason Perry is the founder of NULLWORKS and an Operational Intelligence Systems Architect. He works from the outcome backward, connecting real operations, people, AI, software, authority, evidence, and implementation.";
  }
  if (/what is nullworks|what does nullworks|who is nullworks/.test(normalized)) {
    return "NULLWORKS designs the operating system around AI workers: workflow, roles, authority, evidence, exceptions, memory, review, and telemetry. The point is not another tool. The point is a working organization around the tools you already have.";
  }
  if (/what is this|what is the audit|why are you asking|what is this for|how does this work/.test(normalized)) {
    return "This is a fast operating-model triage. We start with why the work exists and what is actually failing, then look for the lowest-lift fix. The answer may be workflow, people, authority, software, AI, or no new technology at all.";
  }
  if (/are you ai|are you an assistant|what are you/.test(normalized)) {
    return "NEURAXIS is the voice gateway for NULLWORKS Organizational Intelligence. This room explains the audit, captures the broad problem, and preserves a handoff for Mason. It is not pretending to be the final auditor or decision-maker.";
  }
  return undefined;
}

function fallbackDecision(userSpeech: string, answers: AuditAnswers): ModelDecision {
  const normalized = userSpeech.toLowerCase();
  const explanation = staticExplanation(userSpeech);
  const contact = /contact mason|call me|email me|reach out|have mason|talk to mason|speak to mason/.test(normalized);
  const textOnly = /just text|send me the page|text me the page|no follow.?up|do not call/.test(normalized);
  const fields: Partial<AuditAnswers> = {};

  const employeeMatch = userSpeech.match(/\b(?:about|around|roughly|approximately)?\s*(\d{1,7})(?:\s+employees?|\s+people|\s+staff)\b/i);
  if (employeeMatch) fields.employees = employeeMatch[1];

  if (/\b(we|i|our company)\s+(use|uses|have|has|run|runs)\s+ai\b/i.test(userSpeech)) fields.using_ai = "YES";
  if (/\b(no ai|not using ai|do not use ai|don't use ai)\b/i.test(userSpeech)) fields.using_ai = "NO";

  const toolMatches = userSpeech.match(/\b(ChatGPT|OpenAI|Claude|Gemini|Copilot|Grok|Salesforce Einstein|Microsoft 365 Copilot|Perplexity)\b/gi);
  if (toolMatches?.length) fields.ai_tools = [...new Set(toolMatches)].join(", ");

  if (/problem|issue|sucks|doesn.?t work|not working|cost|expensive|replace people|fix it|trouble|worse|failure/i.test(userSpeech)) {
    fields.problems = cleanSpoken(userSpeech, 800);
  }

  return {
    acknowledgement: explanation ? "Absolutely." : "Got it.",
    answer: explanation,
    next_question: explanation ? nextBroadQuestion(mergeAnswers(answers, fields)) : undefined,
    action: contact ? "handoff" : textOnly ? "end" : "continue",
    contact_requested: contact,
    fields,
  };
}

async function analyzeTurn(userSpeech: string, state: AuditState): Promise<ModelDecision> {
  if (!OPENAI_API_KEY) return fallbackDecision(userSpeech, state.answers);

  const instructions = `You are NEURAXIS, the NULLWORKS Organizational Intelligence phone gateway inside the AI Operating Model Audit room. You are not an AI assistant and must never call yourself one.

Your job is to keep a busy executive engaged, answer interruptions directly, extract broad intake facts from natural speech, and create a clean handoff. Do not run a rigid interview. Do not ask detailed workflow, consequence-owner, prior-attempt, or diagnostic questions. Accept several facts in one sentence. Never make the caller repeat information already captured.

NULLWORKS context:
- Mason Perry is Founder of NULLWORKS and a pioneering Operational Intelligence Systems Architect.
- NULLWORKS examines the intent and why from outside, walks the real work, and finds the lowest-lift change that restores the outcome.
- The fix may be workflow, authority, people, physical conditions, software, AI, or no new technology.
- NULLWORKS is not using this call to sell another software platform or force a consulting engagement.
- The audit may conclude: fix the flow, forward deploy and hand off, install OISA capacity, or reset the operating model before more AI.
- AI is part of the system, not the system itself. Independent evidence, human review, and outcome testing remain required.
- Mason remains final Human Authority and reviews the intake before any diagnosis.

Capture only facts the caller actually states:
name, company, title, approximate employees, whether they use AI, which AI, and the broad problem or desired outcome.

Behavior:
- If the caller asks what this is, why questions are being asked, what NULLWORKS is, who Mason is, or how the audit works, answer in one to three short spoken sentences, then ask at most one broad missing-field question.
- If the caller sounds impatient, answer the immediate question first and shorten the interaction.
- If the caller asks Mason to call, email, contact, or reach out, set action to handoff.
- If the caller only wants the page texted and no follow-up, set action to end.
- Once all core facts are present, ask whether Mason should contact them or whether they only want the audit page texted.
- Preserve the caller's broad explanation. Do not narrow it prematurely to one small symptom.

Return JSON only, with this exact shape:
{
  "acknowledgement": "brief natural acknowledgement",
  "answer": "direct answer to an interruption or empty string",
  "next_question": "one broad question or empty string",
  "action": "continue" | "handoff" | "end",
  "contact_requested": true | false,
  "fields": {
    "name": "",
    "company": "",
    "title": "",
    "employees": "",
    "using_ai": "",
    "ai_tools": "",
    "problems": "",
    "contact_preference": ""
  }
}`;

  const input = `CURRENT CAPTURED FIELDS:
${JSON.stringify(state.answers)}

CALLER SAID:
${userSpeech}`;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        instructions,
        input,
        max_output_tokens: 360,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("NEURAXIS audit model failed", response.status, (await response.text()).slice(0, 500));
      return fallbackDecision(userSpeech, state.answers);
    }

    const raw = extractOutputText(await response.json());
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return fallbackDecision(userSpeech, state.answers);
    const parsed = JSON.parse(match[0]) as ModelDecision;
    return {
      acknowledgement: cleanSpoken(parsed.acknowledgement, 160),
      answer: cleanSpoken(parsed.answer, 520),
      next_question: cleanSpoken(parsed.next_question, 260),
      action: parsed.action === "handoff" || parsed.action === "end" ? parsed.action : "continue",
      contact_requested: Boolean(parsed.contact_requested),
      fields: parsed.fields,
    };
  } catch (error) {
    console.error("NEURAXIS audit analysis failed", error);
    return fallbackDecision(userSpeech, state.answers);
  }
}

function gatherPrompt(request: Request, state: AuditState, spoken: string): Response {
  const action = new URL("/api/neuraxis/twilio/audit/turn", request.url);
  action.searchParams.set("state", encodeState(state));
  const prompt = cleanSpoken(spoken, 760) || nextBroadQuestion(state.answers);
  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" timeout="7" speechTimeout="auto" actionOnEmptyResult="true" method="POST" action="${xmlEscape(action.toString())}">
    ${speak(prompt, request.url)}
  </Gather>
  ${speak("I did not catch that. Say it however you would explain it to Mason.", request.url)}
  <Redirect method="POST">${xmlEscape(action.toString())}</Redirect>
</Response>`);
}

async function finishAudit(
  request: Request,
  state: AuditState,
  contactRequested: boolean,
): Promise<Response> {
  const reference = auditReference(state.callSid);
  const auditUrl = new URL("/ai-audit", request.url).toString();
  const continueUrl = new URL(`/ai-audit/continue?ref=${encodeURIComponent(reference)}`, request.url).toString();
  const statusUrl = new URL(`/api/neuraxis/twilio/message-status?ref=${encodeURIComponent(reference)}`, request.url).toString();
  const smsBody = `NULLWORKS audit ${reference}: overview ${auditUrl} Complete the handoff or add email/context ${continueUrl} This follows your call. Reply STOP to opt out.`;

  const receiptPayload = {
    event_type: "AI_OPERATING_MODEL_CONVERSATIONAL_PHONE_TRIAGE",
    truth_state: "USER_REPORTED",
    reference,
    call_sid: state.callSid,
    caller_number: state.caller,
    caller_name_lookup: state.callerName || null,
    caller_type_lookup: state.callerType || null,
    contact_requested: contactRequested,
    answers: state.answers,
    caller_notes: state.notes,
    turns: state.turns,
    started_at: state.startedAt,
    completed_at: new Date().toISOString(),
    boundary: "Broad conversational phone triage only. Mason must review the evidence before diagnosis, recommendation, or outreach.",
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
      contact_requested: contactRequested,
      sms,
      receipt,
      recorded_at: new Date().toISOString(),
    },
  }).catch(() => undefined);

  if (!sms.ok || !receipt.ok) {
    console.error("AI audit handoff incomplete", { reference, sms, receipt });
  }

  const spokenReference = reference.replace("-", " ");
  let closing: string;
  if (sms.ok && receipt.ok) {
    closing = contactRequested
      ? `Got it. I preserved the intake for Mason and texted you the audit page and handoff link. Your reference is ${spokenReference}. Mason will review it before any diagnosis.`
      : `Got it. I preserved the intake and texted you the audit page and handoff link. Your reference is ${spokenReference}. No diagnosis has been made.`;
  } else if (receipt.ok) {
    closing = `I preserved the intake as ${spokenReference}, but I could not confirm the text. Keep that reference for Mason.`;
  } else {
    closing = `I created reference ${spokenReference}, but I could not confirm the handoff. Please use the NULLWORKS audit page to contact Mason directly.`;
  }

  return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak(closing, request.url)}<Hangup/></Response>`);
}

export async function POST(request: Request) {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }

  const token = new URL(request.url).searchParams.get("state") || "";
  const state = decodeState<AuditState>(token);
  if (!state?.callSid || !state.answers || !Array.isArray(state.notes)) {
    const restart = new URL("/api/neuraxis/twilio/audit/start", request.url).toString();
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("The audit room reset. Let's start again.", request.url)}<Redirect method="POST">${xmlEscape(restart)}</Redirect></Response>`);
  }

  const userSpeech = cleanSpoken(speechOrDigits(params), 1200);
  if (!userSpeech) {
    return gatherPrompt(request, state, nextBroadQuestion(state.answers));
  }

  const decision = await analyzeTurn(userSpeech, state);
  const answers = mergeAnswers(state.answers, decision.fields);
  const notes = [...state.notes, userSpeech.slice(0, 320)].slice(-6);
  const nextState: AuditState = {
    ...state,
    turns: state.turns + 1,
    answers,
    notes,
  };

  const normalized = userSpeech.toLowerCase();
  const explicitContact = Boolean(
    decision.contact_requested
    || /contact mason|call me|email me|reach out|have mason|talk to mason|speak to mason/.test(normalized),
  );
  const explicitEnd = decision.action === "end" || /just text|send me the page|text me the page|no follow.?up|do not call/.test(normalized);

  if (decision.action === "handoff" || explicitContact) {
    nextState.answers.contact_preference = nextState.answers.contact_preference || "MASON_CONTACT_REQUESTED";
    return finishAudit(request, nextState, true);
  }

  if (explicitEnd) {
    nextState.answers.contact_preference = nextState.answers.contact_preference || "TEXT_PAGE_ONLY";
    return finishAudit(request, nextState, false);
  }

  if (nextState.turns >= 10) {
    return finishAudit(request, nextState, false);
  }

  const parts = [
    cleanSpoken(decision.acknowledgement, 160),
    cleanSpoken(decision.answer, 520),
  ].filter(Boolean);

  let question = cleanSpoken(decision.next_question, 260);
  if (!question) question = nextBroadQuestion(answers);
  if (hasCoreIntake(answers)) {
    question = "I have enough for a first pass. Do you want Mason to contact you, or should I just text you the audit page?";
  }

  parts.push(question);
  return gatherPrompt(request, nextState, parts.join(" "));
}
