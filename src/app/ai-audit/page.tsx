import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Operating Model Audit | NULLWORKS",
  description:
    "A workflow-first diagnosis of whether AI is improving the work, multiplying the mess, or exposing a deeper operating-model problem.",
};

const diagnoses = [
  {
    number: "01",
    name: "Fix the flow",
    fit: "You do not need an OISA.",
    body: "The work is simple enough that one clear correction, better ownership, an environmental change, or a small software adjustment can restore the outcome.",
    action: "Map it. Fix it. Hand it back.",
  },
  {
    number: "02",
    name: "Forward deploy + hand off",
    fit: "You need bounded architecture help.",
    body: "A forward-deployed operational architect enters the workflow, prototypes the missing operating layer, validates it with domain experts, and leaves the team able to run it.",
    action: "Observe. Build. Stabilize. Transfer.",
  },
  {
    number: "03",
    name: "Install OISA capacity",
    fit: "You need a named operating function.",
    body: "The organization has enough AI, handoffs, evidence risk, exceptions, and cross-functional friction to justify a permanent or fractional OISA role.",
    action: "Define the charter, authority, rhythm, and outcomes.",
  },
  {
    number: "04",
    name: "Reset before AI",
    fit: "The operating model is not stable enough yet.",
    body: "Core workflows, accountability, incentives, authority, labor structure, data, or management systems must be repaired before more AI can create dependable value.",
    action: "Stop layering technology onto structural failure.",
  },
];

const lenses = [
  "Organizational intent and purpose",
  "Workflow truth versus documented process",
  "AI and software overlap or conflict",
  "Physical and environmental constraints",
  "Authority and consequence ownership",
  "Source evidence and provenance",
  "Human review and exception paths",
  "Continuity and decision history",
  "Telemetry and measurable outcomes",
  "Operator burden, trust, and adoption",
];

const warningSignals = [
  "AI projects are multiplying, but outcomes are unclear.",
  "People were removed, then quietly hired back.",
  "Every department bought a different copilot or agent.",
  "Human review exists, but nobody defined what review means.",
  "Exceptions disappear into inboxes, spreadsheets, or hidden queues.",
  "The technical team can explain the system, but nobody can explain why the workflow exists in its current form.",
];

const auditOutputs = [
  "Current-state workflow map",
  "AI and software interaction map",
  "Prior-attempt and decision-history register",
  "Waste, duplication, conflict, and blind-spot register",
  "Authority and consequence-owner map",
  "Evidence and exception-path review",
  "Operational telemetry gaps",
  "Four-level diagnosis and smallest next test",
  "30 / 60 / 90-day action plan",
  "Explicit list of what to stop doing",
];

export default function AiAuditPage() {
  return (
    <main className="auditPage">
      <style>{`
        :root { color-scheme: light; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #f3eee2; }
        .auditPage {
          --paper: #f7f1e5;
          --paper-deep: #ecdfc8;
          --ink: #15211d;
          --muted: #665f52;
          --navy: #0b1822;
          --green: #173129;
          --teal: #2e6870;
          --gold: #bd8b35;
          --gold-light: #efd69a;
          --line: rgba(113, 83, 35, .28);
          min-height: 100vh;
          color: var(--ink);
          background:
            radial-gradient(circle at 9% 0%, rgba(46,104,112,.15), transparent 34rem),
            radial-gradient(circle at 94% 7%, rgba(189,139,53,.18), transparent 31rem),
            linear-gradient(rgba(42,57,52,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,57,52,.035) 1px, transparent 1px),
            #f3eee2;
          background-size: auto, auto, 48px 48px, 48px 48px, auto;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow-x: hidden;
        }
        .shell { position: relative; width: min(1160px, calc(100% - 28px)); margin: 0 auto; }
        .topbar { padding: 16px 0 0; }
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 13px 15px;
          border: 1px solid var(--line);
          border-radius: 24px;
          background: rgba(255,251,242,.9);
          box-shadow: 0 20px 70px rgba(49,41,27,.1);
          backdrop-filter: blur(18px);
        }
        .brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .brandMark { display: grid; flex: 0 0 auto; width: 46px; height: 46px; place-items: center; border: 1px solid var(--gold); border-radius: 50%; background: var(--navy); color: var(--gold-light); font-family: Georgia, "Times New Roman", serif; font-weight: 900; letter-spacing: -.08em; }
        .brandEyebrow, .eyebrow, .sectionLabel, .darkLabel { font-size: 10px; font-weight: 950; letter-spacing: .22em; text-transform: uppercase; }
        .brandEyebrow, .eyebrow, .sectionLabel { color: #80601f; }
        .brandName { margin-top: 2px; color: #171914; font-family: Georgia, "Times New Roman", serif; font-size: 18px; font-weight: 800; line-height: 1.1; }
        .navLink, .primaryButton, .secondaryButton { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; border-radius: 999px; padding: 11px 15px; text-decoration: none; font-size: 12px; font-weight: 900; }
        .navLink, .secondaryButton { border: 1px solid rgba(143,104,32,.38); background: #fffaf0; color: #73531c; }
        .primaryButton { background: var(--navy); color: #fffaf0; box-shadow: 0 16px 38px rgba(10,21,32,.18); }
        .hero { display: grid; grid-template-columns: minmax(0,1.07fr) minmax(330px,.93fr); gap: 18px; padding: 16px 0 18px; }
        .heroCopy, .heroSignal, .card, .darkPanel, .warmPanel, .lightPanel, .umbrellaScene, .umbrellaAnswer, .diagnosis, .lender, .neutrality, .closingCard {
          border: 1px solid var(--line);
          border-radius: 34px;
          box-shadow: 0 28px 90px rgba(49,41,27,.12);
        }
        .heroCopy { display: flex; min-height: 580px; padding: clamp(30px,5vw,60px); justify-content: center; flex-direction: column; background: rgba(255,251,242,.95); }
        .eyebrow { display: inline-flex; width: fit-content; padding: 9px 12px; border: 1px solid rgba(184,138,52,.36); border-radius: 999px; background: #eee1c7; }
        h1, h2, .serif { font-family: Georgia, "Times New Roman", serif; }
        h1 { max-width: 760px; margin: 24px 0 0; font-size: clamp(48px,6.4vw,82px); line-height: .94; letter-spacing: -.055em; }
        .lead { max-width: 740px; margin: 25px 0 0; color: #554d40; font-size: clamp(17px,1.55vw,21px); line-height: 1.68; }
        .chips { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 26px; }
        .chip { padding: 9px 12px; border: 1px solid rgba(143,104,32,.28); border-radius: 999px; background: #f5ead8; color: #5c513f; font-size: 12px; font-weight: 750; }
        .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
        .heroSignal { position: relative; display: flex; min-height: 580px; padding: clamp(26px,4vw,44px); justify-content: center; flex-direction: column; overflow: hidden; background: linear-gradient(155deg, #0a1721, #19302a 76%, #254b4d); color: #fffaf0; }
        .heroSignal::after { content: "OI"; position: absolute; right: -18px; bottom: -54px; color: rgba(239,214,154,.055); font-family: Georgia, "Times New Roman", serif; font-size: 250px; font-weight: 900; line-height: 1; }
        .darkLabel { position: relative; z-index: 1; color: var(--gold-light); }
        .twenty { position: relative; z-index: 1; margin-top: 22px; color: #fffaf0; font-family: Georgia, "Times New Roman", serif; font-size: clamp(58px,8vw,104px); font-weight: 800; line-height: .82; letter-spacing: -.065em; }
        .twenty span { display: block; margin-top: 15px; color: var(--gold-light); font-family: Inter, ui-sans-serif, system-ui, sans-serif; font-size: 12px; font-weight: 950; letter-spacing: .18em; line-height: 1.4; text-transform: uppercase; }
        .seven { position: relative; z-index: 1; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(239,214,154,.26); }
        .seven strong { display: block; color: #cce5dc; font-size: clamp(34px,4.8vw,62px); line-height: .94; letter-spacing: -.05em; }
        .heroSignal p { position: relative; z-index: 1; margin: 18px 0 0; color: rgba(255,250,240,.74); line-height: 1.72; }
        .truthNote { position: relative; z-index: 1; margin-top: 22px; color: rgba(255,250,240,.55); font-size: 12px; line-height: 1.55; }
        .section { padding: 18px 0 0; }
        .sectionHeader { padding: 22px 4px 16px; }
        h2 { max-width: 980px; margin: 10px 0 0; font-size: clamp(34px,4.8vw,62px); line-height: 1; letter-spacing: -.045em; }
        .body { max-width: 900px; margin: 18px 0 0; color: var(--muted); font-size: 17px; line-height: 1.75; }
        .signalGrid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 14px; }
        .card { min-height: 180px; padding: 23px; background: rgba(255,251,242,.94); }
        .cardNumber { color: var(--gold); font-size: 12px; font-weight: 950; letter-spacing: .18em; }
        .card p { margin: 18px 0 0; color: #5f5749; font-size: 14px; font-weight: 650; line-height: 1.65; }
        .darkPanel { margin-top: 18px; padding: clamp(26px,4vw,44px); background: #15221e; color: #fffaf0; }
        .darkPanel h2 { color: #fffaf0; }
        .darkPanel .body { color: rgba(255,250,240,.72); }
        .witnessGrid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 12px; margin-top: 30px; }
        .witness { padding: 22px; border: 1px solid rgba(229,199,126,.22); border-radius: 24px; background: rgba(255,255,255,.045); }
        .witness strong { color: var(--gold-light); font-size: 11px; letter-spacing: .16em; text-transform: uppercase; }
        .witness h3 { margin: 16px 0 10px; font-size: 25px; letter-spacing: -.03em; }
        .witness p { margin: 0; color: rgba(255,250,240,.68); font-size: 14px; line-height: 1.67; }
        .witness.primary { border-color: rgba(117,187,182,.55); background: rgba(46,104,112,.18); }
        .outside { display: grid; grid-template-columns: .82fr 1.18fr; gap: 14px; }
        .warmPanel { padding: 30px; background: #ead9b9; }
        .why { color: var(--navy); font-family: Georgia, "Times New Roman", serif; font-size: clamp(78px,11vw,142px); font-weight: 900; line-height: .78; letter-spacing: -.08em; }
        .warmPanel p { margin: 28px 0 0; color: #594c38; line-height: 1.72; }
        .layerStack { display: grid; gap: 12px; }
        .lightPanel { padding: 23px; background: rgba(255,251,242,.94); }
        .lightPanel strong { color: #80601f; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; }
        .lightPanel h3 { margin: 12px 0 8px; font-size: 25px; }
        .lightPanel p { margin: 0; color: #615747; font-size: 14px; line-height: 1.67; }
        .umbrellaGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .umbrellaScene { position: relative; min-height: 450px; padding: 30px; overflow: hidden; background: linear-gradient(165deg,#dce4dd,#aac7c4 55%,#315e63); color: var(--navy); }
        .umbrellaScene::after { content: "SLEET"; position: absolute; right: -22px; bottom: -24px; color: rgba(11,24,34,.08); font-family: Georgia, "Times New Roman", serif; font-size: clamp(100px,15vw,190px); font-weight: 900; letter-spacing: -.08em; }
        .umbrellaScene strong { position: relative; z-index: 1; color: #315e63; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; }
        .umbrellaScene h3 { position: relative; z-index: 1; max-width: 570px; margin: 18px 0; font-family: Georgia, "Times New Roman", serif; font-size: clamp(36px,4.5vw,58px); line-height: 1; letter-spacing: -.045em; }
        .umbrellaScene p { position: relative; z-index: 1; max-width: 580px; color: #31423f; line-height: 1.7; }
        .umbrellaAnswer { padding: 30px; background: linear-gradient(150deg,#0b1822,#1d332d); color: #fffaf0; }
        .wrong { display: grid; gap: 9px; margin: 20px 0 28px; color: rgba(255,250,240,.48); text-decoration: line-through; }
        .answer { color: var(--gold-light); font-family: Georgia, "Times New Roman", serif; font-size: clamp(52px,7vw,88px); font-weight: 900; line-height: .86; letter-spacing: -.065em; }
        .umbrellaAnswer p { color: rgba(255,250,240,.72); line-height: 1.72; }
        .diagnosisGrid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 14px; }
        .diagnosis { padding: 26px; background: rgba(255,251,242,.94); }
        .diagnosisNumber { color: var(--gold); font-size: 30px; font-weight: 950; }
        .diagnosis h3 { margin: 14px 0 8px; font-family: Georgia, "Times New Roman", serif; font-size: 31px; line-height: 1; }
        .diagnosisFit { color: var(--teal); font-weight: 900; }
        .diagnosis p { color: #615747; line-height: 1.67; }
        .diagnosisAction { margin-top: 18px; padding-top: 16px; border-top: 1px solid rgba(113,83,35,.2); font-weight: 850; }
        .scalePanel { margin-top: 18px; display: grid; grid-template-columns: .9fr 1.1fr; gap: 18px; padding: clamp(28px,4vw,46px); border-radius: 34px; background: linear-gradient(145deg,#0b1822,#1d332d); color: #fffaf0; box-shadow: 0 28px 90px rgba(10,21,32,.2); }
        .scaleNumber { color: var(--gold-light); font-family: Georgia, "Times New Roman", serif; font-size: clamp(58px,8vw,105px); font-weight: 900; line-height: .82; letter-spacing: -.07em; }
        .scalePanel h2 { color: #fffaf0; }
        .scalePanel p { color: rgba(255,250,240,.72); line-height: 1.72; }
        .lensGrid, .outputGrid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 11px; }
        .lens, .output { padding: 17px; border: 1px solid rgba(143,104,32,.27); border-radius: 19px; background: rgba(255,251,242,.88); color: #5d5445; line-height: 1.55; }
        .lens { border-left: 3px solid var(--teal); }
        .output::before { content: "✓"; margin-right: 9px; color: var(--teal); font-weight: 950; }
        .lender { margin-top: 18px; padding: clamp(28px,4vw,44px); background: #fffaf0; }
        .lender h2 { max-width: 960px; }
        .lender p { max-width: 930px; color: #615747; font-size: 17px; line-height: 1.75; }
        .steps { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 10px; margin-top: 28px; }
        .step { padding: 17px; border: 1px solid rgba(143,104,32,.26); border-radius: 20px; background: #f2e5cd; color: #5b513f; font-size: 13px; line-height: 1.55; }
        .step strong { display: block; margin-bottom: 7px; color: #76551d; }
        .neutrality { margin-top: 18px; padding: clamp(28px,4vw,44px); background: #ead9b9; }
        .neutrality p { max-width: 930px; color: #594c38; font-size: 17px; line-height: 1.75; }
        .boundary { margin-top: 22px; padding: 20px; border: 1px solid rgba(11,24,34,.18); border-radius: 20px; background: rgba(255,250,240,.55); color: #665a46; line-height: 1.65; }
        .closingCard { margin: 18px 0 70px; padding: clamp(34px,5vw,60px); text-align: center; background: #fffaf0; }
        .closingCard h2 { margin-left: auto; margin-right: auto; }
        .closingCard .body { margin-left: auto; margin-right: auto; }
        .closingCard .actions { justify-content: center; }
        footer { padding: 0 0 40px; color: #7c7467; font-size: 12px; }
        @media (max-width: 900px) {
          .hero, .outside, .umbrellaGrid, .scalePanel { grid-template-columns: 1fr; }
          .heroCopy, .heroSignal { min-height: auto; }
          .signalGrid, .witnessGrid { grid-template-columns: 1fr; }
          .steps { grid-template-columns: repeat(2,minmax(0,1fr)); }
        }
        @media (max-width: 680px) {
          .nav { align-items: flex-start; }
          .navLink { display: none; }
          .hero { padding-top: 12px; }
          .heroCopy, .heroSignal, .darkPanel, .warmPanel, .lightPanel, .umbrellaScene, .umbrellaAnswer, .diagnosis, .lender, .neutrality, .closingCard { border-radius: 26px; }
          .diagnosisGrid, .lensGrid, .outputGrid, .steps { grid-template-columns: 1fr; }
          .primaryButton, .secondaryButton { width: 100%; }
          .brandName { font-size: 16px; }
        }
      `}</style>

      <div className="topbar">
        <div className="shell">
          <nav className="nav">
            <div className="brand">
              <div className="brandMark">NW</div>
              <div>
                <div className="brandEyebrow">NULLWORKS</div>
                <div className="brandName">AI Operating Model Audit</div>
              </div>
            </div>
            <a className="navLink" href="#diagnosis">View the four outcomes</a>
          </nav>
        </div>
      </div>

      <header className="shell hero">
        <section className="heroCopy">
          <div className="eyebrow">Workflow-first operating diagnosis</div>
          <h1>Your company may not need more AI.</h1>
          <p className="lead">
            It may need an operating-model diagnosis. NULLWORKS observes one real workflow, maps how humans, software, specialized digital workers, physical conditions, and authority interact, then identifies the smallest intervention that improves the actual outcome.
          </p>
          <div className="chips">
            <span className="chip">Tool-agnostic</span>
            <span className="chip">Outside-in perspective</span>
            <span className="chip">Frontline evidence</span>
            <span className="chip">Human Authority final</span>
          </div>
          <div className="actions">
            <a className="primaryButton" href="/ai-audit/intake">Start with one workflow</a>
            <a className="secondaryButton" href="#diagnosis">See the diagnostic ladder</a>
          </div>
        </section>

        <aside className="heroSignal">
          <div className="darkLabel">Provisional workflow triage</div>
          <div className="twenty">20 MIN<span>Enough to find the likely constraint and smallest next test</span></div>
          <div className="seven">
            <strong>May expose a seven-figure leak.</strong>
            <p>A tiny recurring defect can become enormous when it repeats across enterprise volume, labor, rework, delay, and customer consequences.</p>
          </div>
          <div className="truthNote">Not a savings guarantee. The point is to determine whether a high-scale leak exists before buying a high-scale solution.</div>
        </aside>
      </header>

      <section className="shell section">
        <div className="sectionHeader">
          <div className="sectionLabel">The central question</div>
          <h2>Is AI improving the work—or multiplying the mess?</h2>
          <p className="body">Companies often know they have AI-related pain but do not know whether the real cause is the model, software, workflow, operating model, hiring architecture, authority structure, missing telemetry, or the absence of an Operational Intelligence Systems Architect.</p>
        </div>
        <div className="signalGrid">
          {warningSignals.map((signal, index) => (
            <article className="card" key={signal}>
              <div className="cardNumber">SIGNAL {String(index + 1).padStart(2, "0")}</div>
              <p>{signal}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell darkPanel">
        <div className="darkLabel">Independent operating perspective</div>
        <h2>The system cannot be its only witness.</h2>
        <p className="body">AI can check explicit rules. Engineers can verify code, uptime, latency, and integrations. Managers can confirm whether the documented process was followed. None of those perspectives alone can determine whether the whole operating system should be organized this way in the first place.</p>
        <div className="witnessGrid">
          <article className="witness">
            <strong>AI layer</strong>
            <h3>Checks the rule</h3>
            <p>If the premise is wrong, an AI checker can validate the same wrong premise and produce confident, internally consistent wrongness.</p>
          </article>
          <article className="witness">
            <strong>Software layer</strong>
            <h3>Checks the tool</h3>
            <p>The builder can determine whether the software performs as designed. The builder should not be the only auditor of the operating system surrounding it.</p>
          </article>
          <article className="witness primary">
            <strong>OISA layer</strong>
            <h3>Checks the whole work system</h3>
            <p>Why does the workflow exist? What outcome should it produce? Why is it done this way? What was already tried? Who owns the consequence when it fails?</p>
          </article>
        </div>
      </section>

      <section className="shell section">
        <div className="sectionHeader">
          <div className="sectionLabel">Outside-in, inside-grounded</div>
          <h2>Start with the why. Then walk the work.</h2>
        </div>
        <div className="outside">
          <article className="warmPanel">
            <div className="why">WHY?</div>
            <p>The outside perspective is valuable because it is not trapped inside the assumptions, incentives, normalized friction, and status boundaries that created the current system. The audit still goes deep enough to preserve context, prior attempts, and the reasons behind the design.</p>
          </article>
          <div className="layerStack">
            <article className="lightPanel">
              <strong>Leadership</strong>
              <h3>What is the intended outcome?</h3>
              <p>Why does the organization exist, what is this workflow supposed to produce, and who depends on the result?</p>
            </article>
            <article className="lightPanel">
              <strong>Management</strong>
              <h3>How is the workflow supposed to operate?</h3>
              <p>What process, authority, controls, tools, and escalation paths were designed?</p>
            </article>
            <article className="lightPanel">
              <strong>Frontline</strong>
              <h3>What actually happens?</h3>
              <p>The person closest to the consequence often knows the failure mode the org chart cannot see. Disagreement between layers is telemetry.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="sectionHeader">
          <div className="sectionLabel">Real field receipt</div>
          <h2>The umbrella test.</h2>
        </div>
        <div className="umbrellaGrid">
          <article className="umbrellaScene">
            <strong>Observed in real operations</strong>
            <h3>A parking attendant could not reliably use a touchscreen in freezing sleet.</h3>
            <p>Frozen fingers made the interface difficult to operate. From inside a software frame, the failure looked like a tablet, application, training, or user-compliance problem.</p>
          </article>
          <article className="umbrellaAnswer">
            <div className="darkLabel">The expensive-looking answers</div>
            <div className="wrong">
              <span>Replace the tablet</span>
              <span>Rewrite the application</span>
              <span>Retrain the attendant</span>
              <span>Add AI assistance</span>
            </div>
            <div className="answer">ADD SHELTER.</div>
            <p>Protect the human and device from the actual environment. A basic physical intervention can solve what appears to be a major technology problem. The goal is not the most impressive treatment. It is the smallest change that restores the outcome.</p>
          </article>
        </div>
      </section>

      <section className="shell section" id="diagnosis">
        <div className="sectionHeader">
          <div className="sectionLabel">The four-level diagnosis</div>
          <h2>The audit determines what level of help you actually need.</h2>
        </div>
        <div className="diagnosisGrid">
          {diagnoses.map((item) => (
            <article className="diagnosis" key={item.number}>
              <div className="diagnosisNumber">{item.number}</div>
              <h3>{item.name}</h3>
              <div className="diagnosisFit">{item.fit}</div>
              <p>{item.body}</p>
              <div className="diagnosisAction">{item.action}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell scalePanel">
        <div>
          <div className="darkLabel">Scale changes the mathematics</div>
          <div className="scaleNumber">1 DEFECT × MILLIONS</div>
        </div>
        <div>
          <h2>The problem does not need to be caused by AI to require OISA diagnosis.</h2>
          <p>ORI TAC OPS began with an ordinary exception path: damaged or unreadable package labels, manual ambiguity, human verification, and re-entry into automated flow. At low volume it looks annoying. Repeated across a national-scale operation, the same leak compounds into labor, delay, rework, tracking breaks, customer exposure, and potentially seven-figure consequences.</p>
          <p>An OISA does not ask which shiny AI product should replace the process. The first question is where the system loses the outcome—and whether a simpler intervention closes the leak.</p>
        </div>
      </section>

      <section className="shell section">
        <div className="sectionHeader">
          <div className="sectionLabel">What we inspect</div>
          <h2>Not just the software. The operating system around it.</h2>
        </div>
        <div className="lensGrid">
          {lenses.map((lens) => <div className="lens" key={lens}>{lens}</div>)}
        </div>
      </section>

      <section className="shell lender">
        <div className="sectionLabel">Level 2 receipt // LenderFlow</div>
        <h2>Forward deploy. Learn the work. Build the missing layer. Hand it back.</h2>
        <p>LenderFlow demonstrates the bounded-engagement pattern. NULLWORKS learned the brokerage workflow with the domain expert, built a prototype operating layer, refined it through real feedback, preserved evidence and human review, and created a system the business could inspect without immediately requiring a permanent OISA position.</p>
        <div className="steps">
          <div className="step"><strong>01 Observe</strong>Learn the actual workflow and failure points.</div>
          <div className="step"><strong>02 Prototype</strong>Build the smallest usable operating layer.</div>
          <div className="step"><strong>03 Validate</strong>Refine it with the people who know the work.</div>
          <div className="step"><strong>04 Transfer</strong>Leave the client able to run and improve it.</div>
        </div>
      </section>

      <section className="shell section">
        <div className="sectionHeader">
          <div className="sectionLabel">What the full audit produces</div>
          <h2>A diagnosis with receipts, not another AI strategy presentation.</h2>
        </div>
        <div className="outputGrid">
          {auditOutputs.map((output) => <div className="output" key={output}>{output}</div>)}
        </div>
      </section>

      <section className="shell neutrality">
        <div className="sectionLabel">The trust mechanism</div>
        <h2>We may tell you not to hire us.</h2>
        <p>The audit is structurally allowed to conclude that you need no new software, no new AI, no permanent OISA, and no further NULLWORKS engagement. The next step must be earned by the evidence. Otherwise the audit becomes disguised consulting sales.</p>
        <div className="boundary">A twenty-minute walkthrough can produce a provisional diagnosis and next test. It is triage, not a defensible enterprise-wide audit. Larger conclusions require workflow observation, evidence, interviews, system access, decision history, and telemetry.</div>
      </section>

      <section className="shell closingCard">
        <div className="sectionLabel">Start small enough to see the truth</div>
        <h2>Start with one real workflow.</h2>
        <p className="body">Bring one person close to the work, one intended outcome, one recent success, one recent failure, the current AI and software touchpoints, the fixes already attempted, the approximate scale of the organization, and the named owner of the result.</p>
        <div className="actions">
          <a className="primaryButton" href="/ai-audit/intake">Request an operating-model triage</a>
        </div>
      </section>

      <footer className="shell">NULLWORKS // AI Operating Model Audit // Human Authority remains final.</footer>
    </main>
  );
}
