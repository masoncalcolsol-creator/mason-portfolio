"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  Gauge,
  Gavel,
  Mic,
  Scale,
  ShieldCheck,
  Sparkles,
  SquarePen,
} from "lucide-react";
import styles from "./caseforge.module.css";

type FactFlag = "domesticViolence" | "relocation" | "substance" | "school" | "messages" | "priorOrder";
type ArgumentId = "bestInterests" | "decisionMaking" | "parentingTime" | "evidencePattern" | "procedure";

type Matter = {
  client: string;
  opposing: string;
  child: string;
  county: string;
  motion: string;
  templateMatter: string;
};

type EvidenceHit = {
  id: string;
  label: string;
  page: number;
  quote: string;
  weight: number;
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
};

const flagLabels: Record<FactFlag, string> = {
  domesticViolence: "Domestic violence supported",
  relocation: "Relocation issue",
  substance: "Substance / impairment concern",
  school: "School stability issue",
  messages: "TalkingParents evidence",
  priorOrder: "Prior order / parenting plan",
};

const legalSources = [
  ["Official statute slot", "Arizona Revised Statutes Title 25", "Official source before any statute citation is treated as usable."],
  ["Official court slot", "Arizona Judicial Branch rules", "Procedure and amendment checks before draft finalization."],
  ["Local court slot", "Maricopa County Superior Court family forms", "Caption, packet, filing posture, and local form sanity checks."],
  ["Licensed citator slot", "Westlaw / CoCounsel-class connector", "Not connected in V0. Future case-law verification requires a licensed source."],
  ["Matter memory slot", "Prior office pleadings and outcomes", "Reusable frameworks only. Never controlling law without official or licensed verification."],
];

const evidenceBank: EvidenceHit[] = [
  {
    id: "tp-004",
    label: "TalkingParents page 4 — exchange dispute",
    page: 4,
    quote: "Holiday-exchange language appears near the start of the transcript and should be checked against the signed PDF.",
    weight: 91,
    flags: ["messages", "school"],
  },
  {
    id: "tp-118",
    label: "TalkingParents page 118 — schedule-change pattern",
    page: 118,
    quote: "Repeated schedule-change requests may support a stability argument if attorney review confirms context.",
    weight: 77,
    flags: ["messages", "priorOrder"],
  },
  {
    id: "tp-322",
    label: "TalkingParents page 322 — escalation language",
    page: 322,
    quote: "Escalating language is relevant only if marked material, admissible, and not misleading in context.",
    weight: 63,
    flags: ["messages", "domesticViolence"],
  },
  {
    id: "order-001",
    label: "Prior order excerpt — decision-making framework",
    page: 1,
    quote: "Existing decision-making language must be imported exactly from the current order, not reconstructed from memory.",
    weight: 86,
    flags: ["priorOrder"],
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
  },
  {
    id: "decisionMaking",
    title: "Legal decision-making / authority allocation",
    baseStrength: 76,
    source: "Prior order + official statute/rule verification required",
    reason: "Useful if requested relief turns on authority, communication, decision deadlock, or ability to co-parent.",
    requiredFlags: ["priorOrder"],
    evidenceIds: ["order-001", "tp-118"],
  },
  {
    id: "parentingTime",
    title: "Parenting-time stability and logistics",
    baseStrength: 82,
    source: "Maricopa family workflow + official statute source slot",
    reason: "Strong where the record shows repeatable exchange, school, travel, routine, or schedule evidence.",
    requiredFlags: ["school"],
    evidenceIds: ["tp-004", "tp-118"],
  },
  {
    id: "evidencePattern",
    title: "Evidence-pattern argument",
    baseStrength: 70,
    source: "TalkingParents page-aware source block engine",
    reason: "Useful as supporting architecture: not one quote, but a source-linked pattern with page jumps and attorney-selected context.",
    requiredFlags: ["messages"],
    evidenceIds: ["tp-004", "tp-118", "tp-322"],
  },
  {
    id: "procedure",
    title: "Procedure / form compliance guardrail",
    baseStrength: 68,
    source: "Arizona Court Rules + Maricopa forms source slot",
    reason: "Prevents wrong caption, wrong packet, missing attachment, or unsupported filing posture.",
    requiredFlags: [],
    evidenceIds: [],
  },
];

const templates = [
  ["Thompson", "92", "Reuse structure A, C, D, and F. Do not reuse domestic-violence module unless Jones has independent support."],
  ["Garcia", "78", "Reuse parenting-time logistics and school-stability framing. Verify prior-order posture."],
  ["Nguyen", "61", "Use only evidence-indexing method. Different county and posture make argument reuse weak."],
];

function scoreArgument(argument: ArgumentCard, flags: Record<FactFlag, boolean>) {
  const required = argument.requiredFlags.reduce((sum, flag) => sum + (flags[flag] ? 8 : -10), 0);
  const evidence = argument.evidenceIds.reduce((sum, id) => {
    const hit = evidenceBank.find((item) => item.id === id);
    if (!hit) return sum;
    return sum + (hit.flags.some((flag) => flags[flag]) ? 4 : 0);
  }, 0);
  const sensitive = flags.domesticViolence && argument.id === "evidencePattern" ? 4 : 0;
  return Math.max(10, Math.min(99, argument.baseStrength + required + evidence + sensitive));
}

export default function CaseForgePage() {
  const [matter, setMatter] = useState<Matter>({
    client: "Jones",
    opposing: "Jones",
    child: "Minor Child",
    county: "Maricopa County",
    motion: "Response / Motion packet",
    templateMatter: "Thompson",
  });
  const [prompt, setPrompt] = useState("Build a response for Jones using Thompson as a starting point. No domestic violence module unless supported. Emphasize school stability, TalkingParents evidence, and the current parenting plan.");
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
  });
  const [activePage, setActivePage] = useState(4);

  const rankedArguments = useMemo(
    () => baseArguments
      .map((argument) => ({ ...argument, strength: scoreArgument(argument, flags) }))
      .sort((a, b) => b.strength - a.strength),
    [flags],
  );

  const selectedArguments = rankedArguments.filter((argument) => selected[argument.id]);
  const matchedTemplate = templates.find(([name]) => name === matter.templateMatter) ?? templates[0];

  function setMatterField(field: keyof Matter, value: string) {
    setMatter((current) => ({ ...current, [field]: value }));
  }

  function toggleFlag(flag: FactFlag) {
    setFlags((current) => ({ ...current, [flag]: !current[flag] }));
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
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.kicker}>NULLWORKS LEGAL OPERATIONS WORKCELL</div>
          <h1>CaseForge</h1>
          <p>
            Voice-driven matter intake, source-linked evidence review, argument ranking,
            reusable matter memory, and attorney-controlled draft assembly for Arizona family-law workflows.
          </p>
          <div className={styles.boundary}>
            <ShieldCheck size={20} />
            <span>Not a law firm. Not a lawyer. Not legal advice. Authorized legal professional remains final authority.</span>
          </div>
        </div>
        <div className={styles.statusCard}>
          <Gauge size={24} />
          <strong>V0 build slice</strong>
          <span>Prompt → facts → ranked arguments → source receipts → editable preview</span>
        </div>
      </section>

      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <div className={styles.cardHead}><Mic size={20} /><h2>Voice prompt</h2></div>
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} />
          <button className={styles.primaryButton} onClick={processPrompt}>Process prompt <ArrowRight size={16} /></button>
          <p className={styles.microcopy}>Mobile dictation works here now. Browser microphone capture is a later connector, not claimed in V0.</p>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHead}><SquarePen size={20} /><h2>Reusable matter shell</h2></div>
          <div className={styles.formGrid}>
            {Object.entries(matter).map(([key, value]) => (
              <label key={key}>
                <span>{key.replace(/([A-Z])/g, " $1")}</span>
                <input value={value} onChange={(event) => setMatterField(key as keyof Matter, event.target.value)} />
              </label>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHead}><BrainCircuit size={20} /><h2>Fact modules</h2></div>
        <div className={styles.chips}>
          {(Object.keys(flagLabels) as FactFlag[]).map((flag) => (
            <button key={flag} className={flags[flag] ? styles.chipOn : styles.chip} onClick={() => toggleFlag(flag)}>
              {flags[flag] ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
              {flagLabels[flag]}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.gridTwoWide}>
        <article className={styles.card}>
          <div className={styles.cardHead}><Scale size={20} /><h2>Ranked argument options</h2></div>
          <div className={styles.argumentList}>
            {rankedArguments.map((argument) => (
              <button key={argument.id} className={selected[argument.id] ? styles.argumentOn : styles.argument} onClick={() => toggleArgument(argument.id)}>
                <span className={styles.score}>{argument.strength}</span>
                <span>
                  <strong>{argument.title}</strong>
                  <small>{argument.reason}</small>
                  <em>{argument.source}</em>
                </span>
              </button>
            ))}
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHead}><FileSearch size={20} /><h2>Source-page evidence</h2></div>
          <div className={styles.evidencePane}>
            <div className={styles.pdfMock}>
              <span>TalkingParents source viewer</span>
              <strong>Page {activePage}</strong>
              <p>Clicking an evidence bubble jumps to the exact source page. V0 uses seeded sample hits; live KONRAN/PDF indexing is the next integration.</p>
            </div>
            <div className={styles.evidenceList}>
              {evidenceBank.map((hit) => (
                <button key={hit.id} onClick={() => setActivePage(hit.page)} className={activePage === hit.page ? styles.evidenceOn : styles.evidence}>
                  <strong>{hit.label}</strong>
                  <span>{hit.quote}</span>
                  <em>Weight {hit.weight} · page {hit.page}</em>
                </button>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className={styles.gridTwoWide}>
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
            <li>Obscure or one-off internet pleadings are low-weight leads only.</li>
            <li>Official law and licensed citators outrank memory, templates, and generated text.</li>
          </ul>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHead}><Gavel size={20} /><h2>Draft preview before PDF</h2></div>
          <div className={styles.draftPreview}>
            <p><strong>For {matter.county} Superior Court</strong></p>
            <p><strong>Re:</strong> {matter.client} v. {matter.opposing} · {matter.motion}</p>
            <p>
              The proposed filing should be framed around the selected attorney-approved modules below. Each legal citation remains in draft status until verified against the official source or licensed citator.
            </p>
            <ol>
              {selectedArguments.map((argument) => (
                <li key={argument.id}>
                  <strong>{argument.title}</strong> — {argument.reason}
                </li>
              ))}
            </ol>
            <p>
              Evidence references should cite page-specific source blocks, including page {activePage} of the TalkingParents viewer where relevant. No PDF export should occur until fact modules, citations, and exhibits are reviewed.
            </p>
          </div>
        </article>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHead}><BadgeCheck size={20} /><h2>CoCounsel-class standard without unsafe claims</h2></div>
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
          V0 does not claim licensed Westlaw, Practical Law, CoCounsel, court e-filing, or live statute API access. It proves the operating surface: voice intake, reusable matter memory, argument ranking, source weighting, evidence-page jumps, preview-before-PDF, and human authority.
        </p>
      </section>
    </main>
  );
}
