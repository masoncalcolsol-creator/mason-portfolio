"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./receipt.module.css";

type ReceiptEvent = {
  receipt: string;
  kind: string;
  topic_id: string | null;
  label: string | null;
  edge_type: string | null;
  proposal_text: string | null;
  source_locator: string | null;
  preference: string | null;
  route_depth: number | null;
  state: string;
  payload?: {
    context?: string | null;
    source_lead?: string | null;
    route_intent?: string | null;
    invited_by?: string | null;
    [key: string]: unknown;
  } | null;
  created_at: string;
};

export default function ForestReceiptPage() {
  const [receiptId, setReceiptId] = useState("");
  const [event, setEvent] = useState<ReceiptEvent | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [message, setMessage] = useState("Reading the shared Forest ledger…");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const receipt = params.get("receipt") || "";
    setReceiptId(receipt);
    if (!receipt) {
      setState("error");
      setMessage("No receipt was supplied.");
      return;
    }

    fetch(`/api/forest/events?receipt=${encodeURIComponent(receipt)}`, { cache: "no-store" })
      .then(async (response) => ({ response, body: await response.json() }))
      .then(({ response, body }) => {
        if (!response.ok) throw new Error(body?.error?.message || "The receipt could not be read from the ledger.");
        setEvent(body.event);
        setState("ready");
      })
      .catch((error) => {
        setState("error");
        setMessage(error instanceof Error ? error.message : "The receipt could not be read from the ledger.");
      });
  }, []);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined" || !receiptId) return "";
    return `${window.location.origin}/forest/receipt?receipt=${encodeURIComponent(receiptId)}`;
  }, [receiptId]);

  async function copyReceipt() {
    if (!shareUrl) return;
    const text = `Live Learning Forest receipt: ${event?.label || receiptId}\n\n${shareUrl}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.brand}>NULLWORKS · LIVE LEARNING FOREST</div>
          <a href="/forest/nursery">Plant another seed</a>
        </header>

        {state === "loading" && <div className={styles.status}>{message}</div>}
        {state === "error" && <div className={`${styles.status} ${styles.error}`}><strong>Receipt unavailable</strong><p>{message}</p></div>}

        {state === "ready" && event && (
          <article className={styles.card}>
            <div className={styles.eyebrow}>DURABLE FOREST RECEIPT · {event.kind.toUpperCase()}</div>
            <h1>{event.label || event.proposal_text || event.receipt}</h1>
            <p className={styles.intro}>
              This page proves that the Forest accepted and preserved a public event. It does not prove the factual truth of the seed,
              proposal, preference, or memory contained inside it.
            </p>

            <div className={styles.meta}>
              <span>{event.state}</span>
              <span>{new Date(event.created_at).toLocaleString()}</span>
              {event.edge_type && <span>{event.edge_type}</span>}
            </div>

            {event.proposal_text && <div className={styles.section}><strong>Starting context</strong><p>{event.proposal_text}</p></div>}
            {event.source_locator && <div className={styles.section}><strong>Possible source lead</strong><p>{event.source_locator}</p></div>}
            {event.payload?.route_intent && <div className={styles.section}><strong>Requested learning route</strong><p>{event.payload.route_intent}</p></div>}
            {event.payload?.invited_by && <div className={styles.section}><strong>Seed planter or inviter</strong><p>{event.payload.invited_by}</p></div>}
            {event.preference && <div className={styles.section}><strong>Presentation preference</strong><p>{event.preference.toUpperCase()}</p></div>}

            <div className={styles.receipt}>
              <strong>RECEIPT IDENTIFIER</strong>
              <code>{event.receipt}</code>
              <span>Read directly from the server-backed shared ledger.</span>
            </div>

            <div className={styles.boundary}>
              <strong>Truth boundary:</strong> this receipt records that somebody planted or submitted something. Canonical publication still requires source retrieval,
              exact-link verification, claim review, and a separate immutable page-version event.
            </div>

            <div className={styles.actions}>
              <a href="/forest/admin">Open governed review console</a>
              <button type="button" onClick={() => void copyReceipt()}>{copied ? "Receipt link copied" : "Copy receipt link"}</button>
            </div>
          </article>
        )}

        <footer className={styles.footer}>A receipted question is the beginning of research—not the end of it.</footer>
      </div>
    </main>
  );
}
