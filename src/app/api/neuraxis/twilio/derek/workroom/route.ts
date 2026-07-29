import {
  readTwilioForm,
  say,
  speak,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";
import { validateDerekCallSession } from "@/lib/derek-lenderflow-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(request: Request) {
  const params = request.method === "POST" ? await readTwilioForm(request) : {};
  if (request.method === "POST" && !validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }

  const url = new URL(request.url);
  const token = url.searchParams.get("session") || "";
  const callSid = params.CallSid || "browser-test";
  const caller = params.From || "";
  const session = validateDerekCallSession(token, callSid, caller);
  if (!session) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Your Derek LenderFlow session is missing or expired. Return to the main menu and choose room three again.", request.url)}<Hangup/></Response>`, 403);
  }

  const commandUrl = new URL("/api/neuraxis/twilio/derek/command", request.url);
  commandUrl.searchParams.set("session", token);
  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" timeout="10" speechTimeout="auto" actionOnEmptyResult="true" method="POST" action="${xmlEscape(commandUrl.toString())}">
    ${speak("Tell me the lender rule naturally in one sentence. For example: Change Wholesale minimum FICO to 600. I will keep any details you give me, ask only for what is missing, and read the complete rule back before anything changes.", request.url)}
  </Gather>
  ${speak("I did not catch a rule. Try one sentence with the lender, field, and boundary.", request.url)}
  <Redirect method="POST">${xmlEscape(url.toString())}</Redirect>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
