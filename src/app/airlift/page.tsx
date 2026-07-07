import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NULLWORKS AIRLIFT | Candidate Proof Systems",
  description:
    "A candidate-controlled evidence environment for high-value career opportunities: persistent profile, role-specific proof page, targeted application package, and outcome receipts.",
};

const systemLayers = [
  {
    number: "01",
    title: "Career Evidence Vault",
    body: "We excavate the work a conventional resume compresses or misses: invisible responsibility, rescue patterns, unofficial leadership, learning jumps, system improvements, artifacts, metrics, corrections, and approved claims.",
  },
  {
    number: "02",
    title: "Real-World Candidate Profile",
    body: "A persistent independent professional identity combining the strongest parts of a LinkedIn profile, executive bio, resume overview, selected proof, work philosophy, and direct contact path.",
  },
  {
    number: "03",
    title: "Role-Specific Proof Page",
    body: "A custom employer-facing case for one opportunity: mandate interpretation, qualification mapping, honest gaps, relevant receipts, first-90-day value thesis, and a clear next action.",
  },
  {
    number: "04",
    title: "Candidate Deployment Package",
    body: "An ATS-compatible resume, cover letter or executive brief, application responses, professional outreach, and a decision-specific follow-up message aligned to the exact role.",
  },
  {
    number: "05",
    title: "Outcome Receipts",
    body: "We record what was deployed, what was opened, what received a response, what reached a screen, what failed, and what should change for the next opportunity.",
  },
];

const bestFor = [
  "Senior engineers and technical leaders",
  "Executives pursuing VP, C-suite, board, or transformation roles",
  "Researchers and specialists moving into industry leadership",
  "Founders returning to employment",
  "Experienced operators making nontraditional transitions",
  "High-performing candidates whose title or industry hides transferable capability",
];

const foundingPilot = [
  "Deep evidence intake and career excavation",
  "One Real-World Candidate Profile",
  "One Role-Specific Proof Page",
  "One ATS-compatible targeted resume",
  "One cover letter or executive brief",
  "One professional outreach package",
  "One decision-specific follow-up message",
  "One revision round",
  "Thirty days of outcome recording",
];

const principles = [
  "Every public claim is candidate-approved.",
  "Real gaps remain visible instead of being cosmetically hidden.",
  "The proof system supplements the formal application; it does not pretend ATS systems disappeared.",
  "A response, interview, or job is never guaranteed.",
  "Human judgment remains final.",
];

export default function AirliftPage() {
  return (
    <main className="airlift">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        body { margin: 0; background: #080a09; }
        .airlift {
          min-height: 100vh;
          color: #f5f6f0;
          background:
            radial-gradient(circle at 12% 0%, rgba(215,255,47,.15), transparent 33rem),
            radial-gradient(circle at 91% 14%, rgba(219,175,75,.12), transparent 31rem),
            #080a09;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .shell { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
        .hero { padding: 78px 0 66px; border-bottom: 1px solid #293029; }
        .eyebrow { color: #d7ff2f; font-weight: 900; font-size: 12px; letter-spacing: .17em; text-transform: uppercase; }
        .hero-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 28px; align-items: end; margin-top: 18px; }
        h1 { font-size: clamp(58px, 9vw, 118px); line-height: .84; letter-spacing: -.07em; margin: 0; }
        .lead { margin: 28px 0 0; max-width: 870px; color: #b8c1b6; font-size: clamp(20px, 2.2vw, 25px); line-height: 1.56; }
        .hero-card { border: 1px solid #384137; border-radius: 28px; padding: 28px; background: linear-gradient(150deg, rgba(215,255,47,.10), rgba(255,255,255,.02)); box-shadow: 0 30px 85px rgba(0,0,0,.35); }
        .hero-card strong { display: block; color: #d7ff2f; font-size: clamp(38px, 5vw, 60px); line-height: .95; letter-spacing: -.05em; }
        .hero-card p { color: #c4ccc1; line-height: 1.6; margin: 18px 0 0; }
        .chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
        .chip { border: 1px solid #303831; background: #0c100d; color: #aeb8ad; border-radius: 999px; padding: 9px 13px; font-size: 13px; }
        .cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
        .cta { display: inline-flex; align-items: center; justify-content: center; text-decoration: none; border-radius: 999px; padding: 13px 18px; font-weight: 900; background: #d7ff2f; color: #080a09; }
        .cta.secondary { background: transparent; color: #d7ff2f; border: 1px solid #54613f; }
        section { padding: 76px 0; border-bottom: 1px solid #252c26; }
        .section-label { color: #d7ff2f; font-size: 12px; letter-spacing: .15em; text-transform: uppercase; font-weight: 900; }
        h2 { max-width: 1000px; font-size: clamp(38px, 5.5vw, 70px); line-height: .98; letter-spacing: -.05em; margin: 12px 0 28px; }
        .body { max-width: 900px; color: #b6c0b4; font-size: 19px; line-height: 1.72; }
        .split { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; align-items: start; }
        .contrast { border-radius: 24px; padding: 25px; border: 1px solid #323a33; background: #0c110e; }
        .contrast.bad { opacity: .78; }
        .contrast.good { border-color: rgba(215,255,47,.45); background: linear-gradient(145deg, rgba(215,255,47,.08), #0c110e 55%); }
        .contrast h3 { font-size: 28px; margin: 0 0 15px; }
        .contrast p { color: #aeb8ad; line-height: 1.67; }
        .system { display: grid; gap: 14px; margin-top: 34px; }
        .layer { display: grid; grid-template-columns: 90px 1fr; gap: 20px; border: 1px solid #303a32; border-radius: 22px; padding: 23px; background: linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.01)); }
        .layer-number { color: #d7ff2f; font-size: 28px; font-weight: 900; }
        .layer h3 { margin: 0 0 8px; font-size: 25px; }
        .layer p { margin: 0; color: #aeb8ad; line-height: 1.64; }
        .audience { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 32px; }
        .audience-card { min-height: 150px; display: flex; align-items: end; border: 1px solid #323b33; border-radius: 21px; padding: 20px; background: #0b100d; color: #c6cec3; font-weight: 700; line-height: 1.45; }
        .pilot-grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 22px; align-items: stretch; margin-top: 34px; }
        .price-card { border: 1px solid rgba(215,255,47,.45); border-radius: 28px; padding: 28px; background: linear-gradient(145deg, rgba(215,255,47,.11), rgba(255,255,255,.02)); }
        .price-card .seats { color: #d7ff2f; font-size: 12px; text-transform: uppercase; letter-spacing: .14em; font-weight: 900; }
        .price { margin-top: 18px; font-size: clamp(62px, 8vw, 92px); font-weight: 900; letter-spacing: -.07em; line-height: .9; }
        .price-card p { color: #c0c9bd; line-height: 1.62; }
        .deliverables { border: 1px solid #303a32; border-radius: 28px; padding: 28px; background: #0b100d; }
        .deliverables h3 { font-size: 28px; margin: 0 0 18px; }
        .check { position: relative; color: #b8c1b6; line-height: 1.55; padding: 8px 0 8px 28px; border-bottom: 1px solid #202821; }
        .check::before { content: "✓"; position: absolute; left: 0; color: #d7ff2f; font-weight: 900; }
        .principles { display: grid; grid-template-columns: repeat(2, 1fr); gap: 13px; margin-top: 30px; }
        .principle { border-left: 3px solid #d7ff2f; background: rgba(255,255,255,.025); padding: 18px 20px; color: #b6c0b4; line-height: 1.6; }
        .closing { border: 1px solid #3c473d; border-radius: 28px; padding: 32px; background: linear-gradient(145deg, rgba(219,175,75,.08), rgba(215,255,47,.05)); }
        .closing p { color: #d3d9d0; font-size: 23px; line-height: 1.58; margin: 0; }
        .truth { margin-top: 25px; padding: 22px; border: 1px solid #3a413a; border-radius: 22px; color: #99a398; line-height: 1.65; background: #0b100d; }
        footer { padding: 42px 0 72px; color: #778177; }
        @media (max-width: 900px) {
          .hero-grid, .split, .pilot-grid { grid-template-columns: 1fr; }
          .audience { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 620px) {
          .shell { width: min(100% - 26px, 1180px); }
          .hero { padding-top: 52px; }
          section { padding: 54px 0; }
          .audience, .principles { grid-template-columns: 1fr; }
          .layer { grid-template-columns: 1fr; }
        }
      `}</style>

      <header className="hero">
        <div className="shell">
          <div className="eyebrow">NULLWORKS AIRLIFT // HUMAN TALENT MOBILITY</div>
          <div className="hero-grid">
            <div>
              <h1>It is not a résumé anymore.</h1>
              <p className="lead">
                AIRLIFT builds a recruiter-ready evidence environment around exceptional candidates when one opportunity matters too much to be represented by a static document alone.
              </p>
              <div className="chips">
                <span className="chip">Candidate-controlled evidence</span>
                <span className="chip">Role-specific proof</span>
                <span className="chip">Honest gap mapping</span>
                <span className="chip">ATS package included</span>
                <span className="chip">Human Authority final</span>
              </div>
              <div className="cta-row">
                <a className="cta" href="/airlift/apply">Apply for a Founding Pilot seat</a>
                <a className="cta secondary" href="#system">See the system</a>
              </div>
            </div>
            <aside className="hero-card">
              <strong>One shot deserves more than one page.</strong>
              <p>
                AIRLIFT is for senior professionals, executives, founders, researchers, and experienced operators pursuing career-defining roles where the real capability is bigger than the current title, industry, degree, or résumé format can explain.
              </p>
            </aside>
          </div>
        </div>
      </header>

      <section>
        <div className="shell">
          <div className="section-label">The category break</div>
          <h2>A résumé reports where you have been. A Candidate Proof System shows how your evidence matters for the exact problem being hired.</h2>
          <div className="split">
            <article className="contrast bad">
              <h3>The résumé snapshot</h3>
              <p>
                One compressed chronology. Generic bullets. Limited proof. Context stripped away. Optimized to pass a machine before the candidate can be understood by a person.
              </p>
            </article>
            <article className="contrast good">
              <h3>The AIRLIFT evidence environment</h3>
              <p>
                A persistent professional identity plus a custom proof layer for each target role: mandate, receipts, transferable capability, honest gaps, trajectory, first-90-day value, and a direct decision path.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="system">
        <div className="shell">
          <div className="section-label">The Candidate Proof System</div>
          <h2>One durable professional identity. A precision deployment package for each serious opportunity.</h2>
          <div className="system">
            {systemLayers.map((layer) => (
              <article className="layer" key={layer.number}>
                <div className="layer-number">{layer.number}</div>
                <div>
                  <h3>{layer.title}</h3>
                  <p>{layer.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">Who this is for</div>
          <h2>People with a career-defining shot, not a need for another generic template.</h2>
          <div className="audience">
            {bestFor.map((item) => <div className="audience-card" key={item}>{item}</div>)}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">Founding Pilot</div>
          <h2>Three paid design-partner seats. Built by hand before the workflow becomes software.</h2>
          <div className="pilot-grid">
            <article className="price-card">
              <div className="seats">3 seats only</div>
              <div className="price">$500</div>
              <p>$250 to start. $250 on delivery. Target delivery within five business days after complete intake.</p>
              <p>
                Founding Pilots receive the complete first version and help shape the production system through structured feedback and outcome receipts.
              </p>
              <div className="cta-row">
                <a className="cta" href="/airlift/apply">Request a pilot seat</a>
              </div>
            </article>
            <article className="deliverables">
              <h3>What is included</h3>
              {foundingPilot.map((item) => <div className="check" key={item}>{item}</div>)}
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="section-label">Operating doctrine</div>
          <h2>Luxury does not mean exaggeration. The proof works because the boundaries remain visible.</h2>
          <div className="principles">
            {principles.map((item) => <div className="principle" key={item}>{item}</div>)}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="closing">
            <p>
              Your career may be nonlinear. Your real capability may live outside your title. Your strongest work may never have fit neatly into a résumé bullet. AIRLIFT excavates the evidence, translates it into the language of the target opportunity, and puts the complete case in front of the people making the decision.
            </p>
            <div className="cta-row">
              <a className="cta" href="/airlift/apply">Apply for AIRLIFT</a>
              <a className="cta secondary" href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20AIRLIFT">Contact Mason</a>
            </div>
          </div>
          <div className="truth">
            <strong>Truth boundary:</strong> AIRLIFT is a candidate-controlled positioning and evidence service. It does not guarantee employer review, interviews, offers, compensation, or placement. It never fabricates qualifications, metrics, endorsements, or outcomes. Employer-specific pages are independent candidate materials and do not imply company participation or approval.
          </div>
        </div>
      </section>

      <footer>
        <div className="shell">NULLWORKS AIRLIFT // When the opportunity matters too much to be represented by a résumé alone.</div>
      </footer>
    </main>
  );
}
