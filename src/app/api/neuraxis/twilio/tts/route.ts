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
        voice: process.env.OPENAI_TTS_VOICE || "marin",
        input: text,
        instructions:
          "Warm, clear, conversational female voice. Natural pacing and brief pauses. Calm confidence. Never sound like an announcer, a robot, or a customer-service script.",
        response_format: "mp3",
        speed: 1,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("NEURAXIS TTS failed", response.status, detail.slice(0, 500));
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
    console.error("NEURAXIS TTS network failure", error);
    return new Response("Speech generation unavailable", { status: 502 });
  }
}
