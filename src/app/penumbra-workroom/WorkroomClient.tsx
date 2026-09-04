"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./penumbra.module.css";

type Model = { id: string; name: string; provider: string; tags?: string[] };
type Occupant = { id: string; name: string; type: "human" | "ai"; model?: string; active?: boolean };
type Seat = { id: string; name: string; role: string; occupants: Occupant[] };
type Event = {
  id: string; ts: string; actor_id: string; actor_name: string; actor_type: "human" | "ai";
  seat_id: string; seat_name: string; provider?: string; model?: string; content: string;
  run_id?: string; phase?: string; sequence?: number; status?: "ok" | "error";
};
type Telemetry = {
  inputTokens: number | null; outputTokens: number | null; totalTokens: number | null;
  costUsd: number | null; marketCostUsd: number | null; latencyMs: number | null;
  generationId: string | null; attemptCount?: number; fallbackCount?: number; attemptedModels?: string[];
};
type WorkerResult = {
  ok: boolean; phase: string; sequence: number; workerId: string; name: string; seatId: string; seatName: string;
  requestedModel: string; requestedResolvedModel?: string; actualModel: string; actualProvider?: string;
  content?: string; error?: string; telemetry?: Telemetry | null;
};

const STORAGE = "nullworks.penumbra.v0.3";
const LEGACY_STORAGE = "nullworks.penumbra.v0.1";

const defaults: Seat[] = [
  { id: "human-authority", name: "Human Authority", role: "Decision / authority", occupants: [{ id: "mason", name: "Mason", type: "human", active: true }] },
  { id: "engineering", name: "Engineering", role: "Build / diagnose", occupants: [
    { id: "gpt", name: "ChatGPT", type: "ai", model: "openai/gpt-5.6-sol", active: true },
    { id: "grok", name: "Grok", type: "ai", model: "xai/grok-4", active: true },
  ] },
  { id: "qc", name: "QC / Red Team", role: "Challenge / verify", occupants: [] },
];

function uid(prefix: string) { return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`; }
function fmtInt(v: number | null | undefined) { return typeof v === "number" ? v.toLocaleString() : "—"; }
function fmtMs(v: number | null | undefined) { return typeof v === "number" ? v < 1000 ? `${v} ms` : `${(v/1000).toFixed(1)} s` : "—"; }
function fmtUsd(v: number | null | undefined) {
  if (typeof v !== "number") return "—";
  if (v === 0) return "$0";
  return v < .01 ? `$${v.toFixed(5)}` : `$${v.toFixed(3)}`;
}

export default function WorkroomClient() {
  const [seats, setSeats] = useState<Seat[]>(defaults);
  const [events, setEvents] = useState<Event[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [lastResults, setLastResults] = useState<WorkerResult[]>([]);
  const [lastRunId, setLastRunId] = useState<string>("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showSeat, setShowSeat] = useState(false);
  const [showOcc, setShowOcc] = useState<string | null>(null);
  const [seatName, setSeatName] = useState("");
  const [seatRole, setSeatRole] = useState("");
  const [occType, setOccType] = useState<"ai"|"human">("ai");
  const [occName, setOccName] = useState("");
  const [occModel, setOccModel] = useState("openai/gpt-5.6-sol");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE) || localStorage.getItem(LEGACY_STORAGE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.seats)) setSeats(parsed.seats);
        if (Array.isArray(parsed.events)) setEvents(parsed.events);
        if (Array.isArray(parsed.lastResults)) setLastResults(parsed.lastResults);
        if (typeof parsed.lastRunId === "string") setLastRunId(parsed.lastRunId);
      }
    } catch {}
    fetch("/api/penumbra/models").then(r=>r.json()).then(j=>{
      if (Array.isArray(j.models)) {
        setModels(j.models);
        const ids = new Set(j.models.map((m:Model)=>m.id));
        if (!ids.has(occModel) && j.models[0]?.id) setOccModel(j.models[0].id);
      }
    }).catch(()=>{});
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify({ seats, events, lastResults, lastRunId })); } catch {}
  }, [seats, events, lastResults, lastRunId]);

  const activeAI = useMemo(() => seats.flatMap(seat => seat.occupants
    .filter(o => o.type === "ai" && o.active !== false && o.model)
    .map(o => ({ id:o.id, name:o.name, seatId:seat.id, seatName:seat.name, model:o.model! }))), [seats]);

  const economics = useMemo(() => {
    const byWorker = new Map<string, any>();
    for (const result of lastResults) {
      const key = result.workerId || result.name;
      const row = byWorker.get(key) || {
        workerId:key, name:result.name, requestedModel:result.requestedModel, actualModels:new Set<string>(), providers:new Set<string>(),
        successes:0, failures:0, inputTokens:0, outputTokens:0, totalTokens:0, tokenObserved:false,
        costUsd:0, costObserved:false, latencyMs:0, latencyObserved:false, fallbackCount:0,
      };
      if (result.ok) row.successes += 1; else row.failures += 1;
      if (result.actualModel) row.actualModels.add(result.actualModel);
      if (result.actualProvider) row.providers.add(result.actualProvider);
      const t = result.telemetry;
      if (t) {
        if (typeof t.inputTokens === "number") { row.inputTokens += t.inputTokens; row.tokenObserved = true; }
        if (typeof t.outputTokens === "number") { row.outputTokens += t.outputTokens; row.tokenObserved = true; }
        if (typeof t.totalTokens === "number") { row.totalTokens += t.totalTokens; row.tokenObserved = true; }
        if (typeof t.costUsd === "number") { row.costUsd += t.costUsd; row.costObserved = true; }
        if (typeof t.latencyMs === "number") { row.latencyMs += t.latencyMs; row.latencyObserved = true; }
        if (typeof t.fallbackCount === "number") row.fallbackCount += t.fallbackCount;
      }
      byWorker.set(key,row);
    }
    return [...byWorker.values()].map(r=>({ ...r, actualModels:[...r.actualModels], providers:[...r.providers] }));
  }, [lastResults]);

  function addSeat() {
    if (!seatName.trim()) return;
    setSeats(v=>[...v,{id:uid("seat"),name:seatName.trim(),role:seatRole.trim()||"Work seat",occupants:[]}]);
    setSeatName(""); setSeatRole(""); setShowSeat(false);
  }
  function removeSeat(id:string){ if(id==="human-authority") return; setSeats(v=>v.filter(s=>s.id!==id)); }
  function addOccupant(seatId:string){
    if(!occName.trim()) return;
    setSeats(v=>v.map(s=>s.id===seatId?{...s,occupants:[...s.occupants,{id:uid("occ"),name:occName.trim(),type:occType,model:occType==="ai"?occModel:undefined,active:true}]}:s));
    setOccName(""); setShowOcc(null);
  }
  function removeOccupant(seatId:string,occId:string){ setSeats(v=>v.map(s=>s.id===seatId?{...s,occupants:s.occupants.filter(o=>o.id!==occId)}:s)); }
  function toggleOccupant(seatId:string,occId:string){ setSeats(v=>v.map(s=>s.id===seatId?{...s,occupants:s.occupants.map(o=>o.id===occId?{...o,active:o.active===false}:o)}:s)); }

  async function send(){
    const content=text.trim(); if(!content||busy) return; setError("");
    const humanSeat=seats.find(s=>s.id==="human-authority")||seats[0];
    const human=humanSeat?.occupants.find(o=>o.type==="human")||{id:"human",name:"Human Authority"};
    const humanEvent:Event={id:uid("evt"),ts:new Date().toISOString(),actor_id:human.id,actor_name:human.name,actor_type:"human",seat_id:humanSeat?.id||"human-authority",seat_name:humanSeat?.name||"Human Authority",content};
    const next=[...events,humanEvent]; setEvents(next); setText("");
    if(!activeAI.length){ setError("No active AI occupants. Add an AI to a seat or toggle one active."); return; }
    setBusy(true);
    try{
      const r=await fetch("/api/penumbra/run",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workers:activeAI,thread:next})});
      const j=await r.json();
      if(!r.ok) throw new Error(j.error||`Run failed (${r.status})`);
      const results:WorkerResult[]=Array.isArray(j.results)?j.results:[];
      setLastResults(results); setLastRunId(j.runId||"");
      const appended:Event[]=Array.isArray(j.appendedEvents) ? j.appendedEvents.map((e:any)=>({
        id:e.id||uid("evt"), ts:e.ts||new Date().toISOString(), actor_id:e.actor_id||"ai", actor_name:e.actor_name||"AI", actor_type:"ai",
        seat_id:e.seat_id||"seat", seat_name:e.seat_name||"Seat", provider:e.provider, model:e.model, content:e.content||"",
        run_id:e.run_id, phase:e.phase, sequence:e.sequence, status:e.status,
      })) : [];
      if(appended.length) setEvents(v=>[...v,...appended]);
      const failures=results.filter(x=>!x.ok);
      if(failures.length) setError(failures.map(x=>`${x.name||"Worker"}: ${x.error||"invocation failed"}`).join("\n"));
    }catch(e){ setError(e instanceof Error?e.message:"PENUMBRA run failed"); }
    finally{ setBusy(false); }
  }

  function exportReceipt(){
    const payload={schema:"PENUMBRA_WORKROOM_RECEIPT_V0_3",exported_at:new Date().toISOString(),authority:"Mason Perry / Human Authority",last_run_id:lastRunId,seats,events,last_results:lastResults,worker_economics:economics,token_comparability_note:"Token counts are tokenizer-relative across vendors; compare cost and outcome alongside raw tokens."};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download=`penumbra-receipt-${Date.now()}.json`; a.click(); URL.revokeObjectURL(url);
  }

  return <main className={styles.page}><div className={styles.shell}>
    <header className={styles.topbar}><div className={styles.brand}>NULLWORKS<span>PENUMBRA · MULTI-WORKER WORKROOM v0.3</span></div><div className={styles.status}>UMBRA GOVERNED · HUMAN AUTHORITY FINAL</div></header>
    <section className={styles.hero}><div><div className={styles.eyebrow}>One room · replaceable workers</div><h1>The room belongs to NULLWORKS.</h1><p>Jobs belong to seats. Seats can hold humans, one AI, or multiple AIs at the same time. The shared thread stays put while workers and vendors change.</p></div><div className={styles.law}><strong>The job belongs to the seat.</strong><br/>The worker occupying the seat is replaceable.<br/>The evidence, economics and authority survive everybody.</div></section>

    <div className={styles.layout}><aside className={styles.rail}><div className={styles.railHeader}><h2>Seats</h2><button className={styles.button} onClick={()=>setShowSeat(true)}>+ Seat</button></div><div className={styles.pillRow}><span className={styles.pill}>{activeAI.length} active AI</span><span className={styles.pill}>{models.length||"…"} live models</span></div>
      {seats.map(seat=><div className={styles.seat} key={seat.id}><div className={styles.seatHead}><div><div className={styles.seatTitle}>{seat.name}</div><div className={styles.seatRole}>{seat.role}</div></div><div className={styles.miniActions}><button className={styles.button} onClick={()=>setShowOcc(seat.id)}>+</button>{seat.id!=="human-authority"&&<button className={styles.buttonDanger} onClick={()=>removeSeat(seat.id)}>×</button>}</div></div>{seat.occupants.length===0&&<div className={styles.occupant}><span className={styles.small}>Empty seat</span></div>}{seat.occupants.map(o=><div className={styles.occupant} key={o.id}><div><div className={styles.occName}><span className={styles.occDot} style={{opacity:o.active===false?.25:1}}/>{o.name}</div><div className={styles.occMeta}>{o.type.toUpperCase()}{o.model?` · requested ${o.model}`:""}</div></div><div className={styles.miniActions}>{o.type==="ai"&&<button className={styles.button} onClick={()=>toggleOccupant(seat.id,o.id)}>{o.active===false?"Off":"On"}</button>}{!(seat.id==="human-authority"&&o.id==="mason")&&<button className={styles.buttonDanger} onClick={()=>removeOccupant(seat.id,o.id)}>×</button>}</div></div>)}</div>)}
    </aside>

    <section className={styles.main}><div className={styles.threadHeader}><div><h2>Shared thread</h2><div className={styles.threadMeta}>append-only · two-pass challenge · provenance visible</div></div><div className={styles.miniActions}><button className={styles.button} onClick={exportReceipt}>Export receipt</button><button className={styles.buttonDanger} onClick={()=>{if(confirm("Clear local PENUMBRA thread and telemetry?")){setEvents([]);setLastResults([]);setLastRunId("")}}}>Clear</button></div></div>
      {error&&<div className={styles.error}>{error}</div>}
      <div className={styles.receipt}>External actions are not automatic. AI agreement does not outrank Human Authority. Requested and actual models are accounted separately.</div>

      {economics.length>0&&<section className={styles.economics}><div className={styles.econHead}><div><div className={styles.eyebrow}>Latest run · worker economics</div><h3>Same room. Same task. Different burn.</h3></div><div className={styles.runId}>{lastRunId||"run"}</div></div><div className={styles.econGrid}>{economics.map(row=><article className={styles.econCard} key={row.workerId}><div className={styles.econName}>{row.name}</div><div className={styles.modelLine}><span>requested</span>{row.requestedModel}</div><div className={styles.modelLine}><span>actual</span>{row.actualModels.length?row.actualModels.join(" → "):"no successful model"}</div><div className={styles.metricGrid}><div><b>{row.tokenObserved?fmtInt(row.inputTokens):"—"}</b><span>input tok</span></div><div><b>{row.tokenObserved?fmtInt(row.outputTokens):"—"}</b><span>output tok</span></div><div><b>{row.tokenObserved?fmtInt(row.totalTokens):"—"}</b><span>total tok</span></div><div><b>{row.costObserved?fmtUsd(row.costUsd):"—"}</b><span>gateway cost</span></div><div><b>{row.latencyObserved?fmtMs(row.latencyMs):"—"}</b><span>wall time*</span></div><div><b>{row.successes}/{row.successes+row.failures}</b><span>successful</span></div></div><div className={styles.econFoot}>{row.fallbackCount>0?`${row.fallbackCount} fallback hop${row.fallbackCount===1?"":"s"}`:"no fallback observed"}{row.providers.length?` · ${row.providers.join(", ")}`:""}</div></article>)}</div><div className={styles.econNote}>* Invocation latencies are summed across the two passes. Token counts are tokenizer-relative across vendors; cost and accepted outcome matter more than raw token count alone.</div></section>}

      <div className={styles.thread}>{events.length===0?<div className={styles.empty}>Mason writes once. Every active AI occupant enters the same canonical room log. PENUMBRA records what actually ran, what failed, and what it cost.</div>:events.map(e=><article key={e.id} className={`${styles.event} ${e.actor_type==="human"?styles.eventHuman:""} ${e.status==="error"?styles.eventError:""}`}><div className={styles.eventHead}><div><span className={styles.actor}>{e.actor_name}</span><span className={styles.eventMeta}> · {e.seat_name}{e.phase?` · ${e.phase}`:""}</span></div><div className={styles.eventMeta}>{e.model||e.actor_type}</div></div><div className={styles.eventBody}>{e.content}</div></article>)}</div>
      <div className={styles.composer}><textarea className={styles.textarea} value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if((e.metaKey||e.ctrlKey)&&e.key==="Enter")send()}} placeholder="Message the room as Human Authority…"/><div className={styles.controls}><button className={styles.buttonPrimary} disabled={busy||!text.trim()} onClick={send}>{busy?"Workers running…":"Send to room"}</button><span className={styles.small}>Ctrl/⌘ + Enter<br/>{activeAI.length} AI occupant{activeAI.length===1?"":"s"}</span></div></div>
    </section></div>

    {showSeat&&<div className={styles.modalBackdrop}><div className={styles.modal}><h3>Add work seat</h3><div className={styles.field}><label>Seat name</label><input className={styles.input} value={seatName} onChange={e=>setSeatName(e.target.value)} placeholder="Research"/></div><div className={styles.field}><label>Role</label><input className={styles.input} value={seatRole} onChange={e=>setSeatRole(e.target.value)} placeholder="Find / verify evidence"/></div><div className={styles.modalActions}><button className={styles.button} onClick={()=>setShowSeat(false)}>Cancel</button><button className={styles.buttonPrimary} onClick={addSeat}>Add seat</button></div></div></div>}
    {showOcc&&<div className={styles.modalBackdrop}><div className={styles.modal}><h3>Add occupant</h3><div className={styles.field}><label>Type</label><select className={styles.select} value={occType} onChange={e=>setOccType(e.target.value as any)}><option value="ai">AI worker</option><option value="human">Human</option></select></div><div className={styles.field}><label>Name</label><input className={styles.input} value={occName} onChange={e=>setOccName(e.target.value)} placeholder={occType==="ai"?"Claude":"Jason"}/></div>{occType==="ai"&&<div className={styles.field}><label>Model</label><select className={styles.select} value={occModel} onChange={e=>setOccModel(e.target.value)}>{models.length?models.map(m=><option key={m.id} value={m.id}>{m.provider} · {m.name}</option>):<><option value="openai/gpt-5.6-sol">openai/gpt-5.6-sol</option><option value="xai/grok-4">xai/grok-4</option><option value="anthropic/claude-opus-5">anthropic/claude-opus-5</option></>}</select></div>}<div className={styles.modalActions}><button className={styles.button} onClick={()=>setShowOcc(null)}>Cancel</button><button className={styles.buttonPrimary} onClick={()=>addOccupant(showOcc)}>Add occupant</button></div></div></div>}
  </div></main>;
}
