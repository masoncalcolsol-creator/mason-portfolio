"use client";

import { useEffect, useMemo, useState } from "react";
import CommercialThemeToggle from "../components/CommercialThemeToggle";

type Choice = { label: string; value: number; note?: string };
type Question = { id: string; domain: string; prompt: string; help: string; choices: Choice[] };
type Answers = Record<string, number>;

const VERSION = "NW-TRIAGE-0.1";
const STORAGE_KEY = "nw-assurance-triage-draft-v01";

const questions: Question[] = [
  { id:"claims", domain:"Claim exposure", prompt:"How strongly is the system represented to other people?", help:"Public and contractual claims create a larger assurance surface than internal experimentation.", choices:[
    {label:"Internal experiment only",value:0},{label:"Internal production tool",value:1},{label:"Customer or investor facing",value:2},{label:"Publicly marketed with trust, safety, compliance, or autonomy claims",value:3}
  ]},
  { id:"consequence", domain:"Consequence", prompt:"What can happen when the system is materially wrong?", help:"Consequence is not the same thing as probability. A rare but severe failure still matters.", choices:[
    {label:"Minor inconvenience or easily reversible rework",value:0},{label:"Meaningful time, money, or customer impact",value:1},{label:"Legal, privacy, access, professional, or major financial impact",value:2},{label:"Physical safety, critical infrastructure, regulated or public-safety consequence",value:3}
  ]},
  { id:"action", domain:"Consequence", prompt:"What authority does the system have to act?", help:"Advice and autonomous execution carry different operational risk.", choices:[
    {label:"Generates information only",value:0},{label:"Recommends actions to a human",value:1},{label:"Can execute reversible actions",value:2},{label:"Can execute consequential or difficult-to-reverse actions",value:3}
  ]},
  { id:"authority", domain:"Human authority", prompt:"How precisely is human authority defined?", help:"A human being present is not the same thing as the correct human holding jurisdiction.", choices:[
    {label:"Named competent authority, scope, stop power, and escalation are explicit",value:0},{label:"Human approval exists but jurisdiction is partly informal",value:1},{label:"A generic admin/operator can approve most matters",value:2},{label:"No meaningful human stop, reversal, or jurisdiction model",value:3}
  ]},
  { id:"timeout", domain:"Human authority", prompt:"Can timeouts or fallbacks resume work that was waiting for human judgment?", help:"A timer should not silently impersonate authorization.", choices:[
    {label:"No; unresolved approval remains unresolved",value:0},{label:"Only for clearly non-approval scheduling",value:1},{label:"Sometimes; behavior depends on workflow",value:2},{label:"Yes or unknown",value:3}
  ]},
  { id:"evidence", domain:"Evidence custody", prompt:"Can a reviewer reconstruct consequential decisions after the fact?", help:"Useful evidence includes inputs, outputs, decision owners, state changes, failures, and version identity.", choices:[
    {label:"Yes, with source/version custody and preserved decision lineage",value:0},{label:"Mostly, but some context or failures are missing",value:1},{label:"Basic logs exist but not a complete decision record",value:2},{label:"No, or we do not know",value:3}
  ]},
  { id:"correction", domain:"Correction", prompt:"What happens when later evidence contradicts an earlier decision?", help:"Strong correction preserves the original event while making the current effective state explicit.", choices:[
    {label:"Append-only correction/supersession with visible history",value:0},{label:"Human correction is possible but lineage is inconsistent",value:1},{label:"Records are usually overwritten or manually patched",value:2},{label:"No defined correction path",value:3}
  ]},
  { id:"completion", domain:"Completion truth", prompt:"How does the system know work is actually complete?", help:"A terminal API call is not always the same thing as a completed operational outcome.", choices:[
    {label:"External or human receipt confirms the intended outcome",value:0},{label:"Completion has explicit workflow criteria",value:1},{label:"Completion mostly means the software finished",value:2},{label:"Completion is model- or action-label based, or unclear",value:3}
  ]},
  { id:"tests", domain:"Testing maturity", prompt:"How closely do tests map to important product claims?", help:"A large test count is not the same thing as testing the claim that matters.", choices:[
    {label:"Critical claims map to explicit tests and failure conditions",value:0},{label:"Good project tests, but claim mapping is incomplete",value:1},{label:"Mostly feature/unit tests",value:2},{label:"Little testing or unknown",value:3}
  ]},
  { id:"independent", domain:"Testing maturity", prompt:"Has anyone independent reproduced consequential tests or challenged the architecture?", help:"Internal testing is valuable. Independent challenge tests a different boundary.", choices:[
    {label:"Yes, with preserved receipts",value:0},{label:"Informal external review",value:1},{label:"Internal red-team only",value:2},{label:"No independent review",value:3}
  ]},
  { id:"urgency", domain:"Commercial urgency", prompt:"What is driving the need for assurance now?", help:"The same architecture can need a different response when a major sale, launch, or regulated deployment is near.", choices:[
    {label:"General preparation; no immediate deadline",value:0},{label:"Enterprise customer or investor diligence",value:1},{label:"Launch, contract, procurement, or major architecture change is near",value:2},{label:"Incident, regulated deployment, safety consequence, or active blocker",value:3}
  ]},
  { id:"unknowns", domain:"Uncertainty", prompt:"How much of the system's real behavior is currently unknown to the team?", help:"Unknown is not failure. Hidden unknowns are the problem.", choices:[
    {label:"Major boundaries are measured and known",value:0},{label:"Some meaningful unknowns remain",value:1},{label:"Several important behaviors depend on assumptions",value:2},{label:"We cannot confidently answer multiple questions above",value:3}
  ]},
];

const styles = `
:root{--nw-paper:#fff9eb;--nw-paper2:#f3e7cf;--nw-ink:#091b2c;--nw-text:#20262d;--nw-muted:#6d706f;--nw-gold:#b58a3a;--nw-border:#d6c7a7;--nw-card:#fffdf6;--nw-good:#23674f;--nw-warn:#9a6a12;--nw-risk:#9a3b31;--nw-shadow:0 16px 44px rgba(59,43,17,.1);--nw-toggle-bg:rgba(255,255,255,.66)}
html[data-nw-theme="dark"]{--nw-paper:#111821;--nw-paper2:#18232d;--nw-ink:#f5ead5;--nw-text:#f1eee7;--nw-muted:#bab8b2;--nw-gold:#d2a85b;--nw-border:#3b4650;--nw-card:#17212a;--nw-good:#79d0ad;--nw-warn:#e4bd69;--nw-risk:#ff9990;--nw-shadow:0 16px 44px rgba(0,0,0,.3);--nw-toggle-bg:rgba(17,24,33,.82)}
*{box-sizing:border-box}html,body{margin:0;background:var(--nw-paper);color:var(--nw-text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.wrap{width:min(900px,calc(100% - 28px));margin:auto}.nav{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--nw-paper) 92%,transparent);backdrop-filter:blur(16px);border-bottom:1px solid var(--nw-border)}.navin{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 0}.brand{text-decoration:none;color:var(--nw-ink);font-weight:950;letter-spacing:.09em;text-transform:uppercase;font-size:12px}.hero{padding:52px 0 28px;background:linear-gradient(180deg,var(--nw-paper),var(--nw-paper2));border-bottom:1px solid var(--nw-border)}.eyebrow{display:inline-flex;border:1px solid var(--nw-border);border-radius:999px;padding:6px 10px;color:var(--nw-gold);font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;background:var(--nw-card)}h1,h2,h3{font-family:Georgia,"Times New Roman",serif;color:var(--nw-ink)}h1{font-size:clamp(40px,8vw,70px);line-height:.96;letter-spacing:-.05em;margin:18px 0}.lead{font-size:18px;line-height:1.55;max-width:760px}.truth{border-left:4px solid var(--nw-gold);background:var(--nw-card);padding:13px 15px;border-radius:0 14px 14px 0;color:var(--nw-muted)}.main{padding:32px 0 60px}.progress{height:8px;border-radius:999px;background:var(--nw-paper2);overflow:hidden;border:1px solid var(--nw-border);margin:8px 0 22px}.progress>span{display:block;height:100%;background:var(--nw-ink);transition:width .2s ease}.meta{display:flex;justify-content:space-between;gap:12px;font-size:12px;color:var(--nw-muted)}.card{border:1px solid var(--nw-border);border-radius:22px;background:var(--nw-card);box-shadow:var(--nw-shadow);padding:clamp(18px,4vw,28px)}.domain{font-size:10px;font-weight:950;letter-spacing:.12em;text-transform:uppercase;color:var(--nw-gold)}.card h2{font-size:clamp(28px,5vw,42px);line-height:1.05;margin:10px 0}.help{color:var(--nw-muted);margin:0 0 20px}.choices{display:grid;gap:10px}.choice{display:flex;gap:12px;align-items:flex-start;width:100%;text-align:left;padding:14px;border:1px solid var(--nw-border);border-radius:15px;background:var(--nw-paper);color:var(--nw-text);font:inherit;cursor:pointer}.choice:hover{border-color:var(--nw-gold)}.choice.selected{border-color:var(--nw-ink);box-shadow:0 0 0 2px color-mix(in srgb,var(--nw-ink) 16%,transparent)}.radio{width:20px;height:20px;flex:0 0 20px;border-radius:999px;border:2px solid var(--nw-border);margin-top:1px;display:grid;place-items:center}.choice.selected .radio:after{content:"";width:10px;height:10px;border-radius:999px;background:var(--nw-ink)}.actions{display:flex;gap:10px;justify-content:space-between;margin-top:18px;flex-wrap:wrap}.btn{appearance:none;border:1px solid var(--nw-ink);background:transparent;color:var(--nw-ink);padding:11px 16px;border-radius:999px;font:inherit;font-weight:900;cursor:pointer;text-decoration:none;display:inline-flex;justify-content:center}.btn.primary{background:var(--nw-ink);color:var(--nw-paper)}.btn:disabled{opacity:.35;cursor:not-allowed}.result{display:grid;gap:15px}.band{font-size:12px;font-weight:950;letter-spacing:.12em;text-transform:uppercase}.band.green{color:var(--nw-good)}.band.amber{color:var(--nw-warn)}.band.red,.band.critical{color:var(--nw-risk)}.score{font-family:Georgia,"Times New Roman",serif;font-size:56px;line-height:1;color:var(--nw-ink)}.dims{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.dim{border:1px solid var(--nw-border);border-radius:14px;padding:12px;background:var(--nw-paper)}.dim b{display:block;color:var(--nw-ink)}.dim span{font-size:12px;color:var(--nw-muted)}pre{white-space:pre-wrap;word-break:break-word;background:var(--nw-paper2);border:1px solid var(--nw-border);border-radius:14px;padding:14px;font-size:11px;color:var(--nw-text);max-height:340px;overflow:auto}.fine{font-size:12px;color:var(--nw-muted)}@media(max-width:650px){.dims{grid-template-columns:1fr}.actions .btn{width:100%}.navin{align-items:flex-start}}
`;

function getBand(score:number, answers:Answers){
  const criticalConsequence=(answers.consequence ?? 0)===3;
  const criticalAction=(answers.action ?? 0)>=2;
  const weakAuthority=(answers.authority ?? 0)>=2;
  if ((criticalConsequence && (criticalAction || weakAuthority)) || score>=27) return {name:"CRITICAL",service:"Full Operational Pressure Test",price:"$50,000-$125,000+",className:"critical"};
  if (score>=19) return {name:"RED",service:"Operational Assurance Sprint",price:"$20,000-$35,000",className:"red"};
  if (score>=10) return {name:"AMBER",service:"Architecture Signal Scan",price:"Starting at $7,500",className:"amber"};
  return {name:"GREEN",service:"Internal preparation / optional Architecture Signal Scan",price:"No full engagement indicated by this screen",className:"green"};
}

function makeReceipt(answers:Answers, total:number, dimensions:Record<string,number>, band:ReturnType<typeof getBand>){
  const id=`NW-TRIAGE-${Date.now().toString(36).toUpperCase()}`;
  const lines=[
    `NULLWORKS AI ASSURANCE TRIAGE RECEIPT`,
    `Receipt: ${id}`,
    `Instrument: ${VERSION}`,
    `Generated: ${new Date().toISOString()}`,
    `Result: ${band.name}`,
    `Recommended next step: ${band.service}`,
    `Published range: ${band.price}`,
    `Total screen score: ${total} / ${questions.length*3}`,
    ``,
    `DIMENSIONS`,
    ...Object.entries(dimensions).map(([k,v])=>`${k}: ${v}`),
    ``,
    `ANSWERS`,
    ...questions.map(q=>`${q.id}: ${answers[q.id] ?? "UNANSWERED"}`),
    ``,
    `TRUTH BOUNDARY`,
    `This is a preliminary self-guided operational-assurance triage. It is not certification, legal advice, regulatory approval, a security penetration test, or a complete independent assurance engagement.`
  ];
  return lines.join("\n");
}

export default function TriagePage(){
  const [answers,setAnswers]=useState<Answers>({});
  const [index,setIndex]=useState(0);
  const [done,setDone]=useState(false);

  useEffect(()=>{
    try{
      const saved=window.localStorage.getItem(STORAGE_KEY);
      if(saved){const parsed=JSON.parse(saved);if(parsed.answers)setAnswers(parsed.answers);if(Number.isInteger(parsed.index))setIndex(Math.min(parsed.index,questions.length-1));}
    }catch{}
  },[]);

  useEffect(()=>{
    if(!done) window.localStorage.setItem(STORAGE_KEY,JSON.stringify({answers,index,version:VERSION}));
  },[answers,index,done]);

  const q=questions[index];
  const total=useMemo(()=>Object.values(answers).reduce((a,b)=>a+b,0),[answers]);
  const dimensions=useMemo(()=>{
    const result:Record<string,number>={};
    for(const question of questions) result[question.domain]=(result[question.domain]??0)+(answers[question.id]??0);
    return result;
  },[answers]);
  const band=getBand(total,answers);
  const receipt=useMemo(()=>makeReceipt(answers,total,dimensions,band),[answers,total,dimensions,band.name,band.service,band.price]);
  const progress=done?100:Math.round(((index+(answers[q.id]!==undefined?1:0))/questions.length)*100);

  function select(value:number){setAnswers(a=>({...a,[q.id]:value}));}
  function next(){if(answers[q.id]===undefined)return;if(index<questions.length-1)setIndex(i=>i+1);else setDone(true);}
  function reset(){setAnswers({});setIndex(0);setDone(false);window.localStorage.removeItem(STORAGE_KEY);}
  async function copyReceipt(){await navigator.clipboard.writeText(receipt);}
  function downloadReceipt(){const blob=new Blob([receipt],{type:"text/plain;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`NULLWORKS-Triage-${band.name}.txt`;a.click();URL.revokeObjectURL(url);}
  const mailto=`mailto:nullworks.neuraxis@gmail.com?subject=${encodeURIComponent("I'm interested in NULLWORKS Triage")}&body=${encodeURIComponent("I completed the NULLWORKS self-guided triage.\n\n"+receipt)}`;

  return <main>
    <style dangerouslySetInnerHTML={{__html:styles}} />
    <header className="nav"><div className="wrap navin"><a className="brand" href="/assurance">NULLWORKS / Triage</a><CommercialThemeToggle /></div></header>
    <section className="hero"><div className="wrap"><span className="eyebrow">Self-guided operational assurance</span><h1>Find the smallest honest next step.</h1><p className="lead">This screen checks claim exposure, consequence, human authority, evidence custody, completion truth, correction, testing maturity, and commercial urgency. It does not manufacture a sales emergency.</p><div className="truth">Your answers remain in this browser until you explicitly copy, download, or email the receipt. No questionnaire answers are automatically transmitted to NULLWORKS.</div></div></section>
    <section className="main"><div className="wrap">
      {!done ? <>
        <div className="meta"><span>{index+1} of {questions.length}</span><span>{progress}% complete</span></div><div className="progress"><span style={{width:`${progress}%`}} /></div>
        <article className="card"><div className="domain">{q.domain}</div><h2>{q.prompt}</h2><p className="help">{q.help}</p><div className="choices">{q.choices.map(c=><button key={c.label} type="button" className={`choice ${answers[q.id]===c.value?"selected":""}`} onClick={()=>select(c.value)}><span className="radio" aria-hidden="true"/><span>{c.label}</span></button>)}</div>
          <div className="actions"><button className="btn" disabled={index===0} onClick={()=>setIndex(i=>Math.max(0,i-1))}>Back</button><button className="btn primary" disabled={answers[q.id]===undefined} onClick={next}>{index===questions.length-1?"See triage result":"Continue"}</button></div>
        </article>
      </> : <article className="card result">
        <div className={`band ${band.className}`}>{band.name} triage result</div><div className="score">{total}<span style={{fontSize:18}}> / {questions.length*3}</span></div><h2>{band.service}</h2><p className="help">Published service range: <b>{band.price}</b>. Final scope is determined after human review of the actual system and evidence.</p>
        <div className="dims">{Object.entries(dimensions).map(([k,v])=><div className="dim" key={k}><b>{k}</b><span>Screen score: {v}</span></div>)}</div>
        <h3>Receipt preview</h3><pre>{receipt}</pre>
        <div className="actions"><button className="btn" onClick={copyReceipt}>Copy receipt</button><button className="btn" onClick={downloadReceipt}>Download receipt</button><a className="btn primary" href={mailto}>Email NULLWORKS</a><button className="btn" onClick={reset}>Start over</button></div>
        <p className="fine">This is a preliminary self-guided operational-assurance triage. It is not certification, legal advice, regulatory approval, a security penetration test, or a complete independent assurance engagement.</p>
      </article>}
    </div></section>
  </main>
}
