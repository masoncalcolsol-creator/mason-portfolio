"use client";

import { useMemo, useState } from "react";

const sounds = [
  { name: "ORGAN // LONG USABLE", type: "ORGAN", note: "Neutral long organ take. FRANZ source derivative." },
  { name: "ORGAN // SHORT A", type: "ORGAN", note: "Short neutral organ take." },
  { name: "ORGAN // SHORT B", type: "ORGAN", note: "Short neutral organ take." },
  { name: "9V // DISSECTION 0226", type: "9V", note: "Processed full take with room, squeaks, clunks and probable knee percussion." },
  { name: "9V // DISSECTION 0230", type: "9V", note: "Processed full take. Raw character intentionally preserved." },
  { name: "9V // CUTS 01-16", type: "CUTS", note: "Individual event cuts are staged for library ingest." },
];

export default function FranzVaultPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => sounds.filter((s) => `${s.name} ${s.type} ${s.note}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <main style={{ minHeight: "100vh", background: "#080907", color: "#e8e3d5", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", padding: "24px 16px 80px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ borderBottom: "1px solid #36392f", paddingBottom: 20, marginBottom: 20 }}>
          <div style={{ color: "#9aa77d", fontSize: 12, letterSpacing: 3 }}>NULLWORKS // ANVIL // PRIVATE WORKROOM</div>
          <h1 style={{ fontSize: "clamp(34px, 10vw, 72px)", margin: "8px 0 0", lineHeight: .9 }}>FRANZ<br/>NOISE VAULT</h1>
          <p style={{ color: "#a9a596", maxWidth: 620, lineHeight: 1.6 }}>Executive Director of Live Music & Noises. Organ, squeaks, clunks, weights, room tone, cats, knees and whatever else reality coughs up.</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18 }}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="SEARCH THE NOISE..." style={{ flex: 1, minWidth: 0, background: "#11130f", color: "#e8e3d5", border: "1px solid #36392f", borderRadius: 8, padding: "14px 12px", font: "inherit" }} />
          <div style={{ border: "1px solid #36392f", borderRadius: 8, padding: "13px 12px", color: "#9aa77d", whiteSpace: "nowrap" }}>{filtered.length} FILES</div>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {filtered.map((s, i) => (
            <section key={s.name} style={{ background: "#10120e", border: "1px solid #2c3027", borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}><strong style={{ fontSize: 17 }}>{s.name}</strong><span style={{ color: "#9aa77d", fontSize: 11 }}>{s.type}</span></div>
              <p style={{ color: "#aaa696", fontSize: 13, lineHeight: 1.5 }}>{s.note}</p>
              <div style={{ height: 52, border: "1px dashed #42473a", borderRadius: 8, display: "grid", placeItems: "center", color: "#74796a", fontSize: 12, textAlign: "center", padding: 8 }}>AUDIO SLOT {String(i + 1).padStart(2, "0")} // INGESTING FROM FRANZ SOURCE LIBRARY</div>
            </section>
          ))}
        </div>
        <footer style={{ marginTop: 28, color: "#686d60", fontSize: 11, lineHeight: 1.7 }}>SOURCE MASTERS REMAIN BAND-AGNOSTIC. BAND DERIVATIVES ARE DISPOSABLE.<br/>IF YOU NEED FRANZ, YELL.</footer>
      </div>
    </main>
  );
}
