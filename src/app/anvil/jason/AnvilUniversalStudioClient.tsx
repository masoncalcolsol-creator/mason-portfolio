"use client";

import {
  Check,
  Copy,
  ExternalLink,
  LockKeyhole,
  Music2,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const STYLE_LIMIT = 1000;
const LYRICS_LIMIT = 5000;
const STORAGE_KEY = "nullworks-anvil-universal-studio-v1";
const SUNO_URL = "https://suno.com";

const referenceWarnings = [
  { label: "clone language", expression: /\bclone\b/gi },
  { label: "style-of language", expression: /\bin\s+the\s+style\s+of\b/gi },
  { label: "sounds-like language", expression: /\bsounds?\s+like\b/gi },
  { label: "named vocal reference", expression: /\bozzy\s+osbou?rne\b/gi },
  { label: "named guitar reference", expression: /\bzakk\s+w(?:ylde|ilyd)\b/gi },
  { label: "named band reference", expression: /\bsystem\s+of\s+a\s+down\b/gi },
];

type StudioState = {
  privateReference: string;
  projectName: string;
  songTitle: string;
  genreCore: string;
  styleModifiers: string;
  vocalDirection: string;
  instrumentation: string;
  rhythmArrangement: string;
  productionMix: string;
  moodImagery: string;
  songForm: string;
  concept: string;
  hook: string;
  lyrics: string;
  excludeStyles: string;
  language: string;
  tempo: number;
  energy: number;
  melody: number;
  chaos: number;
  weirdness: number;
  styleInfluence: number;
  duration: string;
  instrumental: boolean;
};

const emptyStudio: StudioState = {
  privateReference: "",
  projectName: "NEW PROJECT",
  songTitle: "UNTITLED",
  genreCore: "",
  styleModifiers: "",
  vocalDirection: "",
  instrumentation: "",
  rhythmArrangement: "",
  productionMix: "",
  moodImagery: "",
  songForm: "cold open; verse; pre-chorus; chorus; second verse; bridge; final chorus; hard ending",
  concept: "",
  hook: "",
  lyrics: "",
  excludeStyles: "direct artist imitation; copied melody; copied lyric; copied riff; accidental fade-out",
  language: "English",
  tempo: 120,
  energy: 60,
  melody: 60,
  chaos: 35,
  weirdness: 35,
  styleInfluence: 70,
  duration: "2:50–3:55",
  instrumental: false,
};

const presets: Record<string, Partial<StudioState>> = {
  HEAVY: {
    genreCore: "heavy alternative metal",
    styleModifiers: "tight low-string riffs; dramatic contrast; compact sections; memorable chorus",
    vocalDirection: "powerful character lead with controlled grit; clear verses; wider melodic chorus",
    instrumentation: "down-tuned guitars; bass; live drums; occasional textural percussion",
    rhythmArrangement: "hard stops; syncopated accents; driving pulse; short transition bursts",
    productionMix: "dry punchy drums; wide guitars; centered vocal; controlled low end",
    tempo: 165,
    energy: 90,
    melody: 55,
    chaos: 70,
  },
  ORGANIC: {
    genreCore: "organic acoustic roots music",
    styleModifiers: "human timing; intimate ensemble interplay; vivid storytelling; singable refrain",
    vocalDirection: "warm natural lead; conversational verses; open harmony chorus",
    instrumentation: "acoustic guitar; upright bass; fiddle; mandolin; hand percussion",
    rhythmArrangement: "steady live groove; dynamic lift into chorus; short instrumental answers",
    productionMix: "close-miked room sound; natural transients; minimal processing",
    tempo: 108,
    energy: 58,
    melody: 80,
    chaos: 15,
  },
  ELECTRONIC: {
    genreCore: "experimental electronic music",
    styleModifiers: "evolving synth architecture; physical low end; bold contrast; concise hook",
    vocalDirection: "cool focused lead; rhythmic phrasing; layered chorus textures",
    instrumentation: "analog synths; sequenced bass; electronic drums; granular textures",
    rhythmArrangement: "broken pulse; sudden dropouts; tension builds; precise transitions",
    productionMix: "deep stereo field; detailed transients; saturated low mids; clean sub control",
    tempo: 132,
    energy: 78,
    melody: 55,
    chaos: 62,
  },
  CINEMATIC: {
    genreCore: "cinematic orchestral song",
    styleModifiers: "slow-burn tension; large emotional arc; recurring motif; decisive final lift",
    vocalDirection: "intimate opening lead; controlled vibrato; full soaring final chorus",
    instrumentation: "strings; piano; low brass; percussion; restrained electric guitar textures",
    rhythmArrangement: "measured pulse; layered crescendos; one major midpoint rupture",
    productionMix: "wide orchestral depth; clear vocal focus; powerful but uncluttered low end",
    tempo: 92,
    energy: 68,
    melody: 88,
    chaos: 22,
  },
  MINIMAL: {
    genreCore: "minimal atmospheric music",
    styleModifiers: "negative space; patient repetition; small changes; immersive texture",
    vocalDirection: "close restrained lead; breath detail; sparse phrases",
    instrumentation: "soft synth pad; prepared piano; sub bass; light found percussion",
    rhythmArrangement: "slow pulse; long rests; gradual layer movement; no oversized climax",
    productionMix: "quiet detail; deep ambience; narrow center with selective stereo bloom",
    tempo: 78,
    energy: 28,
    melody: 48,
    chaos: 12,
  },
};

function clean(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function compact(text: string, max: number) {
  const normalized = clean(text);
  if (!normalized || normalized.length <= max) return normalized;
  const cut = normalized.slice(0, max - 1);
  const boundary = cut.lastIndexOf(" ");
  return `${cut.slice(0, boundary > max * 0.7 ? boundary : max - 1).trim()}…`;
}

function buildStylePrompt(parts: string[], suffix: string) {
  const body = clean(parts.filter(Boolean).join(" "));
  const ending = clean(suffix);
  const budget = STYLE_LIMIT - ending.length - 1;
  if (body.length <= budget) return `${body} ${ending}`.trim();
  const cut = body.slice(0, Math.max(0, budget - 1));
  const boundary = cut.lastIndexOf(" ");
  const trimmed = cut.slice(0, boundary > budget * 0.7 ? boundary : Math.max(0, budget - 1)).trim();
  return `${trimmed}… ${ending}`.trim();
}

function detectReferences(text: string) {
  const found = new Set<string>();
  referenceWarnings.forEach(({ label, expression }) => {
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
    <button type="button" className="studio-copy" disabled={disabled} onClick={onCopy}>
      {active ? <Check size={15} /> : <Copy size={15} />}
      {active ? "Copied" : "Copy"}
    </button>
  );
}

export default function AnvilUniversalStudioClient() {
  const [studio, setStudio] = useState<StudioState>(emptyStudio);
  const [copied, setCopied] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setStudio({ ...emptyStudio, ...(JSON.parse(saved) as Partial<StudioState>) });
    } catch {
      // A damaged local draft must never block the studio.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(studio));
    } catch {
      // Local persistence is optional.
    }
  }, [studio, loaded]);

  const packet = useMemo(() => {
    const vocalLead = studio.instrumental
      ? "Instrumental composition; no lead vocalist."
      : `Lead vocalist first: ${compact(studio.vocalDirection || "define voice type, range, timbre, phrasing, and delivery", 180)}.`;

    const stylePrompt = buildStylePrompt(
      [
        vocalLead,
        `Original project identity: ${compact(studio.projectName || "unnamed original project", 55)}.`,
        studio.genreCore ? `Genre core: ${compact(studio.genreCore, 110)}.` : "Genre core: custom original direction.",
        studio.styleModifiers ? `Style: ${compact(studio.styleModifiers, 150)}.` : "Style: define the musical behavior directly.",
        studio.instrumentation ? `Instrumentation: ${compact(studio.instrumentation, 135)}.` : "Instrumentation: chosen for the project.",
        studio.rhythmArrangement ? `Rhythm and arrangement: ${compact(studio.rhythmArrangement, 145)}.` : "Rhythm and arrangement: clear section movement and deliberate transitions.",
        studio.productionMix ? `Production: ${compact(studio.productionMix, 125)}.` : "Production: intentional mix perspective and controlled dynamics.",
        studio.moodImagery ? `Mood and imagery: ${compact(studio.moodImagery, 110)}.` : "Mood and imagery: project-specific.",
        `${studio.tempo} BPM. Energy ${studio.energy}/100; melody ${studio.melody}/100; chaos ${studio.chaos}/100.`,
        studio.songForm ? `Form: ${compact(studio.songForm, 125)}.` : "Form: concise song structure with a decisive ending.",
      ],
      "Original composition only; no named imitation or copied melody, lyric, riff, performance, or recording.",
    );

    const fallbackLyrics = studio.instrumental
      ? "[Instrumental]"
      : `[Verse 1]\n${studio.concept ? `[Write from this concept: ${studio.concept}]` : "[Open with one concrete image or action.]"}\n\n[Pre-Chorus]\n[Raise pressure and narrow the language.]\n\n[Chorus]\n${studio.hook || "[Place the central hook here.]"}\n\n[Verse 2]\n[Complicate the first verse with a new detail or consequence.]\n\n[Bridge]\n[Change perspective or reveal the hidden cost.]\n\n[Final Chorus]\n${studio.hook || "[Return to the hook with one altered final line.]"}\n\n[Hard End]`;

    const lyrics = (studio.lyrics.trim() || fallbackLyrics).slice(0, LYRICS_LIMIT);
    const exclude = clean(studio.excludeStyles || "none specified");
    const settings = [
      "Model: Suno v5.5",
      `Language: ${studio.language || "unspecified"}`,
      `Tempo target: ${studio.tempo} BPM`,
      `Weirdness: ${studio.weirdness}%`,
      `Style influence: ${studio.styleInfluence}%`,
      `Target duration: ${studio.duration || "under four minutes"}`,
      `Style prompt: ${stylePrompt.length}/${STYLE_LIMIT} characters`,
      `Lyrics: ${lyrics.length}/${LYRICS_LIMIT} characters`,
      "Generate two versions before changing the core idea",
      "Compare one variable at a time",
    ].join("\n");

    const referenceScanText = [
      studio.songTitle,
      studio.projectName,
      studio.genreCore,
      studio.styleModifiers,
      studio.vocalDirection,
      studio.instrumentation,
      studio.rhythmArrangement,
      studio.productionMix,
      studio.moodImagery,
      studio.songForm,
      studio.concept,
      studio.hook,
      studio.lyrics,
    ].join(" ");

    const warnings = detectReferences(referenceScanText);
    const styleValid = stylePrompt.length <= STYLE_LIMIT;
    const lyricsValid = lyrics.length <= LYRICS_LIMIT;
    const exportReady = styleValid && lyricsValid;

    const title = studio.songTitle.trim() || "UNTITLED";
    const combined = `TITLE\n${title}\n\nSTYLE PROMPT\n${stylePrompt}\n\nFULL LYRICS\n${lyrics}\n\nEXCLUDE STYLES\n${exclude}\n\nSUGGESTED SETTINGS\n${settings}`;

    return {
      title,
      stylePrompt,
      lyrics,
      exclude,
      settings,
      combined,
      warnings,
      styleValid,
      lyricsValid,
      exportReady,
    };
  }, [studio]);

  function update<K extends keyof StudioState>(key: K, value: StudioState[K]) {
    setStudio((current) => ({ ...current, [key]: value }));
  }

  function applyPreset(name: keyof typeof presets) {
    setStudio((current) => ({ ...current, ...presets[name] }));
  }

  function resetStudio() {
    setStudio(emptyStudio);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // No additional action required.
    }
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

  return (
    <main className="studio-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #050609; }
        button, a, input, textarea, select { -webkit-tap-highlight-color: transparent; }
        .studio-page {
          --cyan: #72e6ff;
          --lime: #d8ff55;
          --violet: #a990ff;
          --amber: #ffbd55;
          min-height: 100vh;
          color: #f7f9fc;
          background:
            radial-gradient(circle at 84% 2%, rgba(114,230,255,.16), transparent 28rem),
            radial-gradient(circle at 8% 38%, rgba(169,144,255,.14), transparent 34rem),
            radial-gradient(circle at 78% 78%, rgba(216,255,85,.08), transparent 32rem),
            linear-gradient(145deg, #050609, #0b0d14 52%, #050609);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .studio-shell { width: min(1180px, calc(100% - 28px)); margin: 0 auto; }
        .studio-nav { position: sticky; top: 0; z-index: 30; border-bottom: 1px solid rgba(255,255,255,.10); background: rgba(5,6,9,.84); backdrop-filter: blur(18px); }
        .studio-nav-inner { min-height: 62px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .studio-brand { color: white; text-decoration: none; font-size: 11px; font-weight: 950; letter-spacing: .15em; }
        .studio-brand span { color: var(--cyan); }
        .studio-nav-links { display: flex; gap: 7px; flex-wrap: wrap; justify-content: flex-end; }
        .studio-nav-links a { color: #d2d8e2; text-decoration: none; border: 1px solid rgba(255,255,255,.13); border-radius: 999px; padding: 8px 10px; font-size: 10px; font-weight: 900; }
        .studio-hero { padding: 76px 0 62px; border-bottom: 1px solid rgba(255,255,255,.09); }
        .studio-hero-grid { display: grid; grid-template-columns: 1.12fr .88fr; gap: 25px; align-items: end; }
        .studio-kicker, .studio-label { color: var(--cyan); font: 900 11px ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .15em; text-transform: uppercase; }
        .studio-title { margin: 16px 0 0; font-size: clamp(56px, 9.7vw, 118px); line-height: .82; letter-spacing: -.073em; }
        .studio-title span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(216,255,85,.77); }
        .studio-lead { max-width: 820px; margin: 26px 0 0; color: #bcc5d1; font-size: clamp(18px, 2vw, 24px); line-height: 1.56; }
        .studio-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 23px; }
        .studio-badge { border: 1px solid rgba(114,230,255,.28); border-radius: 999px; padding: 9px 12px; color: #d9f9ff; background: rgba(114,230,255,.055); font-size: 11px; font-weight: 900; }
        .studio-law { border: 1px solid rgba(216,255,85,.29); border-radius: 27px; padding: 23px; background: linear-gradient(145deg, rgba(216,255,85,.07), rgba(7,8,12,.88)); box-shadow: 0 28px 85px rgba(0,0,0,.34); }
        .studio-law-row { display: grid; grid-template-columns: 43px 1fr; gap: 13px; align-items: start; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.09); }
        .studio-law-row:last-child { border-bottom: 0; }
        .studio-icon { width: 43px; height: 43px; display: grid; place-items: center; border-radius: 14px; background: var(--lime); color: #050609; }
        .studio-law-row:nth-child(2) .studio-icon { background: var(--cyan); }
        .studio-law-row:nth-child(3) .studio-icon { background: var(--violet); }
        .studio-law-row b { display: block; font-size: 16px; }
        .studio-law-row p { margin: 5px 0 0; color: #9fa8b5; font-size: 13px; line-height: 1.5; }
        .studio-section { padding: 72px 0; border-bottom: 1px solid rgba(255,255,255,.09); }
        .studio-section-head { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; align-items: end; margin-bottom: 26px; }
        .studio-section h2 { margin: 10px 0 0; font-size: clamp(40px, 6.2vw, 74px); line-height: .92; letter-spacing: -.06em; }
        .studio-section-head p { color: #adb6c2; font-size: 17px; line-height: 1.65; }
        .studio-presets { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; }
        .studio-preset, .studio-reset, .studio-copy, .studio-link {
          appearance: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid rgba(114,230,255,.32);
          border-radius: 999px;
          padding: 9px 13px;
          color: #050609;
          background: var(--cyan);
          text-decoration: none;
          font: 900 11px ui-sans-serif, system-ui, sans-serif;
          cursor: pointer;
        }
        .studio-preset { color: #dbe2eb; background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.16); }
        .studio-reset { color: #e3e8ef; background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.16); }
        .studio-copy:disabled { opacity: .35; cursor: not-allowed; }
        .studio-grid { display: grid; grid-template-columns: .93fr 1.07fr; gap: 16px; align-items: start; }
        .studio-panel { border: 1px solid rgba(255,255,255,.13); border-radius: 25px; overflow: hidden; background: rgba(7,9,14,.80); }
        .studio-panel-head { padding: 19px 20px; border-bottom: 1px solid rgba(255,255,255,.09); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .studio-panel-head h3 { margin: 0; font-size: 22px; letter-spacing: -.035em; }
        .studio-form { padding: 19px; display: grid; gap: 15px; }
        .studio-field { display: grid; gap: 8px; }
        .studio-field input, .studio-field textarea, .studio-field select {
          width: 100%;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 15px;
          padding: 13px 14px;
          color: #f6f8fb;
          background: rgba(255,255,255,.042);
          outline: none;
          resize: vertical;
          font: 700 14px/1.47 ui-sans-serif, system-ui, sans-serif;
        }
        .studio-field input:focus, .studio-field textarea:focus, .studio-field select:focus { border-color: rgba(114,230,255,.60); box-shadow: 0 0 0 3px rgba(114,230,255,.07); }
        .studio-field.private textarea { border-color: rgba(255,189,85,.28); background: rgba(255,189,85,.035); }
        .studio-field small { color: #7f8996; line-height: 1.45; }
        .studio-check { display: flex; gap: 10px; align-items: center; border: 1px solid rgba(255,255,255,.12); border-radius: 15px; padding: 12px 13px; background: rgba(255,255,255,.03); }
        .studio-check input { width: 20px; height: 20px; accent-color: var(--cyan); }
        .studio-ranges { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .studio-range-head { display: flex; justify-content: space-between; gap: 10px; }
        .studio-range-head output { color: var(--lime); font: 900 12px ui-monospace, monospace; }
        .studio-field input[type="range"] { padding: 0; accent-color: var(--cyan); }
        .studio-status { padding: 14px 18px; display: flex; gap: 10px; align-items: flex-start; border-bottom: 1px solid rgba(255,255,255,.09); }
        .studio-status.pass { color: #eaffae; background: rgba(216,255,85,.055); }
        .studio-status.warn { color: #ffd492; background: rgba(255,189,85,.055); }
        .studio-status b { display: block; font-size: 12px; }
        .studio-status p { margin: 4px 0 0; color: #9fa8b5; font-size: 11px; line-height: 1.45; }
        .studio-output { padding: 18px 19px; border-bottom: 1px solid rgba(255,255,255,.085); }
        .studio-output:last-child { border-bottom: 0; }
        .studio-output-head { display: flex; align-items: center; justify-content: space-between; gap: 11px; margin-bottom: 11px; }
        .studio-output-meta { display: flex; align-items: center; gap: 9px; }
        .studio-count { color: var(--lime); font: 900 12px ui-monospace, monospace; }
        .studio-output pre { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; color: #d3dae4; font: 650 12px/1.62 ui-monospace, SFMono-Regular, Menlo, monospace; }
        .studio-copy { min-height: 34px; padding: 7px 10px; font-size: 10px; }
        .studio-bottom { margin-top: 15px; border: 1px solid rgba(255,255,255,.12); border-radius: 22px; padding: 18px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; background: rgba(255,255,255,.035); }
        .studio-bottom p { margin: 0; max-width: 760px; color: #aab3bf; line-height: 1.55; }
        .studio-footer { padding: 40px 0 52px; color: #747e8a; font-size: 11px; line-height: 1.65; }
        @media (max-width: 940px) {
          .studio-hero-grid, .studio-section-head, .studio-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 680px) {
          .studio-shell { width: min(100% - 20px, 1180px); }
          .studio-nav-inner { min-height: 57px; align-items: flex-start; padding: 8px 0; }
          .studio-brand { padding-top: 8px; font-size: 9px; }
          .studio-nav-links { gap: 4px; }
          .studio-nav-links a { padding: 7px 8px; font-size: 9px; }
          .studio-hero { padding: 52px 0 48px; }
          .studio-title { font-size: clamp(53px, 17vw, 78px); }
          .studio-section { padding: 57px 0; }
          .studio-ranges { grid-template-columns: 1fr; }
          .studio-panel-head { align-items: flex-start; }
          .studio-output { padding: 16px 14px; }
          .studio-output pre { font-size: 11px; }
        }
      `}</style>

      <nav className="studio-nav">
        <div className="studio-shell studio-nav-inner">
          <a className="studio-brand" href="#top">NULLWORKS <span>ANVIL STUDIO</span></a>
          <div className="studio-nav-links">
            <a href="#controls">Controls</a>
            <a href="#packet">Packet</a>
          </div>
        </div>
      </nav>

      <header className="studio-hero" id="top">
        <div className="studio-shell studio-hero-grid">
          <div>
            <div className="studio-kicker">JASON RAINS // UNIVERSAL MUSIC WORKROOM</div>
            <h1 className="studio-title">ANY BAND.<span>ANY STYLE.</span></h1>
            <p className="studio-lead">
              No inherited house sound. Build an original project from the ground up: metal, folk,
              electronic, orchestral, pop, punk, ambient, experimental, instrumental, or a hybrid
              nobody has named yet. Jason steers. Mason produces. ANVIL turns the decisions into a clean Suno packet.
            </p>
            <div className="studio-badges">
              <span className="studio-badge">STYLE ≤ 1000</span>
              <span className="studio-badge">LYRICS ≤ 5000</span>
              <span className="studio-badge">5 PASTE BLOCKS</span>
              <span className="studio-badge">MOBILE-FIRST</span>
              <span className="studio-badge">LOCAL DRAFT</span>
            </div>
          </div>

          <aside className="studio-law">
            <div className="studio-law-row"><div className="studio-icon"><Music2 size={21} /></div><div><b>No preset band identity</b><p>Every project starts from its own name, genre, instruments, voice, structure, and production language.</p></div></div>
            <div className="studio-law-row"><div className="studio-icon"><LockKeyhole size={21} /></div><div><b>Private shorthand stays private</b><p>Human artist references can live in the private note, but that note is never exported.</p></div></div>
            <div className="studio-law-row"><div className="studio-icon"><SlidersHorizontal size={21} /></div><div><b>Warnings do not hijack the studio</b><p>The studio flags reference wording for review but only hard-locks on actual Suno length limits.</p></div></div>
          </aside>
        </div>
      </header>

      <section className="studio-section" id="controls">
        <div className="studio-shell">
          <div className="studio-section-head">
            <div><div className="studio-kicker">FULL CONTROL BOARD</div><h2>Write the identity before the song.</h2></div>
            <p>
              Use a broad quick-start recipe or ignore them and type directly. Every exported field
              is editable. Nothing on this page submits to Suno or publishes externally.
            </p>
          </div>

          <div className="studio-presets">
            {(Object.keys(presets) as Array<keyof typeof presets>).map((name) => (
              <button type="button" className="studio-preset" key={name} onClick={() => applyPreset(name)}>{name}</button>
            ))}
            <button type="button" className="studio-reset" onClick={resetStudio}><RotateCcw size={14} /> Blank studio</button>
          </div>

          <div className="studio-grid">
            <section className="studio-panel">
              <div className="studio-panel-head"><h3>Project and sound controls</h3><ShieldCheck size={20} color="var(--lime)" /></div>
              <div className="studio-form">
                <label className="studio-field private">
                  <span className="studio-label">Private human reference — never exported</span>
                  <textarea rows={3} value={studio.privateReference} onChange={(event) => update("privateReference", event.target.value)} placeholder="Names, comparisons, memories, or shorthand for Jason and Mason only." />
                  <small>This field is stored locally in this browser and is not included in any output block.</small>
                </label>

                <label className="studio-field"><span className="studio-label">Original project / band identity</span><input value={studio.projectName} onChange={(event) => update("projectName", event.target.value)} /></label>
                <label className="studio-field"><span className="studio-label">Song title</span><input value={studio.songTitle} onChange={(event) => update("songTitle", event.target.value)} /></label>
                <label className="studio-check"><input type="checkbox" checked={studio.instrumental} onChange={(event) => update("instrumental", event.target.checked)} /><span><b>Instrumental mode</b><br /><small>Removes vocal direction and exports an instrumental lyrics block.</small></span></label>
                <label className="studio-field"><span className="studio-label">Genre core</span><textarea rows={2} value={studio.genreCore} onChange={(event) => update("genreCore", event.target.value)} placeholder="Any genre, era, regional tradition, or hybrid." /></label>
                <label className="studio-field"><span className="studio-label">Style modifiers</span><textarea rows={3} value={studio.styleModifiers} onChange={(event) => update("styleModifiers", event.target.value)} placeholder="Describe movement, contrast, density, hooks, attitude, and section behavior." /></label>
                {!studio.instrumental ? <label className="studio-field"><span className="studio-label">Lead vocal direction</span><textarea rows={4} value={studio.vocalDirection} onChange={(event) => update("vocalDirection", event.target.value)} placeholder="Voice type, range, timbre, phrasing, aggression, fragility, harmony behavior." /></label> : null}
                <label className="studio-field"><span className="studio-label">Instrumentation</span><textarea rows={3} value={studio.instrumentation} onChange={(event) => update("instrumentation", event.target.value)} placeholder="Core instruments, unusual colors, solos, texture, acoustic or electronic sources." /></label>
                <label className="studio-field"><span className="studio-label">Rhythm and arrangement</span><textarea rows={3} value={studio.rhythmArrangement} onChange={(event) => update("rhythmArrangement", event.target.value)} placeholder="Groove, meter, stop-start behavior, transitions, section length, dynamics." /></label>
                <label className="studio-field"><span className="studio-label">Production and mix</span><textarea rows={3} value={studio.productionMix} onChange={(event) => update("productionMix", event.target.value)} placeholder="Dry or wet, raw or polished, room sound, stereo width, low-end behavior, vocal placement." /></label>
                <label className="studio-field"><span className="studio-label">Mood and imagery</span><textarea rows={3} value={studio.moodImagery} onChange={(event) => update("moodImagery", event.target.value)} placeholder="Emotional temperature, setting, visual seed, color, weather, physical texture." /></label>
                <label className="studio-field"><span className="studio-label">Song form</span><textarea rows={3} value={studio.songForm} onChange={(event) => update("songForm", event.target.value)} /></label>
                <label className="studio-field"><span className="studio-label">Song concept</span><textarea rows={3} value={studio.concept} onChange={(event) => update("concept", event.target.value)} placeholder="What is the song actually about?" /></label>
                <label className="studio-field"><span className="studio-label">Hook line</span><input value={studio.hook} onChange={(event) => update("hook", event.target.value)} placeholder="The central line or phrase." /></label>
                <label className="studio-field"><span className="studio-label">Full lyrics</span><textarea rows={16} value={studio.lyrics} maxLength={LYRICS_LIMIT} onChange={(event) => update("lyrics", event.target.value)} placeholder="Write or paste the complete lyrics here. Leave blank to export a neutral section template from the concept and hook." /><small>{studio.lyrics.length}/{LYRICS_LIMIT} characters</small></label>
                <label className="studio-field"><span className="studio-label">Exclude styles — one line</span><input value={studio.excludeStyles} onChange={(event) => update("excludeStyles", event.target.value)} /></label>

                <div className="studio-ranges">
                  {(["tempo", "energy", "melody", "chaos", "weirdness", "styleInfluence"] as const).map((key) => {
                    const isTempo = key === "tempo";
                    return (
                      <label className="studio-field" key={key}>
                        <div className="studio-range-head"><span className="studio-label">{key === "styleInfluence" ? "style influence" : key}</span><output>{studio[key]}{isTempo ? " BPM" : "/100"}</output></div>
                        <input type="range" min={isTempo ? 45 : 0} max={isTempo ? 240 : 100} value={studio[key]} onChange={(event) => update(key, Number(event.target.value))} />
                      </label>
                    );
                  })}
                </div>

                <label className="studio-field"><span className="studio-label">Language</span><input value={studio.language} onChange={(event) => update("language", event.target.value)} /></label>
                <label className="studio-field"><span className="studio-label">Target duration</span><input value={studio.duration} onChange={(event) => update("duration", event.target.value)} /></label>
              </div>
            </section>

            <section className="studio-panel" id="packet">
              <div className="studio-panel-head"><h3>ANVIL five-block packet</h3><CopyButton id="all" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("all", packet.combined)} /></div>

              <div className={`studio-status ${packet.exportReady ? "pass" : "warn"}`}>
                {packet.exportReady ? <Check size={17} /> : <TriangleAlert size={17} />}
                <div><b>{packet.exportReady ? "LENGTH GATES: PASS" : "LENGTH GATE: BLOCKED"}</b><p>Style {packet.stylePrompt.length}/{STYLE_LIMIT} · Lyrics {packet.lyrics.length}/{LYRICS_LIMIT}</p></div>
              </div>

              {packet.warnings.length > 0 ? (
                <div className="studio-status warn"><TriangleAlert size={17} /><div><b>REFERENCE WORDING REVIEW</b><p>{packet.warnings.join(" · ")}. This is advisory only; move human shorthand into the private note before pasting into Suno.</p></div></div>
              ) : (
                <div className="studio-status pass"><ShieldCheck size={17} /><div><b>REFERENCE SCAN: CLEAR</b><p>No known artist-comparison shorthand was found in the export-bearing fields.</p></div></div>
              )}

              <div className="studio-output">
                <div className="studio-output-head"><span className="studio-label">1 — Title</span><CopyButton id="title" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("title", packet.title)} /></div>
                <pre>{packet.title}</pre>
              </div>
              <div className="studio-output">
                <div className="studio-output-head"><span className="studio-label">2 — Style prompt</span><div className="studio-output-meta"><span className="studio-count">{packet.stylePrompt.length}/{STYLE_LIMIT}</span><CopyButton id="style" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("style", packet.stylePrompt)} /></div></div>
                <pre>{packet.stylePrompt}</pre>
              </div>
              <div className="studio-output">
                <div className="studio-output-head"><span className="studio-label">3 — Full lyrics</span><div className="studio-output-meta"><span className="studio-count">{packet.lyrics.length}/{LYRICS_LIMIT}</span><CopyButton id="lyrics" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("lyrics", packet.lyrics)} /></div></div>
                <pre>{packet.lyrics}</pre>
              </div>
              <div className="studio-output">
                <div className="studio-output-head"><span className="studio-label">4 — Exclude styles</span><CopyButton id="exclude" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("exclude", packet.exclude)} /></div>
                <pre>{packet.exclude}</pre>
              </div>
              <div className="studio-output">
                <div className="studio-output-head"><span className="studio-label">5 — Suggested settings</span><CopyButton id="settings" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("settings", packet.settings)} /></div>
                <pre>{packet.settings}</pre>
              </div>
            </section>
          </div>

          <div className="studio-bottom">
            <p><strong>Workflow:</strong> define the project · shape the style · write or paste lyrics · copy the five blocks · generate two versions · compare one variable at a time.</p>
            <a className="studio-link" href={SUNO_URL} target="_blank" rel="noreferrer"><Sparkles size={15} /> Open Suno <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <footer className="studio-footer">
        <div className="studio-shell">Jason steers · Mason produces and supervises · universal original-music studio · private references never exported · style capped at 1,000 characters · lyrics capped at 5,000 characters.</div>
      </footer>
    </main>
  );
}
