export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const checks = {
    twilio_account_sid: Boolean(process.env.TWILIO_ACCOUNT_SID),
    twilio_auth_token: Boolean(process.env.TWILIO_AUTH_TOKEN),
    twilio_phone_number: Boolean(process.env.TWILIO_PHONE_NUMBER || "+19498056990"),
    twilio_messaging_service_sid: Boolean(process.env.TWILIO_MESSAGING_SERVICE_SID),
    mason_private_caller: Boolean(process.env.NEURAXIS_MASON_CALLER),
    hive_write_token: Boolean(process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN),
    openai_key: Boolean(process.env.OPENAI_API_KEY),
  };
  const readyForCallerText = checks.twilio_account_sid && checks.twilio_auth_token && checks.twilio_phone_number;
  const readyForReceipts = checks.hive_write_token;
  return Response.json({
    status: readyForCallerText && readyForReceipts ? "READY_FOR_LIVE_TEST" : "ENV_SETUP_REQUIRED",
    ready_for_caller_text: readyForCallerText,
    ready_for_hive_receipts: readyForReceipts,
    checks,
    routes: {
      voice: "/api/neuraxis/twilio/voice",
      audit: "/api/neuraxis/twilio/audit/start",
      message_status: "/api/neuraxis/twilio/message-status",
      continuation: "/ai-audit/continue",
    },
    note: "This endpoint reports only whether required environment variables exist. It never returns their values.",
  }, { headers: { "cache-control": "no-store" } });
}
