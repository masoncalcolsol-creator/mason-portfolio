const questions = [
  ["01", "What happened?", "The event, failure, installation, repair, launch, or improvement as the person actually experienced it."],
  ["02", "What did the standard miss?", "The exception, judgment call, workaround, warning sign, local condition, or relationship that never entered the formal record."],
  ["03", "Where was the pain?", "The delay, rework, confusion, physical strain, quality risk, conflict, or human cost that taught the real lesson."],
  ["04", "What changed?", "The correction, teaching method, design decision, operating rule, or habit that made the system better."],
  ["05", "Who needs this later?", "The future operator, engineer, teacher, organization, or AI-assisted workflow most likely to benefit from the lesson."],
];

const protections = [
  "Voluntary participation",
  "No confidential information",
  "Source attribution",
  "Human review and correction",
  "Evidence-class labels",
  "Human Authority remains final",
];

const captureModes = [
  ["Speak", "A guided or uninterrupted audio conversation for people who do not want to type."],
  ["Show", "Optional video for demonstrations, physical cues, tools, sounds, spaces, and embodied teaching."],
  ["Review", "A transcript and structured summary returned to the contributor for correction before sharing."],
  ["Route", "The preserved lesson is connected later to the person, problem, or system most likely to benefit."],
];

export default function WisdomMiningPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f3f0e7", color: "#171914", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <style>{`
        *{box-sizing:border-box}body{margin:0}a{color:inherit}.shell{width:min(1120px,100%);margin:0 auto;padding:20px}.nav{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:10px 0 24px;border-bottom:1px solid #c9c5b8}.mark{font-weight:950;letter-spacing:.08em;text-decoration:none}.mark span{color:#9d6d00}.navlinks{display:flex;gap:15px;flex-wrap:wrap;font-size:12px;color:#514f47}.hero{padding:70px 0 44px;display:grid;grid-template-columns:1.08fr .92fr;gap:42px;align-items:center}.eyebrow{font-size:12px;font-weight:950;letter-spacing:.17em;color:#805900;text-transform:uppercase}h1{font-family:Georgia,serif;font-size:clamp(50px,8vw,94px);line-height:.92;letter-spacing:-.065em;margin:18px 0 24px}.lead{font-size:clamp(21px,3vw,31px);line-height:1.22;color:#2e302a;max-width:760px}.body{font-size:17px;line-height:1.7;color:#4e4d45;max-width:790px}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}.button{display:inline-flex;padding:15px 19px;border-radius:4px;text-decoration:none;font-size:13px;font-weight:950;letter-spacing:.04em;text-transform:uppercase}.primary{background:#1d211b;color:#fff}.secondary{border:1px solid #756f63;color:#23251f;background:#f3f0e7}.panel{background:#1c211b;color:#fff;padding:30px;border-radius:8px;box-shadow:0 24px 70px rgba(31,35,28,.17)}.panelLabel{color:#f0c85d;font-size:12px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.panel h3{font-family:Georgia,serif;font-size:34px;line-height:1.02;margin:16px 0}.panel p{color:#d4d8cd;line-height:1.65}.signal{border-left:3px solid #e1b84d;padding-left:16px;margin-top:26px;font-size:18px;font-weight:800;line-height:1.4;color:#fff}section{padding:66px 0;border-top:1px solid #d2cec2}.sectionLabel{color:#805900;font-size:12px;font-weight:950;letter-spacing:.16em;text-transform:uppercase}h2{font-family:Georgia,serif;font-size:clamp(38px,6vw,68px);letter-spacing:-.055em;line-height:.95;margin:14px 0 25px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px}.card{border:1px solid #c8c2b3;background:#fbf9f3;padding:25px;border-radius:6px}.card strong{display:block;font-size:20px;margin-bottom:8px;color:#171914}.card p{color:#515047;line-height:1.58;margin:0}.steps{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.step{background:#fbf9f3;border:1px solid #c8c2b3;padding:20px;min-height:240px}.num{color:#805900;font-weight:950;font-size:13px}.step h3{font-size:19px;margin:25px 0 10px;color:#171914}.step p{color:#55544c;font-size:14px;line-height:1.55}.protect{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:25px}.protect div{background:#1d211b;color:#fff;padding:20px;text-align:center;font-weight:850}.quote{background:#d7ae42;color:#151710;padding:34px;font-family:Georgia,serif;font-size:clamp(30px,5vw,58px);font-weight:800;line-height:1.01;letter-spacing:-.04em}.ask{display:grid;grid-template-columns:1fr .8fr;gap:28px;align-items:center}.capture{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:25px}.capture div{background:#fbf9f3;border:1px solid #c8c2b3;padding:22px}.capture strong{display:block;font-size:18px;margin-bottom:8px}.capture p{color:#55544c;line-height:1.55;margin:0;font-size:14px}.finite{background:#281f0d;color:#fff;padding:34px;border-radius:8px}.finite h3{font-family:Georgia,serif;font-size:clamp(30px,5vw,54px);line-height:1;margin:0 0 18px}.finite p{color:#efe4c6;font-size:18px;line-height:1.65;margin:0}.footer{padding:40px 0 70px;color:#676258;font-size:13px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}@media(max-width:800px){.hero,.grid2,.ask{grid-template-columns:1fr}.hero{padding-top:42px}.steps,.protect,.capture{grid-template-columns:1fr}.navlinks{display:none}.shell{padding:18px}.body{font-size:16px}.step{min-height:0}section{padding:48px 0}}
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
            <p className="lead">Human experience is a finite, living operational resource. Every retirement, transfer, illness, and death can remove context that no database ever captured.</p>
            <p className="body">NULLWORKS is exploring a respectful way to preserve lived operational experience as source-attributed, reviewable, correctable context for future people and human-AI systems. Not to replace experts. To keep their judgment, pain, failures, exceptions, teaching stories, and hard-earned lessons from vanishing.</p>
            <div className="actions"><a className="button primary" href="#question">Explore the question</a><a className="button secondary" href="mailto:masoncalcolsol@gmail.com?subject=Operational%20Wisdom%20Mining%20Research">Share a perspective</a></div>
          </div>
          <div className="panel">
            <div className="panelLabel">The continuity gap</div>
            <h3>Documents preserve the process. People preserve why it works.</h3>
            <p>Standards, manuals, reports, and databases rarely contain the hesitation before a bad decision, the sound that signaled a failure, the workaround that saved a shift, the teaching story that made the lesson stick, or the scar that changed the standard.</p>
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
          <div className="sectionLabel">02 // The finite resource</div>
          <div className="finite"><h3>This knowledge is drying up while we debate whether to preserve it.</h3><p>Unlike oil, ore, or archived documents, lived operational context has no predictable reserve estimate. We know it is disappearing. We do not know which lesson will become critically valuable tomorrow, or which person will be gone before anyone asks. The practical response is not panic. It is a respectful, evidence-governed preservation program built now.</p></div>
        </section>

        <section>
          <div className="sectionLabel">03 // The wisdom-mining sequence</div>
          <h2>Preserve the lesson, not just the outcome.</h2>
          <div className="steps">{questions.map(([n,t,b]) => <div className="step" key={n}><div className="num">{n}</div><h3>{t}</h3><p>{b}</p></div>)}</div>
        </section>

        <section>
          <div className="sectionLabel">04 // Global relevance</div>
          <h2>Every mature operating system has elders.</h2>
          <p className="body">Manufacturing, utilities, aerospace, logistics, mining, transportation, public infrastructure, medicine, agriculture, software, emergency services, and skilled trades all depend on people who remember what failed, what hurt, what changed, and why the current system looks the way it does.</p>
          <p className="body">Toyota, Honda, Kawasaki, Yamaha, Mitsubishi, German manufacturers, Ukrainian repair and resilience teams, North American utilities, public agencies, family businesses, and thousands of other organizations may carry different traditions—but the continuity problem is universal.</p>
          <p className="body"><strong>Important boundary:</strong> This is independent exploratory research. Mentioning an organization identifies a relevant knowledge community, not affiliation, approval, participation, or endorsement.</p>
        </section>

        <section>
          <div className="sectionLabel">05 // Capture should fit the human</div>
          <h2>Do not make an experienced person type a report if they can tell the story.</h2>
          <p className="body">The long-term capture system should accept text, audio, or video. A contributor should be able to speak naturally, receive a transcript and structured interpretation, correct it, approve its use, and retain attribution. The original recording can preserve tone, timing, physical cues, and teaching value that a summary cannot.</p>
          <div className="capture">{captureModes.map(([t,b]) => <div key={t}><strong>{t}</strong><p>{b}</p></div>)}</div>
          <p className="body" style={{marginTop:"22px"}}><strong>Current state:</strong> this page describes the research direction. The guided voice, audio, video, transcript-review, consent, and routing workflow is not yet presented here as a completed public product.</p>
        </section>

        <section>
          <div className="sectionLabel">06 // Human protection</div>
          <h2>The contributor is not raw material.</h2>
          <p className="body">A useful system must preserve consent, attribution, correction, uncertainty, confidentiality, contributor dignity, and the right to withdraw or restrict a lesson. Human Authority remains final.</p>
          <div className="protect">{protections.map((p) => <div key={p}>{p}</div>)}</div>
        </section>

        <section><div className="quote">The goal is not to make AI sound experienced. The goal is to keep human experience available, accountable, and routable.</div></section>

        <section>
          <div className="sectionLabel">07 // The routing hypothesis</div>
          <div className="ask">
            <div><h2>A lesson may be useless here and monumental somewhere else.</h2><p className="body">Preservation is only half the problem. Operational Intelligence must eventually route a verified story to the future person, team, failure mode, or decision that gives it value. The artifact, its context, and the recipient form the useful unit.</p></div>
            <div className="panel"><div className="panelLabel">No pitch. No confidential request.</div><h3>Challenge the hypothesis.</h3><p>What knowledge disappears? What cannot be captured in documents? Which failures teach the most? What would make a digital system trustworthy? What must never be delegated to AI?</p><div className="actions"><a className="button primary" href="mailto:masoncalcolsol@gmail.com?subject=Perspective%20on%20Operational%20Wisdom%20Mining">Share your perspective</a></div></div>
          </div>
        </section>

        <footer className="footer"><span>NULLWORKS · Operational Intelligence Systems Architecture</span><span>Independent global research · July 15, 2026 · No organizational affiliation or endorsement implied.</span></footer>
      </div>
    </main>
  );
}
