"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Signal = {
  title: string;
  source: string;
  time: string;
  score: number;
  confidence: string;
  url: string;
  summary: string;
  lens: string;
  topic: string;
};

type Meme = {
  title: string;
  top: string;
  bottom: string;
  why: string;
  brief: string;
  caption: string;
  sourceUrl: string;
};

const signals: Signal[] = [
  {
    title: "OpenAI launches ChatGPT Work as competition for enterprise AI agents intensifies",
    source: "Reuters",
    time: "2026-07-09 12:00 UTC",
    score: 22,
    confidence: "SEEDED_SOURCE_RECEIPT",
    url: "https://www.reuters.com/business/openai-launches-chatgpt-work-2026-07-09",
    summary:
      "OpenAI introduced a work-focused agent experience intended to give non-coders access to coding and multi-step professional tools, increasing pressure on organizations to define how AI work is governed and deployed.",
    lens:
      "Watch authority, handoffs, telemetry, exception recovery, and whether the announcement survives real deployment.",
    topic: "Agents + enterprise work",
  },
  {
    title: "Google Cloud report says agentic AI ambition is outrunning infrastructure readiness",
    source: "TechRadar / Google Cloud report",
    time: "2026-07-09 11:00 UTC",
    score: 21,
    confidence: "SEEDED_SOURCE_RECEIPT",
    url:
      "https://www.techradar.com/pro/the-gap-between-ai-ambition-and-infrastructure-reality-is-widening-google-cloud-report-finds-83-percent-of-organizations-must-overhaul-their-infrastructure-in-order-to-maximize-the-agentic-ai-opportunity",
    summary:
      "A Google Cloud report says many organizations need major infrastructure changes to support agentic AI, highlighting governance, data, cost, and operational complexity rather than model capability alone.",
    lens:
      "Treat infrastructure readiness as the operating-layer problem: data, authority, cost, review, exception handling, and support load.",
    topic: "Infrastructure gap",
  },
  {
    title: "Meta begins charging developers for access to an enterprise AI model",
    source: "Axios",
    time: "2026-07-09 10:00 UTC",
    score: 20,
    confidence: "SEEDED_SOURCE_RECEIPT",
    url: "https://www.axios.com/newsletters/axios-closer-41148026-0f2b-4191-b48f-84cd7859c9d0",
    summary:
      "Meta is moving from large AI infrastructure spending toward direct developer revenue, creating a useful test of whether model access becomes measurable customer workflow value.",
    lens:
      "Translate capability into cost, reliability, integration, support burden, and operator control.",
    topic: "Enterprise monetization",
  },
];

const memes: Meme[] = [
  {
    title: "The Shiny Demo / Factory Floor",
    top: "NEW AI DEMO: EVERYTHING WORKS",
    bottom: "PRODUCTION: WHO OWNS THE EXCEPTION?",
    why: "OpenAI launches ChatGPT Work as competition for enterprise AI agents intensifies",
    brief:
      "Original editorial meme, two-panel industrial workplace: spotless executive AI demo on one side, overloaded operator handling exceptions on the other. Bold caption zones. No real brands, logos, or protected characters.",
    caption:
      "The demo is not the operating system. The real deployment question is who owns the exception when the workflow leaves the happy path.",
    sourceUrl: "https://www.reuters.com/business/openai-launches-chatgpt-work-2026-07-09",
  },
  {
    title: "More Agents, Same Workflow",
    top: "WE ADDED 47 AI AGENTS",
    bottom: "THE APPROVAL STILL LIVES IN STEVE'S INBOX",
    why: "Google Cloud report says agentic AI ambition is outrunning infrastructure readiness",
    brief:
      "Original editorial meme, giant futuristic agent command center connected to one dusty office inbox. The joke is about unmodeled approval paths, not any real person.",
    caption:
      "Adding agents does not fix a broken operating model. Map the workflow, authority, and exception path first.",
    sourceUrl:
      "https://www.techradar.com/pro/the-gap-between-ai-ambition-and-infrastructure-reality-is-widening-google-cloud-report-finds-83-percent-of-organizations-must-overhaul-their-infrastructure-in-order-to-maximize-the-agentic-ai-opportunity",
  },
  {
    title: "Telemetry Missing",
    top: "DASHBOARD: 10,000 AI TASKS",
    bottom: "OPERATOR: HOW MANY WERE CORRECTED?",
    why: "Meta begins charging developers for access to an enterprise AI model",
    brief:
      "Original editorial meme, executives celebrating a giant AI task counter while correction and rework meters sit unplugged in the corner. No real company marks.",
    caption:
      "Volume is not value. OI starts when the correction loop, handoff failure, and human review burden become visible.",
    sourceUrl: "https://www.axios.com/newsletters/axios-closer-41148026-0f2b-4191-b48f-84cd7859c9d0",
  },
];

function copyText(value: string, setter: (value: string) => void, label: string) {
  navigator.clipboard?.writeText(value).then(
    () => setter(`${label} copied`),
    () => setter("Copy failed — select text manually"),
  );
}

export default function SignalCodexPreviewPage() {
  const [copied, setCopied] = useState<string>("");
  const topics = useMemo(() => Array.from(new Set(signals.map((signal) => signal.topic))), []);
  const lead = signals[0];

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>NULLWORKS SIGNAL CODEX // PUBLIC PREVIEW</p>
          <h1>AI + tech signal for operators</h1>
          <p className={styles.subline}>
            Drudge/MotoCodex-style command board for source-linked AI news, operator lenses,
            LinkedIn-safe meme ideas, and the OISA deployment gap.
          </p>
        </div>
        <div className={styles.statusBox}>
          <span>Preview route</span>
          <strong>Live test</strong>
          <p>
            This public preview mirrors the current private Signal Codex edition. It is not the
            private gated dashboard and does not include private LinkedIn intake.
          </p>
        </div>
      </header>

      <section className={styles.healthGrid}>
        <div><span>Generated</span><strong>2026-07-10 19:17 UTC</strong></div>
        <div><span>Signals</span><strong>{signals.length}</strong></div>
        <div><span>Meme candidates</span><strong>Exactly 3</strong></div>
        <div><span>LinkedIn lane</span><strong>Manual / owner supplied only</strong></div>
      </section>

      <section className={styles.leadCard}>
        <div className={styles.meta}>TOP SIGNAL · {lead.source} · SCORE {lead.score} · {lead.confidence}</div>
        <a href={lead.url} target="_blank" rel="noopener noreferrer">{lead.title}</a>
        <p>{lead.summary}</p>
        <div className={styles.operator}>Operator lens: {lead.lens}</div>
      </section>

      <section className={styles.topicRail}>
        {topics.map((topic) => (
          <a key={topic} href={`#${topic.replace(/\W+/g, "-").toLowerCase()}`}>{topic}</a>
        ))}
      </section>

      <section className={styles.boardGrid}>
        {topics.map((topic) => (
          <div key={topic} id={topic.replace(/\W+/g, "-").toLowerCase()} className={styles.topicBlock}>
            <h2>{topic}</h2>
            {signals.filter((signal) => signal.topic === topic).map((signal) => (
              <article key={signal.title} className={styles.storyCard}>
                <div className={styles.meta}>{signal.source} · {signal.time} · SCORE {signal.score} · {signal.confidence}</div>
                <a href={signal.url} target="_blank" rel="noopener noreferrer">{signal.title}</a>
                <p>{signal.summary}</p>
                <div className={styles.operator}>Operator lens: {signal.lens}</div>
              </article>
            ))}
          </div>
        ))}
      </section>

      <section className={styles.boundaryCard}>
        <h2>LinkedIn boundary</h2>
        <p>
          No automated LinkedIn login, profile collection, feed scraping, access-control bypass,
          or private-message extraction. LinkedIn intelligence enters only through Mason-supplied
          URLs, notes, screenshots, authorized exports, or an approved official integration later.
        </p>
      </section>

      <section className={styles.memeSection}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>THREE DAILY MEME CANDIDATES</p>
          <h2>Select one. Human Authority final.</h2>
        </div>
        <div className={styles.memeGrid}>
          {memes.map((meme, index) => {
            const packet = `SELECT ${index + 1}: ${meme.title}\n\nTOP:\n${meme.top}\n\nBOTTOM:\n${meme.bottom}\n\nCAPTION:\n${meme.caption}\n\nIMAGE BRIEF:\n${meme.brief}\n\nWHY NOW:\n${meme.why}\n\nSOURCE:\n${meme.sourceUrl}`;
            return (
              <article key={meme.title} className={styles.memeCard}>
                <div className={styles.selectBadge}>SELECT {index + 1}</div>
                <h3>{meme.title}</h3>
                <div className={styles.memeText}><span>Top</span>{meme.top}</div>
                <div className={styles.memeText}><span>Bottom</span>{meme.bottom}</div>
                <p><strong>Caption:</strong> {meme.caption}</p>
                <p><strong>Image brief:</strong> {meme.brief}</p>
                <p><strong>Why now:</strong> {meme.why}</p>
                <button type="button" onClick={() => copyText(packet, setCopied, `Select ${index + 1}`)}>
                  Copy Select {index + 1} packet
                </button>
              </article>
            );
          })}
        </div>
        {copied ? <p className={styles.copyStatus}>{copied}</p> : null}
      </section>
    </main>
  );
}
