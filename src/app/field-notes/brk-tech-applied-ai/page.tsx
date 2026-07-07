import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applied AI at the Operating-Company Layer | Mason Perry",
  description:
    "A nontraditional exception-case application for BRK Tech's Distinguished Engineer - Applied Artificial Intelligence Engineering role.",
};

const alignment = [
  [
    "Industrialize applied AI",
    "Design the operating layer around models and agents: roles, routing, source evidence, authority, review gates, exception handling, continuity, telemetry, and reusable work cells.",
  ],
  [
    "Decentralized portfolio",
    "Preserve affiliate expertise and local authority while creating shared reference patterns, evaluation receipts, and inner-source learning across operating companies.",
  ],
  [
    "Reusable architectures",
    "Build platform-neutral schemas for workrooms, source state, approval, tool activity, failures, corrections, handoffs, and measurable workflow compression.",
  ],
  [
    "Evaluation and observability",
    "Instrument whether an AI worker loaded the right context, used current sources, respected authority, exposed uncertainty, preserved failures, and returned corrections to the system.",
  ],
  [
    "Rapid prototyping",
    "Convert real operator discovery into functional systems quickly, then hand engineering, security, compliance, and operations teams a validated frame to harden and scale.",
  ],
  [
    "Influence without authority",
    "Translate among operators, technicians, domain experts, AI workrooms, software systems, vendors, and leadership without erasing the people who understand the work.",
  ],
];

const receipts = [
  {
    title: "Hive Brain",
    metric: "11 seconds",
    body: "A fresh AI workroom reached the governed NULLWORKS floor in 11 instrumented seconds without changing the model. The improvement came from operating architecture: known entry point, current-state package, authority, readiness definition, and receipt discipline.",
  },
  {
    title: "RJ",
    metric: "1 + 1 = 3",
    body: "Two bounded workrooms combined complementary deployment evidence and produced a third asset neither assignment requested: a reusable cross-system deployment-debug method linking GitHub, Gmail, Vercel, browser truth, and failure receipts.",
  },
  {
    title: "LenderFlow / LENA",
    metric: "~3-day core",
    body: "Direct broker discovery became a human-reviewed lending workflow beta with lender-rule freshness, source receipts, routing, and explicit limits against autonomous lending decisions.",
  },
  {
    title: "LegalFlow LF2",
    metric: "1,230 pages",
    body: "A 1,230-page record and 7,944 messages were structured into a source-linked evidence workflow designed around search-the-derivative, verify-against-the-original, and human legal authority.",
  },
  {
    title: "PAPERGOBLIN",
    metric: "~6 hours",
    body: "A functional OCR intake and correction-telemetry prototype was built during commercial travel under constrained hardware and connectivity, without representing the prototype as enterprise production readiness.",
  },
  {
    title: "USPS systems",
    metric: "48 chutes",
    body: "A recurring system failure affecting 48 conveyor chutes was isolated to physical installation truth rather than software configuration, then corrected with evidence, root-cause discipline, and accountable return-to-service work.",
  },
];

const gaps = [
  "I do not claim 15+ years as a conventional AI/ML or distributed-systems engineer.",
  "My degree is in Business Administration / Communications, not computer science or machine learning.",
  "I do not claim deep production ownership of PyTorch or TensorFlow systems.",
  "I have not operated large-scale model-training, fine-tuning, or inference infrastructure.",
  "I do not claim mature enterprise MLOps ownership across a large cloud or hybrid fleet.",
  "My rapid functional systems are not represented as substitutes for hardened production engineering, security, compliance, or operations.",
];

const ninetyDays = [
  {
    phase: "Days 1-30",
    title: "Observe before standardizing",
    body: "Select three to five operating companies with different workflows and risk profiles. Inventory current AI, vendors, data paths, approvals, authority, recurring failures, and duplicated effort. Build a source-linked baseline of capability and unknowns.",
  },
  {
    phase: "Days 31-60",
    title: "Install the minimum shared architecture",
    body: "Define an enterprise AI work-cell schema that preserves affiliate autonomy. Establish common receipts for source state, model/version, authority, tool activity, evaluation, failure, and handoff. Select two measurable pilots.",
  },
  {
    phase: "Days 61-90",
    title: "Create portfolio-level learning",
    body: "Run real cases with affiliate experts. Measure time-to-working-value, review load, correction retention, unsupported claims, and handoff quality. Publish reusable components, telemetry definitions, failure patterns, and a prioritized hardening backlog.",
  },
];

export default function BrkTechAppliedAiPage() {
  return (
    <main className="page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        body { margin: 0; background: #08100d; }
        .page {
          min-height: 100vh;
          color: #f4f7ef;
          background:
            radial-gradient(circle at 10% 0%, rgba(222,187,74,.14), transparent 34rem),
            radial-gradient(circle at 92% 20%, rgba(78,173,255,.10), transparent 30rem),
            #08100d;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .shell { width: min(1180px, calc(100% - 38px)); margin: 0 auto; }
        .hero { padding: 72px 0 62px; border-bottom: 1px solid #2d392f; }
        .eyebrow { color: #d8b84f; font-size: 12px; font-weight: 900; letter-spacing: .17em; text-transform: uppercase; }
        h1 { max-width: 1100px; font-size: clamp(48px, 7.4vw, 94px); line-height: .92; letter-spacing: -.06em; margin: 18px 0 24px; }
        .lead { max-width: 940px; color: #bbc5b9; font-size: clamp(20px, 2.1vw, 25px); line-height: 1.55; }
        .statement { margin-top: 34px; padding: 26px 28px; border-left: 4px solid #d8b84f; background: rgba(216,184,79,.07); font-size: clamp(24px, 3vw, 38px); line-height: 1.2; letter-spacing: -.03em; }
        .chips { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 26px; }
        .chip { border: 1px solid #374338; border-radius: 999px; padding: 9px 13px; color: #abb7a9; background: #0c1410; font-size: 13px; }
        section { padding: 72px 0; border-bottom: 1px solid #263129; }
        .section-label { color: #d8b84f; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: .15em; }
        h2 { font-size: clamp(36px, 5vw, 64px); line-height: .98; letter-spacing: -.045em; margin: 12px 0 28px; max-width: 1000px; }
        .body { color: #b9c2b7; line-height: 1.72; font-size: 18px; max-width: 920px; }
        .alignment { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 34px; }
        .align-card { border: 1px solid #303d32; border-radius: 22px; padding: 22px; background: linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.012)); }
        .align-card h3 { margin: 0 0 10px; color: #e2c25b; font-size: 23px; }
        .align-card p { margin: 0; color: #aeb9ad; line-height: 1.63; }
        .receipt-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 34px; }
        .receipt { min-height: 265px; border: 1px solid #334036; border-radius: 24px; padding: 22px; background: #0b130f; display: flex; flex-direction: column; }
        .receipt .metric { color: #d8b84f; font-size: 32px; font-weight: 900; letter-spacing: -.04em; }
        .receipt h3 { font-size: 25px; margin: 14px 0 12px; }
        .receipt p { color: #aeb9ad; line-height: 1.63; margin: 0; }
        .gap-box { border: 1px solid #5a5030; background: rgba(216,184,79,.055); border-radius: 25px; padding: 28px; }
        .gap-box h3 { margin: 0 0 18px; color: #f0d477; font-size: 29px; }
        .gap-list { display: grid; gap: 11px; }
        .gap-item { color: #c8c2a8; line-height: 1.58; padding-left: 22px; position: relative; }
        .gap-item::before { content: "•"; position: absolute; left: 0; color: #d8b84f; }
        .counter { margin-top: 24px; color: #f0f3ec; font-size: 23px; line-height: 1.48; }
        .architecture { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 12px; align-items: stretch; margin-top: 34px; }
        .arch-card { border: 1px solid #334036; border-radius: 22px; padding: 22px; background: #0b130f; }
        .arch-card h3 { margin: 0 0 10px; font-size: 23px; color: #d8b84f; }
        .arch-card p { margin: 0; color: #aeb9ad; line-height: 1.6; }
        .arrow { display: flex; align-items: center; justify-content: center; color: #d8b84f; font-size: 34px; }
        .plan { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 34px; }
        .phase { border: 1px solid #303d32; border-radius: 24px; padding: 23px; background: linear-gradient(180deg, rgba(216,184,79,.055), rgba(255,255,255,.012)); }
        .phase .phase-label { color: #d8b84f; text-transform: uppercase; font-size: 12px; letter-spacing: .12em; font-weight: 900; }
        .phase h3 { font-size: 25px; margin: 13px 0 12px; }
        .phase p { margin: 0; color: #aeb9ad; line-height: 1.65; }
        .closing { padding: 34px; border: 1px solid rgba(216,184,79,.4); border-radius: 26px; background: linear-gradient(145deg, rgba(216,184,79,.09), rgba(255,255,255,.015)); }
        .closing p { color: #d7ded3; font-size: 22px; line-height: 1.63; margin: 0; }
        .links { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 26px; }
        .link { display: inline-flex; text-decoration: none; border-radius: 999px; padding: 11px 15px; font-weight: 900; background: #d8b84f; color: #08100d; }
        .link.secondary { background: transparent; color: #e0c767; border: 1px solid #62593a; }
        .truth { margin-top: 30px; padding: 24px; border-radius: 22px; border: 1px solid #3a463c; background: #0a120e; color: #9faa9e; line-height: 1.65; }
        footer { padding: 42px 0 70px; color: #7f8b7e; }
        @media (max-width: 940px) {
          .receipt-grid, .plan { grid-template-columns: 1fr 1fr; }
          .architecture { grid-template-columns: 1fr; }
          .arrow { transform: rotate(90deg); min-height: 40px; }
        }
        @media (max-width: 680px) {
          .shell { width: min(100% - 26px, 1180px); }
          .alignment, .receipt-grid, .plan { grid-template-columns: 1fr; }
          .hero { padding-top: 50px; }
          section { padding: 54px 0; }
        }
      `}</style>

      <header className="hero">
        <div className="shell">
          <div className="eyebrow">BRK TECH EXCEPTION-CASE APPLICATION // MASON PERRY</div>
          <h1>Applied AI at the Operating-Company Layer</h1>
          <p className="lead">
            BRK Tech is seeking a conventional Distinguished AI Engineer. My background is unconventional. My fit is the enterprise problem underneath the title: turning powerful models, diverse operating-company workflows, local expertise, governance, evaluation, and shared learning into a usable applied-AI operating system.
          </p>
          <div className="statement">
            I do not match the conventional pedigree in your posting. I match the enterprise operating problem you are trying to solve.
          </div>
          <div className="chips">
            <span className="chip">Founder, NULLWORKS</span>
            <span className="chip">Operational Intelligence Systems Architect</span>
            <span className="chip">USPS mission-critical automation</span>
            <span className="chip">Human Authority remains final</span>
          </div>
        </div>
      </header>

      <section>
        <div className="shell">
          <div className="section-label">Why the mandate fits</div>
          <h2>The role asks for more than model expertise. It asks for an operating architecture across autonomous businesses.</h2>
          <p className="body">
            The posting describes a company-wide catalyst who can translate research into deployable systems, build reusable reference architectures, establish evaluation and observability standards, partner with affiliate leaders, and move decentralized teams from experimentation to measurable impact. That is the layer NULLWORKS calls Operational Intelligence Systems Architecture.
          </p>
          <div className="alignment">
            {alignment.map(([title, body]) => (
              <article className="align-card" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">The architecture</div>
          <h2>The AI engineer builds the worker. The OI architect builds the company the workers operate inside.</h2>
          <div className="architecture">
            <article className="arch-card">
              <h3>AI capability</h3>
              <p>Models, agents, runtimes, tools, APIs, data, cloud infrastructure, and specialized engineering.</p>
            </article>
            <div className="arrow">→</div>
            <article className="arch-card">
              <h3>Operational Intelligence layer</h3>
              <p>Roles, workflow routing, source state, authority, review gates, evaluation, telemetry, exceptions, continuity, and failure receipts.</p>
            </article>
            <div className="arrow">→</div>
            <article className="arch-card">
              <h3>Operating-company value</h3>
              <p>Faster first value, reusable patterns, safer action, local expert control, measurable compression, and cleaner engineering handoffs.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">Working receipts</div>
          <h2>The case is built from operating evidence, not a claim that prototypes equal production scale.</h2>
          <div className="receipt-grid">
            {receipts.map((receipt) => (
              <article className="receipt" key={receipt.title}>
                <div className="metric">{receipt.metric}</div>
                <h3>{receipt.title}</h3>
                <p>{receipt.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">The paper gap</div>
          <h2>An exception case only works if the missing qualifications are visible.</h2>
          <div className="gap-box">
            <h3>What I am not claiming</h3>
            <div className="gap-list">
              {gaps.map((gap) => <div className="gap-item" key={gap}>{gap}</div>)}
            </div>
            <div className="counter">
              These qualifications matter. My argument is not that they should be ignored. It is that a decentralized applied-AI portfolio may also require a complementary architect who can connect technical capability to operating-company reality.
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">First 90 days</div>
          <h2>Start with a small cross-portfolio operating baseline, not a grand centralization program.</h2>
          <div className="plan">
            {ninetyDays.map((item) => (
              <article className="phase" key={item.phase}>
                <div className="phase-label">{item.phase}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="closing">
            <p>
              The strongest reason to interview me is not that I replace the conventional Distinguished Engineer in the posting. It is that I may bring a complementary systems architecture BRK Tech will also need: a human-centered operating system that helps affiliate experts, ML engineers, platform teams, security, and leadership turn powerful AI capabilities into governed, observable, reusable work.
            </p>
            <div className="links">
              <a className="link" href="mailto:masoncalcolsol@gmail.com">Contact Mason</a>
              <a className="link secondary" href="/rj">RJ: 1 + 1 = 3</a>
              <a className="link secondary" href="/vf001">Voice Foundry</a>
              <a className="link secondary" href="/field-notes/software-project-engineer-bridge">Industrial systems field case</a>
            </div>
          </div>
          <div className="truth">
            <strong>Application truth boundary:</strong> This is an independent exception-case application. It does not claim employment by, endorsement from, affiliation with, or participation by BRK Tech, Berkshire Hathaway, or any Berkshire operating company. It does not claim the listed 15+ years of AI/ML tenure, advanced technical degree, large-scale model-training ownership, or deep production PyTorch/TensorFlow/MLOps experience. Prototype work is not represented as hardened enterprise production experience.
          </div>
        </div>
      </section>

      <footer>
        <div className="shell">Mason Perry // Founder & Operational Intelligence Systems Architect // NULLWORKS // Phoenix, Arizona</div>
      </footer>
    </main>
  );
}
