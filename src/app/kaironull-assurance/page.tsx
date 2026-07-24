import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CircleDot,
  FileCheck2,
  Fingerprint,
  Gauge,
  GitBranch,
  LockKeyhole,
  Mail,
  Network,
  ScanSearch,
  ShieldCheck,
  TimerReset,
  UserRoundCheck,
} from "lucide-react";

const canonical = "https://mason-portfolio-main.vercel.app/kaironull-assurance";

export const metadata: Metadata = {
  title: "KairoNull Assurance Run | NULLWORKS",
  description:
    "A redacted 30-second engineering receipt for the July 24, 2026 NULLWORKS KairoNull Pressure Cooker run: frozen source, blind parallel analysis, evidence witnesses, telemetry, human authority, and revision control.",
  robots: { index: false, follow: false },
  alternates: { canonical },
  openGraph: {
    title: "Pressure-test the system. Then pressure-test the test.",
    description:
      "A redacted engineering work-product receipt from NULLWORKS: one frozen source, three isolated analysts, two observer layers, and final Human Authority.",
    type: "website",
    url: canonical,
    siteName: "NULLWORKS",
  },
};

const telemetryScript = String.raw`
(() => {
  const route = "/kaironull-assurance";
  const key = "nw:kaironull-assurance:ledger";
  const sessionKey = "nw:kaironull-assurance:session";
  const startedAt = Date.now();
  const sessionId = sessionStorage.getItem(sessionKey) ||
    (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2));
  sessionStorage.setItem(sessionKey, sessionId);

  const readLedger = () => {
    try { return JSON.parse(localStorage.getItem(key) || "[]"); }
    catch { return []; }
  };

  const updateCount = () => {
    const node = document.getElementById("ka-telemetry-count");
    if (node) node.textContent = String(readLedger().filter((item) => item.sessionId === sessionId).length);
  };

  const emit = (event, detail = {}) => {
    const record = {
      receiptVersion: "KA-RUN-20260724.1",
      event,
      route,
      sessionId,
      occurredAt: new Date().toISOString(),
      detail,
    };
    const ledger = readLedger();
    ledger.push(record);
    localStorage.setItem(key, JSON.stringify(ledger.slice(-120)));
    updateCount();
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
    node.addEventListener("click", () => emit("cta_click", { target: node.getAttribute("data-telemetry") || "unknown" }));
  });

  const viewed = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || viewed.has(entry.target.id)) return;
      viewed.add(entry.target.id);
      emit("section_view", { section: entry.target.id });
    });
  }, { threshold: 0.42 });
  document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));

  const timer = window.setTimeout(() => emit("read_30_seconds"), 30000);
  window.addEventListener("pagehide", () => {
    window.clearTimeout(timer);
    emit("page_exit", { seconds: Math.round((Date.now() - startedAt) / 1000) });
  }, { once: true });

  updateCount();
})();
`;

const steps = [
  {
    icon: Fingerprint,
    number: "01",
    title: "FREEZE THE SOURCE",
    body: "Preserve the supplied bundle, source hash, governing prompt, timestamps, and an independent evidence channel before interpretation begins.",
  },
  {
    icon: GitBranch,
    number: "02",
    title: "SPLIT THE ANALYSIS",
    body: "Run one unblinded reference condition and two blind independent replicates without cross-room output visibility.",
  },
  {
    icon: Network,
    number: "03",
    title: "WATCH THE WATCHERS",
    body: "Use a constrained non-analytic witness to preserve events and a separate meta-observer to test experiment integrity.",
  },
  {
    icon: UserRoundCheck,
    number: "04",
    title: "RETURN AUTHORITY",
    body: "Freeze raw outputs, preserve disagreement, adjudicate by evidence rather than vote count, and keep final claims under Human Authority.",
  },
];

const engineeringMap = [
  ["Problem framing", "Bounded scope, prohibited actions, source authority, and stop rules."],
  ["Architecture", "System map, data flow, trust boundaries, authority boundaries, and dependencies."],
  ["Test design", "Reference condition, blind replicates, witness layer, meta-observer, and disclosure gate."],
  ["Data integrity", "Frozen inputs, source hashes, raw-output preservation, timestamps, and independent custody."],
  ["Observability", "Event ledger, divergence telemetry, decision receipts, and detection of process contamination."],
  ["Change control", "Claim → challenge → evidence → disposition → version → retest → residual risk."],
];

const status = [
  ["Procedure report", "FROZEN", "15-page internal method report preserved through timestamped email delivery."],
  ["Three analyst runs", "ACTIVE", "Parallel source analysis continues without topology disclosure to the blind rooms."],
  ["Evidence reconciliation", "NEXT", "Freeze and hash raw outputs, witness ledger, and meta-assurance review before synthesis."],
  ["Substantive findings", "PRIVATE", "No architecture findings, secrets, customer material, or unsupported claims appear on this page."],
];

export default function KairoNullAssurancePage() {
  return (
    <main className="ka-page">
      <script dangerouslySetInnerHTML={{ __html: telemetryScript }} />
      <style>{`
        .ka-page {
          --ink: #050706;
          --panel: rgba(9, 15, 11, .82);
          --panel-strong: #09100c;
          --paper: #edf5ef;
          --muted: #9dafA3;
          --acid: #a5ff37;
          --acid-soft: #d7ff9e;
          --cyan: #7ce7e4;
          --line: rgba(165, 255, 55, .19);
          min-height: 100vh;
          overflow-x: hidden;
          color: var(--paper);
          background:
            radial-gradient(circle at 82% 8%, rgba(124, 231, 228, .12), transparent 27rem),
            radial-gradient(circle at 12% 22%, rgba(165, 255, 55, .08), transparent 30rem),
            linear-gradient(180deg, #050706 0%, #07100a 46%, #030504 100%);
          isolation: isolate;
        }
        .ka-page::before {
          position: fixed;
          inset: 0;
          z-index: -2;
          opacity: .58;
          background-image:
            linear-gradient(rgba(165,255,55,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(165,255,55,.025) 1px, transparent 1px);
          background-size: 34px 34px;
          content: "";
          pointer-events: none;
          mask-image: linear-gradient(to bottom, black, transparent 92%);
        }
        .ka-shell { width: min(1160px, calc(100% - 30px)); margin: 0 auto; }
        .ka-header {
          position: sticky; top: 0; z-index: 40;
          display: flex; align-items: center; justify-content: space-between; gap: 18px;
          min-height: 70px; padding: 12px max(15px, calc((100vw - 1160px)/2));
          border-bottom: 1px solid rgba(255,255,255,.07);
          background: rgba(3,7,4,.82); backdrop-filter: blur(18px);
        }
        .ka-brand { display: flex; align-items: center; gap: 11px; color: inherit; text-decoration: none; }
        .ka-mark { display: grid; width: 42px; height: 42px; place-items: center; border: 1px solid rgba(165,255,55,.55); color: var(--acid-soft); font-family: var(--font-geist-mono), monospace; font-weight: 900; font-size: 12px; }
        .ka-brand strong { display: block; font-size: 12px; letter-spacing: .19em; }
        .ka-brand small { display: block; margin-top: 3px; color: #758579; font-family: var(--font-geist-mono), monospace; font-size: 9px; letter-spacing: .11em; }
        .ka-live { display: inline-flex; align-items: center; gap: 8px; padding: 8px 11px; border: 1px solid rgba(165,255,55,.26); border-radius: 999px; color: var(--acid-soft); font-family: var(--font-geist-mono), monospace; font-size: 10px; letter-spacing: .12em; }
        .ka-live i { width: 7px; height: 7px; border-radius: 50%; background: var(--acid); box-shadow: 0 0 14px rgba(165,255,55,.78); }
        .ka-hero { position: relative; display: grid; grid-template-columns: minmax(0,1.15fr) minmax(360px,.85fr); gap: clamp(34px,6vw,80px); align-items: center; min-height: calc(100vh - 70px); padding: 70px 0 64px; }
        .ka-kicker { display: inline-flex; align-items: center; gap: 8px; margin: 0; color: var(--acid-soft); font-family: var(--font-geist-mono), monospace; font-size: 11px; font-weight: 800; letter-spacing: .15em; text-transform: uppercase; }
        .ka-hero h1 { max-width: 870px; margin: 20px 0 0; font-size: clamp(50px,7.8vw,102px); line-height: .91; letter-spacing: -.07em; text-wrap: balance; }
        .ka-hero h1 span { color: var(--acid); text-shadow: 0 0 42px rgba(165,255,55,.12); }
        .ka-lead { max-width: 760px; margin: 27px 0 0; color: #d0ddd3; font-size: clamp(18px,2vw,24px); line-height: 1.48; text-wrap: balance; }
        .ka-body { max-width: 720px; margin: 16px 0 0; color: var(--muted); font-size: 15px; line-height: 1.75; }
        .ka-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
        .ka-button { display: inline-flex; align-items: center; justify-content: center; gap: 9px; min-height: 48px; padding: 0 17px; border-radius: 999px; text-decoration: none; font-size: 12px; font-weight: 850; }
        .ka-primary { background: var(--acid); color: #071008; box-shadow: 0 16px 42px rgba(165,255,55,.13); }
        .ka-secondary { border: 1px solid rgba(165,255,55,.36); color: var(--acid-soft); background: rgba(9,16,12,.68); }
        .ka-stat-row { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 9px; margin-top: 31px; }
        .ka-stat { padding: 13px; border: 1px solid var(--line); background: rgba(9,16,12,.6); }
        .ka-stat strong { display: block; color: var(--acid); font-size: 25px; }
        .ka-stat span { display: block; margin-top: 4px; color: #9dafA3; font-size: 10px; line-height: 1.35; letter-spacing: .08em; text-transform: uppercase; }
        .ka-topology { position: relative; min-height: 610px; border: 1px solid rgba(165,255,55,.2); background: linear-gradient(180deg,rgba(11,22,15,.88),rgba(4,8,5,.76)); box-shadow: inset 0 0 80px rgba(165,255,55,.025), 0 34px 100px rgba(0,0,0,.25); overflow: hidden; }
        .ka-topology::before { position:absolute; inset:0; background: radial-gradient(circle at 50% 45%, rgba(165,255,55,.1), transparent 44%); content:""; }
        .ka-top-label { position: absolute; top: 18px; left: 18px; right: 18px; display: flex; justify-content: space-between; color: #748276; font-family: var(--font-geist-mono), monospace; font-size: 9px; letter-spacing: .13em; }
        .ka-node { position: absolute; z-index: 2; display: grid; place-items: center; width: 104px; min-height: 76px; padding: 10px; border: 1px solid rgba(165,255,55,.3); background: rgba(5,10,7,.88); text-align: center; box-shadow: 0 0 30px rgba(165,255,55,.04); }
        .ka-node strong { color: var(--paper); font-size: 10px; line-height: 1.2; letter-spacing: .08em; }
        .ka-node span { margin-top: 5px; color: #758579; font-family: var(--font-geist-mono), monospace; font-size: 8px; }
        .ka-node svg { margin-bottom: 7px; color: var(--acid); }
        .ka-human { top: 74px; left: 50%; width: 144px; transform: translateX(-50%); border-color: rgba(124,231,228,.48); }
        .ka-reference { top: 230px; left: 7%; }
        .ka-blind-a { top: 230px; left: 50%; transform: translateX(-50%); }
        .ka-blind-b { top: 230px; right: 7%; }
        .ka-witness { bottom: 116px; left: 21%; }
        .ka-meta { bottom: 116px; right: 21%; }
        .ka-source { bottom: 25px; left: 50%; width: 174px; min-height: 62px; transform: translateX(-50%); border-color: rgba(255,255,255,.18); }
        .ka-line { position: absolute; z-index: 1; height: 1px; transform-origin: left center; background: linear-gradient(90deg,rgba(165,255,55,.08),rgba(165,255,55,.48),rgba(165,255,55,.08)); }
        .ka-l1 { top: 190px; left: 50%; width: 195px; transform: rotate(145deg); }
        .ka-l2 { top: 190px; left: 50%; width: 155px; transform: rotate(90deg); }
        .ka-l3 { top: 190px; left: 50%; width: 195px; transform: rotate(35deg); }
        .ka-l4 { top: 347px; left: 15%; width: 235px; transform: rotate(31deg); }
        .ka-l5 { top: 347px; right: 15%; width: 235px; transform: rotate(149deg); transform-origin: right center; }
        .ka-l6 { bottom: 100px; left: 50%; width: 145px; transform: rotate(215deg); }
        .ka-l7 { bottom: 100px; left: 50%; width: 145px; transform: rotate(-35deg); }
        .ka-section { padding: 82px 0; border-top: 1px solid rgba(255,255,255,.07); }
        .ka-section-head { display: grid; grid-template-columns: .72fr 1.28fr; gap: 30px; align-items: end; margin-bottom: 30px; }
        .ka-section-head span { color: var(--acid); font-family: var(--font-geist-mono), monospace; font-size: 10px; font-weight: 800; letter-spacing: .16em; }
        .ka-section-head h2 { margin: 0; font-size: clamp(33px,5vw,64px); line-height: 1; letter-spacing: -.045em; }
        .ka-section-head p { margin: 13px 0 0; color: var(--muted); line-height: 1.7; }
        .ka-step-grid { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 10px; }
        .ka-step { min-height: 245px; padding: 22px; border: 1px solid var(--line); background: var(--panel); }
        .ka-step-top { display:flex; align-items:center; justify-content:space-between; color:var(--acid); font-family:var(--font-geist-mono),monospace; font-size:11px; }
        .ka-step h3 { margin: 46px 0 0; font-size: 18px; letter-spacing: -.02em; }
        .ka-step p { margin: 12px 0 0; color: var(--muted); font-size: 13px; line-height: 1.65; }
        .ka-loop { display: flex; flex-wrap: wrap; align-items: center; gap: 9px; padding: 22px; border: 1px solid rgba(124,231,228,.18); background: rgba(7,15,12,.72); }
        .ka-loop span { padding: 9px 11px; border: 1px solid rgba(165,255,55,.2); color: var(--acid-soft); font-family: var(--font-geist-mono), monospace; font-size: 10px; letter-spacing: .08em; }
        .ka-loop i { width: 18px; height: 1px; background: rgba(124,231,228,.5); }
        .ka-status-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; }
        .ka-status-card { display: grid; grid-template-columns: 1fr auto; gap: 10px 20px; padding: 20px; border: 1px solid rgba(255,255,255,.09); background: rgba(9,15,11,.74); }
        .ka-status-card h3 { margin: 0; font-size: 17px; }
        .ka-status-card b { color: var(--acid); font-family: var(--font-geist-mono),monospace; font-size: 10px; letter-spacing: .1em; }
        .ka-status-card p { grid-column: 1/-1; margin: 0; color: var(--muted); font-size: 13px; line-height: 1.6; }
        .ka-map { border: 1px solid var(--line); background: rgba(7,13,9,.78); }
        .ka-map-row { display: grid; grid-template-columns: minmax(160px,.55fr) 1.45fr; gap: 22px; padding: 18px 20px; border-top: 1px solid rgba(255,255,255,.07); }
        .ka-map-row:first-child { border-top: 0; }
        .ka-map-row strong { color: var(--acid-soft); font-size: 13px; }
        .ka-map-row span { color: var(--muted); font-size: 13px; line-height: 1.55; }
        .ka-boundary { display: grid; grid-template-columns: .85fr 1.15fr; gap: 12px; }
        .ka-boundary-card { padding: 27px; border: 1px solid rgba(124,231,228,.2); background: rgba(7,15,12,.76); }
        .ka-boundary-card h3 { display:flex; align-items:center; gap:9px; margin:0; font-size:21px; }
        .ka-boundary-card p { color:var(--muted); line-height:1.72; }
        .ka-boundary-card ul { margin:18px 0 0; padding:0; list-style:none; }
        .ka-boundary-card li { position:relative; padding:10px 0 10px 22px; border-top:1px solid rgba(255,255,255,.06); color:#c8d4ca; font-size:13px; line-height:1.5; }
        .ka-boundary-card li::before { position:absolute; left:0; color:var(--acid); content:"+"; }
        .ka-cta { display:grid; grid-template-columns:1.25fr .75fr; gap:28px; align-items:center; padding:42px; border:1px solid rgba(165,255,55,.27); background:linear-gradient(135deg,rgba(13,28,18,.96),rgba(5,10,7,.95)); }
        .ka-cta h2 { margin:0; font-size:clamp(31px,5vw,62px); line-height:.98; letter-spacing:-.05em; }
        .ka-cta p { max-width:700px; color:var(--muted); line-height:1.7; }
        .ka-telemetry { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-top:18px; padding:14px 16px; border:1px solid rgba(165,255,55,.18); background:rgba(4,9,6,.72); color:#819083; font-family:var(--font-geist-mono),monospace; font-size:9px; letter-spacing:.08em; }
        .ka-telemetry strong { color:var(--acid); }
        .ka-footer { display:flex; justify-content:space-between; gap:20px; padding:28px 0 48px; color:#68766b; font-size:11px; }
        @media (max-width: 900px) {
          .ka-hero { grid-template-columns:1fr; min-height:auto; padding-top:54px; }
          .ka-topology { min-height:570px; }
          .ka-step-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .ka-section-head, .ka-boundary, .ka-cta { grid-template-columns:1fr; }
          .ka-section-head { align-items:start; }
        }
        @media (max-width: 620px) {
          .ka-header { padding:10px 14px; }
          .ka-brand small { display:none; }
          .ka-live { padding:7px 9px; font-size:8px; }
          .ka-shell { width:min(100% - 20px,1160px); }
          .ka-hero { gap:28px; padding:46px 0 42px; }
          .ka-hero h1 { font-size:clamp(45px,15vw,70px); }
          .ka-stat-row { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .ka-topology { min-height:650px; }
          .ka-node { width:88px; min-height:72px; padding:8px; }
          .ka-human { top:60px; width:128px; }
          .ka-reference { top:210px; left:4%; }
          .ka-blind-a { top:210px; }
          .ka-blind-b { top:210px; right:4%; }
          .ka-witness { bottom:150px; left:8%; }
          .ka-meta { bottom:150px; right:8%; }
          .ka-source { bottom:33px; width:160px; }
          .ka-line { display:none; }
          .ka-section { padding:62px 0; }
          .ka-step-grid, .ka-status-grid { grid-template-columns:1fr; }
          .ka-step { min-height:0; }
          .ka-step h3 { margin-top:28px; }
          .ka-map-row { grid-template-columns:1fr; gap:8px; }
          .ka-cta { padding:28px 20px; }
          .ka-actions .ka-button { width:100%; }
          .ka-telemetry, .ka-footer { align-items:flex-start; flex-direction:column; }
        }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior:auto; } }
      `}</style>

      <header className="ka-header">
        <a className="ka-brand" href="/" data-telemetry="home">
          <span className="ka-mark">NW</span>
          <span><strong>NULLWORKS</strong><small>GOVERNED ENGINEERING RECEIPT</small></span>
        </a>
        <span className="ka-live"><i /> REDACTED · LIVE · 2026-07-24</span>
      </header>

      <div className="ka-shell">
        <section className="ka-hero" id="overview">
          <div>
            <p className="ka-kicker"><FileCheck2 size={16} /> Work product &gt; résumé</p>
            <h1>Pressure-test the system. <span>Then pressure-test the test.</span></h1>
            <p className="ka-lead">
              Today NULLWORKS turned one authorized KairoNull source bundle into a governed assurance experiment with isolated analysis, independent evidence custody, observer controls, telemetry, and final Human Authority.
            </p>
            <p className="ka-body">
              This page is the 30-second engineering receipt. It explains the architecture of the work without publishing the confidential source, substantive findings, internal prompts, or crown-jewel orchestration details.
            </p>
            <div className="ka-actions">
              <a className="ka-button ka-primary" href="#method" data-telemetry="read_method">See the method <ArrowRight size={16} /></a>
              <a className="ka-button ka-secondary" href="/pressure-cooker" data-telemetry="open_pressure_cooker">Open Pressure Cooker <Gauge size={16} /></a>
            </div>
            <div className="ka-stat-row">
              <div className="ka-stat"><strong>1</strong><span>Frozen source condition</span></div>
              <div className="ka-stat"><strong>3</strong><span>Isolated analyst runs</span></div>
              <div className="ka-stat"><strong>2</strong><span>Observer layers</span></div>
              <div className="ka-stat"><strong>1</strong><span>Final Human Authority</span></div>
            </div>
          </div>

          <div className="ka-topology" aria-label="Redacted five-node assurance topology">
            <div className="ka-top-label"><span>ASSURANCE TOPOLOGY</span><span>REDACTED VIEW</span></div>
            <div className="ka-line ka-l1" /><div className="ka-line ka-l2" /><div className="ka-line ka-l3" />
            <div className="ka-line ka-l4" /><div className="ka-line ka-l5" /><div className="ka-line ka-l6" /><div className="ka-line ka-l7" />
            <div className="ka-node ka-human"><UserRoundCheck size={20} /><strong>HUMAN AUTHORITY</strong><span>FINAL CLAIM + CONSEQUENCE OWNER</span></div>
            <div className="ka-node ka-reference"><ScanSearch size={19} /><strong>REFERENCE ANALYST</strong><span>UNBLINDED CONDITION</span></div>
            <div className="ka-node ka-blind-a"><LockKeyhole size={19} /><strong>BLIND ANALYST A</strong><span>INDEPENDENT REPLICATE</span></div>
            <div className="ka-node ka-blind-b"><LockKeyhole size={19} /><strong>BLIND ANALYST B</strong><span>INDEPENDENT REPLICATE</span></div>
            <div className="ka-node ka-witness"><CircleDot size={19} /><strong>EVIDENCE WITNESS</strong><span>OBSERVE · TIMESTAMP · PRESERVE</span></div>
            <div className="ka-node ka-meta"><ShieldCheck size={19} /><strong>META-OBSERVER</strong><span>TEST EXPERIMENT INTEGRITY</span></div>
            <div className="ka-node ka-source"><Fingerprint size={18} /><strong>IDENTICAL FROZEN SOURCE</strong><span>HASH + SCOPE + PROMPT</span></div>
          </div>
        </section>

        <section className="ka-section" id="method">
          <div className="ka-section-head">
            <span>01 // THE 30-SECOND METHOD</span>
            <div><h2>Controlled recursion, not infinite recursion.</h2><p>Every layer has a different job. Analysts evaluate the system. The witness preserves events. The meta-observer evaluates the experiment. Mason decides what the evidence supports.</p></div>
          </div>
          <div className="ka-step-grid">
            {steps.map((step) => {
              const Icon = step.icon;
              return <article className="ka-step" key={step.number}><div className="ka-step-top"><span>{step.number}</span><Icon size={20} /></div><h3>{step.title}</h3><p>{step.body}</p></article>;
            })}
          </div>
        </section>

        <section className="ka-section" id="receipt-loop">
          <div className="ka-section-head">
            <span>02 // RECEIPT GRAMMAR</span>
            <div><h2>The test runs through the discipline it is testing.</h2><p>No silent gap filling. No majority-vote truth. No correction without lineage. Disagreement survives as telemetry.</p></div>
          </div>
          <div className="ka-loop" aria-label="KairoNull and NULLWORKS receipt loop">
            {['CLAIM','CHALLENGE','EVIDENCE','FINDING','DISPOSITION','VERSION','RETEST','RESIDUAL RISK'].map((item, index, list) => <span key={item}>{item}</span>).reduce<React.ReactNode[]>((acc, item, index, list) => { acc.push(item); if (index < list.length - 1) acc.push(<i key={`line-${index}`} />); return acc; }, [])}
          </div>
        </section>

        <section className="ka-section" id="status">
          <div className="ka-section-head">
            <span>03 // TODAY'S RECEIPTS</span>
            <div><h2>What exists now—and what does not.</h2><p>The method report is frozen. The parallel analysis remains active. The final package waits for raw-output freeze, reconciliation, evidence-first adjudication, correction architecture, and retest receipts.</p></div>
          </div>
          <div className="ka-status-grid">
            {status.map(([title, state, body]) => <article className="ka-status-card" key={title}><h3>{title}</h3><b>{state}</b><p>{body}</p></article>)}
          </div>
        </section>

        <section className="ka-section" id="engineering">
          <div className="ka-section-head">
            <span>04 // ENGINEERING EVIDENCE</span>
            <div><h2>A living work sample instead of a résumé claim.</h2><p>The value is not “I used AI.” The value is that a consequential technical review was scoped, isolated, instrumented, governed, frozen, versioned, and prepared for independent challenge.</p></div>
          </div>
          <div className="ka-map">
            {engineeringMap.map(([title, body]) => <div className="ka-map-row" key={title}><strong>{title}</strong><span>{body}</span></div>)}
          </div>
        </section>

        <section className="ka-section" id="boundary">
          <div className="ka-boundary">
            <article className="ka-boundary-card">
              <h3><BadgeCheck size={22} /> What may be shown</h3>
              <p>A redacted engineering packet can demonstrate method, architecture, receipts, correction lineage, and completed retests without exposing Dane's confidential source or NULLWORKS crown-jewel controls.</p>
              <ul><li>Public 30-second receipt</li><li>Redacted procedure packet</li><li>NDA-gated technical review</li><li>Versioned retest evidence</li></ul>
            </article>
            <article className="ka-boundary-card">
              <h3><LockKeyhole size={22} /> What is not being claimed</h3>
              <p>This is independent operational challenge and revision assurance—not self-certification, a formal penetration test, regulatory approval, a compliance guarantee, or proof that no vulnerabilities remain.</p>
              <ul><li>No confidential findings published</li><li>No production testing represented</li><li>No silent authority granted to AI</li><li>No fake finish line</li></ul>
            </article>
          </div>
        </section>

        <section className="ka-section" id="review">
          <div className="ka-cta">
            <div><p className="ka-kicker"><Boxes size={16} /> Review path</p><h2>See the work. Then ask for the layer you need.</h2><p>Start with this page. The next layer can be a redacted report, a live walkthrough, an NDA-gated packet, or a technical red-team review focused on the evidence and architecture rather than a résumé narrative.</p></div>
            <div className="ka-actions">
              <a className="ka-button ka-primary" href="mailto:masoncalcolsol@gmail.com?subject=KairoNull%20Assurance%20Engineering%20Receipt&body=I%20reviewed%20the%2030-second%20KairoNull%20assurance%20receipt.%20Please%20send%20the%20appropriate%20next-layer%20packet." data-telemetry="request_packet">Request the next layer <Mail size={16} /></a>
              <a className="ka-button ka-secondary" href="/operating-map" data-telemetry="open_operating_map">View operating map <ArrowRight size={16} /></a>
            </div>
          </div>
          <div className="ka-telemetry"><span><strong>LIVE SESSION RECEIPT:</strong> <span id="ka-telemetry-count">0</span> local events · page view, section views, 30-second read, CTA clicks, and exit duration</span><span>NO FORM · NO COOKIE · NO CROSS-SITE PROFILE</span></div>
        </section>

        <footer className="ka-footer"><span>Mason Perry · Founder, NULLWORKS · Operational Intelligence Systems Architect</span><span>Human Authority Final · KA-RUN-20260724.1</span></footer>
      </div>
    </main>
  );
}
