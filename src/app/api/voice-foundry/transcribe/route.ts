import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_AUDIO_BYTES = 25 * 1024 * 1024;

export async function GET() {
  return NextResponse.json({
    configured: Boolean(process.env.OPENAI_API_KEY),
    model: process.env.VOICE_FOUNDRY_TRANSCRIBE_MODEL || "gpt-4o-mini-transcribe",
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Server transcription is not configured yet.",
        code: "TRANSCRIPTION_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  try {
    const incoming = await request.formData();
    const audio = incoming.get("audio");

    if (!(audio instanceof File)) {
      return NextResponse.json(
        { error: "No audio file was supplied.", code: "AUDIO_REQUIRED" },
        { status: 400 },
      );
    }

    if (audio.size === 0) {
      return NextResponse.json(
        { error: "The audio recording is empty.", code: "AUDIO_EMPTY" },
        { status: 400 },
      );
    }

    if (audio.size > MAX_AUDIO_BYTES) {
      return NextResponse.json(
        {
          error: "This recording is over the 25 MB transcription limit. Download it and split it into shorter chapters.",
          code: "AUDIO_TOO_LARGE",
        },
        { status: 413 },
      );
    }

    const upstream = new FormData();
    const extension = audio.type.includes("mp4") ? "m4a" : audio.type.includes("wav") ? "wav" : "webm";
    upstream.append("file", audio, audio.name || `voice-foundry-recording.${extension}`);
    upstream.append(
      "model",
      process.env.VOICE_FOUNDRY_TRANSCRIBE_MODEL || "gpt-4o-mini-transcribe",
    );
    upstream.append("response_format", "json");
    upstream.append(
      "prompt",
      "Natural spoken family memory, oral history, work context, or personal note. Preserve names, places, dates, technical terms, and the speaker's wording.",
    );

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: upstream,
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Voice Foundry transcription upstream error", response.status, detail);
      return NextResponse.json(
        {
          error: "The transcription service could not process this recording.",
          code: "TRANSCRIPTION_UPSTREAM_ERROR",
        },
        { status: response.status >= 500 ? 502 : response.status },
      );
    }

    const result = (await response.json()) as { text?: string };
    const text = result.text?.trim();
    if (!text) {
      return NextResponse.json(
        { error: "No speech was detected in the recording.", code: "NO_SPEECH" },
        { status: 422 },
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Voice Foundry transcription route failed", error);
    return NextResponse.json(
      {
        error: "The recording could not be transcribed.",
        code: "TRANSCRIPTION_FAILED",
      },
      { status: 500 },
    );
  }
}
