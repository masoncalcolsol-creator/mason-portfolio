import type { Metadata } from "next";

const POSTER = "/images/linked-out-parallel-universe-poster.svg";

export const metadata: Metadata = {
  title: "LINKED-OUT | The Edge Case That Could Fix the Filter",
  description:
    "A receipt-backed field thesis on LinkedIn, AI hiring, nonlinear candidates, and the missing whole-path owner. By Mason Perry and NULLWORKS.",
  alternates: { canonical: "/linked-out" },
  openGraph: {
    type: "article",
    title: "LINKED-OUT: The Edge Case That Could Fix the Filter",
    description:
      "The failure is not one bad model. It is an unowned operating path. Read the NULLWORKS field thesis.",
    url: "/linked-out",
    siteName: "NULLWORKS",
    publishedTime: "2026-07-13T00:00:00-07:00",
    authors: ["Mason Perry"],
    images: [{ url: POSTER, width: 1024, height: 1536, alt: "LINKED-OUT campaign poster" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LINKED-OUT: The Edge Case That Could Fix the Filter",
    description: "A receipt-backed field thesis on AI hiring and the missing whole-path owner.",
    images: [POSTER],
  },
};

const loop = [
  "AI makes applying easier.",
  "Application volume rises.",
  "Recruiters automate more screening.",
  "Candidates optimize their resumes for the screeners.",
  "Resumes become more machine-readable and less differentiating.",
  "Employers receive more apparently qualified applicants.",
  "More filtering becomes necessary.",
  "Nonlinear candidates become harder to recognize.",
  "Companies conclude that the required talent does not exist.",
  "The person capable of redesigning the system is rejected by the system.",
];

const evidence = [
  {
    title: "Resume retrieval can encode demographic bias",
    body: "Audited language-model retrieval systems have reproduced racial, gender, and intersectional disparities under controlled conditions. That does not establish how LinkedIn production systems behave, but it proves neutral-looking retrieval can carry structural bias.",
  },
  {
    title: "AI evaluators can prefer AI-written resumes",
    body: "Controlled studies have found model self-preference: candidates using the same model as the evaluator can receive an invisible compatibility advantage even when substantive quality is controlled.",
  },
  {
    title: "Fairness can hide incompetence",
    body: "A system may appear demographically neutral while performing only superficial keyword matching. Hiring systems require competence audits as well as bias audits.",
  },
  {
    title: "Uncertainty should be visible",
    body: "A nontraditional candidate is more likely to fall outside the assumptions of a conventional ranking model. Low confidence should route a case to structured review, not silently become a final verdict.",
  },
  {
    title: "Newer evidence includes counterevidence",
    body: "Some newer-model audits show reduced or reversed demographic gaps. The critique cannot be frozen around one generation of models; ontology, competence, self-preference, and whole-path ownership still require measurement.",
  },
  {
    title: "Architecture can improve outcomes",
    body: "A large randomized study found that a structured AI interview followed by human evaluation outperformed resume-first selection in that pipeline. AI is not inherently the failure. The operating model is the control surface.",
  },
];

const responsibilities = [
  "Start with the business outcome before selecting the title.",
  "Translate whole-path capability into observable responsibilities.",
  "Accept deployed work, source lineage, failure receipts, and operational artifacts alongside resumes.",
  "Separate poor match from system-does-not-understand-this-candidate.",
  "Create bounded exception lanes rather than bypassing controls.",
  "Name the human who can approve, override, escalate, and own the consequence.",
  "Connect screening decisions to interview quality, job performance, retention, and business outcomes.",
  "Revise or roll back ranking logic when evidence shows harm or incompetence.",
];

export default function LinkedOutPage() {
  return (
    <main className="page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #05070a; }
        .page {
          --night: #05070a;
          --paper: #f2ead9;
          --ink: #17140f;
          --gold: #d2a24b;
          --gold2: #f1d48f;
          --red: #b93b31;
          --muted: #b8b5ae;
          --line: rgba(210,162,75,.24);
          min-height: 100vh;
          overflow: hidden;
          color: #f5efe5;
          background:
            radial-gradient(circle at 8% 0%, rgba(185,59,49,.21), transparent 31rem),
            radial-gradient(circle at 94% 4%, rgba(210,162,75,.15), transparent 33rem),
            linear-gradient(180deg, #05070a 0%, #080c11 50%, #05070a 100%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .shell { width: min(1160px, calc(100% - 30px)); margin: 0 auto; }
        .topbar { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 20px 0; border-bottom: 1px solid var(--line); }
        .brand { display: flex; align-items: center; gap: 12px; color: inherit; text-decoration: none; }
        .mark { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 50%; border: 1px solid var(--gold); color: var(--gold2); font-family: Georgia, serif; font-size: 19px; font-weight: 900; }
        .eyebrow { color: var(--gold); font-size: 10px; font-weight: 950; letter-spacing: .18em; text-transform: uppercase; }
        .brandTitle { margin-top: 3px; font-family: Georgia, serif; font-size: 17px; }
        .nav { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 17px; }
        .nav a { color: #d8d0c0; text-decoration: none; font-size: 13px; font-weight: 800; }
        .hero { position: relative; display: grid; grid-template-columns: minmax(0,1.08fr) minmax(300px,.72fr); gap: clamp(34px,6vw,82px); align-items: center; padding: 72px 0 80px; }
        .hero::before { content: "NW"; position: absolute; left: -7vw; top: -6vw; pointer-events: none; font-family: Georgia, serif; font-size: clamp(190px,34vw,470px); font-weight: 900; color: rgba(255,255,255,.018); line-height: 1; }
        .heroCopy,.poster { position: relative; z-index: 1; }
        .pill { display: inline-flex; padding: 9px 13px; border-radius: 999px; color: var(--gold2); border: 1px solid rgba(210,162,75,.5); background: rgba(210,162,75,.07); font-size: 11px; font-weight: 950; letter-spacing: .15em; text-transform: uppercase; }
        h1 { max-width: 760px; margin: 20px 0 0; font-family: Georgia,"Times New Roman",serif; font-size: clamp(58px,8vw,104px); line-height: .88; letter-spacing: -.06em; }
        .subtitle { margin-top: 18px; color: var(--gold2); font-size: clamp(17px,2vw,23px); font-weight: 850; }
        .lead { max-width: 760px; margin: 24px 0 0; color: #c5c2ba; font-size: clamp(18px,2vw,22px); line-height: 1.62; }
        .quote { max-width: 740px; margin-top: 27px; padding-left: 18px; border-left: 3px solid var(--red); font-family: Georgia,serif; color: #fff0d0; font-size: clamp(23px,2.6vw,33px); line-height: 1.32; }
        .buttons { display: flex; flex-wrap: wrap; gap: 11px; margin-top: 30px; }
        .button { min-height: 49px; display: inline-flex; align-items: center; justify-content: center; padding: 13px 19px; border-radius: 999px; background: var(--gold2); color: #160f05; text-decoration: none; font-weight: 950; border: 1px solid transparent; }
        .button.secondary { background: transparent; color: var(--paper); border-color: rgba(242,234,217,.28); }
        .poster { margin: 0; padding: 10px; border: 1px solid rgba(210,162,75,.28); border-radius: 24px; background: linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.012)); box-shadow: 0 38px 110px rgba(0,0,0,.54); }
        .poster img { display: block; width: 100%; height: auto; border-radius: 16px; }
        .poster figcaption { margin: 12px 5px 3px; color: #92948f; font-size: 12px; line-height: 1.5; }
        .receipts { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; padding: 0 0 78px; }
        .receipt { min-height: 148px; padding: 22px; border-radius: 22px; border: 1px solid rgba(242,234,217,.15); background: linear-gradient(160deg,rgba(255,255,255,.047),rgba(255,255,255,.014)); }
        .number { color: var(--gold2); font-family: Georgia,serif; font-size: clamp(42px,5vw,64px); line-height: 1; }
        .receiptLabel { margin-top: 10px; color: #dad6cd; font-size: 14px; line-height: 1.45; }
        .small { margin-top: 8px; color: #8f938f; font-size: 11px; line-height: 1.45; }
        .section { padding: 78px 0; border-top: 1px solid var(--line); }
        .sectionLabel { color: var(--gold); font-size: 11px; font-weight: 950; letter-spacing: .17em; text-transform: uppercase; }
        h2 { max-width: 940px; margin: 12px 0 23px; font-family: Georgia,serif; font-size: clamp(40px,5.7vw,70px); line-height: .98; letter-spacing: -.045em; }
        .body { max-width: 910px; color: #c4c2bb; font-size: 18px; line-height: 1.78; }
        .body strong { color: #fff0cd; }
        .loop { display: grid; grid-template-columns: repeat(2,1fr); gap: 11px; margin-top: 32px; }
        .loopStep { display: grid; grid-template-columns: 46px 1fr; gap: 13px; align-items: center; padding: 17px 18px; border-radius: 18px; background: rgba(255,255,255,.025); border: 1px solid rgba(242,234,217,.14); }
        .loopNumber { color: var(--red); font-family: Georgia,serif; font-size: 28px; font-weight: 900; }
        .loopText { color: #d2cfc7; line-height: 1.45; }
        .paper { margin-top: 34px; padding: clamp(25px,4vw,46px); border-radius: 28px; color: var(--ink); background: radial-gradient(circle at 96% 5%,rgba(210,162,75,.22),transparent 18rem),var(--paper); position: relative; overflow: hidden; }
        .paper::after { content: "NW"; position: absolute; right: -20px; bottom: -58px; color: rgba(23,20,15,.045); font-family: Georgia,serif; font-size: 240px; font-weight: 900; line-height: 1; }
        .paper h3,.paper p,.paper .buttons { position: relative; z-index: 1; }
        .paper h3 { margin: 0; font-family: Georgia,serif; font-size: clamp(31px,4vw,51px); }
        .paper p { max-width: 860px; color: #453b2c; font-size: 17px; line-height: 1.72; }
        .grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 13px; margin-top: 33px; }
        .card { padding: 22px; border-radius: 21px; border: 1px solid rgba(242,234,217,.15); background: linear-gradient(155deg,rgba(255,255,255,.044),rgba(255,255,255,.012)); }
        .card h3 { margin: 0 0 9px; font-family: Georgia,serif; font-size: 27px; }
        .card p { margin: 0; color: #aaada8; line-height: 1.62; }
        .list { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-top: 32px; }
        .item { position: relative; padding: 17px 18px 17px 46px; border: 1px solid rgba(242,234,217,.14); border-radius: 18px; color: #d0cdc5; line-height: 1.55; background: rgba(255,255,255,.022); }
        .item::before { content: "✓"; position: absolute; left: 18px; top: 17px; color: var(--gold2); font-weight: 950; }
        .truth { padding: clamp(25px,4vw,42px); border-radius: 26px; border: 1px solid rgba(185,59,49,.55); background: linear-gradient(145deg,rgba(185,59,49,.14),rgba(255,255,255,.018)); }
        .truth h3 { margin: 0; font-family: Georgia,serif; font-size: clamp(30px,4vw,48px); }
        .truth p { max-width: 900px; color: #c9c5bc; font-size: 17px; line-height: 1.72; }
        .final { margin: 76px 0; padding: clamp(28px,5vw,58px); border-radius: 30px; background: var(--paper); color: var(--ink); position: relative; overflow: hidden; }
        .final::after { content: "NW"; position: absolute; right: -22px; bottom: -62px; color: rgba(24,20,15,.045); font-family: Georgia,serif; font-size: 225px; font-weight: 900; }
        .final h2,.final p,.final .buttons { position: relative; z-index: 1; }
        .final h2 { margin-top: 0; }
        .final p { max-width: 850px; color: #453b2c; font-size: 18px; line-height: 1.75; }
        .final .button { background: #0b141d; color: var(--paper); }
        footer { padding: 26px 0 40px; color: #8d918d; font-size: 12px; border-top: 1px solid var(--line); }
        @media (max-width: 900px) { .hero { grid-template-columns: 1fr; } .poster { width: min(620px,100%); margin: 0 auto; } .receipts { grid-template-columns: repeat(2,1fr); } .grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 640px) { .shell { width: min(100% - 22px,1160px); } .topbar { align-items: flex-start; } .nav { max-width: 135px; gap: 8px; } .nav a { text-align: right; line-height: 1.35; } .hero { padding-top: 52px; } h1 { font-size: clamp(51px,17vw,76px); } .receipts,.loop,.grid,.list { grid-template-columns: 1fr; } .section { padding: 60px 0; } }
      `}</style>

      <div className="shell">
        <header className="topbar">
          <a className="brand" href="/" aria-label="Open the NULLWORKS public operating map">
            <span className="mark">NW</span>
            <span><span className="eyebrow">NULLWORKS // FIELD THESIS 01</span><span className="brandTitle">Operational Intelligence</span></span>
          </a>
          <nav className="nav" aria-label="LINKED-OUT navigation">
            <a href="#paper">Read the thesis</a>
            <a href="/linked-out/afterword">Production afterword</a>
          </nav>
        </header>

        <section className="hero">
          <div className="heroCopy">
            <span className="pill">Web edition // July 2026</span>
            <h1>LINKED-OUT</h1>
            <div className="subtitle">The Edge Case That Could Fix the Filter</div>
            <p className="lead">LinkedIn is the visible interface. Hiring is the larger operating system. This paper examines what happens when AI optimizes individual steps while no accountable function owns the complete path from real human capability to a defensible organizational decision.</p>
            <div className="quote">The edge case that could fix the filter cannot survive the filter.</div>
            <div className="buttons">
              <a className="button" href="#paper">Read the web edition →</a>
              <a className="button secondary" href="/linked-out/afterword">How it was built</a>
            </div>
          </div>
          <figure className="poster">
            <img src={POSTER} alt="LINKED-OUT parallel-universe campaign poster showing two specialized workrooms under one operator" />
            <figcaption>The paper carries the evidence. The visual campaign earns the attention.</figcaption>
          </figure>
        </section>

        <section className="receipts" aria-label="Point-in-time mailbox field receipts">
          <article className="receipt"><div className="number">148</div><div className="receiptLabel">LinkedIn-generated application-confirmation messages</div><div className="small">Raw message count; not a deduplicated application ledger.</div></article>
          <article className="receipt"><div className="number">13</div><div className="receiptLabel">Explicit rejection or position-closure messages</div><div className="small">Documented outcomes at the July 13 research cutoff.</div></article>
          <article className="receipt"><div className="number">1</div><div className="receiptLabel">Unambiguous invitation to speak with a human</div><div className="small">Automated assessments and onboarding prompts were excluded.</div></article>
          <article className="receipt"><div className="number">0.68%</div><div className="receiptLabel">Point-in-time human-screen ratio</div><div className="small">Upper-bound ratio using the raw confirmation-message denominator.</div></article>
        </section>

        <section className="section" id="paper">
          <div className="sectionLabel">Executive brief</div>
          <h2>The failure is not one bad model. It is an unowned operating path.</h2>
          <p className="body">AI can optimize discovery, writing, ranking, screening, outreach, assessment, and engagement while the complete path from real human capability to a defensible organizational decision remains unowned. Every local component can report efficiency. The whole system can still lose signal, trust, and exceptional candidates.</p>
          <article className="paper">
            <h3>Locked thesis</h3>
            <p>LinkedIn is a live operating-model case study showing what happens when AI optimizes individual steps while no accountable function owns the complete path from real human capability to a defensible organizational decision.</p>
            <p><strong>The central design principle:</strong> a low machine-match score should route a candidate, not silently become a final verdict. Systems must know when they do not know.</p>
          </article>
        </section>

        <section className="section">
          <div className="sectionLabel">01 // The recursive loop</div>
          <h2>The system reacts to AI-generated volume with more AI-generated filtering.</h2>
          <p className="body">The loop is not a conspiracy and does not require malicious intent. Candidates need speed and visibility. Recruiters need manageable queues. Employers need consistency. Platforms need engagement. Vendors need throughput. Each actor optimizes a local constraint while nobody owns the whole path.</p>
          <div className="loop">{loop.map((item,index)=><div className="loopStep" key={item}><div className="loopNumber">{String(index+1).padStart(2,"0")}</div><div className="loopText">{item}</div></div>)}</div>
        </section>

        <section className="section">
          <div className="sectionLabel">02 // Why local efficiency can be globally wrong</div>
          <h2>Local optimization is not whole-system intelligence.</h2>
          <p className="body">A recruiter can save a day per week and still miss the right person. A model can improve rank consistency and still be consistently wrong about a novel role. A company can reduce time-to-fill and still hire someone who cannot own deployment, exceptions, or adoption. The operating question is not whether each component works. It is whether the components produce the intended organizational outcome together.</p>
          <p className="body"><strong>The practical test:</strong> Did the system identify and place a person who could own the real work—including the messy parts—and did the organization learn from the outcome?</p>
        </section>

        <section className="section">
          <div className="sectionLabel">03 // The nonlinear candidate</div>
          <h2>A blue-collar operator entering a software-filtered AI market.</h2>
          <p className="body">Mason Perry is an Electronics Technician, founder of NULLWORKS, and pioneering Operational Intelligence Systems Architect. He is not positioning himself as a conventional software engineer. His work combines physical operations, maintenance, workflow observation, prototype orchestration, source evidence, human authority, failure receipts, and AI coordination.</p>
          <p className="body">That identity creates a useful diagnostic edge case. The nearest job labels often require conventional software degrees, programming tenure, or stack keywords before the operating receipts can be evaluated. The mailbox audit does not prove why any individual application failed. It exposes the output pattern and the absence of decision-path observability.</p>
        </section>

        <section className="section">
          <div className="sectionLabel">04 // Independent evidence and counterevidence</div>
          <h2>Risk is real, but “remove AI” is not the answer.</h2>
          <div className="grid">{evidence.map((item)=><article className="card" key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        </section>

        <section className="section">
          <div className="sectionLabel">05 // The missing whole-path owner</div>
          <h2>Why this is Operational Intelligence Systems Architecture.</h2>
          <p className="body">Hiring distributes authority among talent acquisition, hiring managers, legal, engineering leaders, platforms, assessment vendors, and data teams. The missing function owns the operating relationship among them. An OISA starts with intent, maps the path from that intent to evidence and decisions, designs uncertainty and exceptions, and connects the process to consequences.</p>
          <div className="list">{responsibilities.map((item)=><div className="item" key={item}>{item}</div>)}</div>
        </section>

        <section className="section">
          <div className="sectionLabel">06 // The edge-case lane</div>
          <h2>Structured exception handling, not favoritism.</h2>
          <p className="body">An edge-case lane is a controlled diagnostic route for cases in which the default model has insufficient coverage. Entry conditions include conflicting model confidence, strong evidence that does not map to the role taxonomy, cross-domain history relevant to the business outcome, a portfolio materially stronger than resume fit, a newly created role, or repeated organizational failure to fill the function.</p>
          <p className="body">The lane should remain deliberately small. If every candidate is an exception, the role definition is broken. If no candidate is ever an exception, the system is probably overconfident.</p>
        </section>

        <section className="section">
          <div className="sectionLabel">07 // A 90-day OISA pilot</div>
          <h2>Test the thesis inside a bounded hiring lane.</h2>
          <div className="grid">
            <article className="card"><h3>Days 1–20</h3><p>Map the complete hiring path, identify every tool, handoff, owner, decision point, and unobserved gap, then baseline human-screen yield and false-negative risk.</p></article>
            <article className="card"><h3>Days 21–45</h3><p>Create the role-intent brief, uncertainty reporting, one structured operating receipt beyond the resume, and a small high-evidence review queue.</p></article>
            <article className="card"><h3>Days 46–75</h3><p>Compare standard flow with the OISA flow, blind final interviewers where possible, and record overrides, reviewer time, candidate experience, and decision confidence.</p></article>
            <article className="card"><h3>Days 76–90</h3><p>Review false positives and false negatives, retire signals that do not predict outcomes, publish the decision log, and determine whether the function should become permanent.</p></article>
          </div>
        </section>

        <section className="section">
          <div className="truth">
            <div className="sectionLabel">Truth boundary</div>
            <h3>Diagnostic evidence is not causal proof.</h3>
            <p>The paper does not claim that LinkedIn or AI alone caused any individual decision, that the 148 messages represent 148 deduplicated applications, or that pending and silent applications are final rejections. The failure point may involve platform discovery, employer requirements, an external ATS, recruiter judgment, resume parsing, assessment design, geography, timing, market conditions, or combinations of them. The appropriate response is instrumentation and a pilot—not accusation.</p>
          </div>
        </section>

        <section className="final">
          <div className="sectionLabel">Conclusion</div>
          <h2>The edge case is not outside the system. It is a test of the system.</h2>
          <p>The person capable of organizing the fragments may be filtered out because the system evaluates each fragment separately. The next move is not another argument about whether AI belongs in recruiting. It already does. The next move is to audit the operating model around it.</p>
          <div className="buttons"><a className="button" href="/linked-out/afterword">See the dual-workroom production receipt →</a></div>
        </section>

        <footer>NULLWORKS // LINKED-OUT WEB EDITION // Human authority remains final. Research cutoff: July 13, 2026.</footer>
      </div>
    </main>
  );
}
