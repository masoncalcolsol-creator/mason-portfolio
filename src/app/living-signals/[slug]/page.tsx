import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LivingSignalCanvas from "../LivingSignalCanvas";
import MatrixWaterfall from "../MatrixWaterfall";
import { livingSignalBySlug, livingSignals } from "../signals";

export function generateStaticParams() {
  return livingSignals.map((signal) => ({ slug: signal.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const signal = livingSignalBySlug[slug];
  if (!signal) return {};
  return {
    title: `${signal.name} | NULLWORKS Living Signal Framework`,
    description: signal.summary,
  };
}

export default async function LivingSignalSamplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const signal = livingSignalBySlug[slug];
  if (!signal) notFound();

  const currentIndex = livingSignals.findIndex((item) => item.slug === slug);
  const previous = livingSignals[(currentIndex - 1 + livingSignals.length) % livingSignals.length];
  const next = livingSignals[(currentIndex + 1) % livingSignals.length];

  return (
    <main
      className="signal-page"
      style={{
        "--accent": signal.accent,
        "--accent-rgb": signal.accentRgb,
        "--secondary": signal.secondary,
      } as React.CSSProperties}
    >
      {signal.mode === "matrix" ? (
        <MatrixWaterfall accentRgb={signal.accentRgb} />
      ) : (
        <LivingSignalCanvas mode={signal.mode} accentRgb={signal.accentRgb} />
      )}
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #050607; }
        .signal-page {
          min-height: 100vh;
          position: relative;
          isolation: isolate;
          overflow-x: hidden;
          color: #f4f6f7;
          background:
            radial-gradient(circle at 82% 5%, rgba(var(--accent-rgb), .09), transparent 30rem),
            radial-gradient(circle at 7% 48%, rgba(var(--accent-rgb), .045), transparent 33rem),
            linear-gradient(rgba(5,6,7,.67), rgba(5,6,7,.83));
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .shell { width: min(1180px, calc(100% - 38px)); margin: 0 auto; }
        .nav, .hero, .section, .closing, footer { position: relative; z-index: 2; }
        .nav {
          position: sticky;
          top: 0;
          z-index: 80;
          border-bottom: 1px solid rgba(var(--accent-rgb), .16);
          background: rgba(5,6,7,.78);
          backdrop-filter: blur(18px);
        }
        .nav-inner { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
        .brand { color: #fff; font-size: 13px; font-weight: 950; letter-spacing: .13em; text-decoration: none; }
        .brand span { color: var(--accent); text-shadow: 0 0 20px rgba(var(--accent-rgb), .25); }
        .nav-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
        .nav-links a { color: #c4cbd0; text-decoration: none; border: 1px solid rgba(255,255,255,.13); border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 850; }
        .nav-links a:hover { color: #050607; background: var(--accent); border-color: var(--accent); }
        .hero { min-height: calc(100svh - 64px); display: grid; align-items: center; border-bottom: 1px solid rgba(var(--accent-rgb), .14); }
        .hero-grid { display: grid; grid-template-columns: 1.16fr .84fr; gap: 30px; align-items: end; padding: 82px 0 72px; }
        .eyebrow { color: var(--accent); font: 900 12px ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .17em; text-transform: uppercase; }
        h1 { max-width: 1020px; margin: 18px 0 0; font-size: clamp(58px, 9.7vw, 128px); line-height: .82; letter-spacing: -.072em; }
        h1 span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(var(--accent-rgb), .59); }
        .lead { max-width: 860px; margin-top: 28px; color: #c0c7cb; font-size: clamp(19px, 2.25vw, 26px); line-height: 1.55; }
        .demo-note { margin-top: 24px; display: inline-flex; align-items: center; gap: 10px; border: 1px solid rgba(var(--accent-rgb), .3); border-radius: 999px; padding: 10px 13px; color: #d2d8dc; background: rgba(5,6,7,.62); font-size: 12px; font-weight: 800; }
        .demo-note::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 16px rgba(var(--accent-rgb), .75); animation: signalPulse 1.8s ease-in-out infinite; }
        @keyframes signalPulse { 0%, 100% { opacity: .45; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.35); } }
        .hero-card { border: 1px solid rgba(var(--accent-rgb), .34); border-radius: 30px; padding: 27px; background: linear-gradient(145deg, rgba(var(--accent-rgb), .085), rgba(7,9,10,.82)); box-shadow: 0 32px 100px rgba(0,0,0,.43); backdrop-filter: blur(9px); }
        .hero-card b { display: block; color: var(--accent); font: 900 11px ui-monospace, monospace; letter-spacing: .14em; }
        .hero-card strong { display: block; margin-top: 18px; font-size: clamp(34px, 4.8vw, 58px); line-height: .94; letter-spacing: -.052em; }
        .hero-card p { color: #afb7bc; line-height: 1.67; }
        .hero-card small { display: block; margin-top: 18px; color: #7f898f; line-height: 1.55; }
        .section { padding: 86px 0; border-bottom: 1px solid rgba(var(--accent-rgb), .13); background: rgba(5,6,7,.43); }
        .section-head { display: grid; grid-template-columns: 1.08fr .92fr; gap: 28px; align-items: end; margin-bottom: 30px; }
        .section-label { color: var(--accent); font: 900 11px ui-monospace, monospace; letter-spacing: .16em; text-transform: uppercase; }
        h2 { max-width: 970px; margin: 12px 0 0; font-size: clamp(42px, 6.5vw, 82px); line-height: .93; letter-spacing: -.057em; }
        .section-head p { color: #aeb7bc; font-size: 18px; line-height: 1.68; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .card { min-height: 224px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(var(--accent-rgb), .18); border-radius: 24px; padding: 21px; background: linear-gradient(145deg, rgba(var(--accent-rgb), .035), rgba(8,10,11,.76)); backdrop-filter: blur(7px); }
        .card b { color: var(--accent); font: 900 11px ui-monospace, monospace; letter-spacing: .13em; }
        .card p { margin: 36px 0 0; color: #c0c7cb; font-size: 16px; line-height: 1.55; }
        .use-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
        .use { min-height: 150px; display: flex; align-items: flex-end; border-left: 3px solid var(--accent); border-radius: 0 20px 20px 0; padding: 20px; background: rgba(8,10,11,.72); color: #c3cacf; font-size: 18px; font-weight: 800; line-height: 1.45; backdrop-filter: blur(7px); }
        .rule-list { display: grid; gap: 10px; }
        .rule { display: grid; grid-template-columns: 46px 1fr; gap: 15px; align-items: center; border: 1px solid rgba(var(--accent-rgb), .16); border-radius: 21px; padding: 16px; background: rgba(8,10,11,.72); }
        .rule b { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; color: #050607; background: var(--accent); font: 950 12px ui-monospace, monospace; }
        .rule span { color: #bac2c7; line-height: 1.55; }
        .closing { padding: 88px 0; border-bottom: 1px solid rgba(var(--accent-rgb), .13); }
        .closing-card { border: 1px solid rgba(var(--accent-rgb), .34); border-radius: 31px; padding: clamp(26px, 5vw, 48px); background: linear-gradient(145deg, rgba(var(--accent-rgb), .09), rgba(7,9,10,.81)); backdrop-filter: blur(9px); }
        .closing-card strong { display: block; max-width: 960px; font-size: clamp(38px, 6vw, 76px); line-height: .94; letter-spacing: -.056em; }
        .closing-card p { max-width: 890px; color: #b6bec3; font-size: 18px; line-height: 1.68; }
        .cta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 25px; }
        .cta { display: inline-flex; align-items: center; justify-content: center; padding: 13px 17px; border-radius: 999px; background: var(--accent); color: #050607; text-decoration: none; font-weight: 950; box-shadow: 0 0 28px rgba(var(--accent-rgb), .14); }
        .cta.secondary { color: var(--accent); background: rgba(5,6,7,.58); border: 1px solid rgba(var(--accent-rgb), .42); box-shadow: none; }
        .sample-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 30px; }
        .sample-nav a { border: 1px solid rgba(255,255,255,.12); border-radius: 22px; padding: 18px; color: #bec6cb; text-decoration: none; background: rgba(8,10,11,.72); }
        .sample-nav a:last-child { text-align: right; }
        .sample-nav small { display: block; color: #7d878d; font: 850 10px ui-monospace, monospace; letter-spacing: .13em; }
        .sample-nav strong { display: block; margin-top: 8px; font-size: 18px; }
        footer { padding: 44px 0 75px; color: #7d878d; }
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
          .sample-nav { grid-template-columns: 1fr; }
          .sample-nav a:last-child { text-align: left; }
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
            <h1>
              {signal.headline}
              <span>{signal.outlinedHeadline}</span>
            </h1>
            <p className="lead">{signal.summary}</p>
            <div className="demo-note">{signal.demoNote}</div>
          </div>
          <aside className="hero-card">
            <b>SIGNAL LANGUAGE</b>
            <strong>{signal.name}</strong>
            <p>{signal.signalLanguage}</p>
            <small>
              This is a visual systems sample. It is simulated atmosphere, not live operational telemetry unless a future deployment explicitly connects and labels a real data source.
            </small>
          </aside>
        </div>
      </header>

      <section className="section" id="meaning">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="section-label">What the motion communicates</div>
              <h2>Animation should carry system meaning, not merely prove the page can move.</h2>
            </div>
            <p>
              Each event, pause, reveal, or escalation is tied to a recognizable operating idea. The foreground explains the system while the background lets a visitor feel it before they finish reading.
            </p>
          </div>
          <div className="grid">
            {signal.communicates.map((item, index) => (
              <article className="card" key={item}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="section-label">Best-fit deployments</div>
              <h2>Reuse the framework. Change the signal language to match the work.</h2>
            </div>
            <p>
              The canvas engine, translucent content system, motion budget, reduced-motion boundary, and mobile constraints remain reusable. The visual metaphor changes with the page mission.
            </p>
          </div>
          <div className="use-grid">
            {signal.bestFor.map((item) => <div className="use" key={item}>{item}</div>)}
          </div>
        </div>
      </section>

      <section className="section" id="rules">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="section-label">Production boundaries</div>
              <h2>The “whoa” survives because the effect knows when to stop.</h2>
            </div>
            <p>
              Rare events remain rare. Foreground content stays still. Mobile performance is capped. Reduced-motion users receive the page without animated dependence. And simulated visuals never masquerade as real data.
            </p>
          </div>
          <div className="rule-list">
            {signal.rules.map((item, index) => (
              <div className="rule" key={item}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="shell">
          <article className="closing-card">
            <div className="section-label">NULLWORKS Living Signal Framework</div>
            <strong>One reusable visual architecture. A different operational heartbeat for every system.</strong>
            <p>
              Fixed atmospheric canvas. Theme-specific scanner. Rare meaningful events. Structured translucent content above it. The goal is not decoration. The goal is to make the operating idea legible before the visitor has words for it.
            </p>
            <div className="cta-row">
              <a className="cta" href="/living-signals">Open the sample library</a>
              <a className="cta secondary" href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20Living%20Signal%20Framework">Use this pattern</a>
            </div>
            <div className="sample-nav">
              <a href={`/living-signals/${previous.slug}`}>
                <small>PREVIOUS SIGNAL</small>
                <strong>← {previous.name}</strong>
              </a>
              <a href={`/living-signals/${next.slug}`}>
                <small>NEXT SIGNAL</small>
                <strong>{next.name} →</strong>
              </a>
            </div>
          </article>
        </div>
      </section>

      <footer>
        <div className="shell">
          NULLWORKS Living Signal Framework // Simulated visual-system samples with explicit truth boundaries. <a href="/living-signals">Browse all eight →</a>
        </div>
      </footer>
    </main>
  );
}
