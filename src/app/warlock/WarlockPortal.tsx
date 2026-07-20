"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./warlock.module.css";

type SpeechRecognitionEventLike = {
  results: ArrayLike<{ 0: { transcript: string } }>;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

type MotionPermissionWindow = Window & {
  DeviceMotionEvent?: {
    requestPermission?: () => Promise<"granted" | "denied">;
  };
  SpeechRecognition?: SpeechRecognitionCtor;
  webkitSpeechRecognition?: SpeechRecognitionCtor;
};

const chambers = [
  {
    code: "01",
    title: "ANVIL",
    subtitle: "Creative operating systems",
    body: "Voice-first production, versioning, canon, direction, selection, and human-controlled creative flow.",
    href: "https://anvil-custom-records.vercel.app/",
    label: "Open ANVIL",
    visual: "anvil",
  },
  {
    code: "02",
    title: "BLEEDING MATRIX",
    subtitle: "Immersive landing worlds",
    body: "Pages that behave like environments: atmospheric motion, cinematic transitions, and interfaces with consequence.",
    href: "#matrix",
    label: "Inspect the signal",
    visual: "matrix",
  },
  {
    code: "03",
    title: "LIVING SIGNAL",
    subtitle: "Organic telemetry",
    body: "Data that breathes, responds, and reveals state instead of hiding inside dashboards built like filing cabinets.",
    href: "#signal",
    label: "Follow the pulse",
    visual: "signal",
  },
  {
    code: "04",
    title: "SCROLL LAB",
    subtitle: "Narrative interaction",
    body: "Layered parallax, sticky scenes, masked reveals, and mobile storytelling that unfolds as the operator moves.",
    href: "#scroll",
    label: "Enter the layers",
    visual: "scroll",
  },
  {
    code: "05",
    title: "PORTAL FORGE",
    subtitle: "Experimental UI / UX",
    body: "Impossible-looking interfaces made usable: sensory entry points, tactile interactions, sound, motion, and surprise.",
    href: "mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20Warlock%20Portal%20UI%20Concept",
    label: "Bring a page",
    visual: "portal",
  },
  {
    code: "06",
    title: "RENDERSMITH",
    subtitle: "Campaign worlds",
    body: "Poster-grade visual systems, product mythology, recurring characters, and art strong enough to stop the scroll.",
    href: "#rendersmith",
    label: "See the forge",
    visual: "render",
  },
];

function playPortalTone() {
  const AudioContextCtor = window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return;

  const context = new AudioContextCtor();
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, context.currentTime);
  master.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.04);
  master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 2.6);
  master.connect(context.destination);

  [146.83, 174.61, 207.65, 246.94, 293.66].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = index % 2 === 0 ? "triangle" : "sine";
    oscillator.frequency.setValueAtTime(frequency, context.currentTime + index * 0.17);
    oscillator.frequency.exponentialRampToValueAtTime(
      frequency * 1.015,
      context.currentTime + index * 0.17 + 0.42,
    );
    gain.gain.setValueAtTime(0.0001, context.currentTime + index * 0.17);
    gain.gain.exponentialRampToValueAtTime(0.22, context.currentTime + index * 0.17 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + index * 0.17 + 0.5);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(context.currentTime + index * 0.17);
    oscillator.stop(context.currentTime + index * 0.17 + 0.55);
  });

  window.setTimeout(() => void context.close(), 3000);
}

export default function WarlockPortal() {
  const [unlocked, setUnlocked] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [spokenCount, setSpokenCount] = useState(0);
  const [listening, setListening] = useState(false);
  const [motionArmed, setMotionArmed] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [bend, setBend] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [status, setStatus] = useState("THREE WAYS THROUGH");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const lastMotionRef = useRef(0);

  const unlock = useCallback((method: string) => {
    if (unlocking || unlocked) return;
    setUnlocking(true);
    setStatus(`${method.toUpperCase()} // SEAL BROKEN`);
    navigator.vibrate?.([45, 35, 90, 35, 160]);
    playPortalTone();
    window.setTimeout(() => {
      setUnlocked(true);
      setUnlocking(false);
      sessionStorage.setItem("nullworks-warlock-unlocked", "true");
    }, 1450);
  }, [unlocking, unlocked]);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem("nullworks-warlock-unlocked") === "true");
  }, []);

  useEffect(() => {
    const onMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;
      const magnitude = Math.sqrt(
        (acceleration.x ?? 0) ** 2 +
        (acceleration.y ?? 0) ** 2 +
        (acceleration.z ?? 0) ** 2,
      );
      const now = Date.now();
      if (magnitude > 21 && now - lastMotionRef.current > 180) {
        lastMotionRef.current = now;
        setShakeCount((count) => {
          const next = count + 1;
          setStatus(`RATTLE ${Math.min(next, 7)} / 7`);
          navigator.vibrate?.(22);
          if (next >= 7) unlock("motion");
          return next;
        });
      }
    };

    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, [unlock]);

  const armMotion = async () => {
    const motionWindow = window as MotionPermissionWindow;
    const requestPermission = motionWindow.DeviceMotionEvent?.requestPermission;
    if (requestPermission) {
      const permission = await requestPermission();
      if (permission !== "granted") {
        setStatus("MOTION PERMISSION DENIED");
        return;
      }
    }
    setMotionArmed(true);
    setStatus("MOTION ARMED // SHAKE THE RELIC");
    navigator.vibrate?.(30);
  };

  const startListening = () => {
    const speechWindow = window as MotionPermissionWindow;
    const Ctor = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Ctor) {
      setStatus("VOICE RUNE NOT SUPPORTED IN THIS BROWSER");
      return;
    }

    recognitionRef.current?.stop();
    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const latest = event.results[event.results.length - 1]?.[0]?.transcript?.toLowerCase() ?? "";
      const matches = latest.match(/spoon/g)?.length ?? 0;
      if (!matches) return;
      setSpokenCount((count) => {
        const next = Math.min(3, count + matches);
        setStatus(`INVOCATION ${next} / 3`);
        navigator.vibrate?.([35, 20, 35]);
        if (next >= 3) {
          recognition.stop();
          unlock("voice");
        }
        return next;
      });
    };
    recognition.onerror = () => {
      setListening(false);
      setStatus("VOICE RUNE INTERRUPTED // TAP TO RETRY");
    };
    recognition.onend = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
    setStatus("LISTENING // SAY THE WORD THREE TIMES");
  };

  const onPointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerRef.current = { x: event.clientX, y: event.clientY };
    setDragDistance(0);
    setStatus("BEND THE RELIC");
  };

  const onPointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!pointerRef.current) return;
    const dx = event.clientX - pointerRef.current.x;
    const dy = event.clientY - pointerRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    setDragDistance((total) => {
      const next = total + distance;
      if (next > 270 && Math.abs(bend) > 58) unlock("touch");
      return next;
    });
    setBend(Math.max(-88, Math.min(88, dx * 0.72 + dy * 0.28)));
    pointerRef.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = () => {
    pointerRef.current = null;
    if (!unlocked) {
      setBend(0);
      setDragDistance(0);
      setStatus("THE METAL REMEMBERS");
    }
  };

  const spoonPath = useMemo(() => {
    const curve = bend * 0.75;
    return `M 150 225 C ${150 + curve * 0.2} 300, ${150 + curve} 420, ${150 + curve * 0.25} 610`;
  }, [bend]);

  const resetPortal = () => {
    sessionStorage.removeItem("nullworks-warlock-unlocked");
    setUnlocked(false);
    setSpokenCount(0);
    setShakeCount(0);
    setBend(0);
    setStatus("THREE WAYS THROUGH");
  };

  if (!unlocked) {
    return (
      <main className={`${styles.lockedPage} ${unlocking ? styles.unlocking : ""}`}>
        <div className={styles.lockedNoise} />
        <div className={styles.lockedGlow} />
        <div className={styles.status}>{status}</div>

        <div className={styles.spoonStage}>
          <svg
            viewBox="0 0 300 700"
            className={`${styles.spoon} ${spokenCount > 0 ? styles.invoked : ""} ${shakeCount > 0 ? styles.rattling : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            role="img"
            aria-label="A metal spoon. Whisper to it, bend it, or shake the phone."
          >
            <defs>
              <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4d5158" />
                <stop offset="0.18" stopColor="#f4f6f7" />
                <stop offset="0.38" stopColor="#858b91" />
                <stop offset="0.62" stopColor="#ffffff" />
                <stop offset="0.82" stopColor="#676c73" />
                <stop offset="1" stopColor="#d8dde1" />
              </linearGradient>
              <radialGradient id="bowl" cx="45%" cy="35%" r="70%">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.3" stopColor="#adb3b9" />
                <stop offset="0.72" stopColor="#4e5359" />
                <stop offset="1" stopColor="#dce0e3" />
              </radialGradient>
              <filter id="shadow" x="-40%" y="-30%" width="180%" height="190%">
                <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#000" floodOpacity="0.8" />
              </filter>
            </defs>
            <g filter="url(#shadow)">
              <ellipse cx="150" cy="150" rx="94" ry="125" fill="url(#bowl)" stroke="#f8f8f8" strokeOpacity="0.65" strokeWidth="3" />
              <ellipse cx="137" cy="124" rx="46" ry="70" fill="none" stroke="#fff" strokeOpacity="0.2" strokeWidth="9" />
              <path d={spoonPath} fill="none" stroke="url(#metal)" strokeWidth="34" strokeLinecap="round" />
              <path d={spoonPath} fill="none" stroke="#fff" strokeOpacity="0.24" strokeWidth="6" strokeLinecap="round" transform="translate(-7 0)" />
            </g>
          </svg>
        </div>

        <div className={styles.runes} aria-label="Portal activation controls">
          <button onClick={startListening} className={listening ? styles.runeActive : ""}>
            <span>◉</span>
            <small>{listening ? `${spokenCount}/3` : "WHISPER"}</small>
          </button>
          <button onClick={armMotion} className={motionArmed ? styles.runeActive : ""}>
            <span>⌁</span>
            <small>{motionArmed ? `${shakeCount}/7` : "MOTION"}</small>
          </button>
          <div className={styles.dragHint}>
            <span>∿</span>
            <small>{dragDistance > 0 ? "KEEP BENDING" : "TOUCH"}</small>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.portalPage}>
      <div className={styles.portalNoise} />
      <div className={styles.orbitOne} />
      <div className={styles.orbitTwo} />

      <header className={styles.portalHeader}>
        <a href="/" className={styles.wordmark}>NULLWORKS</a>
        <div className={styles.portalMark}>WARLOCK PORTAL // 001</div>
        <button onClick={resetPortal} className={styles.resetButton}>RESEAL</button>
      </header>

      <section className={styles.portalHero}>
        <div className={styles.heroKicker}>EXPERIMENTAL INTERFACE DIVISION</div>
        <h1>Beautiful machinery for ideas that deserve a better reality.</h1>
        <p>
          This is the strange side of NULLWORKS: immersive UI, tactile entry points, motion systems,
          creative operating environments, ANVIL, and pages built to make the first thirty seconds impossible to ignore.
        </p>
        <div className={styles.heroRule}>
          <span>ART</span><i /> <span>INTERACTION</span><i /> <span>SYSTEMS</span>
        </div>
      </section>

      <section className={styles.chamberGrid}>
        {chambers.map((chamber) => (
          <article key={chamber.code} className={`${styles.chamber} ${styles[chamber.visual]}`}>
            <div className={styles.chamberTopline}>
              <span>{chamber.code}</span>
              <span>{chamber.subtitle}</span>
            </div>
            <div className={styles.chamberVisual} aria-hidden="true">
              <div className={styles.visualCore} />
              <div className={styles.visualRing} />
              <div className={styles.visualTrace} />
            </div>
            <h2>{chamber.title}</h2>
            <p>{chamber.body}</p>
            <a href={chamber.href} target={chamber.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {chamber.label} <span>↗</span>
            </a>
          </article>
        ))}
      </section>

      <section className={styles.manifesto}>
        <div className={styles.manifestoLabel}>THE RULE</div>
        <blockquote>
          Do not decorate a dead interface. Give the idea a body, a nervous system, and a reason to move.
        </blockquote>
        <p>
          The serious operating systems live on the other side of NULLWORKS. This chamber is for visual invention,
          sensory interaction, and prototypes that make people ask how the hell the page did that.
        </p>
      </section>

      <section className={styles.contactSection}>
        <div>
          <span>HAVE A PAGE THAT WORKS BUT DOES NOT FEEL ALIVE?</span>
          <h2>Bring the artifact. We will find its portal.</h2>
        </div>
        <a href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20Warlock%20Portal%20Project">OPEN A CHANNEL</a>
      </section>

      <footer className={styles.portalFooter}>
        <span>NULLWORKS // HUMAN AUTHORITY REMAINS FINAL</span>
        <a href="/operating-map">EXIT TO THE OPERATING MAP</a>
      </footer>
    </main>
  );
}
