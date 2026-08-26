import type { Metadata } from "next";
import CommercialThemeToggle from "../components/CommercialThemeToggle";

export const metadata: Metadata = {
  title: "AI Assurance Index | NULLWORKS",
  description: "Source model, license, availability, pricing, assurance status, evidence depth, and disclosure for AI systems reviewed or cataloged by NULLWORKS.",
};

const styles = `
:root{--nw-paper:#fff9eb;--nw-paper2:#f5ead3;--nw-ink:#091b2c;--nw-ink2:#132b3f;--nw-text:#18202a;--nw-muted:#676c6f;--nw-gold:#b58a3a;--nw-border:#d8c9aa;--nw-card:#fffdf6;--nw-good:#1c6a50;--nw-shadow:0 18px 50px rgba(55,42,20,.10);--nw-toggle-bg:rgba(255,255,255,.66)}
html[data-nw-theme="dark"]{--nw-paper:#111821;--nw-paper2:#19232d;--nw-ink:#f3ead7;--nw-ink2:#d9c9a8;--nw-text:#f2eee6;--nw-muted:#b8b6b0;--nw-gold:#d2a85b;--nw-border:#3b4650;--nw-card:#161f28;--nw-good:#77d2ab;--nw-shadow:0 18px 50px rgba(0,0,0,.28);--nw-toggle-bg:rgba(17,24,33,.8)}
*{box-sizing:border-box}html{background:var(--nw-paper)}body{margin:0;background:var(--nw-paper);color:var(--nw-text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.58}.wrap{width:min(1120px,calc(100% - 28px));margin:auto}.nav{position:sticky;top:0;z-index:30;border-bottom:1px solid var(--nw-border);background:color-mix(in srgb,var(--nw-paper) 92%,transparent);backdrop-filter:blur(16px)}.navin{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 0}.brand{text-decoration:none;color:var(--nw-ink);font-weight:950;letter-spacing:.09em;text-transform:uppercase;font-size:12px}.hero{padding:66px 0 40px;background:linear-gradient(180deg,var(--nw-paper),var(--nw-paper2));border-bottom:1px solid var(--nw-border)}.eyebrow{display:inline-flex;border:1px solid var(--nw-border);border-radius:999px;padding:6px 10px;color:var(--nw-gold);font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;background:var(--nw-card)}h1,h2,h3{font-family:Georgia,"Times New Roman",serif;color:var(--nw-ink)}h1{font-size:clamp(44px,8vw,84px);line-height:.94;letter-spacing:-.055em;margin:18px 0 20px;max-width:980px}h2{font-size:clamp(30px,5vw,50px);line-height:1;margin:0 0 18px;letter-spacing:-.035em}.lead{font-size:clamp(18px,2.2vw,23px);max-width:870px;color:var(--nw-text)}.truth{margin-top:22px;border-left:4px solid var(--nw-gold);padding:14px 16px;background:var(--nw-card);border-radius:0 16px 16px 0;max-width:930px}.section{padding:50px 0}.intro{max-width:830px;color:var(--nw-muted)}.grid{display:grid;gap:15px}.cols2{grid-template-columns:repeat(2,1fr)}.card{border:1px solid var(--nw-border);border-radius:22px;background:var(--nw-card);padding:21px;box-shadow:var(--nw-shadow)}.card h3{font-size:24px;margin:10px 0}.card p,.card li{color:var(--nw-muted)}.tag{display:inline-flex;padding:5px 8px;border-radius:999px;border:1px solid var(--nw-border);font-size:10px;font-weight:900;letter-spacing:.09em;text-transform:uppercase;color:var(--nw-muted)}.tag.good{color:var(--nw-good)}.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:18px 0}.fact{border:1px solid var(--nw-border);border-radius:15px;padding:12px;background:var(--nw-paper)}.fact b{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--nw-gold);margin-bottom:4px}.fact span{font-weight:750;color:var(--nw-text)}.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.btn{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;border-radius:999px;padding:11px 15px;font-weight:900;border:1px solid var(--nw-ink);color:var(--nw-ink)}.btn.primary{background:var(--nw-ink);color:var(--nw-paper)}.policy{display:grid;grid-template-columns:1fr 1fr;gap:15px}.rule{padding:18px;border-top:1px solid var(--nw-border)}.rule b{display:block;color:var(--nw-ink);font-family:Georgia,"Times New Roman",serif;font-size:21px;margin-bottom:5px}.rule span{color:var(--nw-muted)}.footer{border-top:1px solid var(--nw-border);padding:30px 0 50px;color:var(--nw-muted);font-size:13px}@media(max-width:780px){.cols2,.policy,.facts{grid-template-columns:1fr}.section{padding:38px 0}.navin{align-items:flex-start}.btn{width:100%}}
`;

export default function AssuranceIndexPage(){
  return <main>
    <style dangerouslySetInnerHTML={{__html:styles}} />
    <header className="nav"><div className="wrap navin"><a className="brand" href="/">NULLWORKS / Assurance Index</a><CommercialThemeToggle /></div></header>
    <section className="hero"><div className="wrap">
      <span className="eyebrow">Evidence before ranking</span>
      <h1>Compare what the system is, what it costs, and what has actually been tested.</h1>
      <p className="lead">The Assurance Index separates source model, software license, delivery model, public pricing, platform availability, and NULLWORKS assurance status so unlike things are not quietly presented as equivalent.</p>
      <div className="truth"><b>Independence rule:</b> a platform cannot buy listing, ranking, or a favorable result. A builder may pay NULLWORKS for an assurance engagement or retest. Payment purchases the work, never the conclusion.</div>
    </div></section>

    <section className="section"><div className="wrap"><h2>Current verified profiles</h2><p className="intro">Only fields supported by current primary sources are displayed as facts. Unknown stays unknown. Additional systems enter the index through public-source profiling, builder submission, or a disclosed assurance engagement.</p>
      <div className="grid cols2">
        <article className="card">
          <span className="tag good">Independent NULLWORKS review</span>
          <h3>CIRIS</h3>
          <p>Private, auditable AI agent and epistemic-web ecosystem. The public proof covers a pinned CIRISAgent / CIRISPersist review performed by NULLWORKS.</p>
          <div className="facts">
            <div className="fact"><b>Source model</b><span>Open source</span></div>
            <div className="fact"><b>License</b><span>AGPL-3.0</span></div>
            <div className="fact"><b>Delivery</b><span>Self-host + hosted services</span></div>
            <div className="fact"><b>Platforms</b><span>iOS · Android · Windows · macOS · Linux · Docker</span></div>
            <div className="fact"><b>Software price</b><span>Free / open source</span></div>
            <div className="fact"><b>Hosted proxy</b><span>$0.10 / interaction publicly listed</span></div>
          </div>
          <p><b>Assurance status:</b> Credible architecture / conditional assurance on the pinned revision. Production deployment was not observed.</p>
          <p><b>Evidence depth:</b> Documented → code present → project tested → independently reproduced. Public proof includes 42/42 selected tests, 10/10 source checks, and a direct authority probe.</p>
          <p><b>Last metadata verification:</b> August 26, 2026.</p>
          <div className="actions"><a className="btn primary" href="/ciris-proof">Open public proof</a><a className="btn" href="https://ciris.ai/install/" target="_blank" rel="noreferrer">Verify installation</a></div>
        </article>
        <article className="card">
          <span className="tag">Next profile</span>
          <h3>No pay-to-play slot</h3>
          <p>The next system is added when it is useful to the index and the metadata can be verified. Builder submissions are welcome, but payment is neither required nor sufficient for inclusion.</p>
          <div className="actions"><a className="btn primary" href="mailto:nullworks.neuraxis@gmail.com?subject=Submit%20a%20system%20to%20the%20NULLWORKS%20Assurance%20Index">Submit a system</a><a className="btn" href="/assurance">Commission assurance</a></div>
        </article>
      </div>
    </div></section>

    <section className="section"><div className="wrap"><h2>How systems enter the index</h2><div className="policy">
      <div className="card"><div className="rule"><b>Public-source profile</b><span>NULLWORKS independently catalogs publicly verifiable metadata. No payment and no assurance conclusion.</span></div><div className="rule"><b>Builder submission</b><span>A builder asks to be considered. Submission is free and does not guarantee inclusion or placement.</span></div></div>
      <div className="card"><div className="rule"><b>Builder-sponsored assurance</b><span>The builder pays for testing. The sponsorship is disclosed and the evidence standard does not change.</span></div><div className="rule"><b>Remediation retest</b><span>A builder may commission verification after fixes. The new receipt sits beside the old one rather than rewriting history.</span></div></div>
    </div></div></section>

    <section className="section"><div className="wrap"><h2>What the badges mean</h2><div className="grid cols2">
      <div className="card"><h3>Source status is not assurance status.</h3><p>Open source, open core, source available, and closed source describe access and licensing. They do not tell you whether the system is safe, governable, reliable, or well tested.</p></div>
      <div className="card"><h3>Price is not rank.</h3><p>Free software may require infrastructure. Hosted services may carry usage fees. Enterprise pricing may be private. The index records the public commercial model without treating price as quality.</p></div>
    </div><div className="actions"><a className="btn primary" href="/triage">Start self-guided triage</a><a className="btn" href="/assurance">See NULLWORKS services</a></div></div></section>

    <footer className="footer"><div className="wrap"><b>NULLWORKS</b><br/>Claim → Control → Test → Receipt.<br/>Commercial relationship never changes the evidence standard or assurance result.</div></footer>
  </main>
}
