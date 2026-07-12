"use client";

import { FormEvent, useMemo, useState } from "react";

type IntakeState = {
  name: string;
  company: string;
  role: string;
  email: string;
  workflow: string;
  intendedOutcome: string;
  aiTools: string;
  failure: string;
  priorAttempts: string;
  consequenceOwner: string;
};

const initialState: IntakeState = {
  name: "",
  company: "",
  role: "",
  email: "",
  workflow: "",
  intendedOutcome: "",
  aiTools: "",
  failure: "",
  priorAttempts: "",
  consequenceOwner: "",
};

export default function TriageIntake() {
  const [form, setForm] = useState<IntakeState>(initialState);
  const [copied, setCopied] = useState(false);

  const summary = useMemo(
    () => [
      "NULLWORKS AI OPERATING MODEL TRIAGE",
      "",
      `Name: ${form.name || "UNKNOWN"}`,
      `Company: ${form.company || "UNKNOWN"}`,
      `Role: ${form.role || "UNKNOWN"}`,
      `Email: ${form.email || "UNKNOWN"}`,
      "",
      "ONE REAL WORKFLOW",
      form.workflow || "UNKNOWN",
      "",
      "INTENDED OUTCOME",
      form.intendedOutcome || "UNKNOWN",
      "",
      "CURRENT AI / SOFTWARE TOUCHPOINTS",
      form.aiTools || "UNKNOWN",
      "",
      "RECENT FAILURE OR EXCEPTION",
      form.failure || "UNKNOWN",
      "",
      "WHAT HAS ALREADY BEEN TRIED",
      form.priorAttempts || "UNKNOWN",
      "",
      "NAMED OWNER OF THE CONSEQUENCE",
      form.consequenceOwner || "UNKNOWN",
    ].join("\n"),
    [form],
  );

  function updateField(field: keyof IntakeState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setCopied(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(
      `AI Operating Model Triage — ${form.company || form.name || "New request"}`,
    );
    const body = encodeURIComponent(summary);
    window.location.href = `mailto:masoncalcolsol@gmail.com?subject=${subject}&body=${body}`;
  }

  async function copySummary() {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
  }

  return (
    <main className="intake-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        body { margin: 0; background: #070909; }
        .intake-page {
          min-height: 100vh;
          color: #f4f3ec;
          background:
            radial-gradient(circle at 7% 0%, rgba(255,90,42,.17), transparent 30rem),
            radial-gradient(circle at 92% 8%, rgba(215,255,47,.09), transparent 28rem),
            #070909;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          padding: 52px 0 80px;
        }
        .shell { width: min(980px, calc(100% - 32px)); margin: 0 auto; }
        .back { display: inline-flex; color: #d7ff2f; text-decoration: none; font-weight: 850; margin-bottom: 30px; }
        .eyebrow { color: #ff5a2a; font-size: 12px; font-weight: 950; letter-spacing: .17em; text-transform: uppercase; }
        h1 { margin: 12px 0 20px; max-width: 850px; font-size: clamp(48px, 8vw, 92px); line-height: .9; letter-spacing: -.065em; }
        .lead { max-width: 790px; color: #b7bcb5; font-size: 19px; line-height: 1.7; }
        .boundary { margin: 28px 0 34px; padding: 20px; border: 1px solid #343b36; border-radius: 20px; color: #949b94; line-height: 1.6; background: #0b0f0e; }
        form { display: grid; gap: 14px; }
        .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        label { display: grid; gap: 8px; color: #d9ddd5; font-size: 14px; font-weight: 850; }
        input, textarea {
          width: 100%;
          border: 1px solid #343b36;
          border-radius: 17px;
          background: #0b0f0e;
          color: #f4f3ec;
          padding: 15px 16px;
          font: inherit;
          outline: none;
        }
        input:focus, textarea:focus { border-color: rgba(255,90,42,.75); box-shadow: 0 0 0 3px rgba(255,90,42,.10); }
        textarea { min-height: 125px; resize: vertical; line-height: 1.55; }
        .hint { color: #7f867f; font-size: 12px; font-weight: 500; line-height: 1.45; }
        .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 12px; }
        button { border: 0; border-radius: 999px; min-height: 48px; padding: 13px 19px; font: inherit; font-weight: 950; cursor: pointer; }
        .primary { background: #ff5a2a; color: #160b08; }
        .secondary { background: transparent; color: #d7ff2f; border: 1px solid #56643f; }
        .note { margin-top: 18px; color: #7f867f; font-size: 13px; line-height: 1.6; }
        @media (max-width: 680px) {
          .intake-page { padding-top: 34px; }
          .pair { grid-template-columns: 1fr; }
          button { width: 100%; }
        }
      `}</style>

      <div className="shell">
        <a className="back" href="/ai-audit">← Back to the audit</a>
        <div className="eyebrow">NULLWORKS // ONE-WORKFLOW INTAKE</div>
        <h1>Show us one real workflow.</h1>
        <p className="lead">
          The goal is not to sell you more technology. It is to identify the intended outcome, what actually happens, where AI and software touch the work, what has already failed, and the smallest next test worth running.
        </p>
        <div className="boundary">
          This prepares a provisional triage request. It is not a technical security audit, legal review, code review, or enterprise-wide finding. Human review is required before any consequential recommendation.
        </div>

        <form onSubmit={submit}>
          <div className="pair">
            <label>
              Your name
              <input required value={form.name} onChange={(event) => updateField("name", event.target.value)} />
            </label>
            <label>
              Company
              <input required value={form.company} onChange={(event) => updateField("company", event.target.value)} />
            </label>
          </div>

          <div className="pair">
            <label>
              Your role
              <input required value={form.role} onChange={(event) => updateField("role", event.target.value)} />
            </label>
            <label>
              Email
              <input required type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
            </label>
          </div>

          <label>
            One real workflow
            <textarea required value={form.workflow} onChange={(event) => updateField("workflow", event.target.value)} />
            <span className="hint">Describe what starts the work, who touches it, and where it is supposed to end.</span>
          </label>

          <label>
            Intended outcome
            <textarea required value={form.intendedOutcome} onChange={(event) => updateField("intendedOutcome", event.target.value)} />
            <span className="hint">Why does this workflow exist, and who depends on the result?</span>
          </label>

          <label>
            Current AI and software touchpoints
            <textarea value={form.aiTools} onChange={(event) => updateField("aiTools", event.target.value)} />
            <span className="hint">List tools, copilots, agents, inboxes, spreadsheets, handoffs, or manual patches.</span>
          </label>

          <label>
            One recent failure or exception
            <textarea required value={form.failure} onChange={(event) => updateField("failure", event.target.value)} />
            <span className="hint">What went wrong, what did the operator do next, and what consequence followed?</span>
          </label>

          <label>
            What has already been tried?
            <textarea value={form.priorAttempts} onChange={(event) => updateField("priorAttempts", event.target.value)} />
            <span className="hint">Preserve the decision history so a failed solution is not recommended again.</span>
          </label>

          <label>
            Who owns the consequence?
            <input required value={form.consequenceOwner} onChange={(event) => updateField("consequenceOwner", event.target.value)} />
            <span className="hint">Name the role or person accountable when the workflow succeeds or fails.</span>
          </label>

          <div className="actions">
            <button className="primary" type="submit">Open triage request email</button>
            <button className="secondary" type="button" onClick={copySummary}>{copied ? "Copied" : "Copy request summary"}</button>
          </div>
          <div className="note">
            The primary button opens your email application with the request prefilled. Nothing is submitted automatically.
          </div>
        </form>
      </div>
    </main>
  );
}
