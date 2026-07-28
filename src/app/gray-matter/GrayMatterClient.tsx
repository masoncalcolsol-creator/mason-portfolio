"use client";

import { useEffect, useRef, useState } from "react";

type CaptureResult = {
  ok: boolean;
  entry?: {
    id: string;
    title: string;
    category: string;
    urgency: string;
    gmail_message_id?: string;
  };
  actions?: Array<{ id: string; text: string; priority: string }>;
  warnings?: string[];
  error?: string;
};

type BriefResult = {
  spoken?: string;
  todayEntries?: Array<{ id: string; title: string; summary: string; urgency: string }>;
  openActions?: Array<{ id: string; text: string; priority: string; due_text?: string; project?: string }>;
  spillover?: Array<{ id: string; text: string; priority: string }>;
  error?: string;
};

type SearchResult = {
  id: string;
  subject: string;
  date: string;
  snippet: string;
  excerpt: string;
};

const TOKEN_KEY = "gray-matter-session-token";

function apiHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "An unknown error occurred.";
}

function recordingMimeType(): string {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
  ];
  return candidates.find((candidate) => typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(candidate)) || "";
}

export default function GrayMatterClient() {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState("Ready.");
  const [recording, setRecording] = useState(false);
  const [working, setWorking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [capture, setCapture] = useState<CaptureResult | null>(null);
  const [brief, setBrief] = useState<BriefResult | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activePanel, setActivePanel] = useState<"capture" | "triage" | "search">("capture");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const saved = window.sessionStorage.getItem(TOKEN_KEY) || "";
    setToken(saved);
    setTokenInput(saved);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  function saveToken() {
    const cleaned = tokenInput.trim();
    if (!cleaned) {
      setStatus("Enter the Gray Matter access token.");
      return;
    }
    window.sessionStorage.setItem(TOKEN_KEY, cleaned);
    setToken(cleaned);
    setStatus("Private session unlocked in this browser tab.");
  }

  function lockSession() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setTokenInput("");
    setBrief(null);
    setSearchResults([]);
    setStatus("Session locked.");
  }

  async function transcribeAudio(blob: Blob) {
    setWorking(true);
    setStatus("Transcribing. Audio remains transient and will be discarded after this request.");
    try {
      const extension = blob.type.includes("mp4") ? "m4a" : "webm";
      const form = new FormData();
      form.append("audio", blob, `gray-matter-note.${extension}`);
      const response = await fetch("/api/voice-foundry/transcribe", {
        method: "POST",
        body: form,
      });
      const data = await response.json() as { text?: string; error?: string };
      if (!response.ok || !data.text) throw new Error(data.error || "The note could not be transcribed.");
      setTranscript((current) => current.trim() ? `${current.trim()}\n\n${data.text}` : data.text || "");
      setStatus("Transcript ready. Review it, then vault it.");
    } catch (error) {
      setStatus(errorMessage(error));
    } finally {
      setWorking(false);
    }
  }

  async function startRecording() {
    if (working || recording) return;
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setStatus("This browser does not expose microphone recording. Use the transcript box instead.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const mimeType = recordingMimeType();
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onerror = () => {
        setStatus("Recording failed. Try the text box or another browser.");
        stopRecording();
      };
      recorder.onstop = async () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        const chunks = chunksRef.current;
        chunksRef.current = [];
        const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
        if (blob.size > 0) await transcribeAudio(blob);
      };
      recorder.start(500);
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((value) => value + 1), 1000);
      setRecording(true);
      setCapture(null);
      setStatus("Recording. Stop when the thought is complete.");
    } catch (error) {
      setStatus(errorMessage(error));
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }

  function stopRecording() {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
    mediaRecorderRef.current = null;
    setRecording(false);
  }

  async function vaultTranscript() {
    const cleaned = transcript.trim();
    if (!token) {
      setStatus("Unlock the private session first.");
      return;
    }
    if (!cleaned) {
      setStatus("Record or enter a transcript first.");
      return;
    }
    setWorking(true);
    setCapture(null);
    setStatus("Writing the Gmail journal entry, Hive index, action ledger, and receipts.");
    try {
      const response = await fetch("/api/gray-matter/capture", {
        method: "POST",
        headers: apiHeaders(token),
        body: JSON.stringify({ transcript: cleaned }),
      });
      const result = await response.json() as CaptureResult;
      if (!response.ok && response.status !== 207) throw new Error(result.error || "Vault write failed.");
      setCapture(result);
      if (result.entry?.gmail_message_id) {
        setTranscript("");
        setStatus(`Vaulted as ${result.entry.id}. The audio was discarded; the transcript is now searchable.`);
      } else {
        setStatus(`Entry ${result.entry?.id || "created"} has warnings. Review the receipt below.`);
      }
    } catch (error) {
      setStatus(errorMessage(error));
    } finally {
      setWorking(false);
    }
  }

  async function loadBrief() {
    if (!token) {
      setStatus("Unlock the private session first.");
      return;
    }
    setActivePanel("triage");
    setWorking(true);
    setStatus("Loading the current action ledger.");
    try {
      const response = await fetch("/api/gray-matter/brief", { headers: apiHeaders(token) });
      const result = await response.json() as BriefResult;
      if (!response.ok) throw new Error(result.error || "Triage load failed.");
      setBrief(result);
      setStatus("Current triage loaded.");
    } catch (error) {
      setStatus(errorMessage(error));
    } finally {
      setWorking(false);
    }
  }

  async function searchJournal() {
    if (!token) {
      setStatus("Unlock the private session first.");
      return;
    }
    const query = searchQuery.trim();
    if (!query) {
      setStatus("Enter a topic or phrase to search.");
      return;
    }
    setWorking(true);
    setSearchResults([]);
    setStatus(`Searching Gray Matter for “${query}”.`);
    try {
      const response = await fetch(`/api/gray-matter/search?q=${encodeURIComponent(query)}`, {
        headers: apiHeaders(token),
      });
      const result = await response.json() as { results?: SearchResult[]; error?: string };
      if (!response.ok) throw new Error(result.error || "Search failed.");
      setSearchResults(result.results || []);
      setStatus(result.results?.length ? `Found ${result.results.length} matching entries.` : "No matching entries found.");
    } catch (error) {
      setStatus(errorMessage(error));
    } finally {
      setWorking(false);
    }
  }

  const time = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;

  return (
    <main className="gm-shell">
      <header className="gm-header">
        <div>
          <p className="gm-kicker">NULLWORKS / MASON PRIVATE</p>
          <h1>GRAY MATTER STORAGE UNIT</h1>
          <p className="gm-subtitle">Speak it once. Preserve the searchable words. Keep the source, actions, and receipts connected.</p>
        </div>
        <div className="gm-state">
          <span className={token ? "gm-dot gm-dot-live" : "gm-dot"} />
          {token ? "PRIVATE SESSION OPEN" : "LOCKED"}
        </div>
      </header>

      {!token && (
        <section className="gm-lock card">
          <p className="eyebrow">ACCESS GATE</p>
          <h2>Unlock this browser session</h2>
          <p>The token remains in session storage only and clears when the tab session ends.</p>
          <div className="gm-inline">
            <input
              type="password"
              value={tokenInput}
              onChange={(event) => setTokenInput(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter") saveToken(); }}
              placeholder="Gray Matter access token"
              autoComplete="off"
            />
            <button onClick={saveToken}>Unlock</button>
          </div>
        </section>
      )}

      <nav className="gm-tabs" aria-label="Gray Matter sections">
        <button className={activePanel === "capture" ? "active" : ""} onClick={() => setActivePanel("capture")}>Capture</button>
        <button className={activePanel === "triage" ? "active" : ""} onClick={loadBrief}>Daily triage</button>
        <button className={activePanel === "search" ? "active" : ""} onClick={() => setActivePanel("search")}>Search vault</button>
        {token && <button className="gm-lock-button" onClick={lockSession}>Lock</button>}
      </nav>

      <div className="gm-status" role="status">{working ? "● " : ""}{status}</div>

      {activePanel === "capture" && (
        <section className="gm-grid">
          <article className="card gm-recorder">
            <p className="eyebrow">QUICK VOICE MEMO</p>
            <div className={recording ? "gm-orb recording" : "gm-orb"} aria-hidden="true"><span /></div>
            <div className="gm-timer">{time}</div>
            <button
              className={recording ? "gm-primary danger" : "gm-primary"}
              onClick={recording ? stopRecording : startRecording}
              disabled={working}
            >
              {recording ? "Stop and transcribe" : "Start voice memo"}
            </button>
            <p className="gm-boundary"><strong>No audio vault.</strong> The temporary recording is sent for transcription, then dropped from this page. Gray Matter preserves the transcript, not the sound file.</p>
          </article>

          <article className="card gm-transcript">
            <div className="gm-card-heading">
              <div>
                <p className="eyebrow">HUMAN SOURCE</p>
                <h2>Review the transcript</h2>
              </div>
              <span>{transcript.length.toLocaleString()} chars</span>
            </div>
            <textarea
              value={transcript}
              onChange={(event) => setTranscript(event.target.value)}
              placeholder="Record a thought, dictate directly into your phone keyboard, or type a note here…"
              rows={14}
            />
            <div className="gm-actions">
              <button className="gm-secondary" onClick={() => setTranscript("")} disabled={!transcript || working}>Clear</button>
              <button className="gm-primary" onClick={vaultTranscript} disabled={!token || !transcript.trim() || working}>Vault transcript</button>
            </div>
          </article>

          {capture && (
            <article className="card gm-receipt">
              <p className="eyebrow">WRITE RECEIPT</p>
              <h2>{capture.entry?.id || "Capture result"}</h2>
              <p>{capture.entry?.title}</p>
              <div className="gm-chips">
                <span>{capture.entry?.category}</span>
                <span>{capture.entry?.urgency}</span>
                <span>{capture.entry?.gmail_message_id ? "GMAIL ARCHIVED" : "GMAIL WARNING"}</span>
              </div>
              <h3>Extracted actions</h3>
              {capture.actions?.length
                ? <ul>{capture.actions.map((action) => <li key={action.id}><strong>{action.priority}</strong> — {action.text}</li>)}</ul>
                : <p>No explicit actions were extracted.</p>}
              {!!capture.warnings?.length && <pre>{capture.warnings.join("\n")}</pre>}
            </article>
          )}
        </section>
      )}

      {activePanel === "triage" && (
        <section className="gm-grid gm-triage">
          <article className="card gm-wide">
            <div className="gm-card-heading">
              <div>
                <p className="eyebrow">CURRENT STATE</p>
                <h2>Daily triage</h2>
              </div>
              <button className="gm-secondary" onClick={loadBrief} disabled={!token || working}>Refresh</button>
            </div>
            <p className="gm-readback">{brief?.spoken || "Open the private session and load the current triage."}</p>
          </article>
          <article className="card">
            <p className="eyebrow">ADDED TODAY</p>
            <h2>{brief?.todayEntries?.length || 0}</h2>
            {brief?.todayEntries?.map((entry) => <div className="gm-list-item" key={entry.id}><strong>{entry.urgency} — {entry.title}</strong><span>{entry.summary}</span></div>)}
          </article>
          <article className="card">
            <p className="eyebrow">OPEN ACTIONS</p>
            <h2>{brief?.openActions?.length || 0}</h2>
            {brief?.openActions?.map((action) => <div className="gm-list-item" key={action.id}><strong>{action.priority} — {action.text}</strong><span>{[action.project, action.due_text].filter(Boolean).join(" / ") || action.id}</span></div>)}
          </article>
          <article className="card gm-wide">
            <p className="eyebrow">SPILLOVER</p>
            <h2>{brief?.spillover?.length || 0} carried forward</h2>
            {brief?.spillover?.map((action) => <div className="gm-list-item" key={action.id}><strong>{action.priority} — {action.text}</strong><span>{action.id}</span></div>)}
          </article>
        </section>
      )}

      {activePanel === "search" && (
        <section className="gm-search-layout">
          <article className="card">
            <p className="eyebrow">GMAIL FULL-TEXT INDEX</p>
            <h2>Search your own thoughts</h2>
            <div className="gm-inline">
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => { if (event.key === "Enter") searchJournal(); }}
                placeholder="emotional telemetry, Ira Wolfe, mister system…"
              />
              <button onClick={searchJournal} disabled={!token || working}>Search</button>
            </div>
          </article>
          <div className="gm-results">
            {searchResults.map((result) => (
              <article className="card" key={result.id}>
                <p className="eyebrow">{result.date || "GRAY MATTER ENTRY"}</p>
                <h3>{result.subject}</h3>
                <p>{result.snippet || result.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <footer className="gm-footer">
        <span>Gmail = searchable human archive</span>
        <span>Hive = structured ledger and receipts</span>
        <span>NEURAXIS = voice edge</span>
        <span>Mason decides</span>
      </footer>
    </main>
  );
}
