import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Gauge,
  Hammer,
  Music2,
  Play,
  ShieldAlert,
  Sparkles,
  UserRoundCheck,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Still Starts | AI Is a Tool",
  description:
    "A field note about an inherited old Stihl chainsaw, AI, skilled operators, and what makes a dangerous tool extraordinarily powerful in the right hands.",
};

const SUNO_URL = "https://suno.com/s/ejX2EpMUWVVYVU2f";
const LENDERFLOW_URL = "https://lf-lender-intake.vercel.app";
const SUNO_PREVIEW = `https://image.thum.io/get/width/1200/crop/1500/noanimate/${SUNO_URL}`;

const operatingRules = [
  ["The tool does not choose the job", "The operator defines the purpose, the boundary, and what a good result must accomplish."],
  ["Power requires control", "Architecture, testing, review gates, evidence, and Human Authority keep speed from becoming damage."],
  ["Reality gets the final vote", "A build has to survive contact with the actual workflow—not just look convincing in a demo."],
  ["Receipts beat confidence", "Show what happened, who checked it, what changed, what failed, and whether the outcome improved."],
];

const lenderFlow = [
  ["30 minutes", "Forward-deployed discovery call with a working mortgage broker."],
  ["2 hours", "First functioning framework built from the evidence gathered on the call."],
  ["That afternoon", "Expert walkthrough, correction, and alignment against the real workflow."],
  ["Day two", "Full framework and lender-matching matrices operating; Broker OS added."],
  ["Day three", "Broker ran a sample case. His intern helped define matching rules, inputs, and numerical thresholds."],
  ["By the end of day three", "Multiple brokers were using it to compress intake, comparison, warnings, and package preparation."],
];

export default function ChainsawPage() {
  return (
    <main>
      <style>{`
        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{margin:0;background:#e9dfcf;color:#121820}
        a{color:inherit}
        .page{min-height:100vh;background:radial-gradient(circle at 80% 0%,rgba(232,92,16,.14),transparent 28%),linear-gradient(180deg,#efe7da 0%,#ded2c1 100%);font-family:Arial,Helvetica,sans-serif}
        .shell{width:min(1120px,100%);margin:auto;padding:0 24px}
        .nav{height:76px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #9d8c78}
        .brand{font-weight:950;letter-spacing:.15em;text-decoration:none;font-size:14px}.brand span{color:#e85c10}
        .back{display:inline-flex;align-items:center;gap:8px;text-decoration:none;font-size:13px;font-weight:900}
        .hero{display:grid;grid-template-columns:1.05fr .95fr;gap:42px;align-items:center;padding:68px 0 74px;border-bottom:1px solid #a99883}
        .kicker{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:950;letter-spacing:.14em;text-transform:uppercase;color:#b33f00}
        h1,h2,h3{margin:0;color:#101820;letter-spacing:-.045em}
        h1{font-size:clamp(58px,9vw,108px);line-height:.86;margin-top:22px}
        h1 span{display:block;color:#e85c10}
        .lead{font-family:Georgia,serif;font-size:clamp(28px,4vw,42px);line-height:1.23;margin:28px 0 0;color:#29313a}
        .copy{font-size:18px;line-height:1.78;color:#42474d;max-width:760px}
        .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
        .button{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:15px 18px;text-decoration:none;font-weight:950;border:1px solid #18212a;text-transform:uppercase;letter-spacing:.04em;font-size:12px}
        .primary{background:#e85c10;color:#fff;border-color:#c64b08}.secondary{background:#101820;color:#fff}.ghost{background:transparent;color:#101820}
        .visual{position:relative;min-height:590px;background:#121922;border:1px solid #1a2630;box-shadow:18px 18px 0 #e85c10;overflow:hidden}
        .visual:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(9,14,20,.08),rgba(9,14,20,.82)),url("${SUNO_PREVIEW}") center/cover no-repeat;filter:saturate(.75) contrast(1.08)}
        .visualText{position:absolute;inset:auto 28px 30px;z-index:1;color:white}.visualText small{display:block;font-weight:950;letter-spacing:.14em;color:#ff8b48;margin-bottom:12px}.visualText strong{display:block;font-family:Georgia,serif;font-size:42px;line-height:1.02}.visualText span{display:block;margin-top:14px;color:#e9edf0;line-height:1.5}
        section{padding:70px 0;border-bottom:1px solid #a99883}.eyebrow{font-size:12px;font-weight:950;letter-spacing:.17em;text-transform:uppercase;color:#b33f00;margin-bottom:14px}.sectionTitle{font-size:clamp(42px,6vw,76px);line-height:1;margin-bottom:24px}
        .statement{background:#111922;color:#fff;padding:42px;border-left:8px solid #e85c10;font-family:Georgia,serif;font-size:clamp(34px,5vw,64px);line-height:1.12}.statement em{color:#ff7d33;font-style:normal}
        .storyGrid{display:grid;grid-template-columns:.9fr 1.1fr;gap:28px;align-items:start}.legacyCard{background:#d7cbb9;border:1px solid #998a77;padding:28px}.legacyCard svg{color:#e85c10}.legacyCard h3{font-size:34px;margin:18px 0 12px}.legacyCard p{margin:0;color:#4a4d50;line-height:1.72}
        .rules{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:28px}.rule{background:#f7f2e9;border:1px solid #ad9e8c;padding:24px}.rule strong{display:block;font-size:22px;margin-bottom:10px}.rule p{margin:0;line-height:1.7;color:#4b4e52}
        .dark{background:#111922;color:#fff;margin:0 -24px;padding-left:24px;padding-right:24px}.dark .sectionTitle,.dark h3{color:#fff}.dark .eyebrow{color:#ff7c32}.dark .copy{color:#c9d0d6}
        .timeline{display:grid;gap:12px;margin-top:30px}.timelineItem{display:grid;grid-template-columns:180px 1fr;gap:22px;padding:20px 0;border-top:1px solid #33414d}.timelineItem strong{color:#ff7c32;font-size:18px}.timelineItem span{color:#d2d9de;line-height:1.62}
        .proofFooter{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-top:28px;padding-top:24px;border-top:1px solid #33414d;flex-wrap:wrap}
        .music{display:grid;grid-template-columns:.95fr 1.05fr;gap:28px;align-items:stretch}.songCard{background:#e85c10;color:#fff;padding:34px;display:flex;flex-direction:column;justify-content:space-between;min-height:430px}.songCard h3{font-family:Georgia,serif;font-size:clamp(42px,6vw,70px);line-height:.98;color:#fff}.songCard blockquote{font-family:Georgia,serif;font-size:25px;line-height:1.35;margin:28px 0;color:#fff5ee}.songCard small{font-weight:900;letter-spacing:.12em}.lyrics{background:#f7f2e9;border:1px solid #ad9e8c;padding:30px}.lyrics p{font-family:Georgia,serif;font-size:22px;line-height:1.64;margin:0;color:#2b3137}.lyrics p+p{margin-top:18px}
        .final{display:grid;grid-template-columns:1fr auto;gap:28px;align-items:center}.final h2{font-size:clamp(48px,8vw,94px);line-height:.9}.final h2 span{color:#e85c10}.badge{width:190px;height:190px;border-radius:50%;background:#111922;color:#fff;display:grid;place-items:center;text-align:center;font-weight:950;letter-spacing:.08em;border:10px solid #e85c10}
        footer{padding:34px 0 58px;font-size:13px;color:#555b60;display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap}
        @media(max-width:780px){
          .shell{padding:0 16px}.nav{height:68px}.hero{grid-template-columns:1fr;padding:44px 0 54px;gap:28px}.visual{min-height:470px;box-shadow:10px 10px 0 #e85c10}.visualText{inset:auto 20px 22px}.visualText strong{font-size:34px}.storyGrid,.music,.final{grid-template-columns:1fr}.rules{grid-template-columns:1fr}.dark{margin:0 -16px;padding-left:16px;padding-right:16px}.timelineItem{grid-template-columns:1fr;gap:7px}.statement{padding:28px 22px}.copy{font-size:16px}.badge{width:150px;height:150px}.sectionTitle{font-size:43px}section{padding:52px 0}.songCard{min-height:360px}}
      `}</style>

      <div className="page">
        <div className="shell">
          <nav className="nav">
            <a className="brand" href="/"><span>NULL</span>WORKS FIELD NOTE</a>
            <a className="back" href="/"><ArrowLeft size={16}/> Portfolio</a>
          </nav>

          <header className="hero">
            <div>
              <div className="kicker"><ShieldAlert size={17}/> Dangerous tool. Serious operator.</div>
              <h1>Still <span>starts.</span></h1>
              <p className="lead">A chainsaw is dangerous. In the right hands, holy shit, it is powerful.</p>
              <p className="copy">The same is true of AI. The important question is not whether the tool can cause damage. It can. The question is whether the person holding it understands the work, the risk, the boundary, and the consequence.</p>
              <div className="actions">
                <a className="button primary" href="#song"><Play size={17}/> Hear the song</a>
                <a className="button secondary" href="#proof"><ArrowRight size={17}/> See the receipt</a>
              </div>
            </div>
            <div className="visual" role="img" aria-label="They Don't Make Them Like Us Anymore chainsaw song artwork">
              <div className="visualText"><small>OLD STEEL // NEW TOOL</small><strong>They Don’t Make Them Like Us Anymore</strong><span>Dad’s old orange Stihl. Beat up, inherited, heavy, loud—and still ready when there is work at the door.</span></div>
            </div>
          </header>

          <section>
            <div className="statement">The danger is real. <em>So is the leverage.</em></div>
          </section>

          <section>
            <div className="storyGrid">
              <div className="legacyCard"><Hammer size={34}/><h3>Handed down</h3><p>This old Stihl came from my dad. It may be older than I am. The handle is worn, the bar is scarred, and it takes a minute to start—but it still understands work.</p></div>
              <div><p className="eyebrow">THE POINT IS BASIC</p><h2 className="sectionTitle">A tool does not become safe by becoming weak.</h2><p className="copy">A chainsaw is not valuable because it is harmless. It is valuable because it concentrates force. That is exactly why the operator matters.</p><p className="copy">AI concentrates cognitive and production force. Used carelessly, it can multiply bad decisions, generate endless patches, and make a mess at terrifying speed. Used deliberately, it can compress months of discovery, prototyping, comparison, and coordination into days or hours.</p></div>
            </div>
          </section>

          <section>
            <p className="eyebrow">WHAT KEEPS THE WHEELS ATTACHED</p><h2 className="sectionTitle">Not fear. Operating discipline.</h2>
            <div className="rules">{operatingRules.map(([title,body])=><div className="rule" key={title}><Wrench size={24}/><strong>{title}</strong><p>{body}</p></div>)}</div>
          </section>

          <section id="proof" className="dark">
            <p className="eyebrow">A WORKING RECEIPT</p><h2 className="sectionTitle">LenderFlow did not begin as a demo.</h2><p className="copy">It began with a real broker, a real workflow, and a forward-deployed loop. The software was the tool. Domain expertise, correction, testing, and Human Authority made it useful.</p>
            <div className="timeline">{lenderFlow.map(([time,event])=><div className="timelineItem" key={time}><strong>{time}</strong><span>{event}</span></div>)}</div>
            <div className="proofFooter"><span><CheckCircle2 size={18}/> Live, used, and still running.</span><a className="button primary" href={LENDERFLOW_URL} target="_blank" rel="noreferrer">Open LenderFlow <ExternalLink size={16}/></a></div>
          </section>

          <section id="song">
            <div className="music">
              <div className="songCard"><div><small>NULLWORKS // FIELD SONG</small><h3>They Don’t Make Them Like Us Anymore</h3><blockquote>“It leaks a little. So do I. It smokes too much. Same. It takes a minute to start. Join the club.”</blockquote></div><a className="button secondary" href={SUNO_URL} target="_blank" rel="noreferrer"><Music2 size={17}/> Open the song on Suno</a></div>
              <div className="lyrics"><p>Old steel heart and a smoke-stained roar.</p><p>Too much weight. Too much soul. Too damn stubborn to do what we are told.</p><p>Old saw. Old man. Still starts.</p><p><strong>Most days.</strong></p></div>
            </div>
          </section>

          <section>
            <div className="final"><div><p className="eyebrow">THE WHOLE ARGUMENT</p><h2>A tool is only as reckless—or as useful—as the system and operator around it. <span>Use it well.</span></h2></div><div className="badge"><Gauge size={42}/><span>POWER<br/>WITH<br/>CONTROL</span></div></div>
          </section>

          <footer><span>© 2026 Mason Perry · NULLWORKS</span><span><UserRoundCheck size={14}/> Human Authority final. Tool claims require receipts.</span></footer>
        </div>
      </div>
    </main>
  );
}
