import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RJ: When 1 + 1 Equals 3 | NULLWORKS",
  description:
    "How two bounded NULLWORKS AI workrooms combined complementary evidence, stopped blind source churn, repaired a shared deployment path, and created reusable operational intelligence.",
};

const steps = [
  {
    number: "01",
    title: "Two bounded workrooms",
    body: "Voice Foundry was building an AI-worker telemetry console. A separate Toyota bridge workroom was packaging a recruiter-facing field case. Different missions. Different evidence. Same governed company floor.",
  },
  {
    number: "02",
    title: "One recurring failure",
    body: "Both workrooms saw new routes return 404 while isolated Vercel checks reported success. The third Voice Foundry test bypassed redirects, static files, React rendering, and the portfolio layout. It still failed live.",
  },
  {
    number: "03",
    title: "The stop rule",
    body: "The workrooms stopped changing page code. Owner-browser receipts had moved the problem outside the application lane. The correct next move was cross-workroom escalation, not another speculative edit.",
  },
  {
    number: "04",
    title: "RJ formed through the Hive",
    body: "Mason authorized a joint investigation. A durable Hive request and GitHub coordination issue defined the shared evidence, division of work, authority boundary, and completion gate.",
  },
  {
    number: "05",
    title: "Missing evidence surfaced",
    body: "The RJ group queried Gmail and found explicit failed Production and Preview deployment notices. The problem was not only an alias mystery: the deployment system had contradictory receipts that no single workroom held alone.",
  },
  {
    number: "06",
    title: "The third asset appeared",
    body: "The team completed a joint source/build repair and created a reusable deployment-debug method linking Gmail, GitHub, Vercel, public-route checks, failure receipts, and Human Authority.",
  },
];

const receipts = [
  ["11 seconds", "Fresh-workroom time to governed working floor"],
  ["3 × 404", "Owner-browser failures preserved against green CI"],
  ["2 workrooms", "Voice Foundry plus Toyota bridge"],
  ["1 Hive", "Durable coordination and shared source of truth"],
  ["1 new system", "Reusable RJ deployment-debug method"],
];

const operatingRules = [
  "Bound the workrooms instead of blending them into one vague swarm.",
  "Preserve each workroom’s evidence before asking them to coordinate.",
  "Use Human Authority to authorize the shared objective and completion gate.",
  "Treat browser truth, source truth, CI truth, Preview state, and Production state as different receipts.",
  "Stop changing source when the evidence points to the deployment surface.",
  "Write the correction back so the next workroom inherits the learning.",
];

export default function RemoteJerkingPage() {
  return (
    <main className="rj-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        body { margin: 0; background: #080b09; }
        .rj-page {
          min-height: 100vh;
          overflow: hidden;
          color: #f5f7ef;
          background:
            radial-gradient(circle at 12% 4%, rgba(215,255,47,.14), transparent 31rem),
            radial-gradient(circle at 88% 20%, rgba(73,170,255,.10), transparent 28rem),
            #080b09;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .shell { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
        .hero { padding: 70px 0 58px; border-bottom: 1px solid #2b352d; }
        .eyebrow { color: #d7ff2f; font-size: 12px; font-weight: 900; letter-spacing: .17em; text-transform: uppercase; }
        .hero-grid { display: grid; grid-template-columns: 1.25fr .75fr; gap: 32px; align-items: end; margin-top: 18px; }
        h1 { margin: 0; max-width: 850px; font-size: clamp(54px, 9vw, 112px); line-height: .86; letter-spacing: -.065em; }
        .hero-copy { color: #aeb9ad; font-size: clamp(18px, 2.1vw, 23px); line-height: 1.55; max-width: 820px; margin: 28px 0 0; }
        .equation { min-height: 250px; border: 1px solid #394337; border-radius: 28px; padding: 28px; background: linear-gradient(145deg, rgba(215,255,47,.08), rgba(255,255,255,.02)); display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 28px 70px rgba(0,0,0,.28); }
        .equation strong { color: #d7ff2f; font-size: clamp(58px, 8vw, 95px); line-height: 1; letter-spacing: -.06em; }
        .equation p { color: #c5cec2; line-height: 1.55; margin: 16px 0 0; }
        .chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
        .chip { border: 1px solid #313c32; background: #0d120f; color: #aeb9ad; border-radius: 999px; padding: 9px 13px; font-size: 13px; }
        section { padding: 70px 0; border-bottom: 1px solid #242d26; }
        .section-label { color: #d7ff2f; font-size: 12px; font-weight: 900; letter-spacing: .15em; text-transform: uppercase; }
        h2 { font-size: clamp(36px, 5vw, 65px); line-height: .98; letter-spacing: -.045em; margin: 12px 0 28px; max-width: 900px; }
        .lead { color: #c9d1c6; font-size: 21px; line-height: 1.65; max-width: 880px; }
        .timeline { display: grid; gap: 14px; margin-top: 36px; }
        .step { display: grid; grid-template-columns: 92px 1fr; gap: 20px; padding: 24px; border: 1px solid #2d382f; border-radius: 22px; background: linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.012)); }
        .step-number { color: #d7ff2f; font-size: 28px; font-weight: 900; }
        .step h3 { margin: 0 0 8px; font-size: 24px; }
        .step p { margin: 0; color: #aeb9ad; line-height: 1.65; }
        .three-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 34px; }
        .role-card { border: 1px solid #2f3a31; border-radius: 24px; padding: 24px; background: #0d120f; }
        .role-card.third { border-color: rgba(215,255,47,.48); background: linear-gradient(155deg, rgba(215,255,47,.10), #0d120f 55%); }
        .role-card .tag { color: #d7ff2f; font-weight: 900; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; }
        .role-card h3 { font-size: 27px; margin: 14px 0 12px; }
        .role-card p { color: #aeb9ad; line-height: 1.65; }
        .receipt-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 32px; }
        .receipt { min-height: 165px; border: 1px solid #2f3930; border-radius: 20px; padding: 20px; background: #0b100d; display: flex; flex-direction: column; justify-content: space-between; }
        .receipt strong { color: #d7ff2f; font-size: 31px; letter-spacing: -.04em; }
        .receipt span { color: #9eaa9d; line-height: 1.45; font-size: 14px; }
        .rules { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 30px; }
        .rule { padding: 18px 20px; border-left: 3px solid #d7ff2f; background: rgba(255,255,255,.025); color: #bdc7ba; line-height: 1.6; }
        .quote { margin: 40px 0 0; padding: 28px; border-radius: 24px; border: 1px solid rgba(215,255,47,.38); background: rgba(215,255,47,.06); font-size: clamp(26px, 3.4vw, 43px); line-height: 1.15; letter-spacing: -.035em; }
        .article { max-width: 880px; }
        .article h3 { margin: 42px 0 12px; font-size: 30px; letter-spacing: -.03em; }
        .article p { color: #b7c1b5; font-size: 18px; line-height: 1.78; }
        .article strong { color: #f4f7ef; }
        .truth { padding: 28px; border: 1px solid #554d2b; border-radius: 24px; background: rgba(255,209,102,.055); }
        .truth h3 { margin: 0 0 12px; color: #ffd166; font-size: 24px; }
        .truth p { margin: 0; color: #c9c1a4; line-height: 1.7; }
        .links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }
        .link { display: inline-flex; align-items: center; padding: 11px 15px; border-radius: 999px; text-decoration: none; color: #080b09; background: #d7ff2f; font-weight: 900; }
        .link.secondary { background: transparent; color: #d7ff2f; border: 1px solid #52623e; }
        footer { padding: 42px 0 70px; color: #798679; font-size: 14px; }
        @media (max-width: 900px) {
          .hero-grid, .three-grid { grid-template-columns: 1fr; }
          .receipt-grid { grid-template-columns: repeat(2, 1fr); }
          .rules { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .shell { width: min(100% - 26px, 1180px); }
          .hero { padding-top: 48px; }
          .step { grid-template-columns: 1fr; }
          .receipt-grid { grid-template-columns: 1fr; }
          section { padding: 52px 0; }
        }
      `}</style>

      <header className="hero">
        <div className="shell">
          <div className="eyebrow">NULLWORKS FIELD NOTE // DISTRIBUTED AI OPERATIONS</div>
          <div className="hero-grid">
            <div>
              <h1>RJ: When 1 + 1 Equals 3</h1>
              <p className="hero-copy">
                Two bounded AI workrooms encountered the same recurring deployment failure. The Hive Brain let them combine complementary evidence, repair the shared path, and create something neither had been assigned to build: reusable operational intelligence.
              </p>
              <div className="chips">
                <span className="chip">AI workrooms, not humans</span>
                <span className="chip">Human Authority: Mason Perry</span>
                <span className="chip">Failure receipts preserved</span>
                <span className="chip">No green-build-only finish line</span>
              </div>
            </div>
            <aside className="equation">
              <strong>1 + 1 = 3</strong>
              <p>
                Workroom A created one asset. Workroom B created another. Their governed collaboration created a third asset: a shared deployment-debug method that survives both threads.
              </p>
            </aside>
          </div>
        </div>
      </header>

      <section>
        <div className="shell">
          <div className="section-label">What RJ means</div>
          <h2>Remote Jerking. Irreverent name. Serious operating method.</h2>
          <p className="lead">
            Inside NULLWORKS, RJ means Remote Jerking: NULLJERKS teaming up remotely to solve a problem. It is not an ungoverned swarm and it is not two agents generating more conversation. Each workroom stays bounded, the Hive Brain carries the handoff, Mason authorizes the shared objective, and completion requires a real-world receipt.
          </p>
          <div className="quote">The prompt did not create the collaboration. The governed handoff did.</div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">The operating sequence</div>
          <h2>Teamwork started when both workrooms stopped pretending the failure was local.</h2>
          <div className="timeline">
            {steps.map((step) => (
              <article className="step" key={step.number}>
                <div className="step-number">{step.number}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">Why the math works</div>
          <h2>The extra value was organizational, not computational.</h2>
          <div className="three-grid">
            <article className="role-card">
              <div className="tag">Workroom one</div>
              <h3>Voice Foundry</h3>
              <p>
                Contributed three owner-browser 404 receipts, route-isolation tests, the stop rule, and proof that the application code was no longer the only credible suspect.
              </p>
            </article>
            <article className="role-card">
              <div className="tag">Workroom two</div>
              <h3>Toyota Bridge</h3>
              <p>
                Contributed the cross-project recurrence, rejected a guessed branch hostname after NXDOMAIN, and showed that the deployment failure affected more than one route and mission.
              </p>
            </article>
            <article className="role-card third">
              <div className="tag">The third output</div>
              <h3>Shared operational intelligence</h3>
              <p>
                RJ combined Gmail, GitHub, Vercel, exact-route checks, authority, and failure receipts into a reusable deployment-debug and cross-workroom coordination method.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">Receipts, not mythology</div>
          <h2>The collaboration produced observable operating evidence.</h2>
          <div className="receipt-grid">
            {receipts.map(([value, label]) => (
              <article className="receipt" key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">What made the team useful</div>
          <h2>Coordination required structure, not just access to another model.</h2>
          <div className="rules">
            {operatingRules.map((rule) => (
              <div className="rule" key={rule}>{rule}</div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="shell article">
          <div className="section-label">Field note</div>
          <h2>What “solved” means here</h2>
          <p>
            The team solved the diagnosis and completed the joint source/build repair. The old <strong>mason-portfolio-phi</strong> alias was retired for this work. The guessed branch hostname was retired. Voice Foundry and the Toyota bridge were hardened as direct routes in the <strong>mason-portfolio-main</strong> project. The latest candidate commit passed its Vercel check.
          </p>
          <p>
            The team also identified the correct remaining gate: Mason must open each exact project-domain route in a real browser and test the Voice Foundry receipt control. Public destination verification was still pending when this page was built.
          </p>
          <h3>The real lesson</h3>
          <p>
            Most multi-agent demonstrations measure activity. RJ measured whether separate workrooms could preserve their own evidence, recognize a shared constraint, escalate through a governed handoff, divide the investigation, reject stale assumptions, and leave behind a method the next workroom could reuse.
          </p>
          <p>
            The model is not the team. The chat is not the coordination layer. Shared memory is not enough unless it preserves authority, source state, failure, correction, and exact next action.
          </p>
          <div className="quote">The third unit is the organizational learning that survives both workers.</div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="truth">
            <h3>Truth boundary</h3>
            <p>
              This page documents an early NULLWORKS systems-architecture experiment. The commits, failure receipts, coordination issue, deployment notices, and source/build repair are real. This does not prove production reliability or universal multi-agent performance. Toyota participation, endorsement, funding, customer use, employment, and approval are not claimed. Final public-route verification remained pending at the time of publication.
            </p>
          </div>
          <div className="links">
            <a className="link" href="https://github.com/masoncalcolsol-creator/nullworks-corporate-wifi-hive/issues/3">Open the RJ coordination receipt</a>
            <a className="link secondary" href="/vf001">Open Voice Foundry route</a>
            <a className="link secondary" href="/toyota-bridge">Open Toyota bridge route</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell">NULLWORKS // Human Authority remains final // 1 + 1 = 3 when the third output is durable organizational learning.</div>
      </footer>
    </main>
  );
}
