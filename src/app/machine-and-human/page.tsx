import type { Metadata } from "next";
import {
  ArrowDown,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Factory,
  FileCheck2,
  Gauge,
  GitBranch,
  HeartHandshake,
  Network,
  Phone,
  RefreshCw,
  ShieldCheck,
  TimerReset,
  UserRoundCheck,
  Workflow,
} from "lucide-react";

const canonical = "https://mason-portfolio-main.vercel.app/machine-and-human";

export const metadata: Metadata = {
  title: "The Machine and the Human | NULLWORKS",
  description:
    "A private red-team learning page on operational time compression, inspectable proof-of-work, and the human cost of machine-speed work.",
  robots: { index: false, follow: false },
  alternates: { canonical },
  openGraph: {
    title: "The Machine and the Human",
    description:
      "Two linked NULLWORKS working papers: the operating machine and the human cost of running it at extreme compression.",
    type: "article",
    url: canonical,
    siteName: "NULLWORKS",
  },
};

const telemetryScript = String.raw`
(() => {
  const route = "/machine-and-human";
  const key = "nw:machine-human:ledger";
  const sessionKey = "nw:machine-human:session";
  const startedAt = Date.now();
  const sessionId = sessionStorage.getItem(sessionKey) ||
    (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2));
  sessionStorage.setItem(sessionKey, sessionId);

  const readLedger = () => {
    try { return JSON.parse(localStorage.getItem(key) || "[]"); }
    catch { return []; }
  };

  const emit = (event, detail = {}) => {
    const record = {
      receiptVersion: "NW-MH-20260727.1",
      event,
      route,
      sessionId,
      occurredAt: new Date().toISOString(),
      detail,
    };
    const ledger = readLedger();
    ledger.push(record);
    localStorage.setItem(key, JSON.stringify(ledger.slice(-160)));
    fetch("/api/pressure-cooker/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      keepalive: true,
    }).catch(() => {});
  };

  emit("page_view", {
    referrer: document.referrer ? new URL(document.referrer).hostname : "direct",
    viewport: window.innerWidth + "x" + window.innerHeight,
  });

  document.querySelectorAll("[data-telemetry]").forEach((node) => {
    node.addEventListener("click", () => emit("interaction", {
      target: node.getAttribute("data-telemetry") || "unknown",
    }));
  });

  const viewed = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || viewed.has(entry.target.id)) return;
      viewed.add(entry.target.id);
      emit("section_view", { section: entry.target.id });
    });
  }, { threshold: 0.34 });
  document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));

  const timer = window.setTimeout(() => emit("read_60_seconds"), 60000);
  window.addEventListener("pagehide", () => {
    window.clearTimeout(timer);
    emit("page_exit", { seconds: Math.round((Date.now() - startedAt) / 1000) });
  }, { once: true });
})();
`;

const clocks = [
  ["01", "Wall clock", "Elapsed calendar days", "Founded June 22, 2026"],
  ["02", "Workstream clock", "Attempts, builds, decisions", "Parallel paths advance together"],
  ["03", "Learning clock", "Failures that change behavior", "Correction must alter future work"],
  ["04", "Organizational clock", "Reusable capability", "Receipts become company memory"],
  ["05", "Human clock", "Attention, recovery, meaning", "Cannot be compressed without cost"],
];

const machineLoop = [
  ["Observe", "Walk the real work and preserve the original condition."],
  ["Scope", "Name the outcome, evidence, authority, exceptions, and stop rules."],
  ["Parallelize", "Give isolated workers bounded context and distinct assignments."],
  ["Triage", "Revalidate whether the next step still deserves to happen."],
  ["Build", "Create the smallest useful intervention and preserve its lineage."],
  ["Challenge", "Attack the claim, compare outputs, record disagreement, and retest."],
  ["Learn", "Convert corrected work into reusable organizational capability."],
];

const factory = [
  ["05", "Meta-learning factory", "Telemetry and red-team corrections improve how every lower layer works."],
  ["04", "Assurance factory", "Frozen evidence, blind comparisons, failure receipts, challenge, and retest."],
  ["03", "Workroom factory", "Reusable roles, check-in/out, authority, scope, context, and artifact templates."],
  ["02", "OI SUITe factory", "A reusable manufacturing genome for domain-specific operating systems."],
  ["01", "Domain work product", "Lending, legal evidence, OCR, music, postal operations, hiring, and governance."],
];

const trustControls = [
  "Visible Human Authority",
  "Bounded machine permissions",
  "Inspectable evidence and provenance",
  "Stop, rollback, and containment controls",
  "Named accountability",
  "Challenge, appeal, and recourse",
  "Failure and recovery receipts",
  "Recursive triage and reauthorization",
];

export default function MachineAndHumanPage() {
  return (
    <main className="mh-page">
      <script dangerouslySetInnerHTML={{ __html: telemetryScript }} />
      <style>{`
        .mh-page {
          --ink: #050706;
          --panel: rgba(11, 17, 13, .86);
          --panel-strong: #09100c;
          --paper: #f0f5f1;
          --muted: #9eaea2;
          --acid: #a5ff37;
          --acid-soft: #d8ffa5;
          --cyan: #78e3e0;
          --gold: #e2bb66;
          --red: #ff8686;
          --line: rgba(165, 255, 55, .18);
          min-height: 100vh;
          overflow-x: hidden;
          color: var(--paper);
          background:
            radial-gradient(circle at 80% 8%, rgba(120, 227, 224, .12), transparent 29rem),
            radial-gradient(circle at 8% 27%, rgba(165, 255, 55, .08), transparent 32rem),
            linear-gradient(180deg, #050706 0%, #07100a 48%, #030504 100%);
          isolation: isolate;
        }
        .mh-page * { box-sizing: border-box; }
        .mh-page::before {
          position: fixed; inset: 0; z-index: -2; opacity: .62;
          background-image:
            linear-gradient(rgba(165,255,55,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(165,255,55,.025) 1px, transparent 1px);
          background-size: 34px 34px;
          content: ""; pointer-events: none;
          mask-image: linear-gradient(to bottom, black, transparent 94%);
        }
        .mh-shell { width: min(1160px, calc(100% - 30px)); margin: 0 auto; }
        .mh-header {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between; gap: 18px;
          min-height: 68px; padding: 11px max(15px, calc((100vw - 1160px)/2));
          border-bottom: 1px solid rgba(255,255,255,.07);
          background: rgba(3,7,4,.84); backdrop-filter: blur(18px);
        }
        .mh-brand { display: flex; align-items: center; gap: 11px; color: inherit; text-decoration: none; }
        .mh-mark { display: grid; width: 42px; height: 42px; place-items: center; border: 1px solid rgba(165,255,55,.55); color: var(--acid-soft); font-family: var(--font-geist-mono), monospace; font-weight: 900; font-size: 12px; }
        .mh-brand strong { display: block; font-size: 12px; letter-spacing: .18em; }
        .mh-brand small { display: block; margin-top: 3px; color: #78877b; font-family: var(--font-geist-mono), monospace; font-size: 9px; letter-spacing: .11em; }
        .mh-status { display: inline-flex; align-items: center; gap: 8px; padding: 8px 11px; border: 1px solid rgba(165,255,55,.24); border-radius: 999px; color: var(--acid-soft); font-family: var(--font-geist-mono), monospace; font-size: 9px; letter-spacing: .11em; }
        .mh-status i { width: 7px; height: 7px; border-radius: 50%; background: var(--acid); box-shadow: 0 0 14px rgba(165,255,55,.74); }
        .mh-hero { display: grid; grid-template-columns: minmax(0,1.12fr) minmax(350px,.88fr); gap: clamp(32px,6vw,76px); align-items: center; min-height: calc(100vh - 68px); padding: 72px 0 62px; }
        .mh-kicker { display: inline-flex; align-items: center; gap: 8px; margin: 0; color: var(--acid-soft); font-family: var(--font-geist-mono), monospace; font-size: 10px; font-weight: 850; letter-spacing: .15em; text-transform: uppercase; }
        .mh-hero h1 { max-width: 840px; margin: 20px 0 0; font-size: clamp(54px,8.2vw,108px); line-height: .89; letter-spacing: -.075em; text-wrap: balance; }
        .mh-hero h1 span { display: block; color: var(--acid); }
        .mh-lead { max-width: 790px; margin: 28px 0 0; color: #d7e2d9; font-size: clamp(18px,2vw,24px); line-height: 1.48; text-wrap: balance; }
        .mh-body { max-width: 760px; margin: 17px 0 0; color: var(--muted); font-size: 15px; line-height: 1.78; }
        .mh-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 29px; }
        .mh-button { display: inline-flex; align-items: center; justify-content: center; gap: 9px; min-height: 49px; padding: 0 18px; border-radius: 999px; text-decoration: none; font-size: 12px; font-weight: 850; }
        .mh-primary { background: var(--acid); color: #061007; box-shadow: 0 16px 42px rgba(165,255,55,.13); }
        .mh-secondary { border: 1px solid rgba(165,255,55,.34); color: var(--acid-soft); background: rgba(9,16,12,.68); }
        .mh-stat-row { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 9px; margin-top: 31px; }
        .mh-stat { padding: 13px; border: 1px solid var(--line); background: rgba(9,16,12,.62); }
        .mh-stat strong { display: block; color: var(--acid); font-size: 24px; }
        .mh-stat span { display: block; margin-top: 4px; color: #9dafA3; font-size: 9px; line-height: 1.4; letter-spacing: .08em; text-transform: uppercase; }
        .mh-map { position: relative; min-height: 620px; border: 1px solid rgba(165,255,55,.2); background: linear-gradient(180deg,rgba(11,22,15,.9),rgba(4,8,5,.78)); overflow: hidden; box-shadow: inset 0 0 80px rgba(165,255,55,.025), 0 34px 100px rgba(0,0,0,.25); }
        .mh-map::before { position:absolute; inset:0; background: radial-gradient(circle at 50% 43%,rgba(165,255,55,.1),transparent 46%); content:""; }
        .mh-map-top { position:absolute; top:17px; left:17px; right:17px; display:flex; justify-content:space-between; color:#748276; font-family:var(--font-geist-mono),monospace; font-size:9px; letter-spacing:.12em; }
        .mh-core { position:absolute; z-index:2; top:50%; left:50%; display:grid; width:190px; height:190px; place-items:center; border:1px solid rgba(165,255,55,.52); border-radius:50%; transform:translate(-50%,-50%); background:rgba(5,11,7,.94); box-shadow:0 0 70px rgba(165,255,55,.08); text-align:center; }
        .mh-core strong { color:var(--acid); font-size:26px; letter-spacing:-.04em; }
        .mh-core span { display:block; margin-top:5px; color:#9dafA3; font-family:var(--font-geist-mono),monospace; font-size:9px; letter-spacing:.12em; }
        .mh-orbit { position:absolute; z-index:2; display:grid; width:142px; min-height:86px; padding:11px; place-items:center; border:1px solid rgba(120,227,224,.35); background:rgba(5,10,7,.9); text-align:center; }
        .mh-orbit svg { color:var(--cyan); margin-bottom:6px; }
        .mh-orbit strong { font-size:10px; letter-spacing:.07em; }
        .mh-orbit span { display:block; margin-top:4px; color:#758579; font-size:8px; line-height:1.35; }
        .mh-o1 { top:76px; left:50%; transform:translateX(-50%); }
        .mh-o2 { top:230px; right:25px; }
        .mh-o3 { bottom:70px; right:72px; }
        .mh-o4 { bottom:70px; left:72px; }
        .mh-o5 { top:230px; left:25px; }
        .mh-path { position:absolute; z-index:1; border:1px dashed rgba(165,255,55,.18); border-radius:50%; inset:106px 72px; }
        .mh-section { padding: 88px 0; border-top:1px solid rgba(255,255,255,.06); }
        .mh-section-head { display:grid; grid-template-columns:.78fr 1.22fr; gap:44px; align-items:start; }
        .mh-eyebrow { display:flex; align-items:center; gap:8px; color:var(--acid-soft); font-family:var(--font-geist-mono),monospace; font-size:10px; font-weight:850; letter-spacing:.15em; text-transform:uppercase; }
        .mh-section h2 { margin:14px 0 0; font-size:clamp(38px,5.4vw,72px); line-height:.98; letter-spacing:-.055em; text-wrap:balance; }
        .mh-section-intro { margin:0; color:#cbd8ce; font-size:clamp(17px,2vw,22px); line-height:1.6; }
        .mh-note { margin-top:20px; padding:18px 19px; border-left:3px solid var(--acid); background:rgba(165,255,55,.055); color:#dbe5dd; font-size:14px; line-height:1.7; }
        .mh-grid-2 { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:15px; margin-top:36px; }
        .mh-grid-3 { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:13px; margin-top:36px; }
        .mh-card { padding:22px; border:1px solid rgba(255,255,255,.09); background:var(--panel); }
        .mh-card-icon { display:grid; width:42px; height:42px; place-items:center; border:1px solid rgba(165,255,55,.32); color:var(--acid); }
        .mh-card h3 { margin:17px 0 0; font-size:22px; letter-spacing:-.025em; }
        .mh-card p { margin:10px 0 0; color:var(--muted); font-size:14px; line-height:1.7; }
        .mh-clocks { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:10px; margin-top:38px; }
        .mh-clock { min-height:255px; padding:17px; border:1px solid rgba(165,255,55,.2); background:linear-gradient(180deg,rgba(13,22,16,.88),rgba(6,10,7,.82)); }
        .mh-clock b { color:var(--acid); font-family:var(--font-geist-mono),monospace; font-size:12px; }
        .mh-clock h3 { margin:42px 0 0; font-size:18px; }
        .mh-clock p { margin:11px 0 0; color:#aebdb2; font-size:12px; line-height:1.55; }
        .mh-clock small { display:block; margin-top:25px; color:#718076; font-size:10px; line-height:1.45; }
        .mh-loop { margin-top:38px; border:1px solid rgba(165,255,55,.19); background:rgba(5,10,7,.58); }
        .mh-loop-row { display:grid; grid-template-columns:58px 150px 1fr; gap:16px; align-items:center; padding:16px 18px; border-bottom:1px solid rgba(255,255,255,.06); }
        .mh-loop-row:last-child { border-bottom:0; }
        .mh-loop-row b { color:var(--acid); font-family:var(--font-geist-mono),monospace; font-size:11px; }
        .mh-loop-row strong { font-size:14px; }
        .mh-loop-row span { color:var(--muted); font-size:13px; line-height:1.55; }
        .mh-factory { display:flex; flex-direction:column; gap:10px; margin-top:38px; }
        .mh-layer { display:grid; grid-template-columns:60px 220px 1fr; gap:17px; align-items:center; padding:18px; border:1px solid rgba(255,255,255,.09); background:rgba(9,15,11,.78); }
        .mh-layer b { display:grid; width:42px; height:42px; place-items:center; border:1px solid rgba(165,255,55,.34); color:var(--acid); font-family:var(--font-geist-mono),monospace; }
        .mh-layer strong { font-size:15px; }
        .mh-layer span { color:var(--muted); font-size:13px; line-height:1.55; }
        .mh-score { display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-top:38px; }
        .mh-do, .mh-dont { padding:24px; border:1px solid rgba(255,255,255,.09); background:rgba(9,15,11,.8); }
        .mh-do { border-color:rgba(165,255,55,.25); }
        .mh-dont { border-color:rgba(255,134,134,.23); }
        .mh-do h3 { color:var(--acid); } .mh-dont h3 { color:var(--red); }
        .mh-checks { display:grid; gap:11px; margin-top:18px; }
        .mh-check { display:flex; gap:10px; align-items:flex-start; color:#c9d6cc; font-size:13px; line-height:1.55; }
        .mh-check svg { flex:0 0 auto; margin-top:2px; color:var(--acid); }
        .mh-dont .mh-check svg { color:var(--red); }
        .mh-modes { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:13px; margin-top:38px; }
        .mh-mode { position:relative; min-height:315px; padding:23px; border:1px solid rgba(255,255,255,.09); background:rgba(9,15,11,.82); overflow:hidden; }
        .mh-mode::before { position:absolute; inset:0 0 auto; height:3px; background:var(--acid); content:""; }
        .mh-mode:nth-child(2)::before { background:var(--gold); }
        .mh-mode:nth-child(3)::before { background:var(--red); }
        .mh-mode small { color:#7f8e83; font-family:var(--font-geist-mono),monospace; font-size:9px; letter-spacing:.12em; }
        .mh-mode strong { display:block; margin-top:16px; font-size:32px; letter-spacing:-.04em; }
        .mh-mode h3 { margin:9px 0 0; font-size:17px; }
        .mh-mode p { margin:16px 0 0; color:var(--muted); font-size:13px; line-height:1.65; }
        .mh-trust { display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:start; margin-top:38px; }
        .mh-quote { padding:27px; border-left:4px solid var(--acid); background:rgba(165,255,55,.06); font-size:clamp(22px,3vw,34px); font-weight:850; line-height:1.28; letter-spacing:-.03em; }
        .mh-trust-list { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .mh-trust-item { display:flex; gap:9px; align-items:flex-start; min-height:76px; padding:13px; border:1px solid rgba(255,255,255,.08); background:rgba(9,15,11,.76); color:#c8d4cb; font-size:12px; line-height:1.5; }
        .mh-trust-item svg { color:var(--cyan); flex:0 0 auto; }
        .mh-umbra { display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-top:38px; }
        .mh-side { padding:25px; border:1px solid rgba(165,255,55,.28); background:rgba(7,13,9,.85); }
        .mh-side:last-child { border-color:rgba(120,227,224,.34); }
        .mh-side h3 { margin:0; color:var(--acid); font-size:28px; }
        .mh-side:last-child h3 { color:var(--cyan); }
        .mh-side p { color:var(--muted); line-height:1.7; }
        .mh-side ul { margin:20px 0 0; padding-left:18px; color:#cbd6cd; font-size:13px; line-height:1.8; }
        .mh-questions { display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-top:38px; }
        .mh-question { padding:22px; border:1px solid rgba(255,255,255,.09); background:rgba(9,15,11,.78); }
        .mh-question strong { color:var(--acid-soft); font-size:14px; }
        .mh-question ol { margin:17px 0 0; padding-left:20px; color:#becbc1; font-size:13px; line-height:1.72; }
        .mh-boundary { margin-top:38px; padding:22px; border:1px solid rgba(255,134,134,.22); background:rgba(255,134,134,.04); }
        .mh-boundary strong { color:#ffadad; }
        .mh-boundary p { color:#c9d2cb; line-height:1.65; }
        .mh-cta { display:grid; grid-template-columns:1fr auto; gap:24px; align-items:center; padding:36px; border:1px solid rgba(165,255,55,.33); background:linear-gradient(135deg,rgba(165,255,55,.09),rgba(120,227,224,.05)); }
        .mh-cta h2 { margin:0; font-size:clamp(32px,5vw,64px); line-height:.98; letter-spacing:-.055em; }
        .mh-cta p { max-width:740px; margin:17px 0 0; color:#c4d2c7; line-height:1.65; }
        .mh-phone { display:grid; min-width:230px; min-height:146px; place-items:center; padding:22px; border:1px solid rgba(165,255,55,.4); color:var(--acid-soft); text-decoration:none; text-align:center; background:rgba(5,10,7,.72); }
        .mh-phone strong { display:block; margin-top:11px; font-size:18px; }
        .mh-phone span { display:block; margin-top:5px; color:#aebbb1; font-size:11px; }
        .mh-footer { padding:34px 0 44px; border-top:1px solid rgba(255,255,255,.06); color:#758279; font-size:10px; line-height:1.65; }
        .mh-footer-row { display:flex; justify-content:space-between; gap:22px; }
        @media (max-width: 900px) {
          .mh-hero, .mh-section-head, .mh-trust, .mh-cta { grid-template-columns:1fr; }
          .mh-map { min-height:560px; }
          .mh-stat-row { grid-template-columns:1fr 1fr; }
          .mh-clocks { grid-template-columns:1fr 1fr; }
          .mh-clocks .mh-clock:last-child { grid-column:1 / -1; min-height:190px; }
          .mh-grid-3, .mh-modes { grid-template-columns:1fr; }
          .mh-factory .mh-layer { grid-template-columns:52px 1fr; }
          .mh-factory .mh-layer span { grid-column:2; }
          .mh-phone { min-width:0; }
        }
        @media (max-width: 640px) {
          .mh-status { display:none; }
          .mh-hero { padding-top:48px; }
          .mh-map { min-height:625px; }
          .mh-path { inset:124px 25px; }
          .mh-core { width:155px; height:155px; }
          .mh-core strong { font-size:22px; }
          .mh-orbit { width:118px; min-height:78px; padding:9px; }
          .mh-o1 { top:70px; }
          .mh-o2 { top:236px; right:10px; }
          .mh-o3 { bottom:75px; right:32px; }
          .mh-o4 { bottom:75px; left:32px; }
          .mh-o5 { top:236px; left:10px; }
          .mh-section { padding:68px 0; }
          .mh-grid-2, .mh-score, .mh-umbra, .mh-questions { grid-template-columns:1fr; }
          .mh-clocks { grid-template-columns:1fr; }
          .mh-clocks .mh-clock:last-child { grid-column:auto; }
          .mh-clock { min-height:190px; }
          .mh-clock h3 { margin-top:28px; }
          .mh-loop-row { grid-template-columns:42px 1fr; }
          .mh-loop-row span { grid-column:2; }
          .mh-layer { grid-template-columns:48px 1fr; }
          .mh-trust-list { grid-template-columns:1fr; }
          .mh-footer-row { display:block; }
          .mh-footer-row span { display:block; margin-top:8px; }
        }
      `}</style>

      <header className="mh-header">
        <a href="/" className="mh-brand" data-telemetry="home">
          <div className="mh-mark">NW</div>
          <div>
            <strong>NULLWORKS</strong>
            <small>PRIVATE LEARNING PAGE</small>
          </div>
        </a>
        <div className="mh-status"><i /> UNLISTED · RED-TEAM v0.1</div>
      </header>

      <div className="mh-shell">
        <section className="mh-hero" id="top">
          <div>
            <p className="mh-kicker"><BrainCircuit size={15} /> Two linked working papers</p>
            <h1>THE MACHINE <span>AND THE HUMAN</span></h1>
            <p className="mh-lead">
              NULLWORKS compressed years of beta-level organizational work into weeks. This page explains the operating machine that made that possible—and the human cost that proves speed alone is the wrong objective.
            </p>
            <p className="mh-body">
              Paper One is written for the proof-of-work, hiring, organizational-learning, and systems-design question. Paper Two records attention, trust, family, recovery, and the correction toward quieter human-centered augmentation. Both are private red-team drafts, not finished doctrine.
            </p>
            <div className="mh-actions">
              <a href="#machine" className="mh-button mh-primary" data-telemetry="paper-one">Enter Paper One <ArrowDown size={16} /></a>
              <a href="#human" className="mh-button mh-secondary" data-telemetry="paper-two">Enter Paper Two <HeartHandshake size={16} /></a>
            </div>
            <div className="mh-stat-row">
              <div className="mh-stat"><strong>35</strong><span>Calendar days old on July 27</span></div>
              <div className="mh-stat"><strong>~180</strong><span>Founder-reported days using AI</span></div>
              <div className="mh-stat"><strong>1.94</strong><span>Internal FTE-year beta comparison</span></div>
              <div className="mh-stat"><strong>5–10x</strong><span>Human-safe leverage target</span></div>
            </div>
          </div>

          <div className="mh-map" aria-label="NULLWORKS machine and human map">
            <div className="mh-map-top"><span>OPERATIONAL RELATIVITY</span><span>HUMAN AUTHORITY FINAL</span></div>
            <div className="mh-path" />
            <div className="mh-core"><div><strong>NULLWORKS</strong><span>GOVERNED OPERATING SYSTEM</span></div></div>
            <div className="mh-orbit mh-o1"><Workflow size={19} /><div><strong>REAL WORK</strong><span>Intent, workflow, consequence</span></div></div>
            <div className="mh-orbit mh-o2"><Network size={19} /><div><strong>THE HIVE</strong><span>Scoped continuity and receipts</span></div></div>
            <div className="mh-orbit mh-o3"><Factory size={19} /><div><strong>THE FACTORY</strong><span>Reusable systems build systems</span></div></div>
            <div className="mh-orbit mh-o4"><ShieldCheck size={19} /><div><strong>ASSURANCE</strong><span>Challenge, correction, retest</span></div></div>
            <div className="mh-orbit mh-o5"><UserRoundCheck size={19} /><div><strong>THE HUMAN</strong><span>Authority, judgment, recovery</span></div></div>
          </div>
        </section>
      </div>

      <section className="mh-section" id="boundary">
        <div className="mh-shell">
          <div className="mh-section-head">
            <div><div className="mh-eyebrow"><ShieldCheck size={15} /> Truth boundary</div><h2>Measure the anomaly without turning it into mythology.</h2></div>
            <div>
              <p className="mh-section-intro">
                The 4,040-hour and 1.94-FTE-year figures are internal bottom-up comparisons against traditional beta-level team work. They are not audited time savings, employment claims, or proof of production maturity.
              </p>
              <div className="mh-note">
                Digital work units are not legal employees. Rapid prototypes are not automatically secure or supportable production systems. The private Hive Mesh concept is intentionally omitted from this external learning page.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mh-section" id="machine">
        <div className="mh-shell">
          <div className="mh-section-head">
            <div><div className="mh-eyebrow"><Gauge size={15} /> Paper One</div><h2>Operational relativity.</h2></div>
            <p className="mh-section-intro">
              A company can be young on the calendar and old in preserved learning. Parallel work accelerates workstream time. Corrected failures accelerate learning time. Reusable decisions and receipts convert those cycles into organizational capability.
            </p>
          </div>
          <div className="mh-clocks">
            {clocks.map(([number, title, body, foot]) => (
              <article className="mh-clock" key={number}><b>{number}</b><h3>{title}</h3><p>{body}</p><small>{foot}</small></article>
            ))}
          </div>
          <div className="mh-note">Working formula: operational age = validated learning cycles + reusable decisions + preserved failure receipts − duplication − drift − coordination tax.</div>
        </div>
      </section>

      <section className="mh-section" id="proof">
        <div className="mh-shell">
          <div className="mh-section-head">
            <div><div className="mh-eyebrow"><FileCheck2 size={15} /> Inspectable work</div><h2>The résumé became optional.</h2></div>
            <p className="mh-section-intro">
              A résumé asserts capability. A living body of work can expose the problem, source evidence, decisions, constraints, prototypes, failures, criticism, corrections, and measured outcomes.
            </p>
          </div>
          <div className="mh-grid-3">
            <article className="mh-card"><div className="mh-card-icon"><Workflow size={20} /></div><h3>Meter the work</h3><p>Preserve source, scope, authority, decisions, artifacts, outcomes, and unresolved unknowns—not just hours or keystrokes.</p></article>
            <article className="mh-card"><div className="mh-card-icon"><GitBranch size={20} /></div><h3>Preserve correction</h3><p>A critique should create a descendant version. The system earns credibility by showing where it changed, not by erasing failure.</p></article>
            <article className="mh-card"><div className="mh-card-icon"><UserRoundCheck size={20} /></div><h3>Evaluate judgment</h3><p>Reviewers can inspect what the person observed, built, challenged, learned, and improved instead of inferring it from titles.</p></article>
          </div>
        </div>
      </section>

      <section className="mh-section" id="loop">
        <div className="mh-shell">
          <div className="mh-section-head">
            <div><div className="mh-eyebrow"><RefreshCw size={15} /> Governed workflow</div><h2>Every next step must earn the right to happen.</h2></div>
            <p className="mh-section-intro">
              Recursive triage is Step Zero between meaningful actions. It revalidates the objective, evidence, authority, cost, risk, priority, and expected contribution before work continues.
            </p>
          </div>
          <div className="mh-loop">
            {machineLoop.map(([title, body], index) => (
              <div className="mh-loop-row" key={title}><b>{String(index + 1).padStart(2, "0")}</b><strong>{title}</strong><span>{body}</span></div>
            ))}
          </div>
          <div className="mh-note">Continue, accelerate, replan, gracefully degrade, pause, escalate, roll back, or stop. Graceful degradation is one response; recursive triage is the decision mechanism.</div>
        </div>
      </section>

      <section className="mh-section" id="factory">
        <div className="mh-shell">
          <div className="mh-section-head">
            <div><div className="mh-eyebrow"><Factory size={15} /> Recursive production</div><h2>The factory built the factory that built the factory.</h2></div>
            <p className="mh-section-intro">
              The applications are proof vehicles. The reusable factory is the product. Each real workflow exposes patterns that improve the workroom, assurance, continuity, and meta-learning layers above it.
            </p>
          </div>
          <div className="mh-factory">
            {factory.map(([number, title, body]) => (
              <div className="mh-layer" key={number}><b>{number}</b><strong>{title}</strong><span>{body}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mh-section" id="destiny">
        <div className="mh-shell">
          <div className="mh-section-head">
            <div><div className="mh-eyebrow"><Gauge size={15} /> Destiny Score</div><h2>Record the signal first. Score later.</h2></div>
            <p className="mh-section-intro">
              Destiny is a hypothesis for making nonlinear capability legible through inspectable work. It must summarize evidence—not secretly measure a person’s worth or become another surveillance system.
            </p>
          </div>
          <div className="mh-score">
            <div className="mh-do"><h3>Evidence-centered</h3><div className="mh-checks">
              {["User-visible and challengeable", "Linked to source work and outcomes", "Context-normalized", "Versioned through corrections", "Private material remains optional", "Aids judgment; never becomes fate"].map((item)=><div className="mh-check" key={item}><CheckCircle2 size={16}/><span>{item}</span></div>)}
            </div></div>
            <div className="mh-dont"><h3>Not surveillance</h3><div className="mh-checks">
              {["No covert screen recording", "No keystroke theater", "No hidden emotional inference", "No permanent secret ranking", "No employer-owned identity score", "No unappealable automated label"].map((item)=><div className="mh-check" key={item}><CheckCircle2 size={16}/><span>{item}</span></div>)}
            </div></div>
          </div>
        </div>
      </section>

      <section className="mh-section" id="human">
        <div className="mh-shell">
          <div className="mh-section-head">
            <div><div className="mh-eyebrow"><HeartHandshake size={15} /> Paper Two</div><h2>The human cost of machine-speed work.</h2></div>
            <div>
              <p className="mh-section-intro">
                The same architecture that produced extraordinary throughput also exposed a human constraint: cognitive and emotional integration did not accelerate at the same rate as artifact production.
              </p>
              <div className="mh-note">Founder correction: “It was important, but it was not healthy. I would build the human recovery layer differently if I could begin again.”</div>
            </div>
          </div>
          <div className="mh-modes">
            <article className="mh-mode"><small>HUMAN-SAFE DEFAULT</small><strong>5–10x</strong><h3>Returned time</h3><p>Remove waste first. Preserve judgment, agency, sleep, relationships, and recovery as product requirements.</p></article>
            <article className="mh-mode"><small>STRUCTURED SPRINT</small><strong>10–25x</strong><h3>Bounded intensity</h3><p>A short launch or incident window with explicit duration, stop conditions, mandatory review, and recovery.</p></article>
            <article className="mh-mode"><small>FOUNDER TEST-PILOT</small><strong>60–120x+</strong><h3>Experimental edge</h3><p>High emotional and cognitive load. Voluntary, observed, recoverable—and never the normal operating standard.</p></article>
          </div>
          <div className="mh-note">If output rises while health, agency, relationships, or judgment deteriorate, the system is failing even when every dashboard is green.</div>
        </div>
      </section>

      <section className="mh-section" id="recovery">
        <div className="mh-shell">
          <div className="mh-section-head">
            <div><div className="mh-eyebrow"><TimerReset size={15} /> Recovery telemetry</div><h2>Six to eight hours of being human again.</h2></div>
            <p className="mh-section-intro">
              On July 26, Mason deliberately put down the phone and headphones for a six-to-eight-hour block. The absence of the system revealed how much attention it had occupied. Recovery was not a reward after work; it was infrastructure required for continuing judgment.
            </p>
          </div>
          <div className="mh-grid-2">
            <article className="mh-card"><div className="mh-card-icon"><Clock3 size={20}/></div><h3>Human time is a separate clock</h3><p>Branching, comparison, and code may compress. Meaning, family repair, emotional processing, trust, and recovery often require elapsed time.</p></article>
            <article className="mh-card"><div className="mh-card-icon"><HeartHandshake size={20}/></div><h3>Family is inside the system boundary</h3><p>A household absorbs attention loss, schedule volatility, emotional spillover, and uncertainty. That cost cannot remain invisible.</p></article>
          </div>
        </div>
      </section>

      <section className="mh-section" id="trust">
        <div className="mh-shell">
          <div className="mh-section-head">
            <div><div className="mh-eyebrow"><ShieldCheck size={15} /> Calibrated trust</div><h2>Resistance is sometimes risk telemetry.</h2></div>
            <p className="mh-section-intro">
              Humans are being asked to surrender meaningful control to increasingly opaque systems. Distrust is not automatically a skill deficit, laziness, or an irrational adoption defect. The system has to earn trust before institutions demand it.
            </p>
          </div>
          <div className="mh-trust">
            <div className="mh-quote">Trust is not a prerequisite the human owes the system. Trust is an operational outcome the system must continuously earn.</div>
            <div className="mh-trust-list">
              {trustControls.map((item)=><div className="mh-trust-item" key={item}><ShieldCheck size={16}/><span>{item}</span></div>)}
            </div>
          </div>
          <div className="mh-note">Terminator 2 is a fictional cultural reference, not evidence of present AI intent. The relevant human lesson is narrower: machine capability without governable authority, reversibility, accountability, or recourse is a legitimate threat model.</div>
        </div>
      </section>

      <section className="mh-section" id="umbra">
        <div className="mh-shell">
          <div className="mh-section-head">
            <div><div className="mh-eyebrow"><Network size={15} /> Trust architecture</div><h2>UMBRA earns the right. PENUMBRA makes it legible.</h2></div>
            <p className="mh-section-intro">
              Speed is the output people notice. Governed discovery makes the speed credible. The hidden and visible layers must remain connected.
            </p>
          </div>
          <div className="mh-umbra">
            <article className="mh-side"><h3>UMBRA</h3><p>The invisible operating layer that earns trust.</p><ul><li>Evidence and provenance</li><li>Authority and permissions</li><li>Context and continuity</li><li>Recursive triage</li><li>Rollback, recovery, and accountability</li></ul></article>
            <article className="mh-side"><h3>PENUMBRA</h3><p>The visible experience that makes governance usable.</p><ul><li>Familiar human channels</li><li>Explanations and warnings</li><li>Approval and intervention controls</li><li>Status and graceful degraded modes</li><li>Useful outputs without permanent cognitive occupancy</li></ul></article>
          </div>
          <div className="mh-note">KairoNull or another immutable layer can preserve a tamper-evident receipt of evidence, policy, authority, configuration, action, and revision. Immutability preserves the claim; it does not make the claim true.</div>
        </div>
      </section>

      <section className="mh-section" id="review">
        <div className="mh-shell">
          <div className="mh-section-head">
            <div><div className="mh-eyebrow"><BrainCircuit size={15} /> Red-team invitation</div><h2>Attack the machine and the human model together.</h2></div>
            <p className="mh-section-intro">
              The strongest next step is not praise. It is qualified criticism that identifies unsupported claims, missing variables, surveillance risk, unhealthy defaults, and evidence required for a defensible longitudinal study.
            </p>
          </div>
          <div className="mh-questions">
            <article className="mh-question"><strong>For G. Scott Tomlin and proof-of-work reviewers</strong><ol><li>When does a body of work outperform a résumé, and when does it merely create portfolio privilege?</li><li>Which receipts actually reveal judgment?</li><li>Can operational age be measured without turning activity into theater?</li><li>How should Destiny resist gaming, bias, and surveillance?</li><li>Which parts of the architecture are reusable beyond the founder?</li></ol></article>
            <article className="mh-question"><strong>For Ira Wolfe and human-systems reviewers</strong><ol><li>How should healthy curiosity be distinguished from harmful loss of control?</li><li>Which human outcomes must be measured before calling compression successful?</li><li>How do trust, identity, usefulness, incentives, safety, and authority interact across generations?</li><li>Can resistance be treated as risk telemetry without letting inertia veto all change?</li><li>What recovery protocol belongs inside the product?</li></ol></article>
          </div>
          <div className="mh-boundary"><strong>Private distribution boundary</strong><p>This unlisted page is a working review surface. It does not claim endorsement, independent validation, investment interest, customer adoption, production readiness, or access to the private Hive. Corrections should be attributed and preserved as descendant versions.</p></div>
        </div>
      </section>

      <section className="mh-section" id="workroom">
        <div className="mh-shell">
          <div className="mh-cta">
            <div><div className="mh-eyebrow"><Phone size={15} /> Quiet AI interface</div><h2>Call a workroom.</h2><p>The long-term system should not feel like operating a swarm. It should feel like reaching a capable, governed colleague through a familiar human channel. Call NEURAXIS and press 1 for a shared workroom.</p></div>
            <a href="tel:+19498056990" className="mh-phone" data-telemetry="neuraxis-call"><Phone size={30}/><strong>+1 (949) 805-6990</strong><span>PRESS 1 FOR A WORKROOM</span></a>
          </div>
        </div>
      </section>

      <footer className="mh-footer">
        <div className="mh-shell mh-footer-row"><div>NULLWORKS · THE MACHINE AND THE HUMAN · PRIVATE RED-TEAM v0.1</div><span>Record the signal first. Score later. Preserve the source. Human Authority remains final.</span></div>
      </footer>
    </main>
  );
}
