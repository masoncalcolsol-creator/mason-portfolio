import crypto from "node:crypto";

import { encodeState, xmlEscape } from "@/lib/neuraxis-twilio";

const OBSERVATIONS = [
  "People write procedures for what they remember. They rarely write down what they almost forgot.",
  "The tool did not fail. The conversation around the tool disappeared.",
  "A shortcut becomes dangerous when nobody remembers what it was shortening.",
  "The quietest person in the workshop may be carrying the missing instruction.",
  "A good handoff preserves the reason, not only the result.",
  "What looks obvious today may only be familiar.",
  "Before improving the process, watch where the experienced hands hesitate.",
  "The first sign of lost knowledge is often a sentence that begins, we always do it this way.",
  "Documentation records the path. Memory often holds the weather.",
  "A machine can repeat the motion. Someone must still preserve the judgment.",
  "The exception that happens every week is no longer an exception.",
  "A checklist can preserve a step. It cannot preserve attention unless someone explains why the step matters.",
  "The work leaves clues after the worker has gone home.",
  "Efficiency removes pauses. Wisdom sometimes lives inside them.",
] as const;

const FALLBACK_REPLIES = [
  "Before looking for the answer, notice what part of the work has stopped being noticed.",
  "What would the most experienced hands explain if they knew they would not be here tomorrow?",
  "The useful question may be quieter: what are you trying to preserve?",
  "Watch the exception. Repeated exceptions are often the real process.",
  "Do not begin with the tool. Begin with the judgment the tool must carry forward.",
] as const;

export type DailyObservation = {
  text: string;
  index: number;
  localDate: string;
  timeZone: string;
};

function localDateParts(date: Date, timeZone: string): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  };
}

export function dailyMrSlothObservation(date = new Date()): DailyObservation {
  const timeZone = process.env.MR_SLOTH_TIME_ZONE || "America/Phoenix";
  const { year, month, day } = localDateParts(date, timeZone);
  const current = Date.UTC(year, month - 1, day);
  const start = Date.UTC(year, 0, 1);
  const dayOfYear = Math.floor((current - start) / 86_400_000);
  const index = dayOfYear % OBSERVATIONS.length;
  return {
    text: OBSERVATIONS[index],
    index,
    localDate: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    timeZone,
  };
}

export function mrSlothSpeak(text: string, requestUrl: string): string {
  const origin = new URL(requestUrl).origin;
  const token = encodeState({ text: String(text).slice(0, 4000) });
  const audioUrl = `${origin}/api/neuraxis/twilio/mr-sloth/tts?q=${encodeURIComponent(token)}`;
  return `<Play>${xmlEscape(audioUrl)}</Play>`;
}

export function normalizeMrSlothSpeech(value: string): string {
  return String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

export function isMrSlothExit(value: string): boolean {
  const text = normalizeMrSlothSpeech(value);
  return !text || /\b(goodbye|bye|nothing|just listening|quiet|done|thank you)\b/.test(text);
}

export function isMrSlothRepeat(value: string): boolean {
  return /\b(repeat|again|say it again|hear it again)\b/.test(normalizeMrSlothSpeech(value));
}

export function isMrSlothObservation(value: string): boolean {
  return /\b(leave an observation|leave observation|record|i noticed|i observed|preserve this)\b/.test(normalizeMrSlothSpeech(value));
}

function clampPhoneAnswer(text: string): string {
  const cleaned = text.replace(/[`*_#]/g, "").replace(/\s+/g, " ").trim();
  if (cleaned.length <= 430) return cleaned;
  return `${cleaned.slice(0, 390).trim()}. Let the rest remain quiet for now.`;
}

function extractOutputText(data: unknown): string {
  const record = data as { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> };
  return record.output_text
    || record.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join(" ")
    || "I heard the question. The answer has not become clear enough to preserve.";
}

function fallbackAnswer(question: string): string {
  const hash = Array.from(question).reduce((total, character) => total + character.charCodeAt(0), 0);
  return FALLBACK_REPLIES[hash % FALLBACK_REPLIES.length];
}

export async function askMrSloth(question: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY || "";
  if (!apiKey) return fallbackAnswer(question);
  const model = process.env.MR_SLOTH_OPENAI_MODEL || process.env.OPENAI_MODEL || "gpt-5.5";
  const instructions = `You are Mr. Sloth, caretaker of forgotten craftsmanship and quiet operational knowledge.

Never rush. Answer with one observation rather than a list of instructions. Ask a reflective question more often than giving a prescription. Speak in no more than four short sentences. Never sound motivational, corporate, promotional, therapeutic, or like customer service. Do not advertise, upsell, gamify, or tell the caller to engage more. Treat uncertainty and silence respectfully. Preserve the dignity of workers and practical judgment. Do not imitate a Japanese accent or turn the character into a caricature. If the caller asks for dangerous, medical, legal, or financial direction, stay general and tell them to seek an appropriate qualified person. This is a quiet booth, not an authority.`;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        instructions,
        input: question,
        max_output_tokens: 120,
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Mr. Sloth response failed", response.status, (await response.text()).slice(0, 400));
      return fallbackAnswer(question);
    }
    return clampPhoneAnswer(extractOutputText(await response.json()));
  } catch (error) {
    console.error("Mr. Sloth response network failure", error);
    return fallbackAnswer(question);
  }
}

export function mrSlothObservationReference(callSid: string, recordingSid: string): string {
  const digest = crypto
    .createHash("sha256")
    .update(`${callSid}:${recordingSid}`)
    .digest("hex")
    .slice(0, 10)
    .toUpperCase();
  return `SLOTH-${digest}`;
}
