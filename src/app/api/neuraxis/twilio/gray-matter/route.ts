import {
  readTwilioForm,
  say,
  speak,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";
import { isApprovedMasonCaller } from "@/lib/gray-matter-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(request: Request) {
  const params = request.method === "POST" ? await readTwilioForm(request) : {};
  if (request.method === "POST" && !validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }
  if (!isApprovedMasonCaller(params.From || "")) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Gray Matter is restricted to Mason's approved caller number.", request.url)}<Hangup/></Response>`, 403);
  }
  if (!process.env.GRAY_MATTER_PASSPHRASE_SHA256) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Gray Matter is installed but the passphrase gate is not configured yet.", request.url)}<Hangup/></Response>`, 503);
  }
  const unlockUrl = new URL("/api/neuraxis/twilio/gray-matter/unlock", request.url).toString();
  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" timeout="7" speechTimeout="2" actionOnEmptyResult="true" method="POST" action="${xmlEscape(unlockUrl)}">
    ${speak("Gray Matter Storage Unit. Say your passphrase.", request.url)}
  </Gather>
  ${speak("No passphrase was received.", request.url)}
  <Hangup/>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
