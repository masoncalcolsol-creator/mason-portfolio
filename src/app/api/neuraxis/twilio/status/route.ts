export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HIVE_REPO = process.env.HIVE_REPO || "masoncalcolsol-creator/nullworks-corporate-wifi-hive";
const HIVE_BRANCH = process.env.HIVE_BRANCH || "main";
const HIVE_TOKEN_PRESENT = Boolean(process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN);

export async function GET() {
  return Response.json({
    service: "NULLWORKS Neuraxis Twilio Hive Bridge",
    status: HIVE_TOKEN_PRESENT ? "CONFIGURED_FOR_HIVE_READ" : "DEPLOYED_TOKEN_MISSING",
    hive_repo: HIVE_REPO,
    hive_branch: HIVE_BRANCH,
    twilio_voice_webhook_path: "/api/neuraxis/twilio/voice",
    twilio_command_webhook_path: "/api/neuraxis/twilio/command",
    truth_boundary: "This status route only verifies bridge code and environment presence. It does not prove the Twilio phone number is pointed here.",
  }, {
    headers: { "cache-control": "no-store" },
  });
}
