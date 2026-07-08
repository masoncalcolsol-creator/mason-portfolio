"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  FileSearch,
  Gauge,
  GitBranch,
  Network,
  ScanLine,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import styles from "./caseforge.module.css";

type FactFlag = "domesticViolence" | "relocation" | "substance" | "school" | "messages" | "priorOrder";
type ArgumentId = "bestInterests" | "decisionMaking" | "parentingTime" | "evidencePattern" | "procedure" | "discovery" | "emergency";

type Matter = {
  id: string;
  client: string;
  opposing: string;
  child: string;
  county: string;
  motion: string;
  templateMatter: string;
  status: string;
  urgency: string;
  assignedOperator: string;
  attorneyGate: string;
};

type EvidenceHit = {
  id: string;
  label: string;
  page: number;
  quote: string;
  weight: number;
  sourceType: string;
  flags: FactFlag[];
};

type ArgumentCard = {
  id: ArgumentId;
  title: string;
  baseStrength: number;
  source: string;
  reason: string;
  requiredFlags: FactFlag[];
  evidenceIds: string[];
  risk: string;
};

const flagLabels: Record<FactFlag, string> = {
  domesticViolence: "Domestic violence supported",
  relocation: "Relocation issue",
  substance: "Substance / impairment concern",
  school: "School stability issue",
  messages: "TalkingParents evidence",
  priorOrder: "Prior order / parenting plan",
};

const matters: Matter[] = [
  {
    id: "jones",
    client: "Jones",
    opposing: "Jones",
    child: "Minor Child",
    county: "Maricopa County",
    motion: "Emergency orders + discovery response",
    templateMatter: "Thompson",
    status: "Drafting",
    urgency: "24 hour rush",
    assignedOperator: "Senior family-law operator",
    attorneyGate: "Required before export",
  },
  {
    id: "garcia",
    client: "Garcia",
    opposing: "Garcia",
    child: "A.G.",
    county: "Maricopa County",
    motion: "Parenting-time modification packet",
    templateMatter: "Garcia",
    status: "Indexed",
    urgency: "Standard",
    assignedOperator: "Document prep lane",
    attorneyGate: "Required before filing",
  },
  {
    id: "thompson",
    client: "Thompson",
    opposing: "Thompson",
    child: "T.T.",
    county: "Maricopa County",
    motion: "Prior response framework",
    templateMatter: "Thompson",
    status: "Review",
    urgency: "Closed template",
    assignedOperator: "Matter memory",
    attorneyGate: "Historical only",
  },
];

const legalSources = [
  ["Official statute slot", "Arizona Revised Statutes Title 25", "Required before any statute citation becomes usable."],
  ["Official court slot", "Arizona Judicial Branch rules", "Procedure, timing, and form checks before final draft."],
  ["Local court slot", "Maricopa County family forms", "Caption, packet, filing posture, and local-form sanity checks."],
  ["Licensed citator slot", "Westlaw / equivalent connector", "Not connected in beta source. Future case-law verification requires a licensed source."],
  ["Matter memory slot", "Prior pleadings and outcomes", "Pattern memory only. Never controlling law without official or licensed verification."],
];

const evidenceBank: EvidenceHit[] = [
  {
    id: "tp-004",
    label: "TalkingParents page 4 — exchange dispute",
    page: 4,
    quote: "Holiday-exchange language appears near the start of the transcript and should be checked against the signed PDF.",
    weight: 91,
    sourceType: "TalkingParents transcript",
    flags: ["messages", "school"],
  },
  {
    id: "tp-118",
    label: "TalkingParents page 118 — schedule-change pattern",
    page: 118,
    quote: "Repeated schedule-change requests may support a stability argument if attorney review confirms context.",
    weight: 77,
    sourceType: "TalkingParents transcript",
    flags: ["messages", "priorOrder"],
  },
  {
    id: "tp-322",
    label: "TalkingParents page 322 — escalation language",
    page: 322,
    quote: "Escalating language is relevant only if marked material, admissible, and not misleading in context.",
    weight: 63,
    sourceType: "TalkingParents transcript",
    flags: ["messages", "domesticViolence"],
  },
  {
    id: "order-001",
    label: "Prior order excerpt — decision-making framework",
    page: 1,
    quote: "Existing decision-making language must be imported exactly from the current order, not reconstructed from memory.",
    weight: 86,
    sourceType: "Existing order",
    flags: ["priorOrder"],
  },
  {
    id: "disc-009",
    label: "Discovery request 9 — school records",
    page: 9,
    quote: "Discovery response can be drafted from indexed school and message exhibits after privilege and scope review.",
    weight: 74,
    sourceType: "Discovery request",
    flags: ["school", "priorOrder"],
  },
];

const baseArguments: ArgumentCard[] = [
  {
    id: "bestInterests",
    title: "Best-interests framework",
    baseStrength: 88,
    source: "Arizona Title 25 source slot + verified matter facts",
    reason: "Strong default framework because it organizes child-focused facts, stability, communication, and parenting-plan fit without overclaiming.",
    requiredFlags: [],
    evidenceIds: ["tp-004", "tp-118"],
    risk: "Low if tied to verified facts and reviewed by attorney.",
  },
  {
    id: "emergency",
    title: "Emergency-order module",
    baseStrength: 58,
    source: "Attorney-reviewed facts + local rule / form check required",
    reason: "Only appropriate when the record supports urgency, harm, or immediate court attention. Never auto-included from rhetoric alone.",
    requiredFlags: ["domesticViolence"],
    evidenceIds: ["tp-322"],
    risk: "High. Requires human legal authority before use.",
  },
  {
    id: "decisionMaking",
    title: "Legal decision-making / authority allocation",
    baseStrength: 76,
    source: "Prior order + official statute/rule verification required",
    reason: "Useful if requested relief turns on authority, communication, decision deadlock, or ability to co-parent.",
    requiredFlags: ["priorOrder"],
    evidenceIds: ["order-001", "tp-118"],
    risk: "Medium. Prior order must be quoted exactly.",
  },
  {
    id: "parentingTime",
    title: "Parenting-time stability and logistics",
    baseStrength: 82,
    source: "Maricopa family workflow + official statute source slot",
    reason: "Strong where the record shows repeatable exchange, school, travel, routine, or schedule evidence.",
    requiredFlags: ["school"],
    evidenceIds: ["tp-004", "tp-118"],
    risk: "Low to medium depending on requested relief.",
  },
  {
    id: "evidencePattern",
    title: "Evidence-pattern argument",
    baseStrength: 70,
    source: "TalkingParents page-aware source block engine",
    reason: "Useful as supporting architecture: not one quote, but a source-linked pattern with page jumps and attorney-selected context.",
    requiredFlags: ["messages"],
    evidenceIds: ["tp-004", "tp-118", "tp-322"],
    risk: "Medium. Must avoid cherry-picking and preserve context.",
  },
  {
    id: "discovery",
    title: "Discovery response / propounding lane",
    baseStrength: 73,
    source: "Discovery request index + privilege/scope review gate",
    reason: "Turns uploaded discovery into response shell, objection placeholders, production checklist, and missing-item queue.",
    requiredFlags: ["priorOrder"],
    evidenceIds: ["disc-009"],
    risk: "Medium. Privilege and scope review required.",
  },
  {
    id: "procedure",
    title: "Procedure / form compliance guardrail",
    baseStrength: 68,
    source: "Arizona Court Rules + Maricopa forms source slot",
    reason: "Prevents wrong caption, wrong packet, missing attachment, or unsupported filing posture.",
    requiredFlags: [],
    evidenceIds: [],
    risk: "Low but mandatory before export.",
  },
];

const templates = [
  ["Thompson", "92", "Reuse structure A, C, D, and F. Do not reuse domestic-violence module unless Jones has independent support."],
  ["Garcia", "78", "Reuse parenting-time logistics and school-stability framing. Verify prior-order posture."],
  ["Nguyen", "61", "Use only evidence-indexing method. Different county and posture make argument reuse weak."],
];

const workcellTasks = [
  ["Intake", "Normalize parties, child initials, county, current order, requested relief, deadlines, and missing materials."],
  ["Index", "Split pleadings, orders, discovery, correspondence, messages, exhibits, and forms into source-linked records."],
  ["Frame", "Rank argument modules, identify unsupported modules, and suggest reusable prior-matter frameworks."],
  ["Draft", "Assemble editable preview with citations, exhibits, discovery shells, and attorney notes."],
  ["Gate", "Lock PDF/export until professional review, source checks, and approval receipt are complete."],
];

const auditEvents = [
  "Voice prompt processed into matter facts and requested relief.",
  "Domestic-violence module excluded because current prompt says no support.",
  "Thompson template suggested for structure but blocked from blind reuse.",
  "TalkingParents evidence mapped to pages 4, 118, and 322.",
  "Attorney gate remains locked until citation and fact review complete.",
];

function scoreArgument(argument: ArgumentCard, flags: Record<FactFlag, boolean>) {
  const required = argument.requiredFlags.reduce((sum, flag) => sum + (flags[flag] ? 9 : -16), 0);
  const evidence = argument.evidenceIds.reduce((sum, id) => {
    const hit = evidenceBank.find((item) => item.id === id);
    if (!hit) return sum;
    return sum + (hit.flags.some((flag) => flags[flag]) ? 4 : -1);
  }, 0);
  const sensitivePenalty = !flags.domesticViolence && argument.id === "emergency" ? -18 : 0;
  return Math.max(10, Math.min(99, argument.baseStrength + required + evidence + sensitivePenalty));
}

export default function CaseForgePage() {
  const [activeMatterId, setActiveMatterId] = useState("jones");
  const activeMatter = matters.find((item) => item.id === activeMatterId) ?? matters[0];
  const [matter, setMatter] = useState<Matter>(activeMatter);
  const [prompt, setPrompt] = useState("Build a response for Jones using Thompson as a starting point. No domestic violence module unless supported. Emphasize school stability, TalkingParents evidence, the current parenting plan, emergency-order readiness, and discovery response shell.");
  const [flags, setFlags] = useState<Record<FactFlag, boolean>>({
    domesticViolence: false,
    relocation: false,
    substance: false,
    school: true,
    messages: true,
    priorOrder: true,
  });
  const [selected, setSelected] = useState<Record<ArgumentId, boolean>>({
    bestInterests: true,
    decisionMaking: true,
    parentingTime: true,
    evidencePattern: true,
    procedure: true,
    discovery: true,
    emergency: false,
  });
  const [activePage, setActivePage] = useState(4);
  const [approved, setApproved] = useState(false);

  const rankedArguments = useMemo(
    () => baseArguments
      .map((argument) => ({ ...argument, strength: scoreArgument(argument, flags) }))
      .sort((a, b) => b.strength - a.strength),
    [flags],
  );

  const selectedArguments = rankedArguments.filter((argument) => selected[argument.id]);
  const matchedTemplate = templates.find(([name]) => name === matter.templateMatter) ?? templates[0];
  const readiness = Math.min(100, Math.round((selectedArguments.length * 9) + (flags.messages ? 14 : 0) + (flags.priorOrder ? 14 : 0) + (approved ? 20 : 0)));
  const exportLocked = !approved;

  function switchMatter(nextMatter: Matter) {
    setActiveMatterId(nextMatter.id);
    setMatter(nextMatter);
    setApproved(false);
  }

  function setMatterField(field: keyof Matter, value: string) {
    setMatter((current) => ({ ...current, [field]: value }));
  }

  function toggleFlag(flag: FactFlag) {
    const nextValue = !flags[flag];
    setFlags((current) => ({ ...current, [flag]: nextValue }));
    if (flag === "domesticViolence" && !nextValue) {
      setSelected((current) => ({ ...current, emergency: false }));
    }
  }

  function toggleArgument(id: ArgumentId) {
    setSelected((current) => ({ ...current, [id]: !current[id] }));
  }

  function processPrompt() {
    const text = prompt.toLowerCase();
    setFlags((current) => ({
      ...current,
      domesticViolence: text.includes("domestic violence") && !text.includes("no domestic violence"),
      relocation: text.includes("relocation") || text.includes("move away"),
      substance: text.includes("substance") || text.includes("impairment") || text.includes("alcohol"),
      school: current.school || text.includes("school"),
      messages: current.messages || text.includes("talkingparents") || text.includes("message"),
      priorOrder: current.priorOrder || text.includes("order") || text.includes("parenting plan"),
    }));
    if (text.includes("garcia")) setMatterField("templateMatter", "Garcia");
    if (text.includes("nguyen")) setMatterField("templateMatter", "Nguyen");
    if (text.includes("thompson")) setMatterField("templateMatter", "Thompson");
    if (text.includes("emergency")) setSelected((current) => ({ ...current, emergency: true }));
    if (text.includes("discovery")) setSelected((current) => ({ ...current, discovery: true }));
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.kicker}>NULLWORKS LEGAL OPERATIONS WORKCELL</div>
          <h1>CaseForge</h1>
          <p>
            A service-ready legal operations workbench for matter intake, source-linked evidence,
            discovery preparation, argument ranking, reusable matter memory, and attorney-controlled draft assembly.
          </p>
          <div className={styles.boundary}>
            <ShieldCheck size={20} />
            <span>Not a law firm. Not a lawyer. Not legal advice. Attorney or authorized legal professional remains final authority.</span>
          </div>
        </div>
        <div className={styles.statusCard}>
          <Gauge size={24} />
          <strong>Beta source build</strong>
          <span>Firm queue → matter workbench → evidence → draft → approval gate</span>
        </div>
      </section>

      <section className={styles.dashboardGrid}>
        <article className={styles.card}>
          <div className={styles.cardHead}><BriefcaseBusiness size={20} /><h2>Firm queue</h2></div>
          <div className={styles.matterList}>
            {matters.map((item) => (
              <button key={item.id} className={item.id === activeMatterId ? styles.matterOn : styles.matter} onClick={() => switchMatter(item)}>
                <strong>{item.client}</strong>
                <span>{item.motion}</span>
                <em>{item.status} · {item.urgency}</em>
              </button>
            ))}
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHead}><UserRoundCheck size={20} /><h2>Service model</h2></div>
          <div className={styles.operatorCard}>
            <strong>{matter.assignedOperator}</strong>
            <span>{matter.attorneyGate}</span>
            <p>One expert operator supervises intake, indexing, drafts, and exception handling while the attorney or authorized professional keeps legal judgment and approval.</p>
          </div>
          <div className={styles.metricsRow}>
            <Metric value="5" label="workcell stages" />
            <Metric value="7" label="argument modules" />
            <Metric value={`${readiness}%`} label="draft readiness" />
          </div>
        </article>
      </section>

      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <div className={styles.cardHead}><Network size={20} /><h2>Voice command surface</h2></div>
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} />
          <button className={styles.primaryButton} onClick={processPrompt}>Process command <ArrowRight size={16} /></button>
          <p className={styles.microcopy}>Mobile dictation works in this field now. Browser microphone capture is a later connector and is not claimed in this beta source build.</p>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHead}><GitBranch size={20} /><h2>Reusable matter shell</h2></div>
          <div className={styles.formGrid}>
            {Object.entries(matter).filter(([key]) => key !== "id").map(([key, value]) => (
              <label key={key}>
                <span>{key.replace(/([A-Z])/g, " $1")}</span>
                <input value={value} onChange={(event) => setMatterField(key as keyof Matter, event.target.value)} />
              </label>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHead}><Workflow size={20} /><h2>Workcell stages</h2></div>
        <div className={styles.stageGrid}>
          {workcellTasks.map(([title, body], index) => (
            <div key={title}>
              <span>{index + 1}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHead}><Sparkles size={20} /><h2>Fact modules</h2></div>
        <div className={styles.chips}>
          {(Object.keys(flagLabels) as FactFlag[]).map((flag) => (
            <button key={flag} className={flags[flag] ? styles.chipOn : styles.chip} onClick={() => toggleFlag(flag)}>
              {flags[flag] ? <CheckCircle2 size={15} /> : <TriangleAlert size={15} />}
              {flagLabels[flag]}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.gridTwoWide}>
        <article className={styles.card}>
          <div className={styles.cardHead}><Workflow size={20} /><h2>Ranked argument and task modules</h2></div>
          <div className={styles.argumentList}>
            {rankedArguments.map((argument) => (
              <button key={argument.id} className={selected[argument.id] ? styles.argumentOn : styles.argument} onClick={() => toggleArgument(argument.id)}>
                <span className={styles.score}>{argument.strength}</span>
                <span>
                  <strong>{argument.title}</strong>
                  <small>{argument.reason}</small>
                  <em>{argument.source} · Risk: {argument.risk}</em>
                </span>
              </button>
            ))}
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHead}><FileSearch size={20} /><h2>Source-page evidence viewer</h2></div>
          <div className={styles.evidencePane}>
            <div className={styles.pdfMock}>
              <span>Source viewer</span>
              <strong>Page {activePage}</strong>
              <p>Clicking an evidence bubble jumps to the exact source page. Live KONRAN/PDF indexing is the next integration gate.</p>
            </div>
            <div className={styles.evidenceList}>
              {evidenceBank.map((hit) => (
                <button key={hit.id} onClick={() => setActivePage(hit.page)} className={activePage === hit.page ? styles.evidenceOn : styles.evidence}>
                  <strong>{hit.label}</strong>
                  <span>{hit.quote}</span>
                  <em>{hit.sourceType} · Weight {hit.weight} · page {hit.page}</em>
                </button>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className={styles.gridThree}>
        <article className={styles.card}>
          <div className={styles.cardHead}><Sparkles size={20} /><h2>Things you did not know you knew</h2></div>
          <div className={styles.templateCard}>
            <BadgeCheck />
            <div>
              <strong>{matchedTemplate[0]} match score: {matchedTemplate[1]}</strong>
              <p>{matchedTemplate[2]}</p>
            </div>
          </div>
          <ul className={styles.cleanList}>
            <li>Prior matters are ranked as reusable structure, not legal truth.</li>
            <li>One-off internet pleadings are low-weight leads only.</li>
            <li>Official law and licensed citators outrank memory, templates, and generated text.</li>
          </ul>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHead}><ScanLine size={20} /><h2>Discovery / document work</h2></div>
          <ul className={styles.cleanList}>
            <li>Propound discovery shell: interrogatories, RFP checklist, admissions placeholder.</li>
            <li>Respond to discovery shell: objections placeholder, production log, missing items.</li>
            <li>Emergency packet shell: facts, exhibits, proposed orders, attorney review notes.</li>
            <li>Upload slots: pleadings, orders, TP transcript, exhibits, school records, messages.</li>
          </ul>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHead}><Gauge size={20} /><h2>Telemetry</h2></div>
          <div className={styles.auditList}>
            {auditEvents.map((event) => <span key={event}>{event}</span>)}
          </div>
        </article>
      </section>

      <section className={styles.gridTwoWide}>
        <article className={styles.card}>
          <div className={styles.cardHead}><FileSearch size={20} /><h2>Draft preview before PDF</h2></div>
          <div className={styles.draftPreview}>
            <p><strong>For {matter.county} Superior Court</strong></p>
            <p><strong>Re:</strong> {matter.client} v. {matter.opposing} · {matter.motion}</p>
            <p>
              The proposed filing should be framed around the selected human-approved modules below. Each legal citation remains in draft status until verified against official sources or a licensed citator.
            </p>
            <ol>
              {selectedArguments.map((argument) => (
                <li key={argument.id}>
                  <strong>{argument.title}</strong> — {argument.reason}
                </li>
              ))}
            </ol>
            <p>
              Evidence references should cite page-specific source blocks, including page {activePage} of the source viewer where relevant. Export remains blocked until review is complete.
            </p>
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHead}><ShieldCheck size={20} /><h2>Attorney / authorized professional gate</h2></div>
          <button className={approved ? styles.approvalOn : styles.approval} onClick={() => setApproved((value) => !value)}>
            {approved ? <CheckCircle2 /> : <ShieldCheck />}
            <span>{approved ? "Review receipt marked complete" : "Export locked pending professional review"}</span>
          </button>
          <div className={exportLocked ? styles.exportLocked : styles.exportReady}>
            <strong>{exportLocked ? "PDF/export locked" : "Draft packet ready for controlled export"}</strong>
            <p>{exportLocked ? "Source citations, fact modules, exhibits, and legal posture must be reviewed before any draft leaves the workcell." : "This is still a beta UI receipt, not a legal sufficiency claim."}</p>
          </div>
          <ul className={styles.cleanList}>
            <li>No attorney-client relationship from software intake alone.</li>
            <li>No autonomous filing, signing, or legal advice.</li>
            <li>Every removed module, source gap, and export decision needs a receipt.</li>
          </ul>
        </article>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHead}><ShieldCheck size={20} /><h2>CoCounsel-class standard without unsafe claims</h2></div>
        <div className={styles.sourceGrid}>
          {legalSources.map(([kind, label, use]) => (
            <div key={label}>
              <strong>{kind}</strong>
              <span>{label}</span>
              <p>{use}</p>
            </div>
          ))}
        </div>
        <p className={styles.microcopy}>
          Beta source does not claim licensed Westlaw, Practical Law, CoCounsel, court e-filing, or live statute API access. It proves the operating surface: voice intake, matter queue, reusable matter memory, argument ranking, source weighting, evidence-page jumps, discovery shells, preview-before-PDF, and human authority.
        </p>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.metric}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
