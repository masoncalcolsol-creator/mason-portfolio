"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, MonitorCog, Palette, RotateCcw, Sparkles } from "lucide-react";

type Channel = "scope" | "accent" | "text";
type ActivePanel = Channel | "modes" | null;

type ThemeState = {
  scopeHue: number;
  accentHue: number;
  textLevel: number;
};

const STORAGE_KEY = "kaironull-readable-theme-v1";

const houseTheme: ThemeState = {
  scopeHue: 274,
  accentHue: 345,
  textLevel: 68,
};

const goblinPalettes: ThemeState[] = [
  { scopeHue: 274, accentHue: 345, textLevel: 65 },
  { scopeHue: 214, accentHue: 8, textLevel: 67 },
  { scopeHue: 304, accentHue: 354, textLevel: 63 },
  { scopeHue: 186, accentHue: 332, textLevel: 66 },
  { scopeHue: 242, accentHue: 18, textLevel: 69 },
  { scopeHue: 327, accentHue: 12, textLevel: 64 },
];

function hslToRgb(hue: number, saturation: number, lightness: number) {
  const h = ((hue % 360) + 360) % 360;
  const s = saturation / 100;
  const l = lightness / 100;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const match = l - chroma / 2;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (h < 60) [red, green, blue] = [chroma, x, 0];
  else if (h < 120) [red, green, blue] = [x, chroma, 0];
  else if (h < 180) [red, green, blue] = [0, chroma, x];
  else if (h < 240) [red, green, blue] = [0, x, chroma];
  else if (h < 300) [red, green, blue] = [x, 0, chroma];
  else [red, green, blue] = [chroma, 0, x];

  return [
    Math.round((red + match) * 255),
    Math.round((green + match) * 255),
    Math.round((blue + match) * 255),
  ] as const;
}

function validTheme(value: unknown): value is ThemeState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ThemeState>;
  return (
    typeof candidate.scopeHue === "number" &&
    typeof candidate.accentHue === "number" &&
    typeof candidate.textLevel === "number"
  );
}

function applyTheme(theme: ThemeState) {
  const page = document.querySelector<HTMLElement>(".kn-page");
  if (!page) return;

  const scopeRgb = hslToRgb(theme.scopeHue, 31, 56);
  const signalLightness = Math.max(54, Math.min(74, theme.textLevel - 1));
  const paperLightness = Math.max(46, Math.min(86, theme.textLevel));
  const mutedLightness = Math.max(38, paperLightness - 17);

  page.style.setProperty("--scope-rgb", scopeRgb.join(", "));
  page.style.setProperty("--purple", `hsl(${theme.scopeHue} 31% 56%)`);
  page.style.setProperty("--signal", `hsl(${theme.accentHue} 7% ${signalLightness}%)`);
  page.style.setProperty("--signal-soft", `hsl(${theme.accentHue} 9% ${signalLightness}% / .11)`);
  page.style.setProperty("--wine", `hsl(${theme.accentHue} 46% 38%)`);
  page.style.setProperty("--wine-bright", `hsl(${theme.accentHue} 43% 49%)`);
  page.style.setProperty("--wine-soft", `hsl(${theme.accentHue} 43% 38% / .14)`);
  page.style.setProperty("--paper", `hsl(${theme.accentHue} 3% ${paperLightness}%)`);
  page.style.setProperty("--muted", `hsl(${theme.accentHue} 4% ${mutedLightness}%)`);
  page.style.setProperty("--line", `hsl(${theme.accentHue} 5% ${paperLightness}% / .13)`);

  window.dispatchEvent(
    new CustomEvent("kaironull:themechange", {
      detail: { scopeRgb },
    }),
  );
}

export default function ThemeTuner() {
  const [theme, setTheme] = useState<ThemeState>(houseTheme);
  const [lockedTheme, setLockedTheme] = useState<ThemeState>(houseTheme);
  const [active, setActive] = useState<ActivePanel>(null);
  const [pressing, setPressing] = useState<Channel | null>(null);
  const [modeName, setModeName] = useState("HOUSE");
  const [ready, setReady] = useState(false);
  const holdTimer = useRef<number | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { theme?: unknown; modeName?: unknown };
        if (validTheme(parsed.theme)) {
          setTheme(parsed.theme);
          setLockedTheme(parsed.theme);
        }
        if (typeof parsed.modeName === "string") setModeName(parsed.modeName);
      }
    } catch {
      // A private browser or strict storage policy should never block the page.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyTheme(theme);
  }, [ready, theme]);

  useEffect(() => {
    return () => {
      if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
    };
  }, []);

  const previews = useMemo(
    () => ({
      scope: `hsl(${theme.scopeHue} 31% 56%)`,
      accent: `hsl(${theme.accentHue} 46% 42%)`,
      text: `hsl(${theme.accentHue} 3% ${theme.textLevel}%)`,
    }),
    [theme],
  );

  const beginHold = (channel: Channel) => {
    if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
    setPressing(channel);
    holdTimer.current = window.setTimeout(() => {
      setActive(channel);
      setPressing(null);
      holdTimer.current = null;
      if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(24);
    }, 540);
  };

  const stopHold = () => {
    if (holdTimer.current !== null) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    setPressing(null);
  };

  const saveTheme = (nextTheme = theme, nextMode = modeName) => {
    setTheme(nextTheme);
    setLockedTheme(nextTheme);
    setModeName(nextMode);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme: nextTheme, modeName: nextMode }));
    } catch {
      // The live page still works when storage is unavailable.
    }
    setActive(null);
  };

  const cancelEdit = () => {
    setTheme(lockedTheme);
    setActive(null);
  };

  const usePhone = () => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const highContrast = window.matchMedia("(prefers-contrast: more)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nextTheme: ThemeState = {
      scopeHue: reducedMotion ? 250 : dark ? 272 : 232,
      accentHue: dark ? 344 : 352,
      textLevel: highContrast ? 78 : dark ? 66 : 73,
    };
    saveTheme(nextTheme, "PHONE");
  };

  const unleashGoblins = () => {
    const random = new Uint32Array(1);
    window.crypto.getRandomValues(random);
    const nextTheme = goblinPalettes[random[0] % goblinPalettes.length];
    saveTheme(nextTheme, "GOBLINS");
  };

  const resetHouse = () => saveTheme(houseTheme, "HOUSE");

  const slider = active === "scope"
    ? {
        label: "OSCILLOSCOPE",
        value: theme.scopeHue,
        min: 0,
        max: 359,
        unit: "° hue",
        color: previews.scope,
        onChange: (value: number) => setTheme((current) => ({ ...current, scopeHue: value })),
      }
    : active === "accent"
      ? {
          label: "ACCENT SYSTEM",
          value: theme.accentHue,
          min: 0,
          max: 359,
          unit: "° hue",
          color: previews.accent,
          onChange: (value: number) => setTheme((current) => ({ ...current, accentHue: value })),
        }
      : active === "text"
        ? {
            label: "TEXT INTENSITY",
            value: theme.textLevel,
            min: 44,
            max: 84,
            unit: "% light",
            color: previews.text,
            onChange: (value: number) => setTheme((current) => ({ ...current, textLevel: value })),
          }
        : null;

  return (
    <div className="kn-tuner" aria-label="Display comfort controls">
      <style>{`
        .kn-page {
          --scope-rgb: 155, 121, 189;
          --paper: #bdbdc2;
          --muted: #8f9097;
        }
        .kn-page :is(.brand, h1, h2, h3, .status-card strong, .public-state strong, .example-head strong, .map-node span) {
          color: var(--paper);
        }
        .kn-page :is(.lead, .status-card p, .translation, .process-intro p, .intro-copy, .step-card p, .term p, .not-card p, .example-cell p, .sector p, .deploy-card p, .question > p, .claim, .public-state p, .truth-boundary, footer) {
          color: var(--muted);
        }
        .kn-page :is(.nav-links a, .inspect span, .source-link) {
          color: var(--paper);
        }
        .kn-tuner {
          position: fixed;
          z-index: 150;
          top: 70px;
          left: 50%;
          width: min(560px, calc(100% - 18px));
          transform: translateX(-50%);
          color: #c7c7cb;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          pointer-events: none;
        }
        .kn-tuner * { box-sizing: border-box; }
        .kn-tuner-bar {
          pointer-events: auto;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
          gap: 5px;
          padding: 5px;
          border: 1px solid rgba(220,220,226,.16);
          border-radius: 18px;
          background: rgba(7,7,10,.86);
          box-shadow: 0 16px 46px rgba(0,0,0,.42);
          backdrop-filter: blur(17px);
          -webkit-backdrop-filter: blur(17px);
        }
        .kn-tune-chip, .kn-mode-chip {
          min-width: 0;
          height: 38px;
          border: 1px solid rgba(220,220,226,.12);
          border-radius: 13px;
          background: rgba(255,255,255,.025);
          color: #aaaab0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 0 8px;
          touch-action: manipulation;
          user-select: none;
          -webkit-user-select: none;
          -webkit-touch-callout: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .kn-tune-chip::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: var(--chip-color);
          transform: scaleX(0);
          transform-origin: left;
        }
        .kn-tune-chip.is-pressing::after { animation: kn-hold 540ms linear forwards; }
        .kn-tune-chip.is-active { border-color: var(--chip-color); color: #d2d2d5; }
        @keyframes kn-hold { to { transform: scaleX(1); } }
        .kn-chip-swatch {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--chip-color);
          box-shadow: 0 0 12px color-mix(in srgb, var(--chip-color), transparent 40%);
          flex: 0 0 auto;
        }
        .kn-chip-name { font: 850 9px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .08em; white-space: nowrap; }
        .kn-chip-state { font: 800 7px/1 ui-monospace, SFMono-Regular, Menlo, monospace; color: #6e6e75; }
        .kn-mode-chip { width: 42px; padding: 0; color: #9a9aa0; }
        .kn-mode-chip.is-active { border-color: rgba(157,117,190,.52); color: #c8b4d8; }
        .kn-tuner-panel {
          pointer-events: auto;
          margin: 6px auto 0;
          width: min(410px, 100%);
          border: 1px solid rgba(220,220,226,.17);
          border-radius: 18px;
          padding: 14px;
          background: rgba(7,7,10,.94);
          box-shadow: 0 22px 70px rgba(0,0,0,.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .kn-panel-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .kn-panel-head strong { color: #c2c2c7; font: 900 10px ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .12em; }
        .kn-panel-head span { color: #7f7f87; font: 800 10px ui-monospace, SFMono-Regular, Menlo, monospace; }
        .kn-range {
          width: 100%;
          margin: 18px 0 13px;
          accent-color: var(--range-color);
        }
        .kn-panel-actions { display: grid; grid-template-columns: 1fr 1.35fr; gap: 8px; }
        .kn-panel-actions button, .kn-mode-grid button {
          min-height: 40px;
          border-radius: 12px;
          border: 1px solid rgba(220,220,226,.13);
          background: rgba(255,255,255,.035);
          color: #a9a9af;
          font: 900 10px ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: .08em;
        }
        .kn-panel-actions .kn-lock {
          background: var(--range-color);
          border-color: var(--range-color);
          color: #08080a;
        }
        .kn-mode-copy { color: #888890; font-size: 12px; line-height: 1.5; margin: 9px 0 13px; }
        .kn-mode-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .kn-mode-grid button { display: flex; align-items: center; justify-content: center; gap: 7px; }
        .kn-mode-grid .kn-reset { grid-column: 1 / -1; }
        .kn-tuner-note {
          pointer-events: none;
          text-align: center;
          margin-top: 4px;
          color: rgba(164,164,171,.62);
          font: 750 8px ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: .07em;
        }
        @media (max-width: 620px) {
          .kn-tuner { top: 63px; width: calc(100% - 10px); }
          .kn-tuner-bar { border-radius: 15px; gap: 3px; padding: 4px; }
          .kn-tune-chip { height: 35px; padding: 0 5px; gap: 4px; }
          .kn-chip-state { display: none; }
          .kn-chip-name { font-size: 8px; letter-spacing: .04em; }
          .kn-mode-chip { width: 37px; height: 35px; }
          .kn-tuner-panel { width: calc(100% - 12px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kn-tune-chip.is-pressing::after { animation-duration: 1ms; }
        }
      `}</style>

      <div className="kn-tuner-bar" role="toolbar" aria-label="Long-press a color channel to adjust it">
        {(
          [
            ["scope", "SCOPE", previews.scope],
            ["accent", "ACCENT", previews.accent],
            ["text", "TEXT", previews.text],
          ] as const
        ).map(([channel, label, color]) => (
          <button
            type="button"
            key={channel}
            className={`kn-tune-chip ${pressing === channel ? "is-pressing" : ""} ${active === channel ? "is-active" : ""}`}
            style={{ "--chip-color": color } as React.CSSProperties}
            onPointerDown={() => beginHold(channel)}
            onPointerUp={stopHold}
            onPointerCancel={stopHold}
            onPointerLeave={stopHold}
            onContextMenu={(event) => event.preventDefault()}
            aria-label={`Hold to adjust ${label.toLowerCase()}`}
            aria-pressed={active === channel}
          >
            <span className="kn-chip-swatch" />
            <span className="kn-chip-name">{label}</span>
            <span className="kn-chip-state">HOLD</span>
          </button>
        ))}
        <button
          type="button"
          className={`kn-mode-chip ${active === "modes" ? "is-active" : ""}`}
          onClick={() => setActive((current) => (current === "modes" ? null : "modes"))}
          aria-label="Open automatic theme modes"
          title={`Theme mode: ${modeName}`}
        >
          <Palette size={16} />
        </button>
      </div>

      {slider ? (
        <div className="kn-tuner-panel">
          <div className="kn-panel-head">
            <strong>{slider.label}</strong>
            <span>{slider.value}{slider.unit}</span>
          </div>
          <input
            className="kn-range"
            style={{ "--range-color": slider.color } as React.CSSProperties}
            type="range"
            min={slider.min}
            max={slider.max}
            value={slider.value}
            onChange={(event) => slider.onChange(Number(event.target.value))}
            aria-label={slider.label}
          />
          <div className="kn-panel-actions">
            <button type="button" onClick={cancelEdit}>UNDO</button>
            <button
              type="button"
              className="kn-lock"
              style={{ "--range-color": slider.color } as React.CSSProperties}
              onClick={() => saveTheme(theme, "CUSTOM")}
            >
              <Check size={14} /> OK — LOCK
            </button>
          </div>
        </div>
      ) : null}

      {active === "modes" ? (
        <div className="kn-tuner-panel">
          <div className="kn-panel-head">
            <strong>AUTOMATIC PALETTES</strong>
            <span>{modeName}</span>
          </div>
          <p className="kn-mode-copy">
            Phone mode reads browser-level light, dark, contrast, and motion preferences. Browsers cannot see another app&apos;s keyboard colors. Goblin mode chooses a deliberately muted accessible palette and remembers it on this device.
          </p>
          <div className="kn-mode-grid">
            <button type="button" onClick={usePhone}><MonitorCog size={15} /> LET MY PHONE DECIDE</button>
            <button type="button" onClick={unleashGoblins}><Sparkles size={15} /> LET THE GOBLINS DECIDE</button>
            <button type="button" className="kn-reset" onClick={resetHouse}><RotateCcw size={14} /> RESTORE HOUSE PALETTE</button>
          </div>
        </div>
      ) : null}

      <div className="kn-tuner-note">HOLD A CHANNEL TO TUNE • OK SAVES ONLY ON THIS DEVICE</div>
    </div>
  );
}
