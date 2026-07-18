import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monster Athlete Music System | NULLWORKS ANVIL",
  description:
    "An independent concept for a Monster-owned athlete music program: custom licensed sound identities, athlete-guided genre development, scalable production, rights controls, and measurable reuse.",
};

const workflow = [
  {
    number: "01",
    label: "ATHLETE SIGNAL",
    title: "Start with the athlete, not a stock track.",
    body: "Capture the athlete’s story, sport, language, tempo, emotional target, favorite production traits, and the moments the music must serve: walkout, highlight reel, launch, documentary, training edit, or live event.",
  },
  {
    number: "02",
    label: "RAPID DIRECTIONS",
    title: "Generate distinct genre directions in seconds.",
    body: "ANVIL can present multiple original sound directions before the expensive part begins. The athlete hears the difference, selects the lane, rejects what feels false, and keeps control of the identity attached to their name.",
  },
  {
    number: "03",
    label: "HUMAN PRODUCTION",
    title: "Turn the chosen direction into a release-ready asset.",
    body: "The production layer develops the song, lyrics, arrangement, artwork direction, versions, clean edits, stems, and usage package. Human review remains final. Generation speed is useful; acceptance is the product.",
  },
  {
    number: "04",
    label: "RIGHTS + AUTHORITY",
    title: "Define who can use what, where, and for how long.",
    body: "Each release receives an explicit rights and authority map: athlete approval, brand usage, social distribution, campaign term, territories, event use, edit permissions, takedown path, and ownership structure negotiated in the final agreement.",
  },
  {
    number: "05",
    label: "DISTRIBUTE + LEARN",
    title: "Let one sound identity travel across the athlete ecosystem.",
    body: "Publish approved music through public streaming links and deploy campaign versions across social edits, events, product launches, documentaries, and recurring athlete content. Track reuse, response, failure, and which sound choices actually fit.",
  },
];

const useCases = [
  "Athlete walkout and entrance music",
  "Race, ride, fight, and training edits",
  "Signature social audio for recurring content",
  "Product and equipment launches",
  "Event trailers and live venue packages",
  "Documentary and origin-story themes",
  "Regional and multilingual versions",
  "Seasonal roster compilations",
];

const controls = [
  "Athlete approval remains explicit",
  "No prompt or production recipe is exposed publicly",
  "Only original or properly licensed material enters the release path",
  "Brand authority and athlete authority are separately defined",
  "Clean, instrumental, short-form, and event edits are versioned",
  "Failures, rejections, and rights limits remain visible",
];

export default function MonsterMusicPage() {
  return (
    <main className="monster-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #050706; }
        .monster-page {
          --green: #97ff16;
          --green-soft: rgba(151,255,22,.16);
          --ink: #050706;
          --paper: #f3f6ef;
          --muted: #aeb8ad;
          min-height: 100vh;
          color: var(--paper);
          overflow-x: hidden;
          background:
            radial-gradient(circle at 78% 4%, rgba(151,255,22,.14), transparent 28rem),
            radial-gradient(circle at 15% 42%, rgba(151,255,22,.07), transparent 31rem),
            #050706;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .shell { width: min(1180px, calc(100% - 38px)); margin: 0 auto; }
        .nav { position: sticky; top: 0; z-index: 80; border-bottom: 1px solid rgba(255,255,255,.11); background: rgba(5,7,6,.82); backdrop-filter: blur(18px); }
        .nav-inner { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
        .brand { color: #fff; font-weight: 950; letter-spacing: .13em; font-size: 13px; text-decoration: none; }
        .brand span { color: var(--green); }
        .nav-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
        .nav-links a { color: #c8d0c6; text-decoration: none; border: 1px solid rgba(255,255,255,.14); border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 800; }
        .nav-links a:hover { color: #050706; background: var(--green); border-color: var(--green); }
        .hero { min-height: calc(100svh - 64px); display: grid; align-items: center; position: relative; border-bottom: 1px solid rgba(255,255,255,.11); }
        .hero::before { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .22; background-image: linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px); background-size: 48px 48px; mask-image: linear-gradient(to bottom, #000, transparent 88%); }
        .hero-grid { position: relative; z-index: 2; display: grid; grid-template-columns: 1.25fr .75fr; gap: 32px; align-items: end; padding: 86px 0 78px; }
        .eyebrow { color: var(--green); font: 900 12px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .18em; text-transform: uppercase; }
        h1 { margin: 18px 0 0; max-width: 940px; font-size: clamp(58px, 9.8vw, 130px); line-height: .82; letter-spacing: -.072em; }
        h1 .outline { display: block; color: transparent; -webkit-text-stroke: 1px rgba(243,246,239,.58); }
        .lead { max-width: 830px; margin: 30px 0 0; color: #c5cec2; font-size: clamp(20px, 2.35vw, 27px); line-height: 1.5; }
        .cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
        .cta { display: inline-flex; align-items: center; justify-content: center; padding: 14px 18px; border-radius: 999px; background: var(--green); color: #050706; text-decoration: none; font-weight: 950; }
        .cta.secondary { color: var(--green); background: transparent; border: 1px solid rgba(151,255,22,.44); }
        .hero-card { border: 1px solid rgba(151,255,22,.38); border-radius: 30px; padding: 28px; background: linear-gradient(145deg, rgba(151,255,22,.13), rgba(255,255,255,.025)); box-shadow: 0 36px 110px rgba(0,0,0,.38); }
        .hero-card .status { display: inline-block; padding: 8px 10px; border-radius: 999px; color: var(--green); background: rgba(151,255,22,.1); font: 900 11px ui-monospace, monospace; letter-spacing: .13em; }
        .hero-card strong { display: block; margin-top: 20px; font-size: clamp(38px, 5vw, 61px); line-height: .94; letter-spacing: -.055em; }
        .hero-card p { color: #bbc5b9; line-height: 1.65; }
        .hero-card small { display: block; margin-top: 18px; color: #7f8c7e; line-height: 1.5; }
        .manifesto { padding: 96px 0; border-bottom: 1px solid rgba(255,255,255,.11); }
        .manifesto h2 { margin: 0; max-width: 1080px; font-size: clamp(44px, 7vw, 92px); line-height: .92; letter-spacing: -.06em; }
        .manifesto h2 em { color: var(--green); font-style: normal; }
        .manifesto p { max-width: 890px; color: #b4beb2; font-size: 20px; line-height: 1.72; }
        .process { position: relative; border-bottom: 1px solid rgba(255,255,255,.11); }
        .ghost-sticky { position: sticky; top: 64px; height: calc(100svh - 64px); overflow: hidden; background: linear-gradient(135deg, #071008, #050706 56%); }
        .ghost-sticky::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(151,255,22,.11), transparent 33%); }
        .ghost-word { position: absolute; white-space: nowrap; font-weight: 950; letter-spacing: -.09em; color: rgba(151,255,22,.045); line-height: .78; user-select: none; }
        .ghost-word.a { font-size: clamp(120px, 30vw, 430px); left: -9vw; top: 4%; transform: rotate(-5deg); }
        .ghost-word.b { font-size: clamp(100px, 25vw, 360px); right: -18vw; top: 36%; transform: rotate(7deg); }
        .ghost-word.c { font-size: clamp(95px, 23vw, 330px); left: 3vw; bottom: -3%; transform: rotate(-3deg); }
        .ghost-center { position: absolute; inset: 0; display: grid; place-items: center; text-align: center; }
        .ghost-center div { width: min(360px, 72vw); aspect-ratio: 1; border: 1px solid rgba(151,255,22,.28); border-radius: 50%; display: grid; place-items: center; box-shadow: 0 0 0 38px rgba(151,255,22,.025), 0 0 0 90px rgba(151,255,22,.018); background: rgba(5,7,6,.62); backdrop-filter: blur(8px); }
        .ghost-center b { font-size: clamp(30px, 5vw, 58px); line-height: .9; }
        .ghost-center small { display: block; margin-top: 12px; color: var(--green); font: 900 11px ui-monospace, monospace; letter-spacing: .15em; }
        .step-stack { position: relative; z-index: 5; margin-top: calc(-100svh + 64px); }
        .step { min-height: calc(100svh - 64px); display: grid; align-items: center; padding: 58px 0; }
        .step:nth-child(even) .step-card { margin-left: auto; }
        .step-card { width: min(590px, 100%); border: 1px solid rgba(255,255,255,.16); border-radius: 30px; padding: clamp(24px, 4vw, 38px); background: rgba(8,12,9,.9); backdrop-filter: blur(16px); box-shadow: 0 30px 100px rgba(0,0,0,.48); }
        .step-number { color: var(--green); font: 950 clamp(48px, 8vw, 88px)/.8 ui-monospace, monospace; }
        .step-label { margin-top: 24px; color: var(--green); font: 900 11px ui-monospace, monospace; letter-spacing: .17em; }
        .step-card h3 { margin: 12px 0; font-size: clamp(34px, 5vw, 58px); line-height: .94; letter-spacing: -.05em; }
        .step-card p { color: #b8c1b6; font-size: 18px; line-height: 1.67; }
        .section { padding: 90px 0; border-bottom: 1px solid rgba(255,255,255,.11); }
        .section-label { color: var(--green); font: 900 11px ui-monospace, monospace; letter-spacing: .16em; text-transform: uppercase; }
        .section h2 { max-width: 980px; margin: 12px 0 30px; font-size: clamp(42px, 6.4vw, 82px); line-height: .94; letter-spacing: -.055em; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .tile { min-height: 188px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(255,255,255,.13); border-radius: 23px; padding: 20px; background: rgba(255,255,255,.025); }
        .tile b { color: var(--green); font: 900 11px ui-monospace, monospace; letter-spacing: .13em; }
        .tile span { color: #d1d7cf; font-size: 17px; font-weight: 800; line-height: 1.35; }
        .scale-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .scale-card { border: 1px solid rgba(151,255,22,.25); border-radius: 27px; padding: 25px; background: linear-gradient(145deg, rgba(151,255,22,.08), rgba(255,255,255,.02)); }
        .scale-card strong { display: block; color: var(--green); font-size: clamp(42px, 6vw, 68px); line-height: .9; letter-spacing: -.06em; }
        .scale-card h3 { font-size: 25px; margin: 18px 0 8px; }
        .scale-card p { color: #aeb8ad; line-height: 1.6; }
        .control-list { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .control { border-left: 3px solid var(--green); padding: 18px 20px; background: rgba(255,255,255,.025); color: #c0c8be; line-height: 1.55; }
        .proof { border: 1px solid rgba(151,255,22,.36); border-radius: 30px; padding: clamp(26px, 5vw, 48px); background: linear-gradient(145deg, rgba(151,255,22,.1), rgba(255,255,255,.02)); }
        .proof strong { display: block; max-width: 920px; font-size: clamp(38px, 6vw, 76px); line-height: .94; letter-spacing: -.055em; }
        .proof p { max-width: 830px; color: #bcc5ba; font-size: 19px; line-height: 1.66; }
        .truth { margin-top: 24px; color: #839081; font-size: 14px; line-height: 1.65; }
        footer { padding: 45px 0 75px; color: #7e897c; }
        footer a { color: var(--green); }
        @media (max-width: 920px) {
          .hero-grid { grid-template-columns: 1fr; align-items: start; }
          .grid { grid-template-columns: 1fr 1fr; }
          .scale-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .shell { width: min(100% - 26px, 1180px); }
          .nav-inner { align-items: flex-start; padding: 12px 0; }
          .nav-links { gap: 5px; }
          .nav-links a { padding: 7px 9px; font-size: 10px; }
          .hero-grid { padding: 58px 0 54px; }
          h1 { font-size: clamp(54px, 17vw, 83px); }
          .manifesto, .section { padding: 62px 0; }
          .grid, .control-list { grid-template-columns: 1fr; }
          .step-card { margin: 0 !important; }
          .ghost-word { opacity: .65; }
        }
      `}</style>

      <nav className="nav">
        <div className="shell nav-inner">
          <a className="brand" href="/">NULLWORKS <span>ANVIL</span></a>
          <div className="nav-links">
            <a href="/sound-library">Sound library</a>
            <a href="/anvil-records">Label catalog</a>
            <a href="#pilot">Pilot</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="shell hero-grid">
          <div>
            <div className="eyebrow">INDEPENDENT CONCEPT PITCH // MONSTER ATHLETE MUSIC SYSTEM</div>
            <h1>
              Every athlete already has a sound.
              <span className="outline">Build the system that owns it.</span>
            </h1>
            <p className="lead">
              A Monster-owned program for athlete-guided, original, licensed music that can move from identity to release to social distribution without reducing the athlete to another stock soundtrack.
            </p>
            <div className="cta-row">
              <a className="cta" href="#system">See the operating system</a>
              <a className="cta secondary" href="/sound-library">Hear the range</a>
            </div>
          </div>
          <aside className="hero-card">
            <span className="status">PRE-PRODUCTION BETA // OPERATIONAL NOW</span>
            <strong>Scale is not the problem.</strong>
            <p>
              The system can support a focused weekly release program or a high-volume athlete campaign. The hard part is not generating sound. It is preserving athlete identity, brand authority, rights, approval, continuity, and a trustworthy definition of done.
            </p>
            <small>
              Final licensing, distribution, ownership, and brand use would be defined by agreement. This page is an independent proposal, not an official Monster Energy product.
            </small>
          </aside>
        </div>
      </header>

      <section className="manifesto">
        <div className="shell">
          <h2>
            Stop renting generic energy.<br />
            <em>Give every athlete a reusable sound identity.</em>
          </h2>
          <p>
            Athletes already shape the visual language of brands. ANVIL extends that authorship into music: original songs and campaign-ready versions created around the person, controlled through explicit review, and packaged for repeated use across the moments that build a career.
          </p>
        </div>
      </section>

      <section className="process" id="system">
        <div className="ghost-sticky" aria-hidden="true">
          <div className="ghost-word a">ATHLETE</div>
          <div className="ghost-word b">SOUND</div>
          <div className="ghost-word c">SYSTEM</div>
          <div className="ghost-center">
            <div>
              <span>
                <b>HUMAN<br />AUTHORITY</b>
                <small>THE SYSTEM MOVES AROUND THE ATHLETE</small>
              </span>
            </div>
          </div>
        </div>
        <div className="step-stack">
          {workflow.map((step) => (
            <article className="step" key={step.number}>
              <div className="shell">
                <div className="step-card">
                  <div className="step-number">{step.number}</div>
                  <div className="step-label">{step.label}</div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-label">One identity // many surfaces</div>
          <h2>The song is not one post. It is a reusable athlete media asset.</h2>
          <div className="grid">
            {useCases.map((item, index) => (
              <article className="tile" key={item}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span>{item}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="pilot">
        <div className="shell">
          <div className="section-label">Elastic production model</div>
          <h2>Start with one athlete. Expand only when the approval system survives reality.</h2>
          <div className="scale-grid">
            <article className="scale-card">
              <strong>1×</strong>
              <h3>Signature pilot</h3>
              <p>One athlete, one identity brief, several rapid genre directions, one selected song, approved release package, and a complete failure-and-learning receipt.</p>
            </article>
            <article className="scale-card">
              <strong>1/wk</strong>
              <h3>Roster cadence</h3>
              <p>A controlled weekly program with repeatable briefs, athlete review gates, rights templates, versioning, release scheduling, and campaign reuse.</p>
            </article>
            <article className="scale-card">
              <strong>3/day</strong>
              <h3>Campaign sprint</h3>
              <p>High-volume pre-production and multiple athlete lanes, provided the human review, rights, distribution, and brand approval capacity scales with the music engine.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-label">The real product</div>
          <h2>Governance, rights, and continuity are not paperwork around the music. They are the advantage.</h2>
          <div className="control-list">
            {controls.map((control) => (
              <div className="control" key={control}>{control}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <article className="proof">
            <div className="section-label">Relevant field context</div>
            <strong>Built for athletes as people, not inventory.</strong>
            <p>
              NULLWORKS has real relationship context with Clay Harper and the Pro Downhill / Big Bear Mountain Resort ecosystem. That is not a Monster endorsement or a committed pilot. It is evidence that this concept comes from direct proximity to athlete identity, action-sport culture, and the problem of preserving what makes one competitor unmistakably themselves.
            </p>
            <div className="cta-row">
              <a className="cta" href="mailto:masoncalcolsol@gmail.com?subject=Monster%20Athlete%20Music%20System">Discuss a pilot</a>
              <a className="cta secondary" href="/anvil-records">See released proof</a>
            </div>
            <div className="truth">
              Independent concept proposal by Mason Perry / NULLWORKS ANVIL. Not affiliated with, sponsored by, approved by, or endorsed by Monster Energy Company. Brand ownership, music ownership, licensing scope, athlete compensation, release rights, and distribution authority would require a written agreement.
            </div>
          </article>
        </div>
      </section>

      <footer>
        <div className="shell">
          NULLWORKS ANVIL // Custom music systems around human identity. <a href="/sound-library">Explore the sound library →</a>
        </div>
      </footer>
    </main>
  );
}
