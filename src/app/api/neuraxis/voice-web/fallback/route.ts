import { readTwilioForm, say, twiml, validateTwilioRequest } from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }
  return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("The browser voice workroom could not connect. Please use the existing Twilio number as a fallback and remember that carrier charges may apply.")}<Hangup/></Response>`, 503);
}
