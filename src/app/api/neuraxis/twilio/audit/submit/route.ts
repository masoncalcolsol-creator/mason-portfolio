import {
  auditReference,
  readTwilioForm,
  say,
  sendTwilioSms,
  twiml,
  validateTwilioRequest,
  writeHiveReceipt,
} from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request: Request) {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }

  const transcript = String(params.SpeechResult || "").trim();
  const caller = String(params.From || "").trim();
  const callSid = String(params.CallSid || crypto.randomUUID());
  if (!transcript) {
    const retry = new URL("/api/neuraxis/twilio/audit/start", request.url).toString();
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("I did not receive a usable intake. Returning you to the audit prompt.")}<Redirect method="POST">${retry}</Redirect></Response>`);
  }

  const reference = auditReference(callSid);
  const continueUrl = new URL(`/ai-audit/continue?ref=${encodeURIComponent(reference)}`, request.url).toString();
  const statusUrl = new URL(`/api/neuraxis/twilio/message-status?ref=${encodeURIComponent(reference)}`, request.url).toString();
  const smsBody = `NULLWORKS AI Audit Room: your intake ${reference} is open. Confirm your email or add context here: ${continueUrl} This is a transactional follow-up to your call. Reply STOP to opt out.`;

  const receiptPayload = {
    event_type: "AI_OPERATING_MODEL_PHONE_TRIAGE",
    truth_state: "PROPOSED",
    reference,
    call_sid: callSid,
    caller_number: caller,
    speech_confidence: params.Confidence || null,
    language: params.Language || null,
    raw_transcript: transcript,
    continuation_url: continueUrl,
    created_at: new Date().toISOString(),
    boundary: "One-pass phone intake only. Human review required before any diagnosis or consequential recommendation.",
  };

  const [sms, receipt] = await Promise.all([
    caller
      ? sendTwilioSms({ to: caller, body: smsBody, statusCallback: statusUrl })
      : Promise.resolve({ ok: false, error: "Twilio did not provide caller number" }),
    writeHiveReceipt({ reference, category: "ai_audit_phone_triage", payload: receiptPayload }),
  ]);

  await writeHiveReceipt({
    reference,
    category: "ai_audit_phone_dispatch",
    payload: {
      event_type: "AI_AUDIT_PHONE_DISPATCH",
      truth_state: "OBSERVED",
      reference,
      sms,
      receipt,
      recorded_at: new Date().toISOString(),
    },
  }).catch(() => undefined);

  const spoken = sms.ok
    ? `Your provisional audit intake is logged as ${reference}. The text request was accepted by Twilio with status ${sms.status || "queued"}. Open the link in that text to confirm your email or add anything I missed. Human review remains required.`
    : `Your provisional audit intake is logged as ${reference}, but I could not confirm the text was queued. The failure was ${sms.error || "unknown"}. Please give Mason the reference ${reference}.`;

  return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say(spoken)}<Hangup/></Response>`);
}
