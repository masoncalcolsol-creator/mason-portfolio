"use client";

import { useMemo, useState } from "react";

type Status = "verified" | "partial" | "planned" | "unknown";
type Q = { id:string; domain:string; critical:boolean; text:string };

const SECTIONS = [
  {name:"Authority", intro:"Who may decide, approve, stop, revoke, and escalate consequential system behavior?", qs:[
    ["A1",true,"Is a named human role authorized to stop, override, or revoke consequential AI or automated actions?"],
    ["A2",false,"Are consequential decisions mapped to named roles rather than assumed to belong to ‘the team’ or ‘the system’?"],
    ["A3",false,"Are approval and escalation thresholds explicit enough that an operator can tell when human review is required?"]]},
  {name:"Access", intro:"Can identities obtain only the access they need, and can that access be removed when the situation changes?", qs:[
    ["X1",true,"Are human and machine identities scoped to the minimum systems, records, and actions required for their role?"],
    ["X2",true,"Can access be revoked quickly and predictably when a person, model, vendor, credential, or role changes?"],
    ["X3",true,"Can one actor initiate and approve the same high-consequence action without an independent control?"]]},
  {name:"Data", intro:"Do you know what data the system touches, where it goes, and which claims depend on it?", qs:[
    ["D1",false,"Are protected, regulated, sensitive, and operationally critical data classes explicitly identified?"],
    ["D2",true,"Can important outputs be traced back to their source data and material transformations?"],
    ["D3",true,"Are model/vendor data exposure, retention, training-use, and export boundaries known and intentionally accepted?"]]},
  {name:"Evidence", intro:"Can the organization reconstruct what happened, why it happened, and who had authority?", qs:[
    ["E1",false,"Do consequential actions leave usable receipts showing actor, time, action, input/state, and resulting state?"],
    ["E2",true,"Can an independent reviewer reconstruct a material decision without relying on the original builder or operator to fill the gaps?"],
    ["E3",false,"Do outputs distinguish observation, inference, respondent claim, human approval, and independent verification?"]]},
  {name:"Recovery", intro:"Can the system fail, recover, and prove that the repaired control works afterward?", qs:[
    ["R1",true,"Is there a defined recovery path to a known safe operating state after a material system, credential, model, or workflow failure?"],
    ["R2",true,"Has that recovery path been exercised recently enough to be trusted?"],
    ["R3",false,"After remediation, is the repaired control retested and evidenced before the issue is treated as closed?"]]},
  {name:"Continuity", intro:"When the system changes, do authority, evidence, and control state survive by proof, or by assumption?", qs:[
    ["C1",true,"Do model, vendor, workflow, role, or organizational changes trigger explicit control revalidation?"],
    ["C2",true,"After a material change, are authority, evidence, and control state explicitly re-established rather than assumed to carry forward?"],
    ["C3",true,"Can essential operational state and evidence be exported and reconstructed outside the current model, vendor, or primary application?"]]},
].map(s=>({...s,qs:s.qs.map(([id,critical,text])=>({id:id as string,domain:s.name,critical:critical as boolean,text:text as string}))}));

const OPTIONS:{key:Status;label:string;desc:string;score:number}[]=[
  {key:"verified",label:"Verified*",desc:"Self-reported implemented + evidence exists",score:1},
  {key:"partial",label:"Partial",desc:"Present, but incomplete or inconsistent",score:.55},
  {key:"planned",label:"Planned",desc:"Known gap; not operational today",score:0},
  {key:"unknown",label:"Unknown",desc:"Absent, unverified, or respondent does not know",score:0},
];

export default function Triage(){
  const [started,setStarted]=useState(false);
  const [section,setSection]=useState(0);
  const [answers,setAnswers]=useState<Record<string,Status>>({});
  const [done,setDone]=useState(false);
  const current=SECTIONS[section];
  const all=SECTIONS.flatMap(s=>s.qs);
  const complete=current.qs.every(q=>answers[q.id]);

  const metrics=useMemo(()=>{
    let n=0,d=0; const domain:Record<string,{n:number;d:number}>={}; let critical=0; let partialCritical=0;
    for(const q of all){ const a=answers[q.id]; if(!a) continue; const w=q.critical?3:2; const s=OPTIONS.find(o=>o.key===a)!.score; n+=s*w; d+=w; domain[q.domain]??={n:0,d:0}; domain[q.domain].n+=s*w; domain[q.domain].d+=w; if(q.critical&&(a==="planned"||a==="unknown"))critical++; if(q.critical&&a==="partial")partialCritical++; }
    const score=d?Math.round(n/d*100):0;
    let state="VERIFY", route="Bounded Verification Review", title="Your system needs remediation verification.", desc="Controls appear credible. Independent pressure testing can verify they behave as intended.";
    if(critical){state="INTERVENTION";route="Operational Assurance Sprint";title="Your system needs full pressure test.";desc="Multiple foundational controls are missing or unverified. Contain exposure before expanding capability."}
    else if(partialCritical||score<80){state="PRESSURE TEST";route="Full Pressure Test";title="Your system needs pressure testing.";desc="The posture needs falsification, not another questionnaire."}
    return {score,state,route,title,desc,critical,domain};
  },[answers]);

  const goNext=()=>{if(section<SECTIONS.length-1){setSection(section+1);scrollTo(0,0)}else{setDone(true);scrollTo(0,0)}};
  const nextUrl=`/ai-audit/next-step?state=${encodeURIComponent(metrics.state)}&score=${metrics.score}&route=${encodeURIComponent(metrics.route)}`;

  return <main className="nw"><style>{`
  :root{color-scheme:dark}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#070707;color:#f4f1ea;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.nw{min-height:100vh;background:radial-gradient(circle at 50% 0,rgba(240,162,46,.16),transparent 34rem),#070707;--line:#282828;--amber:#ffae26;--muted:#8f8c85}.wrap{width:min(760px,100%);margin:auto;padding:20px 34px 76px}.top{display:flex;justify-content:space-between;align-items:center;padding:18px 6px 28px;border-bottom:1px solid #242424}.logo{color:var(--amber);font-weight:950;letter-spacing:.13em}.startover{color:#9b9790;text-decoration:none;letter-spacing:.14em;font-size:12px}.hero{padding:86px 0 42px}.tag{display:inline-block;border:1px solid #6b3926;color:#ff8c6a;padding:14px 16px;letter-spacing:.13em;font-size:12px}.hero h1{font-size:clamp(48px,10vw,76px);line-height:.98;letter-spacing:-.055em;font-weight:500;margin:34px 0 28px}.lead{font-size:19px;line-height:1.75;color:#97938b}.truth{margin-top:28px;border-left:3px solid var(--amber);padding:18px 20px;background:#10140f;color:#aaa59d}.btn{width:100%;border:0;background:var(--amber);color:#111;padding:19px;border-radius:5px;font-weight:900;letter-spacing:.08em;font-size:15px;cursor:pointer}.small{font-size:12px;color:#716f6a;letter-spacing:.07em}.progress{position:sticky;top:0;background:rgba(7,7,7,.94);backdrop-filter:blur(12px);padding:14px 0;z-index:5}.bar{height:3px;background:#252525}.bar>div{height:100%;background:var(--amber)}.section{padding:38px 0}.section h2{font-size:38px;margin:12px 0}.question{border:1px solid var(--line);background:#0c0d0b;padding:18px;margin:14px 0;border-radius:12px}.qid{font-size:11px;color:#706f6c;letter-spacing:.14em}.critical{float:right;color:#ff806e;border:1px solid #603126;padding:4px 7px;font-size:9px;letter-spacing:.08em}.question h3{font-size:18px;line-height:1.35;font-weight:650;margin:16px 0}.opts{display:grid;gap:8px}.opt{display:flex;gap:12px;border:1px solid #2b2b2b;background:#111;padding:13px;border-radius:10px;cursor:pointer}.opt.sel{border-color:var(--amber);background:#171107}.dot{width:17px;height:17px;border:1px solid #555;border-radius:50%;margin-top:2px}.sel .dot{box-shadow:inset 0 0 0 4px #171107;background:var(--amber)}.ol{font-size:13px;font-weight:800}.od{font-size:11px;color:#888;margin-top:2px}.nav{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:24px}.secondary{background:#111;color:#ddd;border:1px solid #333}.receipt{padding:44px 0}.score{font-size:27px;margin:30px 0 22px}.score b{font-size:42px}.receipt h1{font-size:clamp(50px,10vw,76px);line-height:1.05;letter-spacing:-.055em;font-weight:500}.caps{letter-spacing:.14em;color:#74716c;font-size:12px;line-height:1.65}.panel{border:1px solid #2a2d2a;background:#0b0d0b;padding:22px;border-radius:12px;margin-top:28px}.panelTitle{color:var(--amber);letter-spacing:.15em;font-size:13px;margin-bottom:24px}.meter{margin:20px 0}.mh{display:flex;justify-content:space-between;color:#8d8982;font-size:13px}.track{height:6px;background:#202520;margin-top:10px}.track div{height:100%;background:var(--amber)}.offer{border:1px solid #383a38;background:#0b0d0b;padding:24px;margin-top:26px;border-radius:12px}.price{font-size:25px;font-weight:900;margin:8px 0 18px}.footer{margin-top:46px;text-align:center;color:#555;letter-spacing:.16em;font-size:11px;line-height:2}@media(max-width:560px){.wrap{padding-left:34px;padding-right:34px}.hero{padding-top:76px}.nav{grid-template-columns:1fr}.hero h1,.receipt h1{font-size:52px}}
  `}</style><div className="wrap">
  <header className="top"><div className="logo">NULLWORKS</div><a className="startover" href="/ai-audit/intake">START OVER</a></header>
  {!started&&!done&&<section className="hero"><div className="tag">OPERATIONAL ASSURANCE</div><h1>Find the control gap before the gap finds you.</h1><p className="lead">This triage looks at Authority → Access → Data → Evidence → Recovery → Continuity. It does not certify your system. It identifies where a deeper pressure test should look first.</p><div className="truth"><b>TRUTH BOUNDARY</b><br/>Every answer is respondent-supplied. “Verified” means you report that a control is implemented and evidence exists. NULLWORKS has not independently verified the posture until evidence is acquired and tested.</div><button className="btn" style={{marginTop:28}} onClick={()=>setStarted(true)}>START TRIAGE →</button><p className="small">18 questions · approximately 5 minutes · no generic maturity theater</p></section>}
  {started&&!done&&<><div className="progress"><div className="small">{current.name.toUpperCase()} // {section+1} OF 6</div><div className="bar" style={{marginTop:8}}><div style={{width:`${((section+1)/6)*100}%`}}/></div></div><section className="section"><div className="tag">{current.name.toUpperCase()}</div><h2>{current.name}</h2><p className="lead">{current.intro}</p>{current.qs.map(q=><article className="question" key={q.id}><span className="qid">{q.id}</span>{q.critical&&<span className="critical">CRITICAL</span>}<h3>{q.text}</h3><div className="opts">{OPTIONS.map(o=><div className={`opt ${answers[q.id]===o.key?"sel":""}`} key={o.key} onClick={()=>setAnswers({...answers,[q.id]:o.key})}><span className="dot"/><div><div className="ol">{o.label}</div><div className="od">{o.desc}</div></div></div>)}</div></article>)}<div className="nav"><button className="btn secondary" onClick={()=>section?setSection(section-1):setStarted(false)}>← PREVIOUS</button><button className="btn" disabled={!complete} style={{opacity:complete?1:.35}} onClick={goNext}>{section===5?"GENERATE RECEIPT →":"NEXT →"}</button></div></section></>}
  {done&&<section className="receipt"><div className="tag">{metrics.state}</div><div className="score"><b>{metrics.score}</b><span className="small">/100</span></div><h1>{metrics.title}</h1><p className="lead">{metrics.desc}</p><div className="caps">SELF-REPORTED · NOT INDEPENDENTLY VERIFIED · {metrics.critical} CRITICAL GAP{metrics.critical===1?"":"S"}</div><div className="panel"><div className="panelTitle">CONTROL PROFILE</div>{Object.entries(metrics.domain).map(([name,v])=>{const pct=Math.round(v.n/v.d*100);return <div className="meter" key={name}><div className="mh"><span>{name}</span><b>{pct}%</b></div><div className="track"><div style={{width:`${pct}%`}}/></div></div>})}</div><div className="offer"><div className="panelTitle">RECOMMENDED NEXT RESPONSE</div><h2>{metrics.route}</h2><div className="price">{metrics.route==="Full Pressure Test"?"$50K–$125K+":metrics.route==="Operational Assurance Sprint"?"$20K–$35K":"Scoped after evidence review"}</div><p className="lead" style={{fontSize:15}}>Move from respondent-supplied claims into evidence acquisition, falsification, findings, remediation ownership, and retesting.</p><a className="btn" style={{display:"block",textAlign:"center",textDecoration:"none",marginTop:20}} href={nextUrl}>SEE WHAT NULLWORKS CAN DO NEXT →</a></div><div className="footer">NULLWORKS // OPERATIONAL ASSURANCE<br/>HUMANS DECIDE · SYSTEMS PRODUCE RECEIPTS</div></section>}
  </div></main>
}
