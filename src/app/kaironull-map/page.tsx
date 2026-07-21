import type { Metadata } from "next";
import {
  Activity,
  Archive,
  ArrowDown,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Database,
  ExternalLink,
  Eye,
  FileCheck2,
  Fingerprint,
  GitBranch,
  Layers3,
  Radar,
  ScanLine,
  ShieldCheck,
  TriangleAlert,
  UserRoundCheck,
  Workflow,
  Wrench,
} from "lucide-react";
import OscilloscopeBackground from "./OscilloscopeBackground";

export const metadata: Metadata = {
  title: "KairoNull Review Workspace | NULLWORKS",
  description:
    "A shareable, public-source orientation map, pressure-test roadmap, and outcome-independent case-study workspace for KairoNull.",
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
    body: "A valid chain can prove a record was preserved. The review still has to ask whether the governing rule, authority, inputs, exceptions, and outcome were valid.",
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

const reviewStages = [
  {
    number: "01",
    status: "COMPLETE",
    title: "Public-source orientation",
    body: "Translate the public website into one understandable system map, separate claims from verified facts, and establish the vocabulary used during the review.",
  },
  {
    number: "02",
    status: "READY",
    title: "Representative path selection",
    body: "Choose one real decision path that is important enough to matter and bounded enough to inspect end to end during the session.",
  },
  {
    number: "03",
    status: "PENDING",
    title: "Live pressure test",
    body: "Walk the selected path through authority, contemporaneous evidence, exceptions, bypass conditions, export, and independent verification.",
  },
  {
    number: "04",
    status: "LOCKED FORMAT",
    title: "Evidence classification",
    body: "Record each material claim as verified, gap, unknown, or out of scope. Preserve the source, the boundary, and the exact reason for the classification.",
  },
  {
    number: "05",
    status: "AFTER REVIEW",
    title: "Independent case-study receipt",
    body: "Publish what actually survived. Dane verifies quotations and factual descriptions; the independent conclusions are not predetermined or softened.",
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

const outcomes = [
  {
    label: "IF IT HOLDS",
    title: "Independent confidence",
    body: "The result is a concrete receipt showing which public claims survived a representative-path challenge and what evidence supported them.",
  },
  {
    label: "IF A GAP APPEARS",
    title: "Early remediation",
    body: "The result is a precisely bounded weakness found before a customer, regulator, auditor, court, or hostile reviewer finds it first.",
  },
  {
    label: "IF THE RESULT IS MIXED",
    title: "A trustworthy boundary",
    body: "The result separates what is demonstrably strong from what remains unknown, untested, unsupported, or dependent on future work.",
  },
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
        body { margin: 0; background: #050507; }
        .kn-page {
          --signal: #c5c7cc;
          --signal-soft: rgba(197,199,204,.12);
          --wine: #9a3651;
          --wine-bright: #b24a68;
          --wine-soft: rgba(154,54,81,.14);
          --purple: #9b79bd;
          --paper: #f0f0f2;
          --muted: #aaaab1;
          --panel: rgba(9,9,13,.89);
          --line: rgba(220,220,226,.14);
          min-height: 100vh;
          position: relative;
          isolation: isolate;
          overflow-x: hidden;
          color: var(--paper);
          background:
            radial-gradient(circle at 12% 8%, rgba(155,121,189,.085), transparent 28rem),
            radial-gradient(circle at 88% 31%, rgba(154,54,81,.075), transparent 31rem),
            linear-gradient(180deg, rgba(5,5,7,.84), rgba(5,5,7,.97));
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .kn-page::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: .15;
          background-image:
            linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
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
          background: rgba(5,5,7,.86);
          backdrop-filter: blur(18px);
        }
        .nav-inner { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
        .brand { color: #fff; text-decoration: none; font-weight: 950; letter-spacing: .13em; font-size: 12px; }
        .brand span { color: var(--signal); }
        .nav-links { display: flex; gap: 7px; flex-wrap: wrap; justify-content: flex-end; }
        .nav-links a { color: #c5c5ca; text-decoration: none; border: 1px solid rgba(255,255,255,.14); border-radius: 999px; padding: 8px 10px; font-size: 11px; font-weight: 850; }
        .nav-links a:hover { color: #08080b; background: var(--signal); border-color: var(--signal); }
        .hero { min-height: calc(100svh - 64px); display: grid; align-items: center; border-bottom: 1px solid var(--line); }
        .hero-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 28px; align-items: end; padding: 82px 0 70px; }
        .eyebrow { display: flex; align-items: center; gap: 9px; color: var(--signal); font: 900 11px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .17em; text-transform: uppercase; }
        h1 { margin: 18px 0 0; max-width: 930px; font-size: clamp(58px, 10vw, 128px); line-height: .82; letter-spacing: -.075em; }
        h1 span { display: block; color: transparent; -webkit-text-stroke: 1px rgba(240,240,242,.6); }
        .lead { max-width: 840px; margin: 28px 0 0; color: #c8c8cc; font-size: clamp(20px, 2.35vw, 28px); line-height: 1.5; }
        .lead strong { color: #d39aab; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 30px; }
        .button { display: inline-flex; align-items: center; justify-content: center; gap: 9px; min-height: 48px; padding: 13px 17px; border-radius: 999px; background: var(--signal); color: #09090c; text-decoration: none; font-weight: 950; }
        .button.secondary { color: #e4e4e7; background: rgba(8,8,11,.55); border: 1px solid rgba(197,199,204,.32); }
        .status-card { border: 1px solid rgba(197,199,204,.24); border-radius: 28px; padding: 25px; background: linear-gradient(145deg, rgba(197,199,204,.075), rgba(154,54,81,.055), rgba(9,9,13,.87)); box-shadow: 0 34px 100px rgba(0,0,0,.44); }
        .status-chip { display: inline-flex; gap: 8px; align-items: center; color: var(--signal); border: 1px solid rgba(197,199,204,.23); border-radius: 999px; padding: 8px 10px; font: 900 10px ui-monospace, monospace; letter-spacing: .12em; }
        .status-card strong { display: block; margin-top: 21px; font-size: clamp(35px, 5vw, 58px); line-height: .95; letter-spacing: -.055em; }
        .status-card p { color: #b9b9bf; line-height: 1.65; }
        .signal { margin-top: 22px; border-top: 1px solid rgba(255,255,255,.11); padding-top: 19px; font: 800 12px/1.65 ui-monospace, monospace; color: #8d8d94; }
        .signal b { color: #c17189; }
        .quick-map { padding: 72px 0; border-bottom: 1px solid var(--line); }
        .section-label { color: var(--signal); font: 900 11px ui-monospace, monospace; letter-spacing: .16em; text-transform: uppercase; }
        .quick-map h2, .section h2 { margin: 12px 0 26px; max-width: 980px; font-size: clamp(42px, 7vw, 84px); line-height: .92; letter-spacing: -.06em; }
        .map-strip { display: grid; grid-template-columns: repeat(7, auto); gap: 8px; align-items: center; overflow-x: auto; padding: 18px 2px 13px; scrollbar-width: thin; }
        .map-node { min-width: 155px; min-height: 118px; display: grid; align-content: space-between; border: 1px solid rgba(255,255,255,.13); border-radius: 20px; padding: 15px; background: rgba(9,9,13,.8); }
        .map-node b { color: #c17189; font: 900 10px ui-monospace, monospace; letter-spacing: .12em; }
        .map-node span { font-size: 16px; font-weight: 850; line-height: 1.2; }
        .map-arrow { color: var(--signal); }
        .translation { margin-top: 27px; border-left: 4px solid var(--wine); padding: 20px 22px; background: rgba(154,54,81,.075); color: #d7d7db; font-size: clamp(20px, 2.3vw, 27px); line-height: 1.55; }
        .translation strong { color: #d39aab; }
        .process { border-bottom: 1px solid var(--line); }
        .process-intro { padding: 80px 0 34px; }
        .process-intro p { max-width: 840px; color: #b1b1b7; font-size: 19px; line-height: 1.7; }
        .step-stack { padding-bottom: 68px; }
        .step { min-height: 72svh; display: grid; align-items: center; padding: 28px 0; }
        .step:nth-child(even) .step-card { margin-left: auto; }
        .step-card { width: min(670px, 100%); border: 1px solid rgba(255,255,255,.15); border-radius: 29px; padding: clamp(24px, 4vw, 38px); background: rgba(9,9,13,.92); backdrop-filter: blur(15px); box-shadow: 0 30px 90px rgba(0,0,0,.43); }
        .step-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 18px; }
        .step-number { color: var(--signal); font: 950 clamp(48px, 8vw, 86px)/.8 ui-monospace, monospace; }
        .step-icon { width: 46px; height: 46px; display: grid; place-items: center; border: 1px solid rgba(154,54,81,.4); border-radius: 50%; color: #c17189; background: rgba(154,54,81,.08); }
        .step-label { margin-top: 23px; color: #c17189; font: 900 11px ui-monospace, monospace; letter-spacing: .17em; }
        .step-card h3 { margin: 10px 0; font-size: clamp(35px, 5vw, 58px); line-height: .94; letter-spacing: -.052em; }
        .step-card p { color: #bcbcc1; font-size: 18px; line-height: 1.67; }
        .plain { margin-top: 22px; padding-top: 19px; border-top: 1px solid rgba(255,255,255,.11); color: var(--signal); font: 950 15px ui-monospace, monospace; letter-spacing: .1em; text-transform: uppercase; }
        .section { padding: 86px 0; border-bottom: 1px solid var(--line); }
        .intro-copy { max-width: 860px; color: #b8b8bd; font-size: 19px; line-height: 1.7; }
        .dictionary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 34px; }
        .term { min-height: 225px; border: 1px solid rgba(255,255,255,.13); border-radius: 23px; padding: 19px; background: rgba(255,255,255,.022); }
        .term-icon { color: var(--signal); }
        .term b { display: block; margin-top: 40px; color: #c17189; font: 900 11px ui-monospace, monospace; letter-spacing: .12em; }
        .term p { margin-bottom: 0; color: #c4c4c8; line-height: 1.52; }
        .not-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 13px; margin-top: 30px; }
        .not-card { border-left: 4px solid var(--wine); padding: 22px; background: rgba(255,255,255,.03); }
        .not-card svg { color: #c17189; }
        .not-card h3 { margin: 18px 0 8px; font-size: 27px; }
        .not-card p { margin: 0; color: #bcbcc1; line-height: 1.62; }
        .example-shell { border: 1px solid rgba(197,199,204,.22); border-radius: 28px; overflow: hidden; background: rgba(7,7,10,.9); }
        .example-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 20px; border-bottom: 1px solid rgba(255,255,255,.12); }
        .example-head strong { font-size: 24px; }
        .live { display: inline-flex; align-items: center; gap: 8px; color: var(--signal); font: 900 10px ui-monospace, monospace; letter-spacing: .12em; }
        .live::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--signal); box-shadow: 0 0 13px rgba(197,199,204,.5); }
        .example-flow { display: grid; grid-template-columns: repeat(5, 1fr); }
        .example-cell { min-height: 190px; padding: 20px; border-right: 1px solid rgba(255,255,255,.10); }
        .example-cell:last-child { border-right: 0; }
        .example-cell b { color: #c17189; font: 900 10px ui-monospace, monospace; letter-spacing: .11em; }
        .example-cell h3 { margin: 18px 0 8px; font-size: 22px; }
        .example-cell p { color: #b1b1b6; line-height: 1.5; }
        .sector-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .sector { min-height: 190px; border: 1px solid rgba(255,255,255,.13); border-radius: 23px; padding: 21px; background: linear-gradient(145deg, rgba(197,199,204,.035), rgba(154,54,81,.025)); }
        .sector b { color: var(--signal); font: 900 11px ui-monospace, monospace; letter-spacing: .13em; }
        .sector p { color: #bdbdc2; font-size: 17px; line-height: 1.6; }
        .deployment-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 13px; }
        .deploy-card { border: 1px solid rgba(154,54,81,.28); border-radius: 25px; padding: 23px; background: rgba(154,54,81,.05); }
        .deploy-card strong { color: #c17189; font: 950 49px/.85 ui-monospace, monospace; }
        .deploy-card h3 { font-size: 28px; margin: 22px 0 10px; }
        .deploy-card p { color: #b8b8bd; line-height: 1.62; }
        .roadmap-grid { display: grid; gap: 11px; }
        .roadmap-card { display: grid; grid-template-columns: 76px 1fr auto; gap: 18px; align-items: start; border: 1px solid rgba(255,255,255,.13); border-radius: 22px; padding: 20px; background: rgba(255,255,255,.024); }
        .roadmap-number { color: var(--signal); font: 950 38px/.9 ui-monospace, monospace; }
        .roadmap-copy h3 { margin: 0 0 8px; font-size: 26px; }
        .roadmap-copy p { margin: 0; color: #b9b9be; line-height: 1.6; }
        .roadmap-status { white-space: nowrap; color: #d6a5b4; border: 1px solid rgba(154,54,81,.33); border-radius: 999px; padding: 7px 9px; font: 900 10px ui-monospace, monospace; letter-spacing: .1em; }
        .pressure { background: linear-gradient(180deg, rgba(12,9,14,.82), rgba(5,5,7,.97)); }
        .pressure-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .question { border: 1px solid rgba(197,199,204,.2); border-radius: 27px; padding: 24px; background: rgba(9,9,13,.86); }
        .q-top { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; }
        .q-number { color: var(--signal); font: 950 47px/.9 ui-monospace, monospace; }
        .q-icon { color: #c17189; }
        .question h3 { font-size: clamp(28px, 4vw, 43px); line-height: 1; letter-spacing: -.04em; margin: 25px 0 12px; }
        .question > p { color: #bfc0c4; line-height: 1.65; }
        .inspect { display: grid; gap: 7px; margin-top: 20px; }
        .inspect span { display: flex; align-items: center; gap: 9px; color: #d5d5d8; font-size: 14px; }
        .inspect svg { color: var(--signal); flex: 0 0 auto; }
        .claim-list { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 30px; }
        .claim { display: flex; align-items: flex-start; gap: 11px; border: 1px solid rgba(255,255,255,.12); border-radius: 18px; padding: 16px; color: #c7c7cb; line-height: 1.48; background: rgba(255,255,255,.023); }
        .claim svg { color: #c17189; flex: 0 0 auto; margin-top: 2px; }
        .outcome-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 13px; }
        .outcome { min-height: 245px; border: 1px solid rgba(255,255,255,.13); border-radius: 25px; padding: 23px; background: linear-gradient(145deg, rgba(197,199,204,.035), rgba(154,54,81,.035)); }
        .outcome b { color: #d39aab; font: 900 10px ui-monospace, monospace; letter-spacing: .12em; }
        .outcome h3 { margin: 46px 0 10px; font-size: 30px; }
        .outcome p { color: #babac0; line-height: 1.62; }
        .findings-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 30px; }
        .finding { min-height: 170px; border: 1px dashed rgba(255,255,255,.18); border-radius: 22px; padding: 20px; background: rgba(255,255,255,.018); }
        .finding b { color: var(--signal); font: 900 11px ui-monospace, monospace; letter-spacing: .12em; }
        .finding p { margin-top: 44px; color: #88888f; line-height: 1.55; }
        .public-state { border: 1px solid rgba(154,54,81,.32); border-radius: 28px; padding: clamp(24px, 5vw, 44px); background: linear-gradient(145deg, rgba(154,54,81,.095), rgba(197,199,204,.035)); }
        .public-state strong { display: block; max-width: 940px; font-size: clamp(38px, 6vw, 72px); line-height: .94; letter-spacing: -.055em; }
        .public-state p { max-width: 850px; color: #c2c2c6; font-size: 18px; line-height: 1.67; }
        .truth-boundary { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,.12); color: #898990; font-size: 14px; line-height: 1.65; }
        .source-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 28px; }
        .source-link { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 74px; border: 1px solid rgba(255,255,255,.13); border-radius: 18px; padding: 16px; color: #d5d5d8; text-decoration: none; font-weight: 850; background: rgba(255,255,255,.024); }
        .source-link:hover { border-color: rgba(197,199,204,.4); color: #fff; }
        footer { padding: 42px 0 72px; color: #85858c; font-size: 14px; line-height: 1.7; }
        footer a { color: #d39aab; }
        @media (max-width: 940px) {
          .hero-grid { grid-template-columns: 1fr; align-items: start; }
          .dictionary { grid-template-columns: 1fr 1fr; }
          .example-flow { grid-template-columns: 1fr; }
          .example-cell { border-right: 0; border-bottom: 1px solid rgba(255,255,255,.10); }
          .example-cell:last-child { border-bottom: 0; }
          .deployment-grid, .outcome-grid { grid-template-columns: 1fr; }
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
          .dictionary, .not-grid, .sector-grid, .pressure-grid, .claim-list, .source-grid, .findings-grid { grid-template-columns: 1fr; }
          .term { min-height: 190px; }
          .example-head { align-items: flex-start; flex-direction: column; }
          .roadmap-card { grid-template-columns: 56px 1fr; }
          .roadmap-status { grid-column: 2; justify-self: start; }
        }
      `}</style>

      <nav className="nav" aria-label="KairoNull review workspace navigation">
        <div className="shell nav-inner">
          <a className="brand" href="/">
            NULLWORKS <span>INDEPENDENT REVIEW</span>
          </a>
          <div className="nav-links">
            <a href="#map">System map</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#pressure">Review lenses</a>
            <a href="#findings">Findings</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="shell hero-grid">
          <div>
            <div className="eyebrow">
              <ScanLine size={15} />
              PUBLIC-SOURCE ORIENTATION // SHAREABLE REVIEW WORKSPACE
            </div>
            <h1>
              KairoNull
              <span>review workspace.</span>
            </h1>
            <p className="lead">
              A clean map of <strong>what the system claims to do, how one representative path will be examined, and how the final evidence will be published.</strong>
            </p>
            <div className="hero-actions">
              <a className="button" href="#map">
                See the system map <ArrowDown size={17} />
              </a>
              <a className="button secondary" href="#roadmap">
                See the review roadmap <Workflow size={16} />
              </a>
              <a className="button secondary" href="https://kaironull.com/" target="_blank" rel="noreferrer">
                Open KairoNull <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <aside className="status-card">
            <span className="status-chip">
              <BadgeCheck size={14} />
              STAGE 01 COMPLETE // ORIENTATION
            </span>
            <strong>Understand first. Pressure-test second. Publish exactly what survives.</strong>
            <p>
              This workspace is safe to share with Dane throughout the process. It separates public claims, planned evaluation, observed evidence, and final findings without exposing confidential materials or NULLWORKS internal methods.
            </p>
            <div className="signal">
              <b>CURRENT STATE:</b> public-source map complete. Representative-path review ready. Live findings not yet recorded.
            </div>
          </aside>
        </div>
      </header>

      <section className="quick-map" id="map">
        <div className="shell">
          <div className="section-label">The entire public product in one line</div>
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
            <strong>Plain-language translation:</strong> The AI still does the work. KairoNull tries to make sure nobody can quietly rewrite the story of what the AI saw, which rule applied, what it produced, and when it happened.
          </div>
        </div>
      </section>

      <section className="process" id="loop">
        <div className="shell process-intro">
          <div className="section-label">Observe → Evaluate → Record → Prove</div>
          <h2>The four public movements.</h2>
          <p>
            KairoNull calls this the Umbra Trust Protocol. The public architecture resolves into four understandable actions that can later be followed through one real path.
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
          <div className="section-label">Public vocabulary, translated</div>
          <h2>The noun decoder.</h2>
          <p className="intro-copy">
            These are the main objects moving through the architecture. Once the nouns are stable, the product becomes easier to inspect and discuss accurately.
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

      <section className="section" id="roadmap">
        <div className="shell">
          <div className="section-label">Shareable review roadmap</div>
          <h2>Where the work goes from here.</h2>
          <p className="intro-copy">
            The roadmap exposes the process and its evidence states without exposing proprietary internal methods. It can remain visible before, during, and after the review.
          </p>
          <div className="roadmap-grid">
            {reviewStages.map((stage) => (
              <article className="roadmap-card" key={stage.number}>
                <div className="roadmap-number">{stage.number}</div>
                <div className="roadmap-copy">
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                </div>
                <div className="roadmap-status">{stage.status}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section pressure" id="pressure">
        <div className="shell">
          <div className="section-label">Representative-path review lenses</div>
          <h2>Do not review a marketing page. Follow one real decision path.</h2>
          <p className="intro-copy">
            These four agreed questions keep the review on actual execution while leaving the internal pressure-test method and confidential materials outside the public workspace.
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
          <div className="section-label">Public claims to make observable</div>
          <h2>What the review should be able to demonstrate or bound.</h2>
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
          <div className="section-label">Outcome-independent value</div>
          <h2>Every honest result moves the system forward.</h2>
          <div className="outcome-grid">
            {outcomes.map((outcome) => (
              <article className="outcome" key={outcome.label}>
                <b>{outcome.label}</b>
                <h3>{outcome.title}</h3>
                <p>{outcome.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="findings">
        <div className="shell">
          <div className="section-label">Final report surface</div>
          <h2>The findings will land on this page.</h2>
          <p className="intro-copy">
            After the session, this section becomes the independent receipt. Each material result will include its evidence class, source, boundary, and current status.
          </p>
          <div className="findings-grid">
            <article className="finding">
              <b>VERIFIED</b>
              <p>Awaiting representative-path evidence.</p>
            </article>
            <article className="finding">
              <b>GAP</b>
              <p>Awaiting representative-path evidence.</p>
            </article>
            <article className="finding">
              <b>UNKNOWN / OUT OF SCOPE</b>
              <p>Awaiting representative-path evidence.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <article className="public-state">
            <div className="section-label">Public stage snapshot</div>
            <strong>Production-running infrastructure. Publicly stated external-pilot gap.</strong>
            <p>
              KairoNull's public press page says the system is running in production and self-monitoring its own deployment pipeline, while also stating that no external customer pilot had been signed at the time of the public snapshot. The review can examine the architecture without pretending public market validation already exists.
            </p>
            <div className="truth-boundary">
              This page does not validate KairoNull's technical, legal, regulatory, latency, scalability, evidentiary, or customer-adoption claims. It translates public claims into a map that can be tested. A valid cryptographic record can prove integrity of a captured event; it does not automatically prove that the right event was captured, that every path was covered, that the policy was correct, or that institutional authority behaved as documented.
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
          Independent review workspace by Mason Perry / NULLWORKS, based on public KairoNull materials. Not affiliated with, sponsored by, approved by, or presented as a substitute for KairoNull. KairoNull and Umbra Trust Protocol are names used by their respective owner. Confidential KairoNull materials, direct quotations, and factual descriptions supplied during the review remain governed by the agreed review scope and mutual NDA. The final conclusions remain independent. <a href="https://kaironull.com/" target="_blank" rel="noreferrer">Read the original site →</a>
        </div>
      </footer>
    </main>
  );
}
