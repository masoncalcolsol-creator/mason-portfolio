import {
  readTwilioForm,
  say,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";
import { mrSlothSpeak } from "@/lib/mr-sloth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(request: Request): Promise<Response> {
  const params = request.method === "POST" ? await readTwilioForm(request) : {};
  if (request.method === "POST" && !validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }

  const configured = Number(process.env.MR_SLOTH_MAX_RECORDING_SECONDS || 90);
  const maxLength = Math.max(15, Math.min(180, Number.isFinite(configured) ? configured : 90));
  const completeUrl = new URL("/api/neuraxis/twilio/mr-sloth/recording", request.url).toString();

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pause length="2"/>
  ${mrSlothSpeak("Speak slowly. Tell me what you noticed, and why it might be forgotten.", request.url)}
  <Pause length="1"/>
  <Record action="${xmlEscape(completeUrl)}" method="POST" maxLength="${maxLength}" timeout="5" playBeep="false" trim="trim-silence"/>
  ${mrSlothSpeak("The booth remained quiet. Nothing was taken from you.", request.url)}
  <Hangup/>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
