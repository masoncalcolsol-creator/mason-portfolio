"use client";

import { useMemo, useState } from "react";

const initial = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  currentRole: "",
  targetRole: "",
  targetCompany: "",
  compensation: "",
  whyNow: "",
  proof: "",
  hiddenCapability: "",
  opportunity: "",
  budget: "Founding Pilot - $500",
  consent: "No public case study without separate approval",
};

export default function AirliftApplyPage() {
  const [form, setForm] = useState(initial);
  const [copied, setCopied] = useState(false);

  const brief = useMemo(() => {
    return `NULLWORKS AIRLIFT - FOUNDING PILOT REQUEST\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nLinkedIn / portfolio: ${form.linkedin}\nCurrent role: ${form.currentRole}\nTarget role: ${form.targetRole}\nTarget company: ${form.targetCompany}\nTarget compensation or level: ${form.compensation}\nWhy now: ${form.whyNow}\nStrongest proof: ${form.proof}\nCapability hidden by current title or industry: ${form.hiddenCapability}\nWhy this opportunity matters: ${form.opportunity}\nBudget selected: ${form.budget}\nCase-study preference: ${form.consent}\n\nI understand that AIRLIFT does not guarantee review, interview, offer, compensation, or placement. I will review and approve all public claims before deployment.`;
  }, [form]);

  function update(field: keyof typeof initial, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function openEmail() {
    const subject = encodeURIComponent(`AIRLIFT Founding Pilot - ${form.name || "Candidate"}`);
    const body = encodeURIComponent(brief);
    window.location.href = `mailto:masoncalcolsol@gmail.com?subject=${subject}&body=${body}`;
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 14,
    border: "1px solid #354038",
    background: "#0b100d",
    color: "#f5f6f0",
    padding: "13px 14px",
    fontSize: 16,
    outline: "none",
  };

  return (
    <main className="page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        body { margin: 0; background: #080a09; }
        .page { min-height: 100vh; color: #f5f6f0; background: radial-gradient(circle at 10% 0%, rgba(215,255,47,.13), transparent 31rem), #080a09; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        .shell { width: min(980px, calc(100% - 28px)); margin: 0 auto; padding: 54px 0 80px; }
        .eyebrow { color: #d7ff2f; font-size: 12px; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; }
        h1 { margin: 14px 0 18px; font-size: clamp(43px, 7vw, 78px); line-height: .92; letter-spacing: -.055em; }
        .lead { color: #b5bfb3; font-size: 19px; line-height: 1.65; max-width: 820px; }
        .notice { margin-top: 24px; border-left: 4px solid #d7ff2f; background: rgba(215,255,47,.055); padding: 18px 20px; color: #c8d0c5; line-height: 1.6; }
        .form { margin-top: 34px; display: grid; gap: 18px; }
        .two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field { display: grid; gap: 8px; }
        label { font-weight: 800; color: #d7decf; }
        .hint { color: #849184; font-size: 13px; line-height: 1.45; }
        textarea { min-height: 128px; resize: vertical; }
        select { appearance: none; }
        .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 10px; }
        button, .back { border-radius: 999px; padding: 12px 16px; font-weight: 900; font-size: 15px; cursor: pointer; text-decoration: none; }
        button.primary { border: 0; background: #d7ff2f; color: #080a09; }
        button.secondary, .back { border: 1px solid #526041; background: transparent; color: #d7ff2f; }
        .preview { margin-top: 34px; border: 1px solid #303a32; border-radius: 22px; padding: 22px; background: #0b100d; }
        .preview h2 { margin: 0 0 14px; font-size: 25px; }
        pre { white-space: pre-wrap; overflow-wrap: anywhere; color: #aeb8ad; line-height: 1.55; margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; }
        .truth { margin-top: 24px; padding: 18px; border: 1px solid #3b443d; border-radius: 18px; color: #8f9b8e; line-height: 1.55; }
        @media (max-width: 700px) { .two { grid-template-columns: 1fr; } .shell { padding-top: 42px; } }
      `}</style>

      <div className="shell">
        <div className="eyebrow">NULLWORKS AIRLIFT // FOUNDING PILOT</div>
        <h1>Request one of three design-partner seats.</h1>
        <p className="lead">
          This intake is intentionally selective. AIRLIFT is built for candidates pursuing a high-value opportunity where the real capability is difficult to express through a conventional résumé alone.
        </p>
        <div className="notice">
          Founding Pilot price: <strong>$500 total</strong> - $250 to begin and $250 on delivery. Target delivery is five business days after complete intake and source materials are received.
        </div>

        <div className="form">
          <div className="two">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" style={inputStyle} value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" style={inputStyle} value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>
          </div>

          <div className="two">
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" style={inputStyle} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="linkedin">LinkedIn or portfolio URL</label>
              <input id="linkedin" style={inputStyle} value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} />
            </div>
          </div>

          <div className="two">
            <div className="field">
              <label htmlFor="currentRole">Current role</label>
              <input id="currentRole" style={inputStyle} value={form.currentRole} onChange={(e) => update("currentRole", e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="targetRole">Target role</label>
              <input id="targetRole" style={inputStyle} value={form.targetRole} onChange={(e) => update("targetRole", e.target.value)} />
            </div>
          </div>

          <div className="two">
            <div className="field">
              <label htmlFor="targetCompany">Target company</label>
              <input id="targetCompany" style={inputStyle} value={form.targetCompany} onChange={(e) => update("targetCompany", e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="compensation">Target level or compensation</label>
              <input id="compensation" style={inputStyle} value={form.compensation} onChange={(e) => update("compensation", e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="whyNow">Why are you making this move now?</label>
            <textarea id="whyNow" style={inputStyle} value={form.whyNow} onChange={(e) => update("whyNow", e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="proof">What is the strongest proof that you can do work above or outside your current title?</label>
            <textarea id="proof" style={inputStyle} value={form.proof} onChange={(e) => update("proof", e.target.value)} />
            <div className="hint">Examples: systems rescued, revenue protected, teams led, products shipped, transformations completed, technical depth, or responsibility carried without formal recognition.</div>
          </div>

          <div className="field">
            <label htmlFor="hiddenCapability">What capability is hidden by your current title, industry, or résumé?</label>
            <textarea id="hiddenCapability" style={inputStyle} value={form.hiddenCapability} onChange={(e) => update("hiddenCapability", e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="opportunity">Why does this specific opportunity matter?</label>
            <textarea id="opportunity" style={inputStyle} value={form.opportunity} onChange={(e) => update("opportunity", e.target.value)} />
          </div>

          <div className="two">
            <div className="field">
              <label htmlFor="budget">Program</label>
              <select id="budget" style={inputStyle} value={form.budget} onChange={(e) => update("budget", e.target.value)}>
                <option>Founding Pilot - $500</option>
                <option>Future Executive Airlift - notify me</option>
                <option>Not sure - discuss fit first</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="consent">Case-study preference</label>
              <select id="consent" style={inputStyle} value={form.consent} onChange={(e) => update("consent", e.target.value)}>
                <option>No public case study without separate approval</option>
                <option>Open to anonymized case-study use</option>
                <option>Open to named case-study use after review</option>
              </select>
            </div>
          </div>

          <div className="actions">
            <button className="primary" type="button" onClick={openEmail}>Open email with my request</button>
            <button className="secondary" type="button" onClick={copyBrief}>{copied ? "Copied" : "Copy my intake brief"}</button>
            <a className="back" href="/airlift">Back to AIRLIFT</a>
          </div>
        </div>

        <div className="preview">
          <h2>Your generated intake brief</h2>
          <pre>{brief}</pre>
        </div>

        <div className="truth">
          This page does not store your answers in a database. The email button opens your own mail application with the completed intake. Review the text before sending. AIRLIFT does not guarantee employer review, interview, offer, compensation, or placement.
        </div>
      </div>
    </main>
  );
}
