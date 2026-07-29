import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const googleClientIdPresent = Boolean(process.env.GRAY_MATTER_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID);
  const googleClientSecretPresent = Boolean(process.env.GRAY_MATTER_GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET);
  const googleRefreshTokenPresent = Boolean(process.env.GRAY_MATTER_GOOGLE_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN);

  return NextResponse.json({
    ok: true,
    service: "NEURAXIS Derek Room 3",
    version: "room3-email-receipt-diagnostic-v2",
    mutationPerformed: false,
    environment: {
      lfAdminKeyPresent: Boolean(process.env.LF_ADMIN_KEY),
      twilioAuthTokenPresent: Boolean(process.env.TWILIO_AUTH_TOKEN),
      hiveGithubTokenPresent: Boolean(process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN),
      vercelOidcHeaderPresent: Boolean(request.headers.get("x-vercel-oidc-token")),
      lfPublicBaseUrl: process.env.LF_PUBLIC_BASE_URL || "https://lf-lender-intake.vercel.app",
      lfDirectRulePath: process.env.LF_DIRECT_RULE_PATH || "/api/rules/direct",
      gmailOAuthClientIdPresent: googleClientIdPresent,
      gmailOAuthClientSecretPresent: googleClientSecretPresent,
      gmailOAuthRefreshTokenPresent: googleRefreshTokenPresent,
      gmailOAuthReady: googleClientIdPresent && googleClientSecretPresent && googleRefreshTokenPresent,
      receiptSender: process.env.GRAY_MATTER_GMAIL_USER || process.env.NEURAXIS_GMAIL_USER || "NULLWORKS.Neuraxis@gmail.com",
      receiptRecipient: process.env.DEREK_LENDERFLOW_RECEIPT_EMAIL || "masoncalcolsol@gmail.com",
    },
  }, {
    headers: {
      "cache-control": "no-store",
    },
  });
}
