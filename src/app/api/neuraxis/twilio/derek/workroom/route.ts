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

const LENDER_HINTS = "Change Wholesale, Change Lending, The Change Company, Figure, HomeXpress Mortgage";

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
  <Gather input="speech" hints="${xmlEscape(LENDER_HINTS)}" timeout="10" speechTimeout="auto" actionOnEmptyResult="true" method="POST" action="${xmlEscape(commandUrl.toString())}">
    ${speak("Tell me one lender rule naturally. Say the exact company name, the field, and the new value. I will resolve one canonical lender and ask once before publishing.", request.url)}
  </Gather>
  ${speak("I did not catch a rule. Say one lender name, the field, and the new boundary.", request.url)}
  <Redirect method="POST">${xmlEscape(url.toString())}</Redirect>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
