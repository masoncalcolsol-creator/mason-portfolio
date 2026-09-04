"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./penumbra.module.css";

type Model = { id: string; name: string; provider: string; tags?: string[] };
type Occupant = { id: string; name: string; type: "human" | "ai"; model?: string; active?: boolean };
type Seat = { id: string; name: string; role: string; occupants: Occupant[] };
type Event = { id: string; ts: string; actor_id: string; actor_name: string; actor_type: "human" | "ai"; seat_id: string; seat_name: string; provider?: string; model?: string; content: string };

const STORAGE = "nullworks.penumbra.v0.1";

const defaults: Seat[] = [
  { id: "human-authority", name: "Human Authority", role: "Decision / authority", occupants: [{ id: "mason", name: "Mason", type: "human", active: true }] },
  { id: "engineering", name: "Engineering", role: "Build / diagnose", occupants: [
    { id: "gpt", name: "ChatGPT", type: "ai", model: "openai/gpt-5.6-sol", active: true },
    { id: "grok", name: "Grok", type: "ai", model: "xai/grok-4", active: true },
  ] },
  { id: "qc", name: "QC / Red Team", role: "Challenge / verify", occupants: [] },
];

function uid(prefix: string) { return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`; }
function providerOf(model?: string) { return model ? model.split("/")[0] : undefined; }

export default function WorkroomClient() {
  const [seats, setSeats] = useState<Seat[]>(defaults);
  const [events, setEvents] = useState<Event[]>([]);
  const [models, setModels] = useState<Model[]>([]);
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
      const saved = localStorage.getItem(STORAGE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.seats)) setSeats(parsed.seats);
        if (Array.isArray(parsed.events)) setEvents(parsed.events);
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
    try { localStorage.setItem(STORAGE, JSON.stringify({ seats, events })); } catch {}
  }, [seats, events]);

  const activeAI = useMemo(() => seats.flatMap(seat => seat.occupants
    .filter(o => o.type === "ai" && o.active !== false && o.model)
    .map(o => ({ id:o.id, name:o.name, seatId:seat.id, seatName:seat.name, model:o.model! }))), [seats]);

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
      const aiEvents:Event[]=(j.results||[]).filter((x:any)=>x.ok).map((x:any)=>({id:uid("evt"),ts:new Date().toISOString(),actor_id:x.workerId,actor_name:x.name,actor_type:"ai",seat_id:x.seatId,seat_name:x.seatName,provider:providerOf(x.actualModel),model:x.actualModel,content:x.content}));
      const failures=(j.results||[]).filter((x:any)=>!x.ok);
      if(failures.length) setError(failures.map((x:any)=>`${x.name||"Worker"}: ${x.error}`).join("\n"));
      if(aiEvents.length) setEvents(v=>[...v,...aiEvents]);
    }catch(e){ setError(e instanceof Error?e.message:"PENUMBRA run failed"); }
    finally{ setBusy(false); }
  }

  function exportReceipt(){
    const payload={schema:"PENUMBRA_WORKROOM_RECEIPT_V0_1",exported_at:new Date().toISOString(),authority:"Mason Perry / Human Authority",seats,events};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download=`penumbra-receipt-${Date.now()}.json`; a.click(); URL.revokeObjectURL(url);
  }

  return <main className={styles.page}><div className={styles.shell}>
    <header className={styles.topbar}><div className={styles.brand}>NULLWORKS<span>PENUMBRA · MULTI-WORKER WORKROOM v0.1</span></div><div className={styles.status}>UMBRA GOVERNED · HUMAN AUTHORITY FINAL</div></header>
    <section className={styles.hero}><div><div className={styles.eyebrow}>One room · replaceable workers</div><h1>The room belongs to NULLWORKS.</h1><p>Jobs belong to seats. Seats can hold humans, one AI, or multiple AIs at the same time. The shared thread stays put while workers and vendors change.</p></div><div className={styles.law}><strong>The job belongs to the seat.</strong><br/>The worker occupying the seat is replaceable.<br/>The evidence and authority survive everybody.</div></section>

    <div className={styles.layout}><aside className={styles.rail}><div className={styles.railHeader}><h2>Seats</h2><button className={styles.button} onClick={()=>setShowSeat(true)}>+ Seat</button></div><div className={styles.pillRow}><span className={styles.pill}>{activeAI.length} active AI</span><span className={styles.pill}>{models.length||"…"} live models</span></div>
      {seats.map(seat=><div className={styles.seat} key={seat.id}><div className={styles.seatHead}><div><div className={styles.seatTitle}>{seat.name}</div><div className={styles.seatRole}>{seat.role}</div></div><div className={styles.miniActions}><button className={styles.button} onClick={()=>setShowOcc(seat.id)}>+</button>{seat.id!=="human-authority"&&<button className={styles.buttonDanger} onClick={()=>removeSeat(seat.id)}>×</button>}</div></div>{seat.occupants.length===0&&<div className={styles.occupant}><span className={styles.small}>Empty seat</span></div>}{seat.occupants.map(o=><div className={styles.occupant} key={o.id}><div><div className={styles.occName}><span className={styles.occDot} style={{opacity:o.active===false?.25:1}}/>{o.name}</div><div className={styles.occMeta}>{o.type.toUpperCase()}{o.model?` · ${o.model}`:""}</div></div><div className={styles.miniActions}>{o.type==="ai"&&<button className={styles.button} onClick={()=>toggleOccupant(seat.id,o.id)}>{o.active===false?"Off":"On"}</button>}{!(seat.id==="human-authority"&&o.id==="mason")&&<button className={styles.buttonDanger} onClick={()=>removeOccupant(seat.id,o.id)}>×</button>}</div></div>)}</div>)}
    </aside>

    <section className={styles.main}><div className={styles.threadHeader}><div><h2>Shared thread</h2><div className={styles.threadMeta}>parallel worker mode · provenance visible</div></div><div className={styles.miniActions}><button className={styles.button} onClick={exportReceipt}>Export receipt</button><button className={styles.buttonDanger} onClick={()=>{if(confirm("Clear local PENUMBRA thread?"))setEvents([])}}>Clear</button></div></div>{error&&<div className={styles.error}>{error}</div>}<div className={styles.receipt}>External actions are not automatic. AI agreement does not outrank Human Authority. v0.1 stores room continuity locally in this browser.</div><div className={styles.thread}>{events.length===0?<div className={styles.empty}>Mason writes once. Every active AI occupant receives the same shared thread in parallel and answers from its assigned seat. Add Grok, GPT, Claude, Gemini—or humans—to the seats you want.</div>:events.map(e=><article key={e.id} className={`${styles.event} ${e.actor_type==="human"?styles.eventHuman:""}`}><div className={styles.eventHead}><div><span className={styles.actor}>{e.actor_name}</span><span className={styles.eventMeta}> · {e.seat_name}</span></div><div className={styles.eventMeta}>{e.model||e.actor_type}</div></div><div className={styles.eventBody}>{e.content}</div></article>)}</div><div className={styles.composer}><textarea className={styles.textarea} value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if((e.metaKey||e.ctrlKey)&&e.key==="Enter")send()}} placeholder="Message the room as Human Authority…"/><div className={styles.controls}><button className={styles.buttonPrimary} disabled={busy||!text.trim()} onClick={send}>{busy?"Workers running…":"Send to room"}</button><span className={styles.small}>Ctrl/⌘ + Enter<br/>{activeAI.length} AI occupant{activeAI.length===1?"":"s"}</span></div></div></section></div>

    {showSeat&&<div className={styles.modalBackdrop}><div className={styles.modal}><h3>Add work seat</h3><div className={styles.field}><label>Seat name</label><input className={styles.input} value={seatName} onChange={e=>setSeatName(e.target.value)} placeholder="Research"/></div><div className={styles.field}><label>Role</label><input className={styles.input} value={seatRole} onChange={e=>setSeatRole(e.target.value)} placeholder="Find / verify evidence"/></div><div className={styles.modalActions}><button className={styles.button} onClick={()=>setShowSeat(false)}>Cancel</button><button className={styles.buttonPrimary} onClick={addSeat}>Add seat</button></div></div></div>}

    {showOcc&&<div className={styles.modalBackdrop}><div className={styles.modal}><h3>Add occupant</h3><div className={styles.field}><label>Type</label><select className={styles.select} value={occType} onChange={e=>setOccType(e.target.value as any)}><option value="ai">AI worker</option><option value="human">Human</option></select></div><div className={styles.field}><label>Name</label><input className={styles.input} value={occName} onChange={e=>setOccName(e.target.value)} placeholder={occType==="ai"?"Claude":"Jason"}/></div>{occType==="ai"&&<div className={styles.field}><label>Model</label><select className={styles.select} value={occModel} onChange={e=>setOccModel(e.target.value)}>{models.length?models.map(m=><option key={m.id} value={m.id}>{m.provider} · {m.name}</option>):<><option value="openai/gpt-5.6-sol">openai/gpt-5.6-sol</option><option value="xai/grok-4">xai/grok-4</option><option value="anthropic/claude-opus-5">anthropic/claude-opus-5</option><option value="google/gemini-3.6-flash">google/gemini-3.6-flash</option></>}</select></div>}<div className={styles.modalActions}><button className={styles.button} onClick={()=>setShowOcc(null)}>Cancel</button><button className={styles.buttonPrimary} onClick={()=>addOccupant(showOcc)}>Add occupant</button></div></div></div>}
  </div></main>;
}
