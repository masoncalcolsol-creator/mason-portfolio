import {
  encodeState,
  lookupCallerName,
  normalizePhone,
  readTwilioForm,
  say,
  speak,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

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

function cleanCallerName(value?: string): string | undefined {
  if (!value) return undefined;
  const cleaned = value.replace(/[^a-zA-Z0-9 .'-]/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned || /wireless caller|unknown|unavailable/i.test(cleaned)) return undefined;
  return cleaned.slice(0, 70);
}

async function handle(request: Request) {
  const params = request.method === "POST" ? await readTwilioForm(request) : {};
  if (request.method === "POST" && !validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }

  const caller = normalizePhone(params.From || "");
  const approvedMason = normalizePhone(process.env.NEURAXIS_MASON_CALLER || "");
  const isMason = Boolean(caller && approvedMason && caller === approvedMason);
  const lookup = isMason ? { name: "Mason", type: "APPROVED_CALLER" } : await lookupCallerName(caller);
  const callerName = cleanCallerName(lookup.name);

  const prompt = "NEURAXIS is online. We are Organizational Intelligence, and we are ready to help. We examine why the work exists, what is actually failing, and the lowest-lift fix: workflow, people, authority, software, AI, or something simpler. This is not a software pitch or a consulting script. Tell me your name, company, title, approximate employee count, which AI you use, and what is going wrong. Answer however you want.";

  const state: AuditState = {
    step: "conversation",
    callSid: params.CallSid || crypto.randomUUID(),
    caller,
    callerName,
    callerType: lookup.type,
    startedAt: new Date().toISOString(),
    turns: 0,
    answers: callerName ? { name: callerName } : {},
    notes: [],
  };

  const action = new URL("/api/neuraxis/twilio/audit/turn", request.url);
  action.searchParams.set("state", encodeState(state));
  const retry = new URL("/api/neuraxis/twilio/audit/start", request.url).toString();

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" timeout="7" speechTimeout="auto" actionOnEmptyResult="true" method="POST" action="${xmlEscape(action.toString())}">
    ${speak(prompt, request.url)}
  </Gather>
  ${speak("I did not catch that. Say whatever brought you here, and we will start there.", request.url)}
  <Redirect method="POST">${xmlEscape(retry)}</Redirect>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
