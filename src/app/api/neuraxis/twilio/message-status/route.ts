import { readTwilioForm, twiml, validateTwilioRequest, writeHiveReceipt } from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) return twiml("<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response/>", 403);
  const reference = new URL(request.url).searchParams.get("ref") || "NW-UNKNOWN";
  await writeHiveReceipt({
    reference,
    category: "ai_audit_sms_status",
    payload: {
      event_type: "AI_AUDIT_SMS_STATUS",
      truth_state: "OBSERVED",
      reference,
      message_sid: params.MessageSid || null,
      message_status: params.MessageStatus || params.SmsStatus || null,
      error_code: params.ErrorCode || null,
      error_message: params.ErrorMessage || null,
      to: params.To || null,
      from: params.From || null,
      recorded_at: new Date().toISOString(),
    },
  }).catch(() => undefined);
  return twiml("<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response/>");
}
