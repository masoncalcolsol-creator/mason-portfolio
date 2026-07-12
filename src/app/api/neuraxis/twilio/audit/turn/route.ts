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

type AuditStep = "identity" | "employees" | "ai_problem" | "handoff";

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
  step: AuditStep;
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
    const value = cleanSpoken(incoming[key], key === "problems" ? 900 : 220);
    if (value) merged[key] = value;
  }
  return merged;
}

function questionForStep(step: AuditStep): string {
  switch (step) {
    case "identity":
      return "What is your name, company, and title? Say all three together.";
    case "employees":
      return "Roughly how many employees do you have? A number or range is fine.";
    case "ai_problem":
      return "What AI are you using, and what problems is it causing? Give me the broad version.";
    case "handoff":
      return "Do you want Mason to contact you, or should I just text you the audit page?";
  }
}

function stepComplete(step: AuditStep, answers: AuditAnswers): boolean {
  if (step === "identity") return Boolean(answers.name && answers.company && answers.title);
  if (step === "employees") return Boolean(answers.employees);
  if (step === "ai_problem") {
    return Boolean((answers.using_ai || answers.ai_tools) && answers.problems);
  }
  return false;
}

function confirmationForStep(step: AuditStep, answers: AuditAnswers): string {
  if (step === "identity") {
    return `Okay. I have ${answers.name}, ${answers.title} at ${answers.company}.`;
  }
  if (step === "employees") {
    return `Okay. Roughly ${answers.employees} employees.`;
  }
  if (step === "ai_problem") {
    const ai = answers.ai_tools
      || (answers.using_ai === "NO" ? "no AI yet" : "AI");
    return `Okay. I have ${ai}, with the broad issue being: ${cleanSpoken(answers.problems, 300)}.`;
  }
  return "Okay.";
}

function staticExplanation(userSpeech: string): string | undefined {
  const normalized = userSpeech.toLowerCase();

  if (/polymath\s*(squared|square|2|two)|polymath²/.test(normalized)) {
    return "Polymath squared is Mason's term for a polymath whose range is multiplied by a coordinated digital company. He is the Da Vinci-like human across physical disciplines, then extends that reach across digital time and space through specialist workrooms, memory, evidence, and parallel execution. The digital life adds to the physical one; it does not replace it.";
  }

  if (/phrononaut|fro[- ]?no[- ]?(not|knot)|frow[- ]?no[- ]?(not|knot)|frononaut/.test(normalized)) {
    return "Phrononaut, pronounced fro-no-not, is Mason's term for a navigator of practical wisdom. It means useful insight can come from anywhere, especially the person closest to the work, while recognizing that curiosity still needs an attention budget.";
  }

  if (/da\s*vinci|davinci/.test(normalized)) {
    return "Da Vinci is the metaphor for broad individual capability. NULLWORKS adds the Toyota side: bounded specialists, repeatable work cells, review, continuity, and scale around the polymath, so one capable human is no longer limited to one task at one time.";
  }

  if (/who is mason|what does mason|tell me about mason/.test(normalized)) {
    return "Mason Perry is the founder of NULLWORKS and a pioneering Operational Intelligence Systems Architect. He works from the outcome backward, connecting physical operations, people, AI, software, authority, evidence, and implementation.";
  }

  if (/what is nullworks|what does nullworks|who is nullworks/.test(normalized)) {
    return "NULLWORKS designs the operating company around AI workers: workflow, roles, authority, evidence, exceptions, memory, review, and telemetry. The point is not another tool. The point is a working organization around the tools a company already has.";
  }

  if (/what is oisa|what does oisa|operational intelligence systems architect/.test(normalized)) {
    return "An OISA connects operations, AI, software, data, authority, evidence, exceptions, human judgment, and implementation into one working organizational system.";
  }

  if (/what is this|what is the audit|why are you asking|what is this for|how does this work/.test(normalized)) {
    return "This is a fast operating-model triage. We start with why the work exists and what is actually failing, then look for the lowest-lift fix. The answer may be workflow, people, authority, software, AI, or no new technology at all.";
  }

  if (/how do you view ai|what does ai do here|what is ai in this system|is ai the system/.test(normalized)) {
    return "AI is part of the system, not the system itself. NULLWORKS looks at how the models interact with people, workflow, authority, evidence, physical conditions, and the intended outcome.";
  }

  if (/are you ai|are you an assistant|what are you/.test(normalized)) {
    return "NEURAXIS is the voice gateway for NULLWORKS Organizational Intelligence. This room explains the audit, captures the broad problem, and preserves a handoff for Mason. It is not the final auditor or decision-maker.";
  }

  return undefined;
}

function fallbackDecision(userSpeech: string, state: AuditState): ModelDecision {
  const normalized = userSpeech.toLowerCase();
  const explanation = staticExplanation(userSpeech);
  const contact = /contact mason|call me|email me|reach out|have mason|talk to mason|speak to mason/.test(normalized);
  const textOnly = /just text|send me the page|text me the page|no follow.?up|do not call/.test(normalized);
  const fields: Partial<AuditAnswers> = {};

  if (!explanation && state.step === "employees") {
    const employeeMatch = userSpeech.match(/\b(?:about|around|roughly|approximately)?\s*(\d{1,7}(?:\s*(?:to|-|through)\s*\d{1,7})?)(?:\s+employees?|\s+people|\s+staff)?\b/i);
    if (employeeMatch) fields.employees = employeeMatch[1];
  }

  if (!explanation && state.step === "ai_problem") {
    if (/\b(no ai|not using ai|do not use ai|don't use ai)\b/i.test(userSpeech)) fields.using_ai = "NO";
    else fields.using_ai = "YES";

    const toolMatches = userSpeech.match(/\b(ChatGPT|OpenAI|Claude|Gemini|Copilot|Grok|Salesforce Einstein|Microsoft 365 Copilot|Perplexity)\b/gi);
    if (toolMatches?.length) fields.ai_tools = [...new Set(toolMatches)].join(", ");
    fields.problems = cleanSpoken(userSpeech, 900);
  }

  return {
    acknowledgement: explanation ? "Absolutely." : "Got it.",
    answer: explanation,
    action: contact ? "handoff" : textOnly ? "end" : "continue",
    contact_requested: contact,
    fields,
  };
}

async function analyzeTurn(userSpeech: string, state: AuditState): Promise<ModelDecision> {
  const explanation = staticExplanation(userSpeech);
  if (explanation) {
    return {
      acknowledgement: "Absolutely.",
      answer: explanation,
      action: "continue",
      fields: {},
    };
  }

  if (!OPENAI_API_KEY) return fallbackDecision(userSpeech, state);

  const allowedFields = state.step === "identity"
    ? "name, company, title"
    : state.step === "employees"
      ? "employees"
      : state.step === "ai_problem"
        ? "using_ai, ai_tools, problems"
        : "contact_preference";

  const instructions = `You are NEURAXIS, the NULLWORKS Organizational Intelligence phone gateway inside the AI Operating Model Audit room. You are not an AI assistant and must never call yourself one.

The intake has exactly three information steps:
1. name, company, and title
2. approximate employee count
3. which AI is being used and the broad problems it is causing
After those three steps, ask only whether Mason should contact the caller or whether they only want the audit page texted.

The CURRENT STEP is ${state.step}. Capture only these allowed fields for this turn: ${allowedFields}. Even if the caller volunteers later-step information, do not capture or advance past the current step. The purpose is a short, understandable three-step rhythm with spoken confirmation after every step.

Callers may interrupt at any time to ask about Mason, NULLWORKS, OISA, Operational Intelligence, AI, Da Vinci, Polymath squared, Phrononaut or Fro-no-not, the audit, or why a question matters. Answer the interruption directly in one to three spoken sentences. Do not fill intake fields from a conceptual question. After answering, the application will return to the same unfinished step.

Locked concepts:
- Mason Perry is Founder of NULLWORKS and a pioneering Operational Intelligence Systems Architect.
- NULLWORKS designs the operating company around AI workers: workflow, roles, authority, evidence, exceptions, memory, review, and telemetry.
- AI is part of the system, not the system itself.
- Polymath squared means Mason's broad physical-world capability is multiplied by a coordinated digital company operating across digital time and space. The digital life adds to his physical life rather than replacing it.
- Da Vinci represents broad individual capability. Toyota represents coordinated specialists, repeatable work cells, quality gates, continuity, and scale.
- Phrononaut, pronounced fro-no-not, means navigator of practical wisdom: insight can come from anywhere, especially the person closest to the work, but curiosity needs an attention budget.
- The audit starts with intent and the why, examines the real workflow, and looks for the lowest-lift fix. It is not a software pitch or a forced consulting sale.
- Mason remains final Human Authority and reviews the intake before any diagnosis.

If the caller asks Mason to call, email, contact, or reach out, set action to handoff. If the caller only wants the page texted and no follow-up, set action to end.

Return JSON only:
{
  "acknowledgement": "brief natural acknowledgement",
  "answer": "direct answer to an interruption or empty string",
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
        max_output_tokens: 340,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("NEURAXIS audit model failed", response.status, (await response.text()).slice(0, 500));
      return fallbackDecision(userSpeech, state);
    }

    const raw = extractOutputText(await response.json());
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return fallbackDecision(userSpeech, state);
    const parsed = JSON.parse(match[0]) as ModelDecision;
    return {
      acknowledgement: cleanSpoken(parsed.acknowledgement, 160),
      answer: cleanSpoken(parsed.answer, 620),
      action: parsed.action === "handoff" || parsed.action === "end" ? parsed.action : "continue",
      contact_requested: Boolean(parsed.contact_requested),
      fields: parsed.fields,
    };
  } catch (error) {
    console.error("NEURAXIS audit analysis failed", error);
    return fallbackDecision(userSpeech, state);
  }
}

function gatherPrompt(request: Request, state: AuditState, spoken: string): Response {
  const action = new URL("/api/neuraxis/twilio/audit/turn", request.url);
  action.searchParams.set("state", encodeState(state));
  const prompt = cleanSpoken(spoken, 900) || questionForStep(state.step);
  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" timeout="7" speechTimeout="auto" actionOnEmptyResult="true" method="POST" action="${xmlEscape(action.toString())}">
    ${speak(prompt, request.url)}
  </Gather>
  ${speak(`I did not catch that. ${questionForStep(state.step)}`, request.url)}
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
    event_type: "AI_OPERATING_MODEL_THREE_STEP_PHONE_TRIAGE",
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
    boundary: "Three-step conversational phone triage only. Mason must review the evidence before diagnosis, recommendation, or outreach.",
  };

  const [sms, receipt] = await Promise.all([
    state.caller
      ? sendTwilioSms({ to: state.caller, body: smsBody, statusCallback: statusUrl })
      : Promise.resolve({ ok: false, error: "Twilio did not provide caller number" }),
    writeHiveReceipt({ reference, category: "ai_audit_three_step_triage", payload: receiptPayload }),
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
  if (!state?.callSid || !state.answers || !Array.isArray(state.notes) || !state.step) {
    const restart = new URL("/api/neuraxis/twilio/audit/start", request.url).toString();
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("The audit room reset. Let's start again.", request.url)}<Redirect method="POST">${xmlEscape(restart)}</Redirect></Response>`);
  }

  const userSpeech = cleanSpoken(speechOrDigits(params), 1400);
  if (!userSpeech) {
    return gatherPrompt(request, state, questionForStep(state.step));
  }

  const decision = await analyzeTurn(userSpeech, state);
  const answers = mergeAnswers(state.answers, decision.fields);
  const notes = [...state.notes, userSpeech.slice(0, 380)].slice(-8);
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

  if (nextState.turns >= 12) {
    return finishAudit(request, nextState, false);
  }

  const parts = [
    cleanSpoken(decision.acknowledgement, 160),
    cleanSpoken(decision.answer, 620),
  ].filter(Boolean);

  if (!stepComplete(state.step, answers)) {
    parts.push(questionForStep(state.step));
    return gatherPrompt(request, nextState, parts.join(" "));
  }

  parts.push(confirmationForStep(state.step, answers));

  if (state.step === "identity") {
    nextState.step = "employees";
    parts.push(questionForStep("employees"));
    return gatherPrompt(request, nextState, parts.join(" "));
  }

  if (state.step === "employees") {
    nextState.step = "ai_problem";
    parts.push(questionForStep("ai_problem"));
    return gatherPrompt(request, nextState, parts.join(" "));
  }

  if (state.step === "ai_problem") {
    nextState.step = "handoff";
    parts.push("That is enough for a first pass.", questionForStep("handoff"));
    return gatherPrompt(request, nextState, parts.join(" "));
  }

  parts.push(questionForStep("handoff"));
  return gatherPrompt(request, nextState, parts.join(" "));
}
