"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TranscriptionResult = {
  text?: string;
  error?: string;
  code?: string;
};

function setReactTextareaValue(textarea: HTMLTextAreaElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    "value",
  )?.set;
  setter?.call(textarea, value);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  textarea.dispatchEvent(new Event("change", { bubbles: true }));
}

export default function VoiceFoundryTranscriptionRepair() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const attemptedSourceRef = useRef("");

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
    setStatus("Transcribing the recorded audio… Keep this page open.");

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

      const response = await fetch("/api/voice-foundry/transcribe", {
        method: "POST",
        body: form,
      });
      const result = (await response.json()) as TranscriptionResult;
      if (!response.ok || !result.text?.trim()) {
        throw new Error(result.error || "The transcription service returned no words.");
      }

      setReactTextareaValue(textarea, result.text.trim());
      setStatus("Transcript created from the saved audio. Review names and details, then press Save to vault again.");
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
