"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./lexicon.module.css";

type LexiconEntry = {
  word: string;
  partOfSpeech: string;
  definition: string;
  plainLanguage: string;
  synonyms: string[];
  related: string[];
  usage: string;
  sourceLinks: { label: string; href: string }[];
};

const LEXICON: Record<string, LexiconEntry> = {
  instantiate: {
    word: "instantiate",
    partOfSpeech: "verb",
    definition: "To create a specific, usable instance from a general idea, class, pattern, or design.",
    plainLanguage: "Turn the blueprint into one real thing that now exists and can be used.",
    synonyms: ["create an instance", "initialize", "realize", "bring into existence"],
    related: ["instance", "implementation", "deployment", "object"],
    usage: "We instantiated the first Live Learning Forest tree from Mason’s Rossini memory.",
    sourceLinks: [
      { label: "Merriam-Webster", href: "https://www.merriam-webster.com/dictionary/instantiate" },
      { label: "Wiktionary", href: "https://en.wiktionary.org/wiki/instantiate" },
    ],
  },
  parallelize: {
    word: "parallelize",
    partOfSpeech: "verb",
    definition: "To arrange work so that multiple independent operations proceed at the same time instead of waiting in one sequence.",
    plainLanguage: "Run separate jobs side by side when one does not need to wait for the other.",
    synonyms: ["run concurrently", "divide into parallel work", "execute simultaneously"],
    related: ["parallel", "concurrent", "asynchronous", "dependency"],
    usage: "We can parallelize the 404 repair and the Forest lexicon design because they are separate workstreams.",
    sourceLinks: [
      { label: "Merriam-Webster", href: "https://www.merriam-webster.com/dictionary/parallelize" },
      { label: "Wiktionary", href: "https://en.wiktionary.org/wiki/parallelize" },
    ],
  },
  canonical: {
    word: "canonical",
    partOfSpeech: "adjective",
    definition: "Recognized by a governed system as the authoritative reference version for a defined purpose.",
    plainLanguage: "The official version everyone points to, while its history and challenges remain visible.",
    synonyms: ["authoritative", "standard", "reference", "official"],
    related: ["canon", "version", "authority", "record"],
    usage: "A canonical Forest page is the governed record, not whichever contribution received the most votes.",
    sourceLinks: [
      { label: "Merriam-Webster", href: "https://www.merriam-webster.com/dictionary/canonical" },
      { label: "Wiktionary", href: "https://en.wiktionary.org/wiki/canonical" },
    ],
  },
  provenance: {
    word: "provenance",
    partOfSpeech: "noun",
    definition: "The documented origin, custody, and history of an item, claim, record, or piece of information.",
    plainLanguage: "Where it came from, who handled it, and what happened to it along the way.",
    synonyms: ["origin", "source history", "lineage", "chain of custody"],
    related: ["receipt", "source", "lineage", "evidence"],
    usage: "The Forest preserves claim provenance so a learner can inspect the roots instead of trusting invisible synthesis.",
    sourceLinks: [
      { label: "Merriam-Webster", href: "https://www.merriam-webster.com/dictionary/provenance" },
      { label: "Wiktionary", href: "https://en.wiktionary.org/wiki/provenance" },
    ],
  },
  telemetry: {
    word: "telemetry",
    partOfSpeech: "noun",
    definition: "Measurements collected and transmitted so the condition, behavior, or performance of a system can be observed.",
    plainLanguage: "The receipts and measurements that tell us what the system actually did.",
    synonyms: ["measurement data", "operational signals", "instrumentation", "observability data"],
    related: ["instrumentation", "event", "metric", "receipt"],
    usage: "Forest telemetry records which routes were useful without allowing popularity to alter truth.",
    sourceLinks: [
      { label: "Merriam-Webster", href: "https://www.merriam-webster.com/dictionary/telemetry" },
      { label: "Wiktionary", href: "https://en.wiktionary.org/wiki/telemetry" },
    ],
  },
  reconcile: {
    word: "reconcile",
    partOfSpeech: "verb",
    definition: "To compare apparently conflicting accounts or elements and explain how they relate, differ, or can be made consistent.",
    plainLanguage: "Separate crossed memories or records and show what belongs where.",
    synonyms: ["resolve", "harmonize", "compare", "account for"],
    related: ["contradiction", "correction", "memory", "evidence"],
    usage: "The Librarian reconciled Rossini, the William Tell finale, Tchaikovsky, and the remembered son connection.",
    sourceLinks: [
      { label: "Merriam-Webster", href: "https://www.merriam-webster.com/dictionary/reconcile" },
      { label: "Wiktionary", href: "https://en.wiktionary.org/wiki/reconcile" },
    ],
  },
};

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z-]/g, "");
}

function makeLookupReceipt(word: string) {
  const random = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID().slice(0, 8).toUpperCase()
    : Math.random().toString(36).slice(2, 10).toUpperCase();
  return {
    receipt: `NW-LLF-LEX-${new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}-${random}`,
    word,
    event: "LEXICON_LOOKUP_MISSING",
    state: "QUEUED_FOR_LEXICAL_REVIEW",
    storage: "LOCAL_PROTOTYPE_ONLY",
    createdAt: new Date().toISOString(),
  };
}

export default function LexiconDock() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("instantiate");
  const [selected, setSelected] = useState("instantiate");
  const [missingReceipt, setMissingReceipt] = useState<string | null>(null);

  const entry = useMemo(() => LEXICON[selected] ?? null, [selected]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const normalized = normalize(query);
    if (!normalized) return;

    if (LEXICON[normalized]) {
      setSelected(normalized);
      setMissingReceipt(null);
      return;
    }

    const lookup = makeLookupReceipt(normalized);
    try {
      const current = JSON.parse(localStorage.getItem("llf.lexicon.lookups") || "[]");
      localStorage.setItem("llf.lexicon.lookups", JSON.stringify([lookup, ...current]));
    } catch {
      // The lexical lookup still works as an honest non-persistent prototype.
    }
    setSelected("");
    setMissingReceipt(lookup.receipt);
  }

  return (
    <aside className={styles.lexicon} data-open={open} aria-label="Forest dictionary and thesaurus">
      <button className={styles.tab} onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>Aa</span>
        <strong>Dictionary + Thesaurus</strong>
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.heading}>
            <div>
              <span>LEXICON LEAF · NOT A FULL TREE</span>
              <h2>Understand the word without leaving the path.</h2>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close dictionary">×</button>
          </div>

          <p className={styles.doctrine}>
            Ordinary vocabulary becomes a lightweight lexical leaf. A full learning tree is reserved for subjects that need history, evidence, competing claims, or meaningful branches.
          </p>

          <form className={styles.search} onSubmit={submit}>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try instantiate, parallelize, provenance…" />
            <button type="submit">Define</button>
          </form>

          <div className={styles.quickWords}>
            {Object.keys(LEXICON).map((word) => (
              <button key={word} onClick={() => { setQuery(word); setSelected(word); setMissingReceipt(null); }}>
                {word}
              </button>
            ))}
          </div>

          {entry ? (
            <article className={styles.entry}>
              <div className={styles.wordLine}>
                <h3>{entry.word}</h3>
                <span>{entry.partOfSpeech}</span>
              </div>
              <p className={styles.definition}>{entry.definition}</p>
              <div className={styles.plain}><strong>Plain language</strong><span>{entry.plainLanguage}</span></div>
              <div className={styles.group}><strong>Thesaurus</strong><div>{entry.synonyms.map((word) => <span key={word}>{word}</span>)}</div></div>
              <div className={styles.group}><strong>Related words</strong><div>{entry.related.map((word) => <span key={word}>{word}</span>)}</div></div>
              <blockquote>{entry.usage}</blockquote>
              <div className={styles.sources}>
                <strong>External lexical checks</strong>
                {entry.sourceLinks.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a>)}
              </div>
            </article>
          ) : (
            <article className={styles.missing}>
              <span>WORD NOT YET IN THE BUILT-IN LEXICON</span>
              <h3>{normalize(query) || "Unknown word"}</h3>
              <p>This creates a lexical lookup receipt, not an encyclopedia seed and not an invented definition.</p>
              {missingReceipt && <code>{missingReceipt}</code>}
              <div>
                <a href={`https://www.merriam-webster.com/dictionary/${encodeURIComponent(normalize(query))}`} target="_blank" rel="noreferrer">Check dictionary ↗</a>
                <a href={`https://www.merriam-webster.com/thesaurus/${encodeURIComponent(normalize(query))}`} target="_blank" rel="noreferrer">Check thesaurus ↗</a>
              </div>
            </article>
          )}

          <footer>
            <strong>Routing rule:</strong> define the word here; grow a tree only when the concept itself deserves investigation.
          </footer>
        </div>
      )}
    </aside>
  );
}
