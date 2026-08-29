"use client";
import {useState} from "react";
import AnvilShell from "../../AnvilShell";
const endpoint="https://foveyfclihpsnwhfchib.supabase.co/functions/v1/anvil-nan-wisdom-upload";
const tracks=[
 {title:"MIND YOUR MANNERS",keys:["mind your manners"]},
 {title:"MAKE YOUR BED",keys:["make your bed"]},
 {title:"DO YOUR CHORES",keys:["do your chores"]},
 {title:"THEY'RE YOUR PET",keys:["they re your pet","theyre your pet","your pet"]},
 {title:"PACK IT TONIGHT",keys:["pack it tonight"]},
 {title:"TELL THE TRUTH",keys:["tell the truth"]},
 {title:"BE A GOOD FRIEND",keys:["be a good friend","good friend"]},
 {title:"TRY AGAIN",keys:["try again"]},
 {title:"READ SOMETHING",keys:["read something"]},
 {title:"WHERE'S YOUR JUMPER?",keys:["where s your jumper","wheres your jumper","your jumper"]},
];
function norm(s:string){return s.toLowerCase().replace(/\.mp3$/i,"").replace(/\([^)]*\)/g," ").replace(/[_'’]+/g," ").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ")}
function match(name:string){const n=norm(name);return tracks.find(t=>t.keys.some(k=>n.includes(norm(k))))}
const wait=(ms:number)=>new Promise(r=>setTimeout(r,ms));
async function send(f:File){let last="";for(let attempt=1;attempt<=3;attempt++){try{const fd=new FormData();fd.append("file",f);const r=await fetch(endpoint,{method:"POST",body:fd});last=await r.text();if(r.ok)return {ok:true,text:last};if(r.status<500)return {ok:false,text:last};}catch(e){last=String(e)}if(attempt<3)await wait(700*attempt)}return {ok:false,text:last||"upload failed"}}
export default function Page(){const [status,setStatus]=useState<string[]>([]);const [busy,setBusy]=useState(false);async function upload(files:FileList|null){if(!files)return;setBusy(true);const chosen=[...files].filter(f=>f.name.toLowerCase().endsWith(".mp3"));const out:string[]=[];const found=new Set<string>();for(const f of chosen){const t=match(f.name);if(!t){out.push(`SKIP  ${f.name}`);setStatus([...out]);continue}found.add(t.title);out.push(`SEND  ${t.title}`);setStatus([...out]);const result=await send(f);out[out.length-1]=`${result.ok?"OK":"FAIL"}  ${t.title}${result.ok?"":` — ${result.text.slice(0,100)}`}`;setStatus([...out])}for(const t of tracks)if(!found.has(t.title))out.push(`NOT SELECTED  ${t.title}`);setStatus([...out]);setBusy(false)}return <AnvilShell accent="#f4a8bf"><main style={{minHeight:"100vh",background:"#0d1119",color:"#f4f1e9",padding:"44px 20px",fontFamily:"Arial,sans-serif"}}><div style={{maxWidth:680,margin:"0 auto"}}><div style={{fontSize:11,letterSpacing:3,color:"#f4a8bf",fontWeight:900}}>ANVIL // MEDIA INGEST</div><h1 style={{fontSize:"clamp(38px,10vw,68px)",margin:"12px 0"}}>NAN WISDOM</h1><p style={{color:"#bbb",lineHeight:1.6}}>Select the missing MP3s or all ten again. Existing masters are safely overwritten with the same canonical file. Android filename mutations are ignored, and failed network requests retry automatically.</p><label style={{display:"block",marginTop:28,border:"1px solid #f4a8bf88",borderRadius:16,padding:24,textAlign:"center",fontWeight:900,color:"#f4a8bf"}}>{busy?"UPLOADING — KEEP THIS PAGE OPEN":"SELECT MP3s"}<input disabled={busy} type="file" accept="audio/mpeg,.mp3" multiple onChange={e=>upload(e.target.files)} style={{display:"none"}}/></label><pre style={{whiteSpace:"pre-wrap",fontSize:12,lineHeight:1.8,color:"#aaa",marginTop:24}}>{status.join("\n")}</pre></div></main></AnvilShell>}
