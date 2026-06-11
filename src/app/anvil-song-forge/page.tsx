"use client";

import { useMemo, useState } from "react";

const DESTINATION = "nullworks.ai@gmail.com";

const lanes = [
  {
    title: "MTB Hype Reel",
    tag: "Action Sports",
    vibe: "Fast downhill edit, aggressive drums, distorted guitars, urgent rap-rock vocal energy, sponsor-safe action-sports pacing.",
  },
  {
    title: "Country Encore",
    tag: "Mainstream Country",
    vibe: "Big modern country concert closer, warm guitars, huge chorus, emotional crowd-sing ending.",
  },
  {
    title: "Workout Metal",
    tag: "Gym / Pump",
    vibe: "Heavy modern metalcore, thick low guitars, live drums, short shouted hook, gym-war energy.",
  },
  {
    title: "Bluegrass Doom",
    tag: "Roots / Cinematic",
    vibe: "Appalachian acoustic instruments, family harmony, low dark electric guitar underneath, cinematic sadness.",
  },
  {
    title: "Firehouse Rap Rock",
    tag: "Reels / PR",
    vibe: "Public-safety hype reel, clean heroic energy, punchy rhythm, quick cuts, rowdy but PR-safe.",
  },
  {
    title: "Lo-Fi Sad Dad",
    tag: "Emotional",
    vibe: "Warm bass, dusty groove, tired reflective mood, late-night emotional pacing.",
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
User can describe the sound using normal human reference language: artists, bands, songs, eras, scenes, emotions, or “make it feel like...” phrasing. ANVIL turns that into original production-safe style language, prompt structure, negative prompts, and a production packet.`;
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

  return (
    <main className="forge-page">
      <style>{`
        .forge-page {
          min-height: 100vh;
          color: #fff7ed;
          background:
            radial-gradient(circle at 18% 8%, rgba(249, 115, 22, 0.28), transparent 34%),
            radial-gradient(circle at 85% 18%, rgba(251, 191, 36, 0.12), transparent 28%),
            linear-gradient(rgba(255,255,255,.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.028) 1px, transparent 1px),
            linear-gradient(180deg, #151922 0%, #090b10 52%, #040506 100%);
          background-size: auto, auto, 44px 44px, 44px 44px, auto;
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
          border: 1px solid rgba(255, 247, 237, 0.11);
          background: linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.035));
          box-shadow: 0 28px 90px rgba(0,0,0,.45);
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
          letter-spacing: .26em;
          font-weight: 900;
          font-size: 11px;
          color: #fdba74;
        }

        .brand-title {
          margin-top: 4px;
          font-size: 24px;
          font-weight: 950;
          letter-spacing: -.04em;
        }

        .nav-link,
        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 999px;
          border: 1px solid rgba(255,247,237,.14);
          padding: 12px 16px;
          color: #fff7ed;
          text-decoration: none;
          font-weight: 900;
          background: rgba(255,255,255,.06);
          cursor: pointer;
        }

        .button.primary {
          color: #111827;
          border-color: rgba(251,146,60,.35);
          background: linear-gradient(180deg, #fed7aa, #fb923c);
          box-shadow: 0 18px 45px rgba(249,115,22,.22);
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
          right: -90px;
          top: -90px;
          width: 250px;
          height: 250px;
          border-radius: 999px;
          background: rgba(249,115,22,.18);
          filter: blur(2px);
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(251,146,60,.25);
          background: rgba(124,45,18,.28);
          color: #fed7aa;
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 900;
        }

        h1 {
          max-width: 900px;
          margin: 24px 0 18px;
          font-size: clamp(44px, 7vw, 86px);
          line-height: .9;
          letter-spacing: -.075em;
          font-weight: 950;
        }

        .lead {
          max-width: 850px;
          color: rgba(255,247,237,.72);
          font-size: clamp(18px, 2vw, 23px);
          line-height: 1.42;
        }

        .focus {
          margin-top: 26px;
          border-left: 3px solid #fb923c;
          background: rgba(0,0,0,.24);
          border-radius: 18px;
          padding: 16px 18px;
          max-width: 760px;
        }

        .focus span {
          display: block;
          color: rgba(255,247,237,.45);
          text-transform: uppercase;
          letter-spacing: .2em;
          font-size: 11px;
          margin-bottom: 6px;
        }

        .focus strong {
          font-size: 18px;
        }

        .lane-rail {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 22px 2px 18px;
          scroll-snap-type: x mandatory;
        }

        .lane-card {
          min-width: 280px;
          scroll-snap-align: start;
          border-radius: 26px;
          padding: 18px;
          color: #fff7ed;
          text-align: left;
          cursor: pointer;
        }

        .lane-title {
          font-size: 18px;
          font-weight: 950;
        }

        .wave {
          height: 58px;
          margin: 16px 0;
          padding: 10px 12px;
          border-radius: 16px;
          border: 1px solid rgba(255,247,237,.1);
          background: linear-gradient(90deg, rgba(249,115,22,.12), rgba(255,255,255,.07), rgba(249,115,22,.22));
          display: flex;
          align-items: end;
          gap: 4px;
        }

        .wave span {
          width: 4px;
          border-radius: 999px;
          background: rgba(253,186,116,.85);
        }

        .lane-card p {
          color: rgba(255,247,237,.62);
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
        textarea {
          width: 100%;
          border: 1px solid rgba(255,247,237,.12);
          background: rgba(255,255,255,.06);
          color: #fff7ed;
          border-radius: 18px;
          padding: 13px 14px;
          font: inherit;
          outline: none;
        }

        input:focus,
        textarea:focus {
          border-color: rgba(251,146,60,.8);
          box-shadow: 0 0 0 4px rgba(251,146,60,.14);
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
          border: 1px solid rgba(255,247,237,.10);
          background: rgba(0,0,0,.36);
          color: rgba(255,247,237,.76);
          border-radius: 24px;
          padding: 18px;
          font-size: 13px;
          line-height: 1.55;
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        @media (max-width: 850px) {
          .grid,
          .mini-grid {
            grid-template-columns: 1fr;
          }

          .output-head {
            display: grid;
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
          <h1>Describe the song the way normal people actually talk.</h1>
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
              <div className="wave">
                {Array.from({ length: 24 }).map((_, bar) => (
                  <span key={bar} style={{ height: `${10 + ((bar * 13 + index * 9) % 36)}px` }} />
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
          </form>

          <aside className="forge-card">
            <div className="output-head">
              <div>
                <div className="pill">✦ Generated packet</div>
                <h2>Prompt output</h2>
              </div>
              <a className="button primary" href={mailHref}>Send packet</a>
            </div>

            <pre>{packet}</pre>

            <div className="actions">
              <button className="button" onClick={copyPacket} type="button">
                {copied ? "Copied" : "Copy packet"}
              </button>
              <a className="button" href={mailHref}>Email to {DESTINATION}</a>
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
