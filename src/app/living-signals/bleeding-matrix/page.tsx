import type { Metadata } from "next";
import BleedingMatrix from "../BleedingMatrix";
import { bleedingSignal as signal } from "../bleedingSignal";

export const metadata: Metadata = {
  title: `${signal.name} Android Test V4 | NULLWORKS Living Signals`,
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
          background: linear-gradient(rgba(5,2,4,.48), rgba(5,2,4,.68));
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .shell { width: min(1120px, calc(100% - 34px)); margin: 0 auto; }
        .nav, .hero, .section, .closing, footer { position: relative; z-index: 2; }
        .nav {
          position: sticky;
          top: 0;
          z-index: 80;
          border-bottom: 1px solid rgba(var(--accent-rgb), .2);
          background: rgba(5,2,4,.73);
          backdrop-filter: blur(18px);
        }
        .nav-inner { min-height: 62px; display: flex; align-items: center; justify-content: space-between; gap: 14px; }
        .brand { color: #fff; font-size: 12px; font-weight: 950; letter-spacing: .13em; text-decoration: none; }
        .brand span { color: var(--accent); }
        .nav-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 7px; }
        .nav-links a { color: #d1c3c6; text-decoration: none; border: 1px solid rgba(255,255,255,.13); border-radius: 999px; padding: 8px 10px; font-size: 11px; font-weight: 850; }
        .hero { min-height: calc(100svh - 62px); display: grid; align-items: center; border-bottom: 1px solid rgba(var(--accent-rgb), .17); }
        .hero-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 26px; align-items: end; padding: 76px 0 148px; }
        .eyebrow { color: var(--accent); font: 900 11px ui-monospace, monospace; letter-spacing: .16em; text-transform: uppercase; }
        h1 { max-width: 960px; margin: 17px 0 0; font-size: clamp(56px, 9.2vw, 122px); line-height: .82; letter-spacing: -.072em; }
        h1 span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(var(--accent-rgb), .75); }
        .lead { max-width: 810px; margin-top: 26px; color: #d2c4c7; font-size: clamp(18px, 2.1vw, 25px); line-height: 1.55; }
        .demo-note { margin-top: 22px; display: inline-flex; border: 1px solid rgba(var(--accent-rgb), .36); border-radius: 999px; padding: 10px 13px; color: #f0dfe2; background: rgba(5,2,4,.7); font-size: 12px; font-weight: 850; }
        .hero-card { border: 1px solid rgba(var(--accent-rgb), .38); border-radius: 28px; padding: 25px; background: linear-gradient(145deg, rgba(var(--accent-rgb), .11), rgba(10,3,5,.82)); box-shadow: 0 32px 100px rgba(0,0,0,.5); backdrop-filter: blur(9px); }
        .hero-card b { display: block; color: var(--accent); font: 900 10px ui-monospace, monospace; letter-spacing: .14em; }
        .hero-card strong { display: block; margin-top: 16px; font-size: clamp(31px, 4.4vw, 54px); line-height: .94; letter-spacing: -.052em; }
        .hero-card p { color: #c5b6ba; line-height: 1.67; }
        .hero-card small { display: block; color: #927f84; line-height: 1.5; }
        .section { padding: 80px 0; border-bottom: 1px solid rgba(var(--accent-rgb), .15); background: rgba(5,2,4,.46); }
        .section-head { display: grid; grid-template-columns: 1.06fr .94fr; gap: 26px; align-items: end; margin-bottom: 27px; }
        .section-label { color: var(--accent); font: 900 10px ui-monospace, monospace; letter-spacing: .16em; text-transform: uppercase; }
        h2 { max-width: 900px; margin: 11px 0 0; font-size: clamp(40px, 6.2vw, 78px); line-height: .94; letter-spacing: -.057em; }
        .section-head p { color: #c2b3b7; font-size: 17px; line-height: 1.65; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 11px; }
        .card { min-height: 205px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(var(--accent-rgb), .22); border-radius: 22px; padding: 19px; background: rgba(10,3,5,.74); backdrop-filter: blur(8px); }
        .card b { color: var(--accent); font: 900 10px ui-monospace, monospace; letter-spacing: .13em; }
        .card p { margin: 32px 0 0; color: #d0c2c5; font-size: 15px; line-height: 1.55; }
        .rule-list { display: grid; gap: 9px; }
        .rule { display: grid; grid-template-columns: 44px 1fr; gap: 14px; align-items: center; border: 1px solid rgba(var(--accent-rgb), .19); border-radius: 20px; padding: 14px; background: rgba(10,3,5,.74); }
        .rule b { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; color: #160106; background: var(--accent); font: 950 11px ui-monospace, monospace; }
        .rule span { color: #cabcc0; line-height: 1.52; }
        .closing { padding: 82px 0 160px; }
        .closing-card { border: 1px solid rgba(var(--accent-rgb), .4); border-radius: 29px; padding: clamp(24px, 5vw, 44px); background: linear-gradient(145deg, rgba(var(--accent-rgb), .11), rgba(10,3,5,.83)); backdrop-filter: blur(9px); }
        .closing-card strong { display: block; max-width: 900px; font-size: clamp(36px, 5.7vw, 70px); line-height: .95; letter-spacing: -.056em; }
        .closing-card p { max-width: 820px; color: #c9babe; font-size: 17px; line-height: 1.65; }
        .cta-row { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 23px; }
        .cta { display: inline-flex; padding: 12px 15px; border-radius: 999px; background: var(--accent); color: #160106; text-decoration: none; font-weight: 950; }
        .cta.secondary { color: var(--accent); background: rgba(5,2,4,.62); border: 1px solid rgba(var(--accent-rgb), .46); }
        footer { padding: 36px 0 150px; color: #8f7d82; }
        footer a { color: var(--accent); }
        @media (max-width: 900px) {
          .hero-grid, .section-head { grid-template-columns: 1fr; }
          .grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 680px) {
          .shell { width: min(100% - 24px, 1120px); }
          .nav-inner { align-items: flex-start; padding: 11px 0; }
          .nav-links a { padding: 7px 8px; font-size: 9px; }
          .hero-grid { padding: 54px 0 164px; }
          h1 { font-size: clamp(52px, 16.5vw, 80px); }
          .section { padding: 58px 0; }
          .grid { grid-template-columns: 1fr; }
          .closing { padding: 60px 0 170px; }
        }
      `}</style>

      <nav className="nav">
        <div className="shell nav-inner">
          <a className="brand" href="/">NULLWORKS <span>LIVING SIGNALS</span></a>
          <div className="nav-links">
            <a href="/living-signals">All samples</a>
            <a href="#test">Test notes</a>
            <a href="#rules">Controls</a>
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
            <b>ANDROID TEST BUILD V4</b>
            <strong>The glass rotates. The liquid stays level.</strong>
            <p>Tap Enable Tilt + Lock while the phone is upright. V4 reads the gravity vector, keeps the free surface level in the room, and treats the complete top edge as the only opening.</p>
            <small>Simulated visual atmosphere only. No real blood, injury, telemetry, or live event is represented.</small>
          </aside>
        </div>
      </header>

      <section className="section" id="test">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-label">What changed</div><h2>No more over-rotating line or trapped triangle.</h2></div>
            <p>The slope approximation is gone. The liquid is now a gravity-clipped polygon with a physically level free surface. When the downhill point of the open top edge falls below the remaining liquid, the vessel continues draining toward zero.</p>
          </div>
          <div className="grid">
            {signal.communicates.map((item, index) => <article className="card" key={item}><b>{String(index + 1).padStart(2, "0")}</b><p>{item}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section" id="rules">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-label">Mobile test controls</div><h2>Calibrate upright, then pour like a real glass.</h2></div>
            <p>A partial tilt should retain the stable volume. Continue rotating toward a side pour and the open edge moves downhill until no stable liquid pocket remains, allowing the vessel to empty completely.</p>
          </div>
          <div className="rule-list">{signal.rules.map((item, index) => <div className="rule" key={item}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span></div>)}</div>
        </div>
      </section>

      <section className="closing">
        <div className="shell">
          <article className="closing-card">
            <div className="section-label">NULLWORKS Living Signal Framework</div>
            <strong>The container moves around gravity now.</strong>
            <p>V4 is built from the third Android screen-recording receipt: device-motion gravity, a true level surface, an open top edge, stable partial retention, and complete drainage at a full side pour. The next truth gate is Mason&apos;s phone.</p>
            <div className="cta-row">
              <a className="cta" href="#">Restart at the top</a>
              <a className="cta secondary" href="/living-signals">Open the sample library</a>
            </div>
          </article>
        </div>
      </section>

      <footer><div className="shell">NULLWORKS Living Signals // Bleeding Matrix Android liquid test V4. <a href="/living-signals">Browse all samples →</a></div></footer>
    </main>
  );
}
