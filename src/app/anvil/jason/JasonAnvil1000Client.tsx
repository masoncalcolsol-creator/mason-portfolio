"use client";

import { Check, Copy, ExternalLink, LockKeyhole, Play, ShieldCheck, TriangleAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const REFERENCE_URL = "https://suno.com/s/hl8Ob81jzr7Y9MPU";
const STORAGE_KEY = "nullworks-jason-anvil-style-1000-v1";
const STYLE_LIMIT = 1000;

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
  subject: "A crew reaches unmapped space and wakes an ancient machine that has been waiting for human voices.",
  hook: "WE FOUND THE DOOR THAT WAS WAITING FOR US",
  vocalTraits: "weathered nasal haunted heavy-metal tenor, ominous theatrical phrasing, eerie sustained notes, dramatic vibrato, unstable character, dark memorable melody",
  guitarTraits: "muscular down-tuned riffs, aggressive palm muting, screaming pinch harmonics, wide vibrato, wah-inflected leads, bluesy pentatonic runs, explosive melodic solos",
  visualSeed: "deep-space exploration, damaged spacecraft, impossible planets, cold stars, ancient alien machinery, cosmic isolation",
  tempo: 168,
  folk: 58,
  melody: 46,
  chaos: 94,
};

function compact(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const boundary = cut.lastIndexOf(" ");
  return `${cut.slice(0, boundary > max * 0.7 ? boundary : max - 1).trim()}…`;
}

function fitStyle(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= STYLE_LIMIT) return clean;
  const cut = clean.slice(0, STYLE_LIMIT - 1);
  const boundary = cut.lastIndexOf(" ");
  return `${cut.slice(0, boundary > 900 ? boundary : STYLE_LIMIT - 1).trim()}…`;
}

function detectUnsafe(text: string) {
  const found = new Set<string>();
  prohibitedChecks.forEach(({ label, expression }) => {
    expression.lastIndex = 0;
    if (expression.test(text)) found.add(label);
  });
  return [...found];
}

function CopyButton({ id, copied, disabled, onCopy }: { id: string; copied: string | null; disabled?: boolean; onCopy: () => void }) {
  const active = copied === id;
  return (
    <button type="button" className="forge-copy" disabled={disabled} onClick={onCopy}>
      {active ? <Check size={15} /> : <Copy size={15} />}
      {active ? "Copied" : "Copy"}
    </button>
  );
}

export default function JasonAnvil1000Client() {
  const [forge, setForge] = useState<ForgeState>(defaultForge);
  const [copied, setCopied] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setForge({ ...defaultForge, ...(JSON.parse(saved) as Partial<ForgeState>) });
    } catch {
      // Local storage is convenience only.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(forge));
    } catch {
      // The forge remains usable without persistence.
    }
  }, [forge, loaded]);

  const packet = useMemo(() => {
    const rawStyle = [
      `Male lead: ${compact(forge.vocalTraits, 190)}.`,
      `Guitars: ${compact(forge.guitarTraits, 195)}.`,
      `Original band: ${compact(forge.bandName, 45)}.`,
      `${forge.tempo} BPM frantic alternative metal; jagged low riffs, asymmetrical accents, abrupt full-band stops, compact sections.`,
      `Folk ${forge.folk}/100: brief crooked brass, fiddle, accordion, hand percussion, or ritual march.`,
      `Melody ${forge.melody}/100: wide singable chorus, then dry rhythmic pressure.`,
      `Chaos ${forge.chaos}/100: false starts and violent contrasts while memorable and playable.`,
      `Visual: ${compact(forge.visualSeed, 120)}.`,
      "Form: cold open; compact verse; pre-chorus rupture; explosive hook; brief folk derailment; altered final chorus; hard stop.",
      "Original composition only; no named imitation or copied melody, lyric, riff, or recording.",
    ].join(" ");

    const stylePrompt = fitStyle(rawStyle);
    const lyrics = `[Cold Open — isolated transmission]\nA dead moon rotates below the glass\nAn impossible signal answers back\n\n[Verse 1 — compact]\n${forge.subject}\nThe gauges bloom in alphabet fire\nA voice returns through a severed wire\n\n[Pre-Chorus — rupture]\nNo map / no god / no signal home\nSomething inside the silence knows\n\n[Chorus — wide]\n${forge.hook}\n${forge.hook}\nWe crossed the dark to name the unknown\nNow the unknown is calling us home\n\n[Folk Derailment — brief]\n[Crooked brass and ritual percussion answer a shouted warning.]\n\n[Final Chorus — altered last line]\n${forge.hook}\nWe crossed the dark to name the unknown\nNow the unknown has opened our home\n\n[Hard Stop]`;
    const exclude = "artist names, vocalist names, guitarist names, band comparisons, clone language, direct imitation, copied melody, copied lyric, copied riff, EDM drops, trap switch, DJ scratches, pop-punk gloss, long intro, unrelated genre montage, fade-out";
    const settings = `Model: Suno v5.5\nTempo: ${forge.tempo} BPM\nWeirdness: ${forge.chaos}%\nStyle prompt: ${stylePrompt.length}/${STYLE_LIMIT} characters\nGenerate two versions before changing lyrics\nTarget duration: 2:50–3:55`;
    const combined = `TITLE\n${forge.songTitle}\n\nSTYLE PROMPT\n${stylePrompt}\n\nFULL LYRICS\n${lyrics}\n\nEXCLUDE\n${exclude}\n\nSETTINGS\n${settings}`;
    const unsafe = detectUnsafe(combined);
    const styleValid = stylePrompt.length <= STYLE_LIMIT;

    return {
      title: forge.songTitle.trim() || "UNTITLED TEST CUT",
      stylePrompt,
      lyrics,
      exclude,
      settings,
      combined,
      unsafe,
      styleValid,
      exportReady: unsafe.length === 0 && styleValid,
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

  return (
    <main className="forge-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        body { margin: 0; background: #05070b; }
        button, a, input, textarea { -webkit-tap-highlight-color: transparent; }
        .forge-page { min-height: 100vh; color: #f7f9fc; background: radial-gradient(circle at 85% 4%, rgba(123,231,255,.15), transparent 28rem), radial-gradient(circle at 6% 42%, rgba(169,149,255,.13), transparent 34rem), #05070b; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
        .forge-shell { width: min(1120px, calc(100% - 24px)); margin: 0 auto; }
        .forge-nav { position: sticky; top: 0; z-index: 20; border-bottom: 1px solid rgba(255,255,255,.1); background: rgba(5,7,11,.86); backdrop-filter: blur(18px); }
        .forge-nav-inner { min-height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .forge-brand { font-size: 11px; font-weight: 950; letter-spacing: .14em; color: white; text-decoration: none; }
        .forge-brand span { color: #7be7ff; }
        .forge-nav a:last-child { color: #d5ff4a; text-decoration: none; font-size: 11px; font-weight: 900; }
        .forge-hero { padding: 70px 0 54px; border-bottom: 1px solid rgba(255,255,255,.09); }
        .forge-kicker, .forge-label { color: #7be7ff; font: 900 11px ui-monospace, monospace; letter-spacing: .14em; text-transform: uppercase; }
        h1 { margin: 15px 0 0; font-size: clamp(55px, 10vw, 112px); line-height: .83; letter-spacing: -.07em; }
        h1 span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(213,255,74,.75); }
        .forge-lead { max-width: 830px; color: #b9c2cf; font-size: clamp(18px, 2vw, 23px); line-height: 1.55; }
        .forge-limit { margin-top: 22px; display: inline-flex; gap: 9px; align-items: center; border: 1px solid rgba(213,255,74,.35); border-radius: 999px; padding: 10px 13px; color: #eaffaa; font-weight: 900; font-size: 12px; background: rgba(213,255,74,.06); }
        .forge-section { padding: 64px 0; border-bottom: 1px solid rgba(255,255,255,.09); }
        .forge-section-head { margin-bottom: 23px; }
        h2 { margin: 10px 0 0; font-size: clamp(39px, 6vw, 68px); line-height: .92; letter-spacing: -.055em; }
        .forge-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: 15px; align-items: start; }
        .forge-card { border: 1px solid rgba(255,255,255,.13); border-radius: 24px; overflow: hidden; background: rgba(8,10,16,.82); }
        .forge-card-head { padding: 18px 19px; border-bottom: 1px solid rgba(255,255,255,.09); display: flex; justify-content: space-between; gap: 12px; align-items: center; }
        .forge-card-head h3 { margin: 0; font-size: 21px; }
        .forge-form { padding: 18px; display: grid; gap: 15px; }
        .forge-field { display: grid; gap: 7px; }
        .forge-field input, .forge-field textarea { width: 100%; border: 1px solid rgba(255,255,255,.14); border-radius: 14px; padding: 12px 13px; background: rgba(255,255,255,.045); color: white; outline: none; font: 700 14px/1.45 ui-sans-serif, system-ui; resize: vertical; }
        .forge-field input:focus, .forge-field textarea:focus { border-color: rgba(123,231,255,.65); box-shadow: 0 0 0 3px rgba(123,231,255,.08); }
        .forge-ranges { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .forge-range-head { display: flex; justify-content: space-between; gap: 8px; }
        .forge-range-head output { color: #d5ff4a; font: 900 12px ui-monospace, monospace; }
        input[type="range"] { padding: 0; accent-color: #7be7ff; }
        .forge-private { border-left: 3px solid #ffbd4a; padding: 13px; background: rgba(255,189,74,.06); color: #b8b0a0; font-size: 12px; line-height: 1.55; }
        .forge-status { padding: 14px 18px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid rgba(255,255,255,.09); font-weight: 900; font-size: 12px; }
        .forge-status.pass { color: #d5ff4a; background: rgba(213,255,74,.055); }
        .forge-status.fail { color: #ffbd4a; background: rgba(255,189,74,.06); }
        .forge-output { padding: 18px; border-bottom: 1px solid rgba(255,255,255,.09); }
        .forge-output:last-child { border-bottom: 0; }
        .forge-output-head { display: flex; justify-content: space-between; gap: 12px; align-items: center; margin-bottom: 11px; }
        .forge-output pre { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; color: #d2d9e2; font: 650 12px/1.6 ui-monospace, monospace; }
        .forge-count { color: #d5ff4a; font: 900 12px ui-monospace, monospace; }
        .forge-copy, .forge-button { appearance: none; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 1px solid rgba(123,231,255,.35); border-radius: 999px; padding: 9px 12px; background: #7be7ff; color: #05070b; font: 900 11px ui-sans-serif, system-ui; cursor: pointer; text-decoration: none; }
        .forge-copy:disabled { opacity: .35; cursor: not-allowed; }
        .forge-player { margin-top: 15px; padding: 18px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; }
        .forge-player p { margin: 0; color: #aeb7c3; line-height: 1.5; }
        .forge-footer { padding: 38px 0 50px; color: #777f8b; font-size: 11px; line-height: 1.6; }
        @media (max-width: 850px) { .forge-grid { grid-template-columns: 1fr; } }
        @media (max-width: 620px) { .forge-ranges { grid-template-columns: 1fr; } .forge-hero { padding-top: 51px; } .forge-card-head { align-items: flex-start; } }
      `}</style>

      <nav className="forge-nav">
        <div className="forge-shell forge-nav-inner">
          <a className="forge-brand" href="#top">NULLWORKS <span>ANVIL</span></a>
          <a href="#forge">1000-CHAR FORGE</a>
        </div>
      </nav>

      <header className="forge-hero" id="top">
        <div className="forge-shell">
          <div className="forge-kicker">JASON RAINS // PROMPT-SAFE PRODUCTION CELL</div>
          <h1>TRAITS IN.<span>1000 OUT.</span></h1>
          <p className="forge-lead">Artist shorthand stays in the private notebook. The exported Suno style prompt is translated into production traits and hard-capped at 1,000 characters.</p>
          <div className="forge-limit"><LockKeyhole size={16} /> HARD LIMIT: {packet.stylePrompt.length}/{STYLE_LIMIT}</div>
        </div>
      </header>

      <section className="forge-section" id="forge">
        <div className="forge-shell">
          <div className="forge-section-head"><div className="forge-kicker">CONTROL BOARD</div><h2>Build the sound without overflowing Suno.</h2></div>
          <div className="forge-grid">
            <section className="forge-card">
              <div className="forge-card-head"><h3>Private references + traits</h3><ShieldCheck size={20} /></div>
              <div className="forge-form">
                <label className="forge-field"><span className="forge-label">Private reference — never exported</span><textarea rows={3} value={forge.privateReference} onChange={(e) => update("privateReference", e.target.value)} placeholder="Human shorthand can contain names here only." /></label>
                <div className="forge-private">This field is stored only in this browser and is architecturally excluded from every Suno block.</div>
                <label className="forge-field"><span className="forge-label">Original band identity</span><input value={forge.bandName} onChange={(e) => update("bandName", e.target.value)} /></label>
                <label className="forge-field"><span className="forge-label">Song title</span><input value={forge.songTitle} onChange={(e) => update("songTitle", e.target.value)} /></label>
                <label className="forge-field"><span className="forge-label">Vocal traits</span><textarea rows={4} value={forge.vocalTraits} onChange={(e) => update("vocalTraits", e.target.value)} /></label>
                <label className="forge-field"><span className="forge-label">Guitar traits</span><textarea rows={4} value={forge.guitarTraits} onChange={(e) => update("guitarTraits", e.target.value)} /></label>
                <label className="forge-field"><span className="forge-label">Visual seed</span><textarea rows={3} value={forge.visualSeed} onChange={(e) => update("visualSeed", e.target.value)} /></label>
                <label className="forge-field"><span className="forge-label">Song subject</span><textarea rows={3} value={forge.subject} onChange={(e) => update("subject", e.target.value)} /></label>
                <label className="forge-field"><span className="forge-label">Hook</span><input value={forge.hook} onChange={(e) => update("hook", e.target.value)} /></label>
                <div className="forge-ranges">
                  {(["tempo", "folk", "melody", "chaos"] as const).map((key) => {
                    const max = key === "tempo" ? 220 : 100;
                    const min = key === "tempo" ? 90 : 0;
                    return <label className="forge-field" key={key}><div className="forge-range-head"><span className="forge-label">{key}</span><output>{forge[key]}{key === "tempo" ? " BPM" : "/100"}</output></div><input type="range" min={min} max={max} value={forge[key]} onChange={(e) => update(key, Number(e.target.value))} /></label>;
                  })}
                </div>
              </div>
            </section>

            <section className="forge-card">
              <div className="forge-card-head"><h3>ANVIL output packet</h3><CopyButton id="all" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("all", packet.combined)} /></div>
              <div className={`forge-status ${packet.exportReady ? "pass" : "fail"}`}>
                {packet.exportReady ? <Check size={17} /> : <TriangleAlert size={17} />}
                {packet.exportReady ? `PASS — style is ${packet.stylePrompt.length}/${STYLE_LIMIT} and name-safe` : `LOCKED — ${packet.unsafe.join(", ") || "style exceeds limit"}`}
              </div>
              <div className="forge-output">
                <div className="forge-output-head"><span className="forge-label">1 — Title</span><CopyButton id="title" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("title", packet.title)} /></div>
                <pre>{packet.title}</pre>
              </div>
              <div className="forge-output">
                <div className="forge-output-head"><span className="forge-label">2 — Style prompt</span><span className="forge-count">{packet.stylePrompt.length}/{STYLE_LIMIT}</span><CopyButton id="style" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("style", packet.stylePrompt)} /></div>
                <pre>{packet.stylePrompt}</pre>
              </div>
              <div className="forge-output">
                <div className="forge-output-head"><span className="forge-label">3 — Full lyrics</span><CopyButton id="lyrics" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("lyrics", packet.lyrics)} /></div>
                <pre>{packet.lyrics}</pre>
              </div>
              <div className="forge-output">
                <div className="forge-output-head"><span className="forge-label">4 — Exclude</span><CopyButton id="exclude" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("exclude", packet.exclude)} /></div>
                <pre>{packet.exclude}</pre>
              </div>
              <div className="forge-output">
                <div className="forge-output-head"><span className="forge-label">5 — Settings</span><CopyButton id="settings" copied={copied} disabled={!packet.exportReady} onCopy={() => copy("settings", packet.settings)} /></div>
                <pre>{packet.settings}</pre>
              </div>
            </section>
          </div>

          <div className="forge-card forge-player">
            <p><strong>Reference deck:</strong> HARESCRAMBLE — HATCH THE WORLD. Open the supplied Suno source separately while shaping the traits.</p>
            <a className="forge-button" href={REFERENCE_URL} target="_blank" rel="noreferrer"><Play size={15} /> Open Suno <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <footer className="forge-footer"><div className="forge-shell">Jason steers · Mason produces · NAMES IN / TRAITS OUT · STYLE HARD-CAPPED AT 1,000 CHARACTERS · no external submission occurs from this page.</div></footer>
    </main>
  );
}
