import {
  issueWebVoiceInvite,
  publicWebVoiceOrigin,
  readWebVoiceSession,
} from "@/lib/neuraxis-web-voice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return Response.json({ ok: false, error: "Cross-origin access denied." }, { status: 403 });
  const session = readWebVoiceSession(request);
  if (!session || session.role !== "admin") {
    return Response.json({ ok: false, error: "Administrator session required." }, { status: 403, headers: { "cache-control": "no-store" } });
  }

  let ttlHours = 24;
  try {
    const input = await request.json() as { ttl_hours?: number };
    if (Number.isFinite(input.ttl_hours)) ttlHours = Math.max(1, Math.min(72, Number(input.ttl_hours)));
  } catch {
    // Default invitation lifetime is intentional.
  }

  const issued = issueWebVoiceInvite(Math.round(ttlHours * 60 * 60));
  const origin = publicWebVoiceOrigin(request.url);
  const url = `${origin}/workroom/pressure-cooker?invite=${encodeURIComponent(issued.token)}`;
  return Response.json({
    ok: true,
    invitation_url: url,
    expires_at: new Date(issued.invite.exp * 1000).toISOString(),
    boundary: "Expiring workroom invitation. It grants conversation access only and does not grant system authority.",
  }, { headers: { "cache-control": "no-store" } });
}
