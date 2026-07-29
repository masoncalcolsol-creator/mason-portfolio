"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./weenis-integrated.module.css";

type ModeId =
  | "BARE_WEENIS"
  | "HALO_WEENIS"
  | "REMOTE_WEENIS"
  | "FOREMAN_WEENIS"
  | "GRAY_WEENIS"
  | "COMMAND_WEENIS";

type Severity = "GREEN" | "YELLOW" | "RED";

type ReceiptKind =
  | "CHECK_IN"
  | "CHECK_OUT"
  | "OBSERVATION"
  | "SOURCE_FRAME"
  | "MODE_CHANGE"
  | "VOICE_COMMAND"
  | "SYSTEM"
  | "ESCALATION";

type ReceiptEvent = {
  id: string;
  kind: ReceiptKind;
  timestamp: string;
  mode: ModeId;
  severity: Severity;
  summary: string;
  details?: Record<string, string | number | boolean | null>;
};

type SessionState = {
  active: boolean;
  id: string;
  startedAt: string | null;
  task: string;
};

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type WakeLockSentinelLike = {
  release: () => Promise<void>;
  addEventListener: (type: "release", listener: () => void) => void;
};

const MODES: Array<{ id: ModeId; short: string }> = [
  { id: "BARE_WEENIS", short: "BARE" },
  { id: "HALO_WEENIS", short: "HALO" },
  { id: "REMOTE_WEENIS", short: "REMOTE" },
  { id: "FOREMAN_WEENIS", short: "FOREMAN" },
  { id: "GRAY_WEENIS", short: "GRAY" },
  { id: "COMMAND_WEENIS", short: "COMMAND" },
];

const STORAGE_KEY = "nullworks.weenis.v0.1.receipts";
const SESSION_KEY = "nullworks.weenis.v0.1.session";
const MODE_KEY = "nullworks.weenis.v0.1.mode";

function nowIso() {
  return new Date().toISOString();
}

function makeId(prefix: string) {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${random}`;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}

function remoteSeverity(value: unknown): Severity {
  return value === "RED" || value === "YELLOW" || value === "GREEN" ? value : "GREEN";
}

function remoteSummary(type: string, event: Record<string, unknown>) {
  const zoom = typeof event.zoom === "number" ? ` ${event.zoom.toFixed(1)}×` : "";
  switch (type) {
    case "SESSION_STARTED":
      return "Integrated Remote Eye viewfinder started.";
    case "SOURCE_SELECTED":
      return `Remote Eye source selected: ${String(event.source ?? "unknown source")}.`;
    case "EVIDENCE_PAIR_EXPORTED":
      return "Remote Eye source and annotated evidence pair exported.";
    case "VIEW_ZOOM_CHANGED":
      return `Remote Eye visual zoom changed to${zoom}.`;
    case "GRID_TOGGLED":
      return `Inspection grid ${event.enabled ? "enabled" : "disabled"}.`;
    case "RETICLE_CHANGED":
      return `Inspection reticle changed to ${String(event.style ?? "new pattern")}.`;
    case "RETICLE_COLOR_CHANGED":
      return "Inspection reticle color changed.";
    case "VIEWPORT_MODE_TOGGLED":
      return `Remote Eye fullscreen ${event.fullscreen ? "entered" : "released"}.`;
    case "VOICE_COMMAND":
      return `Remote Eye voice command: ${String(event.transcript ?? "captured")}.`;
    case "FINDING_LOGGED":
      return `Remote Eye finding: ${String(event.observation ?? "finding logged")}.`;
    default:
      return `Remote Eye event: ${type.replaceAll("_", " ")}.`;
  }
}

export default function WeenisIntegrated() {
  const [mounted, setMounted] = useState(false);
  const [online, setOnline] = useState(true);
  const [mode, setMode] = useState<ModeId>("REMOTE_WEENIS");
  const [priorConnectedMode, setPriorConnectedMode] = useState<ModeId>("REMOTE_WEENIS");
  const [events, setEvents] = useState<ReceiptEvent[]>([]);
  const [session, setSession] = useState<SessionState>({
    active: false,
    id: "",
    startedAt: null,
    task: "Field inspection / operator pressure test",
  });
  const [observation, setObservation] = useState("");
  const [severity, setSeverity] = useState<Severity>("GREEN");
  const [viewerReady, setViewerReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [notice, setNotice] = useState("Loading integrated Remote Eye viewfinder…");
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);

  const modeRef = useRef<ModeId>(mode);
  const priorModeRef = useRef<ModeId>(priorConnectedMode);
  const wakeLockRef = useRef<WakeLockSentinelLike | null>(null);

  useEffect(() => {
    modeRef.current = mode;
    if (mounted) window.localStorage.setItem(MODE_KEY, mode);
  }, [mode, mounted]);

  useEffect(() => {
    priorModeRef.current = priorConnectedMode;
  }, [priorConnectedMode]);

  const appendEvent = useCallback(
    (
      kind: ReceiptKind,
      summary: string,
      eventSeverity: Severity = "GREEN",
      details?: ReceiptEvent["details"],
      forcedMode?: ModeId,
    ) => {
      const entry: ReceiptEvent = {
        id: makeId("NW-WEENIS"),
        kind,
        timestamp: nowIso(),
        mode: forcedMode ?? modeRef.current,
        severity: eventSeverity,
        summary,
        details,
      };
      setEvents((current) => [entry, ...current]);
      return entry;
    },
    [],
  );

  useEffect(() => {
    setMounted(true);
    setOnline(navigator.onLine);

    const savedEvents = window.localStorage.getItem(STORAGE_KEY);
    if (savedEvents) {
      try {
        const parsed = JSON.parse(savedEvents) as ReceiptEvent[];
        if (Array.isArray(parsed)) setEvents(parsed);
      } catch {
        setNotice("Existing local receipt queue could not be read; a clean queue was opened.");
      }
    }

    const savedSession = window.localStorage.getItem(SESSION_KEY);
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession) as {
          active?: boolean;
          id?: string;
          startedAt?: string | null;
          task?: string;
        };
        setSession({
          active: Boolean(parsed.active),
          id: parsed.id ?? "",
          startedAt: parsed.startedAt ?? null,
          task: parsed.task || "Field inspection / operator pressure test",
        });
      } catch {
        window.localStorage.removeItem(SESSION_KEY);
      }
    }

    const savedMode = window.localStorage.getItem(MODE_KEY) as ModeId | null;
    if (savedMode && MODES.some((candidate) => candidate.id === savedMode)) {
      const restored = navigator.onLine ? savedMode : "GRAY_WEENIS";
      setMode(restored);
      if (savedMode !== "GRAY_WEENIS") setPriorConnectedMode(savedMode);
    } else if (!navigator.onLine) {
      setMode("GRAY_WEENIS");
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/weenis-sw.js").catch(() => undefined);
    }

    const handleInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handleInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleInstall);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events, mounted]);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        active: session.active,
        id: session.id,
        startedAt: session.startedAt,
        task: session.task,
      }),
    );
  }, [session, mounted]);

  useEffect(() => {
    const goOffline = () => {
      const activeMode = modeRef.current;
      if (activeMode !== "GRAY_WEENIS") setPriorConnectedMode(activeMode);
      setOnline(false);
      setMode("GRAY_WEENIS");
      appendEvent(
        "SYSTEM",
        "Connectivity lost. GRAY WEENIS entered; local continuity remains active.",
        "YELLOW",
        { hive_sync_claimed: false },
        "GRAY_WEENIS",
      );
      setNotice("GRAY WEENIS ACTIVE — the cached view and local receipt queue remain available.");
    };

    const goOnline = () => {
      const restored = priorModeRef.current === "GRAY_WEENIS" ? "REMOTE_WEENIS" : priorModeRef.current;
      setOnline(true);
      setMode(restored);
      appendEvent(
        "SYSTEM",
        "Connectivity restored. Local receipts preserved; durable Hive sync is not claimed.",
        "GREEN",
        { hive_sync_claimed: false, restored_mode: restored },
        restored,
      );
      setNotice("Network restored. Remote Eye and local receipt continuity remain active.");
    };

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, [appendEvent]);

  useEffect(() => {
    const onMessage = (message: MessageEvent) => {
      if (message.origin !== window.location.origin) return;
      const data = message.data as {
        type?: string;
        event?: Record<string, unknown>;
        sessionId?: string;
        source?: unknown;
      };

      if (data.type === "NW_REMOTE_EYE_READY") {
        setViewerReady(true);
        if (modeRef.current !== "GRAY_WEENIS") {
          setMode("REMOTE_WEENIS");
          setPriorConnectedMode("REMOTE_WEENIS");
        }
        setNotice("REMOTE WEENIS VIEWFINDER READY — rear camera, grid, reticles, color, zoom, and fullscreen armed.");
        return;
      }

      if (data.type !== "NW_REMOTE_EYE_EVENT" || !data.event) return;
      const remoteEvent = data.event;
      const remoteType = String(remoteEvent.type ?? "REMOTE_EVENT");
      const eventSeverity = remoteSeverity(remoteEvent.state);
      const kind: ReceiptKind =
        remoteType === "EVIDENCE_PAIR_EXPORTED"
          ? "SOURCE_FRAME"
          : remoteType === "FINDING_LOGGED"
            ? "OBSERVATION"
            : remoteType === "VOICE_COMMAND"
              ? "VOICE_COMMAND"
              : "SYSTEM";

      appendEvent(
        kind,
        remoteSummary(remoteType, remoteEvent),
        eventSeverity,
        {
          remote_event_type: remoteType,
          remote_session_id: data.sessionId ?? null,
          remote_source: data.source ? JSON.stringify(data.source) : null,
          remote_payload: JSON.stringify(remoteEvent),
          durable_hive_sync: false,
        },
        modeRef.current === "GRAY_WEENIS" ? "GRAY_WEENIS" : "REMOTE_WEENIS",
      );
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [appendEvent]);

  useEffect(() => {
    return () => {
      void wakeLockRef.current?.release();
    };
  }, []);

  const yellowCount = useMemo(() => events.filter((event) => event.severity === "YELLOW").length, [events]);
  const redCount = useMemo(() => events.filter((event) => event.severity === "RED").length, [events]);

  const chooseMode = (nextMode: ModeId) => {
    if (nextMode !== "GRAY_WEENIS") setPriorConnectedMode(nextMode);
    setMode(nextMode);
    appendEvent("MODE_CHANGE", `${nextMode.replaceAll("_", " ")} selected.`, "GREEN", {
      source: "integrated mode rail",
    }, nextMode);
    setNotice(`${nextMode.replaceAll("_", " ")} active.`);
  };

  const checkIn = () => {
    if (session.active) {
      setNotice("A WEENIS session is already active.");
      return;
    }
    const id = makeId("NW-WEENIS-SESSION");
    const startedAt = nowIso();
    setSession((current) => ({ ...current, active: true, id, startedAt }));
    appendEvent("CHECK_IN", `Operator checked in: ${session.task}`, "GREEN", {
      session_id: id,
      human_authority: "Mason Perry",
      network_available: navigator.onLine,
      hive_sync_claimed: false,
    });
    setNotice("CHECK-IN RECEIPT CREATED — Remote Eye events will join this local WEENIS queue.");
  };

  const checkOut = () => {
    if (!session.active) {
      setNotice("No active WEENIS session to check out.");
      return;
    }
    appendEvent("CHECK_OUT", `Operator checked out: ${session.task}`, severity, {
      session_id: session.id,
      started_at: session.startedAt,
      local_event_count: events.length,
      durable_hive_sync: false,
    });
    setSession((current) => ({ ...current, active: false }));
    setNotice("CHECKOUT RECEIPT CREATED — export the combined packet for durable ingestion.");
  };

  const preserveObservation = () => {
    const clean = observation.trim();
    if (!clean) {
      setNotice("Enter a human observation before preserving it.");
      return;
    }
    appendEvent("OBSERVATION", clean, severity, {
      evidence_class: "HUMAN_OBSERVATION",
      session_id: session.id || null,
      source_frame_attached: false,
    });
    setObservation("");
    setNotice(`${severity} human observation preserved locally.`);
  };

  const exportReceipt = () => {
    const packet = {
      schema: "NW-WEENIS-RECEIPT-PACKET-V0.2",
      generated_at: nowIso(),
      human_authority: "Mason Perry",
      application: "Wearable Elite Empowering NULLWORKS Information System",
      viewfinder: "REMOTE_EYE_V3.2.1_INTEGRATED",
      client_state: {
        mode,
        network_available: online,
        remote_eye_ready: viewerReady,
        local_event_count: events.length,
        durable_hive_sync_claimed: false,
        storage_class: "BROWSER_LOCALSTORAGE_PLUS_EXPORTED_JSON",
      },
      session: {
        active: session.active,
        session_id: session.id || null,
        started_at: session.startedAt,
        task: session.task,
      },
      truth_boundary: [
        "This packet was produced locally in the WEENIS browser client.",
        "Remote Eye source and annotated images download as separate evidence files.",
        "Visual zoom does not create verified dimensions.",
        "Network availability is not proof of Hive synchronization.",
        "Human authority remains final.",
      ],
      events: [...events].reverse(),
    };
    const stamp = nowIso().replaceAll(":", "-");
    downloadBlob(new Blob([JSON.stringify(packet, null, 2)], { type: "application/json" }), `NW-WEENIS-V0.2-receipt-${stamp}.json`);
    setNotice("Combined WEENIS + Remote Eye JSON receipt downloaded.");
  };

  const clearQueue = () => {
    if (!window.confirm("Clear the local WEENIS receipt queue? Export first if it must be preserved.")) return;
    setEvents([]);
    window.localStorage.removeItem(STORAGE_KEY);
    setNotice("Local WEENIS queue cleared by Human Authority.");
  };

  const toggleWakeLock = async () => {
    if (wakeLockActive) {
      await wakeLockRef.current?.release();
      wakeLockRef.current = null;
      setWakeLockActive(false);
      setNotice("Screen wake lock released.");
      return;
    }
    const wakeLockApi = (navigator as Navigator & {
      wakeLock?: { request: (type: "screen") => Promise<WakeLockSentinelLike> };
    }).wakeLock;
    if (!wakeLockApi) {
      setNotice("Wake lock is unavailable in this browser.");
      return;
    }
    try {
      const lock = await wakeLockApi.request("screen");
      lock.addEventListener("release", () => setWakeLockActive(false));
      wakeLockRef.current = lock;
      setWakeLockActive(true);
      setNotice("Screen wake lock active for field inspection.");
    } catch {
      setNotice("Wake lock request was denied or interrupted.");
    }
  };

  const installApp = async () => {
    if (!installPrompt) {
      setNotice("Use the browser menu and choose Add to Home screen.");
      return;
    }
    await installPrompt.prompt();
    const result = await installPrompt.userChoice;
    setNotice(result.outcome === "accepted" ? "WEENIS installation accepted." : "WEENIS installation dismissed.");
    setInstallPrompt(null);
  };

  if (!mounted) {
    return <main className={styles.page}><div className={styles.shell}>BOOTING WEENIS V0.2…</div></main>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a className={styles.brand} href="/">
            <span className={styles.brandMark}>W</span>
            <span>
              <strong>WEENIS V0.2</strong>
              <small>REMOTE EYE VIEWFINDER TRANSPLANT · HUMAN AUTHORITY FINAL</small>
            </span>
          </a>
          <div className={styles.statusRail}>
            <span className={online ? styles.good : styles.gray}>{online ? "NETWORK" : "GRAY"}</span>
            <span className={viewerReady ? styles.good : styles.warn}>{viewerReady ? "EYE READY" : "EYE BOOT"}</span>
            <span className={session.active ? styles.good : styles.idle}>{session.active ? "SESSION LIVE" : "SESSION IDLE"}</span>
            <span className={styles.idle}>{events.length} LOCAL</span>
          </div>
        </header>

        {!online && (
          <section className={styles.grayBanner}>
            <strong>GRAY WEENIS ACTIVE</strong>
            <span>Local continuity remains active. Network restoration will not be misrepresented as durable Hive synchronization.</span>
          </section>
        )}

        <section className={styles.viewerSection}>
          <div className={styles.viewerTopline}>
            <strong>REMOTE WEENIS // LIVE INSPECTION OPTIC</strong>
            <span>REAR CAMERA · GRID · 12 RETICLES · COLOR SCREW · PINCH ZOOM · DOUBLE-TAP FULLSCREEN</span>
          </div>
          <iframe
            className={styles.viewerFrame}
            src="/remote-eye-v3/index.html?embed=weenis&v=3.2.1"
            title="Integrated NULLWORKS Remote Eye viewfinder"
            allow="camera; microphone; fullscreen; clipboard-write"
            allowFullScreen
          />
        </section>

        <section className={styles.notice} aria-live="polite">
          <span className={styles.noticeDot} />
          {notice}
        </section>

        <section className={styles.modeRail} aria-label="WEENIS operating modes">
          {MODES.map((candidate) => (
            <button
              type="button"
              key={candidate.id}
              className={candidate.id === mode ? styles.modeActive : styles.modeButton}
              onClick={() => chooseMode(candidate.id)}
            >
              {candidate.short}
            </button>
          ))}
        </section>

        <section className={styles.drawer}>
          <button type="button" className={styles.drawerHeader} onClick={() => setDrawerOpen((current) => !current)}>
            <strong>WEENIS RECEIPTS + OPERATOR CONTROLS</strong>
            <span>{drawerOpen ? "COLLAPSE ▲" : `OPEN ▼ · ${events.length} EVENTS`}</span>
          </button>

          {drawerOpen && (
            <div className={styles.drawerBody}>
              <article className={styles.panel}>
                <div className={styles.panelTitle}>
                  <h2>Operator session</h2>
                  <strong>{session.active ? "LIVE" : "IDLE"}</strong>
                </div>
                <label className={styles.label} htmlFor="weenis-v2-task">CURRENT TASK</label>
                <input
                  id="weenis-v2-task"
                  className={styles.input}
                  value={session.task}
                  onChange={(event) => setSession((current) => ({ ...current, task: event.target.value }))}
                />
                <div className={styles.meta}>
                  <span>SESSION</span><code>{session.id || "NOT CHECKED IN"}</code>
                  <span>STARTED</span><code>{session.startedAt ? new Date(session.startedAt).toLocaleString() : "—"}</code>
                  <span>MODE</span><code>{mode.replaceAll("_", " ")}</code>
                </div>
                <div className={styles.actionRow}>
                  <button type="button" className={styles.primary} onClick={checkIn} disabled={session.active}>CHECK IN</button>
                  <button type="button" className={styles.button} onClick={checkOut} disabled={!session.active}>CHECK OUT</button>
                  <button type="button" className={styles.button} onClick={toggleWakeLock}>{wakeLockActive ? "RELEASE WAKE" : "WAKE LOCK"}</button>
                  <button type="button" className={styles.button} onClick={installApp}>{installPrompt ? "INSTALL APP" : "ADD TO HOME"}</button>
                </div>

                <label className={styles.label} htmlFor="weenis-v2-observation" style={{ marginTop: 14 }}>HUMAN OBSERVATION</label>
                <textarea
                  id="weenis-v2-observation"
                  className={styles.textarea}
                  value={observation}
                  onChange={(event) => setObservation(event.target.value)}
                  placeholder="Describe the physical truth. Separate observations, assumptions, estimates, and machine suggestions."
                />
                <div className={styles.severityRow}>
                  {(["GREEN", "YELLOW", "RED"] as Severity[]).map((level) => (
                    <button
                      type="button"
                      key={level}
                      data-level={level}
                      className={severity === level ? styles.severityActive : styles.severityButton}
                      onClick={() => setSeverity(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <button type="button" className={styles.primary} onClick={preserveObservation}>PRESERVE OBSERVATION</button>
                <p className={styles.truthNote}>Remote Eye downloads original and annotated evidence files separately. The parent WEENIS queue records the export event and operator receipts.</p>
              </article>

              <article className={styles.panel}>
                <div className={styles.panelTitle}>
                  <h2>Combined local receipt queue</h2>
                  <strong>{events.length} EVENTS · {yellowCount}Y · {redCount}R</strong>
                </div>
                <div className={styles.receiptActions}>
                  <button type="button" className={styles.primary} onClick={exportReceipt}>EXPORT V0.2 JSON</button>
                  <button type="button" className={styles.button} onClick={() => setDrawerOpen(false)}>CLOSE DRAWER</button>
                  <button type="button" className={styles.danger} onClick={clearQueue}>CLEAR LOCAL</button>
                </div>
                <div className={styles.timeline}>
                  {events.length === 0 ? (
                    <div className={styles.empty}>No local receipts yet. Check in or operate the integrated Remote Eye.</div>
                  ) : (
                    events.slice(0, 60).map((event) => (
                      <article className={styles.event} key={event.id}>
                        <span className={styles.eventDot} data-level={event.severity} />
                        <div>
                          <div className={styles.eventTop}>
                            <strong>{event.kind.replaceAll("_", " ")}</strong>
                            <span>{new Date(event.timestamp).toLocaleString()}</span>
                          </div>
                          <p>{event.summary}</p>
                          <small>{event.mode.replaceAll("_", " ")} · {event.id}</small>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </article>
            </div>
          )}
        </section>

        <footer className={styles.footer}>
          <strong>TRUTH BOUNDARY:</strong> zoom and reticles are inspection aids, not verified measurement. LocalStorage is continuity, not organizational memory. No receipt, no sync. Human authority remains final.
        </footer>
      </div>
    </main>
  );
}
