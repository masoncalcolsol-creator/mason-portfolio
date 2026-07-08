"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileSearch,
  Gauge,
  Network,
  ScanLine,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Workflow,
} from "lucide-react";
import styles from "./caseforge.module.css";

type SourceDoc = { id: string; name: string; kind: string; text: string; createdAt: string };
type EvidenceItem = { id: string; sourceId: string; sourceName: string; page: string; label: string; excerpt: string; weight: number; note: string };
type MatterState = {
  client: string;
  opposing: string;
  child: string;
  county: string;
  matterType: string;
  tasking: string;
  facts: string;
  risks: string;
  operator: string;
  reviewer: string;
  approved: boolean;
  lastReceipt: string;
};
type SearchHit = { sourceId: string; sourceName: string; page: string; excerpt: string; score: number };

const storageKey = "nullworks-caseforge-local-beta-v1";

const initialMatter: MatterState = {
  client: "Jones",
  opposing: "Jones",
  child: "Minor Child",
  county: "Maricopa County",
  matterType: "Time-sensitive family case support packet",
  tasking: "Prepare a working memo, source index, issue map, discovery checklist, and review packet for professional review.",
  facts: "School stability, exchange logistics, communication pattern, and current order language appear central. Use prior matter structure only as a framework, not as authority.",
  risks: "Verify all sources, forms, dates, exhibits, and professional-scope boundaries before external use.",
  operator: "Senior family-law operations lead",
  reviewer: "Attorney / authorized professional",
  approved: false,
  lastReceipt: "No review receipt yet.",
};

const seedDocs: SourceDoc[] = [
  { id: "sample-messages", name: "Sample message notes", kind: "seed text", createdAt: "beta seed", text: "Page 4: Holiday exchange dispute. One parent asks to change the exchange time. The other references school schedule.\n\nPage 118: Repeated schedule-change requests. Several messages show conflict about pickup timing and communication.\n\nPage 322: Escalating language. Full context must be reviewed before using any sensitive characterization." },
  { id: "sample-order", name: "Sample prior order notes", kind: "seed text", createdAt: "beta seed", text: "Page 1: Existing order controls decision-making and parenting-time language. Quote exactly from the signed order. Do not reconstruct order terms from memory.\n\nPage 2: Current plan requires exchange logistics and school-day stability to be evaluated against actual signed language." },
];

const authoritySlots = [
  ["Official statute slot", "Arizona statutes", "Not connected yet. Verify before citing."],
  ["Official court slot", "Arizona court rules", "Not connected yet. Verify procedure before use."],
  ["Local court slot", "Maricopa County forms", "Not connected yet. Verify forms and filing posture."],
  ["Licensed research slot", "Licensed legal research connector", "Not connected. Case-law validation requires a licensed source."],
  ["Matter memory slot", "Prior work product", "Pattern memory only. Never controlling authority by itself."],
];

function nowReceipt() { return new Date().toLocaleString(); }
function makeId(prefix: string) { return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`; }

function chunkText(source: SourceDoc): SearchHit[] {
  return source.text
    .split(/\n\s*\n|(?=Page\s+\d+)/i)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => ({
      sourceId: source.id,
      sourceName: source.name,
      page: block.match(/page\s+(\d+)/i)?.[1] ?? `${index + 1}`,
      excerpt: block.length > 850 ? `${block.slice(0, 850)}…` : block,
      score: 0,
    }));
}

function scoreHit(text: string, query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter((term) => term.length > 2);
  const haystack = text.toLowerCase();
  return terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
}

export default function CaseForgePage() {
  const [matter, setMatter] = useState<MatterState>(initialMatter);
  const [docs, setDocs] = useState<SourceDoc[]>(seedDocs);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [query, setQuery] = useState("school exchange schedule order");
  const [pasteName, setPasteName] = useState("Pasted source block");
  const [pasteText, setPasteText] = useState("");
  const [status, setStatus] = useState("Local beta ready. Data is stored in this browser until backend persistence is wired.");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { matter?: MatterState; docs?: SourceDoc[]; evidence?: EvidenceItem[] };
      if (parsed.matter) setMatter(parsed.matter);
      if (parsed.docs) setDocs(parsed.docs);
      if (parsed.evidence) setEvidence(parsed.evidence);
    } catch { setStatus("Could not load prior local workspace. Starting fresh."); }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify({ matter, docs, evidence })); }
    catch { setStatus("Local save failed. Browser storage may be blocked or full."); }
  }, [matter, docs, evidence]);

  const searchHits = useMemo(() => docs.flatMap(chunkText)
    .map((hit) => ({ ...hit, score: scoreHit(hit.excerpt, query) }))
    .filter((hit) => query.trim().length === 0 || hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20), [docs, query]);

  const memo = useMemo(() => buildMemo(matter, evidence, docs), [matter, evidence, docs]);

  function updateMatter(field: keyof MatterState, value: string | boolean) {
    setMatter((current) => ({ ...current, [field]: value }));
  }

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    const loaded: SourceDoc[] = [];
    const rejected: string[] = [];
    for (const file of files) {
      const lower = file.name.toLowerCase();
      if (lower.endsWith(".pdf") || file.type === "application/pdf") {
        rejected.push(`${file.name}: paste OCR/text export until PDF parser is wired.`);
        continue;
      }
      try {
        loaded.push({ id: makeId("doc"), name: file.name, kind: file.type || "text file", text: await file.text(), createdAt: nowReceipt() });
      } catch { rejected.push(`${file.name}: could not read as text.`); }
    }
    if (loaded.length) setDocs((current) => [...loaded, ...current]);
    setStatus([loaded.length ? `Loaded ${loaded.length} text source(s).` : "No text sources loaded.", ...rejected].join(" "));
    event.target.value = "";
  }

  function addPastedSource() {
    if (pasteText.trim().length < 5) { setStatus("Paste source text before adding a source block."); return; }
    setDocs((current) => [{ id: makeId("paste"), name: pasteName.trim() || "Pasted source block", kind: "pasted text", text: pasteText, createdAt: nowReceipt() }, ...current]);
    setPasteText("");
    setStatus("Pasted source block added and indexed locally.");
  }

  function captureEvidence(hit: SearchHit) {
    setEvidence((current) => [{
      id: makeId("ev"), sourceId: hit.sourceId, sourceName: hit.sourceName, page: hit.page,
      label: `Page/block ${hit.page} — ${query || "captured source"}`,
      excerpt: hit.excerpt, weight: Math.min(99, 60 + hit.score * 10), note: "Captured from local source search. Verify context before external use."
    }, ...current]);
    setStatus(`Captured evidence from ${hit.sourceName}, page/block ${hit.page}.`);
  }

  async function copyMemo() {
    try { await navigator.clipboard.writeText(memo); setStatus("Working memo copied to clipboard."); }
    catch { setStatus("Clipboard copy failed. Select and copy the memo manually."); }
  }

  function downloadWorkspace() {
    const blob = new Blob([JSON.stringify({ matter, docs, evidence, memo }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `caseforge-${matter.client || "matter"}-workspace.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Workspace JSON exported.");
  }

  function markReview() {
    const next = !matter.approved;
    setMatter((current) => ({ ...current, approved: next, lastReceipt: next ? `Review gate marked complete at ${nowReceipt()}` : `Review gate reopened at ${nowReceipt()}` }));
  }

  function resetWorkspace() {
    setMatter(initialMatter); setDocs(seedDocs); setEvidence([]); setStatus("Workspace reset to beta seed data.");
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.kicker}>NULLWORKS CASEFORGE · FUNCTIONAL LOCAL BETA</div>
          <h1>CaseForge</h1>
          <p>Paste or upload text sources, search the record, capture evidence, assemble a working memo, preserve review receipts, and export the workspace.</p>
          <div className={styles.boundary}><ShieldCheck size={20} /><span>Operations support only. Professional authority remains final.</span></div>
        </div>
        <div className={styles.statusCard}><Gauge size={24} /><strong>{matter.approved ? "Review marked" : "Export gated"}</strong><span>{status}</span></div>
      </section>

      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <div className={styles.cardHead}><BriefcaseBusiness size={20} /><h2>Matter workspace</h2></div>
          <div className={styles.formGrid}>
            <Field label="Client" value={matter.client} onChange={(value) => updateMatter("client", value)} />
            <Field label="Opposing party" value={matter.opposing} onChange={(value) => updateMatter("opposing", value)} />
            <Field label="Child / initials" value={matter.child} onChange={(value) => updateMatter("child", value)} />
            <Field label="County" value={matter.county} onChange={(value) => updateMatter("county", value)} />
            <Field label="Matter type" value={matter.matterType} onChange={(value) => updateMatter("matterType", value)} />
            <Field label="Reviewer" value={matter.reviewer} onChange={(value) => updateMatter("reviewer", value)} />
          </div>
          <TextField label="Tasking" value={matter.tasking} onChange={(value) => updateMatter("tasking", value)} />
          <TextField label="Known facts" value={matter.facts} onChange={(value) => updateMatter("facts", value)} />
          <TextField label="Risks / boundaries" value={matter.risks} onChange={(value) => updateMatter("risks", value)} />
        </article>

        <article className={styles.card}>
          <div className={styles.cardHead}><ScanLine size={20} /><h2>Source intake</h2></div>
          <p className={styles.microcopy}>Reads text files and pasted text today. For PDFs, paste OCR/text export until KONRAN PDF parsing is wired.</p>
          <input type="file" multiple accept=".txt,.md,.csv,.json,.html,.xml,text/*" onChange={handleFile} />
          <Field label="Source name" value={pasteName} onChange={setPasteName} />
          <TextField label="Paste source text / OCR / transcript" value={pasteText} onChange={setPasteText} />
          <button className={styles.primaryButton} onClick={addPastedSource}>Add source block <ArrowRight size={16} /></button>
          <ul className={styles.cleanList}><li>{docs.length} source records.</li><li>{evidence.length} captured evidence records.</li><li>Local browser persistence active.</li></ul>
        </article>
      </section>

      <section className={styles.gridTwoWide}>
        <article className={styles.card}>
          <div className={styles.cardHead}><FileSearch size={20} /><h2>Search and capture evidence</h2></div>
          <Field label="Search query" value={query} onChange={setQuery} />
          <div className={styles.evidenceList}>{searchHits.map((hit) => (
            <button key={`${hit.sourceId}-${hit.page}-${hit.excerpt.slice(0, 20)}`} className={styles.evidence} onClick={() => captureEvidence(hit)}>
              <strong>{hit.sourceName} · page/block {hit.page}</strong><span>{hit.excerpt}</span><em>Score {hit.score} · tap to capture</em>
            </button>
          ))}</div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHead}><Sparkles size={20} /><h2>Captured evidence</h2></div>
          <div className={styles.evidenceList}>{evidence.length === 0 ? <p className={styles.microcopy}>No evidence captured yet.</p> : evidence.map((item) => (
            <div key={item.id} className={styles.evidenceOn}><strong>{item.label}</strong><span>{item.excerpt}</span><em>{item.sourceName} · page/block {item.page} · weight {item.weight}</em><button className={styles.primaryButton} onClick={() => setEvidence((current) => current.filter((ev) => ev.id !== item.id))}>Remove</button></div>
          ))}</div>
        </article>
      </section>

      <section className={styles.gridTwoWide}>
        <article className={styles.card}>
          <div className={styles.cardHead}><Workflow size={20} /><h2>Working memo</h2></div>
          <div className={styles.draftPreview}><pre>{memo}</pre></div>
          <div className={styles.chips}><button className={styles.primaryButton} onClick={copyMemo}>Copy memo</button><button className={styles.primaryButton} onClick={downloadWorkspace}>Export JSON</button><button className={styles.primaryButton} onClick={resetWorkspace}>Reset</button></div>
        </article>
        <article className={styles.card}>
          <div className={styles.cardHead}><ShieldCheck size={20} /><h2>Review gate</h2></div>
          <button className={matter.approved ? styles.approvalOn : styles.approval} onClick={markReview}>{matter.approved ? <CheckCircle2 /> : <TriangleAlert />}<span>{matter.approved ? "Review receipt marked complete" : "External use blocked pending review"}</span></button>
          <div className={matter.approved ? styles.exportReady : styles.exportLocked}><strong>{evidence.length ? "Memo generated" : "Needs captured evidence"}</strong><p>{matter.lastReceipt}</p></div>
          <ul className={styles.cleanList}><li>Verify sources before external use.</li><li>Professional judgment controls final output.</li><li>Do not paste protected client data without authorization.</li></ul>
        </article>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHead}><Network size={20} /><h2>Authority connectors still required</h2></div>
        <div className={styles.sourceGrid}>{authoritySlots.map(([kind, label, use]) => <div key={label}><strong>{kind}</strong><span>{label}</span><p>{use}</p></div>)}</div>
      </section>
    </main>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label><span>{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label><span>{label}</span><textarea value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function buildMemo(matter: MatterState, evidence: EvidenceItem[], docs: SourceDoc[]) {
  const evidenceLines = evidence.length ? evidence.map((item, index) => `${index + 1}. ${item.label}\n   Source: ${item.sourceName}, page/block ${item.page}\n   Weight: ${item.weight}\n   Excerpt: ${item.excerpt}\n   Note: ${item.note}`).join("\n\n") : "No evidence captured yet.";
  const sourceLines = docs.map((doc, index) => `${index + 1}. ${doc.name} (${doc.kind}) — ${doc.text.length.toLocaleString()} characters`).join("\n");
  return `CASEFORGE LOCAL BETA WORKING MEMO\n\nBOUNDARY\nOperations support only. Professional authority remains final.\n\nMATTER\nClient: ${matter.client}\nOpposing Party: ${matter.opposing}\nChild / Initials: ${matter.child}\nCounty: ${matter.county}\nMatter Type: ${matter.matterType}\nReviewer: ${matter.reviewer}\n\nTASKING\n${matter.tasking}\n\nKNOWN FACTS\n${matter.facts}\n\nRISKS / BOUNDARIES\n${matter.risks}\n\nISSUE MAP FOR REVIEW\n1. Confirm current signed order and exact controlling language.\n2. Build child-stability / logistics section only from captured source evidence.\n3. Build communication-pattern section only where full context supports it.\n4. Build discovery checklist from indexed requests, missing items, and scope review.\n5. Exclude sensitive framing unless evidence and reviewer judgment support it.\n\nCAPTURED EVIDENCE\n${evidenceLines}\n\nSOURCE INVENTORY\n${sourceLines || "No source documents loaded."}\n\nREVIEW CHECKLIST\n[ ] Verify official sources and forms.\n[ ] Verify excerpts against full document context.\n[ ] Confirm requested tasking and authorization.\n[ ] Confirm exhibits and page references.\n[ ] Reviewer approves final use.\n\nREVIEW RECEIPT\n${matter.lastReceipt}\n`;
}
