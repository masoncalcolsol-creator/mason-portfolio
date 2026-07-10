import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_AUDIO_BYTES = 25 * 1024 * 1024;
const MAX_PROMPT_CHARS = 2200;

type LearnedCorrection = {
  from?: string;
  to?: string;
  count?: number;
};

type TranscriptionContext = {
  title?: string;
  storyteller?: string;
  occasion?: string;
  tags?: string[];
  vocabulary?: string[];
  corrections?: LearnedCorrection[];
  quality?: "standard" | "high";
};

function clean(value: unknown, maxLength = 180) {
  return typeof value === "string"
    ? value.replace(/\s+/g, " ").trim().slice(0, maxLength)
    : "";
}

function parseContext(value: FormDataEntryValue | null): TranscriptionContext {
  if (typeof value !== "string" || !value.trim()) return {};
  try {
    const parsed = JSON.parse(value) as TranscriptionContext;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function buildPrompt(context: TranscriptionContext) {
  const parts = [
    "Natural spoken family memory, oral history, work context, or personal note.",
    "Preserve the speaker's wording while using normal punctuation.",
    "Pay special attention to names, places, dates, trade language, product names, acronyms, and technical terms.",
  ];

  const title = clean(context.title);
  const storyteller = clean(context.storyteller);
  const occasion = clean(context.occasion, 260);
  const tags = Array.isArray(context.tags)
    ? context.tags.map((item) => clean(item, 60)).filter(Boolean).slice(0, 20)
    : [];
  const vocabulary = Array.isArray(context.vocabulary)
    ? context.vocabulary.map((item) => clean(item, 80)).filter(Boolean).slice(0, 80)
    : [];
  const corrections = Array.isArray(context.corrections)
    ? context.corrections
        .map((item) => ({
          from: clean(item.from, 100),
          to: clean(item.to, 100),
          count: Number.isFinite(item.count) ? Number(item.count) : 1,
        }))
        .filter((item) => item.from && item.to && item.from.toLowerCase() !== item.to.toLowerCase())
        .sort((a, b) => b.count - a.count)
        .slice(0, 40)
    : [];

  if (title) parts.push(`Story title: ${title}.`);
  if (storyteller) parts.push(`Storyteller: ${storyteller}.`);
  if (occasion) parts.push(`Topic or context: ${occasion}.`);
  if (tags.length) parts.push(`Likely subjects and terms: ${tags.join(", ")}.`);
  if (vocabulary.length) parts.push(`Preferred spellings and vocabulary: ${vocabulary.join(", ")}.`);
  if (corrections.length) {
    parts.push(
      `Previously corrected recognition examples: ${corrections
        .map((item) => `\"${item.from}\" should be \"${item.to}\"`)
        .join("; ")}.`,
    );
  }

  return parts.join(" ").slice(0, MAX_PROMPT_CHARS);
}

export async function GET() {
  return NextResponse.json({
    configured: Boolean(process.env.OPENAI_API_KEY),
    model: process.env.VOICE_FOUNDRY_TRANSCRIBE_MODEL || "gpt-4o-transcribe",
    adaptiveContext: true,
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
    const context = parseContext(incoming.get("context"));

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
      process.env.VOICE_FOUNDRY_TRANSCRIBE_MODEL ||
        (context.quality === "standard" ? "gpt-4o-mini-transcribe" : "gpt-4o-transcribe"),
    );
    upstream.append("response_format", "json");
    upstream.append("prompt", buildPrompt(context));

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

    return NextResponse.json({ text, adaptiveContext: true });
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
