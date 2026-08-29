"use client";

import { useRef, useState } from "react";

export type ListeningTrack = { n:number; title:string; id:string; dur:string; note?:string };

export default function ListeningPage({
  title,
  eyebrow,
  description,
  accent,
  background,
  tracks,
  footer,
}: {
  title:string;
  eyebrow:string;
  description:string;
  accent:string;
  background:string;
  tracks:ListeningTrack[];
  footer?:string;
}) {
  const [active,setActive]=useState<number|null>(null);
  const refs=useRef<Record<number,HTMLAudioElement|null>>({});
  const play=(i:number)=>{
    Object.entries(refs.current).forEach(([k,a])=>{if(Number(k)!==i&&a)a.pause()});
    setActive(i);
  };

  return <section style={{minHeight:"100vh",background,color:"#f4f1e9",padding:"22px 14px 72px",fontFamily:"Arial,Helvetica,sans-serif"}}>
    <div style={{maxWidth:760,margin:"0 auto"}}>
      <header style={{padding:"26px 6px 24px",borderBottom:"1px solid #ffffff18"}}>
        <div style={{fontSize:11,letterSpacing:3,fontWeight:900,color:accent}}>{eyebrow}</div>
        <h1 style={{fontSize:"clamp(42px,11vw,78px)",lineHeight:.92,margin:"10px 0 12px",letterSpacing:-2}}>{title}</h1>
        <p style={{margin:0,maxWidth:650,color:"#c7c2b9",lineHeight:1.6,fontSize:16}}>{description}</p>
      </header>

      <div style={{display:"grid",gap:12,marginTop:18}}>
        {tracks.map((t,i)=><article key={t.id} style={{display:"grid",gridTemplateColumns:"72px 1fr",gap:13,background:active===i?"#ffffff10":"#ffffff08",border:`1px solid ${active===i?accent+"88":"#ffffff14"}`,borderRadius:18,padding:12}}>
          <div aria-hidden style={{width:72,height:72,borderRadius:14,display:"grid",placeItems:"center",background:`linear-gradient(145deg,${accent}33,#0008)`,border:`1px solid ${accent}66`,color:accent,fontWeight:950,fontSize:24,letterSpacing:-1}}>{String(t.n).padStart(2,"0")}</div>
          <div style={{minWidth:0}}>
            <div style={{display:"flex",justifyContent:"space-between",gap:8,alignItems:"baseline"}}>
              <div style={{fontWeight:900,fontSize:15,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.title}</div>
              <span style={{fontSize:11,color:"#8f8a83",flex:"0 0 auto"}}>{t.dur}</span>
            </div>
            {t.note&&<div style={{fontSize:12,lineHeight:1.4,color:"#aaa59c",marginTop:5}}>{t.note}</div>}
            <audio
              ref={el=>{refs.current[i]=el}}
              onPlay={()=>play(i)}
              onEnded={()=>{if(i<tracks.length-1){const next=refs.current[i+1];if(next){next.play();setActive(i+1)}}}}
              controls
              preload="metadata"
              src={`/api/audio/${t.id}`}
              style={{width:"100%",height:38,marginTop:9}}
            />
          </div>
        </article>)}
      </div>
      {footer&&<footer style={{padding:"32px 6px 6px",fontSize:11,letterSpacing:1.6,color:"#77716a",lineHeight:1.7}}>{footer}</footer>}
    </div>
  </section>
}
