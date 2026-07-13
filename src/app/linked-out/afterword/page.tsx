import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LINKED-OUT Afterword | NULLWORKS",
  description:
    "How NULLWORKS used separate AI workrooms to produce a receipt-backed thesis and a cinematic campaign asset in parallel under one human operator.",
};

const researchReceipts = [
  "Mailbox evidence audit and bounded methodology",
  "Independent primary-source research and counterevidence",
  "A 23-page thesis with explicit truth boundaries",
  "OISA intervention architecture and a 90-day pilot",
];

const creativeReceipts = [
  "A separate visual brief built around the same central thesis",
  "A cinematic LINKED-OUT movie-poster concept",
  "The failure loop translated into one fast visual",
  "A campaign asset completed without waiting for the paper thread",
];

const operatingRules = [
  {
    title: "One intent",
    body: "Both workrooms served the same human-defined outcome: explain the LINKED-OUT failure and make the argument visible.",
  },
  {
    title: "Separate scopes",
    body: "The research room owned evidence, claims, limitations, and the paper. The creative room owned visual translation and attention.",
  },
  {
    title: "No hidden authority",
    body: "Neither room could silently redefine the thesis, publish the work, or become the final decision-maker.",
  },
  {
    title: "Human convergence",
    body: "Mason routed the work, reviewed both outputs, preserved the receipts, and decided how the pieces became one campaign.",
  },
];

export default function LinkedOutAfterwordPage() {
  return (
    <main className="page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #05080d; }
        .page {
          --night: #05080d;
          --navy: #071522;
          --paper: #f4ead4;
          --paper-2: #e7d3aa;
          --ink: #16140f;
          --muted: #b8b4aa;
          --gold: #d5a23d;
          --gold-2: #f3d786;
          --red: #bd2f24;
          --blue: #2f91d4;
          --line: rgba(226, 184, 89, .26);
          min-height: 100vh;
          background:
            radial-gradient(circle at 16% -8%, rgba(189,47,36,.26), transparent 34rem),
            radial-gradient(circle at 86% 8%, rgba(47,145,212,.20), transparent 34rem),
            linear-gradient(180deg, #06090f 0%, #05080d 48%, #07111a 100%);
          color: #f6f1e7;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow: hidden;
        }
        .shell { width: min(1120px, calc(100% - 30px)); margin: 0 auto; }
        .topbar {
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 22px 0; border-bottom: 1px solid var(--line);
        }
        .brand { display: flex; align-items: center; gap: 12px; color: inherit; text-decoration: none; }
        .monogram {
          width: 44px; height: 44px; display: grid; place-items: center; border-radius: 50%;
          border: 1px solid var(--gold); color: var(--gold-2); font-family: Georgia, serif;
          font-size: 20px; font-weight: 800; box-shadow: inset 0 0 24px rgba(213,162,61,.12);
        }
        .brandSmall { color: var(--gold); font-size: 10px; font-weight: 900; letter-spacing: .2em; text-transform: uppercase; }
        .brandTitle { margin-top: 3px; font-family: Georgia, serif; font-size: 17px; }
        .toplink { color: var(--paper-2); text-decoration: none; font-size: 13px; font-weight: 800; }
        .hero { position: relative; padding: 76px 0 62px; }
        .hero::before {
          content: "NW"; position: absolute; right: -4vw; top: -4vw; font-family: Georgia, serif;
          font-size: clamp(180px, 34vw, 430px); line-height: 1; color: rgba(255,255,255,.018);
          pointer-events: none;
        }
        .pill {
          display: inline-flex; align-items: center; gap: 8px; padding: 9px 13px; border-radius: 999px;
          border: 1px solid rgba(213,162,61,.46); color: var(--gold-2); background: rgba(213,162,61,.08);
          font-size: 11px; font-weight: 950; letter-spacing: .15em; text-transform: uppercase;
        }
        h1 {
          position: relative; z-index: 1; max-width: 950px; margin: 22px 0 0;
          font-family: Georgia, "Times New Roman", serif; font-size: clamp(50px, 8.7vw, 104px);
          line-height: .92; letter-spacing: -.055em; font-weight: 800;
        }
        .heroLead {
          position: relative; z-index: 1; max-width: 850px; margin: 28px 0 0;
          color: #c9c6bd; font-size: clamp(19px, 2vw, 24px); line-height: 1.58;
        }
        .heroQuote {
          position: relative; z-index: 1; max-width: 820px; margin: 28px 0 0; padding-left: 19px;
          border-left: 3px solid var(--gold); color: var(--gold-2); font-family: Georgia, serif;
          font-size: clamp(22px, 2.7vw, 34px); line-height: 1.35;
        }
        .ctaRow { position: relative; z-index: 1; display: flex; flex-wrap: wrap; gap: 11px; margin-top: 32px; }
        .cta {
          display: inline-flex; align-items: center; justify-content: center; min-height: 48px;
          padding: 13px 18px; border-radius: 999px; color: #160e05; background: var(--gold-2);
          text-decoration: none; font-weight: 950;
        }
        .cta.secondary { color: var(--paper); background: transparent; border: 1px solid rgba(244,234,212,.28); }
        .posterWrap { padding: 0 0 78px; }
        .poster {
          position: relative; overflow: hidden; border: 1px solid rgba(231,211,170,.28); border-radius: 28px;
          min-height: 610px; background:
            radial-gradient(circle at 50% 58%, rgba(255,189,72,.72), transparent 9%),
            radial-gradient(circle at 50% 54%, rgba(186,48,35,.45), transparent 28%),
            linear-gradient(90deg, #0b0c10 0 26%, #2a0e0b 43%, #6f2e16 50%, #08233b 61%, #07131f 100%);
          box-shadow: 0 35px 110px rgba(0,0,0,.52);
        }
        .poster::after {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(0deg, rgba(255,255,255,.018) 0 1px, transparent 1px 4px);
          mix-blend-mode: screen;
        }
        .posterTop { position: relative; z-index: 2; padding: 24px 26px 0; text-align: center; }
        .posterTag { color: #f0c762; font-size: 12px; font-weight: 1000; letter-spacing: .14em; text-transform: uppercase; }
        .posterTitle {
          margin-top: 7px; color: #f0c762; font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          font-size: clamp(62px, 10vw, 128px); line-height: .82; letter-spacing: -.045em;
          text-shadow: 0 5px 0 #3b2112, 0 18px 32px rgba(0,0,0,.64);
        }
        .posterSub { margin-top: 14px; color: #f3d99b; font-size: 10px; font-weight: 900; letter-spacing: .25em; text-transform: uppercase; }
        .posterGrid {
          position: relative; z-index: 2; display: grid; grid-template-columns: .85fr 1.3fr .85fr;
          gap: 14px; align-items: end; min-height: 365px; padding: 34px 24px 30px;
        }
        .posterPanel { align-self: stretch; padding: 18px; border-radius: 18px; backdrop-filter: blur(4px); }
        .posterPanel.left { background: rgba(58,10,10,.68); border: 1px solid rgba(209,70,50,.48); }
        .posterPanel.right { background: rgba(4,31,54,.72); border: 1px solid rgba(66,158,220,.5); }
        .posterPanel h3 { margin: 0; color: #fff1d2; font-size: 22px; }
        .panelLabel { margin-top: 4px; color: #d6d2ca; font-size: 11px; text-transform: uppercase; letter-spacing: .14em; }
        .posterPanel ul { list-style: none; padding: 0; margin: 18px 0 0; display: grid; gap: 12px; }
        .posterPanel li { color: #fff; font-size: 14px; font-weight: 900; line-height: 1.28; }
        .posterPanel li::before { content: "●"; margin-right: 8px; }
        .left li::before { color: #f75f46; }
        .right li::before { color: #55b8f0; }
        .figure {
          position: relative; align-self: end; min-height: 330px; display: flex; align-items: flex-end; justify-content: center;
        }
        .figure::before {
          content: ""; width: 145px; height: 305px; border-radius: 48% 48% 12% 12%;
          background: linear-gradient(90deg, #150c0b, #020203 47%, #06101b 53%, #091c2b);
          clip-path: polygon(40% 0, 60% 0, 68% 10%, 70% 28%, 87% 46%, 76% 100%, 24% 100%, 13% 46%, 30% 28%, 32% 10%);
          box-shadow: 0 0 58px rgba(255,166,56,.5), -48px 0 70px rgba(178,49,35,.28), 48px 0 70px rgba(46,145,210,.28);
        }
        .figure::after {
          content: ""; position: absolute; bottom: -13px; width: 265px; height: 46px; border-radius: 50%;
          background: rgba(0,0,0,.72); filter: blur(12px);
        }
        .posterBottom {
          position: relative; z-index: 2; display: flex; align-items: end; justify-content: space-between; gap: 18px;
          padding: 18px 25px 24px; border-top: 1px solid rgba(240,199,98,.24); background: rgba(2,5,8,.66);
        }
        .posterLine { max-width: 760px; color: #f6e7c0; font-family: Georgia, serif; font-size: clamp(18px, 2.1vw, 27px); line-height: 1.2; }
        .posterDate { color: #f0c762; font-size: 12px; font-weight: 950; letter-spacing: .11em; text-align: right; white-space: nowrap; }
        .caption { margin: 15px 6px 0; color: #8e948f; font-size: 13px; line-height: 1.55; }
        section.articleSection { padding: 76px 0; border-top: 1px solid var(--line); }
        .sectionLabel { color: var(--gold); font-size: 11px; font-weight: 950; letter-spacing: .17em; text-transform: uppercase; }
        h2 {
          max-width: 930px; margin: 12px 0 24px; font-family: Georgia, serif;
          font-size: clamp(38px, 5.6vw, 68px); line-height: .98; letter-spacing: -.045em;
        }
        .body { max-width: 890px; color: #c8c6be; font-size: 18px; line-height: 1.78; }
        .body strong { color: #fff4d8; }
        .twoCol { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 34px; }
        .workcell {
          border-radius: 25px; padding: 25px; border: 1px solid rgba(244,234,212,.18);
          background: linear-gradient(165deg, rgba(255,255,255,.045), rgba(255,255,255,.012));
        }
        .workcell.research { border-top: 3px solid var(--red); }
        .workcell.creative { border-top: 3px solid var(--blue); }
        .workcellTag { font-size: 11px; font-weight: 950; letter-spacing: .15em; text-transform: uppercase; }
        .research .workcellTag { color: #ff7a69; }
        .creative .workcellTag { color: #69c4fa; }
        .workcell h3 { margin: 13px 0 8px; font-family: Georgia, serif; font-size: 31px; }
        .workcell p { color: #aaaFA9; line-height: 1.65; }
        .workcell ul { list-style: none; padding: 0; margin: 20px 0 0; display: grid; gap: 12px; }
        .workcell li { color: #d5d2ca; line-height: 1.5; padding-left: 20px; position: relative; }
        .workcell li::before { content: "✓"; position: absolute; left: 0; color: var(--gold-2); font-weight: 1000; }
        .timeline { display: grid; gap: 12px; margin-top: 34px; }
        .step {
          display: grid; grid-template-columns: 82px 1fr; gap: 18px; align-items: start;
          padding: 20px; border: 1px solid rgba(231,211,170,.18); border-radius: 20px; background: rgba(255,255,255,.025);
        }
        .time { color: var(--gold-2); font-weight: 1000; font-size: 13px; letter-spacing: .08em; }
        .step h3 { margin: 0 0 6px; font-size: 22px; }
        .step p { margin: 0; color: #aeb2ac; line-height: 1.6; }
        .ruleGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 13px; margin-top: 32px; }
        .rule { padding: 22px; border-radius: 20px; background: var(--paper); color: var(--ink); box-shadow: 0 16px 45px rgba(0,0,0,.17); }
        .rule h3 { margin: 0 0 9px; font-family: Georgia, serif; font-size: 25px; }
        .rule p { margin: 0; color: #40382c; line-height: 1.6; }
        .comparison { display: grid; grid-template-columns: 1fr auto 1fr; gap: 18px; align-items: stretch; margin-top: 34px; }
        .lane { border-radius: 24px; padding: 25px; border: 1px solid rgba(244,234,212,.18); background: rgba(255,255,255,.025); }
        .lane.bad { opacity: .75; }
        .lane.good { border-color: rgba(213,162,61,.56); background: linear-gradient(145deg, rgba(213,162,61,.12), rgba(255,255,255,.02)); }
        .lane h3 { margin: 0 0 14px; font-family: Georgia, serif; font-size: 30px; }
        .lane ol { margin: 0; padding-left: 21px; color: #c8c5bd; line-height: 1.75; }
        .versus { display: grid; place-items: center; color: var(--gold); font-size: 13px; font-weight: 1000; letter-spacing: .15em; }
        .truth {
          margin-top: 32px; padding: 25px; border: 1px solid rgba(213,162,61,.52); border-radius: 24px;
          background: linear-gradient(145deg, rgba(213,162,61,.14), rgba(255,255,255,.02));
        }
        .truthTitle { color: var(--gold-2); font-size: 11px; font-weight: 1000; letter-spacing: .16em; text-transform: uppercase; }
        .truth p { margin: 11px 0 0; color: #d0cdc5; line-height: 1.7; }
        .final {
          margin: 76px 0; padding: clamp(28px, 5vw, 58px); border-radius: 30px;
          background: var(--paper); color: var(--ink); position: relative; overflow: hidden;
        }
        .final::after { content: "NW"; position: absolute; right: -18px; bottom: -50px; color: rgba(24,20,15,.045); font-family: Georgia, serif; font-size: 210px; font-weight: 800; }
        .final h2 { position: relative; z-index: 1; margin-top: 0; }
        .final p { position: relative; z-index: 1; max-width: 820px; color: #40382c; font-size: 18px; line-height: 1.75; }
        .final .cta { position: relative; z-index: 1; background: #091725; color: #f4ead4; }
        footer { padding: 25px 0 38px; color: #898f89; font-size: 12px; border-top: 1px solid var(--line); }
        @media (max-width: 800px) {
          .hero { padding-top: 52px; }
          .poster { min-height: auto; }
          .posterGrid { grid-template-columns: 1fr; min-height: 0; padding-top: 24px; }
          .figure { order: -1; min-height: 250px; }
          .figure::before { height: 235px; width: 112px; }
          .posterBottom { align-items: start; flex-direction: column; }
          .posterDate { text-align: left; }
          .twoCol, .ruleGrid { grid-template-columns: 1fr; }
          .comparison { grid-template-columns: 1fr; }
          .versus { min-height: 34px; }
        }
        @media (max-width: 560px) {
          .shell { width: min(100% - 22px, 1120px); }
          .topbar { align-items: flex-start; }
          .brandTitle { font-size: 14px; }
          .toplink { max-width: 92px; text-align: right; line-height: 1.35; }
          h1 { font-size: clamp(45px, 15vw, 72px); }
          .posterTitle { font-size: clamp(56px, 19vw, 88px); }
          .posterTop { padding-left: 15px; padding-right: 15px; }
          .posterGrid { padding-left: 12px; padding-right: 12px; }
          .posterPanel { padding: 16px; }
          .step { grid-template-columns: 1fr; gap: 7px; }
          section.articleSection { padding: 58px 0; }
        }
      `}</style>

      <div className="shell">
        <header className="topbar">
          <a className="brand" href="/" aria-label="Open the NULLWORKS public operating map">
            <span className="monogram">NW</span>
            <span>
              <span className="brandSmall">NULLWORKS // LINKED-OUT</span>
              <span className="brandTitle">Operational Intelligence</span>
            </span>
          </a>
          <a className="toplink" href="/field-notes/when-ai-becomes-a-company">How the company works →</a>
        </header>

        <section className="hero">
          <span className="pill">Afterword // production receipt</span>
          <h1>The paper was still being written. The poster was already in production.</h1>
          <p className="heroLead">
            LINKED-OUT became more than a thesis before its research workroom finished. A separate creative workroom was already translating the same operating failure into a cinematic campaign asset—without waiting in line behind the writing department.
          </p>
          <div className="heroQuote">This is what changes when one person stops using AI as one assistant and starts operating it as a company.</div>
          <div className="ctaRow">
            <a className="cta" href="#receipt">See the operating receipt</a>
            <a className="cta secondary" href="/ai-audit">Audit the system around your AI</a>
          </div>
        </section>

        <section className="posterWrap" aria-label="Web-native LINKED-OUT movie poster treatment">
          <div className="poster">
            <div className="posterTop">
              <div className="posterTag">The system filtered out the one person who could fix it.</div>
              <div className="posterTitle">LINKED-OUT</div>
              <div className="posterSub">A Christopher Null-an production</div>
            </div>
            <div className="posterGrid">
              <div className="posterPanel left">
                <h3>LINKEDIN</h3>
                <div className="panelLabel">The platform</div>
                <ul>
                  <li>AI makes applying easier</li>
                  <li>AI screens applicants</li>
                  <li>AI ranks résumés</li>
                  <li>AI buries edge cases</li>
                </ul>
              </div>
              <div className="figure" aria-hidden="true" />
              <div className="posterPanel right">
                <h3>NULLWORKS</h3>
                <div className="panelLabel">The operating layer</div>
                <ul>
                  <li>Map the full system</li>
                  <li>Add human review gates</li>
                  <li>Track failures</li>
                  <li>Measure outcomes</li>
                </ul>
              </div>
            </div>
            <div className="posterBottom">
              <div className="posterLine">The edge case that could fix the filter cannot survive the filter.</div>
              <div className="posterDate">JULY 13, 2026<br />AI ATE THE RÉSUMÉ</div>
            </div>
          </div>
          <p className="caption">Web-native treatment of the parallel creative work-cell output. The finished Mr. Smith poster remains the campaign artwork; this panel keeps the operating receipt legible on every screen size.</p>
        </section>

        <section className="articleSection" id="receipt">
          <div className="sectionLabel">01 // The parallel build</div>
          <h2>Two departments. One human directive. Different deliverables.</h2>
          <p className="body">
            In the research workroom, the assignment was to turn a field hypothesis into a defensible paper: inspect the hiring path, audit Mason&apos;s mailbox evidence, research what independent studies actually support, preserve counterevidence, define what the receipts do not prove, and design a testable OISA intervention.
          </p>
          <p className="body">
            In a different conversation, the creative department received the same central problem and a completely different job: make LINKED-OUT feel like a major film release. That room did not wait for this room to finish thinking. It worked in parallel on attention, visual compression, story, atmosphere, and campaign recognition.
          </p>

          <div className="twoCol">
            <article className="workcell research">
              <div className="workcellTag">Research + writing workroom</div>
              <h3>Build the case.</h3>
              <p>Slow enough to protect the claims. Structured enough to preserve the evidence.</p>
              <ul>{researchReceipts.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className="workcell creative">
              <div className="workcellTag">Art + campaign workroom</div>
              <h3>Make the case visible.</h3>
              <p>Fast enough to capture attention. Focused enough to translate the thesis without becoming the thesis.</p>
              <ul>{creativeReceipts.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </section>

        <section className="articleSection">
          <div className="sectionLabel">02 // What actually happened</div>
          <h2>The work did not move faster because one chatbot typed faster.</h2>
          <p className="body">
            It moved faster because the work was separated by function. The evidence-heavy assignment and the visual assignment did not require the same context, the same tools, the same review rhythm, or the same definition of finished. Forcing them through one linear conversation would have created a queue.
          </p>

          <div className="timeline">
            <div className="step">
              <div className="time">T0</div>
              <div><h3>Human intent is set</h3><p>Mason defines the LINKED-OUT thesis, the audience, the truth boundary, and the desired outputs.</p></div>
            </div>
            <div className="step">
              <div className="time">LANE A</div>
              <div><h3>Research proceeds</h3><p>One workroom audits evidence, tests the claim, writes the paper, and records what would falsify it.</p></div>
            </div>
            <div className="step">
              <div className="time">LANE B</div>
              <div><h3>Creative production proceeds simultaneously</h3><p>A different workroom translates the same operating failure into a memorable visual campaign.</p></div>
            </div>
            <div className="step">
              <div className="time">MERGE</div>
              <div><h3>The human combines the outputs</h3><p>The paper carries the evidence. The poster earns attention. The landing page exposes the operating model that produced both.</p></div>
            </div>
          </div>
        </section>

        <section className="articleSection">
          <div className="sectionLabel">03 // Serial work versus operational intelligence</div>
          <h2>The difference is not more AI. It is less waiting.</h2>
          <div className="comparison">
            <div className="lane bad">
              <h3>One-assistant queue</h3>
              <ol>
                <li>Research the thesis.</li>
                <li>Finish the paper.</li>
                <li>Re-explain it to the art room.</li>
                <li>Wait for the poster.</li>
                <li>Reconcile both at the end.</li>
              </ol>
            </div>
            <div className="versus">VS</div>
            <div className="lane good">
              <h3>Company operating model</h3>
              <ol>
                <li>Lock the intent and authority.</li>
                <li>Split the work by function.</li>
                <li>Run compatible work in parallel.</li>
                <li>Require scoped outputs and receipts.</li>
                <li>Converge through human review.</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="articleSection">
          <div className="sectionLabel">04 // The controls that make parallel work useful</div>
          <h2>Parallel without structure is just faster confusion.</h2>
          <p className="body">
            Separate workrooms are valuable only when the operating model prevents drift, accidental duplication, false authority, and context contamination. NULLWORKS treats the workroom boundary as a control surface—not as a theatrical claim that the AI became autonomous.
          </p>
          <div className="ruleGrid">
            {operatingRules.map((rule) => (
              <article className="rule" key={rule.title}>
                <h3>{rule.title}</h3>
                <p>{rule.body}</p>
              </article>
            ))}
          </div>
          <aside className="truth">
            <div className="truthTitle">Truth boundary</div>
            <p>
              The workrooms did not secretly coordinate with one another, independently publish, or acquire authority. Mason created the parallel lanes and remained the final human operator. The achievement is not autonomous agents spontaneously forming a studio. It is a human-designed operating system that reduced serial waiting while preserving scope, evidence, and accountability.
            </p>
          </aside>
        </section>

        <section className="articleSection">
          <div className="sectionLabel">05 // Why this matters to a company</div>
          <h2>Most organizations already have parallel AI work. They just cannot see or govern it.</h2>
          <p className="body">
            Employees are already using copilots, assistants, image generators, search tools, private prompts, spreadsheets, automations, and departmental agents at the same time. The problem is not that work is parallel. The problem is that the intent, ownership, evidence, boundaries, review gates, and results are rarely connected.
          </p>
          <p className="body">
            An OISA does not make every task more technical. The role makes the operating path visible: what can happen simultaneously, what must wait, which context may be shared, who owns the consequence, what requires human review, where the receipt lives, and whether the faster process produced a better result.
          </p>
        </section>

        <section className="final">
          <div className="sectionLabel">The production receipt</div>
          <h2>LINKED-OUT was not produced by one magical prompt.</h2>
          <p>
            It was produced by one human operating multiple scoped AI workrooms as a company: research protected the truth, creative earned the attention, and the operating layer let both move before either became a bottleneck.
          </p>
          <p><strong>The paper explains why the hiring system needs a whole-path owner. This afterword shows what a whole-path owner actually does.</strong></p>
          <a className="cta" href="/ai-audit">Start with one real workflow →</a>
        </section>

        <footer>
          NULLWORKS // LINKED-OUT AFTERWORD // Human authority remains final.
        </footer>
      </div>
    </main>
  );
}
