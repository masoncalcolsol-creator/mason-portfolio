import { readTwilioForm, say, twiml, validateTwilioRequest, xmlEscape, normalizePhone } from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);

  const digit = params.Digits || "";
  const origin = new URL(request.url).origin;
  if (digit === "1") {
    const target = `${origin}/api/neuraxis/twilio/voice?room=workroom`;
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Opening the shared NEURAXIS workroom.")}<Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
  }
  if (digit === "5") {
    const target = `${origin}/api/neuraxis/twilio/audit/start`;
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Opening the AI Operating Model Audit room.")}<Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
  }
  if (digit === "9") {
    const allowed = normalizePhone(process.env.NEURAXIS_MASON_CALLER || "");
    const caller = normalizePhone(params.From || "");
    if (!allowed || caller !== allowed) return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Mason private Hive access requires the approved caller number.")}<Hangup/></Response>`);
    const target = `${origin}/api/neuraxis/twilio/voice?room=private`;
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Mason private lane accepted.")}<Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
  }

  const retry = `${origin}/api/neuraxis/twilio/voice`;
  return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Invalid selection.")}<Redirect method="POST">${xmlEscape(retry)}</Redirect></Response>`);
}
