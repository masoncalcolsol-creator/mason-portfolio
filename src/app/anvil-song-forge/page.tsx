"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Copy, Mail, Music2, Sparkles, Wand2 } from "lucide-react";

const DESTINATION = "nullworks.ai@gmail.com";

const sampleLanes = [
  {
    title: "MTB Hype Reel",
    vibe: "fast downhill edit, aggressive drums, distorted guitars, urgent rap-rock vocal energy, sponsor-safe action-sports pacing",
    tag: "Action sports",
  },
  {
    title: "Country Encore",
    vibe: "big modern country concert closer, warm guitars, huge chorus, emotional crowd-sing ending",
    tag: "Mainstream country",
  },
  {
    title: "Workout Metal",
    vibe: "heavy modern metalcore, thick low guitars, live drums, short shouted hook, gym-war energy",
    tag: "Gym / pump",
  },
  {
    title: "Bluegrass Doom",
    vibe: "Appalachian acoustic instruments, family harmony, low dark electric guitar underneath, cinematic sadness",
    tag: "Roots / cinematic",
  },
  {
    title: "Firehouse Rap Rock",
    vibe: "public-safety hype reel, clean heroic energy, punchy rhythm, quick cuts, rowdy but PR-safe",
    tag: "Reels / PR",
  },
  {
    title: "Lo-Fi Sad Dad",
    vibe: "warm bass, dusty groove, tired reflective mood, late-night emotional pacing",
    tag: "Emotional",
  },
];

type FormState = {
  name: string;
  topic: string;
  references: string;
  mood: string;
  useCase: string;
  rating: string;
  length: string;
};

const initialForm: FormState = {
  name: "",
  topic: "",
  references: "",
  mood: "",
  useCase: "30-second reel",
  rating: "Clean or explicit is fine",
  length: "30 seconds",
};

function translateReferenceLanguage(text: string) {
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
    const translated = translateReferenceLanguage(form.references);

    return `NULLWORKS ANVIL / CUTSYNC FORGE PACKET\n\nCLIENT / RECIPIENT\n${form.name || "Not provided"}\n\nSONG / ASSET SUBJECT\n${form.topic || "Not provided"}\n\nHUMAN REFERENCE LANGUAGE\n${form.references || "Not provided"}\n\nTRANSLATED PRODUCTION LANGUAGE\n${translated}\n\nMOOD / ENERGY\n${form.mood || "Not provided"}\n\nUSE CASE\n${form.useCase}\n\nRATING / CONTENT\n${form.rating}\n\nTARGET LENGTH\n${form.length}\n\nANVIL NOTE\nThe user is allowed to describe the sound using normal human reference language: artists, bands, eras, scenes, songs, emotions, or “make it feel like...” phrasing. ANVIL turns that into original production-safe style language, prompt structure, negative prompts, and a production packet.`;
  }, [form]);

  const mailHref = `mailto:${DESTINATION}?subject=${encodeURIComponent(
    "ANVIL Forge Packet"
  )}&body=${encodeURIComponent(packet)}`;

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function useSample(vibe: string) {
    updateField("references", vibe);
    updateField("mood", vibe);
  }

  async function copyPacket() {
    await navigator.clipboard.writeText(packet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="min-h-screen bg-[#07080a] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,.08),transparent_32%)]" />

      <section className="relative mx-auto max-w-7xl px-6 py-8 md:py-12">
        <nav className="flex items-center justify-between border border-white/10 bg-white/[.04] rounded-3xl px-5 py-4 backdrop-blur">
          <div>
            <div className="text-sm uppercase tracking-[0.35em] text-orange-300">NULLWORKS ANVIL</div>
            <div className="text-xl font-black">Song Forge</div>
          </div>
          <a className="btn ghost" href="/">Portfolio</a>
        </nav>

        <section className="card hero mt-8">
          <div className="pill"><Sparkles size={16} /> Speak human. We translate to production language.</div>
          <h1>Describe the song the way normal people actually talk.</h1>
          <p className="lead">
            Use artists, bands, songs, eras, scenes, moods, and real-world context as shorthand. ANVIL converts messy human language into original production packets for AI music tools, reels, creators, and commercial-style assets.
          </p>
          <div className="focus-box">
            <span>Product wedge</span>
            <strong>Suno asks users to speak machine. ANVIL lets them speak human first.</strong>
          </div>
        </section>

        <section className="mt-6">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {sampleLanes.map((lane) => (
              <button
                key={lane.title}
                onClick={() => useSample(lane.vibe)}
                className="min-w-[270px] snap-start text-left border border-white/10 bg-white/[.05] hover:bg-white/[.08] rounded-3xl p-5 transition"
              >
                <div className="flex items-center gap-3 text-orange-200 font-black">
                  <Music2 size={18} /> {lane.title}
                </div>
                <div className="mt-4 h-14 rounded-2xl bg-[linear-gradient(90deg,rgba(249,115,22,.15),rgba(255,255,255,.08),rgba(249,115,22,.2))] border border-white/10 flex items-end gap-1 px-3 pb-3">
                  {Array.from({ length: 22 }).map((_, index) => (
                    <span
                      key={index}
                      className="w-1 rounded-full bg-orange-200/70"
                      style={{ height: `${12 + ((index * 17) % 34)}px` }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm text-white/60 leading-6">{lane.vibe}</p>
                <div className="mt-4 text-xs uppercase tracking-[.2em] text-orange-300">{lane.tag}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-[.9fr_1.1fr] gap-6 mt-4">
          <form className="card p-6 md:p-8 space-y-4" onSubmit={(event) => event.preventDefault()}>
            <Field label="Who is this for?" value={form.name} onChange={(value) => updateField("name", value)} placeholder="Rider, brand, spouse, team, client..." />
            <Field label="What is the song about?" value={form.topic} onChange={(value) => updateField("topic", value)} placeholder="A downhill teaser, a birthday, a product launch..." />
            <TextField label="Reference artists / bands / songs / vibes" value={form.references} onChange={(value) => updateField("references", value)} placeholder="Say it like a human: artist names, song names, eras, scenes, energy, emotional target..." />
            <TextField label="Mood / energy" value={form.mood} onChange={(value) => updateField("mood", value)} placeholder="Fast, funny, brutal, emotional, premium, heavy, sunny, dark..." />
            <div className="grid md:grid-cols-3 gap-3">
              <Field label="Use case" value={form.useCase} onChange={(value) => updateField("useCase", value)} placeholder="Reel, ad, anthem..." />
              <Field label="Clean / explicit" value={form.rating} onChange={(value) => updateField("rating", value)} placeholder="Clean or explicit" />
              <Field label="Length" value={form.length} onChange={(value) => updateField("length", value)} placeholder="30 seconds" />
            </div>
          </form>

          <aside className="card p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="pill"><Wand2 size={16} /> Generated packet</div>
                <h2 className="mt-4 text-3xl font-black tracking-[-.04em]">Prompt output</h2>
              </div>
              <a className="btn primary" href={mailHref}><Mail size={17} /> Send</a>
            </div>

            <pre className="mt-5 whitespace-pre-wrap rounded-3xl border border-white/10 bg-black/35 p-5 text-sm leading-6 text-white/75 overflow-auto max-h-[520px]">{packet}</pre>

            <div className="flex flex-wrap gap-3 mt-5">
              <button className="btn secondary" onClick={copyPacket} type="button">
                <Copy size={17} /> {copied ? "Copied" : "Copy packet"}
              </button>
              <a className="btn ghost" href={mailHref}>Email to {DESTINATION} <ArrowRight size={17} /></a>
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
    <label className="block">
      <span className="text-xs uppercase tracking-[.18em] text-orange-200 font-black">{label}</span>
      <input
        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[.06] px-4 py-3 text-white outline-none focus:border-orange-300"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
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
    <label className="block">
      <span className="text-xs uppercase tracking-[.18em] text-orange-200 font-black">{label}</span>
      <textarea
        className="mt-2 min-h-[110px] w-full rounded-2xl border border-white/10 bg-white/[.06] px-4 py-3 text-white outline-none focus:border-orange-300"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
