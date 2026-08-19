import type { Metadata } from "next";
import InfinitePinwheel from "../InfinitePinwheel";
import { infinitePinwheelSignal as signal } from "../infinitePinwheelSignal";

export const metadata: Metadata = {
  title: `${signal.name} | NULLWORKS Living Signal Framework`,
  description: signal.summary,
};

export default function InfinitePinwheelPage() {
  return (
    <main className="pinwheel-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        body { margin: 0; background: #030305; }
        .pinwheel-page { min-height: 100vh; color: #fff; background: #030305; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
        .stage { position: relative; min-height: 100svh; overflow: hidden; isolation: isolate; background: #030305; }
        .pinwheel-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; image-rendering: auto; }
        .stage::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at center, transparent 0 10%, rgba(0,0,0,.04) 35%, rgba(0,0,0,.42) 100%); }
        .nav { position: absolute; z-index: 4; top: 0; left: 0; right: 0; padding: 18px clamp(16px, 3vw, 34px); display: flex; justify-content: space-between; align-items: center; gap: 14px; }
        .brand, .back { color: rgba(255,255,255,.88); text-decoration: none; font: 900 11px ui-monospace, monospace; letter-spacing: .13em; text-transform: uppercase; text-shadow: 0 2px 16px #000; }
        .back { border: 1px solid rgba(255,255,255,.28); border-radius: 999px; padding: 9px 12px; background: rgba(0,0,0,.25); backdrop-filter: blur(12px); }
        .caption { position: absolute; z-index: 4; left: clamp(18px, 4vw, 52px); bottom: clamp(22px, 5vw, 56px); max-width: 620px; text-shadow: 0 3px 24px #000; }
        .eyebrow { font: 900 10px ui-monospace, monospace; letter-spacing: .16em; text-transform: uppercase; opacity: .76; }
        h1 { margin: 10px 0 0; font-size: clamp(44px, 8vw, 96px); line-height: .82; letter-spacing: -.065em; }
        h1 span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,.72); }
        .caption p { max-width: 540px; margin: 17px 0 0; font-size: clamp(14px, 1.7vw, 18px); line-height: 1.55; color: rgba(255,255,255,.78); }
        .truth { margin-top: 12px; font: 800 9px/1.5 ui-monospace, monospace; letter-spacing: .08em; color: rgba(255,255,255,.58); }
        .details { padding: 80px 0 90px; background: #060609; border-top: 1px solid rgba(255,255,255,.12); }
        .shell { width: min(1100px, calc(100% - 32px)); margin: 0 auto; }
        .details h2 { margin: 0; max-width: 850px; font-size: clamp(38px, 6vw, 72px); line-height: .94; letter-spacing: -.055em; }
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 34px; }
        .card { border: 1px solid rgba(255,255,255,.13); border-radius: 22px; padding: 20px; background: rgba(255,255,255,.025); }
        .card b { font: 900 10px ui-monospace, monospace; letter-spacing: .13em; opacity: .58; }
        .card p { margin: 28px 0 0; color: #c6c6cc; line-height: 1.6; }
        @media (max-width: 680px) { .caption { right: 18px; } .caption p { max-width: 430px; } .grid { grid-template-columns: 1fr; } .details { padding: 62px 0; } }
        @media (prefers-reduced-motion: reduce) { .truth::after { content: " // REDUCED MOTION: STATIC FRAME"; } }
      `}</style>

      <section className="stage">
        <InfinitePinwheel />
        <nav className="nav">
          <a className="brand" href="/">NULLWORKS // LIVING SIGNALS</a>
          <a className="back" href="/living-signals">All samples</a>
        </nav>
        <div className="caption">
          <div className="eyebrow">{signal.eyebrow}</div>
          <h1>{signal.headline}<span>{signal.outlinedHeadline}</span></h1>
          <p>{signal.summary}</p>
          <div className="truth">GENERATIVE CANVAS // NO VIDEO // NO SENSOR INPUT</div>
        </div>
      </section>

      <section className="details">
        <div className="shell">
          <h2>One giant gesture. Slow enough to stare at. Deep enough to lose the center.</h2>
          <div className="grid">
            {signal.communicates.map((item, index) => <article className="card" key={item}><b>{String(index + 1).padStart(2, "0")}</b><p>{item}</p></article>)}
          </div>
        </div>
      </section>
    </main>
  );
}
