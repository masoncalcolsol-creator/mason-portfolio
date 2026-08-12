import type { Metadata } from "next";
import AnvilEKGBackground from "../anvil-records/AnvilEKGBackground";

export const metadata: Metadata = {
  title: "NULLWORKS ANVIL | Personal Soundtrack Sampler",
  description:
    "Original sonic identities for athletes, creators, teams, brands, and people — with publishing, licensing, provenance, sponsor rights, and distribution built into the pipeline.",
};

const proofs = [
  {
    lane: "SUPERCROSS / MX",
    title: "Arachnid",
    use: "Identity soundtrack",
    note: "A character-first sonic portrait: patience, pressure, intelligence, danger, and the psychology of competition.",
    href: "https://suno.com/s/2SDkzumY5MmZmas7",
  },
  {
    lane: "FOOTBALL / FIGHT",
    title: "Kick the Door",
    use: "Walkout / pregame hype",
    note: "Built to change the temperature in the room before the athlete ever touches the field, cage, tunnel, or stage.",
    href: "https://suno.com/s/pE0eXqs1CXEKRLRU",
  },
  {
    lane: "NASCAR / RACING",
    title: "Yellow Flag",
    use: "Fan-culture race anthem",
    note: "A fan-facing track built around speed, restarts, wrecks, veteran craft, and the personality of a racing culture.",
    href: "https://suno.com/s/qNBJ67XL7shwQS4Z",
  },
];

const loop = [
  ["01", "You direct it", "Story, athlete, footage, references, mood, sponsors, moments, and goals."],
  ["02", "We produce it", "ANVIL turns the direction into an original, human-reviewed music asset."],
  ["03", "Rights get packaged", "License scope, approved users, provenance, hashes, metadata, and delivery records travel with the track."],
  ["04", "It can be published", "When appropriate, the track can move into real release and distribution channels instead of dying as a disposable demo."],
  ["05", "You post normally", "Open Instagram, choose your track or supplied edit, post the reel. Same behavior. Better music product."],
];

export default function PersonalSoundtrackPage() {
  return (
    <main className="sampler-page">
      <AnvilEKGBackground />
      <style>{`
        :root{color-scheme:dark}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#080305}.sampler-page{--acid:#ff3048;--hot:#ff6576;--paper:#f7f2f1;--muted:#aaa19f;position:relative;isolation:isolate;min-height:100vh;color:var(--paper);overflow-x:hidden;background:radial-gradient(circle at 82% 4%,rgba(255,48,72,.11),transparent 29rem),linear-gradient(rgba(8,3,5,.73),rgba(8,3,5,.84));font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.nav,.hero,.section,footer{position:relative;z-index:2}.shell{width:min(1180px,calc(100% - 38px));margin:0 auto}.nav{position:sticky;top:0;z-index:70;border-bottom:1px solid rgba(255,70,88,.18);background:rgba(8,3,5,.8);backdrop-filter:blur(18px)}.nav-inner{min-height:62px;display:flex;align-items:center;justify-content:space-between;gap:16px}.brand{font-weight:950;letter-spacing:.12em;font-size:13px}.brand span{color:var(--acid)}.nav a{color:#d0c7c6;text-decoration:none;border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:8px 11px;font-size:12px;font-weight:800}.hero{min-height:86svh;display:grid;align-items:center;border-bottom:1px solid rgba(255,70,88,.16);overflow:hidden}.hero::before{content:"YOU";position:absolute;left:-4vw;top:9%;color:rgba(255,255,255,.025);font-size:clamp(170px,38vw,520px);font-weight:950;line-height:.7;letter-spacing:-.11em;transform:rotate(-5deg)}.hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:1.15fr .85fr;gap:28px;align-items:end;padding:92px 0 72px}.eyebrow,.section-label{color:var(--acid);font:900 11px ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase}h1{margin:18px 0 0;font-size:clamp(62px,10.7vw,142px);line-height:.81;letter-spacing:-.075em;max-width:900px}h1 span{display:block;color:transparent;-webkit-text-stroke:1px rgba(255,101,118,.62)}.lead{max-width:820px;margin-top:28px;color:#ccc2c0;font-size:clamp(20px,2.25vw,27px);line-height:1.5}.hero-card{border:1px solid rgba(255,48,72,.38);border-radius:28px;padding:27px;background:linear-gradient(145deg,rgba(255,48,72,.11),rgba(11,5,7,.84));box-shadow:0 28px 90px rgba(0,0,0,.42);backdrop-filter:blur(8px)}.hero-card b{display:block;color:var(--acid);font:900 11px ui-monospace,monospace;letter-spacing:.14em}.hero-card strong{display:block;margin-top:16px;font-size:clamp(34px,5vw,56px);line-height:.95;letter-spacing:-.055em}.hero-card p{color:#bbb0ae;line-height:1.65}.cta-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}.cta{display:inline-flex;align-items:center;justify-content:center;padding:13px 17px;border-radius:999px;background:var(--acid);color:#080305;font-weight:950;text-decoration:none}.cta.secondary{color:var(--acid);background:rgba(8,3,5,.58);border:1px solid rgba(255,48,72,.48)}.section{padding:80px 0;border-bottom:1px solid rgba(255,70,88,.14);background:rgba(8,3,5,.47)}h2{margin:12px 0 28px;max-width:980px;font-size:clamp(42px,6.5vw,84px);line-height:.93;letter-spacing:-.057em}.proof-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.proof{min-height:340px;border:1px solid rgba(255,72,90,.22);border-radius:26px;padding:24px;background:linear-gradient(145deg,rgba(255,48,72,.055),rgba(10,5,7,.86));backdrop-filter:blur(7px);display:flex;flex-direction:column}.proof .lane{color:var(--acid);font:900 11px ui-monospace,monospace;letter-spacing:.14em}.proof h3{margin:28px 0 4px;font-size:clamp(34px,4vw,52px);letter-spacing:-.055em;line-height:.95}.proof .use{color:#ffd1d5;font-weight:900}.proof p{color:#b7aaa8;line-height:1.62;flex:1}.proof a{display:inline-flex;align-self:flex-start;margin-top:16px;padding:12px 15px;border-radius:999px;background:var(--acid);color:#080305;text-decoration:none;font-weight:950}.proof-note{margin-top:20px;border-left:3px solid var(--acid);padding-left:18px;color:#c7bcba;font-size:16px;line-height:1.65}.bigline{font-size:clamp(29px,5vw,64px);line-height:1.03;letter-spacing:-.055em;max-width:1040px}.bigline em{color:var(--acid);font-style:normal}.flow{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.flowbox{min-height:190px;border:1px solid rgba(255,72,90,.2);border-radius:22px;padding:19px;background:rgba(11,5,7,.78);backdrop-filter:blur(7px)}.flowbox b{color:var(--acid);font:950 13px ui-monospace,monospace}.flowbox strong{display:block;margin:26px 0 8px;font-size:21px;letter-spacing:-.035em}.flowbox span{color:#aea3a1;line-height:1.55;font-size:14px}.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}.card{min-height:220px;border:1px solid rgba(255,72,90,.2);border-radius:24px;padding:22px;background:rgba(11,5,7,.78);backdrop-filter:blur(7px)}.card b{color:var(--acid);font:900 11px ui-monospace,monospace;letter-spacing:.14em}.card h3{font-size:30px;letter-spacing:-.04em;margin:28px 0 8px}.card p{color:#aea3a1;line-height:1.62}.boundary{border:1px solid rgba(255,72,90,.38);border-radius:30px;padding:clamp(25px,4vw,42px);background:linear-gradient(145deg,rgba(255,48,72,.09),rgba(11,5,7,.86));backdrop-filter:blur(8px)}.boundary strong{display:block;max-width:920px;font-size:clamp(36px,6vw,72px);line-height:.94;letter-spacing:-.055em}.boundary p{max-width:930px;color:#bdb2b0;font-size:18px;line-height:1.7}.boundary small{display:block;margin-top:18px;color:#8e8381;line-height:1.6}.final{padding:96px 0 110px}.final h2{font-size:clamp(54px,9vw,112px);margin-bottom:18px}.final p{max-width:720px;color:#bdb2b0;font-size:20px;line-height:1.65}footer{padding:34px 0 46px;color:#8f8583;border-top:1px solid rgba(255,70,88,.14);font:800 11px ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase}.footer-row{display:flex;justify-content:space-between;gap:18px}@media(max-width:900px){.hero-grid{grid-template-columns:1fr}.proof-grid,.grid3{grid-template-columns:1fr}.flow{grid-template-columns:1fr 1fr}.flowbox:last-child{grid-column:span 2}}@media(max-width:640px){.shell{width:min(100% - 26px,1180px)}.nav-inner{min-height:58px}.nav .hide-mobile{display:none}.hero{min-height:auto}.hero-grid{padding:66px 0 54px}.hero-card{padding:21px}.section{padding:58px 0}.proof{min-height:290px}.flow{grid-template-columns:1fr}.flowbox:last-child{grid-column:span 1}.cta{width:100%}.footer-row{flex-direction:column}}
      `}</style>

      <nav className="nav"><div className="shell nav-inner"><div className="brand">NULLWORKS <span>// ANVIL</span></div><a className="hide-mobile" href="#proof">HEAR THE PROOF</a></div></nav>

      <section className="hero"><div className="shell hero-grid"><div><div className="eyebrow">PERSONAL SONIC IDENTITY // COMMERCIAL MUSIC SYSTEM</div><h1>YOUR LIFE HAS A <span>SOUNDTRACK.</span></h1><p className="lead">We create original sonic identities for athletes, creators, teams, brands, and people — then package the music so it can actually be published, licensed, distributed, and used by the people already telling your story.</p><div className="cta-row"><a className="cta" href="#proof">Hear what this means ↓</a><a className="cta secondary" href="#loop">See the deployment loop</a></div></div><aside className="hero-card"><b>THE SIMPLE VERSION</b><strong>Same content loop. Better music.</strong><p>You already make the reel, the highlight edit, the launch, the walkout, the documentary, or the sponsor post. Instead of borrowing somebody else&apos;s soundtrack, you can use one built around you.</p></aside></div></section>

      <section id="proof" className="section"><div className="shell"><div className="section-label">HEAR WHAT THIS MEANS</div><h2>Three sports. Three different jobs for music.</h2><div className="proof-grid">{proofs.map((proof)=><article className="proof" key={proof.title}><div className="lane">{proof.lane}</div><h3>{proof.title}</h3><div className="use">{proof.use}</div><p>{proof.note}</p><a href={proof.href} target="_blank" rel="noreferrer">LISTEN →</a></article>)}</div><div className="proof-note"><strong>Concept demonstrations, not endorsements.</strong> Now imagine the same system built from an actual athlete&apos;s story, footage, sponsors, personality, audience, and goals.</div></div></section>

      <section className="section"><div className="shell"><p className="bigline">This is not &ldquo;AI music.&rdquo; It is a way to turn a <em>person</em> into a repeatable sonic identity — then make that identity usable in the real commercial world.</p></div></section>

      <section id="loop" className="section"><div className="shell"><div className="section-label">THE DEPLOYMENT LOOP</div><h2>No new behavior required.</h2><div className="flow">{loop.map(([n,title,copy])=><div className="flowbox" key={n}><b>{n}</b><strong>{title}</strong><span>{copy}</span></div>)}</div></div></section>

      <section className="section"><div className="shell"><div className="section-label">WHO BENEFITS</div><h2>One track can serve the whole athlete ecosystem.</h2><div className="grid3"><article className="card"><b>ATHLETE</b><h3>Your sound, on demand.</h3><p>Identity tracks, hype edits, walkouts, comeback films, season recaps, personal posts, and moments that should sound like you.</p></article><article className="card"><b>SPONSORS + TEAMS</b><h3>Pre-cleared partner use.</h3><p>Named sponsors, teams, and agencies can be included in a defined rights package instead of chasing a separate music license every time they post.</p></article><article className="card"><b>MEDIA + PROMOTERS</b><h3>Original music for the story.</h3><p>Films, broadcasts, social edits, launches, bumpers, promos, events, and recurring content can draw from a known sonic world rather than a generic library search.</p></article></div></div></section>

      <section className="section"><div className="shell"><div className="boundary"><div className="section-label">PROVENANCE + RIGHTS</div><strong>A track should have a paper trail.</strong><p>Final masters can travel with creator and rights metadata, license scope, approved users, release identifiers, cryptographic hashes, timestamps, delivery records, and immutable or blockchain-backed provenance. The point is simple: make origin, control, and authorized use easier to prove and audit.</p><small>Provenance technology does not physically prevent copying. Exclusive rights are defined by the actual agreement and applicable law. The system creates evidence of origin, authorization, and use — not magic anti-theft.</small></div></div></section>

      <section className="section"><div className="shell"><div className="section-label">REAL MUSIC, NOT A DEAD-END DEMO</div><h2>It can become a published record.</h2><p className="lead">When the project calls for it, the soundtrack can move beyond a private file into actual release infrastructure: masters, artwork, metadata, identifiers, distribution packaging, licensing, sponsor permissions, and a durable catalog object. The athlete does not need to become a music-industry expert. The complexity stays upstream.</p></div></section>

      <section className="final"><div className="shell"><div className="section-label">NULLWORKS // ANVIL</div><h2>WHAT SHOULD YOU SOUND LIKE?</h2><p>Professional athlete, amateur racer, creator, coach, team, founder, kid chasing a dream, or somebody who simply thinks having their own soundtrack is cool as hell. Famous is optional.</p><div className="cta-row"><a className="cta" href="mailto:hello@nullworks.ai?subject=ANVIL%20Athlete%20Sample">Build an athlete sample →</a><a className="cta secondary" href="/anvil-records">See ANVIL Records</a></div></div></section>

      <footer><div className="shell footer-row"><span>NULLWORKS // ANVIL</span><span>ORIGINAL SONIC IDENTITY + LICENSING + PROVENANCE + DISTRIBUTION</span></div></footer>
    </main>
  );
}
