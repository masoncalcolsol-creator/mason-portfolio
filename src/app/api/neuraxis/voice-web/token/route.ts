import {
  createTwilioWebVoiceToken,
  readWebVoiceSession,
  webVoiceMeterConfig,
} from "@/lib/neuraxis-web-voice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return Response.json({ ok: false, error: "Cross-origin access denied." }, { status: 403 });
  const session = readWebVoiceSession(request);
  if (!session) {
    return Response.json({ ok: false, error: "Secure workroom session required." }, { status: 401, headers: { "cache-control": "no-store" } });
  }
  try {
    const issued = await createTwilioWebVoiceToken(request.url, session);
    return Response.json({
      ok: true,
      token: issued.token,
      identity: issued.identity,
      expires_at: new Date(issued.expiresAt * 1000).toISOString(),
      role: session.role,
      meter: webVoiceMeterConfig(),
      transport: "BROWSER_WEBRTC",
      pstn_leg: false,
    }, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    console.error("Browser voice token issuance failed", error);
    return Response.json({
      ok: false,
      error: "Browser voice provisioning is unavailable. The existing Twilio phone route remains the fallback.",
    }, { status: 503, headers: { "cache-control": "no-store" } });
  }
}
