import type { Metadata } from "next";
import LiveMicOscilloscope from "../LiveMicOscilloscope";
import { liveMicSignal as signal } from "../liveMicSignal";

export const metadata: Metadata = {
  title: `${signal.name} | NULLWORKS Living Signal Framework`,
  description: signal.summary,
};

export default function LiveMicOscilloscopePage() {
  return (
    <main className="mic-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #020708; }
        button, input { font: inherit; }
        .mic-page {
          --accent: ${signal.accent};
          --accent-rgb: ${signal.accentRgb};
          min-height: 100vh;
          position: relative;
          isolation: isolate;
          overflow-x: hidden;
          color: #effeff;
          background:
            radial-gradient(circle at 83% 5%, rgba(var(--accent-rgb), .1), transparent 30rem),
            radial-gradient(circle at 6% 48%, rgba(var(--accent-rgb), .045), transparent 34rem),
            linear-gradient(rgba(2,7,8,.7), rgba(2,7,8,.86));
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .shell { width: min(1180px, calc(100% - 38px)); margin: 0 auto; }
        .nav, .hero, .section, .closing, footer { position: relative; z-index: 2; }
        .nav {
          position: sticky;
          top: 0;
          z-index: 80;
          border-bottom: 1px solid rgba(var(--accent-rgb), .18);
          background: rgba(2,7,8,.79);
          backdrop-filter: blur(18px);
        }
        .nav-inner { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
        .brand { color: #fff; font-size: 13px; font-weight: 950; letter-spacing: .13em; text-decoration: none; }
        .brand span { color: var(--accent); text-shadow: 0 0 22px rgba(var(--accent-rgb), .34); }
        .nav-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
        .nav-links a { color: #c5d3d5; text-decoration: none; border: 1px solid rgba(255,255,255,.13); border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 850; }
        .nav-links a:hover { color: #020708; background: var(--accent); border-color: var(--accent); }
        .hero { min-height: calc(100svh - 64px); display: grid; align-items: center; border-bottom: 1px solid rgba(var(--accent-rgb), .15); }
        .hero-grid { display: grid; grid-template-columns: 1.12fr .88fr; gap: 30px; align-items: end; padding: 82px 0 72px; }
        .eyebrow { color: var(--accent); font: 900 12px ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .17em; text-transform: uppercase; }
        h1 { max-width: 1030px; margin: 18px 0 0; font-size: clamp(58px, 9.7vw, 128px); line-height: .82; letter-spacing: -.072em; }
        h1 span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(var(--accent-rgb), .72); }
        .lead { max-width: 860px; margin-top: 28px; color: #c5d5d7; font-size: clamp(19px, 2.25vw, 26px); line-height: 1.55; }
        .demo-note { margin-top: 24px; display: inline-flex; align-items: center; gap: 10px; border: 1px solid rgba(var(--accent-rgb), .31); border-radius: 999px; padding: 10px 13px; color: #dbe9eb; background: rgba(2,7,8,.68); font-size: 12px; font-weight: 800; }
        .demo-note::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 18px rgba(var(--accent-rgb), .82); animation: micPulse 1.5s ease-in-out infinite; }
        @keyframes micPulse { 0%, 100% { opacity: .45; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.4); } }
        .mic-panel {
          position: relative;
          z-index: 2;
          border: 1px solid rgba(var(--accent-rgb), .38);
          border-radius: 30px;
          padding: 27px;
          background: linear-gradient(145deg, rgba(var(--accent-rgb), .09), rgba(3,10,11,.84));
          box-shadow: 0 32px 100px rgba(0,0,0,.5);
          backdrop-filter: blur(10px);
          transition: border-color .25s ease, box-shadow .25s ease;
        }
        .mic-panel.is-live { border-color: rgba(var(--accent-rgb), .72); box-shadow: 0 32px 100px rgba(0,0,0,.5), 0 0 44px rgba(var(--accent-rgb), .12); }
        .mic-status-row { display: grid; grid-template-columns: auto 1fr auto; gap: 10px; align-items: center; }
        .mic-status-row b { color: var(--accent); font: 900 11px ui-monospace, monospace; letter-spacing: .14em; }
        .mic-level-number { color: #9eb1b4; font: 850 11px ui-monospace, monospace; }
        .mic-dot { width: 8px; height: 8px; border-radius: 50%; background: #607074; }
        .mic-dot.is-live { background: var(--accent); box-shadow: 0 0 18px rgba(var(--accent-rgb), .9); animation: micPulse 1.15s ease-in-out infinite; }
        .mic-meter { height: 8px; margin-top: 18px; overflow: hidden; border: 1px solid rgba(var(--accent-rgb), .22); border-radius: 999px; background: rgba(0,0,0,.38); }
        .mic-meter span { display: block; height: 100%; min-width: 2%; border-radius: inherit; background: linear-gradient(90deg, rgba(var(--accent-rgb), .42), var(--accent)); box-shadow: 0 0 15px rgba(var(--accent-rgb), .42); transition: width .12s linear; }
        .mic-panel p { color: #b8c9cb; line-height: 1.65; }
        .sensitivity-control { display: grid; grid-template-columns: 1fr auto; gap: 8px 12px; margin-top: 20px; }
        .sensitivity-control span { color: #8da1a4; font: 900 10px ui-monospace, monospace; letter-spacing: .13em; }
        .sensitivity-control strong { color: var(--accent); font: 900 12px ui-monospace, monospace; }
        .sensitivity-control input { grid-column: 1 / -1; width: 100%; accent-color: var(--accent); }
        .mic-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
        .mic-actions button { cursor: pointer; border: 0; border-radius: 999px; padding: 13px 16px; color: #020708; background: var(--accent); font-weight: 950; }
        .mic-actions button.secondary { color: var(--accent); background: rgba(2,7,8,.62); border: 1px solid rgba(var(--accent-rgb), .42); }
        .mic-actions button:disabled { cursor: default; opacity: .45; }
        .mic-panel small { display: block; margin-top: 20px; color: #718487; font: 800 9px/1.55 ui-monospace, monospace; letter-spacing: .1em; }
        .section { padding: 86px 0; border-bottom: 1px solid rgba(var(--accent-rgb), .14); background: rgba(2,7,8,.45); }
        .section-head { display: grid; grid-template-columns: 1.08fr .92fr; gap: 28px; align-items: end; margin-bottom: 30px; }
        .section-label { color: var(--accent); font: 900 11px ui-monospace, monospace; letter-spacing: .16em; text-transform: uppercase; }
        h2 { max-width: 970px; margin: 12px 0 0; font-size: clamp(42px, 6.5vw, 82px); line-height: .93; letter-spacing: -.057em; }
        .section-head p { color: #afc0c2; font-size: 18px; line-height: 1.68; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .card { min-height: 224px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(var(--accent-rgb), .19); border-radius: 24px; padding: 21px; background: linear-gradient(145deg, rgba(var(--accent-rgb), .04), rgba(3,10,11,.78)); backdrop-filter: blur(7px); }
        .card b { color: var(--accent); font: 900 11px ui-monospace, monospace; letter-spacing: .13em; }
        .card p { margin: 36px 0 0; color: #c1d0d2; font-size: 16px; line-height: 1.55; }
        .use-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
        .use { min-height: 150px; display: flex; align-items: flex-end; border-left: 3px solid var(--accent); border-radius: 0 20px 20px 0; padding: 20px; background: rgba(3,10,11,.74); color: #c5d3d5; font-size: 18px; font-weight: 800; line-height: 1.45; backdrop-filter: blur(7px); }
        .rule-list { display: grid; gap: 10px; }
        .rule { display: grid; grid-template-columns: 46px 1fr; gap: 15px; align-items: center; border: 1px solid rgba(var(--accent-rgb), .17); border-radius: 21px; padding: 16px; background: rgba(3,10,11,.74); }
        .rule b { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; color: #020708; background: var(--accent); font: 950 12px ui-monospace, monospace; }
        .rule span { color: #bdccce; line-height: 1.55; }
        .closing { padding: 88px 0; border-bottom: 1px solid rgba(var(--accent-rgb), .14); }
        .closing-card { border: 1px solid rgba(var(--accent-rgb), .36); border-radius: 31px; padding: clamp(26px, 5vw, 48px); background: linear-gradient(145deg, rgba(var(--accent-rgb), .09), rgba(3,10,11,.82)); backdrop-filter: blur(9px); }
        .closing-card strong { display: block; max-width: 960px; font-size: clamp(38px, 6vw, 76px); line-height: .94; letter-spacing: -.056em; }
        .closing-card p { max-width: 890px; color: #bbcbcd; font-size: 18px; line-height: 1.68; }
        .cta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 25px; }
        .cta { display: inline-flex; align-items: center; justify-content: center; padding: 13px 17px; border-radius: 999px; background: var(--accent); color: #020708; text-decoration: none; font-weight: 950; box-shadow: 0 0 28px rgba(var(--accent-rgb), .16); }
        .cta.secondary { color: var(--accent); background: rgba(2,7,8,.62); border: 1px solid rgba(var(--accent-rgb), .43); box-shadow: none; }
        footer { padding: 44px 0 75px; color: #7d9093; }
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
          .mic-actions { display: grid; grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .demo-note::before, .mic-dot.is-live { animation: none; }
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
          <LiveMicOscilloscope />
        </div>
      </header>

      <section className="section" id="meaning">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-label">What the motion communicates</div><h2>The visitor does not watch the signal. The visitor becomes its source.</h2></div>
            <p>The page begins with a clear simulated fallback. After explicit permission, live microphone samples replace it and the interface responds immediately to nearby sound.</p>
          </div>
          <div className="grid">
            {signal.communicates.map((item, index) => <article className="card" key={item}><b>{String(index + 1).padStart(2, "0")}</b><p>{item}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-label">Best-fit deployments</div><h2>A reusable sensor layer for pages that should listen before they react.</h2></div>
            <p>The waveform engine can be transplanted behind music, voice, industrial, vehicle, marine, event, and experiential-brand interfaces without changing the consent and privacy controls.</p>
          </div>
          <div className="use-grid">{signal.bestFor.map((item) => <div className="use" key={item}>{item}</div>)}</div>
        </div>
      </section>

      <section className="section" id="rules">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-label">Production boundaries</div><h2>A live sensor is only impressive when its authority and privacy are obvious.</h2></div>
            <p>The browser owns permission. The visitor owns start and stop. The microphone track closes when stopped. No audio is routed to a server or speaker.</p>
          </div>
          <div className="rule-list">{signal.rules.map((item, index) => <div className="rule" key={item}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span></div>)}</div>
        </div>
      </section>

      <section className="closing">
        <div className="shell">
          <article className="closing-card">
            <div className="section-label">NULLWORKS Living Signal Framework</div>
            <strong>Simulated atmosphere becomes a real local instrument only after the human says yes.</strong>
            <p>The same oscilloscope framework can remain decorative, respond to an approved local sensor, or connect to governed telemetry. The visual layer should always reveal which state it is actually in.</p>
            <div className="cta-row">
              <a className="cta" href="/living-signals">Open the sample library</a>
              <a className="cta secondary" href="/monster-music">Compare the Monster oscilloscope</a>
            </div>
          </article>
        </div>
      </section>

      <footer><div className="shell">NULLWORKS Living Signal Framework // Live microphone oscilloscope with explicit permission and local-only analysis. <a href="/living-signals">Browse all samples →</a></div></footer>
    </main>
  );
}
