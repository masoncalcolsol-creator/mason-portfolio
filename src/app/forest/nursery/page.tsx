"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./nursery.module.css";

type LedgerStatus = {
  state: string;
  writesEnabled: boolean;
};

type SeedDraft = {
  question: string;
  why: string;
  memory: string;
  sourceLead: string;
  routeIntent: string;
  invitedBy: string;
};

const EMPTY_DRAFT: SeedDraft = {
  question: "",
  why: "",
  memory: "",
  sourceLead: "",
  routeIntent: "2-minute clearing first",
  invitedBy: "Mason Perry",
};

function compact(value: string, max = 4000) {
  return value.trim().replace(/\s+/g, " ").slice(0, max);
}

function draftFromUrl(): SeedDraft {
  if (typeof window === "undefined") return EMPTY_DRAFT;
  const params = new URLSearchParams(window.location.search);
  return {
    question: params.get("topic") || "",
    why: params.get("why") || "",
    memory: params.get("memory") || "",
    sourceLead: params.get("source") || "",
    routeIntent: params.get("route") || "2-minute clearing first",
    invitedBy: params.get("from") || "Mason Perry",
  };
}

export default function SeedNurseryPage() {
  const [draft, setDraft] = useState<SeedDraft>(EMPTY_DRAFT);
  const [status, setStatus] = useState<LedgerStatus>({ state: "CHECKING", writesEnabled: false });
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    setDraft(draftFromUrl());
    fetch("/api/forest/status", { cache: "no-store" })
      .then(async (response) => ({ response, body: await response.json() }))
      .then(({ response, body }) => {
        setStatus({
          state: body?.storage?.state || (response.ok ? "READY" : "UNAVAILABLE"),
          writesEnabled: Boolean(body?.writesEnabled),
        });
      })
      .catch(() => setStatus({ state: "UNREACHABLE", writesEnabled: false }));
  }, []);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams();
    if (compact(draft.question, 240)) params.set("topic", compact(draft.question, 240));
    if (compact(draft.why, 700)) params.set("why", compact(draft.why, 700));
    if (compact(draft.memory, 700)) params.set("memory", compact(draft.memory, 700));
    if (compact(draft.sourceLead, 500)) params.set("source", compact(draft.sourceLead, 500));
    if (draft.routeIntent) params.set("route", draft.routeIntent);
    if (compact(draft.invitedBy, 100)) params.set("from", compact(draft.invitedBy, 100));
    const query = params.toString();
    return `${window.location.origin}/forest/nursery${query ? `?${query}` : ""}`;
  }, [draft]);

  const contextText = useMemo(() => {
    const parts = [
      draft.why ? `Why this matters: ${compact(draft.why, 1200)}` : "",
      draft.memory ? `Current memory or starting point: ${compact(draft.memory, 1600)}` : "",
      draft.routeIntent ? `Requested route: ${draft.routeIntent}` : "",
      draft.invitedBy ? `Seed planter or inviter: ${compact(draft.invitedBy, 100)}` : "",
    ].filter(Boolean);
    return parts.join("\n\n");
  }, [draft]);

  const ready = status.state === "READY" && status.writesEnabled;

  function update<K extends keyof SeedDraft>(key: K, value: SeedDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setReceipt(null);
    setError(null);
  }

  async function plant(event: FormEvent) {
    event.preventDefault();
    const question = compact(draft.question, 240);
    if (!question || busy) return;

    setBusy(true);
    setReceipt(null);
    setError(null);
    try {
      const response = await fetch("/api/forest/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "seed",
          label: question,
          topicId: "TOPIC-SEED-NURSERY",
          edge: "PUBLIC_CURIOSITY_SEED",
          context: contextText,
          sourceLead: compact(draft.sourceLead, 1500),
          routeIntent: draft.routeIntent,
          invitedBy: compact(draft.invitedBy, 100),
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body?.error?.message || "The Forest could not preserve this seed.");
      setReceipt(body.event.receipt);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The Forest could not preserve this seed.");
    } finally {
      setBusy(false);
    }
  }

  async function copyText(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 2200);
    } catch {
      setCopied("Copy failed — select the text manually");
    }
  }

  async function shareSeed() {
    const text = `I planted a possible Live Learning Forest seed: “${compact(draft.question, 240) || "an open question"}.” Open it, inspect the starting context, change anything you disagree with, and plant it only when the shared ledger is ready.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Live Learning Forest seed", text, url: shareUrl });
        return;
      } catch {
        // The user may have dismissed the native sheet; keep the copy path available.
      }
    }
    await copyText(`${text}\n\n${shareUrl}`, "Seed invite copied");
  }

  const inviteMessage = `I’m pressure-testing a free source-governed learning system called the Live Learning Forest. It does not instantly generate an article when somebody asks a question. It records the curiosity as a seed, preserves the starting memory and source leads, and queues the subject for evidence review. Open this seed packet, change anything you disagree with, and try planting it:\n\n${shareUrl}`;

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a className={styles.brand} href="/forest">
            <span className={styles.mark}>NW</span>
            <span><strong>LIVE LEARNING FOREST</strong><small>SEED NURSERY · PUBLIC GROVE 1.1</small></span>
          </a>
          <nav className={styles.headerNav}>
            <a href="/forest">Enter Forest</a>
            <a href="/forest/admin">Review Queue</a>
          </nav>
        </header>

        <section className={styles.hero}>
          <div>
            <div className={styles.eyebrow}>QUESTION → SEED PACKET → DURABLE RECEIPT → EVIDENCE REVIEW</div>
            <h1>Plan the seed before the Forest grows it.</h1>
            <p>
              A useful seed is more than a search term. Preserve the question, why it matters, what you currently remember,
              and any source lead. The Forest can then research the real question without pretending your starting memory is already verified.
            </p>
          </div>
          <aside className={styles.heroCard}>
            <div className={styles.eyebrow}>WHAT CARL AND IRA SHOULD SEE</div>
            <strong>This is a governed curiosity intake—not another chatbot.</strong>
            <ol>
              <li>A person frames the question and starting context.</li>
              <li>The system creates a public receipt instead of an instant article.</li>
              <li>Research and source checking happen before canonical publication.</li>
              <li>People can share and improve the seed without voting facts into truth.</li>
            </ol>
          </aside>
        </section>

        <div className={styles.status} data-ready={ready} role="status">
          <b>{ready ? "LEDGER READY" : status.state === "CHECKING" ? "CHECKING LEDGER" : "PLANNING MODE"}</b>
          <span>
            {ready
              ? "Planting creates a durable server receipt that can be read back and reviewed."
              : `Seed packets and share links work now. Durable planting is paused until /api/forest/status reports READY. Current state: ${status.state}.`}
          </span>
        </div>

        <section className={styles.workspace}>
          <form className={styles.formCard} onSubmit={plant}>
            <div className={styles.eyebrow}>SEED INTAKE</div>
            <h2>What should the Forest learn next?</h2>
            <p>Write it the way a real person would ask it. Uncertainty is allowed and should be preserved.</p>

            <div className={styles.field}>
              <label htmlFor="seed-question">Question or subject</label>
              <input
                id="seed-question"
                value={draft.question}
                onChange={(event) => update("question", event.target.value)}
                maxLength={240}
                placeholder="Example: Why did Rossini stop writing operas after Guillaume Tell?"
                required
              />
              <small>This becomes the visible seed label, not a verified claim.</small>
            </div>

            <div className={styles.field}>
              <label htmlFor="seed-why">Why are you curious?</label>
              <textarea
                id="seed-why"
                value={draft.why}
                onChange={(event) => update("why", event.target.value)}
                placeholder="What triggered the question, and what would a useful answer help you understand?"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="seed-memory">What do you currently remember, suspect, or think might be true?</label>
              <textarea
                id="seed-memory"
                value={draft.memory}
                onChange={(event) => update("memory", event.target.value)}
                placeholder="Preserve crossed memories and uncertainty. The Forest will separate claims from recollection."
              />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="seed-source">Possible source lead</label>
                <input
                  id="seed-source"
                  value={draft.sourceLead}
                  onChange={(event) => update("sourceLead", event.target.value)}
                  placeholder="URL, book, archive, person, or ‘none yet’"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="seed-route">Preferred first route</label>
                <select id="seed-route" value={draft.routeIntent} onChange={(event) => update("routeIntent", event.target.value)}>
                  <option>2-minute clearing first</option>
                  <option>10-minute trail first</option>
                  <option>Deep expedition first</option>
                  <option>Librarian decides</option>
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="seed-planter">Seed planter or inviter</label>
              <input id="seed-planter" value={draft.invitedBy} onChange={(event) => update("invitedBy", event.target.value)} maxLength={100} />
              <small>A real name is optional. A role or pseudonym is acceptable.</small>
            </div>

            <div className={styles.actions}>
              <button className={styles.primary} type="submit" disabled={!ready || busy || !draft.question.trim()}>
                {busy ? "Planting…" : ready ? "Plant durable seed" : "Ledger not ready"}
              </button>
              <button className={styles.secondary} type="button" onClick={() => { setDraft(EMPTY_DRAFT); setReceipt(null); setError(null); }}>
                Clear packet
              </button>
            </div>
          </form>

          <div className={styles.right}>
            <article className={styles.previewCard}>
              <span className={styles.seedTag}>PLANNED SEED · NOT CANONICAL</span>
              <h2 className={styles.seedQuestion}>{draft.question.trim() || "Your question will appear here."}</h2>
              <p>This packet preserves the curiosity before research changes or clarifies it.</p>
              <div className={styles.previewGrid}>
                <div><strong>Why it matters</strong>{draft.why.trim() || "Not supplied yet."}</div>
                <div><strong>Starting memory</strong>{draft.memory.trim() || "No recollection or hypothesis supplied."}</div>
                <div><strong>Source lead</strong>{draft.sourceLead.trim() || "None yet. Research must begin from discovery."}</div>
                <div><strong>Requested route</strong>{draft.routeIntent}</div>
                <div><strong>Seed planter / inviter</strong>{draft.invitedBy.trim() || "Anonymous"}</div>
              </div>

              {receipt && (
                <div className={styles.receipt}>
                  <strong>DURABLE SEED RECEIPT</strong>
                  <code>{receipt}</code>
                  <a href={`/api/forest/events?receipt=${encodeURIComponent(receipt)}`} target="_blank" rel="noreferrer">Read receipt back from the ledger ↗</a>
                </div>
              )}
              {error && <div className={`${styles.receipt} ${styles.error}`}><strong>SEED NOT PLANTED</strong><p>{error}</p><p>No substitute local receipt was created.</p></div>}
            </article>

            <article className={styles.shareCard}>
              <div className={styles.eyebrow}>SHARE THE QUESTION BEFORE PUBLICATION</div>
              <h2>Invite someone into the seed.</h2>
              <p>The link carries the planned packet in its URL. The recipient can inspect and alter it before creating a durable receipt.</p>
              <div className={styles.shareActions}>
                <button type="button" onClick={() => void shareSeed()}>Share seed packet</button>
                <button type="button" onClick={() => void copyText(inviteMessage, "Carl/Ira invite copied")}>Copy explainer invite</button>
              </div>
              <code className={styles.shareUrl}>{shareUrl || "Build a seed packet to generate its link."}</code>
              {copied && <div className={styles.toast}>{copied}</div>}
            </article>
          </div>
        </section>

        <section className={styles.explainer}>
          <div className={styles.eyebrow}>THE TEST WE ARE ACTUALLY RUNNING</div>
          <h2>Can curiosity grow without turning into unsourced content sludge?</h2>
          <div className={styles.principles}>
            <article><span>1</span><h3>Preserve the human question</h3><p>The original language, uncertainty, and trigger remain visible instead of being overwritten by polished AI prose.</p></article>
            <article><span>2</span><h3>Separate intake from truth</h3><p>A planted seed proves that somebody asked. It does not prove that anything in the seed is factually correct.</p></article>
            <article><span>3</span><h3>Require touchable roots</h3><p>A tree is published only after its claims point to exact, resolvable, appropriate sources and pass review.</p></article>
          </div>
          <div className={styles.testLoop}>
            <strong>Today’s pressure test:</strong> create one seed with Carl or Ira, preserve the receipt, verify the read-back endpoint,
            then inspect the same item in <code>/forest/admin</code>. That proves the public intake and governed review loop—not merely the page design.
          </div>
        </section>

        <footer className={styles.footer}>Seed packets are invitations to research. Canonical pages are governed evidence products.</footer>
      </div>
    </main>
  );
}
