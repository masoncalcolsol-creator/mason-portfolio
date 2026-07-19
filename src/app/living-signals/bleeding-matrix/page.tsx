import type { Metadata } from "next";
import BleedingMatrix from "../BleedingMatrix";
import { bleedingSignal as signal } from "../bleedingSignal";

export const metadata: Metadata = {
  title: `${signal.name} | NULLWORKS Living Signal Framework`,
  description: signal.summary,
};

export default function BleedingMatrixPage() {
  return (
    <main className="bleeding-page">
      <BleedingMatrix accentRgb={signal.accentRgb} />
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #050204; }
        .bleeding-page {
          --accent: ${signal.accent};
          --accent-rgb: ${signal.accentRgb};
          min-height: 100vh;
          position: relative;
          isolation: isolate;
          overflow-x: hidden;
          color: #fff4f5;
          background:
            radial-gradient(circle at 84% 4%, rgba(var(--accent-rgb), .11), transparent 29rem),
            radial-gradient(circle at 5% 44%, rgba(var(--accent-rgb), .055), transparent 31rem),
            linear-gradient(rgba(5,2,4,.72), rgba(5,2,4,.86));
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .shell { width: min(1180px, calc(100% - 38px)); margin: 0 auto; }
        .nav, .hero, .section, .closing, footer { position: relative; z-index: 2; }
        .nav {
          position: sticky;
          top: 0;
          z-index: 80;
          border-bottom: 1px solid rgba(var(--accent-rgb), .2);
          background: rgba(5,2,4,.78);
          backdrop-filter: blur(18px);
        }
        .nav-inner { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
        .brand { color: #fff; font-size: 13px; font-weight: 950; letter-spacing: .13em; text-decoration: none; }
        .brand span { color: var(--accent); text-shadow: 0 0 20px rgba(var(--accent-rgb), .35); }
        .nav-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
        .nav-links a { color: #d1c3c6; text-decoration: none; border: 1px solid rgba(255,255,255,.13); border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 850; }
        .nav-links a:hover { color: #050204; background: var(--accent); border-color: var(--accent); }
        .hero { min-height: calc(100svh - 64px); display: grid; align-items: center; border-bottom: 1px solid rgba(var(--accent-rgb), .17); }
        .hero-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 30px; align-items: end; padding: 82px 0 72px; }
        .eyebrow { color: var(--accent); font: 900 12px ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .17em; text-transform: uppercase; }
        h1 { max-width: 1020px; margin: 18px 0 0; font-size: clamp(58px, 9.7vw, 128px); line-height: .82; letter-spacing: -.072em; }
        h1 span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(var(--accent-rgb), .72); }
        .lead { max-width: 860px; margin-top: 28px; color: #d2c4c7; font-size: clamp(19px, 2.25vw, 26px); line-height: 1.55; }
        .demo-note { margin-top: 24px; display: inline-flex; align-items: center; gap: 10px; border: 1px solid rgba(var(--accent-rgb), .34); border-radius: 999px; padding: 10px 13px; color: #eadcdf; background: rgba(5,2,4,.68); font-size: 12px; font-weight: 800; }
        .demo-note::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 18px rgba(var(--accent-rgb), .82); animation: bleedPulse 1.55s ease-in-out infinite; }
        @keyframes bleedPulse { 0%, 100% { opacity: .45; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.4); } }
        .hero-card { border: 1px solid rgba(var(--accent-rgb), .38); border-radius: 30px; padding: 27px; background: linear-gradient(145deg, rgba(var(--accent-rgb), .1), rgba(10,3,5,.82)); box-shadow: 0 32px 100px rgba(0,0,0,.5); backdrop-filter: blur(9px); }
        .hero-card b { display: block; color: var(--accent); font: 900 11px ui-monospace, monospace; letter-spacing: .14em; }
        .hero-card strong { display: block; margin-top: 18px; font-size: clamp(34px, 4.8vw, 58px); line-height: .94; letter-spacing: -.052em; }
        .hero-card p { color: #c5b6ba; line-height: 1.67; }
        .hero-card small { display: block; margin-top: 18px; color: #917d82; line-height: 1.55; }
        .section { padding: 86px 0; border-bottom: 1px solid rgba(var(--accent-rgb), .15); background: rgba(5,2,4,.45); }
        .section-head { display: grid; grid-template-columns: 1.08fr .92fr; gap: 28px; align-items: end; margin-bottom: 30px; }
        .section-label { color: var(--accent); font: 900 11px ui-monospace, monospace; letter-spacing: .16em; text-transform: uppercase; }
        h2 { max-width: 970px; margin: 12px 0 0; font-size: clamp(42px, 6.5vw, 82px); line-height: .93; letter-spacing: -.057em; }
        .section-head p { color: #c2b3b7; font-size: 18px; line-height: 1.68; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .card { min-height: 224px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(var(--accent-rgb), .2); border-radius: 24px; padding: 21px; background: linear-gradient(145deg, rgba(var(--accent-rgb), .045), rgba(10,3,5,.78)); backdrop-filter: blur(7px); }
        .card b { color: var(--accent); font: 900 11px ui-monospace, monospace; letter-spacing: .13em; }
        .card p { margin: 36px 0 0; color: #d0c2c5; font-size: 16px; line-height: 1.55; }
        .use-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
        .use { min-height: 150px; display: flex; align-items: flex-end; border-left: 3px solid var(--accent); border-radius: 0 20px 20px 0; padding: 20px; background: rgba(10,3,5,.74); color: #d1c4c7; font-size: 18px; font-weight: 800; line-height: 1.45; backdrop-filter: blur(7px); }
        .rule-list { display: grid; gap: 10px; }
        .rule { display: grid; grid-template-columns: 46px 1fr; gap: 15px; align-items: center; border: 1px solid rgba(var(--accent-rgb), .18); border-radius: 21px; padding: 16px; background: rgba(10,3,5,.74); }
        .rule b { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; color: #050204; background: var(--accent); font: 950 12px ui-monospace, monospace; }
        .rule span { color: #cabcc0; line-height: 1.55; }
        .closing { padding: 88px 0; border-bottom: 1px solid rgba(var(--accent-rgb), .15); }
        .closing-card { border: 1px solid rgba(var(--accent-rgb), .38); border-radius: 31px; padding: clamp(26px, 5vw, 48px); background: linear-gradient(145deg, rgba(var(--accent-rgb), .1), rgba(10,3,5,.82)); backdrop-filter: blur(9px); }
        .closing-card strong { display: block; max-width: 960px; font-size: clamp(38px, 6vw, 76px); line-height: .94; letter-spacing: -.056em; }
        .closing-card p { max-width: 890px; color: #c9babe; font-size: 18px; line-height: 1.68; }
        .cta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 25px; }
        .cta { display: inline-flex; align-items: center; justify-content: center; padding: 13px 17px; border-radius: 999px; background: var(--accent); color: #050204; text-decoration: none; font-weight: 950; box-shadow: 0 0 28px rgba(var(--accent-rgb), .18); }
        .cta.secondary { color: var(--accent); background: rgba(5,2,4,.6); border: 1px solid rgba(var(--accent-rgb), .46); box-shadow: none; }
        footer { padding: 44px 0 75px; color: #8f7d82; }
        footer a { color: var(--accent); }
        @media (max-width: 940px) {
          .hero-grid, .section-head { grid-template-columns: 1fr; }
          .grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 680px) {
          .shell { width: min(100% - 26px, 1180px); }
          .nav-inner { align-items: flex-start; padding: 12px 0; }
          .nav-links { gap: 5px; }
          .nav-links a { padding: 7px 9px; font-size: 10px; }
          .hero-grid { padding: 58px 0 56px; }
          h1 { font-size: clamp(54px, 17vw, 82px); }
          .section, .closing { padding: 62px 0; }
          .grid, .use-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .demo-note::before { animation: none; }
        }
      `}</style>

      <nav className="nav">
        <div className="shell nav-inner">
          <a className="brand" href="/">NULLWORKS <span>LIVING SIGNALS</span></a>
          <div className="nav-links">
            <a href="/living-signals">All samples</a>
            <a href="#meaning">Meaning</a>
            <a href="#rules">Rules</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="shell hero-grid">
          <div>
            <div className="eyebrow">{signal.eyebrow}</div>
            <h1>{signal.headline}<span>{signal.outlinedHeadline}</span></h1>
            <p className="lead">{signal.summary}</p>
            <div className="demo-note">{signal.demoNote}</div>
          </div>
          <aside className="hero-card">
            <b>SIGNAL LANGUAGE</b>
            <strong>{signal.name}</strong>
            <p>{signal.signalLanguage}</p>
            <small>This is simulated visual atmosphere. It does not represent real blood, injury, telemetry, or a live event.</small>
          </aside>
        </div>
      </header>

      <section className="section" id="meaning">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-label">What the motion communicates</div><h2>The page has two visual planes—and one of them breaks the boundary.</h2></div>
            <p>Code rain and liquid trails remain behind the interface. The rare featured drop crosses above the page, creating a controlled foreground interruption without blocking interaction.</p>
          </div>
          <div className="grid">
            {signal.communicates.map((item, index) => <article className="card" key={item}><b>{String(index + 1).padStart(2, "0")}</b><p>{item}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-label">Best-fit deployments</div><h2>Use it where a polished interface needs one unsettling event.</h2></div>
            <p>The visual is dramatic, but the architecture remains disciplined: fixed canvas, mobile frame cap, rare event timing, pointer transparency, and readable content.</p>
          </div>
          <div className="use-grid">{signal.bestFor.map((item) => <div className="use" key={item}>{item}</div>)}</div>
        </div>
      </section>

      <section className="section" id="rules">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-label">Production boundaries</div><h2>The foreground drop stays rare enough to remain a discovery.</h2></div>
            <p>The effect never blocks controls, never implies a physical event, and never becomes a constant curtain over the copy.</p>
          </div>
          <div className="rule-list">{signal.rules.map((item, index) => <div className="rule" key={item}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span></div>)}</div>
        </div>
      </section>

      <section className="closing">
        <div className="shell">
          <article className="closing-card">
            <div className="section-label">NULLWORKS Living Signal Framework</div>
            <strong>Background atmosphere. Foreground interruption. One page that appears to bleed.</strong>
            <p>The code, liquid trails, and top-edge drips create the environmental field. The featured drop is a separate pointer-transparent layer above the entire interface.</p>
            <div className="cta-row">
              <a className="cta" href="/living-signals">Open the sample library</a>
              <a className="cta secondary" href="/living-signals/matrix-waterfall">Compare Matrix Waterfall</a>
            </div>
          </article>
        </div>
      </section>

      <footer><div className="shell">NULLWORKS Living Signal Framework // Bleeding Matrix sample with explicit simulated-atmosphere boundary. <a href="/living-signals">Browse all samples →</a></div></footer>
    </main>
  );
}
