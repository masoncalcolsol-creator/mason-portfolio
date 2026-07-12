"use client";

import { FormEvent, useMemo, useState } from "react";

type IntakeState = {
  name: string;
  company: string;
  role: string;
  email: string;
  employeeCount: string;
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
  employeeCount: "",
  workflow: "",
  intendedOutcome: "",
  aiTools: "",
  failure: "",
  priorAttempts: "",
  consequenceOwner: "",
};

const organizationSizes = [
  "1–10 people",
  "11–50 people",
  "51–250 people",
  "251–1,000 people",
  "1,001–10,000 people",
  "10,000+ people",
  "Unknown / difficult to estimate",
];

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
      `Approximate organization size: ${form.employeeCount || "UNKNOWN"}`,
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
    <main className="intakePage">
      <style>{`
        :root { color-scheme: light; }
        * { box-sizing: border-box; }
        body { margin: 0; background: #f3eee2; }
        .intakePage {
          min-height: 100vh;
          color: #15211d;
          background:
            radial-gradient(circle at 8% 0%, rgba(46,104,112,.15), transparent 32rem),
            radial-gradient(circle at 92% 7%, rgba(189,139,53,.18), transparent 30rem),
            linear-gradient(rgba(42,57,52,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,57,52,.035) 1px, transparent 1px),
            #f3eee2;
          background-size: auto, auto, 48px 48px, 48px 48px, auto;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          padding: 18px 0 78px;
        }
        .shell { width: min(980px, calc(100% - 28px)); margin: 0 auto; }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 13px 15px;
          border: 1px solid rgba(143,104,32,.3);
          border-radius: 24px;
          background: rgba(255,251,242,.9);
          box-shadow: 0 20px 70px rgba(49,41,27,.1);
          backdrop-filter: blur(18px);
        }
        .brand { display: flex; align-items: center; gap: 12px; }
        .mark { display: grid; width: 44px; height: 44px; place-items: center; border: 1px solid #bd8b35; border-radius: 50%; background: #0b1822; color: #efd69a; font-family: Georgia, "Times New Roman", serif; font-weight: 900; letter-spacing: -.08em; }
        .brandTop, .eyebrow { color: #80601f; font-size: 10px; font-weight: 950; letter-spacing: .22em; text-transform: uppercase; }
        .brandName { margin-top: 2px; font-family: Georgia, "Times New Roman", serif; font-size: 17px; font-weight: 800; }
        .back { display: inline-flex; min-height: 40px; align-items: center; justify-content: center; padding: 9px 13px; border: 1px solid rgba(143,104,32,.36); border-radius: 999px; background: #fffaf0; color: #73531c; text-decoration: none; font-size: 12px; font-weight: 900; }
        .intro { display: grid; grid-template-columns: 1.05fr .95fr; gap: 16px; margin-top: 16px; }
        .introCopy, .boundary {
          border: 1px solid rgba(143,104,32,.3);
          border-radius: 32px;
          box-shadow: 0 28px 90px rgba(49,41,27,.11);
        }
        .introCopy { padding: clamp(28px,5vw,52px); background: rgba(255,251,242,.95); }
        .eyebrow { display: inline-flex; padding: 8px 11px; border: 1px solid rgba(184,138,52,.34); border-radius: 999px; background: #eee1c7; }
        h1 { margin: 22px 0 18px; font-family: Georgia, "Times New Roman", serif; font-size: clamp(46px,7vw,78px); line-height: .94; letter-spacing: -.055em; }
        .lead { margin: 0; color: #5c5345; font-size: 17px; line-height: 1.72; }
        .boundary { display: flex; padding: clamp(26px,4vw,40px); justify-content: center; flex-direction: column; background: linear-gradient(155deg,#0b1822,#1d332d); color: #fffaf0; }
        .boundary strong { color: #efd69a; font-family: Georgia, "Times New Roman", serif; font-size: clamp(31px,4vw,48px); line-height: 1.04; }
        .boundary p { margin: 18px 0 0; color: rgba(255,250,240,.7); line-height: 1.7; }
        form { display: grid; gap: 14px; margin-top: 16px; padding: clamp(24px,4vw,42px); border: 1px solid rgba(143,104,32,.3); border-radius: 32px; background: rgba(255,251,242,.95); box-shadow: 0 28px 90px rgba(49,41,27,.11); }
        .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        label { display: grid; gap: 8px; color: #39372f; font-size: 13px; font-weight: 900; }
        input, textarea, select {
          width: 100%;
          border: 1px solid rgba(103,85,52,.34);
          border-radius: 17px;
          background: #fffaf0;
          color: #15211d;
          padding: 15px 16px;
          font: inherit;
          outline: none;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.8);
        }
        input:focus, textarea:focus, select:focus { border-color: #2e6870; box-shadow: 0 0 0 3px rgba(46,104,112,.12); }
        textarea { min-height: 126px; resize: vertical; line-height: 1.55; }
        select { appearance: none; background-image: linear-gradient(45deg,transparent 50%,#80601f 50%),linear-gradient(135deg,#80601f 50%,transparent 50%); background-position: calc(100% - 20px) 50%,calc(100% - 14px) 50%; background-size: 6px 6px,6px 6px; background-repeat: no-repeat; }
        .hint { color: #817766; font-size: 12px; font-weight: 500; line-height: 1.48; }
        .scaleNote { padding: 14px 16px; border-left: 3px solid #2e6870; border-radius: 14px; background: #edf2ec; color: #56635e; font-size: 12px; line-height: 1.55; }
        .actions { display: flex; flex-wrap: wrap; gap: 11px; margin-top: 8px; }
        button { border: 0; border-radius: 999px; min-height: 48px; padding: 13px 19px; font: inherit; font-weight: 950; cursor: pointer; }
        .primary { background: #0b1822; color: #fffaf0; box-shadow: 0 16px 38px rgba(10,21,32,.18); }
        .secondary { background: #fffaf0; color: #73531c; border: 1px solid rgba(143,104,32,.42); }
        .note { margin-top: 8px; color: #817766; font-size: 12px; line-height: 1.58; }
        @media (max-width: 760px) {
          .intro, .pair { grid-template-columns: 1fr; }
          .header { align-items: flex-start; }
          .brandName { font-size: 15px; }
          .back { font-size: 11px; }
        }
        @media (max-width: 520px) {
          .introCopy, .boundary, form { border-radius: 25px; }
          .actions button { width: 100%; }
          .header { padding: 11px 12px; }
          .mark { width: 40px; height: 40px; }
        }
      `}</style>

      <div className="shell">
        <header className="header">
          <div className="brand">
            <div className="mark">NW</div>
            <div>
              <div className="brandTop">NULLWORKS</div>
              <div className="brandName">One-Workflow Intake</div>
            </div>
          </div>
          <a className="back" href="/ai-audit">← Back to the audit</a>
        </header>

        <section className="intro">
          <article className="introCopy">
            <div className="eyebrow">Operating-model triage</div>
            <h1>Show us one real workflow.</h1>
            <p className="lead">The goal is not to sell you more technology. It is to identify the intended outcome, what actually happens, where AI and software touch the work, what has already failed, and the smallest next test worth running.</p>
          </article>
          <aside className="boundary">
            <strong>Triage first. Claims later.</strong>
            <p>This prepares a provisional request. It is not a technical security audit, legal review, code review, or enterprise-wide finding. Human review is required before any consequential recommendation.</p>
          </aside>
        </section>

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
            Approximate number of employees
            <select required value={form.employeeCount} onChange={(event) => updateField("employeeCount", event.target.value)}>
              <option value="" disabled>Select the closest range</option>
              {organizationSizes.map((size) => <option value={size} key={size}>{size}</option>)}
            </select>
            <span className="hint">This is a scale signal, not a budget question. A ten-person shop and a national logistics network require very different evidence and intervention boundaries.</span>
          </label>

          <div className="scaleNote">Organization size is only the first scale clue. During review we also look at workflow volume, number of operators touched, frequency of exceptions, and the consequence of one failure.</div>

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
          <div className="note">The primary button opens your email application with the request prefilled. Nothing is submitted automatically.</div>
        </form>
      </div>
    </main>
  );
}
