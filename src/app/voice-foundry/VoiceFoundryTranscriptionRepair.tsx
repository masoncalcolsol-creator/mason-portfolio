"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TranscriptionResult = {
  text?: string;
  error?: string;
  code?: string;
};

type LearnedCorrection = {
  from: string;
  to: string;
  count: number;
  updatedAt: string;
};

type LearningProfile = {
  corrections: LearnedCorrection[];
  vocabulary: string[];
  updatedAt?: string;
};

const LEARNING_KEY = "nullworks-voice-foundry-learning-v1";
const RAW_TRANSCRIPT_KEY = "nullworks-voice-foundry-last-raw-transcript-v1";
const EMPTY_PROFILE: LearningProfile = { corrections: [], vocabulary: [] };

function setReactTextareaValue(textarea: HTMLTextAreaElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    "value",
  )?.set;
  setter?.call(textarea, value);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  textarea.dispatchEvent(new Event("change", { bubbles: true }));
}

function readInput(id: string) {
  return document.querySelector<HTMLInputElement>(`#${id}`)?.value.trim() ?? "";
}

function loadProfile(): LearningProfile {
  try {
    const saved = window.localStorage.getItem(LEARNING_KEY);
    if (!saved) return EMPTY_PROFILE;
    const parsed = JSON.parse(saved) as LearningProfile;
    return {
      corrections: Array.isArray(parsed.corrections) ? parsed.corrections : [],
      vocabulary: Array.isArray(parsed.vocabulary) ? parsed.vocabulary : [],
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return EMPTY_PROFILE;
  }
}

function saveProfile(profile: LearningProfile) {
  window.localStorage.setItem(LEARNING_KEY, JSON.stringify(profile));
}

function normalizeToken(value: string) {
  return value
    .toLocaleLowerCase()
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
}

function cleanPhrase(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function deriveCorrectionPairs(raw: string, edited: string) {
  const original = cleanPhrase(raw).split(" ").filter(Boolean);
  const corrected = cleanPhrase(edited).split(" ").filter(Boolean);
  const pairs: Array<{ from: string; to: string }> = [];
  const seen = new Set<string>();

  function addPair(fromTokens: string[], toTokens: string[]) {
    const from = cleanPhrase(fromTokens.join(" "));
    const to = cleanPhrase(toTokens.join(" "));
    if (!from || !to || from === to) return;
    if (from.length > 120 || to.length > 120) return;
    if (fromTokens.length > 8 || toTokens.length > 8) return;
    const key = `${from.toLocaleLowerCase()}=>${to.toLocaleLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    pairs.push({ from, to });
  }

  let originalIndex = 0;
  let correctedIndex = 0;

  while (originalIndex < original.length && correctedIndex < corrected.length) {
    const originalNormalized = normalizeToken(original[originalIndex]);
    const correctedNormalized = normalizeToken(corrected[correctedIndex]);

    if (originalNormalized === correctedNormalized) {
      if (original[originalIndex] !== corrected[correctedIndex]) {
        addPair([original[originalIndex]], [corrected[correctedIndex]]);
      }
      originalIndex += 1;
      correctedIndex += 1;
      continue;
    }

    let best: { originalSkip: number; correctedSkip: number; score: number } | null = null;
    for (let originalSkip = 0; originalSkip <= 8; originalSkip += 1) {
      for (let correctedSkip = 0; correctedSkip <= 8; correctedSkip += 1) {
        if (originalSkip === 0 && correctedSkip === 0) continue;
        const nextOriginal = originalIndex + originalSkip;
        const nextCorrected = correctedIndex + correctedSkip;
        if (nextOriginal >= original.length || nextCorrected >= corrected.length) continue;
        if (normalizeToken(original[nextOriginal]) !== normalizeToken(corrected[nextCorrected])) continue;
        const score = originalSkip + correctedSkip;
        if (!best || score < best.score) {
          best = { originalSkip, correctedSkip, score };
        }
      }
    }

    if (best) {
      addPair(
        original.slice(originalIndex, originalIndex + best.originalSkip),
        corrected.slice(correctedIndex, correctedIndex + best.correctedSkip),
      );
      originalIndex += best.originalSkip;
      correctedIndex += best.correctedSkip;
      continue;
    }

    addPair([original[originalIndex]], [corrected[correctedIndex]]);
    originalIndex += 1;
    correctedIndex += 1;
  }

  addPair(original.slice(originalIndex), corrected.slice(correctedIndex));
  return pairs;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function applyLearnedCorrections(text: string, corrections: LearnedCorrection[]) {
  let result = text;
  const ordered = [...corrections].sort((a, b) => b.from.length - a.from.length);
  for (const correction of ordered) {
    if (!correction.from || !correction.to) continue;
    const pattern = new RegExp(
      `(^|[^\\p{L}\\p{N}])(${escapeRegExp(correction.from)})(?=$|[^\\p{L}\\p{N}])`,
      "giu",
    );
    result = result.replace(pattern, (_match, prefix: string) => `${prefix}${correction.to}`);
  }
  return cleanPhrase(result);
}

function collectContextVocabulary(pairs: Array<{ from: string; to: string }>) {
  const values = [
    readInput("story-title"),
    readInput("storyteller"),
    readInput("occasion"),
    ...readInput("tags").split(","),
    ...pairs.map((pair) => pair.to),
  ];

  const terms = new Set<string>();
  for (const value of values) {
    const cleaned = cleanPhrase(value);
    if (!cleaned || cleaned.length < 2 || cleaned.length > 100) continue;
    terms.add(cleaned);
  }
  return [...terms];
}

function mergeLearning(
  current: LearningProfile,
  pairs: Array<{ from: string; to: string }>,
  vocabulary: string[],
): LearningProfile {
  const correctionMap = new Map<string, LearnedCorrection>();
  for (const correction of current.corrections) {
    correctionMap.set(correction.from.toLocaleLowerCase(), correction);
  }

  const now = new Date().toISOString();
  for (const pair of pairs) {
    const key = pair.from.toLocaleLowerCase();
    const existing = correctionMap.get(key);
    correctionMap.set(key, {
      from: pair.from,
      to: pair.to,
      count: (existing?.count ?? 0) + 1,
      updatedAt: now,
    });
  }

  const vocabularyMap = new Map<string, string>();
  for (const term of [...current.vocabulary, ...vocabulary]) {
    const cleaned = cleanPhrase(term);
    if (!cleaned) continue;
    vocabularyMap.set(cleaned.toLocaleLowerCase(), cleaned);
  }

  return {
    corrections: [...correctionMap.values()]
      .sort((a, b) => b.count - a.count || b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, 100),
    vocabulary: [...vocabularyMap.values()].slice(-150),
    updatedAt: now,
  };
}

export default function VoiceFoundryTranscriptionRepair() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [profile, setProfile] = useState<LearningProfile>(EMPTY_PROFILE);
  const attemptedSourceRef = useRef("");
  const lastRawTranscriptRef = useRef("");
  const profileRef = useRef<LearningProfile>(EMPTY_PROFILE);

  useEffect(() => {
    const loaded = loadProfile();
    setProfile(loaded);
    profileRef.current = loaded;
    lastRawTranscriptRef.current = window.sessionStorage.getItem(RAW_TRANSCRIPT_KEY) ?? "";
  }, []);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  const scanPage = useCallback(() => {
    setHost(document.querySelector<HTMLElement>(".vf-actions"));
    setAudio(document.querySelector<HTMLAudioElement>(".vf-audio"));
  }, []);

  useEffect(() => {
    scanPage();
    const observer = new MutationObserver(scanPage);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src"],
    });
    return () => observer.disconnect();
  }, [scanPage]);

  const learnFromEdits = useCallback((showStatus = true) => {
    const textarea = document.querySelector<HTMLTextAreaElement>("#transcript");
    const raw = lastRawTranscriptRef.current || window.sessionStorage.getItem(RAW_TRANSCRIPT_KEY) || "";
    const edited = textarea?.value.trim() ?? "";

    if (!raw || !edited) {
      if (showStatus) setStatus("Transcribe a recording, correct the words, then teach those edits.");
      return;
    }

    const pairs = deriveCorrectionPairs(raw, edited);
    const vocabulary = collectContextVocabulary(pairs);
    const next = mergeLearning(profileRef.current, pairs, vocabulary);
    const changed =
      next.corrections.length !== profileRef.current.corrections.length ||
      next.vocabulary.length !== profileRef.current.vocabulary.length ||
      pairs.length > 0;

    if (!changed) {
      if (showStatus) setStatus("No new corrections were found. The current transcript already matches the transcription baseline.");
      return;
    }

    saveProfile(next);
    profileRef.current = next;
    setProfile(next);
    lastRawTranscriptRef.current = edited;
    window.sessionStorage.setItem(RAW_TRANSCRIPT_KEY, edited);

    if (showStatus) {
      setStatus(
        `Learned ${pairs.length} correction${pairs.length === 1 ? "" : "s"}. Future recordings will receive this vocabulary and correction context on this browser.`,
      );
    }
  }, []);

  useEffect(() => {
    const saveListener = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest("button") : null;
      if (element?.textContent?.trim().toLocaleLowerCase().includes("save to vault")) {
        learnFromEdits(false);
      }
    };
    document.addEventListener("click", saveListener, true);
    return () => document.removeEventListener("click", saveListener, true);
  }, [learnFromEdits]);

  const transcribe = useCallback(async () => {
    const player = document.querySelector<HTMLAudioElement>(".vf-audio");
    const textarea = document.querySelector<HTMLTextAreaElement>("#transcript");
    const source = player?.currentSrc || player?.src || "";

    if (!player || !source) {
      setStatus("Record or open an audio story first.");
      return;
    }
    if (!textarea) {
      setStatus("The transcript editor is not available on this screen.");
      return;
    }

    setBusy(true);
    setStatus("Transcribing the recorded audio with your saved vocabulary… Keep this page open.");

    try {
      const audioResponse = await fetch(source);
      if (!audioResponse.ok) throw new Error("The recorded audio could not be opened.");
      const blob = await audioResponse.blob();
      if (!blob.size) throw new Error("The recorded audio file is empty.");
      if (blob.size > 25 * 1024 * 1024) {
        throw new Error("This chapter is over the 25 MB transcription limit. Split it into a shorter recording.");
      }

      const extension = blob.type.includes("mp4")
        ? "m4a"
        : blob.type.includes("wav")
          ? "wav"
          : "webm";
      const form = new FormData();
      form.append("audio", blob, `voice-foundry-recording.${extension}`);
      form.append(
        "context",
        JSON.stringify({
          title: readInput("story-title"),
          storyteller: readInput("storyteller"),
          occasion: readInput("occasion"),
          tags: readInput("tags").split(",").map((item) => item.trim()).filter(Boolean),
          vocabulary: profileRef.current.vocabulary,
          corrections: profileRef.current.corrections,
          quality: "high",
        }),
      );

      const response = await fetch("/api/voice-foundry/transcribe", {
        method: "POST",
        body: form,
      });
      const result = (await response.json()) as TranscriptionResult;
      if (!response.ok || !result.text?.trim()) {
        throw new Error(result.error || "The transcription service returned no words.");
      }

      const raw = result.text.trim();
      const corrected = applyLearnedCorrections(raw, profileRef.current.corrections);
      lastRawTranscriptRef.current = raw;
      window.sessionStorage.setItem(RAW_TRANSCRIPT_KEY, raw);
      setReactTextareaValue(textarea, corrected);
      setStatus(
        "Transcript created. Correct any wrong words, then press Learn from edits or simply Save to vault so this browser remembers them.",
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? `${error.message} The original audio is still preserved.`
          : "The recording could not be transcribed. The original audio is still preserved.",
      );
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    const source = audio?.currentSrc || audio?.src || "";
    if (!source || source === attemptedSourceRef.current) return;
    attemptedSourceRef.current = source;

    const textarea = document.querySelector<HTMLTextAreaElement>("#transcript");
    if (textarea?.value.trim()) return;

    const timer = window.setTimeout(() => {
      void transcribe();
    }, 700);
    return () => window.clearTimeout(timer);
  }, [audio, transcribe]);

  const clearLearning = useCallback(() => {
    const approved = window.confirm(
      "Forget every locally learned Voice Foundry correction and vocabulary term on this browser? Saved stories will not be deleted.",
    );
    if (!approved) return;
    window.localStorage.removeItem(LEARNING_KEY);
    window.sessionStorage.removeItem(RAW_TRANSCRIPT_KEY);
    profileRef.current = EMPTY_PROFILE;
    lastRawTranscriptRef.current = "";
    setProfile(EMPTY_PROFILE);
    setStatus("Accuracy memory cleared. Saved audio and stories were not changed.");
  }, []);

  if (!host || !audio) return null;

  return createPortal(
    <>
      <button
        className="vf-btn vf-btn-primary"
        type="button"
        disabled={busy}
        onClick={() => void transcribe()}
      >
        {busy ? "Transcribing…" : "Transcribe audio"}
      </button>
      <button
        className="vf-btn"
        type="button"
        disabled={busy}
        onClick={() => learnFromEdits(true)}
      >
        Learn from edits
      </button>
      <button
        className="vf-btn vf-btn-quiet"
        type="button"
        disabled={busy || (profile.corrections.length === 0 && profile.vocabulary.length === 0)}
        onClick={clearLearning}
      >
        Reset accuracy memory
      </button>
      <div
        className="vf-notice"
        style={{ flexBasis: "100%", marginTop: 2 }}
      >
        Accuracy memory: {profile.corrections.length} learned correction{profile.corrections.length === 1 ? "" : "s"} · {profile.vocabulary.length} vocabulary term{profile.vocabulary.length === 1 ? "" : "s"}. It stays on this browser and is sent only with audio you choose to transcribe.
      </div>
      {status && (
        <div
          className="vf-notice"
          role="status"
          style={{ flexBasis: "100%", marginTop: 2 }}
        >
          {status}
        </div>
      )}
    </>,
    host,
  );
}
