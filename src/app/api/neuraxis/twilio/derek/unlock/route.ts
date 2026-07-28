import {
  readTwilioForm,
  say,
  speak,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";
import { createDerekCallSession, verifyDerekPin } from "@/lib/derek-lenderflow-auth";
import { fetchDerekWorkroomContext, pinHashFromContext } from "@/lib/derek-lenderflow";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }

  let expectedHash = "";
  try {
    expectedHash = pinHashFromContext(await fetchDerekWorkroomContext());
  } catch (error) {
    console.error("Derek workroom PIN configuration load failed", error);
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("The private workroom gate is temporarily unavailable.", request.url)}<Hangup/></Response>`, 503);
  }

  if (!verifyDerekPin(params.Digits || "", expectedHash)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("That access code was not accepted.", request.url)}<Hangup/></Response>`, 403);
  }

  const session = createDerekCallSession(params.CallSid || "browser-test", params.From || "");
  const target = new URL("/api/neuraxis/twilio/derek/workroom", request.url);
  target.searchParams.set("session", session);
  return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Access accepted. Derek's LenderFlow rule workroom is online.", request.url)}<Redirect method="POST">${xmlEscape(target.toString())}</Redirect></Response>`);
}
