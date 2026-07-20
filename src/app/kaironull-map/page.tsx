import type { Metadata } from "next";
import {
  Activity,
  Archive,
  ArrowDown,
  BadgeCheck,
  Binary,
  BookOpenCheck,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Database,
  ExternalLink,
  Eye,
  FileCheck2,
  Fingerprint,
  Gauge,
  GitBranch,
  KeyRound,
  Layers3,
  LockKeyhole,
  Network,
  Radar,
  ScanLine,
  ShieldCheck,
  TriangleAlert,
  UserRoundCheck,
  Workflow,
  Wrench,
} from "lucide-react";
import OscilloscopeBackground from "../receipt-wallet/OscilloscopeBackground";

export const metadata: Metadata = {
  title: "KairoNull, Translated for Mason | NULLWORKS Study Map",
  description:
    "A public-source, NULLWORKS-style comprehension map of KairoNull's AI governance evidence infrastructure before an independent pressure test.",
  robots: {
    index: false,
    follow: false,
  },
};

const pipeline = [
  {
    number: "01",
    label: "OBSERVE",
    icon: Eye,
    title: "Catch the AI decision while it is happening.",
    body:
      "KairoNull sits beside an existing AI call and captures the input, output, model or version, timestamp, and decision context at the point of generation. The stated goal is to avoid rebuilding the story later from partial logs.",
    plain: "See the event.",
  },
  {
    number: "02",
    label: "EVALUATE",
    icon: BookOpenCheck,
    title: "Check the event against the rule that was active then.",
    body:
      "The captured event is evaluated against named, versioned governance policies or invariants. The record should show which rule applied, what was checked, and whether the event passed or failed.",
    plain: "Name the rule.",
  },
  {
    number: "03",
    label: "RECORD",
    icon: GitBranch,
    title: "Bind the event into an ordered, tamper-evident chain.",
    body:
      "The event becomes a ledger entry. Its content is hashed with the previous record, and the public materials say an RFC3161 timestamp binds the record to an independently issued time. Changing an earlier record should break the chain after it.",
    plain: "Seal the receipt.",
  },
  {
    number: "04",
    label: "PROVE",
    icon: FileCheck2,
    title: "Export something another party can verify without trusting the vendor.",
    body:
      "The intended output is an ordered evidence package for auditors, regulators, courts, boards, or internal review. The key claim is that integrity can be checked with standard tools such as OpenSSL without access to KairoNull's backend.",
    plain: "Hand over proof.",
  },
];

const dictionary = [
  {
    term: "AI SYSTEM",
    meaning: "The model, agent, workflow, or application making the original decision.",
    icon: BrainCircuit,
  },
  {
    term: "UMBRA TRUST PROTOCOL",
    meaning: "KairoNull's evidence layer around the AI decision path. Think wrapper, evaluator, recorder, and exporter.",
    icon: Layers3,
  },
  {
    term: "POLICY / INVARIANT",
    meaning: "The named, versioned rule the captured decision is evaluated against.",
    icon: ShieldCheck,
  },
  {
    term: "LEDGER ENTRY",
    meaning: "One ordered evidence record containing the decision event and its integrity data.",
    icon: Database,
  },
  {
    term: "HASH CHAIN",
    meaning: "Each record depends on the previous record's hash, so retrospective edits become detectable.",
    icon: GitBranch,
  },
  {
    term: "RFC3161 TIMESTAMP",
    meaning: "A third-party cryptographic time assertion bound to the record, rather than the application merely claiming a time.",
    icon: Clock3,
  },
  {
    term: "AUDIT PACKAGE",
    meaning: "The exported evidence bundle supplied to someone who needs to inspect or challenge the decision history.",
    icon: Archive,
  },
  {
    term: "INDEPENDENT VERIFICATION",
    meaning: "A reviewer checks record integrity without logging into or trusting KairoNull's own systems.",
    icon: Fingerprint,
  },
];

const notThis = [
  {
    title: "Not the AI model",
    body: "It does not replace the model that produces the decision. It observes and records the decision path around it.",
    icon: BrainCircuit,
  },
  {
    title: "Not a policy library alone",
    body: "Policies matter, but the central product claim is runtime evidence that a named policy was actually applied to a specific event.",
    icon: BookOpenCheck,
  },
  {
    title: "Not general observability",
    body: "Observability helps engineers debug performance. This is positioned for legal, regulatory, and audit defensibility of individual AI decisions.",
    icon: Activity,
  },
  {
    title: "Not proof the decision was good",
    body: "A valid chain can prove a record was preserved. The pressure test still has to ask whether the governing rule, authority, inputs, exceptions, and outcome were valid.",
    icon: TriangleAlert,
  },
];

const sectors = [
  ["FINANCIAL SERVICES", "Credit, lending, fraud, AML/KYC and other decisions where a regulator may ask what happened and which rule governed it."],
  ["INSURANCE", "Claims, underwriting and pricing decisions that may later be disputed by customers, auditors, courts, or regulators."],
  ["GOVERNMENT", "Eligibility, benefits, screening and public-service decisions requiring independent oversight and possible on-premise deployment."],
  ["ENTERPRISE", "Any organisation using AI for decisions carrying legal, fiduciary, financial, employment, or reputational consequences."],
];

const deployment = [
  {
    number: "01",
    title: "Evidence assessment",
    body: "Inventory the AI systems, map regulatory obligations, identify what evidence exists now, and write the gap and remediation path.",
  },
  {
    number: "02",
    title: "Standard deployment",
    body: "Wrap selected AI calls, configure policies, produce the continuous ledger, and enable audit export and independent verification.",
  },
  {
    number: "03",
    title: "Enterprise governance infrastructure",
    body: "Extend the evidence layer across multiple systems or business units with custom invariants, governance reporting, regulatory monitoring, and audit support.",
  },
];

const pressureQuestions = [
  {
    number: "Q1",
    title: "Where was authority actually exercised?",
    prompt:
      "Who can approve the integration, define or change a policy, override the model, bypass the wrapper, accept a failed gate, or decide that an evidence package is complete?",
    inspect: [
      "Human approval points",
      "Policy ownership and version authority",
      "Override and exception permissions",
      "Who signs the final audit output",
    ],
    icon: UserRoundCheck,
  },
  {
    number: "Q2",
    title: "What evidence existed at the moment of decision?",
    prompt:
      "Which exact inputs, model version, prompt or template, contextual values, policy version, evaluation result, timestamp, and prior-chain reference existed before anyone knew the decision would be challenged?",
    inspect: [
      "Contemporaneous capture",
      "Input and output completeness",
      "Model, prompt and policy versioning",
      "External timestamp binding",
    ],
    icon: Radar,
  },
  {
    number: "Q3",
    title: "Which exceptions or workarounds were used?",
    prompt:
      "What happens during outages, retries, asynchronous calls, manual decisions, batch processing, policy-engine failure, missing fields, clock problems, or deliberate bypass?",
    inspect: [
      "Fail-open versus fail-closed behavior",
      "Uninstrumented paths",
      "Retry and duplicate handling",
      "Manual and emergency workflows",
    ],
    icon: Wrench,
  },
  {
    number: "Q4",
    title: "What trace survived afterward?",
    prompt:
      "Can an independent reviewer reconstruct the path after staff turnover, vendor loss, service shutdown, key rotation, migration, retention expiry, or a hostile legal challenge?",
    inspect: [
      "Vendor-independent verification",
      "Key and certificate survival",
      "Ordered export completeness",
      "Retention and chain continuity",
    ],
    icon: Fingerprint,
  },
];

const claimsToTest = [
  "Every in-scope AI decision is captured continuously, without silent gaps.",
  "A single call can be instrumented in under 60 seconds and a standard deployment can go live in one to five days.",
  "The evidence layer can wrap existing systems without changing the model layer or creating meaningful latency.",
  "Each record is actually bound to the previous record and to a valid RFC3161 timestamp token.",
  "A reviewer can verify an exported record with standard OpenSSL tools and no KairoNull account or backend access.",
  "The ledger can remain in the customer's environment across cloud, private-cloud, hybrid, or on-premise deployment.",
  "Policy identity, policy version, evaluation result, exceptions, retries, and overrides survive in the record.",
  "The exported package remains useful after KairoNull, its staff, or its infrastructure is unavailable.",
];

const sourceLinks = [
  ["Original homepage", "https://kaironull.com/"],
  ["Solutions by sector", "https://kaironull.com/solutions"],
  ["Deployment models", "https://kaironull.com/how-we-deploy"],
  ["Verification methodology", "https://kaironull.com/how-verification-works"],
  ["Public verification tool", "https://kaironull.com/verify"],
  ["Press and stage facts", "https://kaironull.com/press"],
];

export default function KairoNullMapPage() {
  return (
    <main className="kn-page">
      <OscilloscopeBackground />
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #040806; }
        .kn-page {
          --phosphor: #91ff4d;
          --phosphor-soft: rgba(145,255,77,.14);
          --amber: #ffb347;
          --amber-soft: rgba(255,179,71,.14);
          --paper: #eef6e9;
          --muted: #a8b7aa;
          --panel: rgba(5,12,8,.88);
          --line: rgba(207,255,188,.15);
          min-height: 100vh;
          position: relative;
          isolation: isolate;
          overflow-x: hidden;
          color: var(--paper);
          background:
            radial-gradient(circle at 12% 8%, rgba(145,255,77,.10), transparent 28rem),
            radial-gradient(circle at 88% 31%, rgba(255,179,71,.08), transparent 31rem),
            linear-gradient(180deg, rgba(4,8,6,.82), rgba(4,8,6,.96));
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .kn-page::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: .18;
          background-image:
            linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 46px 46px;
          mask-image: linear-gradient(to bottom, #000, transparent 90%);
        }
        .kn-page > *:not(style) { position: relative; z-index: 3; }
        .shell { width: min(1160px, calc(100% - 34px)); margin: 0 auto; }
        .nav {
          position: sticky;
          top: 0;
          z-index: 90 !important;
          border-bottom: 1px solid var(--line);
          background: rgba(4,8,6,.84);
          backdrop-filter: blur(18px);
        }
        .nav-inner { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
        .brand { color: #fff; text-decoration: none; font-weight: 950; letter-spacing: .13em; font-size: 12px; }
        .brand span { color: var(--phosphor); }
        .nav-links { display: flex; gap: 7px; flex-wrap: wrap; justify-content: flex-end; }
        .nav-links a { color: #c5d2c4; text-decoration: none; border: 1px solid rgba(255,255,255,.14); border-radius: 999px; padding: 8px 10px; font-size: 11px; font-weight: 850; }
        .nav-links a:hover { color: #040806; background: var(--phosphor); border-color: var(--phosphor); }
        .hero { min-height: calc(100svh - 64px); display: grid; align-items: center; border-bottom: 1px solid var(--line); }
        .hero-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 28px; align-items: end; padding: 82px 0 70px; }
        .eyebrow { display: flex; align-items: center; gap: 9px; color: var(--phosphor); font: 900 11px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .17em; text-transform: uppercase; }
        h1 { margin: 18px 0 0; max-width: 900px; font-size: clamp(58px, 10vw, 128px); line-height: .82; letter-spacing: -.075em; }
        h1 span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(238,246,233,.62); }
        .lead { max-width: 820px; margin: 28px 0 0; color: #c7d3c5; font-size: clamp(20px, 2.35vw, 28px); line-height: 1.5; }
        .lead strong { color: var(--amber); }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 30px; }
        .button { display: inline-flex; align-items: center; justify-content: center; gap: 9px; min-height: 48px; padding: 13px 17px; border-radius: 999px; background: var(--phosphor); color: #041006; text-decoration: none; font-weight: 950; }
        .button.secondary { color: var(--phosphor); background: rgba(4,8,6,.48); border: 1px solid rgba(145,255,77,.4); }
        .status-card { border: 1px solid rgba(145,255,77,.34); border-radius: 28px; padding: 25px; background: linear-gradient(145deg, rgba(145,255,77,.105), rgba(255,179,71,.035), rgba(5,12,8,.84)); box-shadow: 0 34px 100px rgba(0,0,0,.44); }
        .status-chip { display: inline-flex; gap: 8px; align-items: center; color: var(--phosphor); border: 1px solid rgba(145,255,77,.27); border-radius: 999px; padding: 8px 10px; font: 900 10px ui-monospace, monospace; letter-spacing: .12em; }
        .status-card strong { display: block; margin-top: 21px; font-size: clamp(35px, 5vw, 58px); line-height: .95; letter-spacing: -.055em; }
        .status-card p { color: #b8c5b7; line-height: 1.65; }
        .signal { margin-top: 22px; border-top: 1px solid rgba(255,255,255,.11); padding-top: 19px; font: 800 12px/1.65 ui-monospace, monospace; color: #819181; }
        .signal b { color: var(--amber); }
        .quick-map { padding: 72px 0; border-bottom: 1px solid var(--line); }
        .section-label { color: var(--phosphor); font: 900 11px ui-monospace, monospace; letter-spacing: .16em; text-transform: uppercase; }
        .quick-map h2, .section h2 { margin: 12px 0 26px; max-width: 980px; font-size: clamp(42px, 7vw, 84px); line-height: .92; letter-spacing: -.06em; }
        .map-strip { display: grid; grid-template-columns: repeat(7, auto); gap: 8px; align-items: center; overflow-x: auto; padding: 18px 2px 13px; scrollbar-width: thin; }
        .map-node { min-width: 155px; min-height: 118px; display: grid; align-content: space-between; border: 1px solid rgba(255,255,255,.14); border-radius: 20px; padding: 15px; background: rgba(5,12,8,.77); }
        .map-node b { color: var(--amber); font: 900 10px ui-monospace, monospace; letter-spacing: .12em; }
        .map-node span { font-size: 16px; font-weight: 850; line-height: 1.2; }
        .map-arrow { color: var(--phosphor); }
        .translation { margin-top: 27px; border-left: 4px solid var(--amber); padding: 20px 22px; background: rgba(255,179,71,.07); color: #d6dfd3; font-size: clamp(20px, 2.3vw, 27px); line-height: 1.55; }
        .translation strong { color: var(--amber); }
        .process { border-bottom: 1px solid var(--line); }
        .process-intro { padding: 80px 0 34px; }
        .process-intro p { max-width: 840px; color: #afbcad; font-size: 19px; line-height: 1.7; }
        .step-stack { padding-bottom: 68px; }
        .step { min-height: 72svh; display: grid; align-items: center; padding: 28px 0; }
        .step:nth-child(even) .step-card { margin-left: auto; }
        .step-card { width: min(670px, 100%); border: 1px solid rgba(255,255,255,.16); border-radius: 29px; padding: clamp(24px, 4vw, 38px); background: rgba(5,12,8,.91); backdrop-filter: blur(15px); box-shadow: 0 30px 90px rgba(0,0,0,.43); }
        .step-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 18px; }
        .step-number { color: var(--phosphor); font: 950 clamp(48px, 8vw, 86px)/.8 ui-monospace, monospace; }
        .step-icon { width: 46px; height: 46px; display: grid; place-items: center; border: 1px solid rgba(255,179,71,.38); border-radius: 50%; color: var(--amber); background: rgba(255,179,71,.08); }
        .step-label { margin-top: 23px; color: var(--amber); font: 900 11px ui-monospace, monospace; letter-spacing: .17em; }
        .step-card h3 { margin: 10px 0; font-size: clamp(35px, 5vw, 58px); line-height: .94; letter-spacing: -.052em; }
        .step-card p { color: #b9c4b7; font-size: 18px; line-height: 1.67; }
        .plain { margin-top: 22px; padding-top: 19px; border-top: 1px solid rgba(255,255,255,.11); color: var(--phosphor); font: 950 15px ui-monospace, monospace; letter-spacing: .1em; text-transform: uppercase; }
        .section { padding: 86px 0; border-bottom: 1px solid var(--line); }
        .intro-copy { max-width: 860px; color: #b6c2b4; font-size: 19px; line-height: 1.7; }
        .dictionary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 34px; }
        .term { min-height: 225px; border: 1px solid rgba(255,255,255,.14); border-radius: 23px; padding: 19px; background: rgba(255,255,255,.025); }
        .term-icon { color: var(--phosphor); }
        .term b { display: block; margin-top: 40px; color: var(--amber); font: 900 11px ui-monospace, monospace; letter-spacing: .12em; }
        .term p { margin-bottom: 0; color: #c1cbc0; line-height: 1.52; }
        .not-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 13px; margin-top: 30px; }
        .not-card { border-left: 4px solid var(--amber); padding: 22px; background: rgba(255,255,255,.032); }
        .not-card svg { color: var(--amber); }
        .not-card h3 { margin: 18px 0 8px; font-size: 27px; }
        .not-card p { margin: 0; color: #b8c3b6; line-height: 1.62; }
        .example-shell { border: 1px solid rgba(145,255,77,.28); border-radius: 28px; overflow: hidden; background: rgba(3,9,6,.88); }
        .example-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 20px; border-bottom: 1px solid rgba(255,255,255,.12); }
        .example-head strong { font-size: 24px; }
        .live { display: inline-flex; align-items: center; gap: 8px; color: var(--phosphor); font: 900 10px ui-monospace, monospace; letter-spacing: .12em; }
        .live::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--phosphor); box-shadow: 0 0 15px var(--phosphor); }
        .example-flow { display: grid; grid-template-columns: repeat(5, 1fr); }
        .example-cell { min-height: 190px; padding: 20px; border-right: 1px solid rgba(255,255,255,.10); }
        .example-cell:last-child { border-right: 0; }
        .example-cell b { color: var(--amber); font: 900 10px ui-monospace, monospace; letter-spacing: .11em; }
        .example-cell h3 { margin: 18px 0 8px; font-size: 22px; }
        .example-cell p { color: #aebbad; line-height: 1.5; }
        .sector-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .sector { min-height: 190px; border: 1px solid rgba(255,255,255,.13); border-radius: 23px; padding: 21px; background: linear-gradient(145deg, rgba(145,255,77,.055), rgba(255,179,71,.025)); }
        .sector b { color: var(--phosphor); font: 900 11px ui-monospace, monospace; letter-spacing: .13em; }
        .sector p { color: #bac5b8; font-size: 17px; line-height: 1.6; }
        .deployment-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 13px; }
        .deploy-card { border: 1px solid rgba(255,179,71,.27); border-radius: 25px; padding: 23px; background: rgba(255,179,71,.045); }
        .deploy-card strong { color: var(--amber); font: 950 49px/.85 ui-monospace, monospace; }
        .deploy-card h3 { font-size: 28px; margin: 22px 0 10px; }
        .deploy-card p { color: #b5c0b3; line-height: 1.62; }
        .pressure { background: linear-gradient(180deg, rgba(7,17,10,.83), rgba(4,8,6,.96)); }
        .pressure-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .question { border: 1px solid rgba(145,255,77,.23); border-radius: 27px; padding: 24px; background: rgba(5,12,8,.83); }
        .q-top { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; }
        .q-number { color: var(--phosphor); font: 950 47px/.9 ui-monospace, monospace; }
        .q-icon { color: var(--amber); }
        .question h3 { font-size: clamp(28px, 4vw, 43px); line-height: 1; letter-spacing: -.04em; margin: 25px 0 12px; }
        .question > p { color: #bcc7ba; line-height: 1.65; }
        .inspect { display: grid; gap: 7px; margin-top: 20px; }
        .inspect span { display: flex; align-items: center; gap: 9px; color: #d1d9cf; font-size: 14px; }
        .inspect svg { color: var(--phosphor); flex: 0 0 auto; }
        .claim-list { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 30px; }
        .claim { display: flex; align-items: flex-start; gap: 11px; border: 1px solid rgba(255,255,255,.12); border-radius: 18px; padding: 16px; color: #c5cec3; line-height: 1.48; background: rgba(255,255,255,.025); }
        .claim svg { color: var(--amber); flex: 0 0 auto; margin-top: 2px; }
        .public-state { border: 1px solid rgba(255,179,71,.34); border-radius: 28px; padding: clamp(24px, 5vw, 44px); background: linear-gradient(145deg, rgba(255,179,71,.10), rgba(145,255,77,.045)); }
        .public-state strong { display: block; max-width: 940px; font-size: clamp(38px, 6vw, 72px); line-height: .94; letter-spacing: -.055em; }
        .public-state p { max-width: 850px; color: #c0c9be; font-size: 18px; line-height: 1.67; }
        .truth-boundary { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,.12); color: #829182; font-size: 14px; line-height: 1.65; }
        .source-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 28px; }
        .source-link { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 74px; border: 1px solid rgba(255,255,255,.13); border-radius: 18px; padding: 16px; color: #d4dcd2; text-decoration: none; font-weight: 850; background: rgba(255,255,255,.025); }
        .source-link:hover { border-color: rgba(145,255,77,.45); color: var(--phosphor); }
        footer { padding: 42px 0 72px; color: #7f8c7e; font-size: 14px; line-height: 1.7; }
        footer a { color: var(--phosphor); }
        @media (max-width: 940px) {
          .hero-grid { grid-template-columns: 1fr; align-items: start; }
          .dictionary { grid-template-columns: 1fr 1fr; }
          .example-flow { grid-template-columns: 1fr; }
          .example-cell { border-right: 0; border-bottom: 1px solid rgba(255,255,255,.10); }
          .example-cell:last-child { border-bottom: 0; }
          .deployment-grid { grid-template-columns: 1fr; }
          .source-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 680px) {
          .shell { width: min(100% - 24px, 1160px); }
          .nav-inner { min-height: 58px; align-items: flex-start; padding: 10px 0; }
          .nav-links { gap: 5px; }
          .nav-links a { font-size: 9px; padding: 6px 8px; }
          .hero-grid { padding: 54px 0 50px; }
          h1 { font-size: clamp(54px, 17vw, 80px); }
          .lead { font-size: 20px; }
          .quick-map, .section { padding: 61px 0; }
          .process-intro { padding-top: 61px; }
          .step { min-height: auto; padding: 17px 0; }
          .step-card { margin: 0 !important; }
          .dictionary, .not-grid, .sector-grid, .pressure-grid, .claim-list, .source-grid { grid-template-columns: 1fr; }
          .term { min-height: 190px; }
          .example-head { align-items: flex-start; flex-direction: column; }
        }
      `}</style>

      <nav className="nav" aria-label="KairoNull comprehension map navigation">
        <div className="shell nav-inner">
          <a className="brand" href="/">
            NULLWORKS <span>FIELD TRANSLATION</span>
          </a>
          <div className="nav-links">
            <a href="#loop">The loop</a>
            <a href="#dictionary">Dictionary</a>
            <a href="#pressure">Pressure test</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="shell hero-grid">
          <div>
            <div className="eyebrow">
              <ScanLine size={15} />
              PUBLIC-SOURCE STUDY MAP // NOT A SALES PAGE
            </div>
            <h1>
              KairoNull,
              <span>translated for Mason.</span>
            </h1>
            <p className="lead">
              The clean mental model: <strong>a flight recorder, policy gate, evidence seal, and export system around AI decisions.</strong>
            </p>
            <div className="hero-actions">
              <a className="button" href="#map">
                See the ten-second map <ArrowDown size={17} />
              </a>
              <a className="button secondary" href="https://kaironull.com/" target="_blank" rel="noreferrer">
                Open the original site <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <aside className="status-card">
            <span className="status-chip">
              <BadgeCheck size={14} />
              PUBLIC MATERIALS SNAPSHOT // 20 JUL 2026
            </span>
            <strong>The website speaks to regulators. This page follows the machine.</strong>
            <p>
              It reorganizes KairoNull's public claims into a literal runtime path: what enters, what the system does, what survives, who can verify it, and what Mason should try to break on Friday.
            </p>
            <div className="signal">
              <b>SCOPE:</b> public website only. No confidential KairoNull material. No NULLWORKS proprietary method disclosed.
            </div>
          </aside>
        </div>
      </header>

      <section className="quick-map" id="map">
        <div className="shell">
          <div className="section-label">The entire product in one line</div>
          <h2>One AI call goes in. A verifiable decision receipt comes out.</h2>
          <div className="map-strip" aria-label="KairoNull simplified system flow">
            {[
              ["INPUT", "AI request + context"],
              ["CAPTURE", "Model output + metadata"],
              ["GATE", "Named policy evaluation"],
              ["SEAL", "Hash chain + timestamp"],
              ["STORE", "Ordered evidence ledger"],
              ["EXPORT", "Audit evidence bundle"],
              ["VERIFY", "Independent integrity check"],
            ].map(([label, text], index, all) => (
              <div key={label} style={{ display: "contents" }}>
                <div className="map-node">
                  <b>{label}</b>
                  <span>{text}</span>
                </div>
                {index < all.length - 1 ? <ArrowDown className="map-arrow" size={22} style={{ transform: "rotate(-90deg)" }} /> : null}
              </div>
            ))}
          </div>
          <div className="translation">
            <strong>Goblin translation:</strong> The AI still does the work. KairoNull tries to make sure nobody can quietly rewrite the story of what the AI saw, which rule applied, what it produced, and when it happened.
          </div>
        </div>
      </section>

      <section className="process" id="loop">
        <div className="shell process-intro">
          <div className="section-label">Observe → Evaluate → Record → Prove</div>
          <h2>The four movements.</h2>
          <p>
            KairoNull calls this the Umbra Trust Protocol. The visual language on the original site is dense because it is selling evidentiary credibility. Mechanically, the public architecture resolves into four actions.
          </p>
        </div>
        <div className="step-stack">
          {pipeline.map((step) => {
            const Icon = step.icon;
            return (
              <article className="step" key={step.number}>
                <div className="shell">
                  <div className="step-card">
                    <div className="step-top">
                      <div className="step-number">{step.number}</div>
                      <div className="step-icon"><Icon size={23} /></div>
                    </div>
                    <div className="step-label">{step.label}</div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <div className="plain">{step.plain}</div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" id="dictionary">
        <div className="shell">
          <div className="section-label">Words on the site, translated</div>
          <h2>The noun decoder.</h2>
          <p className="intro-copy">
            These are the main objects moving through the architecture. Once the nouns stop sounding like governance fog, the product is easier to inspect.
          </p>
          <div className="dictionary">
            {dictionary.map((item) => {
              const Icon = item.icon;
              return (
                <article className="term" key={item.term}>
                  <Icon className="term-icon" size={25} />
                  <b>{item.term}</b>
                  <p>{item.meaning}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-label">Boundary conditions</div>
          <h2>What KairoNull is not.</h2>
          <div className="not-grid">
            {notThis.map((item) => {
              const Icon = item.icon;
              return (
                <article className="not-card" key={item.title}>
                  <Icon size={24} />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-label">Concrete example // synthetic</div>
          <h2>A loan decision, end to end.</h2>
          <div className="example-shell">
            <div className="example-head">
              <strong>Application #8821 // $45,000</strong>
              <span className="live">ILLUSTRATIVE EVENT</span>
            </div>
            <div className="example-flow">
              {[
                ["1. AI CALL", "The lender's AI receives the application and produces APPROVED with its model and context."],
                ["2. CAPTURE", "The wrapper captures the relevant input, output, model version, template, time, and identifiers."],
                ["3. POLICY", "The event is checked against the active credit, fairness, explainability, or risk rule set."],
                ["4. SEAL", "The record is chained to the prior record and bound to an external timestamp token."],
                ["5. CHALLENGE", "Months later, an auditor receives the package and verifies that the historical record was not quietly altered."],
              ].map(([title, body]) => (
                <article className="example-cell" key={title}>
                  <b>{title}</b>
                  <h3>{title.split(". ")[1]}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-label">Who the public site is speaking to</div>
          <h2>Anywhere an AI decision may have to survive a challenge.</h2>
          <div className="sector-grid">
            {sectors.map(([title, body]) => (
              <article className="sector" key={title}>
                <b>{title}</b>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-label">How KairoNull says customers enter</div>
          <h2>Assessment, deployment, or full infrastructure.</h2>
          <div className="deployment-grid">
            {deployment.map((item) => (
              <article className="deploy-card" key={item.number}>
                <strong>{item.number}</strong>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section pressure" id="pressure">
        <div className="shell">
          <div className="section-label">Friday pressure-test map</div>
          <h2>Do not review the marketing page. Follow one decision path.</h2>
          <p className="intro-copy">
            Dane agreed to a representative-path test. These four questions keep the session on actual execution rather than architecture theatre.
          </p>
          <div className="pressure-grid">
            {pressureQuestions.map((question) => {
              const Icon = question.icon;
              return (
                <article className="question" key={question.number}>
                  <div className="q-top">
                    <div className="q-number">{question.number}</div>
                    <Icon className="q-icon" size={28} />
                  </div>
                  <h3>{question.title}</h3>
                  <p>{question.prompt}</p>
                  <div className="inspect">
                    {question.inspect.map((item) => (
                      <span key={item}><CheckCircle2 size={15} /> {item}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-label">Public claims worth making concrete</div>
          <h2>What Mason should ask Dane to demonstrate.</h2>
          <div className="claim-list">
            {claimsToTest.map((claim) => (
              <div className="claim" key={claim}>
                <CircleHelp size={18} />
                <span>{claim}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <article className="public-state">
            <div className="section-label">Public stage snapshot</div>
            <strong>Production-running infrastructure. Publicly stated external-pilot gap.</strong>
            <p>
              KairoNull's public press page says the system is running in production and self-monitoring its own deployment pipeline, while also stating that no external customer pilot had been signed at the time of the snapshot. That makes Friday useful: the architecture can be examined without pretending public market validation already exists.
            </p>
            <div className="truth-boundary">
              This page does not validate KairoNull's technical, legal, regulatory, latency, scalability, evidentiary, or customer-adoption claims. It translates those public claims into a map that can be tested. A valid cryptographic record can prove integrity of a captured event; it does not automatically prove that the right event was captured, that every path was covered, that the policy was correct, or that institutional authority behaved as documented.
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-label">Source trail</div>
          <h2>Open the originals when a translation needs checking.</h2>
          <div className="source-grid">
            {sourceLinks.map(([label, href]) => (
              <a className="source-link" href={href} target="_blank" rel="noreferrer" key={href}>
                <span>{label}</span>
                <ExternalLink size={17} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="shell">
          Independent comprehension aid by Mason Perry / NULLWORKS, based only on public KairoNull materials available on 20 July 2026. Not affiliated with, sponsored by, approved by, or presented as a substitute for KairoNull. KairoNull and Umbra Trust Protocol are names used by their respective owner. This page is intentionally no-index and exists to help Mason understand the system before an independently scoped pressure test. <a href="https://kaironull.com/" target="_blank" rel="noreferrer">Read the original site →</a>
        </div>
      </footer>
    </main>
  );
}
