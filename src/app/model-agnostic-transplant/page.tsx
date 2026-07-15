const metrics = [
  ["01", "Governed floor", "Authority, company identity, doctrine, boundaries."],
  ["02", "Founder model", "Identity, philosophy, receipts, current direction."],
  ["03", "Mission packet", "The same work request, evidence, and review rules."],
  ["04", "Native output", "Preserved before correction, interpretation, or redesign."],
  ["05", "Comparison", "Fidelity, drift, usefulness, re-explanation, unsupported claims."],
];

const engines = ["OpenAI GPT", "Anthropic Claude", "Google Gemini", "IBM watsonx", "Future compatible models"];

export default function ModelAgnosticTransplantPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#02070c", color: "#f5f8fb", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <style>{`
        *{box-sizing:border-box} body{margin:0} a{color:inherit}
        .shell{width:min(1180px,100%);margin:0 auto;padding:22px}
        .nav{display:flex;justify-content:space-between;align-items:center;gap:18px;padding:10px 0 28px;border-bottom:1px solid #23323d}
        .mark{font-weight:950;letter-spacing:.08em}.mark span{color:#ffad00}
        .navlinks{display:flex;gap:16px;flex-wrap:wrap;font-size:13px;color:#9fb1be}
        .hero{padding:68px 0 38px;display:grid;grid-template-columns:1.03fr .97fr;gap:44px;align-items:center}
        .eyebrow{font-size:12px;font-weight:900;letter-spacing:.18em;color:#ffad00;text-transform:uppercase}
        h1{font-size:clamp(48px,8vw,96px);line-height:.88;letter-spacing:-.07em;margin:18px 0 24px;text-transform:uppercase}
        .lead{font-size:clamp(20px,3vw,31px);line-height:1.22;color:#d8e8f2;max-width:750px}
        .body{font-size:17px;line-height:1.7;color:#9fb1be;max-width:720px}
        .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}
        .button{display:inline-flex;padding:15px 19px;border-radius:5px;text-decoration:none;font-size:13px;font-weight:900;letter-spacing:.04em;text-transform:uppercase}
        .primary{background:#ffad00;color:#071017}.secondary{border:1px solid #33546a;color:#dff5ff}
        .art{width:100%;border:1px solid #27465b;border-radius:14px;box-shadow:0 30px 80px rgba(0,0,0,.5)}
        section{padding:66px 0;border-top:1px solid #1c2a34}
        .sectionLabel{color:#ffad00;font-size:12px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}
        h2{font-size:clamp(36px,6vw,66px);letter-spacing:-.055em;line-height:.94;margin:14px 0 25px;text-transform:uppercase}
        .grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.card{border:1px solid #233844;background:#071018;padding:25px;border-radius:8px}
        .card strong{display:block;color:white;font-size:20px;margin-bottom:8px}.card p{color:#9fb1be;line-height:1.55;margin:0}
        .steps{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.step{background:#071018;border:1px solid #233844;padding:20px;min-height:180px}.num{color:#ffad00;font-weight:950;font-size:13px}.step h3{font-size:19px;margin:25px 0 10px}.step p{color:#91a7b6;font-size:14px;line-height:1.5}
        .engineGrid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:24px}.engine{border:1px solid #2c526b;background:#07121b;padding:21px;text-align:center;font-weight:850}
        .quote{background:#ffad00;color:#051018;padding:32px;font-size:clamp(28px,5vw,56px);font-weight:950;line-height:.98;letter-spacing:-.045em;text-transform:uppercase}
        .origin{display:grid;grid-template-columns:1fr 1fr;gap:30px}.origin p{font-size:18px;color:#a9bbc7;line-height:1.7}
        .footer{padding:40px 0 70px;color:#6f8593;font-size:13px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}
        @media(max-width:800px){.hero,.grid2,.origin{grid-template-columns:1fr}.hero{padding-top:42px}.steps,.engineGrid{grid-template-columns:1fr}.navlinks{display:none}.shell{padding:18px}.body{font-size:16px}.step{min-height:0}section{padding:48px 0}}
      `}</style>

      <div className="shell">
        <nav className="nav">
          <a href="/" className="mark" style={{ textDecoration: "none" }}><span>NW</span> NULLWORKS</a>
          <div className="navlinks"><a href="/field-notes">FIELD NOTES</a><a href="/oisa-category">OISA</a><a href="/operational-systems">OPERATIONAL SYSTEMS</a></div>
        </nav>

        <header className="hero">
          <div>
            <div className="eyebrow">Active experiment // Day 170</div>
            <h1>The operating system must travel.</h1>
            <p className="lead">Can Operational Intelligence remain coherent when the underlying AI engine changes?</p>
            <p className="body">NULLWORKS is testing a model-agnostic transplant: the same governed identity, doctrine, evidence, context routing, mission, truth boundaries, and human authority—materialized across GPT, Claude, Gemini, IBM watsonx, and future models.</p>
            <div className="actions">
              <a className="button primary" href="#experiment">Explore the experiment</a>
              <a className="button secondary" href="/field-notes">Read the field notes</a>
            </div>
          </div>
          <a href="/model-agnostic-transplant.svg" target="_blank" rel="noreferrer"><img className="art" src="/model-agnostic-transplant.svg" alt="NULLWORKS model-agnostic Operational Intelligence transplant diagram" /></a>
        </header>

        <section id="experiment">
          <div className="sectionLabel">01 // The architectural claim</div>
          <h2>The model is the engine. NULLWORKS is the nervous system.</h2>
          <div className="grid2">
            <div className="card"><strong>What travels</strong><p>Company floor, founder identity, operating philosophy, evidence, memory, context routing, telemetry, quality gates, correction history, and Human Authority.</p></div>
            <div className="card"><strong>What does not travel</strong><p>Provider identity, native model behavior, unsupported memories, hidden tool access, manufactured feelings, or a forced imitation of another AI.</p></div>
          </div>
        </section>

        <section>
          <div className="sectionLabel">02 // The test line</div>
          <h2>One operating packet. Multiple reasoning engines.</h2>
          <div className="engineGrid">{engines.map((e) => <div className="engine" key={e}>{e}</div>)}</div>
        </section>

        <section>
          <div className="sectionLabel">03 // The production sequence</div>
          <h2>We compare the system, not the vibes.</h2>
          <div className="steps">{metrics.map(([n,t,b]) => <div className="step" key={n}><div className="num">{n}</div><h3>{t}</h3><p>{b}</p></div>)}</div>
        </section>

        <section>
          <div className="sectionLabel">04 // Why now</div>
          <div className="origin">
            <div><h2>It started with a baseball card gimmick.</h2></div>
            <div><p>The AI Doubleheader asked different AI workrooms to render a baseball card describing their role in a human relationship. The cards exposed deeper failures: context changed roles, continuity changed identity, mission changed meaning, renderers changed facts, and larger memory packets sometimes flattened the local worker instead of preserving it.</p><p>That turned a public artifact into a model-agnostic systems question: can the operating architecture move without forcing every model to become the same personality?</p></div>
          </div>
        </section>

        <section>
          <div className="sectionLabel">05 // Research boundary</div>
          <h2>Ongoing means ongoing.</h2>
          <div className="grid2">
            <div className="card"><strong>We are testing</strong><p>Transfer fidelity, doctrine retention, identity drift, temporal reasoning, unsupported claims, first-response usefulness, re-explanation burden, and export fidelity.</p></div>
            <div className="card"><strong>We are not claiming</strong><p>Consciousness, equivalent models, perfect cloning, provider endorsement, permanent memory, or a finished universal standard. Native differences are part of the experiment.</p></div>
          </div>
        </section>

        <section><div className="quote">Same mission. Different engine. Human Authority remains final.</div></section>

        <section>
          <div className="sectionLabel">06 // Current state</div>
          <h2>Claude is first on the transplant table.</h2>
          <p className="body">The first human-readable portable packet has been built for a fresh Anthropic Claude workroom. The native boot response and first common mission will be preserved before correction. Gemini and IBM-compatible versions follow after the first protocol is tested.</p>
          <div className="actions"><a className="button primary" href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20Model-Agnostic%20Transplant">Follow the research</a><a className="button secondary" href="/ai-audit">Explore the AI Operating Model Audit</a></div>
        </section>

        <footer className="footer"><span>NULLWORKS · Operational Intelligence Systems Architecture</span><span>Research initiated July 15, 2026 · No provider affiliation or endorsement implied.</span></footer>
      </div>
    </main>
  );
}
