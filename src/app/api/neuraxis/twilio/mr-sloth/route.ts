import {
  readTwilioForm,
  say,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";
import {
  dailyMrSlothObservation,
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

  const url = new URL(request.url);
  const repeat = url.searchParams.get("repeat") === "1";
  const offering = dailyMrSlothObservation();
  const responseUrl = new URL("/api/neuraxis/twilio/mr-sloth/respond", request.url).toString();
  const spokenOffering = repeat
    ? `The observation again. ${offering.text}`
    : `Ah. You found me. I should explain. I move slowly. That is me, not the machinery. Today's observation. ${offering.text}`;

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pause length="1"/>
  ${mrSlothSpeak(spokenOffering, request.url)}
  <Pause length="1"/>
  <Gather input="speech" timeout="4" speechTimeout="auto" method="POST" action="${xmlEscape(responseUrl)}" hints="ask a question, leave an observation, repeat, goodbye">
    ${mrSlothSpeak("You may ask a question, leave an observation, or simply remain quiet.", request.url)}
  </Gather>
  ${mrSlothSpeak("Take it with you. Return when you need the quiet.", request.url)}
  <Hangup/>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
