"use client";

import {
  Check,
  ChevronDown,
  Copy,
  Crown,
  ExternalLink,
  Gauge,
  Music2,
  Play,
  Radio,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const REFERENCE_URL = "https://suno.com/s/hl8Ob81jzr7Y9MPU";
const STORAGE_KEY = "nullworks-jason-anvil-forge-v1";

const tracks = [
  { number: "01", title: "HATCH THE WORLD…", duration: "4:09", note: "reference link supplied" },
  { number: "02", title: "TIME HAS NO BONE…", duration: "3:38", note: "Mason's current favorite" },
  { number: "03", title: "CHECKERBOARD OCEA…", duration: "3:48" },
  { number: "04", title: "HALF-BORN PARAD…", duration: "3:32" },
  { number: "05", title: "THE MIRROR ATE MY FAC…", duration: "3:57" },
  { number: "06", title: "THE MIRROR ATE MY FAC…", duration: "4:22" },
  { number: "07", title: "DESIRE HAS TEET…", duration: "4:05" },
  { number: "08", title: "THE CROSS HAS NO SHA…", duration: "4:52" },
  { number: "09", title: "THE FOREST GREW LEG…", duration: "3:59" },
  { number: "10", title: "THE ROOM COULDN'T HO…", duration: "4:05" },
];

const fingerprint = [
  "violent stop-start arrangement with sudden empty-space cuts",
  "crooked folk color: brass, fiddle, accordion, or ritual percussion used in flashes",
  "tight low-string riffs interrupted by skank, march, gallop, or lurch rhythms",
  "volatile character vocals that can snap from barked satire to a broad melodic hook",
  "surreal concrete imagery: machinery, animals, rooms, oceans, bodies, ceremonies",
  "short sections with high contrast instead of long genre detours",
];

type ForgeState = {
  bandName: string;
  songTitle: string;
  subject: string;
  openingImage: string;
  hook: string;
  visualSeed: string;
  vocal: string;
  tempo: number;
  chaos: number;
  folk: number;
  melody: number;
};

const defaultForge: ForgeState = {
  bandName: "HARESCRAMBLE // JASON SESSION",
  songTitle: "UNTITLED JASON CUT",
  subject: "Jason chooses the first real-world absurdity, memory, argument, or impossible machine.",
  openingImage: "A bent horizon opens like a maintenance panel while a brass band runs the wrong direction.",
  hook: "NAME THE THING THAT SHOULD NOT BE WORKING",
  visualSeed: "Surreal Baltic disaster painting, impossible machinery, ceremonial panic, cold ocean light, physical texture.",
  vocal: "volatile male lead: barked character voice, clipped spoken phrases, then a wide melodic chorus",
  tempo: 168,
  chaos: 72,
  folk: 58,
  melody: 46,
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="jr-field-label">{children}</span>;
}

function CopyButton({
  id,
  copied,
  onCopy,
}: {
  id: string;
  copied: string | null;
  onCopy: () => void;
}) {
  const active = copied === id;
  return (
    <button type="button" className="jr-copy" onClick={onCopy}>
      {active ? <Check size={15} /> : <Copy size={15} />}
      {active ? "Copied" : "Copy"}
    </button>
  );
}

export default function JasonAnvilClient() {
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
      // Local drafts are convenience only; a bad browser value should never block the workroom.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(forge));
    } catch {
      // The forge remains usable even when browser storage is unavailable.
    }
  }, [forge, loaded]);

  const packet = useMemo(() => {
    const styleInfluence = Math.max(42, 92 - Math.round(forge.chaos / 2));
    const style = [
      `Male lead vocalist first: ${forge.vocal}.`,
      `Original band identity: ${forge.bandName}.`,
      `Frantic, tightly arranged alternative metal at about ${forge.tempo} BPM with jagged low-string riffs, asymmetrical accents, abrupt full-band stops, and compact sections.`,
      `Folk-color intensity ${forge.folk}/100: use crooked brass, fiddle, accordion, hand percussion, or a ritual march as brief structural punctuation rather than a long genre switch.`,
      `Melodic lift ${forge.melody}/100: the chorus opens wider and more singable, then the arrangement snaps back into dry rhythmic pressure.`,
      `Chaos ${forge.chaos}/100: surprise comes from timing, character, and contrast while the song remains memorable and playable.`,
      `Visual seed: ${forge.visualSeed}`,
      "Cold open, compact verse, pre-chorus rupture, explosive hook, one short folk derailment, final chorus with altered last line, hard-stop ending. Original composition; reference traits only, never copy an existing artist, melody, lyric, or recording.",
    ].join(" ");

    const lyrics = `[Cold Open — spoken / isolated]\n${forge.openingImage}\n\n[Verse 1 — clipped, physical detail]\n${forge.subject}\n[Jason: add the first concrete action, object, person, or failure here.]\n[Jason: add the detail nobody else would think to mention.]\n\n[Pre-Chorus — pressure rises]\nIt leans / it rings / it turns the wrong way\nEverybody swears it was built this way\n\n[Chorus — wide melodic hook]\n${forge.hook}\n${forge.hook}\nWe keep the proof where the paint wore thin\nThen kick the crooked mechanism back in\n\n[Verse 2 — character voice / faster]\n[Jason: who benefits from pretending this is normal?]\n[Jason: what ridiculous rule, ritual, or excuse keeps it alive?]\n\n[Folk Derailment — 12 to 20 seconds]\n[Brass / fiddle / accordion answers a shouted one-line accusation.]\n\n[Final Chorus — changed last line]\n${forge.hook}\n${forge.hook}\nWe keep the proof where the paint wore thin\nThis time the crooked mechanism stays open\n\n[Hard Stop]`;

    const exclude =
      "EDM drops, trap switch, DJ scratches, pop-punk gloss, glossy arena-rock polish, extended cinematic intro, unrelated genre montage, comedy novelty mix, direct artist imitation, recognizable copyrighted melody, borrowed lyric, overlong guitar solo, fade-out ending";

    const settings = [
      "Model: Suno v5.5",
      `Starting tempo target: ${forge.tempo} BPM`,
      `Weirdness / surprise starting point: ${forge.chaos}%`,
      `Style influence starting point: ${styleInfluence}%`,
      "Generate two versions before changing the words",
      "Target duration: 2:50–3:55 unless Jason deliberately orders a longer cut",
      "First comparison: preserve lyrics and change only arrangement pressure",
      "Second comparison: preserve arrangement direction and change only vocal character",
    ].join("\n");

    return {
      title: forge.songTitle.trim() || "UNTITLED JASON CUT",
      style,
      lyrics,
      exclude,
      settings,
      combined: `TITLE\n${forge.songTitle}\n\nSTYLE PROMPT\n${style}\n\nFULL LYRICS\n${lyrics}\n\nEXCLUDE STYLES / NEGATIVE PROMPT\n${exclude}\n\nSUGGESTED SETTINGS\n${settings}`,
    };
  }, [forge]);

  async function copy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  }

  function update<K extends keyof ForgeState>(key: K, value: ForgeState[K]) {
    setForge((current) => ({ ...current, [key]: value }));
  }

  function resetForge() {
    setForge(defaultForge);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // No action needed.
    }
  }

  return (
    <main className="jr-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #080709; }
        button, a, input, textarea { -webkit-tap-highlight-color: transparent; }
        .jr-page {
          --acid: #c6ff2e;
          --magenta: #ff2f92;
          --amber: #ffb52e;
          --ice: #bdefff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          color: #f7f4f0;
          background:
            radial-gradient(circle at 84% 4%, rgba(255,47,146,.18), transparent 25rem),
            radial-gradient(circle at 7% 35%, rgba(198,255,46,.10), transparent 30rem),
            radial-gradient(circle at 76% 78%, rgba(189,239,255,.08), transparent 31rem),
            linear-gradient(135deg, #080709 0%, #101014 46%, #070708 100%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .jr-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .16;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 31px 31px;
          mask-image: linear-gradient(to bottom, black, transparent 92%);
        }
        .jr-shell { width: min(1160px, calc(100% - 32px)); margin: 0 auto; }
        .jr-nav {
          position: sticky;
          top: 0;
          z-index: 90;
          border-bottom: 1px solid rgba(255,255,255,.11);
          background: rgba(8,7,9,.80);
          backdrop-filter: blur(18px);
        }
        .jr-nav-inner { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .jr-brand { color: #fff; text-decoration: none; font-weight: 950; font-size: 12px; letter-spacing: .14em; }
        .jr-brand span { color: var(--acid); }
        .jr-nav-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 7px; }
        .jr-nav-links a {
          color: #d3cfd1;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 999px;
          padding: 8px 10px;
          font-size: 10px;
          font-weight: 900;
          background: rgba(255,255,255,.035);
        }
        .jr-hero { min-height: calc(100svh - 64px); display: grid; align-items: center; border-bottom: 1px solid rgba(255,255,255,.1); }
        .jr-hero-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 28px; align-items: end; padding: 68px 0 62px; }
        .jr-eyebrow, .jr-kicker, .jr-field-label, .jr-output-label {
          color: var(--acid);
          font: 900 11px ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: .15em;
          text-transform: uppercase;
        }
        .jr-title { margin: 16px 0 0; font-size: clamp(57px, 9.5vw, 122px); line-height: .81; letter-spacing: -.072em; }
        .jr-title span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(255,47,146,.78); }
        .jr-lead { max-width: 790px; margin: 26px 0 0; color: #c8c2c6; font-size: clamp(18px, 2vw, 24px); line-height: 1.54; }
        .jr-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 25px; }
        .jr-tag { border: 1px solid rgba(198,255,46,.32); border-radius: 999px; padding: 9px 12px; color: #e8ffc0; background: rgba(198,255,46,.06); font-size: 11px; font-weight: 900; }
        .jr-authority {
          border: 1px solid rgba(255,47,146,.42);
          border-radius: 28px;
          padding: 24px;
          background: linear-gradient(145deg, rgba(255,47,146,.12), rgba(10,9,12,.87));
          box-shadow: 0 30px 90px rgba(0,0,0,.38);
        }
        .jr-authority-line { display: grid; grid-template-columns: 42px 1fr; gap: 13px; align-items: start; padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,.10); }
        .jr-authority-line:last-child { border-bottom: 0; }
        .jr-icon-box { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 14px; color: #09080a; background: var(--acid); }
        .jr-authority-line:nth-child(2) .jr-icon-box { background: var(--amber); }
        .jr-authority-line:nth-child(3) .jr-icon-box { background: var(--magenta); color: white; }
        .jr-authority-line b { display: block; font-size: 17px; }
        .jr-authority-line p { margin: 5px 0 0; color: #aaa3a7; line-height: 1.48; font-size: 13px; }
        .jr-section { position: relative; padding: 76px 0; border-bottom: 1px solid rgba(255,255,255,.09); }
        .jr-section-head { display: grid; grid-template-columns: 1.05fr .95fr; gap: 26px; align-items: end; margin-bottom: 28px; }
        .jr-section h2 { margin: 11px 0 0; font-size: clamp(40px, 6.6vw, 76px); line-height: .91; letter-spacing: -.06em; }
        .jr-section-head p { color: #b8b1b5; font-size: 17px; line-height: 1.65; }
        .jr-reference-grid { display: grid; grid-template-columns: 1.02fr .98fr; gap: 15px; }
        .jr-card {
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 25px;
          background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(8,7,9,.82));
          box-shadow: 0 24px 80px rgba(0,0,0,.28);
          overflow: hidden;
        }
        .jr-player { min-height: 540px; display: flex; flex-direction: column; }
        .jr-player-top { padding: 22px 22px 15px; display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; }
        .jr-player-top h3 { margin: 8px 0 0; font-size: 29px; line-height: 1.02; letter-spacing: -.04em; }
        .jr-live-pill { display: inline-flex; gap: 7px; align-items: center; border: 1px solid rgba(255,47,146,.35); border-radius: 999px; padding: 8px 10px; color: #ffc2df; font-size: 10px; font-weight: 900; white-space: nowrap; }
        .jr-player iframe { width: 100%; min-height: 390px; flex: 1; border: 0; background: #111; }
        .jr-player-footer { padding: 15px 20px 20px; border-top: 1px solid rgba(255,255,255,.09); }
        .jr-button-row { display: flex; flex-wrap: wrap; gap: 9px; }
        .jr-button, .jr-copy, .jr-reset {
          appearance: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid rgba(198,255,46,.36);
          border-radius: 999px;
          min-height: 43px;
          padding: 10px 14px;
          color: #090a07;
          background: var(--acid);
          text-decoration: none;
          font: 900 11px ui-sans-serif, system-ui, sans-serif;
          cursor: pointer;
        }
        .jr-button.secondary, .jr-reset { color: #d9d3d6; background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.18); }
        .jr-boundary { margin: 12px 0 0; color: #8f888c; font-size: 12px; line-height: 1.5; }
        .jr-tracklist { padding: 10px; }
        .jr-tracklist-head { padding: 14px 13px 10px; display: flex; justify-content: space-between; gap: 12px; }
        .jr-tracklist-head b { font-size: 18px; }
        .jr-tracklist-head span { color: #8e878b; font-size: 12px; }
        .jr-track { display: grid; grid-template-columns: 36px 1fr auto; gap: 10px; align-items: center; min-height: 57px; padding: 9px 11px; border-top: 1px solid rgba(255,255,255,.075); border-radius: 13px; }
        .jr-track:hover { background: rgba(255,255,255,.035); }
        .jr-track-no { color: var(--magenta); font: 900 11px ui-monospace, monospace; }
        .jr-track-title { min-width: 0; font-size: 13px; font-weight: 900; letter-spacing: .015em; }
        .jr-track-note { display: block; margin-top: 4px; color: #817b7e; font-size: 10px; font-weight: 700; }
        .jr-track-time { color: #aaa3a7; font: 800 11px ui-monospace, monospace; }
        .jr-dna-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 11px; }
        .jr-dna { min-height: 185px; padding: 19px; border: 1px solid rgba(255,255,255,.13); border-radius: 21px; background: rgba(255,255,255,.035); }
        .jr-dna b { color: var(--amber); font: 900 11px ui-monospace, monospace; }
        .jr-dna p { margin: 45px 0 0; color: #d0c9cd; line-height: 1.52; font-weight: 800; }
        .jr-provisional { margin-top: 14px; border-left: 3px solid var(--amber); padding: 14px 16px; color: #aaa3a7; background: rgba(255,181,46,.055); line-height: 1.58; font-size: 13px; }
        .jr-forge-grid { display: grid; grid-template-columns: .94fr 1.06fr; gap: 16px; align-items: start; }
        .jr-controls, .jr-outputs { border: 1px solid rgba(255,255,255,.14); border-radius: 25px; background: rgba(8,7,9,.72); overflow: hidden; }
        .jr-panel-head { padding: 20px 21px; border-bottom: 1px solid rgba(255,255,255,.10); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .jr-panel-head h3 { margin: 0; font-size: 23px; letter-spacing: -.03em; }
        .jr-panel-head span { color: #8d868a; font-size: 11px; }
        .jr-form { padding: 20px; display: grid; gap: 17px; }
        .jr-field { display: grid; gap: 8px; }
        .jr-field input, .jr-field textarea {
          width: 100%;
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 15px;
          padding: 13px 14px;
          color: #f6f1f4;
          background: rgba(255,255,255,.045);
          outline: none;
          font: 700 14px/1.45 ui-sans-serif, system-ui, sans-serif;
          resize: vertical;
        }
        .jr-field input:focus, .jr-field textarea:focus { border-color: rgba(198,255,46,.62); box-shadow: 0 0 0 3px rgba(198,255,46,.08); }
        .jr-range-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .jr-range-head output { color: var(--acid); font: 900 12px ui-monospace, monospace; }
        .jr-field input[type="range"] { padding: 0; accent-color: var(--acid); }
        .jr-three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .jr-save-note { display: flex; gap: 9px; color: #8e878b; font-size: 11px; line-height: 1.5; }
        .jr-output { padding: 19px 20px; border-bottom: 1px solid rgba(255,255,255,.09); }
        .jr-output:last-child { border-bottom: 0; }
        .jr-output-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 11px; }
        .jr-output pre { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; color: #d6cfd3; font: 650 12px/1.62 ui-monospace, SFMono-Regular, Menlo, monospace; }
        .jr-copy { min-height: 34px; padding: 7px 10px; font-size: 10px; }
        .jr-output.master { background: linear-gradient(135deg, rgba(198,255,46,.075), rgba(255,47,146,.05)); }
        .jr-protocol { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .jr-protocol-card { min-height: 205px; padding: 21px; border: 1px solid rgba(255,255,255,.13); border-radius: 23px; background: rgba(255,255,255,.035); }
        .jr-protocol-card svg { color: var(--acid); }
        .jr-protocol-card h3 { margin: 35px 0 0; font-size: 22px; }
        .jr-protocol-card p { color: #aaa3a7; line-height: 1.58; }
        .jr-closing { padding: 82px 0 92px; }
        .jr-closing-card { border: 1px solid rgba(255,47,146,.36); border-radius: 30px; padding: clamp(27px, 5vw, 48px); background: linear-gradient(145deg, rgba(255,47,146,.11), rgba(8,7,9,.86)); }
        .jr-closing-card strong { display: block; font-size: clamp(46px, 8vw, 94px); line-height: .86; letter-spacing: -.07em; }
        .jr-closing-card strong span { color: var(--acid); }
        .jr-closing-card p { max-width: 780px; color: #b8b1b5; font-size: 18px; line-height: 1.62; }
        .jr-footer { padding: 0 0 48px; color: #777074; font-size: 11px; line-height: 1.65; }
        @media (max-width: 940px) {
          .jr-hero-grid, .jr-section-head, .jr-reference-grid, .jr-forge-grid { grid-template-columns: 1fr; }
          .jr-dna-grid, .jr-protocol { grid-template-columns: repeat(2, 1fr); }
          .jr-player { min-height: 500px; }
        }
        @media (max-width: 680px) {
          .jr-shell { width: min(100% - 22px, 1160px); }
          .jr-nav-inner { min-height: 58px; align-items: flex-start; padding: 9px 0; }
          .jr-brand { padding-top: 8px; font-size: 9px; }
          .jr-nav-links { gap: 5px; }
          .jr-nav-links a { padding: 7px 8px; font-size: 9px; }
          .jr-hero-grid { padding: 50px 0 48px; }
          .jr-title { font-size: clamp(53px, 17vw, 78px); }
          .jr-section { padding: 58px 0; }
          .jr-dna-grid, .jr-protocol, .jr-three { grid-template-columns: 1fr; }
          .jr-dna { min-height: 155px; }
          .jr-dna p { margin-top: 30px; }
          .jr-player { min-height: 470px; }
          .jr-player iframe { min-height: 330px; }
          .jr-player-top { align-items: flex-start; }
          .jr-live-pill { font-size: 9px; }
          .jr-panel-head { align-items: flex-start; }
          .jr-output { padding: 17px 15px; }
          .jr-output pre { font-size: 11px; }
          .jr-closing { padding: 65px 0 72px; }
        }
      `}</style>

      <nav className="jr-nav">
        <div className="jr-shell jr-nav-inner">
          <a className="jr-brand" href="#top">
            NULLWORKS <span>ANVIL</span>
          </a>
          <div className="jr-nav-links">
            <a href="#reference">Listen</a>
            <a href="#dna">DNA</a>
            <a href="#forge">Forge</a>
            <a href="#protocol">Rules</a>
          </div>
        </div>
      </nav>

      <header className="jr-hero" id="top">
        <div className="jr-shell jr-hero-grid">
          <div>
            <div className="jr-eyebrow">ANVIL SOUND FORGE // JASON RAINS</div>
            <h1 className="jr-title">
              JASON HAS
              <span>THE WHEEL.</span>
            </h1>
            <p className="jr-lead">
              A live production cell for original band creation, Suno prompt deconstruction,
              lyrics, violent iteration, and mobile listening. Jason steers the music. Mason
              produces and supervises. ANVIL does the heavy lifting without stealing the wheel.
            </p>
            <div className="jr-tags">
              <span className="jr-tag">HARESCRAMBLE REFERENCE</span>
              <span className="jr-tag">BALTIC FRANTIC</span>
              <span className="jr-tag">SUNO v5.5</span>
              <span className="jr-tag">MOBILE-FIRST</span>
              <span className="jr-tag">ORIGINAL OUTPUT</span>
            </div>
          </div>

          <aside className="jr-authority" aria-label="Session authority">
            <div className="jr-authority-line">
              <div className="jr-icon-box"><Crown size={21} /></div>
              <div><b>Jason Rains — Creative Captain</b><p>Chooses the band, story, sound, vetoes, and final musical direction.</p></div>
            </div>
            <div className="jr-authority-line">
              <div className="jr-icon-box"><SlidersHorizontal size={21} /></div>
              <div><b>Mason Perry — Producer / Supervisor</b><p>Shapes the record, protects continuity, and holds final NULLWORKS authority.</p></div>
            </div>
            <div className="jr-authority-line">
              <div className="jr-icon-box"><WandSparkles size={21} /></div>
              <div><b>ANVIL — Production Workforce</b><p>Deconstructs traits, forges prompts, drafts lyrics, compares generations, and preserves receipts.</p></div>
            </div>
          </aside>
        </div>
      </header>

      <section className="jr-section" id="reference">
        <div className="jr-shell">
          <div className="jr-section-head">
            <div><div className="jr-kicker">SOURCE DECK</div><h2>Hear the starting animal.</h2></div>
            <p>
              Mason supplied one Suno share link and a screenshot of the private ten-song
              HARESCRAMBLE playlist. The player below uses that link directly; the visible track
              titles are preserved exactly as the screenshot exposes them, without inventing the
              truncated endings.
            </p>
          </div>

          <div className="jr-reference-grid">
            <article className="jr-card jr-player">
              <div className="jr-player-top">
                <div>
                  <div className="jr-kicker">SUPPLIED SUNO REFERENCE</div>
                  <h3>HARESCRAMBLE — HATCH THE WORLD</h3>
                </div>
                <span className="jr-live-pill"><Radio size={13} /> LINK-ONLY SOURCE</span>
              </div>
              <iframe
                src={REFERENCE_URL}
                title="Suno reference supplied by Mason Perry"
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
              />
              <div className="jr-player-footer">
                <div className="jr-button-row">
                  <a className="jr-button" href={REFERENCE_URL} target="_blank" rel="noreferrer">
                    <Play size={15} /> Open in Suno <ExternalLink size={14} />
                  </a>
                  <a className="jr-button secondary" href="#forge">
                    <Sparkles size={15} /> Forge Jason's first cut
                  </a>
                </div>
                <p className="jr-boundary">
                  Embedded playback depends on Suno allowing its short share page to load inside
                  another site. The direct button is the verified fallback. Individual links for
                  all ten songs have not yet been supplied.
                </p>
              </div>
            </article>

            <article className="jr-card jr-tracklist">
              <div className="jr-tracklist-head">
                <b>Screenshot manifest</b><span>10 songs · 40 min · private</span>
              </div>
              {tracks.map((track) => (
                <div className="jr-track" key={`${track.number}-${track.duration}`}>
                  <span className="jr-track-no">{track.number}</span>
                  <span className="jr-track-title">
                    {track.title}
                    {track.note ? <small className="jr-track-note">{track.note}</small> : null}
                  </span>
                  <span className="jr-track-time">{track.duration}</span>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>

      <section className="jr-section" id="dna">
        <div className="jr-shell">
          <div className="jr-section-head">
            <div><div className="jr-kicker">PROVISIONAL DECONSTRUCTION</div><h2>Clone the engine, not the license plate.</h2></div>
            <p>
              The working target is an original Baltic-frantic heavy band with manic contrast,
              folk splinters, physical riffs, and surreal storytelling. These are production
              traits, not an instruction to reproduce a real artist's identity, melody, lyrics,
              or recording.
            </p>
          </div>
          <div className="jr-dna-grid">
            {fingerprint.map((item, index) => (
              <article className="jr-dna" key={item}>
                <b>DNA {String(index + 1).padStart(2, "0")}</b>
                <p>{item}</p>
              </article>
            ))}
          </div>
          <div className="jr-provisional">
            <b>Truth boundary:</b> this fingerprint is based on Mason's description, the playlist
            screenshot, and the established HARESCRAMBLE lane. Direct waveform, harmony, tempo,
            arrangement, and vocal analysis remains pending until the actual audio is available to
            the workroom or Jason describes what he hears.
          </div>
        </div>
      </section>

      <section className="jr-section" id="forge">
        <div className="jr-shell">
          <div className="jr-section-head">
            <div><div className="jr-kicker">JASON'S CONTROL BOARD</div><h2>Turn the story into a Suno packet.</h2></div>
            <p>
              Change the fields and the five ANVIL paste blocks rebuild immediately. This draft
              stays in this browser until somebody copies it. Nothing here submits, publishes, or
              changes the source playlist.
            </p>
          </div>

          <div className="jr-forge-grid">
            <section className="jr-controls">
              <div className="jr-panel-head">
                <h3>Creative inputs</h3>
                <button type="button" className="jr-reset" onClick={resetForge}>Reset seed</button>
              </div>
              <div className="jr-form">
                <label className="jr-field">
                  <FieldLabel>Band / session identity</FieldLabel>
                  <input value={forge.bandName} onChange={(event) => update("bandName", event.target.value)} />
                </label>
                <label className="jr-field">
                  <FieldLabel>Song title</FieldLabel>
                  <input value={forge.songTitle} onChange={(event) => update("songTitle", event.target.value)} />
                </label>
                <label className="jr-field">
                  <FieldLabel>What is the song actually about?</FieldLabel>
                  <textarea rows={4} value={forge.subject} onChange={(event) => update("subject", event.target.value)} />
                </label>
                <label className="jr-field">
                  <FieldLabel>Opening image / first impossible picture</FieldLabel>
                  <textarea rows={3} value={forge.openingImage} onChange={(event) => update("openingImage", event.target.value)} />
                </label>
                <label className="jr-field">
                  <FieldLabel>Hook line</FieldLabel>
                  <input value={forge.hook} onChange={(event) => update("hook", event.target.value)} />
                </label>
                <label className="jr-field">
                  <FieldLabel>Visual seed</FieldLabel>
                  <textarea rows={3} value={forge.visualSeed} onChange={(event) => update("visualSeed", event.target.value)} />
                </label>
                <label className="jr-field">
                  <FieldLabel>Vocal behavior</FieldLabel>
                  <textarea rows={3} value={forge.vocal} onChange={(event) => update("vocal", event.target.value)} />
                </label>

                <div className="jr-three">
                  <label className="jr-field">
                    <div className="jr-range-head"><FieldLabel>Chaos</FieldLabel><output>{forge.chaos}</output></div>
                    <input type="range" min="0" max="100" value={forge.chaos} onChange={(event) => update("chaos", Number(event.target.value))} />
                  </label>
                  <label className="jr-field">
                    <div className="jr-range-head"><FieldLabel>Folk color</FieldLabel><output>{forge.folk}</output></div>
                    <input type="range" min="0" max="100" value={forge.folk} onChange={(event) => update("folk", Number(event.target.value))} />
                  </label>
                  <label className="jr-field">
                    <div className="jr-range-head"><FieldLabel>Melody</FieldLabel><output>{forge.melody}</output></div>
                    <input type="range" min="0" max="100" value={forge.melody} onChange={(event) => update("melody", Number(event.target.value))} />
                  </label>
                </div>

                <label className="jr-field">
                  <div className="jr-range-head"><FieldLabel>Tempo target</FieldLabel><output>{forge.tempo} BPM</output></div>
                  <input type="range" min="90" max="220" value={forge.tempo} onChange={(event) => update("tempo", Number(event.target.value))} />
                </label>

                <div className="jr-save-note"><ShieldCheck size={18} /><span>Local browser draft only. Copying is deliberate; publishing is a separate action.</span></div>
              </div>
            </section>

            <section className="jr-outputs">
              <div className="jr-panel-head">
                <h3>ANVIL five-block packet</h3>
                <CopyButton id="all" copied={copied} onCopy={() => copy("all", packet.combined)} />
              </div>

              <div className="jr-output master">
                <div className="jr-output-head"><span className="jr-output-label">1 — Title</span><CopyButton id="title" copied={copied} onCopy={() => copy("title", packet.title)} /></div>
                <pre>{packet.title}</pre>
              </div>
              <div className="jr-output">
                <div className="jr-output-head"><span className="jr-output-label">2 — Suno style prompt</span><CopyButton id="style" copied={copied} onCopy={() => copy("style", packet.style)} /></div>
                <pre>{packet.style}</pre>
              </div>
              <div className="jr-output">
                <div className="jr-output-head"><span className="jr-output-label">3 — Full lyrics with section tags</span><CopyButton id="lyrics" copied={copied} onCopy={() => copy("lyrics", packet.lyrics)} /></div>
                <pre>{packet.lyrics}</pre>
              </div>
              <div className="jr-output">
                <div className="jr-output-head"><span className="jr-output-label">4 — Exclude / negative prompt</span><CopyButton id="exclude" copied={copied} onCopy={() => copy("exclude", packet.exclude)} /></div>
                <pre>{packet.exclude}</pre>
              </div>
              <div className="jr-output">
                <div className="jr-output-head"><span className="jr-output-label">5 — Suggested settings</span><CopyButton id="settings" copied={copied} onCopy={() => copy("settings", packet.settings)} /></div>
                <pre>{packet.settings}</pre>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="jr-section" id="protocol">
        <div className="jr-shell">
          <div className="jr-section-head">
            <div><div className="jr-kicker">PRODUCTION PROTOCOL</div><h2>Fast without losing the source.</h2></div>
            <p>
              Every generation is a test, not a finish line. Jason's reaction is the control
              signal. Mason selects what survives. ANVIL changes one major variable at a time so
              the team can tell why a version improved or failed.
            </p>
          </div>
          <div className="jr-protocol">
            <article className="jr-protocol-card"><Music2 size={25} /><h3>Jason chooses</h3><p>Band identity, story, hook, emotional target, favorite generation, and every creative veto.</p></article>
            <article className="jr-protocol-card"><Gauge size={25} /><h3>Mason produces</h3><p>Controls iteration pressure, compares versions, protects the album lane, and calls the practical next move.</p></article>
            <article className="jr-protocol-card"><Sparkles size={25} /><h3>ANVIL preserves</h3><p>Prompt version, lyrics, settings, source links, selected outputs, failures, corrections, and the reason for each change.</p></article>
          </div>
        </div>
      </section>

      <section className="jr-closing">
        <div className="jr-shell">
          <div className="jr-closing-card">
            <div className="jr-kicker">READY FOR THE FIRST ORDER</div>
            <strong>JASON SAYS <span>WHAT.</span><br />WE FORGE HOW.</strong>
            <p>
              Start with one sentence from Jason: the band name, the first song subject, a story,
              a ridiculous image, or the thing he wants the room to feel. The packet above becomes
              the first controlled generation—not a copy, not a committee, and not a fake finish line.
            </p>
            <div className="jr-button-row">
              <a className="jr-button" href="#forge"><ChevronDown size={16} /> Return to the forge</a>
              <a className="jr-button secondary" href={REFERENCE_URL} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Open reference</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="jr-footer">
        <div className="jr-shell">
          NULLWORKS ANVIL Sound Forge · Jason Rains creative captain · Mason Perry producer and final Human Authority ·
          original production-safe language · source titles preserved as visible · individual Suno links and direct audio analysis pending.
        </div>
      </footer>
    </main>
  );
}
