"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

import styles from "./voice-portal.module.css";

type SessionRole = "admin" | "guest";
type PortalState = "checking" | "locked" | "ready" | "connecting" | "active" | "ended" | "error";

type Meter = {
  currency: "USD";
  hard_limit_seconds: number;
  warning_seconds: number[];
  rates_per_minute: {
    transport: number;
    speech: number | null;
    model: number | null;
    storage: number | null;
  };
  estimate_boundary: string;
};

type CallLike = {
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  disconnect: () => void;
  mute: (muted: boolean) => void;
};

type DeviceLike = {
  connect: (options?: { params?: Record<string, string> }) => Promise<CallLike>;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  destroy: () => void;
};

type DeviceConstructor = new (token: string, options?: Record<string, unknown>) => DeviceLike;

declare global {
  interface Window {
    Twilio?: { Device?: DeviceConstructor };
  }
}

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function money(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 3 }).format(value);
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

function loadTwilioSdk(): Promise<void> {
  if (window.Twilio?.Device) return Promise.resolve();
  const existing = document.getElementById("nullworks-twilio-voice-sdk") as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Voice SDK failed to load.")), { once: true });
    });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = "nullworks-twilio-voice-sdk";
    script.src = "/api/neuraxis/voice-web/sdk";
    script.async = true;
    script.onload = () => window.Twilio?.Device ? resolve() : reject(new Error("Voice SDK loaded without a Device constructor."));
    script.onerror = () => reject(new Error("Voice SDK failed to load."));
    document.head.appendChild(script);
  });
}

export default function VoicePortal() {
  const [state, setState] = useState<PortalState>("checking");
  const [role, setRole] = useState<SessionRole | null>(null);
  const [passcode, setPasscode] = useState("");
  const [status, setStatus] = useState("Checking secure workroom access…");
  const [elapsed, setElapsed] = useState(0);
  const [meter, setMeter] = useState<Meter | null>(null);
  const [muted, setMuted] = useState(false);
  const [inviteUrl, setInviteUrl] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedback, setFeedback] = useState({
    understood: true,
    valuable: true,
    return_intent: true,
    human_correction_required: false,
    follow_up: "",
  });

  const deviceRef = useRef<DeviceLike | null>(null);
  const callRef = useRef<CallLike | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const warningRef = useRef(new Set<number>());

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const endLocalCall = useCallback((message: string) => {
    stopTimer();
    callRef.current = null;
    startedAtRef.current = null;
    setMuted(false);
    setState("ended");
    setStatus(message);
    setShowFeedback(true);
  }, [stopTimer]);

  const knownRate = useMemo(() => {
    if (!meter) return 0;
    return Object.values(meter.rates_per_minute).reduce<number>((sum, value) => sum + (typeof value === "number" ? value : 0), 0);
  }, [meter]);
  const estimatedCost = (elapsed / 60) * knownRate;
  const hasUnconfiguredRates = Boolean(meter && Object.values(meter.rates_per_minute).some((value) => value == null));

  const startTimer = useCallback((activeMeter: Meter) => {
    stopTimer();
    startedAtRef.current = Date.now();
    warningRef.current.clear();
    setElapsed(0);
    timerRef.current = setInterval(() => {
      const started = startedAtRef.current;
      if (!started) return;
      const seconds = Math.floor((Date.now() - started) / 1000);
      setElapsed(seconds);
      for (const warning of activeMeter.warning_seconds) {
        if (seconds >= warning && !warningRef.current.has(warning)) {
          warningRef.current.add(warning);
          const remaining = Math.max(0, activeMeter.hard_limit_seconds - warning);
          setStatus(`Cost-control warning: ${Math.ceil(remaining / 60)} minute${remaining === 60 ? "" : "s"} remain.`);
        }
      }
      if (seconds >= activeMeter.hard_limit_seconds) {
        callRef.current?.disconnect();
        endLocalCall("The 20-minute cost-control ceiling ended this session. Start a new authorized session to continue.");
      }
    }, 1000);
  }, [endLocalCall, stopTimer]);

  const checkSession = useCallback(async () => {
    try {
      const session = await jsonFetch<{ ok: boolean; role: SessionRole }>("/api/neuraxis/voice-web/session");
      setRole(session.role);
      setState("ready");
      setStatus("Secure workroom unlocked. Microphone access begins only when you press Enter Voice Workroom.");
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
          setStatus("Invitation accepted. This grants conversation access only; Mason remains final Human Authority.");
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
      callRef.current?.disconnect();
      deviceRef.current?.destroy();
    };
  }, [checkSession, stopTimer]);

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
      setStatus("Secure workroom unlocked.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Access denied.");
    }
  }

  async function enterWorkroom() {
    setState("connecting");
    setStatus("Provisioning encrypted browser voice access…");
    setShowFeedback(false);
    setFeedbackSent(false);
    try {
      const access = await jsonFetch<{ token: string; meter: Meter }>("/api/neuraxis/voice-web/token", {
        method: "POST",
        body: "{}",
      });
      setMeter(access.meter);
      await loadTwilioSdk();
      const Device = window.Twilio?.Device;
      if (!Device) throw new Error("Browser voice device unavailable.");
      deviceRef.current?.destroy();
      const device = new Device(access.token, {
        logLevel: 1,
        closeProtection: true,
      });
      deviceRef.current = device;
      device.on("error", (value) => {
        console.error("Browser voice device error", value);
        setState("error");
        setStatus("The browser voice device reported an error. The phone number remains available as a fallback.");
      });
      const call = await device.connect({ params: { workroom: "pressure", transport: "browser_webrtc" } });
      callRef.current = call;
      call.on("accept", () => {
        setState("active");
        setStatus("Pressure Cooker online. Speak naturally and interrupt with questions.");
        startTimer(access.meter);
      });
      call.on("disconnect", () => endLocalCall("Voice session ended. No international telephone leg was used."));
      call.on("cancel", () => endLocalCall("Voice session canceled."));
      call.on("reject", () => endLocalCall("Voice session was rejected by the transport service."));
      call.on("error", (value) => {
        console.error("Browser voice call error", value);
        endLocalCall("The browser voice session encountered an error. The existing phone route remains available as a fallback.");
      });
      setStatus("Connecting microphone and governed workroom…");
    } catch (error) {
      setState("error");
      setStatus(error instanceof Error ? error.message : "Browser voice connection failed.");
    }
  }

  function hangUp() {
    callRef.current?.disconnect();
    endLocalCall("Voice session ended by the participant.");
  }

  function toggleMute() {
    const next = !muted;
    callRef.current?.mute(next);
    setMuted(next);
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
    callRef.current?.disconnect();
    deviceRef.current?.destroy();
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

  const canCall = state === "ready" || state === "ended" || state === "error";
  const active = state === "active" || state === "connecting";

  return (
    <main className={styles.shell}>
      <div className={styles.grid} aria-hidden="true" />
      <section className={styles.panel}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>NULLWORKS · CONVERSATIONAL EVIDENCE TRANSLATION</p>
            <h1>Pressure Cooker Voice Workroom</h1>
            <p className={styles.lede}>Secure browser-to-browser voice over the internet. The existing Twilio number remains a fallback, not the primary international entrance.</p>
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
              <button type="submit" disabled={passcode.length !== 4}>Unlock</button>
            </div>
          </form>
        )}

        {state !== "locked" && state !== "checking" && (
          <section className={styles.console}>
            <div className={styles.metrics}>
              <div><span>Transport</span><strong>Browser WebRTC</strong></div>
              <div><span>International PSTN</span><strong>None</strong></div>
              <div><span>Session</span><strong>{formatClock(elapsed)} / 20:00</strong></div>
              <div><span>Known cost estimate</span><strong>{money(estimatedCost)}{hasUnconfiguredRates ? "+" : ""}</strong></div>
            </div>

            <div className={styles.controls}>
              <button className={styles.primary} onClick={enterWorkroom} disabled={!canCall}>Enter Voice Workroom</button>
              <button onClick={toggleMute} disabled={state !== "active"}>{muted ? "Unmute" : "Mute"}</button>
              <button onClick={hangUp} disabled={!active}>End Session</button>
            </div>

            {role === "admin" && (
              <div className={styles.inviteBox}>
                <button onClick={createInvite}>Create 24-hour guest link</button>
                {inviteUrl && <input readOnly value={inviteUrl} onFocus={(event) => event.currentTarget.select()} aria-label="Guest invitation URL" />}
              </div>
            )}

            <p className={styles.small}>The visible meter uses configured rates. Final Twilio and model usage records remain authoritative. The server and browser both enforce the 20-minute ceiling.</p>
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
