import type { Metadata } from "next";
import AnvilEKGBackground from "./AnvilEKGBackground";

export const metadata: Metadata = {
  title: "NULLWORKS ANVIL | Independent Music Systems and Releases",
  description:
    "The public label and production-lab catalog for NULLWORKS ANVIL: released projects, active artist systems, custom records, and governed music production.",
};

const releases = [
  {
    order: "01",
    artist: "聞き書き / KIKIGAKI",
    title: "消える前に Kieru Mae ni Before It Disappears",
    format: "Single // Japanese memory folk",
    note: "A continuity-and-wisdom-mining release about preserving human knowledge before the original context disappears.",
    href: "https://distrokid.com/hyperfollow/kikigaki/-kieru-mae-ni-before-it-disappears",
    explicit: false,
  },
  {
    order: "02",
    artist: "CROWNROT",
    title: "KNUCKLES",
    format: "Single // Modern metalcore",
    note: "A compact proof of the CROWNROT athletic-pressure lane: modern metalcore force, workout momentum, and bruised melodic lift.",
    href: "https://distrokid.com/hyperfollow/crownrot1/knuckles",
    explicit: false,
  },
  {
    order: "03",
    artist: "CATBARF",
    title: "Poop Zoomies",
    format: "Single // Groove-metal character comedy",
    note: "A serious production system wrapped around a deliberately ridiculous character premise. Heavy, specific, memorable, and explicit.",
    href: "https://distrokid.com/hyperfollow/catbarf/poop-zoomies",
    explicit: true,
  },
  {
    order: "04",
    artist: "CATBARF",
    title: "Broken Plumbis",
    format: "Single // Groove metal",
    note: "A second public CATBARF release demonstrating identity continuity across separate songs without flattening the project into one joke.",
    href: "https://distrokid.com/hyperfollow/catbarf/broken-plumbis",
    explicit: true,
  },
  {
    order: "05",
    artist: "GODSCROTUM",
    title: "ONI",
    format: "13-track album // Extreme satirical thrash",
    note: "A deliberately confrontational fictional artist system and full-album continuity proof. Explicit content and extreme satire. Placed last intentionally.",
    href: "https://distrokid.com/hyperfollow/godscrotum/oni-2",
    explicit: true,
  },
];

const development = [
  ["BLOOD PAGODA", "Japanese occult doom", "Native-Japanese lyrical storytelling, 1970s ritual weight, patience, consequence, and cinematic dread."],
  ["HARESCRAMBLE", "Balkan alt-metal / ska", "Motion, mischief, endurance, memorial, racing, boating, community, and strange human bonds."],
  ["SILT SERPENT", "Baja race rock", "Desert machinery, speed, mechanical violence, heat, survival, and operator-machine identity."],
  ["DESERT FURY", "Sonoran groove-thrash", "Dry-air force, heavy physical work, confrontation, and riffs that feel like equipment under load."],
  ["LIMESTONE KIN", "Bluegrass / Americana", "Community memory, local storycraft, family, regional pride, humor, and plainspoken truth."],
  ["MOUNTAIN LORDS", "Dark grunge / sludge", "Fatigue, isolation, abrasion, weight, and stubborn survival without cosmetic polish."],
  ["ASH", "Doom / sludge", "Elemental repetition, collapse, endurance, ritual atmosphere, and slow-moving mass."],
  ["CROWNROT // SECOND SKIN", "Modern metalcore album lane", "The developing full-length expansion of the CROWNROT system beyond the KNUCKLES proof release."],
];

const capabilities = [
  "Artist and sound-identity architecture",
  "Rapid multi-genre pre-production",
  "Lyrics, structure, comparison, and revision",
  "Human approval and truth boundaries",
  "Artwork direction and release packaging",
  "Clean, instrumental, short-form, and event versions",
  "DistroKid release workflow and public catalog links",
  "Custom athlete, education, community, and brand programs",
];

export default function AnvilRecordsPage() {
  return (
    <main className="records-page">
      <AnvilEKGBackground />
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #080305; }
        .records-page {
          --acid: #ff3048;
          --hot: #ff6576;
          --gold: #ff8a7c;
          --paper: #f6f2f1;
          --muted: #aaa19f;
          position: relative;
          isolation: isolate;
          min-height: 100vh;
          color: var(--paper);
          overflow-x: hidden;
          background:
            radial-gradient(circle at 82% 4%, rgba(255,48,72,.105), transparent 29rem),
            radial-gradient(circle at 8% 36%, rgba(185,16,41,.07), transparent 30rem),
            linear-gradient(rgba(8,3,5,.74), rgba(8,3,5,.82));
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .nav, .hero, .manifesto, .section, footer { position: relative; z-index: 2; }
        .shell { width: min(1200px, calc(100% - 38px)); margin: 0 auto; }
        .nav { position: sticky; top: 0; z-index: 70; border-bottom: 1px solid rgba(255,70,88,.18); background: rgba(8,3,5,.79); backdrop-filter: blur(18px); }
        .nav-inner { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
        .brand { color: #fff; font-weight: 950; letter-spacing: .13em; font-size: 13px; text-decoration: none; }
        .brand span { color: var(--acid); text-shadow: 0 0 20px rgba(255,48,72,.3); }
        .nav-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
        .nav-links a { color: #d0c7c6; text-decoration: none; border: 1px solid rgba(255,255,255,.14); border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 800; }
        .nav-links a:hover { color: #080305; background: var(--acid); border-color: var(--acid); }
        .hero { min-height: 95svh; display: grid; align-items: center; overflow: hidden; border-bottom: 1px solid rgba(255,70,88,.16); }
        .hero::before { content: "ANVIL"; position: absolute; left: -8vw; top: 7%; color: rgba(255,255,255,.025); font-size: clamp(160px, 35vw, 500px); font-weight: 950; line-height: .7; letter-spacing: -.11em; transform: rotate(-5deg); }
        .hero::after { content: "RECORDS"; position: absolute; right: -17vw; bottom: 2%; color: rgba(255,48,72,.042); font-size: clamp(130px, 29vw, 420px); font-weight: 950; line-height: .7; letter-spacing: -.1em; transform: rotate(5deg); }
        .hero-grid { position: relative; z-index: 2; display: grid; grid-template-columns: 1.15fr .85fr; gap: 30px; align-items: end; padding: 90px 0 78px; }
        .eyebrow { color: var(--acid); font: 900 12px ui-monospace, monospace; letter-spacing: .18em; text-transform: uppercase; }
        h1 { margin: 18px 0 0; max-width: 930px; font-size: clamp(65px, 11vw, 145px); line-height: .8; letter-spacing: -.075em; }
        h1 span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(255,101,118,.58); }
        .lead { max-width: 850px; margin-top: 30px; color: #ccc2c0; font-size: clamp(20px, 2.3vw, 27px); line-height: 1.52; }
        .hero-card { border: 1px solid rgba(255,48,72,.38); border-radius: 30px; padding: 27px; background: linear-gradient(145deg, rgba(255,48,72,.105), rgba(11,5,7,.82)); box-shadow: 0 28px 90px rgba(0,0,0,.42), inset 0 0 44px rgba(255,48,72,.025); backdrop-filter: blur(8px); }
        .hero-card b { display: block; color: var(--acid); font: 900 11px ui-monospace, monospace; letter-spacing: .14em; }
        .hero-card strong { display: block; margin-top: 18px; font-size: clamp(38px, 5vw, 61px); line-height: .94; letter-spacing: -.055em; }
        .hero-card p { color: #bbb0ae; line-height: 1.67; }
        .cta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 25px; }
        .cta { display: inline-flex; align-items: center; justify-content: center; padding: 13px 17px; border-radius: 999px; background: var(--acid); color: #080305; font-weight: 950; text-decoration: none; box-shadow: 0 0 24px rgba(255,48,72,.16); }
        .cta.secondary { color: var(--acid); background: rgba(8,3,5,.58); border: 1px solid rgba(255,48,72,.48); box-shadow: none; }
        .manifesto { padding: 92px 0; border-bottom: 1px solid rgba(255,70,88,.14); background: linear-gradient(90deg, rgba(8,3,5,.7), rgba(15,4,7,.46), rgba(8,3,5,.7)); }
        .manifesto h2 { margin: 0; max-width: 1040px; font-size: clamp(44px, 7vw, 92px); line-height: .92; letter-spacing: -.06em; }
        .manifesto h2 em { color: var(--acid); font-style: normal; text-shadow: 0 0 30px rgba(255,48,72,.13); }
        .manifesto p { max-width: 900px; color: #bbb0ae; font-size: 19px; line-height: 1.72; }
        .section { padding: 84px 0; border-bottom: 1px solid rgba(255,70,88,.14); background: rgba(8,3,5,.48); }
        .section-label { color: var(--acid); font: 900 11px ui-monospace, monospace; letter-spacing: .16em; text-transform: uppercase; }
        h2 { margin: 12px 0 30px; max-width: 980px; font-size: clamp(42px, 6.5vw, 84px); line-height: .93; letter-spacing: -.057em; }
        .release-list { display: grid; gap: 14px; }
        .release { position: relative; display: grid; grid-template-columns: 90px 1fr auto; gap: 22px; align-items: center; min-height: 190px; border: 1px solid rgba(255,72,90,.2); border-radius: 26px; padding: 23px; background: linear-gradient(145deg, rgba(255,48,72,.045), rgba(10,5,7,.84)); overflow: hidden; backdrop-filter: blur(7px); }
        .release::after { content: attr(data-order); position: absolute; right: 20%; top: -34px; color: rgba(255,48,72,.035); font: 950 180px/.8 ui-monospace, monospace; }
        .order { position: relative; z-index: 2; color: var(--acid); font: 950 48px/.8 ui-monospace, monospace; text-shadow: 0 0 20px rgba(255,48,72,.2); }
        .release-copy { position: relative; z-index: 2; }
        .artist { color: var(--gold); font: 900 11px ui-monospace, monospace; letter-spacing: .15em; }
        .release h3 { margin: 9px 0 7px; font-size: clamp(30px, 4.5vw, 55px); line-height: .94; letter-spacing: -.05em; }
        .format { color: var(--acid); font-size: 13px; font-weight: 900; }
        .release p { max-width: 760px; color: #b0a5a3; line-height: 1.6; }
        .release a { position: relative; z-index: 2; white-space: nowrap; border-radius: 999px; padding: 12px 15px; background: var(--acid); color: #080305; text-decoration: none; font-weight: 950; }
        .explicit-mark { display: inline-block; margin-left: 8px; color: #ffb1b8; font: 900 10px ui-monospace, monospace; letter-spacing: .12em; }
        .development-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
        .dev-card { min-height: 230px; border: 1px solid rgba(255,72,90,.18); border-radius: 24px; padding: 22px; background: rgba(11,5,7,.78); backdrop-filter: blur(7px); }
        .dev-card b { color: var(--gold); font: 900 11px ui-monospace, monospace; letter-spacing: .14em; }
        .dev-card h3 { margin: 14px 0 8px; font-size: 30px; letter-spacing: -.035em; }
        .dev-card p { color: #aea3a1; line-height: 1.62; }
        .cap-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .cap { min-height: 170px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(255,72,90,.18); border-radius: 22px; padding: 19px; background: rgba(11,5,7,.76); backdrop-filter: blur(7px); }
        .cap b { color: var(--acid); font: 900 11px ui-monospace, monospace; letter-spacing: .14em; }
        .cap span { color: #cec4c2; font-weight: 800; line-height: 1.4; }
        .boundary { border: 1px solid rgba(255,72,90,.38); border-radius: 30px; padding: clamp(25px, 4vw, 42px); background: linear-gradient(145deg, rgba(255,48,72,.09), rgba(11,5,7,.86)); box-shadow: inset 0 0 48px rgba(255,48,72,.025); backdrop-filter: blur(8px); }
        .boundary strong { display: block; max-width: 920px; font-size: clamp(38px, 6vw, 75px); line-height: .94; letter-spacing: -.055em; }
        .boundary p { max-width: 930px; color: #bdb2b0; font-size: 18px; line-height: 1.7; }
        .boundary small { display: block; margin-top: 20px; color: #8e8381; line-height: 1.65; }
        footer { padding: 44px 0 75px; color: #887d7b; background: rgba(8,3,5,.72); }
        footer a { color: var(--acid); }
        @media (max-width: 920px) {
          .hero-grid { grid-template-columns: 1fr; align-items: start; }
          .release { grid-template-columns: 70px 1fr; }
          .release a { grid-column: 2; justify-self: start; }
          .cap-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 700px) {
          .shell { width: min(100% - 26px, 1200px); }
          .nav-inner { align-items: flex-start; padding: 12px 0; }
          .nav-links { gap: 5px; }
          .nav-links a { padding: 7px 9px; font-size: 10px; }
          .hero-grid { padding: 60px 0; }
          h1 { font-size: clamp(58px, 18vw, 88px); }
          .manifesto, .section { padding: 62px 0; }
          .development-grid, .cap-grid { grid-template-columns: 1fr; }
          .release { grid-template-columns: 1fr; gap: 14px; }
          .release a { grid-column: auto; }
          .order { font-size: 34px; }
        }
      `}</style>

      <nav className="nav">
        <div className="shell nav-inner">
          <a className="brand" href="/">NULLWORKS <span>ANVIL</span></a>
          <div className="nav-links">
            <a href="/sound-library">Sound library</a>
            <a href="/monster-music">Monster concept</a>
            <a href="#releases">Releases</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="shell hero-grid">
          <div>
            <div className="eyebrow">INDEPENDENT PRODUCTION LAB // RELEASE LABEL // MUSIC SYSTEMS</div>
            <h1>
              Build the artist.
              <span>Preserve the sound.</span>
            </h1>
            <p className="lead">
              NULLWORKS ANVIL develops original artist identities, custom records, release systems, and reusable music pipelines around human stories, communities, education, athletes, brands, and deliberately strange creative experiments.
            </p>
            <div className="cta-row">
              <a className="cta" href="#releases">Open the catalog</a>
              <a className="cta secondary" href="/sound-library">Explore every sound lane</a>
            </div>
          </div>
          <aside className="hero-card">
            <b>ANVIL OPERATING PRINCIPLE</b>
            <strong>A song is an artifact. A coherent artist is a system.</strong>
            <p>
              The work includes identity, continuity, sound constraints, lyrics, rejected versions, artwork direction, release packaging, public links, and the reasons each decision was made. The output is music. The durable asset is the operating memory behind it.
            </p>
          </aside>
        </div>
      </header>

      <section className="manifesto">
        <div className="shell">
          <h2>
            Faster generation is useful.<br />
            <em>Coherent creative continuity is rare.</em>
          </h2>
          <p>
            ANVIL is not a page of anonymous AI songs. Each active project receives a distinct purpose, sound lane, language, emotional range, visual identity, truth boundary, and release history. New work can move quickly because the system remembers what the artist is — and what it must never become.
          </p>
        </div>
      </section>

      <section className="section" id="releases">
        <div className="shell">
          <div className="section-label">Publicly released proof</div>
          <h2>Current releases distributed through the NULLWORKS ANVIL pipeline.</h2>
          <div className="release-list">
            {releases.map((release) => (
              <article className="release" data-order={release.order} key={`${release.artist}-${release.title}`}>
                <div className="order">{release.order}</div>
                <div className="release-copy">
                  <div className="artist">
                    {release.artist}
                    {release.explicit ? <span className="explicit-mark">EXPLICIT</span> : null}
                  </div>
                  <h3>{release.title}</h3>
                  <div className="format">{release.format}</div>
                  <p>{release.note}</p>
                </div>
                <a href={release.href} target="_blank" rel="noreferrer">Listen ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-label">Active development roster</div>
          <h2>Original artist systems currently being developed, tested, or expanded.</h2>
          <div className="development-grid">
            {development.map(([artist, lane, description]) => (
              <article className="dev-card" key={artist}>
                <b>{artist}</b>
                <h3>{lane}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-label">What the label actually operates</div>
          <h2>From a rough human idea to a governed public release path.</h2>
          <div className="cap-grid">
            {capabilities.map((capability, index) => (
              <div className="cap" key={capability}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span>{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <article className="boundary">
            <div className="section-label">Artistic and organizational boundary</div>
            <strong>The label operates the system. The work is allowed to have its own voice.</strong>
            <p>
              The characters, narrators, satire, fictional bands, viewpoints, and lyrical positions inside these releases are artistic content. They do not automatically represent the personal views of Mason Perry, NULLWORKS, clients, collaborators, distributors, platforms, employers, or any referenced organization. Explicit material is labeled rather than hidden.
            </p>
            <p>
              No third-party brand, athlete, resort, employer, or organization should be interpreted as a partner, client, sponsor, or endorser unless an explicit public agreement says so. Custom commercial work receives separate authority, rights, review, and publication controls.
            </p>
            <div className="cta-row">
              <a className="cta" href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20ANVIL%20Music%20System">Discuss a custom record</a>
              <a className="cta secondary" href="/monster-music">See the athlete concept</a>
            </div>
            <small>
              Released links route to public DistroKid / streaming destinations. Development projects are listed as active creative systems, not promises of a specific release date.
            </small>
          </article>
        </div>
      </section>

      <footer>
        <div className="shell">
          NULLWORKS ANVIL // Original music systems, artist continuity, and release receipts. <a href="/sound-library">Hear the full production range →</a>
        </div>
      </footer>
    </main>
  );
}
