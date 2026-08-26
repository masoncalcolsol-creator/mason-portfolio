"use client";

import { useMemo, useRef, useState } from "react";

const tracks = [
  {n:1,title:"TERRA RESPIRAT",id:"b66f0d59-359a-4ad1-a762-607731d5e87e",dur:"3:20"},
  {n:2,title:"FERRUM IN MONTE",id:"b54a3b96-40f9-42e3-837e-f50d3930c120",dur:"2:44"},
  {n:3,title:"SILVA CADIT",id:"ecac1a7e-d27d-487d-ad27-a21e6311b6a6",dur:"2:44"},
  {n:4,title:"FLUMEN CAPTUM",id:"12baab79-8c17-4594-9ba4-5e05a6f89820",dur:"2:13"},
  {n:5,title:"FUMUS SUPER URBEM",id:"69553b1e-c738-4c61-8d73-0e0a918227f2",dur:"3:35"},
  {n:6,title:"HOMO MORBUS",id:"7a88807f-2564-493b-a40f-41d1533847d9",dur:"2:59"},
  {n:7,title:"TERRA SUB PONDERE",id:"1ed26a6e-9d18-410d-b290-d6dc267668fb",dur:"3:59"},
  {n:8,title:"CARO MACHINAE",id:"cc1f0478-4e00-48dc-8a86-c8a52f33c411",dur:"5:04"},
  {n:9,title:"LUX SINE SOLE",id:"9e054a4a-18b2-4f57-b987-db7512a63836",dur:"3:33"},
  {n:10,title:"ULTIMA TURBA",id:"9f5d8518-349f-4ce2-b329-8bab945eb6b6",dur:"3:28"},
  {n:11,title:"TERRA MEMINIT",id:"4e0717af-2fe4-42a6-a506-2f7bfb6fbe26",dur:"3:21"},
  {n:12,title:"TERRA MANET",id:"4e564049-60fe-45a1-8c75-8cb889879419",dur:"3:18"},
].map(t=>({...t,audio:`https://cdn1.suno.ai/${t.id}.mp3`,art:`https://cdn2.suno.ai/image_${t.id}.jpeg`}));

const sections = [
  ["THE WORLD BEFORE THE MACHINE", "NON OPERA ITALICA begins with the Earth as an active system rather than a backdrop. TERRA RESPIRAT establishes soil, water, roots, stone and darkness before industrial civilization begins cutting into them. The opera then follows extraction outward: iron from the mountain, forest removal, controlled rivers and smoke accumulating above the city."],
  ["THE DIAGNOSIS", "HOMO MORBUS is the hinge. Humanity is no longer described as an observer or even merely as a destructive force. It is treated clinically as a spreading condition inside a larger body. The orchestra behaves accordingly: low motifs reproduce, dissonance accumulates, and the distinction between organism and machine begins to collapse."],
  ["FLESH BECOMES INPUT", "TERRA SUB PONDERE and CARO MACHINAE push the same industrial logic onto human beings. Labor, breath, time and flesh become interchangeable inputs. CARNIFICINA moves between subterranean contralto and anguished operatic rupture while organ, tuba, bass trombone, contrabassoon and low strings turn the orchestra itself into machinery."],
  ["THE HUMAN SIGNAL FADES", "By LUX SINE SOLE the industrial system has colonized the natural cycle itself. ULTIMA TURBA then removes the crowd. The voice becomes scarcer, the machinery loses purpose, and civilization begins to empty without receiving a heroic ending or a final judgment."],
  ["THE EARTH REMAINS", "TERRA MEMINIT and TERRA MANET close the cycle without revenge. The Earth remembers, changes, covers, erodes and continues. The final movement progressively removes the industrial orchestra until Carnificina disappears and the work returns to the elemental vocabulary with which it began: water, roots, wind, stone and time."],
];

export default function Page(){
  const [active,setActive]=useState<number|null>(null);
  const refs=useRef<Record<number,HTMLAudioElement|null>>({});
  const total=useMemo(()=>tracks.length,[]);
  const play=(i:number)=>{Object.entries(refs.current).forEach(([k,a])=>{if(Number(k)!==i&&a)a.pause()});setActive(i)};
  return <main style={{minHeight:"100vh",background:"#090909",color:"#f2f0ea",fontFamily:"Arial,Helvetica,sans-serif",padding:"20px 14px 72px"}}>
    <div style={{maxWidth:760,margin:"0 auto"}}>
      <header style={{padding:"22px 6px 18px",borderBottom:"1px solid #242424"}}>
        <div style={{fontSize:12,letterSpacing:3,color:"#a8a39a"}}>NULLWORKS // ANVIL // CARNIFICINA</div>
        <h1 style={{fontSize:"clamp(38px,11vw,72px)",lineHeight:.95,margin:"10px 0 8px",letterSpacing:-2}}>NON OPERA ITALICA</h1>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",fontSize:13,color:"#aaa69e"}}><span>c. 1890</span><span>•</span><span>{total} movements</span><span>•</span><span>public unlisted preview</span></div>
        <p style={{margin:"18px 0 0",color:"#c5c0b6",lineHeight:1.55,maxWidth:650}}>A Latin-language industrial doom opera for CARNIFICINA, pipe organ and low orchestra. Play it in order. The Earth breathes, industry arrives, humanity becomes material, the human signal disappears, and the Earth remains.</p>
      </header>
      <section style={{display:"grid",gap:12,marginTop:18}}>
        {tracks.map((t,i)=><article key={t.id} style={{display:"grid",gridTemplateColumns:"64px 1fr",gap:12,background:active===i?"#121714":"#111",border:"1px solid #242424",borderRadius:14,padding:12,boxShadow:active===i?"0 0 0 1px #3d5a48 inset":"none"}}>
          <img src={t.art} alt="" style={{width:64,height:64,borderRadius:10,objectFit:"cover",background:"#1d1d1d"}}/>
          <div style={{minWidth:0}}>
            <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"baseline"}}><div style={{fontWeight:800,fontSize:15,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}><span style={{color:"#777",marginRight:9,fontVariantNumeric:"tabular-nums"}}>{String(t.n).padStart(2,"0")}</span>{t.title}</div><span style={{fontSize:12,color:"#7f7a72"}}>{t.dur}</span></div>
            <audio ref={el=>{refs.current[i]=el}} onPlay={()=>play(i)} onEnded={()=>{if(i<tracks.length-1){const next=refs.current[i+1];if(next){next.play();setActive(i+1)}}}} controls preload="metadata" src={t.audio} style={{width:"100%",marginTop:10,height:38}}/>
          </div>
        </article>)}
      </section>
      <section style={{marginTop:42,padding:"28px 6px 10px",borderTop:"1px solid #2c2c2c"}}>
        <div style={{fontSize:11,letterSpacing:3,color:"#8f8a81"}}>PROJECT NOTE // INDUSTRIAL DOOM OPERA</div>
        <h2 style={{fontSize:"clamp(30px,8vw,52px)",lineHeight:1,margin:"10px 0 10px",letterSpacing:-1.5}}>THE EARTH DOES NOT NEED A CURTAIN CALL</h2>
        <p style={{fontSize:18,lineHeight:1.6,color:"#d1ccc2",margin:"0 0 28px",maxWidth:680}}>NON OPERA ITALICA is a fictional late-nineteenth-century Latin doom opera about industrialization told at geological scale. Its central voice, CARNIFICINA, is not a conventional heroine. She is witness, agony, memory and eventually absence.</p>
        <div style={{display:"grid",gap:24}}>{sections.map(([title,body])=><article key={title}>
          <h3 style={{fontSize:15,letterSpacing:1.5,color:"#90b49b",margin:"0 0 8px"}}>{title}</h3>
          <p style={{fontSize:15,lineHeight:1.72,color:"#bdb8ae",margin:0}}>{body}</p>
        </article>)}</div>
        <blockquote style={{margin:"30px 0 4px",padding:"18px 20px",borderLeft:"3px solid #90b49b",background:"#111",fontSize:18,lineHeight:1.55,color:"#e5dfd3"}}>Terra respirat. Terra meminit. Terra manet.</blockquote>
      </section>
      <footer style={{marginTop:30,padding:"18px 6px",borderTop:"1px solid #242424",fontSize:12,color:"#777",lineHeight:1.6}}>UNLISTED PREVIEW // Direct audio served from the original Suno render IDs. Canonical sequence locked for album auditioning.</footer>
    </div>
  </main>
}
