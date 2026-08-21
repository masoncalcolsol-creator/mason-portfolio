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

const sections = [
  ["THE ENDPOINT BECOMES THE EVIDENCE", "Most fictional bands are built forward: invent the young band, then imagine what it becomes. 9 VOLT was built in reverse. We began with the band already fully formed in 1982. VEX LIKES SEX established the mature identity first: loud, crude, confident, funny, imperfect, and recognizably its own thing. Only then did the real experiment begin: what must this band have sounded like before it became this?"],
  ["EVOLUTION THROUGH SUBTRACTION", "Working backward turns the 1982 record into evidence. If a vocal habit, guitar sound, lyrical attitude, or compositional instinct clearly exists here, the earlier records have to explain where it came from. Moving backward means deliberately removing experience, technology, confidence, and polish without removing the band's identity. The younger 9 VOLT should sound less capable, not like a different band."],
  ["HISTORY AS A CONSTRAINT", "As the discography retreats through the late 1970s and toward the early 1970s, historical limits matter more. The musicians cannot use ideas, equipment, production techniques, or genre assumptions simply because we know they will exist later. Eventually the project reaches a period when heavy metal itself is still being discovered from separate ingredients: amplification, distortion, blues, psychedelic music, classical harmony, feedback, unrest, and the physical sensation of volume."],
  ["REVERSE INFLUENCE", "The method can keep moving upstream. Once a mature 9 VOLT composition exists, older musical sources can be created to explain parts of its DNA. A riff can have begun as another instrument. A vocal melody can descend from an older melodic phrase. The aim is not merely to make music that sounds old. It is to create causality: older source to young 9 VOLT interpretation to mature 9 VOLT composition to later descendants."],
  ["THE TEST", "The goal is simple: begin with a fully formed heavy-rock band in 1982, move backward through the late 1970s and into the early 1970s, and remove knowledge while preserving identity. Then play the records in chronological order. If the experiment works, a discography written backward should sound as though it developed forward. The test is not whether several historical styles can be imitated. The test is whether the manufactured past is convincing enough that 1982 sounds inevitable."],
];

export default function Page(){
  const [active,setActive]=useState<number|null>(null);
  const refs=useRef<Record<number,HTMLAudioElement|null>>({});
  const total=useMemo(()=>tracks.length,[]);
  const play=(i:number)=>{Object.entries(refs.current).forEach(([k,a])=>{if(Number(k)!==i&&a)a.pause()});setActive(i)};
  return <main style={{minHeight:"100vh",background:"#090909",color:"#f2f0ea",fontFamily:"Arial,Helvetica,sans-serif",padding:"20px 14px 72px"}}>
    <div style={{maxWidth:760,margin:"0 auto"}}>
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
      <section style={{marginTop:42,padding:"28px 6px 10px",borderTop:"1px solid #2c2c2c"}}>
        <div style={{fontSize:11,letterSpacing:3,color:"#8f8a81"}}>PROJECT NOTE // REVERSE DISCOGRAPHY</div>
        <h2 style={{fontSize:"clamp(30px,8vw,52px)",lineHeight:1,margin:"10px 0 10px",letterSpacing:-1.5}}>WRITING HISTORY BACKWARDS</h2>
        <p style={{fontSize:18,lineHeight:1.6,color:"#d1ccc2",margin:"0 0 28px",maxWidth:680}}>9 VOLT was created with the intention of moving backward from 1982 toward the early 1970s. Instead of asking where the band goes next, the project asks what earlier versions of the band must have existed for this record to become possible.</p>
        <div style={{display:"grid",gap:24}}>{sections.map(([title,body])=><article key={title}>
          <h3 style={{fontSize:15,letterSpacing:1.5,color:"#d8a15d",margin:"0 0 8px"}}>{title}</h3>
          <p style={{fontSize:15,lineHeight:1.72,color:"#bdb8ae",margin:0}}>{body}</p>
        </article>)}</div>
        <blockquote style={{margin:"30px 0 4px",padding:"18px 20px",borderLeft:"3px solid #d8a15d",background:"#111",fontSize:18,lineHeight:1.55,color:"#e5dfd3"}}>A discography written backward should sound as though it developed forward. The manufactured past succeeds only if 1982 eventually sounds inevitable.</blockquote>
      </section>
      <footer style={{marginTop:30,padding:"18px 6px",borderTop:"1px solid #242424",fontSize:12,color:"#777",lineHeight:1.6}}>UNLISTED PREVIEW // Direct audio served from the original Suno render IDs. Sequence locked for album auditioning.</footer>
    </div>
  </main>
}
