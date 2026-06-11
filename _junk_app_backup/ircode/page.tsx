import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mason Perry for IRCODE | UX/UI Designer",
  description:
    "IRCODE-specific candidate page highlighting scan-to-action UX, AI-assisted workflows, OCR correction, mobile/web product design, and deployed prototypes.",
};

const matches = [
  {
    title: "AI-assisted design workflows",
    text: "I use AI as a live design and product partner: research compression, UX copy, interface options, prototype iteration, implementation planning, and testing loops.",
  },
  {
    title: "Mobile + web UX/UI",
    text: "TAC OPS, PAPERGOBLIN, and CHECKMATE all focus on camera-first mobile flows, responsive web interfaces, editable correction states, thumb-safe interaction, and clean decision hierarchy.",
  },
  {
    title: "End-to-end product design",
    text: "I move from field problem to product framing, workflow map, wireframe, prototype, implementation, testing, and deployed proof.",
  },
  {
    title: "Measurable impact",
    text: "USPS automation work gives me real exposure to OCR, scan reliability, damaged-label recovery, high-volume logistics, exception handling, and workflow failure costs.",
  },
  {
    title: "Collaboration",
    text: "I translate between operators, supervisors, product goals, engineering constraints, and real users working under imperfect conditions.",
  },
];

const projects = [
  {
    title: "TAC OPS / ORI",
    kicker: "Scan-to-action recovery workflow",
    desc: "A field-tested product concept for damaged or degraded labels: capture the artifact, preserve candidate identifiers, guide human review, confirm the machine-relevant ID, and route the package back into motion.",
    chips: ["Scan workflow", "Operational UX", "Human-in-loop"],
    mark: "TO",
    tone: "tac",
  },
  {
    title: "PAPERGOBLIN",
    kicker: "OCR intake + correction system",
    desc: "A live OCR intake prototype that turns receipts, labels, and messy visual artifacts into structured learning packets with editable text, correction telemetry, and human-verified output.",
    chips: ["AI workflow", "OCR correction", "Structured data"],
    mark: "PG",
    tone: "paper",
  },
  {
    title: "CHECKMATE",
    kicker: "Receipt OCR + bill-splitting UX",
    desc: "A mobile-first proof of concept that turns messy receipts into editable item bubbles, people assignments, split totals, share links, SMS-ready payment summaries, and paid-state clarity.",
    chips: ["Transaction UX", "Mobile-first", "Prototype proof"],
    mark: "CM",
    tone: "check",
  },
];

export default function IRCODEPage() {
  return (
    <main className="ir-page">
      <style>{`
        * { box-sizing: border-box; }
        html { background: #f7f1e8; }
        body { margin: 0; background: #f7f1e8; }
        .ir-page {
          min-height: 100vh;
          margin: -8px;
          padding: 26px 18px;
          color: #241811;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at 18% 8%, rgba(255, 210, 128, .42), transparent 34rem),
            radial-gradient(circle at 90% 2%, rgba(127, 105, 77, .14), transparent 28rem),
            linear-gradient(180deg, #fbf6ee 0%, #f4eadc 100%);
        }
        .wrap { width: min(1120px, 100%); margin: 0 auto; }
        .top { display: flex; justify-content: space-between; align-items: center; gap: 14px; margin-bottom: 32px; }
        .brand { display: flex; align-items: center; gap: 12px; }
        .logo {
          width: 44px; height: 44px; border-radius: 16px; display: grid; place-items: center;
          background: #252018; color: #fff6e8; font-size: 13px; font-weight: 900;
          letter-spacing: -.04em; box-shadow: 0 14px 32px rgba(37,32,24,.18);
        }
        .tiny { margin: 0; color: #8b7a68; font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }
        .name { margin: 2px 0 0; color: #241811; font-size: 18px; font-weight: 900; letter-spacing: -.04em; }
        .nav-pill {
          border: 1px solid rgba(61,44,28,.12); background: rgba(255,255,255,.72); color: #5f4b39;
          border-radius: 999px; padding: 12px 16px; font-size: 13px; font-weight: 800;
          text-decoration: none; box-shadow: 0 10px 32px rgba(61,44,28,.08);
        }
        .hero { text-align: center; padding: 38px 18px 28px; }
        .hero-badge {
          display: inline-flex; padding: 9px 13px; border-radius: 999px; background: #fff;
          border: 1px solid rgba(61,44,28,.10); color: #8b5a20; font-size: 11px;
          font-weight: 900; letter-spacing: .16em; text-transform: uppercase;
          box-shadow: 0 10px 30px rgba(61,44,28,.07);
        }
        h1 {
          max-width: 940px; margin: 20px auto 0; font-size: clamp(48px, 8vw, 92px);
          line-height: .9; letter-spacing: -.075em; font-weight: 950;
        }
        .lead {
          max-width: 790px; margin: 24px auto 0; color: #6f6256;
          font-size: clamp(17px, 2vw, 21px); line-height: 1.65; font-weight: 550;
        }
        .actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
        .button {
          display: inline-flex; align-items: center; justify-content: center; min-height: 46px;
          padding: 0 18px; border-radius: 999px; text-decoration: none; font-size: 14px;
          font-weight: 900; border: 1px solid rgba(61,44,28,.12);
        }
        .button.primary { background: #241811; color: #fff6e8; box-shadow: 0 16px 36px rgba(36,24,17,.20); }
        .button.secondary { background: #fff; color: #241811; }
        .section-head { display: flex; justify-content: space-between; align-items: end; gap: 18px; margin: 42px 0 16px; }
        .section-head h2 {
          margin: 0; font-size: clamp(28px, 4vw, 44px); line-height: .95;
          letter-spacing: -.06em; font-weight: 950;
        }
        .section-head p { max-width: 450px; margin: 0; color: #7b6c5e; font-size: 14px; line-height: 1.55; font-weight: 600; }
        .project-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .project {
          overflow: hidden; border-radius: 34px; background: rgba(255,255,255,.78);
          border: 1px solid rgba(61,44,28,.10); box-shadow: 0 24px 70px rgba(61,44,28,.10);
        }
        .image {
          min-height: 170px; padding: 20px; display: flex; align-items: end; justify-content: space-between;
          background: radial-gradient(circle at 22% 18%, rgba(255,255,255,.64), transparent 16rem), linear-gradient(135deg, #8b8d67, #292b23);
        }
        .project[data-tone="paper"] .image {
          background: radial-gradient(circle at 18% 18%, rgba(255,255,255,.60), transparent 16rem), linear-gradient(135deg, #d79a3a, #6d5134);
        }
        .project[data-tone="check"] .image {
          background: radial-gradient(circle at 18% 18%, rgba(255,255,255,.50), transparent 16rem), linear-gradient(135deg, #b87744, #2c211b);
        }
        .mark {
          width: 62px; height: 62px; border-radius: 22px; display: grid; place-items: center;
          background: rgba(255,255,255,.86); color: #241811; font-size: 20px; font-weight: 950;
          letter-spacing: -.08em; box-shadow: 0 14px 34px rgba(36,24,17,.18);
        }
        .project-label { color: rgba(255,255,255,.88); font-size: 11px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; }
        .project-body { padding: 22px; }
        .project h3 { margin: 0; font-size: 28px; line-height: 1; letter-spacing: -.06em; font-weight: 950; }
        .kicker { margin: 8px 0 0; color: #946020; font-size: 12px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
        .desc { margin: 16px 0 0; color: #6f6256; font-size: 14px; line-height: 1.62; font-weight: 560; }
        .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
        .chip { border-radius: 999px; background: #f2eadf; color: #55483c; padding: 7px 10px; font-size: 11px; font-weight: 850; }
        .match-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        .match {
          min-height: 210px; border-radius: 30px; padding: 20px; background: rgba(255,255,255,.70);
          border: 1px solid rgba(61,44,28,.10); box-shadow: 0 18px 54px rgba(61,44,28,.08);
        }
        .match-num {
          width: 36px; height: 36px; display: grid; place-items: center; border-radius: 14px;
          background: #241811; color: #fff6e8; font-size: 12px; font-weight: 950;
        }
        .match h3 { margin: 16px 0 0; font-size: 16px; line-height: 1.05; letter-spacing: -.03em; font-weight: 950; }
        .match p { margin: 12px 0 0; color: #75685c; font-size: 13px; line-height: 1.5; font-weight: 560; }
        .feature { display: grid; grid-template-columns: .9fr 1.1fr; gap: 18px; margin-top: 18px; }
        .panel {
          border-radius: 34px; padding: 26px; background: rgba(36,24,17,.94);
          color: #fff6e8; box-shadow: 0 24px 70px rgba(36,24,17,.18);
        }
        .panel.light { background: rgba(255,255,255,.74); color: #241811; border: 1px solid rgba(61,44,28,.10); }
        .panel h2 { margin: 0; font-size: clamp(28px, 4vw, 44px); line-height: .95; letter-spacing: -.06em; font-weight: 950; }
        .panel p { color: inherit; opacity: .75; margin: 18px 0 0; font-size: 15px; line-height: 1.65; font-weight: 560; }
        .mini-list { display: grid; gap: 10px; margin-top: 22px; }
        .mini { padding: 14px 16px; border-radius: 20px; background: rgba(255,255,255,.10); font-size: 14px; font-weight: 800; }
        .panel.light .mini { background: #f1e8dc; color: #5d5045; }
        footer {
          margin-top: 20px; padding: 22px; text-align: center; color: #887869;
          font-size: 11px; font-weight: 850; letter-spacing: .18em; text-transform: uppercase;
        }
        @media (max-width: 900px) {
          .project-grid, .match-grid, .feature { grid-template-columns: 1fr; }
          .section-head { display: block; }
          .section-head p { margin-top: 10px; }
          .top { align-items: flex-start; }
          .nav-pill { display: none; }
          .hero { padding-top: 18px; }
        }
      `}</style>

      <div className="wrap">
        <header className="top">
          <div className="brand">
            <div className="logo">MP</div>
            <div>
              <p className="tiny">IRCODE candidate packet</p>
              <p className="name">Mason Perry · UX/UI Designer</p>
            </div>
          </div>
          <a className="nav-pill" href="https://www.linkedin.com/in/mason-perry-dev" target="_blank">
            LinkedIn
          </a>
        </header>

        <section className="hero">
          <div className="hero-badge">Built specifically for IRCODE</div>
          <h1>Scan. Recover. Structure. Act.</h1>
          <p className="lead">
            IRCODE turns visual media into interactive gateways. My strongest fit is designing the human side of that loop:
            scan-to-action workflows, AI/OCR correction, mobile interfaces, field-tested prototypes, and clear product systems
            that turn messy visual input into usable decisions.
          </p>
          <div className="actions">
            <a className="button primary" href="https://ori-intake-papergoblin.vercel.app" target="_blank">
              View PAPERGOBLIN
            </a>
            <a className="button secondary" href="https://checkmate-v3.vercel.app" target="_blank">
              View CHECKMATE
            </a>
          </div>
        </section>

        <div className="section-head">
          <div>
            <p className="tiny">Relevant product proof</p>
            <h2>Most relevant work first.</h2>
          </div>
          <p>
            The strongest IRCODE overlap is scan-based interaction, computer-vision-adjacent UX, human review,
            correction workflows, and product systems that make visual recognition useful.
          </p>
        </div>

        <section className="project-grid">
          {projects.map((project) => (
            <article className="project" data-tone={project.tone} key={project.title}>
              <div className="image">
                <div className="mark">{project.mark}</div>
                <div className="project-label">Product case</div>
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p className="kicker">{project.kicker}</p>
                <p className="desc">{project.desc}</p>
                <div className="chips">
                  {project.chips.map((chip) => (
                    <span className="chip" key={chip}>{chip}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="section-head">
          <div>
            <p className="tiny">IRCODE asked for</p>
            <h2>Direct resume match.</h2>
          </div>
          <p>
            These are the exact final-stage areas IRCODE requested, mapped to the updated resume, addendum, and portfolio examples.
          </p>
        </div>

        <section className="match-grid">
          {matches.map((item, index) => (
            <article className="match" key={item.title}>
              <div className="match-num">{String(index + 1).padStart(2, "0")}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="feature">
          <div className="panel">
            <p className="tiny" style={{ color: "#d8c7ae" }}>Design doctrine</p>
            <h2>Calm UI for imperfect input.</h2>
            <p>
              My product design pattern is simple: capture first, structure progressively, expose uncertainty,
              and make correction feel obvious instead of punishing.
            </p>
            <div className="mini-list">
              <div className="mini">Never hide bad OCR — make it editable.</div>
              <div className="mini">The correction workflow is the product.</div>
              <div className="mini">AI should accelerate judgment, not replace it.</div>
            </div>
          </div>

          <div className="panel light">
            <p className="tiny">What IRCODE gets</p>
            <h2>A designer who can sit between product, engineering, AI, and users.</h2>
            <p>
              My background is not just making attractive screens. It is building interfaces for stressed users,
              degraded scans, operational constraints, unclear inputs, and systems where the user must understand
              why the software made a suggestion.
            </p>
            <div className="mini-list">
              <div className="mini">AI-assisted product iteration</div>
              <div className="mini">Mobile and web UX implementation fluency</div>
              <div className="mini">Operational empathy from real field systems</div>
            </div>
          </div>
        </section>

        <footer>
          Mason Perry · Operational Systems Builder · UX/UI Designer · AI-assisted product workflows
        </footer>
      </div>
    </main>
  );
}
