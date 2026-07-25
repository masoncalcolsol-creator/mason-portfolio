"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import styles from "./voice-portal.module.css";

type SessionRole = "admin" | "guest";
type PortalState = "checking" | "locked" | "ready" | "active" | "recording" | "processing" | "speaking" | "ended" | "error";

type TurnResponse = {
  ok: boolean;
  transcript: string;
  answer: string;
  audio_url: string;
  transport: "DIRECT_BROWSER_AUDIO";
  international_pstn_leg: false;
};

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
  });
  const data = await response.json() as T & { error?: string };
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status}).`);
  return data;
}

function preferredAudioType(): string | undefined {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  return candidates.find((type) => typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(type));
}

function extensionFor(type: string): string {
  if (type.includes("mp4")) return "m4a";
  if (type.includes("ogg")) return "ogg";
  return "webm";
}

export default function VoicePortal() {
  const [state, setState] = useState<PortalState>("checking");
  const [role, setRole] = useState<SessionRole | null>(null);
  const [passcode, setPasscode] = useState("");
  const [status, setStatus] = useState("Checking secure workroom access…");
  const [elapsed, setElapsed] = useState(0);
  const [inviteUrl, setInviteUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerAudioUrl, setAnswerAudioUrl] = useState("");
  const [typedQuestion, setTypedQuestion] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedback, setFeedback] = useState({
    understood: true,
    valuable: true,
    return_intent: true,
    human_correction_required: false,
    follow_up: "",
  });

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordingLimitRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningRef = useRef(new Set<number>());

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const stopRecordingLimit = useCallback(() => {
    if (recordingLimitRef.current) clearTimeout(recordingLimitRef.current);
    recordingLimitRef.current = null;
  }, []);

  const releaseMedia = useCallback(() => {
    stopRecordingLimit();
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    recorderRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    audioRef.current?.pause();
    audioRef.current = null;
  }, [stopRecordingLimit]);

  const endSession = useCallback((message: string) => {
    stopTimer();
    releaseMedia();
    startedAtRef.current = null;
    setState("ended");
    setStatus(message);
    setShowFeedback(true);
  }, [releaseMedia, stopTimer]);

  const startTimer = useCallback(() => {
    stopTimer();
    startedAtRef.current = Date.now();
    warningRef.current.clear();
    setElapsed(0);
    timerRef.current = setInterval(() => {
      const started = startedAtRef.current;
      if (!started) return;
      const seconds = Math.floor((Date.now() - started) / 1000);
      setElapsed(seconds);
      for (const warning of [15 * 60, 19 * 60]) {
        if (seconds >= warning && !warningRef.current.has(warning)) {
          warningRef.current.add(warning);
          setStatus(`Cost-control warning: ${Math.ceil((20 * 60 - warning) / 60)} minute${warning === 19 * 60 ? "" : "s"} remain.`);
        }
      }
      if (seconds >= 20 * 60) {
        endSession("The 20-minute cost-control ceiling ended this internet session.");
      }
    }, 1000);
  }, [endSession, stopTimer]);

  const checkSession = useCallback(async () => {
    try {
      const session = await jsonFetch<{ ok: boolean; role: SessionRole }>("/api/neuraxis/voice-web/session");
      setRole(session.role);
      setState("ready");
      setStatus("Secure workroom unlocked. No telephone call will be placed.");
      return;
    } catch {
      const invite = new URL(window.location.href).searchParams.get("invite");
      if (invite) {
        try {
          const session = await jsonFetch<{ ok: boolean; role: SessionRole }>("/api/neuraxis/voice-web/session", {
            method: "POST",
            body: JSON.stringify({ invite }),
          });
          history.replaceState({}, "", window.location.pathname);
          setRole(session.role);
          setState("ready");
          setStatus("Invitation accepted. This is direct internet audio; Mason remains final Human Authority.");
          return;
        } catch (error) {
          setStatus(error instanceof Error ? error.message : "Invitation could not be accepted.");
        }
      }
      setState("locked");
    }
  }, []);

  useEffect(() => {
    void checkSession();
    return () => {
      stopTimer();
      releaseMedia();
    };
  }, [checkSession, releaseMedia, stopTimer]);

  async function unlock(event: FormEvent) {
    event.preventDefault();
    setStatus("Verifying passcode…");
    try {
      const session = await jsonFetch<{ ok: boolean; role: SessionRole }>("/api/neuraxis/voice-web/session", {
        method: "POST",
        body: JSON.stringify({ passcode }),
      });
      setPasscode("");
      setRole(session.role);
      setState("ready");
      setStatus("Secure workroom unlocked. No telephone call will be placed.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Access denied.");
    }
  }

  async function enterWorkroom() {
    setShowFeedback(false);
    setFeedbackSent(false);
    setStatus("Requesting microphone access for direct internet audio…");
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
        throw new Error("This browser does not support direct microphone recording. Use the text question box below or update the browser.");
      }
      releaseMedia();
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      streamRef.current = stream;
      setState("active");
      setStatus("Pressure Cooker online over the internet. Tap Start speaking, ask the question, then tap Finish question.");
      startTimer();
    } catch (error) {
      setState("error");
      setStatus(error instanceof Error ? error.message : "Microphone access failed.");
    }
  }

  async function playAnswer(url = answerAudioUrl) {
    if (!url) return;
    audioRef.current?.pause();
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => {
      setState("active");
      setStatus("Answer complete. Ask the next question when ready.");
    };
    audio.onerror = () => {
      setState("active");
      setStatus("The written answer is ready, but spoken playback failed. Press Play answer to retry.");
    };
    try {
      setState("speaking");
      setStatus("Workroom answering…");
      await audio.play();
    } catch {
      setState("active");
      setStatus("Answer ready. Press Play answer to hear it.");
    }
  }

  async function submitTurn(form: FormData) {
    setState("processing");
    setStatus("Transcribing, loading locked evidence, and preparing the answer…");
    try {
      const response = await fetch("/api/neuraxis/voice-web/turn", {
        method: "POST",
        body: form,
        cache: "no-store",
      });
      const result = await response.json() as TurnResponse & { error?: string };
      if (!response.ok) throw new Error(result.error || `Workroom request failed (${response.status}).`);
      setTranscript(result.transcript);
      setAnswer(result.answer);
      setAnswerAudioUrl(result.audio_url);
      await playAnswer(result.audio_url);
    } catch (error) {
      setState("active");
      setStatus(error instanceof Error ? error.message : "The workroom could not answer that turn.");
    }
  }

  function startRecording() {
    const stream = streamRef.current;
    if (!stream) {
      setStatus("Start the workroom first so the browser can access the microphone.");
      return;
    }
    try {
      audioRef.current?.pause();
      chunksRef.current = [];
      const mimeType = preferredAudioType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        stopRecordingLimit();
        const type = recorder.mimeType || mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type });
        const form = new FormData();
        form.append("audio", blob, `question.${extensionFor(type)}`);
        void submitTurn(form);
      };
      recorder.start(250);
      setState("recording");
      setStatus("Listening. Ask one question, then tap Finish question.");
      recordingLimitRef.current = setTimeout(() => {
        if (recorder.state === "recording") recorder.stop();
      }, 60_000);
    } catch (error) {
      setState("active");
      setStatus(error instanceof Error ? error.message : "Recording could not start.");
    }
  }

  function finishRecording() {
    stopRecordingLimit();
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }

  async function askByText(event: FormEvent) {
    event.preventDefault();
    const question = typedQuestion.trim();
    if (!question) return;
    setTypedQuestion("");
    const form = new FormData();
    form.append("text", question);
    await submitTurn(form);
  }

  function stopAnswer() {
    audioRef.current?.pause();
    setState("active");
    setStatus("Answer stopped. Ask the next question when ready.");
  }

  function hangUp() {
    endSession("Internet voice session ended. No international telephone leg was used.");
  }

  async function createInvite() {
    setStatus("Creating a 24-hour conversation-only invitation…");
    try {
      const result = await jsonFetch<{ invitation_url: string; expires_at: string }>("/api/neuraxis/voice-web/invite", {
        method: "POST",
        body: JSON.stringify({ ttl_hours: 24 }),
      });
      setInviteUrl(result.invitation_url);
      await navigator.clipboard?.writeText(result.invitation_url);
      setStatus(`Invitation created and copied. It expires ${new Date(result.expires_at).toLocaleString()}.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Invitation could not be created.");
    }
  }

  async function logout() {
    releaseMedia();
    stopTimer();
    await fetch("/api/neuraxis/voice-web/session", { method: "DELETE" });
    setRole(null);
    setState("locked");
    setStatus("Secure session closed.");
  }

  async function submitFeedback(event: FormEvent) {
    event.preventDefault();
    try {
      await jsonFetch<{ ok: boolean }>("/api/neuraxis/voice-web/feedback", {
        method: "POST",
        body: JSON.stringify(feedback),
      });
      setFeedbackSent(true);
      setStatus("Feedback receipt preserved in the private Hive.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Feedback receipt failed.");
    }
  }

  const sessionOpen = ["active", "recording", "processing", "speaking"].includes(state);
  const canStart = ["ready", "ended", "error"].includes(state);
  const canAsk = ["active", "speaking"].includes(state);

  return (
    <main className={styles.shell}>
      <div className={styles.grid} aria-hidden="true" />
      <section className={styles.panel}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>NULLWORKS · CONVERSATIONAL EVIDENCE TRANSLATION</p>
            <h1>Pressure Cooker Voice Workroom</h1>
            <p className={styles.lede}>Secure microphone conversation over the internet. This browser route does not dial the Twilio number and does not create an international telephone leg.</p>
          </div>
          <div className={styles.badge}>{role ? `${role.toUpperCase()} ACCESS` : "LOCKED"}</div>
        </header>

        <div className={styles.boundary}>
          <strong>Authority boundary:</strong> this room explains evidence, classifications, repairs, and retest paths. It cannot authorize testing, mutate systems, publish findings, or replace Mason Perry as final Human Authority.
        </div>

        {state === "locked" && (
          <form className={styles.gate} onSubmit={unlock}>
            <label htmlFor="passcode">Four-digit Pressure Cooker passcode</label>
            <div className={styles.row}>
              <input
                id="passcode"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{4}"
                maxLength={4}
                value={passcode}
                onChange={(event) => setPasscode(event.target.value.replace(/\D/g, "").slice(0, 4))}
                aria-label="Pressure Cooker passcode"
              />
              <button type="submit">Unlock</button>
            </div>
          </form>
        )}

        {state !== "locked" && state !== "checking" && (
          <section className={styles.console}>
            <div className={styles.metrics}>
              <div><span>Transport</span><strong>Direct internet audio</strong></div>
              <div><span>International PSTN</span><strong>None</strong></div>
              <div><span>Session</span><strong>{formatClock(elapsed)} / 20:00</strong></div>
              <div><span>Phone-carrier charge</span><strong>$0.000</strong></div>
            </div>

            <div className={styles.controls}>
              <button className={styles.primary} onClick={enterWorkroom} disabled={!canStart}>Start Internet Workroom</button>
              <button onClick={state === "recording" ? finishRecording : startRecording} disabled={!canAsk && state !== "recording"}>
                {state === "recording" ? "Finish question" : "Start speaking"}
              </button>
              <button onClick={() => void playAnswer()} disabled={!answerAudioUrl || state === "speaking"}>Play answer</button>
              <button onClick={stopAnswer} disabled={state !== "speaking"}>Stop answer</button>
              <button onClick={hangUp} disabled={!sessionOpen}>End Session</button>
            </div>

            <form className={styles.textAsk} onSubmit={askByText}>
              <textarea
                placeholder="Text fallback: type a question here"
                value={typedQuestion}
                onChange={(event) => setTypedQuestion(event.target.value.slice(0, 5000))}
                disabled={!sessionOpen || state === "processing"}
              />
              <button type="submit" disabled={!typedQuestion.trim() || !sessionOpen || state === "processing"}>Ask by text</button>
            </form>

            {(transcript || answer) && (
              <div className={styles.exchange}>
                {transcript && <div><span>You asked</span><p>{transcript}</p></div>}
                {answer && <div><span>Workroom answered</span><p>{answer}</p></div>}
              </div>
            )}

            {role === "admin" && (
              <div className={styles.inviteBox}>
                <button onClick={createInvite}>Create 24-hour guest link</button>
                {inviteUrl && <input readOnly value={inviteUrl} onFocus={(event) => event.currentTarget.select()} aria-label="Guest invitation URL" />}
              </div>
            )}

            <p className={styles.small}>This route uses OpenAI transcription, reasoning, and speech generation over the internet. Those API calls remain metered, but no Twilio phone call or international carrier leg is created. The telephone number remains an emergency fallback only.</p>
          </section>
        )}

        <div className={`${styles.status} ${state === "error" ? styles.statusError : ""}`} role="status" aria-live="polite">{status}</div>

        {showFeedback && !feedbackSent && (
          <form className={styles.feedback} onSubmit={submitFeedback}>
            <h2>Close the throughput receipt</h2>
            <div className={styles.checks}>
              <label><input type="checkbox" checked={feedback.understood} onChange={(e) => setFeedback({ ...feedback, understood: e.target.checked })} /> I understood the explanation</label>
              <label><input type="checkbox" checked={feedback.valuable} onChange={(e) => setFeedback({ ...feedback, valuable: e.target.checked })} /> The session was valuable</label>
              <label><input type="checkbox" checked={feedback.return_intent} onChange={(e) => setFeedback({ ...feedback, return_intent: e.target.checked })} /> I would return to this workroom</label>
              <label><input type="checkbox" checked={feedback.human_correction_required} onChange={(e) => setFeedback({ ...feedback, human_correction_required: e.target.checked })} /> A human correction was required</label>
            </div>
            <textarea placeholder="Follow-up action or unresolved question (optional)" value={feedback.follow_up} onChange={(e) => setFeedback({ ...feedback, follow_up: e.target.value.slice(0, 500) })} />
            <button type="submit">Preserve feedback receipt</button>
          </form>
        )}

        {role && <button className={styles.logout} onClick={logout}>Close secure session</button>}
      </section>
    </main>
  );
}
