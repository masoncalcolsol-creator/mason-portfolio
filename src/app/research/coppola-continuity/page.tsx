import type { Metadata } from "next";
import EnhancedSonarContacts from "../../living-signals/sonar-fish/EnhancedSonarContacts";
import LivingSignalCanvas from "../../living-signals/LivingSignalCanvas";
import AudioBrief from "./AudioBrief";

export const metadata: Metadata = {
  title: "The Notebook Before the Network | NULLWORKS",
  description:
    "A mobile research and listening lab for the Coppola continuity-notebook study, presented over the NULLWORKS Sonar Fish living signal.",
};

const sourcePaper =
  "https://www.ieseg.fr/wp-content/uploads/2013-MAN-05_Kleymann.pdf";
const officialNotebookAudio =
  "https://books.apple.com/us/audiobook/the-godfather-notebook-unabridged/id1174972868";
const officialNotebookBook =
  "https://www.simonandschuster.com/books/The-Godfather-Notebook/Francis-Ford-Coppola/9781682450741";
const officialFilm =
  "https://www.paramountmovies.com/movies/the-godfather";

const pilots = [
  "Restaurant assassination: Michael, Sollozzo, and McCluskey",
  "Luca Brasi rehearses—and then falters before the Don",
  "The opening office scene and Brando's cat",
  "Michael in Sicily and the translation constraint",
  "Don Corleone, his grandson, and the orange peel",
];

export default function CoppolaContinuityPage() {
  return (
    <main className="coppola-page">
      <LivingSignalCanvas mode="sonar" accentRgb="214,221,226" />
      <EnhancedSonarContacts />

      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #050607; }
        button, a { -webkit-tap-highlight-color: transparent; }
        .coppola-page {
          --accent: #d6dde2;
          --accent-rgb: 214,221,226;
          min-height: 100vh;
          position: relative;
          isolation: isolate;
          overflow-x: hidden;
          color: #f4f6f7;
          background:
            radial-gradient(circle at 82% 5%, rgba(var(--accent-rgb), .09), transparent 30rem),
            radial-gradient(circle at 7% 48%, rgba(var(--accent-rgb), .045), transparent 33rem),
            linear-gradient(rgba(5,6,7,.67), rgba(5,6,7,.88));
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .shell { width: min(1120px, calc(100% - 34px)); margin: 0 auto; }
        .nav, .hero, .section, footer { position: relative; z-index: 3; }
        .nav {
          position: sticky;
          top: 0;
          z-index: 80;
          border-bottom: 1px solid rgba(var(--accent-rgb), .16);
          background: rgba(5,6,7,.79);
          backdrop-filter: blur(18px);
        }
        .nav-inner {
          min-height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }
        .brand {
          color: #fff;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: .12em;
          text-decoration: none;
          white-space: nowrap;
        }
        .brand span { color: var(--accent); }
        .nav-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 7px; }
        .nav-links a {
          color: #c4cbd0;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.13);
          border-radius: 999px;
          padding: 8px 10px;
          font-size: 11px;
          font-weight: 850;
          background: rgba(5,6,7,.42);
        }
        .hero {
          min-height: calc(100svh - 64px);
          display: grid;
          align-items: center;
          border-bottom: 1px solid rgba(var(--accent-rgb), .14);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.13fr .87fr;
          gap: 28px;
          align-items: end;
          padding: 72px 0 68px;
        }
        .eyebrow, .section-label, .console-label, .status-label {
          color: var(--accent);
          font: 900 11px ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        h1 {
          max-width: 980px;
          margin: 18px 0 0;
          font-size: clamp(58px, 9vw, 118px);
          line-height: .84;
          letter-spacing: -.068em;
        }
        h1 span {
          display: block;
          color: transparent;
          -webkit-text-stroke: 1px rgba(var(--accent-rgb), .65);
        }
        .lead {
          max-width: 820px;
          margin: 27px 0 0;
          color: #c0c7cb;
          font-size: clamp(18px, 2.1vw, 24px);
          line-height: 1.55;
        }
        .hash {
          display: inline-flex;
          margin-top: 24px;
          border: 1px solid rgba(var(--accent-rgb), .3);
          border-radius: 999px;
          padding: 10px 13px;
          color: #eef2f4;
          background: rgba(5,6,7,.62);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .04em;
        }
        .hero-card, .source-card, .audio-console, .status-card, .pilot-card {
          border: 1px solid rgba(var(--accent-rgb), .27);
          background: linear-gradient(145deg, rgba(var(--accent-rgb), .07), rgba(7,9,10,.84));
          box-shadow: 0 28px 90px rgba(0,0,0,.38);
          backdrop-filter: blur(10px);
        }
        .hero-card { border-radius: 29px; padding: 26px; }
        .hero-card strong {
          display: block;
          margin-top: 16px;
          font-size: clamp(30px, 4.4vw, 52px);
          line-height: .96;
          letter-spacing: -.05em;
        }
        .hero-card p { color: #b7c0c5; line-height: 1.65; }
        .hero-card small { display: block; color: #8e989e; line-height: 1.55; }
        .section {
          padding: 78px 0;
          border-bottom: 1px solid rgba(var(--accent-rgb), .13);
          background: rgba(5,6,7,.44);
        }
        .section-head {
          display: grid;
          grid-template-columns: 1.04fr .96fr;
          gap: 28px;
          align-items: end;
          margin-bottom: 30px;
        }
        h2 {
          margin: 12px 0 0;
          font-size: clamp(39px, 6vw, 72px);
          line-height: .94;
          letter-spacing: -.055em;
        }
        .section-head p { color: #aeb7bc; font-size: 17px; line-height: 1.68; }
        .source-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 13px; }
        .source-card { min-height: 270px; border-radius: 24px; padding: 22px; display: flex; flex-direction: column; }
        .source-card h3 { margin: 18px 0 0; font-size: 28px; line-height: 1.05; letter-spacing: -.035em; }
        .source-card p { color: #afb8bd; line-height: 1.62; }
        .source-card .spacer { flex: 1; }
        .button-row { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 18px; }
        .button, .controls button, .rate-row button {
          appearance: none;
          border: 1px solid rgba(var(--accent-rgb), .36);
          border-radius: 999px;
          padding: 12px 15px;
          background: var(--accent);
          color: #050607;
          text-decoration: none;
          font: 900 12px ui-sans-serif, system-ui, sans-serif;
          cursor: pointer;
        }
        .button.secondary, .controls button:nth-child(n+2), .rate-row button {
          color: var(--accent);
          background: rgba(5,6,7,.64);
        }
        .button[aria-disabled="true"] { opacity: .52; cursor: not-allowed; }
        .status-card {
          border-radius: 28px;
          padding: clamp(24px, 5vw, 40px);
          display: grid;
          grid-template-columns: .7fr 1.3fr;
          gap: 26px;
        }
        .status-card .big-status {
          font-size: clamp(38px, 7vw, 78px);
          font-weight: 950;
          letter-spacing: -.06em;
          line-height: .88;
        }
        .status-card .big-status span { display: block; color: var(--accent); }
        .status-copy p { color: #b7c0c5; font-size: 17px; line-height: 1.68; }
        .status-copy ul { margin: 18px 0 0; padding-left: 20px; color: #c4cbd0; line-height: 1.65; }
        .audio-console {
          border-radius: 28px;
          padding: clamp(23px, 4.5vw, 38px);
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: 24px;
          align-items: end;
        }
        .audio-console h2 { font-size: clamp(38px, 5vw, 62px); }
        .audio-console p { color: #b6bec3; line-height: 1.65; }
        .controls { display: flex; flex-wrap: wrap; gap: 9px; }
        .controls button:disabled { opacity: .38; cursor: not-allowed; }
        .rate-row { display: flex; align-items: center; flex-wrap: wrap; gap: 7px; margin-top: 15px; }
        .rate-row span { margin-right: 4px; color: #929ca1; font: 850 11px ui-monospace, monospace; text-transform: uppercase; }
        .rate-row button { padding: 8px 11px; }
        .rate-row button.selected { background: var(--accent); color: #050607; }
        .console-status {
          grid-column: 1 / -1;
          border-top: 1px solid rgba(var(--accent-rgb), .14);
          padding-top: 16px;
          color: #929ca1;
          font-size: 13px;
          line-height: 1.5;
        }
        .pilot-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
        .pilot-card { min-height: 190px; border-radius: 22px; padding: 18px; }
        .pilot-card b { color: var(--accent); font: 900 11px ui-monospace, monospace; }
        .pilot-card p { margin: 38px 0 0; color: #c0c7cb; line-height: 1.5; font-weight: 800; }
        .closing {
          padding: 86px 0 94px;
          position: relative;
          z-index: 3;
        }
        .closing-card {
          border: 1px solid rgba(var(--accent-rgb), .34);
          border-radius: 31px;
          padding: clamp(28px, 5vw, 48px);
          background: linear-gradient(145deg, rgba(var(--accent-rgb), .09), rgba(7,9,10,.86));
          backdrop-filter: blur(10px);
        }
        .closing-card strong { display: block; font-size: clamp(42px, 7vw, 82px); line-height: .92; letter-spacing: -.06em; }
        .closing-card p { max-width: 850px; color: #b6bec3; font-size: 18px; line-height: 1.68; }
        footer { padding: 28px 0 60px; color: #7f898f; font-size: 12px; line-height: 1.6; }
        @media (max-width: 940px) {
          .hero-grid, .section-head, .audio-console, .status-card { grid-template-columns: 1fr; }
          .source-grid { grid-template-columns: 1fr; }
          .pilot-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 680px) {
          .shell { width: min(100% - 24px, 1120px); }
          .nav-inner { align-items: flex-start; padding: 11px 0; }
          .brand { padding-top: 8px; font-size: 10px; }
          .nav-links { gap: 5px; }
          .nav-links a { padding: 7px 8px; font-size: 9px; }
          .hero-grid { padding: 54px 0 52px; }
          h1 { font-size: clamp(52px, 16.5vw, 80px); }
          .section { padding: 60px 0; }
          .pilot-grid { grid-template-columns: 1fr; }
          .source-card { min-height: auto; }
          .controls button, .button { min-height: 46px; }
        }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      <nav className="nav">
        <div className="shell nav-inner">
          <a className="brand" href="/">NULLWORKS <span>COPPOLA LAB</span></a>
          <div className="nav-links">
            <a href="#listen">Listen</a>
            <a href="#sources">Sources</a>
            <a href="#pilots">Scene pilots</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="shell hero-grid">
          <div>
            <div className="eyebrow">COPPOLA CONTINUITY NOTEBOOK // FIELD LAB 01</div>
            <h1>
              The notebook
              <span>before the network.</span>
            </h1>
            <p className="lead">
              Francis Ford Coppola, <em>The Godfather</em>, governed emergence,
              and the analog architecture of cognitive continuity.
            </p>
            <div className="hash">#FuckItWereDoingFish</div>
          </div>

          <aside className="hero-card">
            <div className="status-label">SHARED WORKROOM</div>
            <strong>Mason + Jason + Neuraxis</strong>
            <p>
              Mobile-first research access for listening, source verification,
              scene tracing, and preserved uncertainty.
            </p>
            <small>
              The sonar field is simulated visual atmosphere. It does not represent
              live research telemetry or actual marine data.
            </small>
          </aside>
        </div>
      </header>

      <section className="section" id="sources">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="section-label">Verified entry points</div>
              <h2>Read the study. Hear Coppola where licensing is clear.</h2>
            </div>
            <p>
              The page distinguishes the researchers&apos; unpublished transcription
              dataset from sources that are currently available through an official
              publisher, studio, or institution.
            </p>
          </div>

          <div className="source-grid">
            <article className="source-card">
              <div className="status-label">OPEN PDF // PRIMARY RESEARCH TARGET</div>
              <h3>Malloch–Kleymann working paper</h3>
              <p>
                The verified 2013 IÉSEG paper that analyzed an approximately
                19,000-word transcription of Coppola&apos;s commentary and introduced
                the prior terminology of governed emergence in this case.
              </p>
              <div className="spacer" />
              <div className="button-row">
                <a className="button" href={sourcePaper} target="_blank" rel="noreferrer">
                  Open verified PDF
                </a>
              </div>
            </article>

            <article className="source-card">
              <div className="status-label">OFFICIAL AUDIO // COPPOLA&apos;S OWN VOICE</div>
              <h3>The Godfather Notebook audiobook</h3>
              <p>
                A licensed 1-hour-19-minute production narrated by Francis Ford
                Coppola and built from eight selected notebook scenes. This is not
                the full film commentary, but it is the strongest lawful listening
                source currently verified for the notebook itself.
              </p>
              <div className="spacer" />
              <div className="button-row">
                <a className="button" href={officialNotebookAudio} target="_blank" rel="noreferrer">
                  Listen officially
                </a>
                <a className="button secondary" href={officialNotebookBook} target="_blank" rel="noreferrer">
                  View the notebook
                </a>
              </div>
            </article>

            <article className="source-card">
              <div className="status-label">ORIGINAL COMMENTARY // ACCESS PATH</div>
              <h3>Coppola&apos;s full film commentary</h3>
              <p>
                The original director commentary runs approximately 2 hours and
                57 minutes and was issued with licensed home-video editions. The
                lab does not mirror podcast uploads whose redistribution authority
                has not been established.
              </p>
              <div className="spacer" />
              <div className="button-row">
                <a className="button" href={officialFilm} target="_blank" rel="noreferrer">
                  Official film page
                </a>
              </div>
            </article>

            <article className="source-card">
              <div className="status-label">TRANSCRIPT SLOT // AUTHORIZATION GATE</div>
              <h3>The 19,000-word research transcript</h3>
              <p>
                The study reports this transcript as its coded dataset, but the full
                text is not published in the working paper and an authorized public
                copy has not been located. The interface slot is ready; the text and
                synthesized narration remain locked until a lawful source or permission
                is supplied.
              </p>
              <div className="spacer" />
              <div className="button-row">
                <span className="button secondary" aria-disabled="true">
                  Awaiting authorized source
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="listen">
        <div className="shell">
          <AudioBrief />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="status-card">
            <div>
              <div className="status-label">CURRENT TRUTH STATE</div>
              <div className="big-status">SOURCE<span>BEFORE STORY</span></div>
            </div>
            <div className="status-copy">
              <p>
                The 2013 paper is verified. The notebook&apos;s existence and official
                publication are verified. The central NULLWORKS interpretation—the
                notebook as an analog continuity kernel—remains a hypothesis awaiting
                artifact-level and scene-level testing.
              </p>
              <ul>
                <li>No claim that Coppola used OI terminology.</li>
                <li>No claim that the notebook alone caused the film&apos;s success.</li>
                <li>No silent reconciliation of conflicting production memories.</li>
                <li>No synthetic certainty where the evidence remains unavailable.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="pilots">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="section-label">Historical Continuity Calculus pilot</div>
              <h2>Five scenes. Full descendant tracing.</h2>
            </div>
            <p>
              Each pilot will be traced from the novel through interpretation,
              screenplay, notebook, production, collaborator contribution, filmed
              material, editing, finished scene, retrospective account, and unresolved uncertainty.
            </p>
          </div>
          <div className="pilot-grid">
            {pilots.map((pilot, index) => (
              <article className="pilot-card" key={pilot}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <p>{pilot}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="shell">
          <div className="closing-card">
            <div className="section-label">WORKING DOCTRINE // NOT YET A CONCLUSION</div>
            <strong>Preserve the why. Let the form learn.</strong>
            <p>
              The destination may remain open while the journey remains governed.
              Strong control of intent does not require rigid control of every implementation detail.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell">
          NULLWORKS Coppola Continuity Notebook Research Workroom // Mason Perry remains final Human Authority.
          Original research brief and interface by NULLWORKS. Third-party works remain the property of their respective rights holders.
        </div>
      </footer>
    </main>
  );
}
