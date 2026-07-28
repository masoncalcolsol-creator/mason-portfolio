import {
  readTwilioForm,
  say,
  speak,
  speechOrDigits,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";
import {
  createGrayMatterCallSession,
  isApprovedMasonCaller,
  verifyGrayMatterPassphrase,
} from "@/lib/gray-matter-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }
  if (!isApprovedMasonCaller(params.From || "")) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Caller verification failed.", request.url)}<Hangup/></Response>`, 403);
  }
  if (!verifyGrayMatterPassphrase(speechOrDigits(params))) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Passphrase not accepted.", request.url)}<Hangup/></Response>`, 403);
  }
  const state = createGrayMatterCallSession(params.CallSid || "unknown-call", params.From || "");
  const target = new URL("/api/neuraxis/twilio/gray-matter/capture", request.url);
  target.searchParams.set("state", state);
  return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Gray Matter unlocked.", request.url)}<Redirect method="POST">${xmlEscape(target.toString())}</Redirect></Response>`);
}
