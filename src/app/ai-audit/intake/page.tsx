"use client";

import { useMemo, useState } from "react";

type Status = "verified" | "partial" | "planned" | "unknown";

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
  :root{color-scheme:dark}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#070707;color:#f4f1ea;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.45}
  .nw{min-height:100vh;background:radial-gradient(circle at 80% -10%,rgba(240,162,46,.12),transparent 30%),#070707;--line:#262626;--text:#f4f1ea;--muted:#98958f;--amber:#f0a22e;--amber2:#ffbd55;--red:#ff5a49;--green:#73d69b;--shadow:0 20px 50px rgba(0,0,0,.38)}
  .wrap{width:min(760px,100%);margin:auto;padding:18px 16px 80px}
  .top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 0 18px;border-bottom:1px solid var(--line)}
  .logo{letter-spacing:.12em;font-size:14px;font-weight:900;color:var(--text)}
  .logo span{color:var(--amber)}
  .badge{border:1px solid #3a2a15;background:#17110a;color:var(--amber2);font-size:10px;padding:7px 9px;border-radius:99px;font-weight:800;letter-spacing:.08em;text-decoration:none;white-space:nowrap}
  .hero{padding:38px 0 26px}
  .eyebrow{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--amber);font-weight:800}
  .hero h1{font-size:clamp(36px,10vw,72px);line-height:.94;letter-spacing:-.055em;margin:10px 0 18px;font-weight:800}
  .lead{font-size:17px;color:#cbc7be;line-height:1.65}
  .truth{border:1px solid #493015;background:linear-gradient(180deg,#171108,#0d0b08);padding:16px;border-radius:16px;margin:18px 0;color:#bcb5a9;font-size:13px}
  .truth b{color:var(--amber2)}
  .btn{appearance:none;border:0;border-radius:13px;background:var(--amber);color:#090806;font-weight:900;padding:15px 18px;font-size:14px;letter-spacing:.04em;cursor:pointer;width:100%}
  .btn.secondary{background:transparent;color:var(--text);border:1px solid #3b3b3b}
  .btn:disabled{opacity:.42;cursor:not-allowed}
  .small{font-size:12px;color:var(--muted)}
  .progress{position:sticky;top:0;z-index:10;background:rgba(7,7,7,.92);backdrop-filter:blur(16px);padding:12px 0;border-bottom:1px solid #161616}
  .progressMeta{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:.09em}
  .bar{height:4px;background:#1c1c1c;border-radius:99px;overflow:hidden}
  .bar>div{height:100%;background:linear-gradient(90deg,var(--amber),#ffd47a);transition:width .25s ease}
  .section{padding:28px 0}
  .section h2{font-size:31px;line-height:1.04;letter-spacing:-.035em;margin:8px 0}
  .sectionIntro{color:#b7b3aa;margin-bottom:24px}
  .question{background:linear-gradient(180deg,#101010,#0b0b0b);border:1px solid var(--line);border-radius:18px;padding:18px;margin:14px 0;box-shadow:var(--shadow)}
  .qtop{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}
  .qid{font-size:10px;color:var(--muted);letter-spacing:.11em;text-transform:uppercase}
  .critical{font-size:9px;letter-spacing:.1em;text-transform:uppercase;border:1px solid #6f2f29;padding:5px 7px;border-radius:99px;color:#ff8e80;background:#1c0e0c}
  .question h3{font-size:18px;line-height:1.25;margin:12px 0 14px}
  .opts{display:grid;gap:9px}
  .opt{display:flex;gap:12px;align-items:flex-start;border:1px solid #303030;border-radius:13px;padding:13px;background:#111;cursor:pointer;transition:.15s}
  .opt:hover{border-color:#4a4a4a}.opt.sel{border-color:var(--amber);box-shadow:inset 0 0 0 1px rgba(240,162,46,.18);background:#161109}
  .dot{width:17px;height:17px;border-radius:50%;border:1px solid #5a5a5a;flex:0 0 auto;margin-top:2px;display:grid;place-items:center}
  .sel .dot:after{content:"";width:9px;height:9px;background:var(--amber);border-radius:50%}
  .ol{font-size:13px;font-weight:800}.od{font-size:11px;color:#96928a;margin-top:2px}
  .nav{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:22px}
  .receipt{padding:28px 0}
  .scoreGrid{display:grid;grid-template-columns:1.15fr .85fr;gap:12px;margin-top:16px}
  .scoreCard,.stateCard,.panel{background:linear-gradient(180deg,#101010,#0b0b0b);border:1px solid var(--line);border-radius:18px;padding:18px}
  .score{font-size:58px;font-weight:900;line-height:.9;letter-spacing:-.06em}.score small{font-size:18px;color:#7d7a74}
  .state{font-size:18px;font-weight:900;margin-top:5px;color:var(--amber2)}
  .receipt h1{font-size:36px;line-height:1;margin:9px 0 18px}
  .caps{letter-spacing:.11em;color:#77736d;font-size:10px;line-height:1.65;text-transform:uppercase}
  .panel{margin-top:12px}
  .panelTitle{font-size:12px;color:#c4bfb6;font-weight:800;letter-spacing:.06em}
  .meter{margin:15px 0}.mh{display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;color:#b8b4ac}
  .track{height:7px;border-radius:99px;background:#1d1d1d;overflow:hidden}.track div{height:100%;background:linear-gradient(90deg,#7d511d,var(--amber2))}
  .offer{border:1px solid #523615;background:linear-gradient(180deg,#161008,#0d0b08);border-radius:18px;padding:19px;margin-top:12px}
  .offer h2{font-size:23px;margin:4px 0}.price{font-size:24px;color:var(--amber2);font-weight:900}
  .footer{margin-top:18px;font-size:11px;color:#706d67;line-height:1.8;text-align:center;letter-spacing:.08em}
  @media(max-width:560px){.wrap{padding-left:13px;padding-right:13px}.scoreGrid{grid-template-columns:1fr}.nav{grid-template-columns:1fr}.hero{padding-top:28px}.hero h1{font-size:48px}.receipt h1{font-size:36px}}
  `}</style><div className="wrap">
  <header className="top"><div className="logo"><span>NULLWORKS</span> // OPERATIONAL ASSURANCE</div><a className="badge" href="/ai-audit/intake">START OVER</a></header>

  {!started&&!done&&<section className="hero"><div className="eyebrow">Front door diagnostic // approximately 5 minutes</div><h1>Find the control gap before the gap finds you.</h1><p className="lead">This triage looks at <strong>Authority → Access → Data → Evidence → Recovery → Continuity</strong>. It does not certify your system. It identifies where a deeper pressure test should look first.</p><div className="truth"><b>Truth boundary</b><br/>Every answer is respondent-supplied. “Verified” means <em>you report</em> that a control is implemented and evidence exists. NULLWORKS has not independently verified the posture until evidence is acquired and tested.</div><button className="btn" onClick={()=>setStarted(true)}>START TRIAGE →</button><p className="small" style={{marginTop:12}}>18 questions · 6 control domains · critical controls can override the average.</p></section>}

  {started&&!done&&<><div className="progress"><div className="progressMeta"><span>{current.name}</span><span>{section+1} / 6</span></div><div className="bar"><div style={{width:`${((section+1)/6)*100}%`}}/></div></div><section className="section"><div className="eyebrow">{current.name} // {section+1} of 6</div><h2>{current.name}</h2><p className="sectionIntro">{current.intro}</p>{current.qs.map(q=><article className="question" key={q.id}><div className="qtop"><span className="qid">{q.id}</span>{q.critical&&<span className="critical">CRITICAL</span>}</div><h3>{q.text}</h3><div className="opts">{OPTIONS.map(o=><div className={`opt ${answers[q.id]===o.key?"sel":""}`} key={o.key} onClick={()=>setAnswers({...answers,[q.id]:o.key})}><span className="dot"/><div><div className="ol">{o.label}</div><div className="od">{o.desc}</div></div></div>)}</div></article>)}<div className="nav"><button className="btn secondary" onClick={()=>section?setSection(section-1):setStarted(false)}>← PREVIOUS</button><button className="btn" disabled={!complete} onClick={goNext}>{section===5?"GENERATE RECEIPT →":"NEXT →"}</button></div></section></>}

  {done&&<section className="receipt"><div className="eyebrow">NULLWORKS TRIAGE // RECEIPT</div><h1>{metrics.title}</h1><div className="scoreGrid"><div className="scoreCard"><div className="small">SELF-REPORTED OPERATIONAL READINESS</div><div className="score">{metrics.score}<small>/100</small></div><div className="small" style={{marginTop:12}}>This is a triage signal, not an assurance score.</div></div><div className="stateCard"><div className="small">ROUTING STATE</div><div className="state">{metrics.state}</div><p className="small">{metrics.desc}</p></div></div><div className="panel"><div className="panelTitle">EPISTEMIC BOUNDARY</div><p className="small"><strong style={{color:"#f4f1ea"}}>Independently supported findings: 0.</strong> “Verified*” answers mean the respondent reports implementation and evidence availability. NULLWORKS has not independently verified those claims in this free triage.</p><div className="caps">SELF-REPORTED · NOT INDEPENDENTLY VERIFIED · {metrics.critical} CRITICAL GAP{metrics.critical===1?"":"S"}</div></div><div className="panel"><div className="panelTitle">CONTROL PROFILE</div>{Object.entries(metrics.domain).map(([name,v])=>{const pct=Math.round(v.n/v.d*100);return <div className="meter" key={name}><div className="mh"><span>{name}</span><b>{pct}%</b></div><div className="track"><div style={{width:`${pct}%`}}/></div></div>})}</div><div className="offer"><div className="eyebrow">Recommended next response</div><h2>{metrics.route}</h2><div className="price">{metrics.route==="Full Pressure Test"?"$50K–$125K+":metrics.route==="Operational Assurance Sprint"?"$20K–$35K":"Scoped after evidence review"}</div><p className="small">Move from respondent-supplied claims into evidence acquisition, falsification, findings, remediation ownership, and retesting.</p><a className="btn" style={{display:"block",textAlign:"center",textDecoration:"none",marginTop:14}} href={nextUrl}>SEE WHAT NULLWORKS CAN DO NEXT →</a></div><div className="footer">NULLWORKS // OPERATIONAL ASSURANCE<br/>HUMANS DECIDE · SYSTEMS PRODUCE RECEIPTS</div></section>}
  </div></main>
}
