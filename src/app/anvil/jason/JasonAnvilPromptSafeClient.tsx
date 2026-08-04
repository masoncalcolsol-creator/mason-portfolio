"use client";

import {
  Check,
  Copy,
  ExternalLink,
  Gauge,
  LockKeyhole,
  Music2,
  Play,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TriangleAlert,
  WandSparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const REFERENCE_URL = "https://suno.com/s/hl8Ob81jzr7Y9MPU";
const STORAGE_KEY = "nullworks-jason-anvil-prompt-safe-v2";

const prohibitedChecks = [
  { label: "clone language", expression: /\bclone\b/gi },
  { label: "style-of language", expression: /\bin\s+the\s+style\s+of\b/gi },
  { label: "sounds-like language", expression: /\bsounds?\s+like\b/gi },
  { label: "named vocal reference", expression: /\bozzy\s+osbou?rne\b/gi },
  { label: "named guitar reference", expression: /\bzakk\s+w(?:ylde|ilyd)\b/gi },
  { label: "named band reference", expression: /\bsystem\s+of\s+a\s+down\b/gi },
];

type ForgeState = {
  privateReference: string;
  bandName: string;
  songTitle: string;
  subject: string;
  openingImage: string;
  hook: string;
  vocalTraits: string;
  guitarTraits: string;
  visualSeed: string;
  tempo: number;
  folk: number;
  melody: number;
  chaos: number;
};

const defaultForge: ForgeState = {
  privateReference: "",
  bandName: "TEST",
  songTitle: "THE LAST DOOR IN ORBIT",
  subject:
    "A crew crosses the edge of mapped space and discovers an ancient machine that has been waiting for human voices.",
  openingImage:
    "A dead moon rotates beneath a damaged observation window while an impossible brass signal answers from the dark.",
  hook: "WE FOUND THE DOOR THAT WAS WAITING FOR US",
  vocalTraits:
    "weathered, nasal, haunted heavy-metal tenor with ominous theatrical phrasing, eerie sustained notes, dramatic vibrato, slightly unstable character, and a dark but highly memorable melodic delivery",
  guitarTraits:
    "muscular down-tuned riffs, aggressive palm muting, screaming pinch harmonics, wide expressive vibrato, wah-inflected leads, bluesy pentatonic runs, and explosive melodic solos with a gritty heavy-metal edge",
  visualSeed:
    "surreal deep-space exploration, damaged spacecraft, impossible planets, cold stars, ancient alien machinery, cosmic isolation, and astronauts encountering something that should not exist",
  tempo: 168,
  folk: 58,
  melody: 46,
  chaos: 94,
};

function detectUnsafe(text: string) {
  const found = new Set<string>();
  prohibitedChecks.forEach(({ label, expression }) => {
    expression.lastIndex = 0;
    if (expression.test(text)) found.add(label);
  });
  return [...found];
}

function CopyButton({
  id,
  copied,
  disabled,
  onCopy,
}: {
  id: string;
  copied: string | null;
  disabled?: boolean;
  onCopy: () => void;
}) {
  const active = copied === id;
  return (
    <button type="button" className="safe-copy" onClick={onCopy} disabled={disabled}>
      {active ? <Check size={15} /> : <Copy size={15} />}
      {active ? "Copied" : "Copy"}
    </button>
  );
}

export default function JasonAnvilPromptSafeClient() {
  const [forge, setForge] = useState<ForgeState>(defaultForge);
  const [copied, setCopied] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setForge({ ...defaultForge, ...(JSON.parse(stored) as Partial<ForgeState>) });
      }
    } catch {
      // A bad local draft must never block the forge.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(forge));
    } catch {
      // Local persistence is optional.
    }
  }, [forge, loaded]);

  const packet = useMemo(() => {
    const styleInfluence = Math.max(35, 92 - Math.round(forge.chaos / 2));
    const stylePrompt = [
      `Male lead vocalist first: ${forge.vocalTraits}.`,
      `Guitars: ${forge.guitarTraits}.`,
      `Original band identity: ${forge.bandName}.`,
      `Frantic, tightly arranged alternative metal at about ${forge.tempo} BPM with jagged low-string riffs, asymmetrical accents, abrupt full-band stops, and compact sections.`,
      `Folk-color intensity ${forge.folk}/100: use crooked brass, fiddle, accordion, hand percussion, or a ritual march as brief structural punctuation rather than a prolonged genre change.`,
      `Melodic lift ${forge.melody}/100: the chorus opens into a wider, more singable melody before snapping back into dry rhythmic pressure.`,
      `Chaos ${forge.chaos}/100: extreme surprise through timing, vocal character, sudden contrast, false starts, and violent transitions while remaining memorable and playable.`,
      `Visual seed: ${forge.visualSeed}.`,
      "Structure: immediate cold open, compact verse, pre-chorus rupture, explosive hook, one brief folk derailment, final chorus with an altered last line, and a sudden hard-stop ending.",
      "Original composition only. Do not imitate or reproduce any existing artist, vocalist, guitarist, band, song, melody, lyric, riff, recording, or recognizable signature passage.",
    ].join(" ");

    const lyrics = `[Cold Open — isolated transmission]\n${forge.openingImage}\n\n[Verse 1 — compact, clipped]\n${forge.subject}\nThe gauges bloom in alphabet fire\nA voice comes back from a severed wire\n\n[Pre-Chorus — rupture]\nNo map / no god / no signal home\nSomething inside the silence knows\n\n[Chorus — wide melodic hook]\n${forge.hook}\n${forge.hook}\nWe crossed the dark to name the unknown\nNow the unknown is calling us home\n\n[Verse 2 — faster character voice]\nThe old machine begins to breathe\nEvery dead star turns underneath\nWe brought our flags, our prayers, our fear\nIt only asked why we came here\n\n[Folk Derailment — 12 to 20 seconds]\n[Crooked brass and ritual hand percussion answer a shouted warning.]\n\n[Final Chorus — altered last line]\n${forge.hook}\n${forge.hook}\nWe crossed the dark to name the unknown\nNow the unknown has opened our home\n\n[Hard Stop]`;

    const exclude =
      "artist names, band names used as references, vocalist names, guitarist names, direct imitation phrasing, comparison shorthand, EDM drops, trap switch, DJ scratches, pop-punk gloss, glossy arena-rock polish, extended cinematic intro, unrelated genre montage, comedy novelty mix, recognizable copyrighted melody, borrowed lyric, copied riff, overlong solo, fade-out ending";

    const settings = [
      "Model: Suno v5.5",
      `Tempo target: ${forge.tempo} BPM`,
      `Weirdness / surprise: ${forge.chaos}%`,
      `Style influence starting point: ${styleInfluence}%`,
      "Generate two versions before rewriting lyrics",
      "Target duration: 2:50–3:55 unless Jason deliberately orders a longer cut",
      "First comparison: preserve words and change only arrangement pressure",
      "Second comparison: preserve arrangement direction and change only vocal character",
      "Prompt-safe lock: do not paste private reference notes into Suno",
    ].join("\n");

    const combined = `TITLE\n${forge.songTitle}\n\nSTYLE PROMPT\n${stylePrompt}\n\nFULL LYRICS\n${lyrics}\n\nEXCLUDE STYLES / NEGATIVE PROMPT\n${exclude}\n\nSUGGESTED SETTINGS\n${settings}`;
    const unsafe = detectUnsafe(combined);

    return {
      title: forge.songTitle.trim() || "UNTITLED TEST CUT",
      stylePrompt,
      lyrics,
      exclude,
      settings,
      combined,
      unsafe,
      exportReady: unsafe.length === 0,
    };
  }, [forge]);

  function update<K extends keyof ForgeState>(key: K, value: ForgeState[K]) {
    setForge((current) => ({ ...current, [key]: value }));
  }

  async function copy(id: string, text: string) {
    if (!packet.exportReady) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  }

  function resetForge() {
    setForge(defaultForge);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing else is required.
    }
  }

  return (
    <main className="safe-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #05070b; }
        button, a, input, textarea { -webkit-tap-highlight-color: transparent; }
        .safe-page {
          --cyan: #7be7ff;
          --lime: #d5ff4a;
          --violet: #a995ff;
          --amber: #ffbd4a;
          min-height: 100vh;
          color: #f7f9fc;
          background:
            radial-gradient(circle at 82% 3%, rgba(123,231,255,.16), transparent 27rem),
            radial-gradient(circle at 8% 40%, rgba(169,149,255,.13), transparent 32rem),
            radial-gradient(circle at 75% 80%, rgba(213,255,74,.07), transparent 34rem),
            linear-gradient(145deg, #05070b, #0b0d14 48%, #06070a);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .safe-shell { width: min(1160px, calc(100% - 28px)); margin: 0 auto; }
        .safe-nav {
          position: sticky;
          top: 0;
          z-index: 90;
          border-bottom: 1px solid rgba(255,255,255,.11);
          background: rgba(5,7,11,.83);
          backdrop-filter: blur(18px);
        }
        .safe-nav-inner { min-height: 62px; display: flex; align-items: center; justify-content: space-between; gap: 14px; }
        .safe-brand { color: white; text-decoration: none; font-weight: 950; font-size: 11px; letter-spacing: .15em; }
        .safe-brand span { color: var(--cyan); }
        .safe-nav-links { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
        .safe-nav-links a { color: #ccd3dd; text-decoration: none; border: 1px solid rgba(255,255,255,.14); border-radius: 999px; padding: 8px 10px; font-size: 10px; font-weight: 900; }
        .safe-hero { min-height: calc(100svh - 62px); display: grid; align-items: center; border-bottom: 1px solid rgba(255,255,255,.09); }
        .safe-hero-grid { display: grid; grid-template-columns: 1.13fr .87fr; gap: 28px; align-items: end; padding: 66px 0 62px; }
        .safe-kicker, .safe-label, .safe-output-label { color: var(--cyan); font: 900 11px ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .15em; text-transform: uppercase; }
        .safe-title { margin: 16px 0 0; font-size: clamp(58px, 9.5vw, 120px); line-height: .82; letter-spacing: -.073em; }
        .safe-title span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(213,255,74,.72); }
        .safe-lead { max-width: 810px; margin: 27px 0 0; color: #bcc5d1; font-size: clamp(18px, 2vw, 24px); line-height: 1.56; }
        .safe-status-card { border: 1px solid rgba(123,231,255,.34); border-radius: 28px; padding: 23px; background: linear-gradient(145deg, rgba(123,231,255,.09), rgba(7,9,14,.88)); box-shadow: 0 30px 90px rgba(0,0,0,.35); }
        .safe-status-line { display: grid; grid-template-columns: 43px 1fr; gap: 13px; align-items: start; padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,.09); }
        .safe-status-line:last-child { border-bottom: 0; }
        .safe-icon { width: 43px; height: 43px; display: grid; place-items: center; border-radius: 14px; color: #05070b; background: var(--lime); }
        .safe-status-line:nth-child(2) .safe-icon { background: var(--cyan); }
        .safe-status-line:nth-child(3) .safe-icon { background: var(--violet); }
        .safe-status-line b { display: block; font-size: 16px; }
        .safe-status-line p { margin: 5px 0 0; color: #9fa9b6; font-size: 13px; line-height: 1.5; }
        .safe-section { padding: 74px 0; border-bottom: 1px solid rgba(255,255,255,.09); }
        .safe-section-head { display: grid; grid-template-columns: 1.05fr .95fr; gap: 26px; align-items: end; margin-bottom: 27px; }
        .safe-section h2 { margin: 10px 0 0; font-size: clamp(41px, 6.4vw, 76px); line-height: .92; letter-spacing: -.06em; }
        .safe-section-head p { color: #aeb7c3; font-size: 17px; line-height: 1.66; }
        .safe-reference { display: grid; grid-template-columns: .84fr 1.16fr; gap: 15px; }
        .safe-card { border: 1px solid rgba(255,255,255,.13); border-radius: 24px; overflow: hidden; background: linear-gradient(145deg, rgba(255,255,255,.05), rgba(6,8,12,.84)); }
        .safe-player { min-height: 430px; display: flex; flex-direction: column; }
        .safe-player-head { padding: 20px; display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
        .safe-player-head h3 { margin: 7px 0 0; font-size: 27px; line-height: 1.03; }
        .safe-player iframe { width: 100%; flex: 1; min-height: 310px; border: 0; background: #101218; }
        .safe-player-footer { padding: 14px 19px 19px; border-top: 1px solid rgba(255,255,255,.08); }
        .safe-button-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .safe-button, .safe-copy, .safe-reset { appearance: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid rgba(123,231,255,.37); border-radius: 999px; min-height: 42px; padding: 10px 14px; color: #05070b; background: var(--cyan); text-decoration: none; font: 900 11px ui-sans-serif, system-ui, sans-serif; cursor: pointer; }
        .safe-button.secondary, .safe-reset { color: #d6dce5; background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.16); }
        .safe-copy:disabled { opacity: .38; cursor: not-allowed; }
        .safe-note { margin: 12px 0 0; color: #8994a2; font-size: 12px; line-height: 1.5; }
        .safe-rule-card { padding: 23px; }
        .safe-rule-card h3 { margin: 12px 0 0; font-size: 31px; letter-spacing: -.04em; }
        .safe-rule-list { display: grid; gap: 11px; margin-top: 22px; }
        .safe-rule { display: grid; grid-template-columns: 28px 1fr; gap: 10px; align-items: start; color: #cbd2dc; line-height: 1.53; }
        .safe-rule svg { color: var(--lime); margin-top: 2px; }
        .safe-private { margin-top: 20px; border: 1px solid rgba(255,189,74,.28); border-radius: 18px; padding: 15px; background: rgba(255,189,74,.055); }
        .safe-private b { color: var(--amber); }
        .safe-private p { margin: 7px 0 0; color: #aeb4bd; font-size: 12px; line-height: 1.5; }
        .safe-forge-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: 16px; align-items: start; }
        .safe-panel { border: 1px solid rgba(255,255,255,.13); border-radius: 25px; overflow: hidden; background: rgba(6,8,12,.78); }
        .safe-panel-head { padding: 19px 20px; border-bottom: 1px solid rgba(255,255,255,.09); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .safe-panel-head h3 { margin: 0; font-size: 23px; letter-spacing: -.035em; }
        .safe-form { padding: 19px; display: grid; gap: 16px; }
        .safe-field { display: grid; gap: 8px; }
        .safe-field input, .safe-field textarea { width: 100%; border: 1px solid rgba(255,255,255,.14); border-radius: 15px; padding: 13px 14px; color: #f5f8fc; background: rgba(255,255,255,.04); outline: none; resize: vertical; font: 700 14px/1.46 ui-sans-serif, system-ui, sans-serif; }
        .safe-field input:focus, .safe-field textarea:focus { border-color: rgba(123,231,255,.58); box-shadow: 0 0 0 3px rgba(123,231,255,.07); }
        .safe-field.private textarea { border-color: rgba(255,189,74,.28); background: rgba(255,189,74,.035); }
        .safe-field small { color: #7f8996; line-height: 1.45; }
        .safe-range-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .safe-range-head output { color: var(--lime); font: 900 12px ui-monospace, monospace; }
        .safe-field input[type="range"] { padding: 0; accent-color: var(--cyan); }
        .safe-three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .safe-lock { display: flex; gap: 11px; align-items: flex-start; border-radius: 17px; padding: 14px; }
        .safe-lock.pass { border: 1px solid rgba(213,255,74,.28); background: rgba(213,255,74,.055); }
        .safe-lock.fail { border: 1px solid rgba(255,97,112,.34); background: rgba(255,97,112,.06); }
        .safe-lock b { display: block; }
        .safe-lock p { margin: 5px 0 0; color: #9ca6b3; font-size: 12px; line-height: 1.48; }
        .safe-output { padding: 18px 19px; border-bottom: 1px solid rgba(255,255,255,.085); }
        .safe-output:last-child { border-bottom: 0; }
        .safe-output.master { background: linear-gradient(135deg, rgba(123,231,255,.065), rgba(213,255,74,.04)); }
        .safe-output-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 11px; }
        .safe-output pre { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; color: #d2d8e1; font: 650 12px/1.61 ui-monospace, SFMono-Regular, Menlo, monospace; }
        .safe-copy { min-height: 34px; padding: 7px 10px; font-size: 10px; }
        .safe-closing { padding: 80px 0 90px; }
        .safe-closing-card { border: 1px solid rgba(213,255,74,.30); border-radius: 29px; padding: clamp(28px, 5vw, 46px); background: linear-gradient(145deg, rgba(213,255,74,.07), rgba(6,8,12,.88)); }
        .safe-closing-card strong { display: block; font-size: clamp(45px, 8vw, 92px); line-height: .86; letter-spacing: -.07em; }
        .safe-closing-card strong span { color: var(--cyan); }
        .safe-closing-card p { max-width: 800px; color: #aeb7c3; font-size: 18px; line-height: 1.63; }
        .safe-footer { padding: 0 0 46px; color: #707a87; font-size: 11px; line-height: 1.6; }
        @media (max-width: 940px) {
          .safe-hero-grid, .safe-section-head, .safe-reference, .safe-forge-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 680px) {
          .safe-shell { width: min(100% - 20px, 1160px); }
          .safe-nav-inner { min-height: 56px; align-items: flex-start; padding: 8px 0; }
          .safe-brand { padding-top: 8px; font-size: 9px; }
          .safe-nav-links { gap: 4px; }
          .safe-nav-links a { padding: 7px 8px; font-size: 9px; }
          .safe-hero-grid { padding: 49px 0 47px; }
          .safe-title { font-size: clamp(53px, 17vw, 78px); }
          .safe-section { padding: 57px 0; }
          .safe-three { grid-template-columns: 1fr; }
          .safe-player { min-height: 450px; }
          .safe-player iframe { min-height: 320px; }
          .safe-output { padding: 16px 14px; }
          .safe-output pre { font-size: 11px; }
        }
      `}</style>

      <nav className="safe-nav">
        <div className="safe-shell safe-nav-inner">
          <a className="safe-brand" href="#top">NULLWORKS <span>ANVIL SAFE FORGE</span></a>
          <div className="safe-nav-links">
            <a href="#rule">Rule</a>
            <a href="#forge">Forge</a>
            <a href="#packet">Packet</a>
          </div>
        </div>
      </nav>

      <header className="safe-hero" id="top">
        <div className="safe-shell safe-hero-grid">
          <div>
            <div className="safe-kicker">JASON RAINS // PROMPT-SAFE PRODUCTION CELL</div>
            <h1 className="safe-title">NAMES IN.<span>TRAITS OUT.</span></h1>
            <p className="safe-lead">
              Jason can describe the reference however he wants in the private note. The Suno packet receives only audible production traits: vocal character, guitar behavior, arrangement pressure, instrumentation, melody, chaos, and imagery.
            </p>
          </div>

          <aside className="safe-status-card">
            <div className="safe-status-line"><div className="safe-icon"><LockKeyhole size={21} /></div><div><b>Private reference stays private</b><p>The reference note is stored only in this browser and is never inserted into the exported packet.</p></div></div>
            <div className="safe-status-line"><div className="safe-icon"><ShieldCheck size={21} /></div><div><b>Copy gate scans the output</b><p>Copy buttons lock when prohibited imitation language or the known reference names appear in the export.</p></div></div>
            <div className="safe-status-line"><div className="safe-icon"><WandSparkles size={21} /></div><div><b>Default translation is loaded</b><p>TEST, 168 BPM, 58 folk, 46 melody, 94 chaos, and the space-exploration visual seed are already installed.</p></div></div>
          </aside>
        </div>
      </header>

      <section className="safe-section" id="rule">
        <div className="safe-shell">
          <div className="safe-section-head">
            <div><div className="safe-kicker">THE NEW LANDING-PAGE LAW</div><h2>Reference by ear, not by name.</h2></div>
            <p>
              The page now separates the human shorthand from the machine prompt. Names and comparison language may be useful during conversation, but they are not production instructions and are never supposed to cross the Suno boundary.
            </p>
          </div>

          <div className="safe-reference">
            <article className="safe-card safe-rule-card">
              <Music2 size={28} color="var(--cyan)" />
              <h3>Export only observable traits.</h3>
              <div className="safe-rule-list">
                <div className="safe-rule"><Check size={18} /><span>Describe vocal range, timbre, phrasing, vibrato, aggression, fragility, and melodic behavior.</span></div>
                <div className="safe-rule"><Check size={18} /><span>Describe tuning, riff density, palm muting, harmonics, vibrato, lead vocabulary, and solo behavior.</span></div>
                <div className="safe-rule"><Check size={18} /><span>Describe tempo, section length, transitions, instrumentation, tension, release, imagery, and ending.</span></div>
                <div className="safe-rule"><Check size={18} /><span>Keep the requested band identity original and state the originality boundary explicitly.</span></div>
              </div>
              <div className="safe-private"><b>Private reference field</b><p>Jason may type artist names or shorthand there for the humans. It is never concatenated into the title, style prompt, lyrics, exclusions, settings, or combined packet.</p></div>
            </article>

            <article className="safe-card safe-player">
              <div className="safe-player-head">
                <div><div className="safe-kicker">SOURCE DECK</div><h3>HARESCRAMBLE reference</h3></div>
                <Sparkles size={22} color="var(--lime)" />
              </div>
              <iframe src={REFERENCE_URL} title="Suno reference supplied by Mason Perry" allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" loading="lazy" />
              <div className="safe-player-footer">
                <div className="safe-button-row">
                  <a className="safe-button" href={REFERENCE_URL} target="_blank" rel="noreferrer"><Play size={15} /> Open reference <ExternalLink size={14} /></a>
                  <a className="safe-button secondary" href="#forge"><SlidersHorizontal size={15} /> Open forge</a>
                </div>
                <p className="safe-note">Playback inside this page still depends on Suno allowing the share page to render in an iframe. The direct-open button remains the fallback.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="safe-section" id="forge">
        <div className="safe-shell">
          <div className="safe-section-head">
            <div><div className="safe-kicker">PROMPT-SAFE CONTROL BOARD</div><h2>Translate the sound before copying.</h2></div>
            <p>
              The production-trait fields below are the only descriptive inputs exported to Suno. The private shorthand remains available to Jason and Mason, but it is architecturally excluded from the packet.
            </p>
          </div>

          <div className="safe-forge-grid">
            <section className="safe-panel">
              <div className="safe-panel-head"><h3>Jason's inputs</h3><button type="button" className="safe-reset" onClick={resetForge}>Reset safe seed</button></div>
              <div className="safe-form">
                <label className="safe-field private">
                  <span className="safe-label">Private reference shorthand — never exported</span>
                  <textarea rows={3} value={forge.privateReference} onChange={(event) => update("privateReference", event.target.value)} placeholder="Human-only note. Names may live here because this field never enters the Suno packet." />
                  <small>This value is stored locally in this browser. It does not appear anywhere in the five-block output.</small>
                </label>

                <label className="safe-field"><span className="safe-label">Original band identity</span><input value={forge.bandName} onChange={(event) => update("bandName", event.target.value)} /></label>
                <label className="safe-field"><span className="safe-label">Song title</span><input value={forge.songTitle} onChange={(event) => update("songTitle", event.target.value)} /></label>
                <label className="safe-field"><span className="safe-label">Male vocal production traits</span><textarea rows={5} value={forge.vocalTraits} onChange={(event) => update("vocalTraits", event.target.value)} /></label>
                <label className="safe-field"><span className="safe-label">Guitar production traits</span><textarea rows={5} value={forge.guitarTraits} onChange={(event) => update("guitarTraits", event.target.value)} /></label>
                <label className="safe-field"><span className="safe-label">Song subject</span><textarea rows={4} value={forge.subject} onChange={(event) => update("subject", event.target.value)} /></label>
                <label className="safe-field"><span className="safe-label">Opening image</span><textarea rows={3} value={forge.openingImage} onChange={(event) => update("openingImage", event.target.value)} /></label>
                <label className="safe-field"><span className="safe-label">Hook</span><input value={forge.hook} onChange={(event) => update("hook", event.target.value)} /></label>
                <label className="safe-field"><span className="safe-label">Visual seed</span><textarea rows={4} value={forge.visualSeed} onChange={(event) => update("visualSeed", event.target.value)} /></label>

                <div className="safe-three">
                  <label className="safe-field"><div className="safe-range-head"><span className="safe-label">Folk</span><output>{forge.folk}</output></div><input type="range" min="0" max="100" value={forge.folk} onChange={(event) => update("folk", Number(event.target.value))} /></label>
                  <label className="safe-field"><div className="safe-range-head"><span className="safe-label">Melody</span><output>{forge.melody}</output></div><input type="range" min="0" max="100" value={forge.melody} onChange={(event) => update("melody", Number(event.target.value))} /></label>
                  <label className="safe-field"><div className="safe-range-head"><span className="safe-label">Chaos</span><output>{forge.chaos}</output></div><input type="range" min="0" max="100" value={forge.chaos} onChange={(event) => update("chaos", Number(event.target.value))} /></label>
                </div>
                <label className="safe-field"><div className="safe-range-head"><span className="safe-label">Tempo</span><output>{forge.tempo} BPM</output></div><input type="range" min="90" max="220" value={forge.tempo} onChange={(event) => update("tempo", Number(event.target.value))} /></label>

                <div className={`safe-lock ${packet.exportReady ? "pass" : "fail"}`}>
                  {packet.exportReady ? <ShieldCheck size={22} color="var(--lime)" /> : <TriangleAlert size={22} color="#ff6170" />}
                  <div>
                    <b>{packet.exportReady ? "PROMPT-SAFE LOCK: PASS" : "PROMPT-SAFE LOCK: BLOCKED"}</b>
                    <p>{packet.exportReady ? "No prohibited named-reference or imitation phrases were found in the exported packet." : `Remove: ${packet.unsafe.join(", ")}. Copy controls stay locked until the export is clean.`}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="safe-panel" id="packet">
              <div className="safe-panel-head"><h3>ANVIL five-block packet</h3><CopyButton id="all" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("all", packet.combined)} /></div>
              <div className="safe-output master"><div className="safe-output-head"><span className="safe-output-label">1 — Title</span><CopyButton id="title" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("title", packet.title)} /></div><pre>{packet.title}</pre></div>
              <div className="safe-output"><div className="safe-output-head"><span className="safe-output-label">2 — Suno-safe style prompt</span><CopyButton id="style" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("style", packet.stylePrompt)} /></div><pre>{packet.stylePrompt}</pre></div>
              <div className="safe-output"><div className="safe-output-head"><span className="safe-output-label">3 — Full lyrics</span><CopyButton id="lyrics" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("lyrics", packet.lyrics)} /></div><pre>{packet.lyrics}</pre></div>
              <div className="safe-output"><div className="safe-output-head"><span className="safe-output-label">4 — Exclude / negative prompt</span><CopyButton id="exclude" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("exclude", packet.exclude)} /></div><pre>{packet.exclude}</pre></div>
              <div className="safe-output"><div className="safe-output-head"><span className="safe-output-label">5 — Suggested settings</span><CopyButton id="settings" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("settings", packet.settings)} /></div><pre>{packet.settings}</pre></div>
            </section>
          </div>
        </div>
      </section>

      <section className="safe-closing">
        <div className="safe-shell">
          <div className="safe-closing-card">
            <div className="safe-kicker">LOCKED PRODUCTION RULE</div>
            <strong>NO NAMES.<br /><span>ONLY SOUND.</span></strong>
            <p>
              The reference can guide the humans. The exported prompt must explain what the ears should hear and what the arrangement should do. That is now the default architecture of Jason's landing page.
            </p>
            <div className="safe-button-row"><a className="safe-button" href="#forge"><Gauge size={15} /> Return to the controls</a></div>
          </div>
        </div>
      </section>

      <footer className="safe-footer"><div className="safe-shell">NULLWORKS ANVIL Sound Forge · Jason Rains creative captain · Mason Perry producer and final Human Authority · private references never exported · copy gate blocks known named-reference and imitation language.</div></footer>
    </main>
  );
}
