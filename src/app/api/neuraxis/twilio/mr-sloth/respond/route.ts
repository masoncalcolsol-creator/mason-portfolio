import {
  readTwilioForm,
  say,
  speechOrDigits,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";
import {
  askMrSloth,
  isMrSlothExit,
  isMrSlothObservation,
  isMrSlothRepeat,
  mrSlothSpeak,
} from "@/lib/mr-sloth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

async function handle(request: Request): Promise<Response> {
  const params = request.method === "POST" ? await readTwilioForm(request) : {};
  if (request.method === "POST" && !validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }

  const speech = speechOrDigits(params);
  const origin = new URL(request.url).origin;

  if (isMrSlothExit(speech)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pause length="1"/>
  ${mrSlothSpeak("Then let the quiet be enough.", request.url)}
  <Hangup/>
</Response>`);
  }

  if (isMrSlothRepeat(speech)) {
    const target = `${origin}/api/neuraxis/twilio/mr-sloth?repeat=1`;
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
  }

  if (isMrSlothObservation(speech)) {
    const target = `${origin}/api/neuraxis/twilio/mr-sloth/record`;
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
  }

  const answer = await askMrSloth(speech);
  const responseUrl = `${origin}/api/neuraxis/twilio/mr-sloth/respond`;

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  ${mrSlothSpeak(answer, request.url)}
  <Pause length="1"/>
  <Gather input="speech" timeout="4" speechTimeout="auto" method="POST" action="${xmlEscape(responseUrl)}" hints="ask another question, leave an observation, repeat, goodbye">
    ${mrSlothSpeak("You may ask another question, leave an observation, or go in peace.", request.url)}
  </Gather>
  ${mrSlothSpeak("Carry the question carefully.", request.url)}
  <Hangup/>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
