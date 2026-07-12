import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Operating Model Audit | NULLWORKS",
  description:
    "A workflow-first diagnosis of whether AI is improving the work, multiplying the mess, or exposing a deeper operating-model problem.",
};

const diagnoses = [
  {
    number: "01",
    name: "FIX THE FLOW",
    fit: "You do not need an OISA.",
    body: "The work is simple enough that one clear correction, better ownership, an environmental change, or a small software adjustment can restore the outcome.",
    action: "Map it. Fix it. Hand it back.",
  },
  {
    number: "02",
    name: "FORWARD DEPLOY + HAND OFF",
    fit: "You need bounded architecture help.",
    body: "A forward-deployed operational architect enters the workflow, prototypes the missing operating layer, validates it with domain experts, and leaves the team able to run it.",
    action: "Observe. Build. Stabilize. Transfer.",
  },
  {
    number: "03",
    name: "INSTALL OISA CAPACITY",
    fit: "You need a named operating function.",
    body: "The organization has enough AI, handoffs, evidence risk, exceptions, and cross-functional friction to justify a permanent or fractional OISA role.",
    action: "Define the charter, authority, rhythm, and outcomes.",
  },
  {
    number: "04",
    name: "RESET BEFORE AI",
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
    <main className="audit-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #070909; }
        .audit-page {
          --ink: #f5f3eb;
          --muted: #b7b8af;
          --dim: #81867f;
          --line: #2b312d;
          --panel: #0d1110;
          --signal: #ff5a2a;
          --signal-soft: rgba(255, 90, 42, .14);
          --acid: #d7ff2f;
          min-height: 100vh;
          color: var(--ink);
          background:
            radial-gradient(circle at 6% 0%, rgba(255, 90, 42, .17), transparent 31rem),
            radial-gradient(circle at 92% 11%, rgba(215, 255, 47, .10), transparent 28rem),
            linear-gradient(180deg, #080a09 0%, #070909 100%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow: hidden;
        }
        .shell { width: min(1180px, calc(100% - 38px)); margin: 0 auto; }
        .hero { position: relative; padding: 76px 0 68px; border-bottom: 1px solid var(--line); }
        .hero::after {
          content: "AUDIT";
          position: absolute;
          right: -1.5vw;
          bottom: -1.5vw;
          font-size: clamp(110px, 22vw, 310px);
          font-weight: 1000;
          letter-spacing: -.09em;
          color: rgba(255,255,255,.018);
          pointer-events: none;
        }
        .eyebrow { color: var(--signal); font-weight: 950; font-size: 12px; letter-spacing: .18em; text-transform: uppercase; }
        .hero-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 28px; align-items: end; margin-top: 18px; }
        h1 { max-width: 900px; margin: 0; font-size: clamp(56px, 8.7vw, 116px); line-height: .86; letter-spacing: -.075em; }
        .hero .lead { margin: 28px 0 0; max-width: 850px; color: var(--muted); font-size: clamp(20px, 2.1vw, 25px); line-height: 1.55; }
        .hero-card { position: relative; z-index: 1; border: 1px solid #3a403c; border-radius: 28px; padding: 28px; background: linear-gradient(155deg, rgba(255,90,42,.14), rgba(255,255,255,.025)); box-shadow: 0 32px 90px rgba(0,0,0,.38); }
        .hero-card .metric { color: var(--acid); font-size: clamp(52px, 7vw, 82px); font-weight: 1000; line-height: .88; letter-spacing: -.07em; }
        .hero-card .metric-label { margin-top: 8px; color: #e9eadf; font-size: 13px; text-transform: uppercase; letter-spacing: .13em; font-weight: 900; }
        .hero-card p { margin: 20px 0 0; color: #c4c7bf; line-height: 1.65; }
        .chips { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 28px; }
        .chip { border: 1px solid #353b37; background: rgba(7,9,9,.62); color: #c1c5be; border-radius: 999px; padding: 9px 13px; font-size: 13px; }
        .cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
        .cta { display: inline-flex; min-height: 48px; align-items: center; justify-content: center; text-decoration: none; border-radius: 999px; padding: 13px 19px; font-weight: 950; background: var(--signal); color: #130a07; box-shadow: 0 10px 35px rgba(255,90,42,.18); }
        .cta.secondary { background: transparent; color: var(--acid); border: 1px solid #55633e; box-shadow: none; }
        section { padding: 76px 0; border-bottom: 1px solid var(--line); }
        .section-label { color: var(--signal); font-size: 12px; letter-spacing: .16em; text-transform: uppercase; font-weight: 950; }
        h2 { max-width: 1030px; margin: 12px 0 26px; font-size: clamp(39px, 5.6vw, 72px); line-height: .98; letter-spacing: -.055em; }
        h3 { letter-spacing: -.025em; }
        .body { max-width: 910px; color: var(--muted); font-size: 19px; line-height: 1.72; }
        .witness-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 34px; }
        .witness-card { min-height: 245px; border: 1px solid #323934; border-radius: 24px; padding: 24px; background: linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.012)); }
        .witness-card strong { display: block; color: var(--acid); font-size: 12px; letter-spacing: .14em; text-transform: uppercase; }
        .witness-card h3 { margin: 18px 0 12px; font-size: 28px; }
        .witness-card p { margin: 0; color: #aeb4ad; line-height: 1.67; }
        .witness-card.primary { border-color: rgba(255,90,42,.5); background: linear-gradient(145deg, rgba(255,90,42,.11), rgba(255,255,255,.015)); }
        .outside-grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 22px; align-items: stretch; margin-top: 34px; }
        .why-card { border: 1px solid rgba(215,255,47,.38); border-radius: 27px; padding: 28px; background: linear-gradient(145deg, rgba(215,255,47,.08), rgba(255,255,255,.012)); }
        .why-card .giant { color: var(--acid); font-size: clamp(70px, 10vw, 118px); font-weight: 1000; line-height: .82; letter-spacing: -.08em; }
        .why-card p { color: #c7cbc3; line-height: 1.65; }
        .layers { display: grid; gap: 12px; }
        .layer { border: 1px solid #313834; border-radius: 22px; padding: 22px; background: #0c100f; }
        .layer .role { color: var(--signal); font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: .14em; }
        .layer h3 { margin: 10px 0 8px; font-size: 25px; }
        .layer p { margin: 0; color: #aeb4ad; line-height: 1.62; }
        .receipt { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 34px; }
        .weather { min-height: 420px; border: 1px solid #343b36; border-radius: 28px; padding: 28px; overflow: hidden; position: relative; background:
          linear-gradient(180deg, rgba(160,184,198,.18), rgba(7,9,9,.92)),
          repeating-linear-gradient(112deg, transparent 0 17px, rgba(255,255,255,.06) 18px 19px);
        }
        .weather::before { content: "SLEET"; position: absolute; right: -10px; bottom: 6px; font-size: clamp(80px, 12vw, 150px); font-weight: 1000; letter-spacing: -.08em; color: rgba(255,255,255,.04); }
        .weather .field { position: relative; z-index: 1; color: var(--acid); font-size: 12px; letter-spacing: .16em; text-transform: uppercase; font-weight: 950; }
        .weather h3 { position: relative; z-index: 1; margin: 16px 0; font-size: clamp(35px, 4vw, 54px); line-height: 1; }
        .weather p { position: relative; z-index: 1; color: #c1c6bf; line-height: 1.68; max-width: 570px; }
        .solution { border: 1px solid rgba(255,90,42,.48); border-radius: 28px; padding: 28px; background: linear-gradient(145deg, rgba(255,90,42,.12), #0c100f 55%); }
        .solution .not { color: #8d948d; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: .14em; }
        .solution .wrong { display: grid; gap: 9px; margin: 18px 0 26px; color: #9ca29b; text-decoration: line-through; }
        .solution .answer { color: var(--signal); font-size: clamp(48px, 7vw, 84px); font-weight: 1000; line-height: .87; letter-spacing: -.07em; }
        .solution p { color: #c1c6bf; line-height: 1.68; }
        .diagnoses { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 34px; }
        .diagnosis { border: 1px solid #323934; border-radius: 25px; padding: 25px; background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01)); }
        .diagnosis .number { color: var(--signal); font-size: 30px; font-weight: 1000; }
        .diagnosis h3 { margin: 16px 0 8px; font-size: 30px; }
        .diagnosis .fit { color: var(--acid); font-weight: 850; }
        .diagnosis p { color: #afb5ae; line-height: 1.65; }
        .diagnosis .action { margin-top: 18px; padding-top: 16px; border-top: 1px solid #29302c; color: #e0e2db; font-weight: 800; }
        .signal-grid, .lens-grid, .output-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 30px; }
        .signal, .lens, .output { border: 1px solid #303733; border-radius: 18px; padding: 18px; color: #b8bdb6; line-height: 1.55; background: #0b0f0e; }
        .signal { border-left: 3px solid var(--signal); }
        .lens { border-left: 3px solid var(--acid); }
        .output::before { content: "✓"; color: var(--acid); font-weight: 1000; margin-right: 10px; }
        .lender { border: 1px solid #3b423d; border-radius: 30px; padding: 31px; background:
          radial-gradient(circle at 100% 0%, rgba(215,255,47,.10), transparent 24rem),
          linear-gradient(145deg, rgba(255,90,42,.07), rgba(255,255,255,.018));
        }
        .lender h3 { margin: 10px 0 18px; font-size: clamp(38px, 5vw, 60px); }
        .lender p { color: #c1c5bf; font-size: 19px; line-height: 1.72; max-width: 950px; }
        .steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 28px; }
        .step { border-top: 2px solid var(--signal); padding: 16px 0 0; color: #b8bdb6; line-height: 1.5; }
        .step strong { display: block; color: #f0f0e8; margin-bottom: 6px; }
        .neutrality { border: 1px solid rgba(215,255,47,.45); border-radius: 30px; padding: 32px; background: linear-gradient(145deg, rgba(215,255,47,.10), rgba(255,255,255,.015)); }
        .neutrality h2 { margin-top: 0; }
        .neutrality p { color: #c7cbc3; font-size: 20px; line-height: 1.7; }
        .truth { margin-top: 24px; border: 1px solid #353c37; border-radius: 22px; padding: 22px; color: #969d96; line-height: 1.65; background: #0a0e0d; }
        .closing { text-align: center; padding: 88px 0 94px; }
        .closing h2 { margin-left: auto; margin-right: auto; }
        .closing .body { margin: 0 auto; }
        .closing .cta-row { justify-content: center; }
        footer { padding: 34px 0 70px; color: #747b75; border-top: 1px solid var(--line); }
        @media (max-width: 900px) {
          .hero-grid, .outside-grid, .receipt { grid-template-columns: 1fr; }
          .witness-grid { grid-template-columns: 1fr; }
          .steps { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 680px) {
          .shell { width: min(100% - 26px, 1180px); }
          .hero { padding: 52px 0 54px; }
          section { padding: 56px 0; }
          .diagnoses, .signal-grid, .lens-grid, .output-grid, .steps { grid-template-columns: 1fr; }
          .hero-card, .why-card, .weather, .solution, .lender, .neutrality { padding: 22px; }
          .weather { min-height: 350px; }
          .cta { width: 100%; }
        }
      `}</style>

      <header className="hero">
        <div className="shell">
          <div className="eyebrow">NULLWORKS // AI OPERATING MODEL AUDIT</div>
          <div className="hero-grid">
            <div>
              <h1>Your company may not need more AI.</h1>
              <p className="lead">
                It may need an operating-model diagnosis. NULLWORKS observes one real workflow, maps how humans, software, specialized digital workers, physical conditions, and authority interact, then identifies the smallest intervention that improves the actual outcome.
              </p>
              <div className="chips">
                <span className="chip">Tool-agnostic</span>
                <span className="chip">Workflow-first</span>
                <span className="chip">Outside-in perspective</span>
                <span className="chip">Frontline evidence</span>
                <span className="chip">Human Authority final</span>
              </div>
              <div className="cta-row">
                <a className="cta" href="/ai-audit/intake">Start with one workflow</a>
                <a className="cta secondary" href="#diagnosis">See the four outcomes</a>
              </div>
            </div>
            <aside className="hero-card">
              <div className="metric">20 MIN</div>
              <div className="metric-label">Provisional workflow triage</div>
              <p>
                Enough to identify the likely constraint, the smallest next test, and whether to stop, fix, forward deploy, install OISA capacity, or reset before adding anything else.
              </p>
            </aside>
          </div>
        </div>
      </header>

      <section>
        <div className="shell">
          <div className="section-label">The central question</div>
          <h2>Is AI improving the work—or multiplying the mess?</h2>
          <p className="body">
            Companies often know they have AI-related pain but do not know whether the real cause is the model, the software, the workflow, the operating model, the hiring architecture, the authority structure, missing telemetry, or the absence of an Operational Intelligence Systems Architect.
          </p>
          <div className="signal-grid">
            {warningSignals.map((signal) => <div className="signal" key={signal}>{signal}</div>)}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">Independent operating perspective</div>
          <h2>The system cannot be its only witness.</h2>
          <p className="body">
            AI can check explicit rules. Engineers can verify code, uptime, latency, and integrations. Managers can confirm whether the documented process was followed. None of those perspectives alone can determine whether the whole operating system should be organized this way in the first place.
          </p>
          <div className="witness-grid">
            <article className="witness-card">
              <strong>AI layer</strong>
              <h3>Checks the rule</h3>
              <p>If the premise is wrong, an AI checker can validate the same wrong premise and produce confident, internally consistent wrongness.</p>
            </article>
            <article className="witness-card">
              <strong>Software layer</strong>
              <h3>Checks the tool</h3>
              <p>The builder can determine whether the software performs as designed. The builder should not be the only auditor of the operating system surrounding it.</p>
            </article>
            <article className="witness-card primary">
              <strong>OISA layer</strong>
              <h3>Checks the whole work system</h3>
              <p>Why does the workflow exist? What outcome should it produce? Why is it done this way? What was already tried? Who owns the consequence when it fails?</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">Outside-in, inside-grounded</div>
          <h2>Start with the why. Then walk the work.</h2>
          <div className="outside-grid">
            <article className="why-card">
              <div className="giant">WHY?</div>
              <p>
                The outside perspective is valuable because it is not trapped inside the assumptions, incentives, normalized friction, and status boundaries that created the current system. The audit still goes deep enough to preserve context, prior attempts, and the reasons behind the design.
              </p>
            </article>
            <div className="layers">
              <article className="layer">
                <div className="role">Leadership</div>
                <h3>What is the intended outcome?</h3>
                <p>Why does the organization exist, what is this workflow supposed to produce, and who depends on the result?</p>
              </article>
              <article className="layer">
                <div className="role">Management</div>
                <h3>How is the workflow supposed to operate?</h3>
                <p>What process, authority, controls, tools, and escalation paths were designed?</p>
              </article>
              <article className="layer">
                <div className="role">Frontline</div>
                <h3>What actually happens?</h3>
                <p>The person closest to the consequence often knows the failure mode the org chart cannot see. Disagreement between layers is telemetry.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">Real field receipt</div>
          <h2>The umbrella test.</h2>
          <div className="receipt">
            <article className="weather">
              <div className="field">Observed in real operations</div>
              <h3>A parking attendant could not reliably use a touchscreen in freezing sleet.</h3>
              <p>
                Frozen fingers made the interface difficult to operate. From inside a software frame, the failure looked like a tablet, application, training, or user-compliance problem.
              </p>
            </article>
            <article className="solution">
              <div className="not">The expensive-looking answers</div>
              <div className="wrong">
                <span>Replace the tablet</span>
                <span>Rewrite the application</span>
                <span>Retrain the attendant</span>
                <span>Add AI assistance</span>
              </div>
              <div className="answer">ADD SHELTER.</div>
              <p>
                Protect the human and device from the actual environment. A basic physical intervention can solve what appears to be a major technology problem. The goal is not the most impressive treatment. It is the smallest change that restores the outcome.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="diagnosis">
        <div className="shell">
          <div className="section-label">The four-level diagnosis</div>
          <h2>The audit determines what level of help you actually need.</h2>
          <div className="diagnoses">
            {diagnoses.map((item) => (
              <article className="diagnosis" key={item.number}>
                <div className="number">{item.number}</div>
                <h3>{item.name}</h3>
                <div className="fit">{item.fit}</div>
                <p>{item.body}</p>
                <div className="action">{item.action}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">What we inspect</div>
          <h2>Not just the software. The operating system around it.</h2>
          <div className="lens-grid">
            {lenses.map((lens) => <div className="lens" key={lens}>{lens}</div>)}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="lender">
            <div className="section-label">Level 2 receipt // LenderFlow</div>
            <h3>Forward deploy. Learn the work. Build the missing layer. Hand it back.</h3>
            <p>
              LenderFlow demonstrates the bounded-engagement pattern. NULLWORKS learned the brokerage workflow with the domain expert, built a prototype operating layer, refined it through real feedback, preserved evidence and human review, and created a system the business could inspect without immediately requiring a permanent OISA position.
            </p>
            <div className="steps">
              <div className="step"><strong>01 Observe</strong>Learn the actual workflow and failure points.</div>
              <div className="step"><strong>02 Prototype</strong>Build the smallest usable operating layer.</div>
              <div className="step"><strong>03 Validate</strong>Refine it with the people who know the work.</div>
              <div className="step"><strong>04 Transfer</strong>Leave the client able to run and improve it.</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">What the full audit produces</div>
          <h2>A diagnosis with receipts, not another AI strategy presentation.</h2>
          <div className="output-grid">
            {auditOutputs.map((output) => <div className="output" key={output}>{output}</div>)}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="neutrality">
            <div className="section-label">The trust mechanism</div>
            <h2>We may tell you not to hire us.</h2>
            <p>
              The audit is structurally allowed to conclude that you need no new software, no new AI, no permanent OISA, and no further NULLWORKS engagement. The next step must be earned by the evidence. Otherwise the audit becomes disguised consulting sales.
            </p>
            <div className="truth">
              A twenty-minute walkthrough can produce a provisional diagnosis and next test. It is triage, not a defensible enterprise-wide audit. Larger conclusions require workflow observation, evidence, interviews, system access, decision history, and telemetry.
            </div>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="shell">
          <div className="section-label">Start small enough to see the truth</div>
          <h2>Start with one real workflow.</h2>
          <p className="body">
            Bring one person close to the work, one intended outcome, one recent success, one recent failure, the current AI and software touchpoints, the fixes already attempted, and the named owner of the result.
          </p>
          <div className="cta-row">
            <a className="cta" href="/ai-audit/intake">Request an operating-model triage</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell">
          NULLWORKS // AI Operating Model Audit // Human Authority remains final.
        </div>
      </footer>
    </main>
  );
}
