import { readWebVoiceSession } from "@/lib/neuraxis-web-voice";
import { searchPressureCookerTranscripts } from "@/lib/neuraxis-transcript-archive";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function noStoreJson(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

export async function GET(request: Request): Promise<Response> {
  const session = readWebVoiceSession(request);
  if (!session) return noStoreJson({ ok: false, error: "Secure workroom session required." }, 401);
  if (session.role !== "admin") return noStoreJson({ ok: false, error: "Transcript search is restricted to Mason's admin session." }, 403);

  const url = new URL(request.url);
  const query = String(url.searchParams.get("q") || "").trim().slice(0, 300);
  if (query.length < 2) return noStoreJson({ ok: true, query, results: [] });

  try {
    const results = await searchPressureCookerTranscripts(query, 20);
    return noStoreJson({ ok: true, query, results });
  } catch (error) {
    console.error("Pressure Cooker transcript search failed", error);
    return noStoreJson({ ok: false, error: "Transcript search is temporarily unavailable." }, 502);
  }
}
