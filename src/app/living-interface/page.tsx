"use client";

import { useEffect, useState, type FormEvent } from "react";
import "./living-interface.css";

type Receipt = {
  outcome: "DISPLAYED" | "SUPPRESSED";
  event: "environment.moss" | "record.lineage_verified";
  reason?: "CRITICAL_STATE" | "TRUTH_GATE" | "BUSY";
  timestamp: number;
};

const ENVIRONMENT_PHRASE = "MOSS";

function normalize(input: string): string {
  return input
    .trim()
    .toUpperCase()
    .replace(/^[^A-Z0-9]+|[^A-Z0-9]+$/g, "")
    .replace(/\s+/g, " ");
}

export default function LivingInterfaceLab() {
  const [note, setNote] = useState("");
  const [gardenActive, setGardenActive] = useState(false);
  const [lineageVerified, setLineageVerified] = useState(false);
  const [lineagePulse, setLineagePulse] = useState(0);
  const [criticalState, setCriticalState] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [lastNote, setLastNote] = useState("No field note submitted.");

  useEffect(() => {
    if (!gardenActive) return;
    const timer = window.setTimeout(() => setGardenActive(false), 4600);
    return () => window.clearTimeout(timer);
  }, [gardenActive]);

  function record(receipt: Receipt): Receipt {
    setReceipts((current) => [receipt, ...current].slice(0, 8));
    return receipt;
  }

  function triggerEnvironment(): Receipt {
    const timestamp = Date.now();

    if (criticalState) {
      return record({
        outcome: "SUPPRESSED",
        event: "environment.moss",
        reason: "CRITICAL_STATE",
        timestamp,
      });
    }

    if (gardenActive) {
      return record({
        outcome: "SUPPRESSED",
        event: "environment.moss",
        reason: "BUSY",
        timestamp,
      });
    }

    setGardenActive(true);
    return record({
      outcome: "DISPLAYED",
      event: "environment.moss",
      timestamp,
    });
  }

  function submitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitted = note.trim();
    if (!submitted) return;

    setLastNote(submitted);
    setNote("");

    if (normalize(submitted) === ENVIRONMENT_PHRASE) {
      triggerEnvironment();
    }
  }

  function verifyLineage(valid = true): Receipt {
    const timestamp = Date.now();

    if (criticalState) {
      return record({
        outcome: "SUPPRESSED",
        event: "record.lineage_verified",
        reason: "CRITICAL_STATE",
        timestamp,
      });
    }

    if (!valid) {
      return record({
        outcome: "SUPPRESSED",
        event: "record.lineage_verified",
        reason: "TRUTH_GATE",
        timestamp,
      });
    }

    setLineageVerified(true);
    setLineagePulse((value) => value + 1);
    return record({
      outcome: "DISPLAYED",
      event: "record.lineage_verified",
      timestamp,
    });
  }

  function resetLab() {
    setGardenActive(false);
    setLineageVerified(false);
    setReceipts([]);
    setLastNote("No field note submitted.");
    setNote("");
  }

  return (
    <main
      className={`li2-page ${gardenActive ? "is-garden" : ""} ${
        reducedMotion ? "is-reduced" : ""
      }`}
    >
      <div className="li2-ambient" aria-hidden="true" />
      {gardenActive ? <GardenEvent reducedMotion={reducedMotion} /> : null}

      <section className="li2-shell" aria-label="NULLWORKS Living Interface field lab">
        <header className="li2-topbar">
          <div>
            <p className="li2-kicker">NULLWORKS / LIVING INTERFACE STUDY 02</p>
            <h1>The interface should change before it announces itself.</h1>
          </div>
          <span className={criticalState ? "li2-state is-red" : "li2-state"}>
            {criticalState ? "critical state" : "system normal"}
          </span>
        </header>

        <section className="li2-workspace">
          <article
            className={`li2-record ${lineageVerified ? "is-verified" : ""}`}
            key={lineagePulse}
          >
            <div className="li2-record-head">
              <div>
                <p className="li2-label">SOURCE RECORD / 0047</p>
                <h2>Conveyor summer-trip root cause</h2>
              </div>
              <span className="li2-record-state">
                {lineageVerified ? "verified" : "unverified"}
              </span>
            </div>

            <p className="li2-summary">
              Repeated overload trips stopped after a bent photoeye bracket was realigned.
              The original account remains preserved separately from the interpretation.
            </p>

            <div className="li2-lineage" aria-label="Source lineage">
              <div className="li2-node">
                <span>01</span>
                <strong>Human account</strong>
                <small>source preserved</small>
              </div>
              <div className="li2-link is-complete" aria-hidden="true" />
              <div className="li2-node">
                <span>02</span>
                <strong>Evidence class</strong>
                <small>firsthand / uncorroborated</small>
              </div>
              <div
                className={`li2-link li2-final-link ${lineageVerified ? "is-complete" : ""}`}
                aria-hidden="true"
              />
              <div className={`li2-node ${lineageVerified ? "is-final" : ""}`}>
                <span>03</span>
                <strong>Governed record</strong>
                <small>{lineageVerified ? "lineage accepted" : "awaiting review"}</small>
              </div>
            </div>

            <div className="li2-actions">
              <button
                type="button"
                className="li2-primary"
                onClick={() => verifyLineage(true)}
                disabled={lineageVerified}
              >
                {lineageVerified ? "Lineage verified" : "Verify source lineage"}
              </button>
              <span className="li2-action-note">Watch the record, not the button.</span>
            </div>

            <div className="li2-root-trace" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </article>

          <aside className="li2-notes">
            <div className="li2-notes-head">
              <p className="li2-label">FIELD NOTE</p>
              <span>local draft</span>
            </div>
            <blockquote>{lastNote}</blockquote>
            <form onSubmit={submitNote} className="li2-composer">
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Write a short field note…"
                rows={3}
                aria-label="Field note"
              />
              <button type="submit">Save note</button>
            </form>
            <p className="li2-hint">
              Most notes simply save. One exact note changes the room for a few seconds.
            </p>
          </aside>
        </section>

        <details className="li2-diagnostics">
          <summary>Open test drawer</summary>
          <div className="li2-diagnostic-grid">
            <section>
              <p className="li2-label">TEST KEY</p>
              <p>
                Environmental trigger: <code>{ENVIRONMENT_PHRASE}</code>
              </p>
              <p className="li2-small">
                It is intentionally absent from the main interface. Type it as the complete
                field note and save.
              </p>
            </section>

            <section className="li2-switches">
              <label>
                <span>
                  <strong>Critical state</strong>
                  <small>Suppress both responses</small>
                </span>
                <input
                  type="checkbox"
                  checked={criticalState}
                  onChange={(event) => setCriticalState(event.target.checked)}
                />
              </label>
              <label>
                <span>
                  <strong>Reduced motion</strong>
                  <small>Preserve state change without drift</small>
                </span>
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(event) => setReducedMotion(event.target.checked)}
                />
              </label>
            </section>

            <section className="li2-test-actions">
              <button type="button" onClick={() => verifyLineage(false)}>
                Attempt false verification
              </button>
              <button type="button" onClick={resetLab}>
                Reset study
              </button>
            </section>
          </div>

          <div className="li2-receipts" role="log" aria-live="polite">
            {receipts.length === 0 ? (
              <p>No receipts yet.</p>
            ) : (
              receipts.map((receipt, index) => (
                <div key={`${receipt.timestamp}-${index}`}>
                  <strong>{receipt.outcome}</strong>
                  <span>{receipt.event}</span>
                  <small>{receipt.reason ?? new Date(receipt.timestamp).toLocaleTimeString()}</small>
                </div>
              ))
            )}
          </div>
        </details>
      </section>
    </main>
  );
}

function GardenEvent({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="li2-garden-event" aria-hidden="true" data-reduced={reducedMotion}>
      <div className="li2-vignette" />
      <i className="li2-branch li2-b1" />
      <i className="li2-branch li2-b2" />
      <i className="li2-branch li2-b3" />
      <i className="li2-branch li2-b4" />
      <i className="li2-spore li2-s1" />
      <i className="li2-spore li2-s2" />
      <i className="li2-spore li2-s3" />
      <i className="li2-spore li2-s4" />
      <i className="li2-spore li2-s5" />
      <i className="li2-spore li2-s6" />
    </div>
  );
}
