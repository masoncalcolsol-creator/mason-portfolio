import {
  readTwilioForm,
  say,
  speak,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";
import { validateGrayMatterCallSession } from "@/lib/gray-matter-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }
  const url = new URL(request.url);
  const state = url.searchParams.get("state") || "";
  if (!validateGrayMatterCallSession(state, params.CallSid || "", params.From || "")) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Gray Matter session expired or invalid.", request.url)}<Hangup/></Response>`, 403);
  }
  const commandUrl = new URL("/api/neuraxis/twilio/gray-matter/command", request.url);
  commandUrl.searchParams.set("state", state);
  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" timeout="10" speechTimeout="auto" actionOnEmptyResult="true" method="POST" action="${xmlEscape(commandUrl.toString())}">
    ${speak("Say one note. Or say daily triage, search for a topic, send today's digest, or done. Audio is not saved; only the transcript is vaulted.", request.url)}
  </Gather>
  ${speak("I did not catch anything. Try one short note.", request.url)}
  <Redirect method="POST">${xmlEscape(url.toString())}</Redirect>
</Response>`);
}
