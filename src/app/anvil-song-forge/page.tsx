"use client";

import { useEffect, useMemo, useState } from "react";

const DESTINATION = "nullworks.ai@gmail.com";
const STORAGE_KEY = "nullworks-anvil-song-forge-v1";

const lanes = [
  {
    title: "Gym Thrash",
    tag: "Workout / Metal",
    audio: "/genre-samples/gym-thrash.mp3",
    vibe: "Fast gym thrash energy, razor guitars, aggressive drums, shouted hook, lifting-room violence.",
  },
  {
    title: "Crew Rap Rock",
    tag: "Creator / Team Hype",
    audio: "/genre-samples/crew-rap-rock.mp3",
    vibe: "Rowdy rap-rock team anthem, punchy drums, distorted guitars, chantable hook, short-form reel energy.",
  },
  {
    title: "Heartland Country",
    tag: "Country / Event",
    audio: "/genre-samples/heartland-country.mp3",
    vibe: "Warm modern country, big emotional chorus, road-tested guitars, human story, event-ready finish.",
  },
  {
    title: "Classic Rock Anthem",
    tag: "Rock / Promo",
    audio: "/genre-samples/classic-rock-anthem.mp3",
    vibe: "Classic rock anthem energy, big guitars, live drums, bold chorus, clean commercial lift.",
  },
  {
    title: "Doom Sludge Cello",
    tag: "Heavy / Cinematic",
    audio: "/genre-samples/doom-sludge-cello.mp3",
    vibe: "Slow heavy doom/sludge weight with cello shadow, dark low-end, cinematic grit, emotional damage.",
  },
  {
    title: "Acoustic Memorial",
    tag: "Emotional / Tribute",
    audio: "/genre-samples/acoustic-memorial.mp3",
    vibe: "Soft acoustic tribute, heartfelt vocal mood, gentle arrangement, memory-focused emotional pacing.",
  },
  {
    title: "Ghost Western",
    tag: "Western / Dark",
    audio: "/genre-samples/ghost-western.mp3",
    vibe: "Dusty ghost-western atmosphere, desert guitar, haunted rhythm, cinematic outlaw tension.",
  },
  {
    title: "Lo-Fi Strange Life",
    tag: "Lo-Fi / Reflective",
    audio: "/genre-samples/lofi-strange-life.mp3",
    vibe: "Lo-fi reflective groove, warm bass, tired human mood, strange-life narration, late-night pacing.",
  },
  {
    title: "Modern Melodic Rap",
    tag: "Rap / Modern",
    audio: "/genre-samples/modern-melodic-rap.mp3",
    vibe: "Modern melodic rap feel, polished drums, emotional vocal rhythm, clean hook-focused structure.",
  },
  {
    title: "Neon Synthwave",
    tag: "Synth / Retro",
    audio: "/genre-samples/neon-synthwave.mp3",
    vibe: "Neon synthwave pulse, retro night-drive atmosphere, glossy motion, cinematic digital glow.",
  },
  {
    title: "Old School Hip-Hop",
    tag: "Hip-Hop / Classic",
    audio: "/genre-samples/old-school-hip-hop.mp3",
    vibe: "Old-school hip-hop bounce, simple drums, confident flow pocket, classic sample-era attitude.",
  },
  {
    title: "Pop Punk Memory",
    tag: "Pop Punk / Nostalgia",
    audio: "/genre-samples/pop-punk-memory.mp3",
    vibe: "Pop-punk memory lane, bright guitars, energetic drums, nostalgic hook, youthful emotional lift.",
  },
  {
    title: "Wedding Soul",
    tag: "Soul / Celebration",
    audio: "/genre-samples/wedding-soul.mp3",
    vibe: "Warm wedding soul, romantic groove, smooth vocal energy, celebration-ready emotional polish.",
  },
];

type FormState = {
  recipient: string;
  subject: string;
  references: string;
  mood: string;
  useCase: string;
  rating: string;
  length: string;
};

const initialForm: FormState = {
  recipient: "",
  subject: "",
  references: "",
  mood: "",
  useCase: "30-second reel",
  rating: "Clean or explicit is fine",
  length: "30 seconds",
};

function translateReferences(text: string) {
  if (!text.trim()) return "Original high-impact music direction based on the user brief.";

  return text
    .replace(/sounds like/gi, "captures the broad energy of")
    .replace(/make it like/gi, "uses broad style reference points from")
    .replace(/same as/gi, "shares a general mood with");
}

export default function AnvilSongForgePage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const savedForm = window.localStorage.getItem(STORAGE_KEY);
    if (savedForm) {
      try {
        setForm({ ...initialForm, ...JSON.parse(savedForm) });
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
    const timer = window.setTimeout(() => setSaved(false), 700);
    return () => window.clearTimeout(timer);
  }, [form]);

  const packet = useMemo(() => {
    const translated = translateReferences(form.references);

    return `NULLWORKS ANVIL / CUTSYNC FORGE PACKET

CLIENT / RECIPIENT
${form.recipient || "Not provided"}

SONG / ASSET SUBJECT
${form.subject || "Not provided"}

HUMAN REFERENCE LANGUAGE
${form.references || "Not provided"}

TRANSLATED PRODUCTION LANGUAGE
${translated}

MOOD / ENERGY
${form.mood || "Not provided"}

USE CASE
${form.useCase}

RATING / CONTENT
${form.rating}

TARGET LENGTH
${form.length}

ANVIL NOTE
User can describe the sound using normal human reference language: artists, bands, songs, eras, scenes, emotions, or “make it feel like...” phrasing. ANVIL turns that into original production-safe style language, prompt structure, negative prompts, and a production packet.

GOBLIN QA NOTE
If this packet is vague, the goblin did not fail. The brief did. Feed it better references.`;
  }, [form]);

  const mailHref = `mailto:${DESTINATION}?subject=${encodeURIComponent(
    "ANVIL Forge Packet"
  )}&body=${encodeURIComponent(packet)}`;

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function useLane(vibe: string) {
    updateField("references", vibe);
    updateField("mood", vibe);
  }

  async function copyPacket() {
    await navigator.clipboard.writeText(packet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  }

  function clearFields() {
    setForm(initialForm);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  async function sendPacket() {
    setSubmitStatus("sending");

    try {
      const response = await fetch("/api/anvil-forge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source: "mason-portfolio/anvil-song-forge",
          destination: DESTINATION,
          form,
          packet
        })
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Packet submit failed");
      }

      setSubmitStatus("sent");
    } catch {
      setSubmitStatus("error");
    }
  }


  return (
    <main className="forge-page">
      <style>{`
        .forge-page {
          min-height: 100vh;
          color: #f8fafc;
          background:
            radial-gradient(circle at 82% 10%, rgba(34, 211, 238, 0.18), transparent 28%),
            radial-gradient(circle at 18% 22%, rgba(99, 102, 241, 0.16), transparent 32%),
            linear-gradient(rgba(255,255,255,.026) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.026) 1px, transparent 1px),
            linear-gradient(180deg, #020617 0%, #07111f 48%, #020617 100%);
          background-size: auto, auto, 46px 46px, 46px 46px, auto;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
          overflow-x: hidden;
        }

        .forge-shell {
          width: min(1180px, calc(100vw - 32px));
          margin: 0 auto;
          padding: 28px 0 56px;
        }

        .forge-nav,
        .forge-card,
        .lane-card {
          border: 1px solid rgba(148, 163, 184, 0.18);
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.88), rgba(2, 6, 23, 0.80));
          box-shadow:
            0 0 0 1px rgba(255,255,255,.035),
            0 0 42px rgba(34, 211, 238, 0.10),
            0 32px 90px rgba(0,0,0,.62);
          backdrop-filter: blur(18px);
        }

        .forge-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          border-radius: 26px;
          padding: 18px 20px;
        }

        .brand-kicker,
        .field-label,
        .lane-tag {
          text-transform: uppercase;
          letter-spacing: .24em;
          font-weight: 900;
          font-size: 11px;
          color: #67e8f9;
        }

        .brand-title {
          margin-top: 4px;
          font-size: 24px;
          font-weight: 950;
          letter-spacing: -.035em;
        }

        .nav-link,
        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.20);
          padding: 12px 16px;
          color: #f8fafc;
          text-decoration: none;
          font-weight: 900;
          background: rgba(15, 23, 42, 0.72);
          cursor: pointer;
        }

        .button.primary {
          color: #020617;
          border-color: rgba(34, 211, 238, 0.42);
          background: linear-gradient(135deg, #22d3ee, #a78bfa);
          box-shadow: 0 18px 48px rgba(34, 211, 238, 0.18);
        }

        .hero {
          margin-top: 22px;
          padding: clamp(28px, 5vw, 58px);
          border-radius: 34px;
          position: relative;
          overflow: hidden;
        }

        .hero:after {
          content: "";
          position: absolute;
          right: -120px;
          top: -120px;
          width: 250px;
          height: 250px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.20), transparent 68%);
          filter: blur(2px);
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(34, 211, 238, 0.30);
          background: rgba(8, 47, 73, 0.42);
          color: #bae6fd;
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 900;
        }

        h1 {
          max-width: 860px;
          margin: 24px 0 18px;
          font-size: clamp(38px, 5.7vw, 72px);
          line-height: 1.02;
          letter-spacing: -.055em;
          font-weight: 920;
          text-wrap: balance;
        }

        .lead {
          max-width: 850px;
          color: rgba(226, 232, 240, 0.74);
          font-size: clamp(17px, 1.8vw, 22px);
          line-height: 1.5;
        }

        .focus {
          margin-top: 26px;
          border-left: 3px solid #22d3ee;
          background: rgba(2, 6, 23, 0.68);
          border-radius: 18px;
          padding: 16px 18px;
          max-width: 760px;
        }

        .focus span {
          display: block;
          color: rgba(186, 230, 253, 0.55);
          text-transform: uppercase;
          letter-spacing: .2em;
          font-size: 11px;
          margin-bottom: 6px;
        }

        .focus strong {
          font-size: 18px;
        }

        .save-note {
          color: rgba(186, 230, 253, 0.74);
          font-size: 13px;
          font-weight: 800;
        }

        .lane-rail {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 22px 2px 18px;
          scroll-snap-type: x mandatory;
        }

        .lane-card {
          min-width: 290px;
          scroll-snap-align: start;
          border-radius: 26px;
          padding: 18px;
          color: #f8fafc;
          text-align: left;
          cursor: pointer;
        }

        .lane-title {
          font-size: 18px;
          font-weight: 950;
        }

        audio {
          width: 100%;
          margin-top: 14px;
          accent-color: #22d3ee;
        }

        .wave {
          height: 44px;
          margin: 14px 0;
          padding: 8px 12px;
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.16);
          background: linear-gradient(90deg, rgba(34,211,238,.13), rgba(168,85,247,.12), rgba(249,115,22,.12));
          display: flex;
          align-items: end;
          gap: 4px;
        }

        .wave span {
          width: 4px;
          border-radius: 999px;
          background: linear-gradient(180deg, #f8fafc, #22d3ee);
        }

        .lane-card p {
          color: rgba(226, 232, 240, 0.72);
          line-height: 1.45;
          font-size: 14px;
        }

        .grid {
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          gap: 20px;
          align-items: start;
        }

        .forge-card {
          border-radius: 30px;
          padding: 24px;
        }

        .field {
          display: block;
          margin-bottom: 15px;
        }

        .field-label {
          display: block;
          margin-bottom: 8px;
        }

        input,
        textarea,
        pre {
          width: 100%;
          border: 1px solid rgba(148, 163, 184, 0.18);
          background: rgba(2, 6, 23, 0.62);
          color: #f8fafc;
          border-radius: 18px;
          padding: 13px 14px;
          font: inherit;
          outline: none;
        }

        input:focus,
        textarea:focus {
          border-color: rgba(34, 211, 238, 0.82);
          box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.13);
        }

        textarea {
          min-height: 116px;
          resize: vertical;
        }

        .mini-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .output-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        h2 {
          margin: 14px 0 0;
          font-size: 34px;
          line-height: .95;
          letter-spacing: -.05em;
          font-weight: 950;
        }

        pre {
          white-space: pre-wrap;
          margin: 0;
          max-height: 520px;
          overflow: auto;
          color: rgba(248,250,252,.78);
          font-size: 13px;
          line-height: 1.55;
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
          align-items: center;
        }

        @media (max-width: 850px) {
          .grid,
          .mini-grid {
            grid-template-columns: 1fr;
          }

          .output-head {
            display: grid;
          }

          h1 {
            font-size: clamp(34px, 11vw, 52px);
          }
        }
      `}</style>

      <section className="forge-shell">
        <nav className="forge-nav">
          <div>
            <div className="brand-kicker">NULLWORKS ANVIL</div>
            <div className="brand-title">Song Forge</div>
          </div>
          <a className="nav-link" href="/">Portfolio</a>
        </nav>

        <section className="forge-card hero">
          <div className="pill">✦ Speak human. We translate to production language.</div>
          <h1>Describe the song like a normal person.</h1>
          <p className="lead">
            Use artists, bands, songs, eras, scenes, moods, and real-world context as shorthand. ANVIL converts messy human language into original production packets for AI music tools, reels, creators, and commercial-style assets.
          </p>
          <div className="focus">
            <span>Product wedge</span>
            <strong>Suno asks users to speak machine. ANVIL lets them speak human first.</strong>
          </div>
        </section>

        <section className="lane-rail">
          {lanes.map((lane, index) => (
            <button className="lane-card" key={lane.title} onClick={() => useLane(lane.vibe)}>
              <div className="lane-title">♫ {lane.title}</div>
              <audio controls preload="metadata" src={lane.audio} onClick={(event) => event.stopPropagation()} />
              <div className="wave">
                {Array.from({ length: 24 }).map((_, bar) => (
                  <span key={bar} style={{ height: `${10 + ((bar * 13 + index * 9) % 30)}px` }} />
                ))}
              </div>
              <p>{lane.vibe}</p>
              <div className="lane-tag">{lane.tag}</div>
            </button>
          ))}
        </section>

        <section className="grid">
          <form className="forge-card" onSubmit={(event) => event.preventDefault()}>
            <Field label="Who is this for?" value={form.recipient} onChange={(value) => updateField("recipient", value)} placeholder="Rider, brand, spouse, team, client..." />
            <Field label="What is the song about?" value={form.subject} onChange={(value) => updateField("subject", value)} placeholder="A downhill teaser, a birthday, a product launch..." />
            <TextField label="Reference artists / bands / songs / vibes" value={form.references} onChange={(value) => updateField("references", value)} placeholder="Say it like a human: artist names, song names, eras, scenes, energy, emotional target..." />
            <TextField label="Mood / energy" value={form.mood} onChange={(value) => updateField("mood", value)} placeholder="Fast, funny, brutal, emotional, premium, heavy, sunny, dark..." />

            <div className="mini-grid">
              <Field label="Use case" value={form.useCase} onChange={(value) => updateField("useCase", value)} placeholder="Reel, ad, anthem..." />
              <Field label="Clean / explicit" value={form.rating} onChange={(value) => updateField("rating", value)} placeholder="Clean or explicit" />
              <Field label="Length" value={form.length} onChange={(value) => updateField("length", value)} placeholder="30 seconds" />
            </div>

            <div className="actions">
              <button className="button" type="button" onClick={clearFields}>Clear fields</button>
              <span className="save-note">{saved ? "Saved. The goblin remembered." : "Auto-saves locally."}</span>
            </div>
          </form>

          <aside className="forge-card">
            <div className="output-head">
              <div>
                <div className="pill">✦ Generated packet</div>
                <h2>Prompt output</h2>
              </div>
              <button className="button primary" type="button" onClick={sendPacket} disabled={submitStatus === "sending"}>{submitStatus === "sending" ? "Sending..." : submitStatus === "sent" ? "Sent" : "Send packet"}</button>
            </div>

            <pre>{packet}</pre>

            <div className="actions">
              <button className="button" onClick={copyPacket} type="button">
                {copied ? "Copied" : "Copy packet"}
              </button>
              <span className="save-note">{submitStatus === "error" ? "Send failed. Backend goblin needs food." : submitStatus === "sent" ? "Packet sent to the forge." : `Submits through ANVIL backend to ${DESTINATION}`}</span>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <textarea value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
