import { say, twiml, xmlEscape } from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(request: Request) {
  const submitUrl = new URL("/api/neuraxis/twilio/audit/submit", request.url).toString();
  const retryUrl = new URL("/api/neuraxis/twilio/audit/start", request.url).toString();
  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" timeout="12" speechTimeout="5" actionOnEmptyResult="true" method="POST" action="${xmlEscape(submitUrl)}">
    ${say("Welcome to the NEURAXIS AI Operating Model Audit room. This is a private beta intake, not a completed enterprise audit. In one answer, state your name, title, company, approximate number of employees, one real workflow, the intended outcome, where AI or software touches it, one recent failure, what has already been tried, and who owns the consequence. Take your time. I will finish the intake after five seconds of silence.")}
  </Gather>
  ${say("I did not receive the intake. Let's try once more.")}
  <Redirect method="POST">${xmlEscape(retryUrl)}</Redirect>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
