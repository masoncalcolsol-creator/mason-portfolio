import { decodeState } from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

type TtsPayload = { text?: string };

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("q") || "";
  const payload = decodeState<TtsPayload>(token);
  const text = payload?.text?.trim() || "";
  const apiKey = process.env.OPENAI_API_KEY || "";

  if (!text || text.length > 4000) {
    return new Response("Invalid speech request", { status: 400 });
  }
  if (!apiKey) {
    return new Response("OPENAI_API_KEY missing", { status: 503 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts",
        voice: process.env.MR_SLOTH_TTS_VOICE || "onyx",
        input: text,
        instructions:
          "Older male voice, around seventy, low and weathered, warm but slightly dry. Speak deliberately without dragging. Use small natural hesitations rather than long dramatic pauses. Sound like a careful keeper of workshop knowledge. Never sound like an announcer, a young presenter, a cartoon, a mascot, a salesman, or an imitation of a Japanese accent.",
        response_format: "mp3",
        speed: 0.96,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Mr. Sloth TTS failed", response.status, detail.slice(0, 500));
      return new Response("Speech generation failed", { status: 502 });
    }

    const audio = await response.arrayBuffer();
    return new Response(audio, {
      status: 200,
      headers: {
        "content-type": "audio/mpeg",
        "content-length": String(audio.byteLength),
        "cache-control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Mr. Sloth TTS network failure", error);
    return new Response("Speech generation unavailable", { status: 502 });
  }
}
