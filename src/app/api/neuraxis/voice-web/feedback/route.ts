import crypto from "node:crypto";

import { writeHiveReceipt } from "@/lib/neuraxis-twilio";
import { readWebVoiceSession } from "@/lib/neuraxis-web-voice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

function boolOrNull(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return Response.json({ ok: false, error: "Cross-origin access denied." }, { status: 403 });
  const session = readWebVoiceSession(request);
  if (!session) return Response.json({ ok: false, error: "Secure workroom session required." }, { status: 401 });

  let input: Record<string, unknown> = {};
  try { input = await request.json() as Record<string, unknown>; } catch { return Response.json({ ok: false, error: "Invalid feedback." }, { status: 400 }); }
  const now = new Date().toISOString();
  const reference = `VOICE-${crypto.createHash("sha256").update(`${session.sid}:${now}`).digest("hex").slice(0, 10).toUpperCase()}`;
  const result = await writeHiveReceipt({
    reference,
    category: "neuraxis_browser_voice_feedback",
    payload: {
      event_type: "NEURAXIS_BROWSER_VOICE_FEEDBACK",
      truth_state: "USER_REPORTED",
      workroom: "NULLWORKS_PRESSURE_COOKER",
      transport: "BROWSER_WEBRTC",
      session_role: session.role,
      session_reference: crypto.createHash("sha256").update(session.sid).digest("hex").slice(0, 12),
      understood: boolOrNull(input.understood),
      valuable: boolOrNull(input.valuable),
      return_intent: boolOrNull(input.return_intent),
      human_correction_required: boolOrNull(input.human_correction_required),
      follow_up: String(input.follow_up || "").replace(/\s+/g, " ").trim().slice(0, 500) || null,
      reported_at: now,
    },
  });
  return Response.json(result.ok ? { ok: true, reference } : { ok: false, error: result.error || "Feedback receipt failed." }, {
    status: result.ok ? 200 : 503,
    headers: { "cache-control": "no-store" },
  });
}
