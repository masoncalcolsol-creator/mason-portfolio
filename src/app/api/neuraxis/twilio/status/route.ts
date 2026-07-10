export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HIVE_REPO = process.env.HIVE_REPO || "masoncalcolsol-creator/nullworks-corporate-wifi-hive";
const HIVE_BRANCH = process.env.HIVE_BRANCH || "main";
const HIVE_TOKEN_PRESENT = Boolean(process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN);
const OPENAI_TOKEN_PRESENT = Boolean(process.env.OPENAI_API_KEY);
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.5-mini";

export async function GET() {
  return Response.json({
    service: "NULLWORKS Neuraxis Twilio Hive Bridge",
    status: HIVE_TOKEN_PRESENT ? "CONFIGURED_FOR_HIVE_READ" : "DEPLOYED_TOKEN_MISSING",
    natural_conversation: OPENAI_TOKEN_PRESENT ? "CONFIGURED" : "OPENAI_API_KEY_MISSING",
    openai_model: OPENAI_MODEL,
    hive_repo: HIVE_REPO,
    hive_branch: HIVE_BRANCH,
    twilio_voice_webhook_path: "/api/neuraxis/twilio/voice",
    twilio_command_webhook_path: "/api/neuraxis/twilio/command",
    truth_boundary: "This status route verifies bridge code and environment presence. It does not prove the Twilio phone number is pointed here or that a natural-conversation call has completed successfully.",
  }, {
    headers: { "cache-control": "no-store" },
  });
}
