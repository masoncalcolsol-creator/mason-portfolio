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
  UserRoundCheck,
  Wrench,
} from "lucide-react";
import { chainsawPhotoCount } from "./photo-manifest";

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
        body{margin:0;background:#e9dfcf;color:#101820}
        a{color:inherit}
        .page{min-height:100vh;background:radial-gradient(circle at 84% 0%,rgba(216,77,0,.10),transparent 25%),linear-gradient(180deg,#f4ecdf 0%,#dfd2be 100%);font-family:Arial,Helvetica,sans-serif;color:#101820}
        .shell{width:min(1120px,100%);margin:auto;padding:0 24px}
        .nav{height:76px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #725f49;color:#101820}
        .brand{font-weight:950;letter-spacing:.15em;text-decoration:none;font-size:14px;color:#101820}.brand span{color:#c84400}
        .back{display:inline-flex;align-items:center;gap:8px;text-decoration:none;font-size:13px;font-weight:900;color:#101820}
        .hero{display:grid;grid-template-columns:1.05fr .95fr;gap:42px;align-items:center;padding:68px 0 74px;border-bottom:1px solid #87745e}
        .heroCopy{background:#fffaf2;border:1px solid #806c54;padding:34px;box-shadow:10px 10px 0 rgba(200,68,0,.15);color:#101820}
        .kicker{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:950;letter-spacing:.14em;text-transform:uppercase;color:#8d2e00}
        h1,h2,h3{margin:0;color:#101820;letter-spacing:-.045em}
        h1{font-size:clamp(58px,9vw,108px);line-height:.86;margin-top:22px}
        h1 span{display:block;color:#c84400}
        .lead{font-family:Georgia,serif;font-size:clamp(28px,4vw,42px);line-height:1.23;margin:28px 0 0;color:#101820!important;font-weight:700;text-shadow:none!important;opacity:1!important}
        .copy{font-size:18px;line-height:1.78;color:#20262c!important;max-width:760px;opacity:1!important;text-shadow:none!important}
        .heroCopy .copy{margin-bottom:0;color:#20262c!important}
        .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
        .button{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:15px 18px;text-decoration:none;font-weight:950;border:1px solid #101820;text-transform:uppercase;letter-spacing:.04em;font-size:12px}
        .primary{background:#d84d00;color:#fff;border-color:#923300}.secondary{background:#101820;color:#fff;border-color:#101820}.ghost{background:#fffaf2;color:#101820;border-color:#62513d}
        .visual{position:relative;min-height:590px;background:#121922;border:1px solid #101820;box-shadow:18px 18px 0 #d84d00;overflow:hidden}
        .visual:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(9,14,20,.04),rgba(9,14,20,.88)),url("${SUNO_PREVIEW}") center/cover no-repeat;filter:saturate(.80) contrast(1.12)}
        .visual.hasPhoto:before{background:linear-gradient(180deg,rgba(9,14,20,.03),rgba(9,14,20,.86)),url("/api/assets/chainsaw/0?v=mr-smith-v1") center/cover no-repeat;filter:saturate(.92) contrast(1.06)}
        .visualText{position:absolute;inset:auto 28px 30px;z-index:1;color:#fff}.visualText small{display:block;font-weight:950;letter-spacing:.14em;color:#ff9a60;margin-bottom:12px}.visualText strong{display:block;font-family:Georgia,serif;font-size:42px;line-height:1.02;color:#fff}.visualText span{display:block;margin-top:14px;color:#fff;line-height:1.5;text-shadow:0 1px 3px #000}
        section{padding:70px 0;border-bottom:1px solid #87745e}.eyebrow{font-size:12px;font-weight:950;letter-spacing:.17em;text-transform:uppercase;color:#8d2e00;margin-bottom:14px}.sectionTitle{font-size:clamp(42px,6vw,76px);line-height:1;margin-bottom:24px;color:#101820}
        .statement{background:#101820;color:#fff;padding:42px;border-left:8px solid #d84d00;font-family:Georgia,serif;font-size:clamp(34px,5vw,64px);line-height:1.12}.statement em{color:#ff8a4a;font-style:normal}
        .photoGallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.photoFrame{margin:0;background:#101820;border:1px solid #101820;padding:10px;box-shadow:10px 10px 0 #d84d00}.photoFrame:first-child{grid-column:1/-1}.photoFrame img{display:block;width:100%;height:100%;max-height:760px;min-height:280px;object-fit:cover;background:#101820}.photoFrame:first-child img{aspect-ratio:4/5}.photoFrame figcaption{padding:13px 8px 4px;color:#fff;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .storyGrid{display:grid;grid-template-columns:.9fr 1.1fr;gap:28px;align-items:start}.legacyCard{background:#fff8ee;border:1px solid #6d5f4e;padding:28px;color:#101820;box-shadow:8px 8px 0 rgba(216,77,0,.18)}.legacyCard svg{color:#d84d00}.legacyCard h3{font-size:34px;margin:18px 0 12px;color:#101820}.legacyCard p{margin:0;color:#20262c;line-height:1.72}
        .rules{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:28px}.rule{background:#fffaf3;border:1px solid #766957;padding:24px;color:#101820}.rule svg{color:#d84d00}.rule strong{display:block;font-size:22px;margin:12px 0 10px;color:#101820}.rule p{margin:0;line-height:1.7;color:#20262c}
        .dark{background:#101820;color:#fff;margin:0 -24px;padding-left:24px;padding-right:24px}.dark .sectionTitle,.dark h3{color:#fff}.dark .eyebrow{color:#ff8a4a}.dark .copy{color:#eef2f5!important}.timeline{display:grid;gap:12px;margin-top:30px}.timelineItem{display:grid;grid-template-columns:180px 1fr;gap:22px;padding:20px 0;border-top:1px solid #52606c}.timelineItem strong{color:#ff9a60;font-size:18px}.timelineItem span{color:#fff;line-height:1.62}.proofFooter{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-top:28px;padding-top:24px;border-top:1px solid #52606c;flex-wrap:wrap}.proofFooter>span{display:inline-flex;align-items:center;gap:8px;color:#fff;font-weight:850}
        .music{display:grid;grid-template-columns:.95fr 1.05fr;gap:28px;align-items:stretch}.songCard{background:#d84d00;color:#fff;padding:34px;display:flex;flex-direction:column;justify-content:space-between;min-height:430px;border:1px solid #963400}.songCard h3{font-family:Georgia,serif;font-size:clamp(42px,6vw,70px);line-height:.98;color:#fff}.songCard blockquote{font-family:Georgia,serif;font-size:25px;line-height:1.35;margin:28px 0;color:#fff}.songCard small{font-weight:900;letter-spacing:.12em;color:#fff}.lyrics{background:#fffaf3;border:1px solid #766957;padding:30px;color:#101820}.lyrics p{font-family:Georgia,serif;font-size:22px;line-height:1.64;margin:0;color:#20262c}.lyrics p+p{margin-top:18px}
        .final{display:grid;grid-template-columns:1fr auto;gap:28px;align-items:center}.final h2{font-size:clamp(48px,8vw,94px);line-height:.9;color:#101820}.final h2 span{color:#c84400}.badge{width:190px;height:190px;border-radius:50%;background:#101820;color:#fff;display:grid;place-items:center;text-align:center;font-weight:950;letter-spacing:.08em;border:10px solid #d84d00}
        footer{padding:34px 0 58px;font-size:13px;color:#20262c;display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap}footer span{display:inline-flex;align-items:center;gap:7px}
        @media(max-width:780px){
          .shell{padding:0 16px}.nav{height:68px}.hero{grid-template-columns:1fr;padding:34px 0 54px;gap:28px}.heroCopy{padding:24px 20px;box-shadow:7px 7px 0 rgba(200,68,0,.16)}.heroCopy,.heroCopy *{opacity:1!important}.heroCopy .lead{color:#101820!important;font-size:31px}.heroCopy .copy{color:#20262c!important;font-size:16px}.visual{min-height:470px;box-shadow:10px 10px 0 #d84d00}.visualText{inset:auto 20px 22px}.visualText strong{font-size:34px}.photoGallery{grid-template-columns:1fr}.photoFrame:first-child{grid-column:auto}.photoFrame img,.photoFrame:first-child img{min-height:0;aspect-ratio:auto;max-height:none}.storyGrid,.music,.final{grid-template-columns:1fr}.rules{grid-template-columns:1fr}.dark{margin:0 -16px;padding-left:16px;padding-right:16px}.timelineItem{grid-template-columns:1fr;gap:7px}.statement{padding:28px 22px}.copy{font-size:16px}.badge{width:150px;height:150px}.sectionTitle{font-size:43px}section{padding:52px 0}.songCard{min-height:360px}.button{width:100%}.actions{display:grid;grid-template-columns:1fr}.nav .back{font-size:0}.nav .back svg{width:20px;height:20px}}
      `}</style>

      <div className="page">
        <div className="shell">
          <nav className="nav">
            <a className="brand" href="/"><span>NULL</span>WORKS FIELD NOTE</a>
            <a className="back" href="/"><ArrowLeft size={16}/> Portfolio</a>
          </nav>

          <header className="hero">
            <div className="heroCopy">
              <div className="kicker"><ShieldAlert size={17}/> Dangerous tool. Serious operator.</div>
              <h1>Still <span>starts.</span></h1>
              <p className="lead">A chainsaw is dangerous. In the right hands, holy shit, it is powerful.</p>
              <p className="copy">The same is true of AI. The important question is not whether the tool can cause damage. It can. The question is whether the person holding it understands the work, the risk, the boundary, and the consequence.</p>
              <div className="actions">
                <a className="button primary" href="#song"><Play size={17}/> Hear the song</a>
                <a className="button secondary" href="#proof"><ArrowRight size={17}/> See the receipt</a>
              </div>
            </div>
            <div className={`visual ${chainsawPhotoCount > 0 ? "hasPhoto" : ""}`} role="img" aria-label="Mason Perry with the inherited orange Stihl chainsaw">
              <div className="visualText"><small>OLD STEEL // NEW TOOL</small><strong>They Don’t Make Them Like Us Anymore</strong><span>Dad’s old orange Stihl. Beat up, inherited, heavy, loud—and still ready when there is work at the door.</span></div>
            </div>
          </header>

          <section>
            <div className="statement">The danger is real. <em>So is the leverage.</em></div>
          </section>

          {chainsawPhotoCount > 0 && (
            <section>
              <p className="eyebrow">THE ACTUAL TOOL // ACTUAL RECEIPTS</p>
              <h2 className="sectionTitle">Old steel. Real scars. Still working.</h2>
              <div className="photoGallery">
                {Array.from({ length: chainsawPhotoCount }, (_, index) => (
                  <figure className="photoFrame" key={index}>
                    <img src={`/api/assets/chainsaw/${index}?v=mr-smith-v1`} alt={`Inherited orange Stihl chainsaw field photo ${index + 1}`} />
                    <figcaption>{index === 0 ? "The operator and the inherited saw" : `Field receipt ${String(index + 1).padStart(2, "0")}`}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

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
