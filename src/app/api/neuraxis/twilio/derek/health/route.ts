import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return NextResponse.json({
    ok: true,
    service: "NEURAXIS Derek Room 3",
    version: "room3-credential-diagnostic-v1",
    mutationPerformed: false,
    environment: {
      lfAdminKeyPresent: Boolean(process.env.LF_ADMIN_KEY),
      twilioAuthTokenPresent: Boolean(process.env.TWILIO_AUTH_TOKEN),
      hiveGithubTokenPresent: Boolean(process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN),
      vercelOidcHeaderPresent: Boolean(request.headers.get("x-vercel-oidc-token")),
      lfPublicBaseUrl: process.env.LF_PUBLIC_BASE_URL || "https://lf-lender-intake.vercel.app",
      lfDirectRulePath: process.env.LF_DIRECT_RULE_PATH || "/api/rules/direct",
    },
  }, {
    headers: {
      "cache-control": "no-store",
    },
  });
}
