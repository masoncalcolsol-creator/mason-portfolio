"use client";

import { useEffect, useState } from "react";

type Health = {
  checkedAt?: string;
  authenticated?: boolean;
  keyConfigured?: boolean;
  classification?: string;
  credits?: { ok?: boolean; status?: number; balance?: number | null; totalUsed?: number | null; error?: any } | null;
  quota?: { ok?: boolean; status?: number; keyIdConfigured?: boolean; raw?: any; error?: any; note?: string | null } | null;
};

function money(v: number | null | undefined) {
  return typeof v === "number" ? `$${v.toFixed(2)}` : "—";
}

export default function GatewayHealth() {
  const [health, setHealth] = useState<Health | null>(null);
  const [busy, setBusy] = useState(false);

  async function check() {
    setBusy(true);
    try {
      const r = await fetch("/api/penumbra/gateway-health", { cache: "no-store" });
      const j = await r.json();
      setHealth(j);
    } catch {
      setHealth({ classification: "HEALTH_CHECK_FAILED" });
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { check(); }, []);

  const healthy = health?.classification === "AUTHENTICATED_PAID_CREDITS_AVAILABLE";
  const box: React.CSSProperties = {
    width: "min(1280px, calc(100% - 28px))",
    margin: "14px auto 0",
    padding: "14px 16px",
    border: `1px solid ${healthy ? "#36584b" : "#5b4941"}`,
    background: healthy ? "#0b1714" : "#17120f",
    borderRadius: 16,
    color: "#eef2ec",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  return <section style={box} aria-label="AI Gateway health">
    <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"center",flexWrap:"wrap"}}>
      <div>
        <div style={{fontSize:11,letterSpacing:".14em",textTransform:"uppercase",opacity:.65}}>AI Gateway health · billing boundary</div>
        <div style={{fontWeight:900,marginTop:5}}>{busy && !health ? "Checking…" : health?.classification || "Unknown"}</div>
      </div>
      <button onClick={check} disabled={busy} style={{border:"1px solid #46534f",background:"#111d1a",color:"#eef2ec",borderRadius:10,padding:"8px 11px",fontWeight:800}}>{busy?"Checking…":"Recheck"}</button>
    </div>
    {health && <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:8,marginTop:12}}>
      <div><div style={{fontSize:10,opacity:.6,textTransform:"uppercase"}}>Authenticated</div><strong>{health.authenticated?"YES":"NO"}</strong></div>
      <div><div style={{fontSize:10,opacity:.6,textTransform:"uppercase"}}>Gateway balance</div><strong>{money(health.credits?.balance)}</strong></div>
      <div><div style={{fontSize:10,opacity:.6,textTransform:"uppercase"}}>Lifetime used</div><strong>{money(health.credits?.totalUsed)}</strong></div>
      <div><div style={{fontSize:10,opacity:.6,textTransform:"uppercase"}}>Credits endpoint</div><strong>{health.credits?.status ?? "—"}</strong></div>
      <div><div style={{fontSize:10,opacity:.6,textTransform:"uppercase"}}>Quota endpoint</div><strong>{health.quota?.status ?? "—"}</strong></div>
    </div>}
    {health?.credits?.error && <div style={{fontSize:11,lineHeight:1.5,marginTop:10,opacity:.8}}>Credits error: {typeof health.credits.error === "string" ? health.credits.error : JSON.stringify(health.credits.error)}</div>}
    {health?.quota?.note && <div style={{fontSize:11,lineHeight:1.5,marginTop:8,opacity:.65}}>{health.quota.note}</div>}
  </section>;
}
