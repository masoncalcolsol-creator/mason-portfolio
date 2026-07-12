import {
  encodeState,
  lookupCallerName,
  normalizePhone,
  phoenixGreeting,
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

type AuditState = {
  step: "identity";
  callSid: string;
  caller: string;
  callerName?: string;
  callerType?: string;
  startedAt: string;
  answers: Record<string, string>;
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
  const time = phoenixGreeting();

  let greeting: string;
  if (isMason && time.hour >= 1 && time.hour < 5) {
    greeting = `It is ${time.clock} in the morning, Mason. Why are you awake? Anyway, let's start the audit.`;
  } else if (callerName) {
    greeting = `Good ${time.greeting}, ${callerName}. Let's start the audit.`;
  } else {
    greeting = `Good ${time.greeting}. Let's start the audit.`;
  }

  const prompt = `${greeting} First, say your name, company, and title.`;
  const state: AuditState = {
    step: "identity",
    callSid: params.CallSid || crypto.randomUUID(),
    caller,
    callerName,
    callerType: lookup.type,
    startedAt: new Date().toISOString(),
    answers: {},
  };
  const action = new URL("/api/neuraxis/twilio/audit/turn", request.url);
  action.searchParams.set("state", encodeState(state));
  const retry = new URL("/api/neuraxis/twilio/audit/start", request.url).toString();

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" timeout="9" speechTimeout="3" actionOnEmptyResult="true" method="POST" action="${xmlEscape(action.toString())}">
    ${speak(prompt, request.url)}
  </Gather>
  ${speak("I did not catch that. Let's start again.", request.url)}
  <Redirect method="POST">${xmlEscape(retry)}</Redirect>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
