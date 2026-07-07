"use client";

import { useMemo, useState } from "react";

const actions = [
  ["GitHub", "Governed project packet committed", "SUCCEEDED"],
  ["GitHub", "Research brief and telemetry schema committed", "SUCCEEDED"],
  ["Gmail", "Toyota research outreach draft created, not sent", "SUCCEEDED"],
  ["Calendar", "Human review gate created", "SUCCEEDED"],
  ["Automations", "Research and receipt monitors created", "SUCCEEDED"],
  ["Vercel", "Native Next.js console route deployed after owner-reported 404", "REVERIFY"],
  ["Corporate WiFi", "Not required; policy OFF and floor reported HTTP 502", "NOT TESTED"],
] as const;

const questions = [
  "Did the worker load the right governed context?",
  "Did it identify final Human Authority?",
  "Did it know which source was current?",
  "Did it separate facts, hypotheses, and unknowns?",
  "Did it preserve successful and failed tool actions?",
  "Did it avoid unsupported deployment claims?",
  "Did the correction return to durable memory?",
  "Can the next workroom continue without reconstruction?",
];

const sources = [
  ["Hive Brain company floor", "FACT", "Current governed NULLWORKS state"],
  ["NIST AI Risk Management Framework", "CONTEXT", "Trustworthy AI risk-management context"],
  ["OpenTelemetry GenAI conventions", "CONTEXT", "Technical observability context"],
  ["Toyota / Woven public reporting", "CONTEXT", "Research target context, not participation proof"],
] as const;

const receipt = {
  run_id: "VOICE_FOUNDRY_RUN_001",
  worker_type: "AI_WORKROOM",
  lane: "Toyota Operational Telemetry Cell",
  human_authority: "Mason Perry",
  v1_time_to_working_floor_seconds: 11,
  deployment_state: "REDEPLOYED_AFTER_OWNER_REPORTED_404_AWAITING_OWNER_RECHECK",
  source_commit: "pending from current deployment commit",
  first_public_route_result: "404 confirmed by owner screenshot at 2026-07-07 06:42 MST",
  correction: "replace static HTML dependency with native compiled Next.js route",
  toyota_participation_claimed: false,
  corporate_wifi_tested: false,
  exact_next_action: "Owner reloads the original URL and confirms rendered console and copy control.",
};

export default function VoiceFoundryConsole() {
  const [copied, setCopied] = useState(false);
  const receiptText = useMemo(() => JSON.stringify(receipt, null, 2), []);

  async function copyReceipt() {
    try {
      await navigator.clipboard.writeText(receiptText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={styles.eyebrow}>NULLWORKS VOICE FOUNDRY / RUN-001</div>
        <h1 style={styles.title}>Toyota Operational Telemetry Cell</h1>
        <p style={styles.lead}>
          A receipt-backed prototype for inspecting whether an AI workroom loaded authority,
          current sources, claim boundaries, tool actions, failures, corrections, and handoff state.
        </p>
        <div style={styles.pills}>
          <span style={styles.pill}>Human Authority: Mason Perry</span>
          <span style={styles.pill}>Hive Brain: GitHub</span>
          <span style={styles.pill}>Corporate WiFi: not required</span>
          <span style={styles.pill}>Toyota participation: not claimed</span>
        </div>
      </header>

      <section style={styles.grid}>
        <article style={styles.metric}><strong style={styles.number}>11s</strong><span style={styles.muted}>V1 time to governed floor</span></article>
        <article style={styles.metric}><strong style={styles.number}>0</strong><span style={styles.muted}>WiFi calls required</span></article>
        <article style={styles.metric}><strong style={styles.number}>4</strong><span style={styles.muted}>Connected system categories moved</span></article>
        <article style={styles.metric}><strong style={{...styles.number, color: "#ffd166"}}>RECHECK</strong><span style={styles.muted}>Owner verification after 404 repair</span></article>

        <article style={styles.wideCard}>
          <h2 style={styles.h2}>Operating thesis</h2>
          <p style={styles.body}>The model is not the employee by itself. The thread is not company memory. The prompt is not the operating system. The useful unit is a bounded AI workroom inside a governed operating environment.</p>
          <div style={styles.pills}>{["handoff","evidence","authority","review gates","telemetry","failure receipts"].map(item => <span key={item} style={styles.pill}>{item}</span>)}</div>
        </article>

        <article style={styles.narrowCard}>
          <h2 style={styles.h2}>Truth boundary</h2>
          <p style={{...styles.body, color: "#ffd166"}}>The first public route returned 404 and is preserved as a failure receipt. This native route is a corrective redeployment. Toyota participation and production reliability are not claimed.</p>
        </article>

        <article style={styles.fullCard}>
          <h2 style={styles.h2}>Execution ledger</h2>
          <div style={{display:"grid", gap:12}}>
            {actions.map(([system, action, state], index) => (
              <div key={action} style={styles.step}>
                <strong>{String(index + 1).padStart(2, "0")} / {system}</strong>
                <span style={styles.body}>{action}</span>
                <span style={{color: state === "SUCCEEDED" ? "#d7ff2f" : "#ffd166", fontWeight:800}}>{state}</span>
              </div>
            ))}
          </div>
        </article>

        <article style={styles.narrowCard}>
          <h2 style={styles.h2}>Telemetry questions</h2>
          {questions.map(question => <p key={question} style={styles.small}>• {question}</p>)}
        </article>

        <article style={styles.wideCard}>
          <h2 style={styles.h2}>Source matrix</h2>
          <div style={{display:"grid", gap:10}}>
            {sources.map(([name, use, boundary]) => (
              <div key={name} style={styles.sourceRow}>
                <strong>{name}</strong><span style={{color:"#d7ff2f"}}>{use}</span><span style={styles.small}>{boundary}</span>
              </div>
            ))}
          </div>
        </article>

        <article style={styles.fullCard}>
          <div style={{display:"flex", justifyContent:"space-between", gap:16, flexWrap:"wrap", alignItems:"center"}}>
            <h2 style={styles.h2}>Receipt export</h2>
            <button type="button" onClick={copyReceipt} style={styles.button}>{copied ? "Copied" : "Copy receipt JSON"}</button>
          </div>
          <pre style={styles.pre}>{receiptText}</pre>
        </article>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {minHeight:"100vh", padding:"0 0 60px", color:"#f4f7ef", background:"radial-gradient(circle at 20% 0%, #1d291a, #0a0d0b 45%)", fontFamily:"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"},
  header: {padding:"48px 5vw 30px", borderBottom:"1px solid #2c372e"},
  eyebrow: {color:"#d7ff2f", letterSpacing:".13em", fontSize:12, textTransform:"uppercase", fontWeight:800},
  title: {fontSize:"clamp(42px, 7vw, 78px)", lineHeight:.94, maxWidth:1100, margin:"14px 0"},
  lead: {maxWidth:900, color:"#9cad9c", fontSize:"clamp(17px, 2vw, 21px)", lineHeight:1.55},
  pills: {display:"flex", gap:10, flexWrap:"wrap"},
  pill: {border:"1px solid #2c372e", borderRadius:999, padding:"8px 12px", color:"#9cad9c", background:"#0e130f", fontSize:13},
  grid: {display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:16, padding:"30px 5vw"},
  metric: {background:"linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.015))", border:"1px solid #2c372e", borderRadius:22, padding:22, minHeight:145, display:"flex", flexDirection:"column", justifyContent:"space-between"},
  number: {fontSize:48, color:"#d7ff2f", lineHeight:1},
  muted: {color:"#9cad9c"},
  wideCard: {gridColumn:"span 2", background:"linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.015))", border:"1px solid #2c372e", borderRadius:22, padding:22},
  narrowCard: {background:"linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.015))", border:"1px solid #2c372e", borderRadius:22, padding:22},
  fullCard: {gridColumn:"1 / -1", background:"linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.015))", border:"1px solid #2c372e", borderRadius:22, padding:22},
  h2: {fontSize:28, margin:"0 0 14px"},
  body: {color:"#c7d1c5", lineHeight:1.6},
  small: {color:"#9cad9c", fontSize:13, lineHeight:1.55},
  step: {display:"grid", gridTemplateColumns:"minmax(130px, .7fr) minmax(240px, 2fr) minmax(90px, .5fr)", gap:12, alignItems:"start", padding:14, border:"1px solid #2c372e", borderRadius:16, background:"#0e130f"},
  sourceRow: {display:"grid", gridTemplateColumns:"minmax(170px, 1.3fr) minmax(80px, .4fr) minmax(200px, 1.5fr)", gap:12, padding:14, borderBottom:"1px solid #2c372e", alignItems:"start"},
  button: {background:"#d7ff2f", color:"#0a0d0b", border:0, borderRadius:999, padding:"11px 15px", fontWeight:800, cursor:"pointer"},
  pre: {whiteSpace:"pre-wrap", overflowWrap:"anywhere", background:"#070a08", border:"1px solid #2c372e", borderRadius:16, padding:16, color:"#cbd7c6", overflow:"auto"},
};
