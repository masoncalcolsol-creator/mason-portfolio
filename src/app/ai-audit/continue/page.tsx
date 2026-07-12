"use client";

import { FormEvent, useEffect, useState } from "react";

export default function AuditContinuePage() {
  const [reference, setReference] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("ref") || "";
    setReference(value.toUpperCase());
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/ai-audit/continue", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ reference, name, company, email, notes, consent, website: "" }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "The continuation could not be stored.");
      setStatus("success");
      setMessage(`Receipt ${reference} is complete. NULLWORKS now has a callback email and your added context.`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <main className="page">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #f3eee2; }
        .page {
          min-height: 100vh;
          padding: 18px 0 70px;
          color: #15211d;
          background:
            radial-gradient(circle at 10% 0%, rgba(46,104,112,.16), transparent 31rem),
            radial-gradient(circle at 92% 8%, rgba(189,139,53,.17), transparent 29rem),
            linear-gradient(rgba(42,57,52,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,57,52,.035) 1px, transparent 1px),
            #f3eee2;
          background-size: auto, auto, 48px 48px, 48px 48px, auto;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .shell { width: min(760px, calc(100% - 28px)); margin: 0 auto; }
        .header, .card { border: 1px solid rgba(143,104,32,.3); border-radius: 28px; background: rgba(255,251,242,.94); box-shadow: 0 28px 90px rgba(49,41,27,.11); }
        .header { display: flex; align-items: center; gap: 12px; padding: 13px 15px; }
        .mark { display: grid; width: 44px; height: 44px; place-items: center; border: 1px solid #bd8b35; border-radius: 50%; background: #0b1822; color: #efd69a; font-family: Georgia, "Times New Roman", serif; font-weight: 900; letter-spacing: -.08em; }
        .top { color: #80601f; font-size: 10px; font-weight: 950; letter-spacing: .22em; text-transform: uppercase; }
        .brand { margin-top: 2px; font-family: Georgia, "Times New Roman", serif; font-size: 17px; font-weight: 800; }
        .card { margin-top: 16px; padding: clamp(26px,5vw,48px); }
        .eyebrow { display: inline-flex; padding: 8px 11px; border: 1px solid rgba(184,138,52,.34); border-radius: 999px; background: #eee1c7; color: #80601f; font-size: 10px; font-weight: 950; letter-spacing: .2em; text-transform: uppercase; }
        h1 { margin: 22px 0 14px; font-family: Georgia, "Times New Roman", serif; font-size: clamp(42px,7vw,68px); line-height: .96; letter-spacing: -.05em; }
        .lead { color: #5c5345; font-size: 16px; line-height: 1.72; }
        .reference { margin: 24px 0; padding: 18px; border-radius: 18px; background: linear-gradient(145deg,#0b1822,#1d332d); color: #efd69a; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 22px; font-weight: 900; letter-spacing: .08em; text-align: center; }
        form { display: grid; gap: 14px; }
        .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        label { display: grid; gap: 8px; color: #39372f; font-size: 13px; font-weight: 900; }
        input, textarea { width: 100%; border: 1px solid rgba(103,85,52,.34); border-radius: 17px; background: #fffaf0; color: #15211d; padding: 15px 16px; font: inherit; outline: none; }
        input:focus, textarea:focus { border-color: #2e6870; box-shadow: 0 0 0 3px rgba(46,104,112,.12); }
        textarea { min-height: 150px; resize: vertical; line-height: 1.55; }
        .check { display: flex; gap: 10px; align-items: flex-start; padding: 14px 15px; border-radius: 16px; background: #edf2ec; color: #59645f; font-size: 12px; font-weight: 600; line-height: 1.55; }
        .check input { width: auto; margin-top: 3px; }
        button { min-height: 50px; border: 0; border-radius: 999px; background: #0b1822; color: #fffaf0; padding: 14px 20px; font: inherit; font-weight: 950; cursor: pointer; box-shadow: 0 16px 38px rgba(10,21,32,.18); }
        button:disabled { opacity: .55; cursor: wait; }
        .status { padding: 16px; border-radius: 16px; font-size: 14px; line-height: 1.55; }
        .success { background: #dfece4; color: #214a39; }
        .error { background: #f3dfd8; color: #7a3428; }
        .boundary { margin-top: 18px; color: #817766; font-size: 12px; line-height: 1.6; }
        @media (max-width: 620px) { .pair { grid-template-columns: 1fr; } .card, .header { border-radius: 24px; } }
      `}</style>
      <div className="shell">
        <header className="header">
          <div className="mark">NW</div>
          <div><div className="top">NULLWORKS</div><div className="brand">Audit Room Continuation</div></div>
        </header>
        <section className="card">
          <div className="eyebrow">Text continuation</div>
          <h1>Complete the handoff.</h1>
          <p className="lead">NEURAXIS already preserved your spoken intake. Confirm where NULLWORKS can follow up and add anything the phone transcript may have missed.</p>
          <div className="reference">{reference || "LOADING RECEIPT…"}</div>
          {status !== "success" ? (
            <form onSubmit={submit}>
              <div className="pair">
                <label>Your name<input value={name} onChange={(event) => setName(event.target.value)} /></label>
                <label>Company<input value={company} onChange={(event) => setCompany(event.target.value)} /></label>
              </div>
              <label>Best email for the audit follow-up<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
              <label>Corrections or additional context<textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Anything NEURAXIS misheard, previous attempts, volume, consequence, or context Mason should know." /></label>
              <label className="check"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />I requested this operating-model intake and authorize NULLWORKS to contact me about this receipt. This is not consent to marketing messages.</label>
              <button disabled={status === "sending" || !reference || !consent} type="submit">{status === "sending" ? "Securing receipt…" : "Complete audit handoff"}</button>
              {status === "error" && <div className="status error">{message}</div>}
            </form>
          ) : <div className="status success">{message}</div>}
          <div className="boundary">This page appends contact information and user-reported context to a provisional intake. It does not authenticate identity or create a completed enterprise audit. Human review remains final.</div>
        </section>
      </div>
    </main>
  );
}
