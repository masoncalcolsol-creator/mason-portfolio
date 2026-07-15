const questions = [
  ["01", "What happened?", "The event, failure, installation, repair, launch, or improvement as the person experienced it."],
  ["02", "What did the standard miss?", "The exception, judgment call, workaround, warning sign, or local condition that never entered the formal record."],
  ["03", "Where was the pain?", "The delay, rework, confusion, physical strain, quality risk, or human cost that taught the real lesson."],
  ["04", "What changed?", "The correction, teaching method, design decision, operating rule, or relationship that made the system better."],
  ["05", "What must remain human?", "The authority, responsibility, dignity, and judgment that should not be delegated to AI."],
];

const protections = [
  "Voluntary participation",
  "No confidential information",
  "Source attribution",
  "Human review and correction",
  "Evidence-class labels",
  "Human Authority remains final",
];

export default function ToyotaWisdomMiningPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f3f0e7", color: "#161914", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <style>{`
        *{box-sizing:border-box}body{margin:0}a{color:inherit}.shell{width:min(1120px,100%);margin:0 auto;padding:20px}.nav{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:10px 0 24px;border-bottom:1px solid #c9c5b8}.mark{font-weight:950;letter-spacing:.08em;text-decoration:none}.mark span{color:#9d6d00}.navlinks{display:flex;gap:15px;flex-wrap:wrap;font-size:12px;color:#615d52}.hero{padding:70px 0 44px;display:grid;grid-template-columns:1.08fr .92fr;gap:42px;align-items:center}.eyebrow{font-size:12px;font-weight:950;letter-spacing:.17em;color:#9d6d00;text-transform:uppercase}h1{font-family:Georgia,serif;font-size:clamp(50px,8vw,94px);line-height:.92;letter-spacing:-.065em;margin:18px 0 24px}.lead{font-size:clamp(21px,3vw,31px);line-height:1.22;color:#37382f;max-width:760px}.body{font-size:17px;line-height:1.7;color:#5d5c52;max-width:760px}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}.button{display:inline-flex;padding:15px 19px;border-radius:4px;text-decoration:none;font-size:13px;font-weight:950;letter-spacing:.04em;text-transform:uppercase}.primary{background:#1d211b;color:#fff}.secondary{border:1px solid #8a8476;color:#262820}.panel{background:#1c211b;color:white;padding:30px;border-radius:8px;box-shadow:0 24px 70px rgba(31,35,28,.17)}.panelLabel{color:#e1b84d;font-size:12px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.panel h3{font-family:Georgia,serif;font-size:34px;line-height:1.02;margin:16px 0}.panel p{color:#c5cabc;line-height:1.65}.signal{border-left:3px solid #e1b84d;padding-left:16px;margin-top:26px;font-size:18px;font-weight:800;line-height:1.4}section{padding:66px 0;border-top:1px solid #d2cec2}.sectionLabel{color:#9d6d00;font-size:12px;font-weight:950;letter-spacing:.16em;text-transform:uppercase}h2{font-family:Georgia,serif;font-size:clamp(38px,6vw,68px);letter-spacing:-.055em;line-height:.95;margin:14px 0 25px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.card{border:1px solid #cbc6b8;background:#faf8f2;padding:25px;border-radius:6px}.card strong{display:block;font-size:20px;margin-bottom:8px}.card p{color:#626057;line-height:1.58;margin:0}.steps{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.step{background:#faf8f2;border:1px solid #cbc6b8;padding:20px;min-height:220px}.num{color:#9d6d00;font-weight:950;font-size:13px}.step h3{font-size:19px;margin:25px 0 10px}.step p{color:#68665c;font-size:14px;line-height:1.55}.protect{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:25px}.protect div{background:#1d211b;color:white;padding:20px;text-align:center;font-weight:850}.quote{background:#d7ae42;color:#151710;padding:34px;font-family:Georgia,serif;font-size:clamp(30px,5vw,58px);font-weight:800;line-height:1.01;letter-spacing:-.04em}.ask{display:grid;grid-template-columns:1fr .8fr;gap:28px;align-items:center}.footer{padding:40px 0 70px;color:#777266;font-size:13px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}@media(max-width:800px){.hero,.grid2,.ask{grid-template-columns:1fr}.hero{padding-top:42px}.steps,.protect{grid-template-columns:1fr}.navlinks{display:none}.shell{padding:18px}.body{font-size:16px}.step{min-height:0}section{padding:48px 0}}
      `}</style>

      <div className="shell">
        <nav className="nav">
          <a href="/" className="mark"><span>NW</span> NULLWORKS</a>
          <div className="navlinks"><a href="/operational-systems">OPERATIONAL SYSTEMS</a><a href="/model-agnostic-transplant">MODEL-AGNOSTIC RESEARCH</a><a href="/field-notes">FIELD NOTES</a></div>
        </nav>

        <header className="hero">
          <div>
            <div className="eyebrow">Active exploration // Human-centered Operational Intelligence</div>
            <h1>Mine the wisdom before it disappears.</h1>
            <p className="lead">What did the people who installed, operated, repaired, taught, and improved the system learn that the documents never preserved?</p>
            <p className="body">NULLWORKS is exploring a respectful way to preserve lived operational experience as source-attributed, reviewable, correctable context for future human-AI systems. Not to replace experienced people. To keep their judgment, pain, failures, exceptions, and hard-earned lessons from vanishing when they retire, transfer, or leave.</p>
            <div className="actions"><a className="button primary" href="#question">Explore the question</a><a className="button secondary" href="mailto:masoncalcolsol@gmail.com?subject=Toyota%20Wisdom%20Mining%20Research">Share a perspective</a></div>
          </div>
          <div className="panel">
            <div className="panelLabel">The continuity gap</div>
            <h3>Documents preserve the process. People preserve why it works.</h3>
            <p>Standards, manuals, reports, and databases rarely contain the hesitation before a bad decision, the sound that signaled a failure, the workaround that saved a shift, the teaching story that finally made the lesson stick, or the scar that changed the standard.</p>
            <div className="signal">The missing layer may not be more AI. It may be better continuity around human experience.</div>
          </div>
        </header>

        <section id="question">
          <div className="sectionLabel">01 // The research question</div>
          <h2>Can lived experience become governed operational context?</h2>
          <div className="grid2">
            <div className="card"><strong>What is being lost</strong><p>Failure history, exception judgment, installation pain, repair intuition, teaching methods, operator language, cross-generational context, and the reasons behind rules.</p></div>
            <div className="card"><strong>What we are testing</strong><p>Whether voluntary oral history and evidence-linked interviews can create useful digital continuity without collecting confidential information, flattening the contributor, or transferring authority to AI.</p></div>
          </div>
        </section>

        <section>
          <div className="sectionLabel">02 // The wisdom-mining sequence</div>
          <h2>Preserve the lesson, not just the outcome.</h2>
          <div className="steps">{questions.map(([n,t,b]) => <div className="step" key={n}><div className="num">{n}</div><h3>{t}</h3><p>{b}</p></div>)}</div>
        </section>

        <section>
          <div className="sectionLabel">03 // The Toyota relevance</div>
          <h2>A production system is also a teaching system.</h2>
          <p className="body">Toyota's public legacy of standardized work, continuous improvement, learning at the place where work happens, and respect for people makes former and current Toyota operators unusually important teachers for this question. Woven City also publicly frames experimentation as human-centered, real-world, and iterative. This research asks whether the wisdom carried by people can be treated as part of the operating architecture—not as disposable memory.</p>
          <p className="body"><strong>Important boundary:</strong> This is independent exploratory research. NULLWORKS is not affiliated with Toyota, Woven by Toyota, or the Toyota Production System Support Center, and no endorsement is implied.</p>
        </section>

        <section>
          <div className="sectionLabel">04 // Human protection</div>
          <h2>The contributor is not raw material.</h2>
          <p className="body">A useful system must preserve consent, attribution, correction, uncertainty, confidentiality, and the contributor's right to say that a lesson has been misunderstood. Human Authority remains final.</p>
          <div className="protect">{protections.map((p) => <div key={p}>{p}</div>)}</div>
        </section>

        <section><div className="quote">The goal is not to make AI sound experienced. The goal is to let experience remain available, accountable, and human.</div></section>

        <section>
          <div className="sectionLabel">05 // The request</div>
          <div className="ask">
            <div><h2>Tell us what we are missing.</h2><p className="body">We are asking current and former Toyota operators, engineers, teachers, maintenance leaders, supplier-development people, and executives one question: Is this worth pursuing, and what would make it useful—or dangerous?</p></div>
            <div className="panel"><div className="panelLabel">No pitch. No confidential request.</div><h3>Five questions. One human conversation.</h3><p>What knowledge disappears? What cannot be captured in documents? Which failures teach the most? What would make a digital system trustworthy? What must never be delegated to AI?</p><div className="actions"><a className="button primary" href="mailto:masoncalcolsol@gmail.com?subject=Perspective%20on%20Operational%20Wisdom%20Mining">Share your perspective</a></div></div>
          </div>
        </section>

        <footer className="footer"><span>NULLWORKS · Operational Intelligence Systems Architecture</span><span>Independent research · July 15, 2026 · No Toyota affiliation or endorsement implied.</span></footer>
      </div>
    </main>
  );
}
