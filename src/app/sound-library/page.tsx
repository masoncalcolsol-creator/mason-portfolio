import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ANVIL Sound Library | NULLWORKS",
  description:
    "A public listening shelf for original NULLWORKS ANVIL sound systems. Finished audio and approved release links are public; prompts and internal production recipes remain private.",
};

type SoundProfile = {
  number: string;
  title: string;
  project: string;
  lane: string;
  description: string;
  tags: string[];
  href?: string;
  linkLabel?: string;
  state: "released" | "development" | "explicit";
};

const sounds: SoundProfile[] = [
  {
    number: "01",
    title: "Modern Metalcore Engine",
    project: "CROWNROT",
    lane: "Athletic intensity / pressure / comeback",
    description: "Tight modern guitars, hard-earned hooks, workout momentum, bruised confidence, and enough melodic lift to carry an athlete story instead of flattening it into aggression.",
    tags: ["modern metalcore", "training", "comeback", "high energy"],
    href: "https://distrokid.com/hyperfollow/crownrot1/knuckles",
    linkLabel: "Play KNUCKLES",
    state: "released",
  },
  {
    number: "02",
    title: "Groove-Metal Character Comedy",
    project: "CATBARF",
    lane: "Heavy personality / absurd detail / memorable hooks",
    description: "Low-slung groove metal built around highly specific characters and situations. Useful proof that a ridiculous premise can still receive a serious, musically coherent production identity.",
    tags: ["groove metal", "character", "comic", "explicit"],
    href: "https://distrokid.com/hyperfollow/catbarf/poop-zoomies",
    linkLabel: "Play Poop Zoomies",
    state: "explicit",
  },
  {
    number: "03",
    title: "Japanese Memory Folk",
    project: "聞き書き / KIKIGAKI",
    lane: "Human continuity / remembrance / quiet emotional weight",
    description: "Japanese-language music designed around listening before explaining and preserving what disappears when a person, craft, or memory is reduced to a procedure.",
    tags: ["Japanese", "memory", "folk", "continuity"],
    href: "https://distrokid.com/hyperfollow/kikigaki/-kieru-mae-ni-before-it-disappears",
    linkLabel: "Play Before It Disappears",
    state: "released",
  },
  {
    number: "04",
    title: "Japanese Occult Doom",
    project: "BLOOD PAGODA",
    lane: "Slow dread / ritual / cinematic historical darkness",
    description: "Native-Japanese lyrical storytelling over patient 1970s occult-doom weight. Built for atmosphere, consequence, and scenes where speed would destroy the emotional truth.",
    tags: ["doom", "Japanese", "ritual", "cinematic"],
    state: "development",
  },
  {
    number: "05",
    title: "Balkan Alt-Metal / Ska",
    project: "HARESCRAMBLE",
    lane: "Motion / mischief / endurance / community",
    description: "Balkan rhythmic movement, alternative-metal force, ska lift, and storytelling flexible enough for racing, memorial, boating, absurdity, and the strange bonds built around shared motion.",
    tags: ["Balkan", "ska", "alternative metal", "motion"],
    state: "development",
  },
  {
    number: "06",
    title: "Baja Race Rock",
    project: "SILT SERPENT",
    lane: "Dust / machines / desert speed / survival",
    description: "A road-and-race system for heat, mechanical violence, endurance, and the moment a machine and operator stop feeling separate.",
    tags: ["desert", "race", "hard rock", "machines"],
    state: "development",
  },
  {
    number: "07",
    title: "Sonoran Groove-Thrash",
    project: "DESERT FURY",
    lane: "Southwestern force / grit / heat / confrontation",
    description: "Groove-driven thrash with Sonoran scale: dry air, hard edges, physical work, and riffs designed to feel like equipment moving under load.",
    tags: ["thrash", "groove", "Sonoran", "high force"],
    state: "development",
  },
  {
    number: "08",
    title: "Appalachian Bluegrass Storycraft",
    project: "LIMESTONE KIN",
    lane: "Community / place / memory / plainspoken truth",
    description: "Acoustic roots music for local stories, family history, regional pride, humor, and human-scale narratives that should sound carried forward rather than manufactured.",
    tags: ["bluegrass", "Americana", "community", "story"],
    state: "development",
  },
  {
    number: "09",
    title: "Dark Grunge / Sludge",
    project: "MOUNTAIN LORDS",
    lane: "Weight / fatigue / isolation / stubborn survival",
    description: "Slow, damaged, heavy music with grunge abrasion and sludge pressure. A useful lane when polish would make the subject less believable.",
    tags: ["grunge", "sludge", "dark", "slow heavy"],
    state: "development",
  },
  {
    number: "10",
    title: "Doom / Sludge Ritual",
    project: "ASH",
    lane: "Collapse / endurance / elemental atmosphere",
    description: "Sparse, low-tempo doom and sludge built around mass, repetition, and the feeling of something continuing long after comfort has left the room.",
    tags: ["doom", "sludge", "ritual", "atmosphere"],
    state: "development",
  },
  {
    number: "11",
    title: "Extreme Satirical Thrash",
    project: "GODSCROTUM // ONI",
    lane: "Explicit satire / provocation / full-character worldbuilding",
    description: "A deliberately extreme fictional artist project proving that ANVIL can sustain a complete, coherent, release-ready identity across an album. Explicit content and confrontational satire. Placed last intentionally.",
    tags: ["thrash", "satire", "explicit", "album system"],
    href: "https://distrokid.com/hyperfollow/godscrotum/oni-2",
    linkLabel: "Play ONI",
    state: "explicit",
  },
];

export default function SoundLibraryPage() {
  return (
    <main className="library-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #070807; }
        .library-page {
          --green: #a4ff27;
          --violet: #b796ff;
          --paper: #f4f6f1;
          --muted: #aab3a8;
          min-height: 100vh;
          color: var(--paper);
          overflow-x: hidden;
          background:
            radial-gradient(circle at 84% 3%, rgba(183,150,255,.13), transparent 27rem),
            radial-gradient(circle at 7% 24%, rgba(164,255,39,.11), transparent 30rem),
            #070807;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .shell { width: min(1220px, calc(100% - 38px)); margin: 0 auto; }
        .nav { position: sticky; top: 0; z-index: 70; border-bottom: 1px solid rgba(255,255,255,.11); background: rgba(7,8,7,.84); backdrop-filter: blur(18px); }
        .nav-inner { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
        .brand { color: #fff; font-weight: 950; letter-spacing: .13em; font-size: 13px; text-decoration: none; }
        .brand span { color: var(--green); }
        .nav-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
        .nav-links a { color: #c8d0c6; text-decoration: none; border: 1px solid rgba(255,255,255,.14); border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 800; }
        .nav-links a:hover { color: #070807; background: var(--green); border-color: var(--green); }
        .hero { position: relative; min-height: 90svh; display: grid; align-items: center; border-bottom: 1px solid rgba(255,255,255,.11); overflow: hidden; }
        .hero::before, .hero::after { position: absolute; z-index: 0; font-size: clamp(130px, 30vw, 430px); font-weight: 950; line-height: .75; letter-spacing: -.1em; color: rgba(255,255,255,.025); white-space: nowrap; }
        .hero::before { content: "LISTEN"; top: 3%; left: -7vw; transform: rotate(-4deg); }
        .hero::after { content: "RANGE"; right: -14vw; bottom: 2%; transform: rotate(5deg); color: rgba(164,255,39,.035); }
        .hero-content { position: relative; z-index: 2; padding: 88px 0 78px; }
        .eyebrow { color: var(--green); font: 900 12px ui-monospace, monospace; letter-spacing: .18em; text-transform: uppercase; }
        h1 { max-width: 1080px; margin: 18px 0 0; font-size: clamp(62px, 11vw, 145px); line-height: .8; letter-spacing: -.075em; }
        h1 span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(244,246,241,.55); }
        .lead { max-width: 890px; margin-top: 30px; color: #c2cbc0; font-size: clamp(20px, 2.3vw, 27px); line-height: 1.53; }
        .rule { max-width: 880px; margin-top: 30px; border: 1px solid rgba(164,255,39,.34); border-radius: 24px; padding: 20px 22px; background: rgba(164,255,39,.065); color: #c9d1c7; line-height: 1.65; }
        .rule strong { color: var(--green); }
        .chips { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 26px; }
        .chip { border: 1px solid rgba(255,255,255,.13); border-radius: 999px; padding: 8px 11px; color: #aeb7ac; font-size: 12px; }
        .shelf { padding: 78px 0 92px; }
        .shelf-head { display: grid; grid-template-columns: 1.1fr .9fr; gap: 30px; align-items: end; margin-bottom: 32px; }
        .section-label { color: var(--green); font: 900 11px ui-monospace, monospace; letter-spacing: .16em; text-transform: uppercase; }
        h2 { margin: 12px 0 0; font-size: clamp(42px, 6.7vw, 88px); line-height: .92; letter-spacing: -.057em; }
        .shelf-head p { color: #aeb7ac; font-size: 18px; line-height: 1.68; }
        .sound-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .sound-card { position: relative; min-height: 410px; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,.14); border-radius: 28px; padding: 25px; overflow: hidden; background: linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.015)); }
        .sound-card::before { content: attr(data-number); position: absolute; right: -6px; top: -22px; color: rgba(255,255,255,.035); font: 950 150px/.8 ui-monospace, monospace; letter-spacing: -.1em; }
        .sound-card.released { border-color: rgba(164,255,39,.3); }
        .sound-card.explicit { border-color: rgba(183,150,255,.35); }
        .card-top { position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: start; gap: 14px; }
        .state { border-radius: 999px; padding: 8px 10px; font: 900 10px ui-monospace, monospace; letter-spacing: .13em; }
        .state.released { color: var(--green); background: rgba(164,255,39,.09); }
        .state.development { color: #b6bfB4; background: rgba(255,255,255,.06); }
        .state.explicit { color: var(--violet); background: rgba(183,150,255,.09); }
        .project { color: #929d91; font: 900 11px ui-monospace, monospace; letter-spacing: .13em; text-align: right; }
        .sound-card h3 { position: relative; z-index: 2; margin: 34px 0 8px; max-width: 560px; font-size: clamp(34px, 4.3vw, 55px); line-height: .92; letter-spacing: -.05em; }
        .lane { position: relative; z-index: 2; color: var(--green); font-size: 13px; font-weight: 900; line-height: 1.4; }
        .sound-card p { position: relative; z-index: 2; color: #b4bdb2; line-height: 1.66; font-size: 17px; }
        .tags { position: relative; z-index: 2; display: flex; flex-wrap: wrap; gap: 7px; margin-top: auto; padding-top: 22px; }
        .tag { border: 1px solid rgba(255,255,255,.13); border-radius: 999px; padding: 7px 9px; color: #9da79b; font-size: 11px; }
        .action { position: relative; z-index: 2; margin-top: 18px; }
        .play, .pending { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 12px 15px; font-weight: 950; text-decoration: none; }
        .play { color: #070807; background: var(--green); }
        .pending { color: #8f998e; border: 1px solid rgba(255,255,255,.12); }
        .bridge { padding: 86px 0; border-top: 1px solid rgba(255,255,255,.11); background: radial-gradient(circle at 60% 50%, rgba(164,255,39,.09), transparent 34%); }
        .bridge-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 28px; }
        .bridge h2 { max-width: 800px; }
        .bridge-card { border: 1px solid rgba(164,255,39,.3); border-radius: 28px; padding: 26px; background: rgba(164,255,39,.055); }
        .bridge-card strong { display: block; color: var(--green); font-size: 27px; }
        .bridge-card p { color: #b2bcb0; line-height: 1.68; }
        .cta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
        .cta { display: inline-flex; align-items: center; justify-content: center; padding: 13px 17px; border-radius: 999px; background: var(--green); color: #070807; font-weight: 950; text-decoration: none; }
        .cta.secondary { color: var(--green); background: transparent; border: 1px solid rgba(164,255,39,.4); }
        footer { padding: 45px 0 72px; color: #788277; border-top: 1px solid rgba(255,255,255,.1); }
        footer a { color: var(--green); }
        @media (max-width: 900px) {
          .shelf-head, .bridge-grid { grid-template-columns: 1fr; }
          .sound-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .shell { width: min(100% - 26px, 1220px); }
          .nav-inner { align-items: flex-start; padding: 12px 0; }
          .nav-links { gap: 5px; }
          .nav-links a { padding: 7px 9px; font-size: 10px; }
          .hero-content { padding: 60px 0; }
          h1 { font-size: clamp(58px, 18vw, 88px); }
          .shelf, .bridge { padding: 60px 0; }
          .sound-card { min-height: 440px; }
        }
      `}</style>

      <nav className="nav">
        <div className="shell nav-inner">
          <a className="brand" href="/">NULLWORKS <span>ANVIL</span></a>
          <div className="nav-links">
            <a href="/monster-music">Monster concept</a>
            <a href="/anvil-records">Label catalog</a>
            <a href="#library">Browse sounds</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="shell hero-content">
          <div className="eyebrow">PUBLIC LISTENING SHELF // PRIVATE PRODUCTION RECIPES</div>
          <h1>
            Hear the range.
            <span>Keep the engine private.</span>
          </h1>
          <p className="lead">
            A growing library of original sound identities already developed inside NULLWORKS ANVIL. Public visitors can hear approved finished work and understand the production range without receiving the prompts, style recipes, internal lyrics packages, or operating instructions behind it.
          </p>
          <div className="rule">
            <strong>IP boundary:</strong> this page exposes finished audio, public release links, and high-level genre descriptions only. Internal prompt structures, reference stacks, rejected versions, production notes, and continuity records remain private.
          </div>
          <div className="chips">
            <span className="chip">Heavy music</span>
            <span className="chip">Japanese-language work</span>
            <span className="chip">Americana</span>
            <span className="chip">Action sports</span>
            <span className="chip">Character systems</span>
            <span className="chip">Brand-ready custom lanes</span>
          </div>
        </div>
      </header>

      <section className="shelf" id="library">
        <div className="shell">
          <div className="shelf-head">
            <div>
              <div className="section-label">Current sound systems</div>
              <h2>One production engine. Many coherent identities.</h2>
            </div>
            <p>
              Released profiles link to public DistroKid / streaming destinations. Development profiles are included to show the active range; approved listening links can be added without changing the page architecture.
            </p>
          </div>

          <div className="sound-grid">
            {sounds.map((sound) => (
              <article className={`sound-card ${sound.state}`} data-number={sound.number} key={sound.number}>
                <div className="card-top">
                  <span className={`state ${sound.state}`}>
                    {sound.state === "released" ? "PUBLIC RELEASE" : sound.state === "explicit" ? "EXPLICIT / PUBLIC" : "SAMPLE LINK PENDING"}
                  </span>
                  <span className="project">{sound.project}</span>
                </div>
                <h3>{sound.title}</h3>
                <div className="lane">{sound.lane}</div>
                <p>{sound.description}</p>
                <div className="tags">
                  {sound.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
                <div className="action">
                  {sound.href ? (
                    <a className="play" href={sound.href} target="_blank" rel="noreferrer">{sound.linkLabel} ↗</a>
                  ) : (
                    <span className="pending">Approved sample link coming</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bridge">
        <div className="shell bridge-grid">
          <div>
            <div className="section-label">Built to be reused</div>
            <h2>This is the sound layer behind custom athlete, education, and brand systems.</h2>
          </div>
          <article className="bridge-card">
            <strong>The library is evidence, not the product limit.</strong>
            <p>
              ANVIL can create a new original lane around a person, curriculum, campaign, place, product, or event. The public shelf demonstrates range. The operating system controls briefing, comparison, approval, rights, versions, release, and continuity.
            </p>
            <div className="cta-row">
              <a className="cta" href="/monster-music">See the athlete system</a>
              <a className="cta secondary" href="/anvil-records">See the label</a>
            </div>
          </article>
        </div>
      </section>

      <footer>
        <div className="shell">
          NULLWORKS ANVIL // Finished audio can be shared. The production engine stays governed. <a href="mailto:masoncalcolsol@gmail.com?subject=ANVIL%20Sound%20Library">Request a private demo →</a>
        </div>
      </footer>
    </main>
  );
}
