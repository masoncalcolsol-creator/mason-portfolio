"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

type EventName =
  | "record.provenance_verified"
  | "data.recovery_completed"
  | "settlement.everyone_clear"
  | "artifact.exported"
  | "lineage.completed"
  | "secret.full_send"
  | "secret.data_is_god"
  | "secret.no_fake_finish_lines"
  | "secret.pow"
  | "secret.nuggies";

type SceneKind =
  | "rooted"
  | "trash-panda"
  | "checkmate"
  | "anvil"
  | "continuity"
  | "full-send"
  | "data-is-god"
  | "finish-lines"
  | "pow"
  | "nuggies";

type SceneConfig = {
  id: string;
  event: EventName;
  kind: SceneKind;
  label: string;
  durationMs: number;
  truthKey?: string;
};

type ActiveScene = {
  config: SceneConfig;
  reducedMotion: boolean;
  metadata: Readonly<Record<string, unknown>>;
};

type Receipt =
  | {
      outcome: "DISPLAYED";
      event: EventName;
      sceneId: string;
      timestamp: number;
      reducedMotion: boolean;
    }
  | {
      outcome: "SUPPRESSED";
      event: EventName;
      sceneId: string;
      timestamp: number;
      reason: "CRITICAL_STATE" | "TRUTH_GATE" | "BUSY";
    };

const SCENES: readonly SceneConfig[] = [
  {
    id: "moss-rooted-v1",
    event: "record.provenance_verified",
    kind: "rooted",
    label: "MOSS · ROOTED",
    durationMs: 2100,
    truthKey: "verified",
  },
  {
    id: "trash-panda-recovery-v1",
    event: "data.recovery_completed",
    kind: "trash-panda",
    label: "TRASH PANDA · FOUND ONE",
    durationMs: 2200,
    truthKey: "recovered",
  },
  {
    id: "checkmate-clear-v1",
    event: "settlement.everyone_clear",
    kind: "checkmate",
    label: "CHECKMATE · EVERYONE CLEAR",
    durationMs: 2100,
    truthKey: "settled",
  },
  {
    id: "anvil-export-v1",
    event: "artifact.exported",
    kind: "anvil",
    label: "ANVIL · CLANG",
    durationMs: 1500,
    truthKey: "exportSucceeded",
  },
  {
    id: "continuity-chain-v1",
    event: "lineage.completed",
    kind: "continuity",
    label: "CONTINUITY · CHAIN HOLDS",
    durationMs: 2100,
    truthKey: "lineageVerified",
  },
  {
    id: "full-send-v1",
    event: "secret.full_send",
    kind: "full-send",
    label: "FULL SEND",
    durationMs: 1800,
  },
  {
    id: "data-is-god-v1",
    event: "secret.data_is_god",
    kind: "data-is-god",
    label: "DATA IS GOD",
    durationMs: 2300,
  },
  {
    id: "no-fake-finish-lines-v1",
    event: "secret.no_fake_finish_lines",
    kind: "finish-lines",
    label: "NO FAKE FINISH LINES",
    durationMs: 2500,
  },
  {
    id: "pow-v1",
    event: "secret.pow",
    kind: "pow",
    label: "POW",
    durationMs: 900,
  },
  {
    id: "nuggies-v1",
    event: "secret.nuggies",
    kind: "nuggies",
    label: "NUGGIES",
    durationMs: 3200,
  },
] as const;

const SCENE_BY_EVENT = new Map(SCENES.map((scene) => [scene.event, scene]));

const SECRET_PHRASES = new Map<string, EventName>([
  ["FULL SEND", "secret.full_send"],
  ["DATA IS GOD", "secret.data_is_god"],
  ["NO FAKE FINISH LINES", "secret.no_fake_finish_lines"],
  ["POW", "secret.pow"],
  ["NUGGIES", "secret.nuggies"],
]);

const TRUTH_EVENTS: readonly {
  event: EventName;
  label: string;
  metadata: Readonly<Record<string, boolean>>;
}[] = [
  {
    event: "record.provenance_verified",
    label: "Verify provenance",
    metadata: { verified: true },
  },
  {
    event: "data.recovery_completed",
    label: "Recover ugly data",
    metadata: { recovered: true },
  },
  {
    event: "settlement.everyone_clear",
    label: "Settle everybody",
    metadata: { settled: true },
  },
  {
    event: "artifact.exported",
    label: "Export artifact",
    metadata: { exportSucceeded: true },
  },
  {
    event: "lineage.completed",
    label: "Complete lineage",
    metadata: { lineageVerified: true },
  },
];

function normalizeSecretPhrase(input: string): string {
  return input
    .trim()
    .toUpperCase()
    .replace(/^[^A-Z0-9]+|[^A-Z0-9]+$/g, "")
    .replace(/\s+/g, " ");
}

export default function LivingInterfaceLab() {
  const [active, setActive] = useState<ActiveScene | null>(null);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [criticalState, setCriticalState] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [phraseStatus, setPhraseStatus] = useState(
    "Exact phrases only. Normal sentences do nothing.",
  );

  const motionLabel = reducedMotion ? "REDUCED" : "FULL";

  const latestReceipt = useMemo(() => receipts[0] ?? null, [receipts]);

  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => setActive(null), active.config.durationMs);
    return () => window.clearTimeout(timer);
  }, [active]);

  function record(receipt: Receipt): Receipt {
    setReceipts((current) => [receipt, ...current].slice(0, 14));
    return receipt;
  }

  function trigger(
    event: EventName,
    metadata: Readonly<Record<string, unknown>> = {},
  ): Receipt {
    const config = SCENE_BY_EVENT.get(event);
    if (!config) {
      throw new Error(`No scene registered for ${event}`);
    }

    const timestamp = Date.now();

    if (criticalState) {
      return record({
        outcome: "SUPPRESSED",
        event,
        sceneId: config.id,
        timestamp,
        reason: "CRITICAL_STATE",
      });
    }

    if (active) {
      return record({
        outcome: "SUPPRESSED",
        event,
        sceneId: config.id,
        timestamp,
        reason: "BUSY",
      });
    }

    if (config.truthKey && metadata[config.truthKey] !== true) {
      return record({
        outcome: "SUPPRESSED",
        event,
        sceneId: config.id,
        timestamp,
        reason: "TRUTH_GATE",
      });
    }

    setActive({ config, reducedMotion, metadata });
    return record({
      outcome: "DISPLAYED",
      event,
      sceneId: config.id,
      timestamp,
      reducedMotion,
    });
  }

  function submitPhrase(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeSecretPhrase(phrase);
    const matchedEvent = SECRET_PHRASES.get(normalized);

    if (!matchedEvent) {
      setPhraseStatus("No hidden event. Exact normalized phrases only.");
      return;
    }

    const receipt = trigger(matchedEvent);
    setPhraseStatus(`${normalized} → ${receipt.outcome}`);
    setPhrase("");
  }

  return (
    <main className="li-page">
      <section className="li-shell" aria-label="NULLWORKS Living Interface field lab">
        <header className="li-hero">
          <div>
            <p className="li-kicker">NULLWORKS FIELD LAB / PROOF CELL 001</p>
            <h1>Living Interface v0.1</h1>
            <p className="li-doctrine">Serious systems. Hidden mischief.</p>
          </div>
          <div className="li-status-stack" aria-label="Current lab state">
            <span className={criticalState ? "li-chip li-chip-red" : "li-chip"}>
              {criticalState ? "RED CRITICAL" : "OPERABLE"}
            </span>
            <span className="li-chip">MOTION {motionLabel}</span>
            <span className="li-chip">10 SCENES</span>
          </div>
        </header>

        <section className="li-panel li-phrase-panel">
          <div>
            <p className="li-eyebrow">Hidden phrase router</p>
            <h2>Type the words. See what wakes up.</h2>
            <p>
              Try <code>FULL SEND</code>, <code>DATA IS GOD</code>,{" "}
              <code>NO FAKE FINISH LINES</code>, <code>POW</code>, or{" "}
              <code>NUGGIES</code>.
            </p>
          </div>
          <form className="li-phrase-form" onSubmit={submitPhrase}>
            <input
              value={phrase}
              onChange={(event) => setPhrase(event.target.value)}
              placeholder="Enter exact phrase"
              aria-label="Secret phrase"
              autoCapitalize="characters"
              autoComplete="off"
            />
            <button type="submit">Transmit</button>
          </form>
          <p className="li-phrase-status" aria-live="polite">
            {phraseStatus}
          </p>
        </section>

        <section className="li-grid">
          <article className="li-panel">
            <p className="li-eyebrow">Truth-bound operational events</p>
            <h2>These scenes require verified state.</h2>
            <div className="li-button-grid">
              {TRUTH_EVENTS.map((item) => (
                <button
                  key={item.event}
                  type="button"
                  onClick={() => trigger(item.event, item.metadata)}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                className="li-danger-button"
                onClick={() => trigger("record.provenance_verified", { verified: false })}
              >
                Attack truth gate
              </button>
            </div>
          </article>

          <article className="li-panel">
            <p className="li-eyebrow">Governance switches</p>
            <h2>Prove the spectacle stays subordinate.</h2>
            <label className="li-switch-row">
              <span>
                <strong>Simulate RED critical state</strong>
                <small>Every scene must suppress.</small>
              </span>
              <input
                type="checkbox"
                checked={criticalState}
                onChange={(event) => setCriticalState(event.target.checked)}
              />
            </label>
            <label className="li-switch-row">
              <span>
                <strong>Force reduced motion</strong>
                <small>Use restrained static fallbacks.</small>
              </span>
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(event) => setReducedMotion(event.target.checked)}
              />
            </label>
            <button
              type="button"
              className="li-secondary-button"
              onClick={() => setActive(null)}
              disabled={!active}
            >
              Cancel active scene
            </button>
          </article>
        </section>

        <section className="li-panel li-receipt-panel">
          <div className="li-receipt-heading">
            <div>
              <p className="li-eyebrow">Telemetry receipts</p>
              <h2>Every display and suppression leaves evidence.</h2>
            </div>
            <div className="li-latest">
              {latestReceipt ? (
                <>
                  <strong>{latestReceipt.outcome}</strong>
                  <span>{latestReceipt.event}</span>
                </>
              ) : (
                <span>No events yet.</span>
              )}
            </div>
          </div>
          <div className="li-receipts" role="log" aria-live="polite">
            {receipts.length === 0 ? (
              <p className="li-empty">Trigger a scene to generate the first receipt.</p>
            ) : (
              receipts.map((receipt, index) => (
                <div
                  className={`li-receipt ${receipt.outcome === "SUPPRESSED" ? "li-receipt-suppressed" : ""}`}
                  key={`${receipt.timestamp}-${index}`}
                >
                  <strong>{receipt.outcome}</strong>
                  <span>{receipt.event}</span>
                  <small>
                    {receipt.outcome === "SUPPRESSED"
                      ? receipt.reason
                      : receipt.reducedMotion
                        ? "REDUCED MOTION"
                        : "FULL MOTION"}
                  </small>
                </div>
              ))
            )}
          </div>
        </section>
      </section>

      {active ? <SceneOverlay active={active} /> : null}

      <style jsx global>{`
        :root {
          --li-bg: #050806;
          --li-panel: rgba(12, 18, 14, 0.88);
          --li-panel-soft: rgba(16, 25, 19, 0.7);
          --li-line: rgba(137, 255, 177, 0.2);
          --li-accent: #86ffb2;
          --li-accent-2: #c8ffda;
          --li-text: #f4f7f5;
          --li-muted: #94a59a;
          --li-red: #ff5f67;
        }

        * { box-sizing: border-box; }

        body { background: var(--li-bg); }

        .li-page {
          min-height: 100dvh;
          width: 100%;
          color: var(--li-text);
          background:
            radial-gradient(circle at 18% 0%, rgba(63, 255, 132, 0.11), transparent 36rem),
            radial-gradient(circle at 90% 30%, rgba(0, 160, 80, 0.08), transparent 31rem),
            linear-gradient(180deg, #07100a 0%, #050806 50%, #030504 100%);
          padding: max(1rem, env(safe-area-inset-top)) 1rem max(2rem, env(safe-area-inset-bottom));
          font-family: var(--font-geist-sans), system-ui, sans-serif;
        }

        .li-shell { width: min(1100px, 100%); margin: 0 auto; }

        .li-hero {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.5rem;
          padding: clamp(2rem, 7vw, 5.5rem) 0 2rem;
          border-bottom: 1px solid var(--li-line);
        }

        .li-kicker,
        .li-eyebrow {
          color: var(--li-accent);
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .li-hero h1 {
          margin: 0.45rem 0 0.35rem;
          font-size: clamp(2.5rem, 8vw, 6.7rem);
          line-height: 0.92;
          letter-spacing: -0.065em;
        }

        .li-doctrine { margin: 0; color: var(--li-muted); font-size: clamp(1rem, 2.4vw, 1.35rem); }

        .li-status-stack { display: grid; gap: 0.55rem; min-width: 10rem; }

        .li-chip {
          display: block;
          padding: 0.58rem 0.75rem;
          border: 1px solid var(--li-line);
          background: rgba(3, 8, 5, 0.72);
          color: var(--li-accent-2);
          font: 700 0.68rem/1 var(--font-geist-mono), monospace;
          letter-spacing: 0.12em;
          text-align: center;
        }

        .li-chip-red { color: #ffd8da; border-color: rgba(255, 95, 103, 0.55); background: rgba(90, 10, 17, 0.58); }

        .li-panel {
          border: 1px solid var(--li-line);
          background: linear-gradient(145deg, var(--li-panel), var(--li-panel-soft));
          box-shadow: 0 1.5rem 5rem rgba(0, 0, 0, 0.24);
          backdrop-filter: blur(16px);
          padding: clamp(1.1rem, 3vw, 2rem);
        }

        .li-panel h2 { margin: 0.35rem 0 0.85rem; font-size: clamp(1.35rem, 3.2vw, 2.15rem); letter-spacing: -0.035em; }
        .li-panel p { color: var(--li-muted); line-height: 1.62; }
        .li-panel code { color: var(--li-accent-2); font-family: var(--font-geist-mono), monospace; }

        .li-phrase-panel { margin-top: 1.25rem; }

        .li-phrase-form { display: grid; grid-template-columns: 1fr auto; gap: 0.75rem; margin-top: 1.25rem; }

        .li-phrase-form input {
          min-width: 0;
          border: 1px solid rgba(134, 255, 178, 0.32);
          background: rgba(0, 0, 0, 0.36);
          color: var(--li-text);
          padding: 0.9rem 1rem;
          border-radius: 0;
          font: 700 1rem/1.2 var(--font-geist-mono), monospace;
          text-transform: uppercase;
          outline: none;
        }

        .li-phrase-form input:focus { border-color: var(--li-accent); box-shadow: 0 0 0 3px rgba(134, 255, 178, 0.1); }

        button {
          appearance: none;
          border: 1px solid rgba(134, 255, 178, 0.34);
          border-radius: 0;
          background: rgba(11, 28, 17, 0.92);
          color: var(--li-text);
          padding: 0.85rem 1rem;
          font: 700 0.78rem/1.2 var(--font-geist-mono), monospace;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 140ms ease, border-color 140ms ease, background 140ms ease;
          touch-action: manipulation;
        }

        button:hover { border-color: var(--li-accent); background: rgba(20, 54, 31, 0.95); }
        button:active { transform: translateY(1px) scale(0.99); }
        button:disabled { opacity: 0.35; cursor: not-allowed; }

        .li-phrase-status { margin: 0.8rem 0 0 !important; font: 600 0.74rem/1.4 var(--font-geist-mono), monospace; }

        .li-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 1.25rem; }
        .li-button-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.65rem; }
        .li-danger-button { border-color: rgba(255, 95, 103, 0.42); color: #ffd7da; background: rgba(75, 13, 19, 0.56); }
        .li-secondary-button { width: 100%; margin-top: 1rem; background: rgba(0, 0, 0, 0.24); }

        .li-switch-row {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(134, 255, 178, 0.12);
        }
        .li-switch-row span { display: grid; gap: 0.2rem; }
        .li-switch-row small { color: var(--li-muted); }
        .li-switch-row input { width: 1.35rem; height: 1.35rem; accent-color: var(--li-accent); }

        .li-receipt-panel { margin-top: 1.25rem; }
        .li-receipt-heading { display: flex; justify-content: space-between; align-items: end; gap: 1rem; }
        .li-latest { display: grid; gap: 0.25rem; text-align: right; font-family: var(--font-geist-mono), monospace; }
        .li-latest strong { color: var(--li-accent); }
        .li-latest span { color: var(--li-muted); font-size: 0.72rem; }
        .li-receipts { display: grid; gap: 0.5rem; margin-top: 1rem; max-height: 24rem; overflow: auto; }
        .li-receipt { display: grid; grid-template-columns: 7rem 1fr auto; gap: 0.85rem; align-items: center; padding: 0.75rem; border-left: 3px solid var(--li-accent); background: rgba(0, 0, 0, 0.25); font-family: var(--font-geist-mono), monospace; font-size: 0.72rem; }
        .li-receipt span { overflow-wrap: anywhere; }
        .li-receipt small { color: var(--li-muted); }
        .li-receipt-suppressed { border-left-color: var(--li-red); }
        .li-receipt-suppressed strong { color: #ffadb2; }
        .li-empty { margin: 0; }

        .li-overlay {
          position: fixed;
          inset: 0;
          z-index: 2147483000;
          overflow: hidden;
          pointer-events: none;
          contain: strict;
          color: #f7fff9;
          font-family: var(--font-geist-mono), monospace;
          text-transform: uppercase;
        }

        .li-scene { position: absolute; inset: 0; display: grid; place-items: center; }
        .li-scene strong { letter-spacing: 0.14em; }

        .li-static {
          background: rgba(2, 6, 3, 0.44);
        }
        .li-static-card {
          padding: 1rem 1.35rem;
          border: 1px solid rgba(134, 255, 178, 0.6);
          background: rgba(2, 11, 6, 0.94);
          box-shadow: 0 0 3rem rgba(80, 255, 145, 0.18);
          font-size: clamp(1.1rem, 5vw, 2.5rem);
        }

        .li-full-send { background: radial-gradient(circle, rgba(134, 255, 178, 0.18), transparent 55%); animation: liTorque 1.8s cubic-bezier(.2,.9,.2,1) both; }
        .li-full-send strong { font-size: clamp(2.8rem, 14vw, 9rem); }
        .li-torque-ring { position: absolute; width: min(75vw, 38rem); aspect-ratio: 1; border: 2px solid var(--li-accent); border-radius: 50%; animation: liRing 1.5s ease-out both; }
        .li-torque-ring::before, .li-torque-ring::after { content: ""; position: absolute; inset: 10%; border: 1px dashed rgba(134,255,178,.48); border-radius: 50%; }
        .li-torque-ring::after { inset: 24%; border-style: solid; }

        .li-rooted { background: linear-gradient(transparent, rgba(0, 25, 10, .72)); }
        .li-record-card { position: relative; width: min(78vw, 26rem); padding: 1.35rem 1.5rem; border: 1px solid rgba(134,255,178,.62); background: rgba(2,10,5,.94); box-shadow: 0 0 3rem rgba(58,255,130,.18); }
        .li-record-card span { font-size: clamp(.75rem, 3vw, 1.1rem); letter-spacing: .12em; }
        .li-rooted > strong { position: absolute; bottom: 13%; color: var(--li-accent); }
        .li-root { position: absolute; top: 100%; left: 50%; width: 2px; height: 0; background: var(--li-accent); transform-origin: top; animation: liRoot 1.3s .2s ease-out forwards; }
        .li-root-a { transform: rotate(20deg); }
        .li-root-b { transform: rotate(-24deg); }
        .li-root-c { transform: translateX(2.6rem) rotate(43deg); }
        .li-root-d { transform: translateX(-2.2rem) rotate(-48deg); }

        .li-anvil { background: radial-gradient(circle, rgba(255,255,255,.09), transparent 47%); }
        .li-anvil-base { font-size: clamp(5rem, 22vw, 10rem); transform: scaleX(1.45); }
        .li-hammer { position: absolute; font-size: clamp(4rem, 18vw, 8rem); transform: translate(-3rem,-9rem) rotate(-42deg); animation: liHammer 1.25s cubic-bezier(.6,0,.8,.35) both; }
        .li-anvil > strong { position: absolute; bottom: 20%; }
        .li-spark { position: absolute; width: .55rem; aspect-ratio: 1; background: currentColor; border-radius: 50%; opacity: 0; }
        .li-spark-a { animation: liSparkA .65s .72s ease-out; }
        .li-spark-b { animation: liSparkB .65s .72s ease-out; }
        .li-spark-c { animation: liSparkC .65s .72s ease-out; }

        .li-pow-burst { display: grid; place-items: center; width: min(72vw, 31rem); aspect-ratio: 1; border: .28rem solid currentColor; border-radius: 50%; font-size: clamp(4rem, 21vw, 11rem); font-weight: 950; animation: liImpact .9s cubic-bezier(.1,.8,.2,1) both; }

        .li-nuggies { align-items: end; justify-items: start; }
        .li-nugget-carrier { display: flex; align-items: center; gap: .7rem; padding: 0 1rem max(1.4rem, env(safe-area-inset-bottom)); transform: translateX(-14rem); animation: liCross 3.2s linear both; }
        .li-creature { font-size: clamp(1.8rem, 8vw, 3.2rem); }
        .li-nugget { font-size: clamp(1.2rem, 5vw, 2rem); transform: rotate(15deg); color: #ffd76d; }

        .li-trash-panda { background: linear-gradient(180deg, transparent 35%, rgba(4, 8, 6, .76)); }
        .li-corrupt-fragment { position: absolute; left: 12%; width: min(62vw, 24rem); padding: 1.1rem; border: 1px solid rgba(255,95,103,.55); background: rgba(45,8,12,.88); color: #ffbdc1; font-size: clamp(.72rem, 2.6vw, .95rem); animation: liFragment 2.2s ease-in-out both; }
        .li-panda-paw { position: absolute; right: -8rem; font-size: clamp(5rem, 23vw, 10rem); animation: liPaw 2.2s cubic-bezier(.4,0,.2,1) both; }
        .li-trash-panda > strong { position: absolute; bottom: 14%; color: var(--li-accent); }

        .li-checkmate { background: radial-gradient(circle, rgba(134,255,178,.12), transparent 52%); }
        .li-receipt-paper { position: relative; width: min(60vw, 15rem); min-height: 20rem; padding: 1.2rem; color: #142016; background: #ecfff1; box-shadow: 0 1.5rem 4rem rgba(0,0,0,.35); animation: liReceiptFold 2.1s ease-in-out both; }
        .li-receipt-paper::before { content: "CHECKMATE\A\A ALEX  ✓\A SAM   ✓\A MASON ✓\A\A BALANCE  $0.00"; white-space: pre; font-size: .75rem; line-height: 1.7; }
        .li-checkmark { position: absolute; font-size: clamp(5rem, 25vw, 11rem); color: var(--li-accent); opacity: 0; animation: liCheck 2.1s ease-out both; }
        .li-checkmate > strong { position: absolute; bottom: 12%; }

        .li-continuity { background: radial-gradient(circle, rgba(80,170,255,.11), transparent 54%); }
        .li-chain { display: flex; align-items: center; gap: clamp(.8rem, 4vw, 2.4rem); }
        .li-link { width: clamp(4rem, 18vw, 8rem); height: clamp(2.1rem, 9vw, 4rem); border: clamp(.32rem, 1vw, .6rem) solid #b7e0ff; border-radius: 999px; opacity: .75; }
        .li-link-left { transform: translateX(-40vw) rotate(20deg); animation: liLinkLeft 2.1s cubic-bezier(.2,.8,.2,1) both; }
        .li-link-right { transform: translateX(40vw) rotate(-20deg); animation: liLinkRight 2.1s cubic-bezier(.2,.8,.2,1) both; }
        .li-continuity > strong { position: absolute; bottom: 17%; color: #c8e8ff; }

        .li-data-god { background: radial-gradient(circle, rgba(134,255,178,.12), transparent 58%); }
        .li-data-path { display: flex; align-items: center; gap: clamp(.5rem, 3vw, 1.4rem); width: min(88vw, 46rem); }
        .li-data-node { flex: 1; min-width: 0; padding: 1rem .5rem; border: 1px solid rgba(134,255,178,.25); background: rgba(3,10,6,.9); text-align: center; opacity: .2; animation: liNode 2.3s ease-out forwards; }
        .li-data-node:nth-child(3) { animation-delay: .4s; }
        .li-data-node:nth-child(5) { animation-delay: .8s; }
        .li-data-arrow { color: var(--li-accent); opacity: .25; animation: liArrow 2.3s ease-out forwards; }
        .li-data-arrow:nth-child(2) { animation-delay: .2s; }
        .li-data-arrow:nth-child(4) { animation-delay: .6s; }
        .li-data-god > strong { position: absolute; bottom: 16%; color: var(--li-accent); }

        .li-finish-lines { background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(0,0,0,.5)); }
        .li-ribbon { width: min(92vw, 52rem); height: 4rem; background: repeating-linear-gradient(90deg, #f5f5f5 0 2.5rem, #151515 2.5rem 5rem); box-shadow: 0 1rem 3rem rgba(0,0,0,.3); animation: liRibbon 2.5s ease-in-out both; }
        .li-dependencies { position: absolute; top: 28%; display: grid; gap: .45rem; width: min(82vw, 30rem); }
        .li-dependency { height: .55rem; background: rgba(255,255,255,.12); overflow: hidden; }
        .li-dependency::after { content: ""; display: block; width: 0; height: 100%; background: var(--li-red); animation: liScan 1.4s ease-out forwards; }
        .li-dependency:nth-child(2)::after { animation-delay: .2s; width: 0; }
        .li-dependency:nth-child(3)::after { animation-delay: .4s; width: 0; }
        .li-finish-lines > strong { position: absolute; bottom: 15%; }

        @keyframes liTorque { 0%{transform:scale(1.08) translateX(-2%);opacity:0} 35%{transform:scale(.98) translateX(1%);opacity:1} 75%{transform:scale(1);opacity:1} 100%{opacity:0} }
        @keyframes liRing { 0%{transform:scale(.6) rotate(-28deg);opacity:0} 45%{opacity:.85} 76%{transform:scale(1) rotate(0);opacity:.55} 100%{transform:scale(1.03);opacity:0} }
        @keyframes liRoot { from{height:0;opacity:0} 20%{opacity:1} to{height:10rem;opacity:0} }
        @keyframes liHammer { 0%{transform:translate(-3rem,-9rem) rotate(-42deg);opacity:0} 20%{opacity:1} 62%{transform:translate(0,-2.4rem) rotate(8deg)} 69%{transform:translate(0,-1rem) rotate(12deg)} 100%{transform:translate(1rem,-3rem) rotate(18deg);opacity:0} }
        @keyframes liSparkA { 0%{transform:translate(0,0);opacity:1} 100%{transform:translate(-6rem,-5rem);opacity:0} }
        @keyframes liSparkB { 0%{transform:translate(0,0);opacity:1} 100%{transform:translate(6rem,-5rem);opacity:0} }
        @keyframes liSparkC { 0%{transform:translate(0,0);opacity:1} 100%{transform:translate(1rem,-7rem);opacity:0} }
        @keyframes liImpact { 0%{transform:scale(.18);opacity:0} 35%{transform:scale(1);opacity:1} 100%{transform:scale(1.5);opacity:0} }
        @keyframes liCross { from{transform:translateX(-14rem)} to{transform:translateX(calc(100vw + 14rem))} }
        @keyframes liFragment { 0%,30%{transform:translateX(0);opacity:1} 70%,100%{transform:translateX(-120vw) rotate(-8deg);opacity:0} }
        @keyframes liPaw { 0%,20%{transform:translateX(0) rotate(-12deg);opacity:0} 35%{opacity:1} 60%{transform:translateX(-58vw) rotate(-4deg);opacity:1} 100%{transform:translateX(-120vw) rotate(18deg);opacity:0} }
        @keyframes liReceiptFold { 0%,35%{transform:scale(1) rotate(0);opacity:1} 68%{transform:scale(.45,.18) rotate(4deg);opacity:1} 100%{transform:scale(.1);opacity:0} }
        @keyframes liCheck { 0%,58%{transform:scale(.2) rotate(-15deg);opacity:0} 75%{transform:scale(1.15) rotate(2deg);opacity:1} 100%{transform:scale(1);opacity:0} }
        @keyframes liLinkLeft { 0%{transform:translateX(-40vw) rotate(20deg);opacity:0} 55%,80%{transform:translateX(1rem) rotate(12deg);opacity:1} 100%{opacity:0} }
        @keyframes liLinkRight { 0%{transform:translateX(40vw) rotate(-20deg);opacity:0} 55%,80%{transform:translateX(-1rem) rotate(-12deg);opacity:1} 100%{opacity:0} }
        @keyframes liNode { 0%{opacity:.2;box-shadow:none} 40%,80%{opacity:1;border-color:var(--li-accent);box-shadow:0 0 2rem rgba(134,255,178,.22)} 100%{opacity:0} }
        @keyframes liArrow { 0%{opacity:.2} 35%,80%{opacity:1;text-shadow:0 0 1rem var(--li-accent)} 100%{opacity:0} }
        @keyframes liRibbon { 0%,30%{transform:scaleX(1);opacity:1} 55%{transform:scaleX(1.04)} 80%,100%{transform:scaleX(.04) translateY(-12rem);opacity:0} }
        @keyframes liScan { 0%{width:0} 60%,100%{width:78%} }

        @media (max-width: 760px) {
          .li-page { padding-inline: .75rem; }
          .li-hero { align-items: start; flex-direction: column; padding-top: 2.2rem; }
          .li-status-stack { grid-template-columns: repeat(3, 1fr); width: 100%; }
          .li-chip { padding: .55rem .35rem; font-size: .58rem; }
          .li-grid { grid-template-columns: 1fr; }
          .li-button-grid { grid-template-columns: 1fr; }
          .li-phrase-form { grid-template-columns: 1fr; }
          .li-receipt-heading { align-items: start; flex-direction: column; }
          .li-latest { text-align: left; }
          .li-receipt { grid-template-columns: 1fr; gap: .3rem; }
          .li-data-path { flex-direction: column; width: min(76vw, 19rem); }
          .li-data-node { width: 100%; }
          .li-data-arrow { transform: rotate(90deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .li-page button { transition: none; }
        }
      `}</style>
    </main>
  );
}

function SceneOverlay({ active }: { active: ActiveScene }) {
  if (active.reducedMotion) {
    return (
      <div className="li-overlay" aria-hidden="true">
        <div className="li-scene li-static">
          <div className="li-static-card">{active.config.label}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="li-overlay" aria-hidden="true">
      <Scene kind={active.config.kind} />
    </div>
  );
}

function Scene({ kind }: { kind: SceneKind }) {
  switch (kind) {
    case "full-send":
      return (
        <div className="li-scene li-full-send">
          <div className="li-torque-ring" />
          <strong>FULL SEND</strong>
        </div>
      );
    case "rooted":
      return (
        <div className="li-scene li-rooted">
          <div className="li-record-card">
            <span>PROVENANCE VERIFIED</span>
            <i className="li-root li-root-a" />
            <i className="li-root li-root-b" />
            <i className="li-root li-root-c" />
            <i className="li-root li-root-d" />
          </div>
          <strong>ROOTED.</strong>
        </div>
      );
    case "anvil":
      return (
        <div className="li-scene li-anvil">
          <div className="li-hammer">▰</div>
          <div className="li-anvil-base">⬢</div>
          <i className="li-spark li-spark-a" />
          <i className="li-spark li-spark-b" />
          <i className="li-spark li-spark-c" />
          <strong>CLANG.</strong>
        </div>
      );
    case "pow":
      return (
        <div className="li-scene">
          <div className="li-pow-burst">POW</div>
        </div>
      );
    case "nuggies":
      return (
        <div className="li-scene li-nuggies">
          <div className="li-nugget-carrier">
            <span className="li-creature">◉ᴥ◉</span>
            <span className="li-nugget">◆</span>
          </div>
        </div>
      );
    case "trash-panda":
      return (
        <div className="li-scene li-trash-panda">
          <div className="li-corrupt-fragment">OCR_?? 8QZ / SOURCE FRAGMENT CORRUPTED</div>
          <div className="li-panda-paw">🦝</div>
          <strong>FOUND ONE.</strong>
        </div>
      );
    case "checkmate":
      return (
        <div className="li-scene li-checkmate">
          <div className="li-receipt-paper" />
          <div className="li-checkmark">✓</div>
          <strong>EVERYBODY ESCAPED.</strong>
        </div>
      );
    case "continuity":
      return (
        <div className="li-scene li-continuity">
          <div className="li-chain">
            <i className="li-link li-link-left" />
            <i className="li-link li-link-right" />
          </div>
          <strong>CHAIN HOLDS.</strong>
        </div>
      );
    case "data-is-god":
      return (
        <div className="li-scene li-data-god">
          <div className="li-data-path">
            <div className="li-data-node">SOURCE</div>
            <span className="li-data-arrow">→</span>
            <div className="li-data-node">EVIDENCE</div>
            <span className="li-data-arrow">→</span>
            <div className="li-data-node">DECISION</div>
          </div>
          <strong>DATA IS GOD.</strong>
        </div>
      );
    case "finish-lines":
      return (
        <div className="li-scene li-finish-lines">
          <div className="li-dependencies">
            <i className="li-dependency" />
            <i className="li-dependency" />
            <i className="li-dependency" />
          </div>
          <div className="li-ribbon" />
          <strong>DEPENDENCIES STILL OPEN.</strong>
        </div>
      );
  }
}
