"use client";

import { useMemo, useRef, useState } from "react";

const tracks = [
  {n:1,title:"VEX LIKES SEX",id:"e94b9e42-a787-460a-920e-05b29eb23289",dur:"4:43"},
  {n:2,title:"DRUM UP ANOTHER",id:"24fa4a54-3515-4b59-9068-d32adb7411ac",dur:"4:26"},
  {n:3,title:"LAST NIGHT ON EARTH",id:"847f6882-5384-409f-afc5-7f8cccfd5809",dur:"5:22"},
  {n:4,title:"THE MONEY SHOT",id:"6066bdcd-7ba3-4b37-91cb-73fc3367fcc7",dur:"5:10"},
  {n:5,title:"WHAT CITY IS THIS?",id:"08b14cff-c0a2-4b0b-95ba-a253ad4defde",dur:"4:48"},
  {n:6,title:"FUCK THE LABEL",id:"ef4303cc-0f80-491a-9524-cada13302e65",dur:"4:44"},
  {n:7,title:"WHERE'S MY CAT?",id:"d95456f7-1731-4491-8c11-980e87a715bb",dur:"5:00"},
  {n:8,title:"VIDEO KILLED NOTHING",id:"3b943ba2-c828-4ff2-bc63-8a82763c99e8",dur:"5:03"},
  {n:9,title:"SHIT SANDWICH",id:"c7865abe-1d60-46c4-b569-dff1ac09fd75",dur:"4:26"},
  {n:10,title:"THE ROOM BEHIND THE SUN",id:"4b5d07a8-15cb-4d88-b460-4dd274e62920",dur:"5:33"},
  {n:11,title:"LET THE BASS PLAYER WRITE IT",id:"6cc04acd-103e-4aff-aef4-ac7c22ac3505",dur:"4:18"},
].map(t=>({...t,audio:`https://cdn1.suno.ai/${t.id}.mp3`,art:`https://cdn2.suno.ai/image_${t.id}.jpeg`}));

export default function Page(){
  const [active,setActive]=useState<number|null>(null);
  const refs=useRef<Record<number,HTMLAudioElement|null>>({});
  const total=useMemo(()=>tracks.length,[]);
  const play=(i:number)=>{Object.entries(refs.current).forEach(([k,a])=>{if(Number(k)!==i&&a)a.pause()});setActive(i)};
  return <main style={{minHeight:"100vh",background:"#090909",color:"#f2f0ea",fontFamily:"Arial,Helvetica,sans-serif",padding:"20px 14px 72px"}}>
    <div style={{maxWidth:760,margin:"0 auto"}}>
      <div style={{padding:"10px 6px 20px"}}>
        <img src="/9v/vex-likes-sex-cover.jpg" alt="9 VOLT - Vex Likes Sex, 1982 album cover" style={{display:"block",width:"100%",height:"auto",aspectRatio:"1 / 1",objectFit:"cover",borderRadius:18,border:"1px solid #2a2723",boxShadow:"0 20px 60px rgba(0,0,0,.55)"}}/>
      </div>
      <header style={{padding:"22px 6px 18px",borderBottom:"1px solid #242424"}}>
        <div style={{fontSize:12,letterSpacing:3,color:"#a8a39a"}}>NULLWORKS // ANVIL // 9 VOLT</div>
        <h1 style={{fontSize:"clamp(38px,11vw,72px)",lineHeight:.95,margin:"10px 0 8px",letterSpacing:-2}}>VEX LIKES SEX</h1>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",fontSize:13,color:"#aaa69e"}}><span>1982</span><span>•</span><span>{total} tracks</span><span>•</span><span>public unlisted preview</span></div>
        <p style={{margin:"18px 0 0",color:"#c5c0b6",lineHeight:1.55,maxWidth:620}}>Peak-era 9V. Play it in the intended CD order. The weird organ trip stays near the end. The bassist gets the last word because nobody had the energy to stop him.</p>
      </header>
      <section style={{display:"grid",gap:12,marginTop:18}}>
        {tracks.map((t,i)=><article key={t.id} style={{display:"grid",gridTemplateColumns:"64px 1fr",gap:12,background:active===i?"#17130f":"#111",border:"1px solid #242424",borderRadius:14,padding:12,boxShadow:active===i?"0 0 0 1px #5b4630 inset":"none"}}>
          <img src={t.art} alt="" style={{width:64,height:64,borderRadius:10,objectFit:"cover",background:"#1d1d1d"}}/>
          <div style={{minWidth:0}}>
            <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"baseline"}}><div style={{fontWeight:800,fontSize:15,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}><span style={{color:"#777",marginRight:9,fontVariantNumeric:"tabular-nums"}}>{String(t.n).padStart(2,"0")}</span>{t.title}</div><span style={{fontSize:12,color:"#7f7a72"}}>{t.dur}</span></div>
            <audio ref={el=>{refs.current[i]=el}} onPlay={()=>play(i)} onEnded={()=>{if(i<tracks.length-1){const next=refs.current[i+1];if(next){next.play();setActive(i+1)}}}} controls preload="metadata" src={t.audio} style={{width:"100%",marginTop:10,height:38}}/>
          </div>
        </article>)}
      </section>
      <footer style={{marginTop:24,padding:"18px 6px",borderTop:"1px solid #242424",fontSize:12,color:"#777",lineHeight:1.6}}>UNLISTED PREVIEW // Direct audio served from the original Suno render IDs. Sequence locked for album auditioning. // DEPLOY MARKER 2026-08-21</footer>
    </div>
  </main>
}
