import { after } from "next/server";

import {
  readTwilioForm,
  say,
  twiml,
  validateTwilioRequest,
  writeHiveReceipt,
} from "@/lib/neuraxis-twilio";
import {
  mrSlothObservationReference,
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

  const callSid = params.CallSid || "unknown-call";
  const recordingSid = params.RecordingSid || "unknown-recording";
  const recordingUrl = params.RecordingUrl || "";
  const durationSeconds = Math.max(0, Number(params.RecordingDuration || 0) || 0);
  const reference = mrSlothObservationReference(callSid, recordingSid);

  if (recordingUrl) {
    after(async () => {
      const result = await writeHiveReceipt({
        reference,
        category: "mr_sloth_observation",
        payload: {
          event_type: "MR_SLOTH_OBSERVATION_RECEIVED",
          truth_state: "OBSERVED",
          approval_state: "MASON_REVIEW_REQUIRED",
          reference,
          call_sid: callSid,
          recording_sid: recordingSid,
          recording_url: recordingUrl,
          duration_seconds: durationSeconds,
          caller_number: params.From || null,
          called_number: params.To || null,
          received_at: new Date().toISOString(),
          publication_rule: "Do not publish or promote without Mason's explicit proof and approval.",
        },
      });
      if (!result.ok) console.error("Mr. Sloth observation receipt failed", result.error);
    });

    return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pause length="2"/>
  ${mrSlothSpeak("Your observation has been received.", request.url)}
  <Pause length="2"/>
  ${mrSlothSpeak("It does not enter the archive until Mason approves it. Thank you for noticing.", request.url)}
  <Hangup/>
</Response>`);
  }

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pause length="2"/>
  ${mrSlothSpeak("I did not receive an observation. The quiet remains yours.", request.url)}
  <Hangup/>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
