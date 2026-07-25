import { after } from "next/server";

import {
  readTwilioForm,
  say,
  speak,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";
import { recordRoomSelection, startCallTelemetry } from "@/lib/neuraxis-call-telemetry";
import { WEB_VOICE_MAX_SECONDS } from "@/lib/neuraxis-web-voice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request: Request): Promise<Response> {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }

  const callSid = params.CallSid || "";
  const identity = String(params.From || params.Identity || "browser-client").slice(0, 160);
  if (!callSid) return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("A call identifier was not supplied.")}<Hangup/></Response>`, 400);

  after(async () => {
    try {
      await startCallTelemetry({
        callSid,
        caller: identity,
        called: "NULLWORKS_BROWSER_PRESSURE_COOKER",
        direction: params.Direction || "outbound-api",
        callStatus: params.CallStatus || "in-progress",
      });
      await recordRoomSelection({ callSid, room: "workroom", caller: identity, selection: "browser_webrtc_pressure_cooker" });
    } catch (error) {
      console.error("Browser voice call-start telemetry failed", error);
    }
  });

  const now = Math.floor(Date.now() / 1000);
  const target = new URL("/api/neuraxis/twilio/voice", request.url);
  target.searchParams.set("room", "pressure");
  target.searchParams.set("web", "1");
  target.searchParams.set("started", String(now));
  target.searchParams.set("limit", String(WEB_VOICE_MAX_SECONDS));
  target.searchParams.set("warned", "0");

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  ${speak("Secure browser voice connected. No international telephone leg is being used.", request.url)}
  <Redirect method="POST">${xmlEscape(target.toString())}</Redirect>
</Response>`);
}

export async function GET(): Promise<Response> {
  return Response.json({
    ok: true,
    service: "NULLWORKS_BROWSER_VOICE_TWIML",
    room: "pressure",
    hard_limit_seconds: WEB_VOICE_MAX_SECONDS,
  }, { headers: { "cache-control": "no-store" } });
}
