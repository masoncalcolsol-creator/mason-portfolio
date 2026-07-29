"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./weenis.module.css";

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

type ModeDefinition = {
  id: ModeId;
  label: string;
  short: string;
  description: string;
};

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type SpeechResultListLike = {
  length: number;
  [index: number]: {
    [index: number]: {
      transcript: string;
      confidence: number;
    };
  };
};

type SpeechRecognitionEventLike = Event & {
  results: SpeechResultListLike;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type WakeLockSentinelLike = {
  release: () => Promise<void>;
  addEventListener: (type: "release", listener: () => void) => void;
};

const MODES: ModeDefinition[] = [
  {
    id: "BARE_WEENIS",
    label: "Bare WEENIS",
    short: "BARE",
    description: "Phone, audio, microphone, and physical controls. No glasses required.",
  },
  {
    id: "HALO_WEENIS",
    label: "Halo WEENIS",
    short: "HALO",
    description: "Task-relevant visual overlays through Halo/Penumbra.",
  },
  {
    id: "REMOTE_WEENIS",
    label: "Remote WEENIS",
    short: "REMOTE",
    description: "External sensory organs such as Remote Eye, thermal, ranging, or inspection cameras.",
  },
  {
    id: "FOREMAN_WEENIS",
    label: "Foreman WEENIS",
    short: "FOREMAN",
    description: "Assignments, evidence completeness, handoffs, exceptions, and worker coordination.",
  },
  {
    id: "GRAY_WEENIS",
    label: "Gray WEENIS",
    short: "GRAY",
    description: "Honest degraded operation. Local continuity remains active; Hive sync is not claimed.",
  },
  {
    id: "COMMAND_WEENIS",
    label: "Command WEENIS",
    short: "COMMAND",
    description: "Final-authority view for approvals, workrooms, escalations, and stop-the-line decisions.",
  },
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
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

export default function WeenisConsole() {
  const [mode, setMode] = useState<ModeId>("BARE_WEENIS");
  const [priorConnectedMode, setPriorConnectedMode] = useState<ModeId>("BARE_WEENIS");
  const [online, setOnline] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [sessionStartedAt, setSessionStartedAt] = useState<string | null>(null);
  const [task, setTask] = useState("Field inspection / operator pressure test");
  const [observation, setObservation] = useState("");
  const [severity, setSeverity] = useState<Severity>("GREEN");
  const [events, setEvents] = useState<ReceiptEvent[]>([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [listening, setListening] = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [notice, setNotice] = useState("Local operator console ready.");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const wakeLockRef = useRef<WakeLockSentinelLike | null>(null);
  const modeRef = useRef<ModeId>(mode);
  const priorModeRef = useRef<ModeId>(priorConnectedMode);

  useEffect(() => {
    modeRef.current = mode;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(MODE_KEY, mode);
    }
  }, [mode]);

  useEffect(() => {
    priorModeRef.current = priorConnectedMode;
  }, [priorConnectedMode]);

  const appendEvent = useCallback(
    (
      kind: ReceiptKind,
      summary: string,
      eventSeverity: Severity = severity,
      details?: ReceiptEvent["details"],
    ) => {
      const entry: ReceiptEvent = {
        id: makeId("NW-WEENIS"),
        kind,
        timestamp: nowIso(),
        mode: modeRef.current,
        severity: eventSeverity,
        summary,
        details,
      };
      setEvents((current) => [entry, ...current]);
      return entry;
    },
    [severity],
  );

  useEffect(() => {
    setMounted(true);
    setOnline(navigator.onLine);

    const savedMode = window.localStorage.getItem(MODE_KEY) as ModeId | null;
    if (savedMode && MODES.some((candidate) => candidate.id === savedMode)) {
      setMode(navigator.onLine ? savedMode : "GRAY_WEENIS");
      if (savedMode !== "GRAY_WEENIS") setPriorConnectedMode(savedMode);
    } else if (!navigator.onLine) {
      setMode("GRAY_WEENIS");
    }

    const savedEvents = window.localStorage.getItem(STORAGE_KEY);
    if (savedEvents) {
      try {
        const parsed = JSON.parse(savedEvents) as ReceiptEvent[];
        if (Array.isArray(parsed)) setEvents(parsed);
      } catch {
        setNotice("Local receipt cache was unreadable; a clean queue has been opened.");
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
        setSessionActive(Boolean(parsed.active));
        setSessionId(parsed.id ?? "");
        setSessionStartedAt(parsed.startedAt ?? null);
        if (parsed.task) setTask(parsed.task);
      } catch {
        window.localStorage.removeItem(SESSION_KEY);
      }
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/weenis-sw.js")
        .then(() => setNotice("WEENIS service worker armed for degraded recovery."))
        .catch(() => setNotice("Service worker unavailable; local receipts still remain active."));
    }

    const handleBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
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
        active: sessionActive,
        id: sessionId,
        startedAt: sessionStartedAt,
        task,
      }),
    );
  }, [mounted, sessionActive, sessionId, sessionStartedAt, task]);

  useEffect(() => {
    const goOffline = () => {
      const activeMode = modeRef.current;
      if (activeMode !== "GRAY_WEENIS") {
        setPriorConnectedMode(activeMode);
      }
      setOnline(false);
      setMode("GRAY_WEENIS");
      appendEvent(
        "SYSTEM",
        "Connectivity lost. Automatic GRAY WEENIS entry; local queue remains active.",
        "YELLOW",
        { hive_sync_claimed: false },
      );
      setNotice("GRAY WEENIS ACTIVE — local continuity only.");
      vibrate([80, 80, 160]);
    };

    const goOnline = () => {
      setOnline(true);
      const restoredMode = priorModeRef.current === "GRAY_WEENIS" ? "BARE_WEENIS" : priorModeRef.current;
      setMode(restoredMode);
      appendEvent(
        "SYSTEM",
        "Connectivity restored. Local queue preserved; durable Hive synchronization is still not claimed.",
        "GREEN",
        { hive_sync_claimed: false, restored_mode: restoredMode },
      );
      setNotice("Network available. Export or ingest receipts through a governed transport.");
      vibrate(90);
    };

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, [appendEvent]);

  const activeMode = useMemo(
    () => MODES.find((candidate) => candidate.id === mode) ?? MODES[0],
    [mode],
  );

  const queuedCount = events.length;
  const redCount = events.filter((entry) => entry.severity === "RED").length;
  const yellowCount = events.filter((entry) => entry.severity === "YELLOW").length;

  const chooseMode = (nextMode: ModeId, source = "manual selector") => {
    if (nextMode !== "GRAY_WEENIS") setPriorConnectedMode(nextMode);
    setMode(nextMode);
    appendEvent("MODE_CHANGE", `${nextMode.replaceAll("_", " ")} selected.`, "GREEN", {
      source,
    });
    setNotice(`${MODES.find((candidate) => candidate.id === nextMode)?.label ?? nextMode} active.`);
    vibrate(40);
  };

  const cycleMode = (direction: -1 | 1) => {
    const currentIndex = MODES.findIndex((candidate) => candidate.id === modeRef.current);
    const nextIndex = (currentIndex + direction + MODES.length) % MODES.length;
    chooseMode(MODES[nextIndex].id, direction > 0 ? "PageDown / HID" : "PageUp / HID");
  };

  const startSession = () => {
    if (sessionActive) {
      setNotice("Session already active.");
      return;
    }
    const id = makeId("NW-WEENIS-SESSION");
    const startedAt = nowIso();
    setSessionId(id);
    setSessionStartedAt(startedAt);
    setSessionActive(true);
    appendEvent("CHECK_IN", `Operator checked in: ${task}`, "GREEN", {
      session_id: id,
      human_authority: "Mason Perry",
      network_available: navigator.onLine,
      hive_sync_claimed: false,
    });
    setNotice("CHECK-IN RECEIPT CREATED — Human Authority remains final.");
    vibrate([60, 40, 60]);
  };

  const stopSession = () => {
    if (!sessionActive) {
      setNotice("No active session to check out.");
      return;
    }
    appendEvent("CHECK_OUT", `Operator checked out: ${task}`, severity, {
      session_id: sessionId,
      started_at: sessionStartedAt,
      event_count_before_checkout: events.length,
      red_flags: redCount,
      yellow_flags: yellowCount,
      durable_hive_sync: false,
    });
    setSessionActive(false);
    setNotice("CHECKOUT RECEIPT CREATED — export packet for durable ingestion.");
    vibrate([120, 60, 120]);
  };

  const addObservation = () => {
    const clean = observation.trim();
    if (!clean) {
      setNotice("Enter an observation before creating a receipt.");
      return;
    }
    appendEvent("OBSERVATION", clean, severity, {
      evidence_class: "HUMAN_OBSERVATION",
      source_frame_attached: false,
      session_id: sessionId || null,
    });
    setObservation("");
    setNotice(`${severity} human observation preserved locally.`);
    vibrate(severity === "RED" ? [180, 80, 180] : severity === "YELLOW" ? [90, 60, 90] : 50);
  };

  const markEscalation = (nextSeverity: Severity) => {
    setSeverity(nextSeverity);
    appendEvent(
      "ESCALATION",
      `${nextSeverity} local escalation marker created. No external alert was automatically sent.`,
      nextSeverity,
      {
        external_alert_sent: false,
        red_critical_call_triggered: false,
      },
    );
    setNotice(
      nextSeverity === "RED"
        ? "RED marked locally. RED_CRITICAL_CALL has NOT been triggered."
        : `${nextSeverity} escalation marker preserved locally.`,
    );
    vibrate(nextSeverity === "RED" ? [220, 100, 220, 100, 220] : nextSeverity === "YELLOW" ? [100, 70, 100] : 60);
  };

  const startCamera = async () => {
    setCameraError("");
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera API is unavailable in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      setNotice("Remote WEENIS camera source active.");
      if (modeRef.current !== "REMOTE_WEENIS") chooseMode("REMOTE_WEENIS", "camera activation");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Camera permission or initialization failed.";
      setCameraError(message);
      setNotice("Camera unavailable. Preserve the failure receipt and continue manually.");
      appendEvent("SYSTEM", "Camera initialization failed.", "YELLOW", { error: message });
    }
  };

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
    setNotice("Camera source stopped.");
  }, []);

  const captureSourceFrame = useCallback(() => {
    const video = videoRef.current;
    if (!cameraActive || !video || video.videoWidth === 0 || video.videoHeight === 0) {
      setNotice("Start the camera and wait for a live source before capture.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      setNotice("Source-frame canvas could not be created.");
      return;
    }
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const stamp = new Date().toISOString().replaceAll(":", "-");
    const filename = `NW-WEENIS-source-${stamp}.jpg`;
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setNotice("Source frame could not be encoded.");
          return;
        }
        downloadBlob(blob, filename);
        appendEvent("SOURCE_FRAME", `Source frame captured: ${filename}`, severity, {
          evidence_class: "ORIGINAL_SOURCE_MEDIA",
          filename,
          width: canvas.width,
          height: canvas.height,
          downloaded_to_device: true,
          embedded_in_local_receipt: false,
        });
        setNotice("SOURCE FRAME DOWNLOADED + receipt preserved. Keep both files together.");
        vibrate([45, 35, 90]);
      },
      "image/jpeg",
      0.92,
    );
  }, [appendEvent, cameraActive, severity]);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setNotice("Fullscreen released.");
      } else {
        await document.documentElement.requestFullscreen();
        setNotice("Fullscreen operator view active.");
      }
    } catch {
      setNotice("Fullscreen control is unavailable in this browser context.");
    }
  };

  const toggleWakeLock = async () => {
    const wakeLockApi = (
      navigator as Navigator & {
        wakeLock?: { request: (type: "screen") => Promise<WakeLockSentinelLike> };
      }
    ).wakeLock;

    if (wakeLockActive) {
      await wakeLockRef.current?.release();
      wakeLockRef.current = null;
      setWakeLockActive(false);
      setNotice("Screen wake lock released.");
      return;
    }

    if (!wakeLockApi) {
      setNotice("Wake lock API is unavailable on this device/browser.");
      return;
    }

    try {
      const sentinel = await wakeLockApi.request("screen");
      sentinel.addEventListener("release", () => setWakeLockActive(false));
      wakeLockRef.current = sentinel;
      setWakeLockActive(true);
      setNotice("Screen wake lock active for field operation.");
    } catch {
      setNotice("Wake lock request was denied or interrupted.");
    }
  };

  const interpretVoiceCommand = (rawTranscript: string) => {
    const command = rawTranscript.toLowerCase().trim();
    setLastTranscript(rawTranscript);
    appendEvent("VOICE_COMMAND", rawTranscript, "GREEN", { interpreted: true });

    if (command.includes("start inspection") || command.includes("check in")) {
      startSession();
    } else if (command.includes("check out") || command.includes("end inspection")) {
      stopSession();
    } else if (command.includes("freeze frame") || command.includes("capture source")) {
      captureSourceFrame();
    } else if (command.includes("gray weenis") || command.includes("offline mode")) {
      chooseMode("GRAY_WEENIS", "voice command");
    } else if (command.includes("halo weenis") || command.includes("halo mode")) {
      chooseMode("HALO_WEENIS", "voice command");
    } else if (command.includes("remote weenis") || command.includes("remote mode")) {
      chooseMode("REMOTE_WEENIS", "voice command");
    } else if (command.includes("command weenis") || command.includes("command mode")) {
      chooseMode("COMMAND_WEENIS", "voice command");
    } else if (command.includes("yellow receipt") || command.includes("mark yellow")) {
      markEscalation("YELLOW");
    } else if (command.includes("red receipt") || command.includes("mark red")) {
      markEscalation("RED");
    } else if (command.includes("green receipt") || command.includes("mark green")) {
      markEscalation("GREEN");
    } else if (command.includes("clean view")) {
      setObservation("");
      setNotice("CLEAN VIEW — overlays and draft observation cleared.");
    } else {
      setObservation((current) => (current ? `${current} ${rawTranscript}` : rawTranscript));
      setNotice("Voice captured as draft human observation. Review before receipt.");
    }
  };

  const startVoice = () => {
    const speechWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const Constructor = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Constructor) {
      setNotice("Speech recognition is unavailable. Use text or a physical controller.");
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new Constructor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const resultIndex = Math.max(0, event.results.length - 1);
      const transcript = event.results[resultIndex]?.[0]?.transcript ?? "";
      if (transcript) interpretVoiceCommand(transcript);
    };
    recognition.onerror = () => {
      setListening(false);
      setNotice("Voice capture failed. Physical and text controls remain available.");
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    setNotice("Listening for one WEENIS command…");
    vibrate(35);
  };

  const installApp = async () => {
    if (!installPrompt) {
      setNotice("Install prompt is not currently available. Use browser menu → Add to Home screen.");
      return;
    }
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setNotice(choice.outcome === "accepted" ? "WEENIS installation accepted." : "WEENIS installation dismissed.");
    setInstallPrompt(null);
  };

  const exportReceipt = () => {
    const packet = {
      schema: "NW-WEENIS-RECEIPT-PACKET-V0.1",
      generated_at: nowIso(),
      human_authority: "Mason Perry",
      application: "Wearable Elite Empowering NULLWORKS Information System",
      client_state: {
        mode,
        network_available: online,
        local_event_count: events.length,
        durable_hive_sync_claimed: false,
        storage_class: "BROWSER_LOCALSTORAGE_PLUS_EXPORTED_JSON",
      },
      session: {
        active: sessionActive,
        session_id: sessionId || null,
        started_at: sessionStartedAt,
        task,
      },
      truth_boundary: [
        "This packet was produced locally in the WEENIS browser client.",
        "Network availability is not proof of Hive synchronization.",
        "Source-frame image downloads remain separate files and are referenced by filename.",
        "Human authority remains final.",
      ],
      events: [...events].reverse(),
    };
    const blob = new Blob([JSON.stringify(packet, null, 2)], { type: "application/json" });
    const stamp = new Date().toISOString().replaceAll(":", "-");
    downloadBlob(blob, `NW-WEENIS-receipt-${stamp}.json`);
    setNotice("Portable receipt packet downloaded. Durable Hive ingestion remains a separate governed action.");
    vibrate([60, 30, 60]);
  };

  const clearLocalQueue = () => {
    const approved = window.confirm(
      "Delete all locally queued WEENIS receipts from this browser? Export first if they must be preserved.",
    );
    if (!approved) return;
    setEvents([]);
    window.localStorage.removeItem(STORAGE_KEY);
    setNotice("Local queue cleared by Human Authority. Exported files were not affected.");
    vibrate(120);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.tagName === "SELECT";

      if (event.key === "Escape") {
        recognitionRef.current?.abort();
        setListening(false);
        setObservation("");
        setNotice("CLEAN VIEW — temporary overlays cleared.");
        return;
      }
      if (typing) return;
      if (event.key === "PageUp") {
        event.preventDefault();
        cycleMode(-1);
      } else if (event.key === "PageDown") {
        event.preventDefault();
        cycleMode(1);
      } else if (event.code === "Space") {
        event.preventDefault();
        captureSourceFrame();
      } else if (event.key === "Enter" && observation.trim()) {
        event.preventDefault();
        addObservation();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      recognitionRef.current?.abort();
      void wakeLockRef.current?.release();
    };
  }, []);

  if (!mounted) {
    return <main className={styles.boot}>BOOTING WEENIS…</main>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.scanlines} />
      <div className={styles.shell}>
        <header className={styles.header}>
          <a className={styles.brand} href="/">
            <span className={styles.brandMark}>W</span>
            <span>
              <strong>WEENIS V0.1</strong>
              <small>Wearable Elite Empowering NULLWORKS Information System</small>
            </span>
          </a>
          <div className={styles.statusRail}>
            <span className={online ? styles.online : styles.offline}>{online ? "NETWORK" : "DEGRADED"}</span>
            <span className={sessionActive ? styles.active : styles.idle}>{sessionActive ? "SESSION LIVE" : "STANDBY"}</span>
            <span className={styles.localOnly}>LOCAL RECEIPTS</span>
          </div>
        </header>

        <section className={styles.hero}>
          <div>
            <div className={styles.kicker}>NULLWORKS OI SUITe // HUMAN INTERFACE LAYER</div>
            <h1>Your WEENIS is operational.</h1>
            <p>
              Capture physical truth, preserve human observations, operate through degraded connectivity, and leave receipts without surrendering the wrench—or authority—to the machine.
            </p>
          </div>
          <div className={styles.authorityBlock}>
            <span>FINAL AUTHORITY</span>
            <strong>MASON PERRY</strong>
            <small>NO RECEIPT, NO SYNC</small>
          </div>
        </section>

        {!online && (
          <section className={styles.grayBanner}>
            <strong>GRAY WEENIS ACTIVE</strong>
            <span>Connectivity is unavailable. Local continuity remains active. Hive synchronization is not claimed.</span>
          </section>
        )}

        <section className={styles.notice} aria-live="polite">
          <span className={styles.noticePulse} />
          {notice}
        </section>

        <section className={styles.dashboardGrid}>
          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.panelNumber}>01</span>
                <h2>Operating mode</h2>
              </div>
              <strong className={styles.modeReadout}>{activeMode.short}</strong>
            </div>
            <p className={styles.modeDescription}>{activeMode.description}</p>
            <div className={styles.modeGrid}>
              {MODES.map((candidate) => (
                <button
                  key={candidate.id}
                  className={candidate.id === mode ? styles.modeActive : styles.modeButton}
                  onClick={() => chooseMode(candidate.id)}
                  type="button"
                >
                  <strong>{candidate.short}</strong>
                  <span>{candidate.label}</span>
                </button>
              ))}
            </div>
            <div className={styles.hidHint}>HID: PageUp/PageDown cycles modes · Escape returns CLEAN VIEW</div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.panelNumber}>02</span>
                <h2>Operator session</h2>
              </div>
              <strong className={sessionActive ? styles.sessionLive : styles.sessionIdle}>
                {sessionActive ? "LIVE" : "IDLE"}
              </strong>
            </div>
            <label className={styles.fieldLabel} htmlFor="weenis-task">Current task</label>
            <input
              id="weenis-task"
              className={styles.textInput}
              value={task}
              onChange={(event) => setTask(event.target.value)}
              placeholder="Name the physical or digital work"
            />
            <div className={styles.sessionMeta}>
              <span>Session</span>
              <code>{sessionId || "NOT CHECKED IN"}</code>
              <span>Started</span>
              <code>{sessionStartedAt ? new Date(sessionStartedAt).toLocaleString() : "—"}</code>
            </div>
            <div className={styles.actionRow}>
              <button className={styles.primaryButton} type="button" onClick={startSession} disabled={sessionActive}>
                CHECK IN
              </button>
              <button className={styles.secondaryButton} type="button" onClick={stopSession} disabled={!sessionActive}>
                CHECK OUT
              </button>
            </div>
          </article>
        </section>

        <section className={styles.controlStrip}>
          <button type="button" onClick={startVoice} className={listening ? styles.controlActive : styles.controlButton}>
            <strong>{listening ? "LISTENING" : "VOICE"}</strong>
            <span>{lastTranscript || "One governed command"}</span>
          </button>
          <button type="button" onClick={toggleWakeLock} className={wakeLockActive ? styles.controlActive : styles.controlButton}>
            <strong>{wakeLockActive ? "AWAKE" : "WAKE LOCK"}</strong>
            <span>Keep operator view visible</span>
          </button>
          <button type="button" onClick={toggleFullscreen} className={styles.controlButton}>
            <strong>FULLSCREEN</strong>
            <span>Field-focused display</span>
          </button>
          <button type="button" onClick={installApp} className={styles.controlButton}>
            <strong>INSTALL</strong>
            <span>{installPrompt ? "Prompt ready" : "Add to home screen"}</span>
          </button>
          <a className={styles.controlLink} href="/remote-eye-v3/index.html" target="_blank" rel="noreferrer">
            <strong>REMOTE EYE</strong>
            <span>Launch external eyeball</span>
          </a>
        </section>

        <section className={styles.workGrid}>
          <article className={styles.cameraPanel}>
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.panelNumber}>03</span>
                <h2>Source evidence</h2>
              </div>
              <strong className={cameraActive ? styles.cameraLive : styles.cameraIdle}>
                {cameraActive ? "CAMERA LIVE" : "NO SOURCE"}
              </strong>
            </div>
            <div className={styles.viewfinder}>
              <video ref={videoRef} className={cameraActive ? styles.videoLive : styles.videoHidden} playsInline muted />
              {!cameraActive && (
                <div className={styles.cameraStandby}>
                  <div className={styles.reticleLarge} />
                  <strong>NO SOURCE FRAME</strong>
                  <span>AI defect claims are prohibited without source evidence.</span>
                </div>
              )}
              {cameraActive && (
                <div className={styles.reticle} aria-hidden="true">
                  <span className={styles.reticleHorizontal} />
                  <span className={styles.reticleVertical} />
                  <span className={styles.reticleCenter} />
                </div>
              )}
              <div className={styles.viewfinderTop}>
                <span>{activeMode.short}</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
              <div className={styles.viewfinderBottom}>ORIGINAL SOURCE MEDIA // HUMAN AUTHORITY FINAL</div>
            </div>
            {cameraError && <p className={styles.errorText}>{cameraError}</p>}
            <div className={styles.actionRow}>
              <button className={styles.primaryButton} type="button" onClick={cameraActive ? captureSourceFrame : startCamera}>
                {cameraActive ? "CAPTURE SOURCE" : "START CAMERA"}
              </button>
              <button className={styles.secondaryButton} type="button" onClick={stopCamera} disabled={!cameraActive}>
                STOP
              </button>
            </div>
            <div className={styles.hidHint}>HID: Space captures a source frame while camera is active</div>
          </article>

          <article className={styles.observationPanel}>
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.panelNumber}>04</span>
                <h2>Human observation</h2>
              </div>
              <strong className={styles[`severity${severity}`]}>{severity}</strong>
            </div>
            <div className={styles.severityRow}>
              {(["GREEN", "YELLOW", "RED"] as Severity[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  className={severity === level ? styles[`severityButton${level}`] : styles.severityButton}
                  onClick={() => setSeverity(level)}
                >
                  {level}
                </button>
              ))}
            </div>
            <textarea
              className={styles.textArea}
              value={observation}
              onChange={(event) => setObservation(event.target.value)}
              placeholder="Describe only what you observed. Separate assumptions, measurements, and AI suggestions."
            />
            <button className={styles.primaryButtonWide} type="button" onClick={addObservation}>
              PRESERVE HUMAN OBSERVATION
            </button>
            <div className={styles.escalationGrid}>
              <button type="button" onClick={() => markEscalation("GREEN")} className={styles.greenAction}>GREEN RECEIPT</button>
              <button type="button" onClick={() => markEscalation("YELLOW")} className={styles.yellowAction}>YELLOW FLAG</button>
              <button type="button" onClick={() => markEscalation("RED")} className={styles.redAction}>RED LOCAL FLAG</button>
            </div>
            <p className={styles.truthNote}>RED here is a local evidence marker. It does not automatically call, email, or trigger RED_CRITICAL_CALL.</p>
          </article>
        </section>

        <section className={styles.receiptPanel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.panelNumber}>05</span>
              <h2>Local receipt queue</h2>
            </div>
            <div className={styles.queueStats}>
              <span><strong>{queuedCount}</strong> EVENTS</span>
              <span><strong>{yellowCount}</strong> YELLOW</span>
              <span><strong>{redCount}</strong> RED</span>
            </div>
          </div>
          <div className={styles.receiptActions}>
            <button className={styles.primaryButton} type="button" onClick={exportReceipt}>EXPORT JSON RECEIPT</button>
            <button className={styles.dangerButton} type="button" onClick={clearLocalQueue}>CLEAR LOCAL QUEUE</button>
          </div>
          <div className={styles.timeline}>
            {events.length === 0 ? (
              <div className={styles.emptyState}>No receipts yet. Check in, capture source evidence, or preserve an observation.</div>
            ) : (
              events.slice(0, 40).map((entry) => (
                <article className={styles.timelineItem} key={entry.id}>
                  <span className={styles[`timelineDot${entry.severity}`]} />
                  <div>
                    <div className={styles.timelineTop}>
                      <strong>{entry.kind.replaceAll("_", " ")}</strong>
                      <span>{new Date(entry.timestamp).toLocaleString()}</span>
                    </div>
                    <p>{entry.summary}</p>
                    <small>{entry.mode.replaceAll("_", " ")} · {entry.id}</small>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <footer className={styles.footer}>
          <div>
            <strong>TRUTH BOUNDARY</strong>
            <p>LocalStorage is local continuity—not durable organizational memory. Network availability is not Hive synchronization. Exported images and JSON receipts must be ingested through a governed transport before the Hive can claim them.</p>
          </div>
          <div className={styles.footerDoctrine}>
            <span>DATA IS GOD</span>
            <span>NO SOURCE FRAME, NO DEFECT CLAIM</span>
            <span>HUMAN AUTHORITY REMAINS FINAL</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
