"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./admin.module.css";

type QueueItem = {
  receipt: string;
  kind: string;
  topic_id: string | null;
  label: string | null;
  edge_type: string | null;
  proposal_text: string | null;
  source_locator: string | null;
  preference: string | null;
  route_depth: number | null;
  payload?: {
    context?: string | null;
    source_lead?: string | null;
    route_intent?: string | null;
    invited_by?: string | null;
    [key: string]: unknown;
  } | null;
  submission_state: string;
  created_at: string;
  latest_review_receipt: string | null;
  latest_decision: string | null;
  latest_review_note: string | null;
  latest_reviewer: string | null;
  latest_reviewed_at: string | null;
};

export default function ForestAdminPage() {
  const [token, setToken] = useState("");
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [status, setStatus] = useState("Enter the Final Human Authority token to open the governed queue.");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = sessionStorage.getItem("llf.admin.token") || "";
    if (stored) {
      setToken(stored);
      void loadQueue(stored);
    }
  }, []);

  async function loadQueue(activeToken = token) {
    if (!activeToken) return;
    setLoading(true);
    try {
      const response = await fetch("/api/forest/admin/queue", {
        cache: "no-store",
        headers: { Authorization: `Bearer ${activeToken}` },
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body?.error?.message || "Queue request failed.");
      sessionStorage.setItem("llf.admin.token", activeToken);
      setQueue(body.queue || []);
      setStatus(`${body.queue?.length || 0} immutable submissions loaded. Reviews create new events; they do not edit history.`);
    } catch (error) {
      setQueue([]);
      setStatus(error instanceof Error ? error.message : "Queue request failed.");
    } finally {
      setLoading(false);
    }
  }

  function unlock(event: FormEvent) {
    event.preventDefault();
    void loadQueue(token);
  }

  async function review(item: QueueItem, decision: "ACCEPT" | "REJECT" | "DEFER" | "NEEDS_EVIDENCE") {
    setLoading(true);
    try {
      const response = await fetch("/api/forest/admin/queue", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionReceipt: item.receipt,
          decision,
          note: notes[item.receipt] || "",
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body?.error?.message || "Review could not be preserved.");
      setStatus(`${body.review.review_receipt} created. ${decision} is now the latest review event for ${item.receipt}.`);
      await loadQueue(token);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Review could not be preserved.");
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <div className={styles.eyebrow}>NULLWORKS · LIVE LEARNING FOREST</div>
            <strong>Governed Review Console</strong>
          </div>
          <div>
            <a href="/forest/nursery">Open Seed Nursery →</a><br />
            <a href="/forest">Return to the Forest →</a>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.eyebrow}>MASON DECIDES · SYSTEMS PREPARE · EXPERTS VERIFY</div>
          <h1>Review what the Forest is trying to grow.</h1>
          <p>
            Seeds, sourced proposals, route preferences, and missing-word requests arrive here as immutable submissions.
            Accepting an item approves the next work step. It does not silently publish or rewrite a canonical page.
          </p>
          <form className={styles.login} onSubmit={unlock}>
            <input
              type="password"
              autoComplete="current-password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Final Human Authority token"
              aria-label="Final Human Authority token"
            />
            <button type="submit" disabled={loading}>{loading ? "Checking…" : "Open queue"}</button>
          </form>
        </section>

        <div className={`${styles.status} ${status.toLowerCase().includes("failed") || status.toLowerCase().includes("required") ? styles.error : ""}`} role="status">
          {status}
        </div>

        <div className={styles.toolbar}>
          <strong>{queue.length} submission{queue.length === 1 ? "" : "s"}</strong>
          <button onClick={() => void loadQueue()} disabled={loading}>Refresh</button>
        </div>

        <section className={styles.queue}>
          {queue.length === 0 ? (
            <div className={styles.empty}>No queue is visible yet. The ledger may be empty, locked, or not connected.</div>
          ) : queue.map((item) => (
            <article className={styles.card} key={item.receipt}>
              <div className={styles.meta}>
                <span>{item.kind}</span>
                <span>{item.submission_state}</span>
                <span>{new Date(item.created_at).toLocaleString()}</span>
              </div>
              <h2>{item.label || item.proposal_text || `${item.preference?.toUpperCase()} route preference`}</h2>
              <p><strong>Receipt:</strong> {item.receipt}</p>
              {item.topic_id && <p><strong>Topic:</strong> {item.topic_id}</p>}
              {item.edge_type && <p><strong>Edge:</strong> {item.edge_type}</p>}
              {item.proposal_text && <p>{item.proposal_text}</p>}
              {item.payload?.route_intent && <p><strong>Requested route:</strong> {item.payload.route_intent}</p>}
              {item.payload?.invited_by && <p><strong>Seed planter / inviter:</strong> {item.payload.invited_by}</p>}
              {item.source_locator && <span className={styles.source}><strong>Source lead:</strong> {item.source_locator}</span>}
              {item.preference && <p><strong>Routing signal:</strong> {item.preference.toUpperCase()} · depth {item.route_depth}</p>}
              {item.latest_decision && (
                <div className={styles.decision}>
                  <strong>Latest review: {item.latest_decision}</strong>
                  {item.latest_review_note && <p>{item.latest_review_note}</p>}
                  <small>{item.latest_review_receipt} · {item.latest_reviewed_at ? new Date(item.latest_reviewed_at).toLocaleString() : ""}</small>
                </div>
              )}
              <div className={styles.actions}>
                <input
                  className={styles.note}
                  value={notes[item.receipt] || ""}
                  onChange={(event) => setNotes((current) => ({ ...current, [item.receipt]: event.target.value }))}
                  placeholder="Review note / next action"
                />
                <button onClick={() => void review(item, "ACCEPT")} disabled={loading}>Accept</button>
                <button onClick={() => void review(item, "REJECT")} disabled={loading}>Reject</button>
                <button onClick={() => void review(item, "DEFER")} disabled={loading}>Defer</button>
                <button onClick={() => void review(item, "NEEDS_EVIDENCE")} disabled={loading}>Needs evidence</button>
              </div>
            </article>
          ))}
        </section>

        <footer className={styles.footer}>No receipt, no sync. No review event, no publication authority.</footer>
      </div>
    </main>
  );
}
