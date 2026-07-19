import type { Metadata } from "next";
import { bleedingSignal } from "./bleedingSignal";
import { livingSignals } from "./signals";

const allSignals = [...livingSignals, bleedingSignal];

export const metadata: Metadata = {
  title: "NULLWORKS Living Signal Framework | Visual Systems Library",
  description:
    "Nine shareable landing-page samples that reuse one atmospheric motion framework across sonar, industrial faults, evidence packets, conveyor recovery, memory continuity, operator orchestration, music systems, Matrix context, and a foreground bleeding interface.",
};

export default function LivingSignalsLibraryPage() {
  return (
    <main className="library-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #050607; }
        .library-page {
          min-height: 100vh;
          color: #f4f6f7;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 82% 4%, rgba(102,218,255,.1), transparent 28rem),
            radial-gradient(circle at 8% 42%, rgba(255,73,94,.07), transparent 31rem),
            #050607;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .shell { width: min(1210px, calc(100% - 38px)); margin: 0 auto; }
        .nav { position: sticky; top: 0; z-index: 80; border-bottom: 1px solid rgba(255,255,255,.11); background: rgba(5,6,7,.82); backdrop-filter: blur(18px); }
        .nav-inner { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
        .brand { color: #fff; font-size: 13px; font-weight: 950; letter-spacing: .13em; text-decoration: none; }
        .brand span { color: #bfc8ce; }
        .nav-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
        .nav-links a { color: #c4cbd0; text-decoration: none; border: 1px solid rgba(255,255,255,.13); border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 850; }
        .nav-links a:hover { color: #050607; background: #f1f4f6; border-color: #f1f4f6; }
        .hero { min-height: 86svh; display: grid; align-items: center; position: relative; overflow: hidden; border-bottom: 1px solid rgba(255,255,255,.11); }
        .hero::before { content: "SIGNAL"; position: absolute; left: -8vw; top: 5%; color: rgba(255,255,255,.025); font-size: clamp(150px, 34vw, 480px); font-weight: 950; line-height: .7; letter-spacing: -.11em; transform: rotate(-5deg); }
        .hero::after { content: "ALIVE"; position: absolute; right: -15vw; bottom: 3%; color: rgba(102,218,255,.032); font-size: clamp(130px, 29vw, 420px); font-weight: 950; line-height: .7; letter-spacing: -.1em; transform: rotate(6deg); }
        .hero-content { position: relative; z-index: 2; padding: 88px 0 76px; }
        .eyebrow { color: #d8dfe4; font: 900 12px ui-monospace, monospace; letter-spacing: .18em; text-transform: uppercase; }
        h1 { max-width: 1080px; margin: 18px 0 0; font-size: clamp(62px, 10.8vw, 142px); line-height: .8; letter-spacing: -.075em; }
        h1 span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(241,244,246,.54); }
        .lead { max-width: 920px; margin-top: 30px; color: #c0c7cc; font-size: clamp(20px, 2.3vw, 27px); line-height: 1.54; }
        .system-line { margin-top: 30px; max-width: 940px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .system-line span { border: 1px solid rgba(255,255,255,.12); border-radius: 17px; padding: 13px; color: #adb6bc; background: rgba(255,255,255,.022); font: 850 11px/1.45 ui-monospace, monospace; }
        .shelf { padding: 82px 0 94px; }
        .shelf-head { display: grid; grid-template-columns: 1.08fr .92fr; gap: 28px; align-items: end; margin-bottom: 30px; }
        .section-label { color: #d6dde2; font: 900 11px ui-monospace, monospace; letter-spacing: .16em; text-transform: uppercase; }
        h2 { margin: 12px 0 0; max-width: 940px; font-size: clamp(42px, 6.7vw, 86px); line-height: .93; letter-spacing: -.057em; }
        .shelf-head p { color: #aeb7bd; font-size: 18px; line-height: 1.68; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .signal-card { position: relative; min-height: 440px; display: flex; flex-direction: column; border: 1px solid rgba(var(--accent-rgb), .24); border-radius: 29px; padding: 25px; overflow: hidden; background: linear-gradient(145deg, rgba(var(--accent-rgb), .06), rgba(8,10,11,.88)); box-shadow: 0 28px 90px rgba(0,0,0,.28); }
        .signal-card::before { content: ""; position: absolute; inset: 0; opacity: .55; background-image: linear-gradient(rgba(var(--accent-rgb), .04) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--accent-rgb), .04) 1px, transparent 1px); background-size: 28px 28px; mask-image: linear-gradient(to bottom, #000, transparent 90%); }
        .signal-card::after { content: ""; position: absolute; top: 0; bottom: 0; width: 190px; left: -220px; background: linear-gradient(90deg, transparent, rgba(var(--accent-rgb), .09), rgba(var(--accent-rgb), .22)); border-right: 1px solid rgba(var(--accent-rgb), .28); animation: scanCard 6.8s linear infinite; }
        @keyframes scanCard { to { transform: translateX(calc(100vw + 520px)); } }
        .card-number { position: relative; z-index: 2; color: var(--accent); font: 950 54px/.8 ui-monospace, monospace; letter-spacing: -.08em; }
        .signal-card h3 { position: relative; z-index: 2; margin: 42px 0 8px; max-width: 540px; font-size: clamp(37px, 5vw, 61px); line-height: .92; letter-spacing: -.052em; }
        .language { position: relative; z-index: 2; color: var(--accent); font-size: 13px; font-weight: 900; line-height: 1.45; }
        .signal-card p { position: relative; z-index: 2; color: #b5bec4; font-size: 16px; line-height: 1.64; }
        .tags { position: relative; z-index: 2; display: flex; flex-wrap: wrap; gap: 7px; margin-top: auto; padding-top: 24px; }
        .tag { border: 1px solid rgba(var(--accent-rgb), .22); border-radius: 999px; padding: 7px 9px; color: #aeb7bd; font-size: 11px; background: rgba(5,6,7,.45); }
        .action { position: relative; z-index: 2; display: inline-flex; align-items: center; justify-content: center; align-self: flex-start; margin-top: 18px; border-radius: 999px; padding: 12px 15px; color: #050607; background: var(--accent); text-decoration: none; font-weight: 950; }
        .manifesto { padding: 88px 0; border-top: 1px solid rgba(255,255,255,.11); border-bottom: 1px solid rgba(255,255,255,.11); background: rgba(255,255,255,.018); }
        .manifesto-card { border: 1px solid rgba(255,255,255,.15); border-radius: 31px; padding: clamp(26px, 5vw, 48px); background: linear-gradient(145deg, rgba(255,255,255,.045), rgba(8,10,11,.84)); }
        .manifesto-card strong { display: block; max-width: 980px; font-size: clamp(39px, 6vw, 77px); line-height: .94; letter-spacing: -.057em; }
        .manifesto-card p { max-width: 900px; color: #b5bec4; font-size: 18px; line-height: 1.68; }
        .cta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 25px; }
        .cta { display: inline-flex; align-items: center; justify-content: center; padding: 13px 17px; border-radius: 999px; color: #050607; background: #f1f4f6; text-decoration: none; font-weight: 950; }
        .cta.secondary { color: #d7dee3; background: transparent; border: 1px solid rgba(255,255,255,.18); }
        footer { padding: 44px 0 75px; color: #7d878d; }
        footer a { color: #d8dfe4; }
        @media (max-width: 940px) {
          .shelf-head { grid-template-columns: 1fr; }
          .system-line { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 720px) {
          .shell { width: min(100% - 26px, 1210px); }
          .nav-inner { align-items: flex-start; padding: 12px 0; }
          .nav-links { gap: 5px; }
          .nav-links a { padding: 7px 9px; font-size: 10px; }
          .hero-content { padding: 60px 0; }
          h1 { font-size: clamp(58px, 18vw, 88px); }
          .system-line, .grid { grid-template-columns: 1fr; }
          .shelf, .manifesto { padding: 62px 0; }
          .signal-card { min-height: 430px; }
          .signal-card::after { animation-duration: 8.4s; }
        }
        @media (prefers-reduced-motion: reduce) {
          .signal-card::after { animation: none; left: 62%; }
        }
      `}</style>

      <nav className="nav">
        <div className="shell nav-inner">
          <a className="brand" href="/">NULLWORKS <span>LIVING SIGNALS</span></a>
          <div className="nav-links">
            <a href="#samples">Samples</a>
            <a href="/monster-music">Monster</a>
            <a href="/anvil-records">ANVIL</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="shell hero-content">
          <div className="eyebrow">REUSABLE MOTION ARCHITECTURE // SHAREABLE SAMPLE LIBRARY</div>
          <h1>
            Make the page feel alive.
            <span>Make the motion mean something.</span>
          </h1>
          <p className="lead">
            Nine live landing-page samples built from one NULLWORKS framework: fixed atmospheric canvas, theme-specific scanner, rare meaningful events, translucent structured content, mobile performance boundaries, and an explicit line between simulated atmosphere and real telemetry.
          </p>
          <div className="system-line">
            <span>01 // FIXED ATMOSPHERIC CANVAS</span>
            <span>02 // SIGNAL-SPECIFIC SCANNER</span>
            <span>03 // RARE MEANINGFUL EVENTS</span>
            <span>04 // CONTENT REMAINS PRIMARY</span>
          </div>
        </div>
      </header>

      <section className="shelf" id="samples">
        <div className="shell">
          <div className="shelf-head">
            <div>
              <div className="section-label">Current framework variants</div>
              <h2>One engine. Nine different operational stories.</h2>
            </div>
            <p>
              Each card opens a complete mobile-ready sample page with its own animation, explanation, best-fit uses, production rules, and adjacent-sample navigation. Share the individual URL when pitching a visual direction.
            </p>
          </div>

          <div className="grid">
            {allSignals.map((signal, index) => (
              <article
                className="signal-card"
                key={signal.slug}
                style={{
                  "--accent": signal.accent,
                  "--accent-rgb": signal.accentRgb,
                  animationDelay: `${index * -0.62}s`,
                } as React.CSSProperties}
              >
                <div className="card-number">{String(index + 1).padStart(2, "0")}</div>
                <h3>{signal.name}</h3>
                <div className="language">{signal.signalLanguage}</div>
                <p>{signal.summary}</p>
                <div className="tags">
                  {signal.bestFor.slice(0, 3).map((item) => <span className="tag" key={item}>{item}</span>)}
                </div>
                <a className="action" href={`/living-signals/${signal.slug}`}>Open live sample →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="shell">
          <article className="manifesto-card">
            <div className="section-label">Locked visual doctrine</div>
            <strong>The “whoa” comes from discovery, restraint, and system meaning—not constant spectacle.</strong>
            <p>
              Every sample uses one primary motion language. Rare events remain rare. Foreground content never drifts with the canvas. Reduced-motion users do not lose the page. Simulated backgrounds are labeled honestly. And the reusable framework is preserved separately from any one client, brand, project, or color system.
            </p>
            <div className="cta-row">
              <a className="cta" href="/living-signals/bleeding-matrix">Open Bleeding Matrix</a>
              <a className="cta secondary" href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20Living%20Signal%20Framework">Use this framework</a>
            </div>
          </article>
        </div>
      </section>

      <footer>
        <div className="shell">
          NULLWORKS Living Signal Framework // Reusable visual systems with restrained motion and explicit truth boundaries. <a href="/living-signals/sonar-fish">Start with Sonar Fish →</a>
        </div>
      </footer>
    </main>
  );
}
