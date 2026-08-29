"use client";

import { useRef, useState } from "react";

const tracks = [
  {n:1,title:"MIND YOUR MANNERS",id:"cc5f0653-5723-4ef0-86a4-a59c4c55bce6",dur:"2:40",lesson:"Manners are how you show people they matter."},
  {n:2,title:"MAKE YOUR BED",id:"b882c16b-d877-4711-acf2-6d12bf0408e7",dur:"3:03",lesson:"Start the day with one small job already done."},
  {n:3,title:"DO YOUR CHORES",id:"89d32cb0-4190-4fed-8e36-669839b7318e",dur:"2:36",lesson:"If you live there, you help there."},
  {n:4,title:"THEY'RE YOUR PET",id:"b225e251-f999-438e-b843-e0b505423df1",dur:"3:51",lesson:"Gentle hands, fresh water, and your job gets done."},
  {n:5,title:"PACK IT TONIGHT",id:"e75a1e56-29a4-45fd-ad06-5b553c843c3d",dur:"3:46",lesson:"Tomorrow morning is easier when tonight-you helps."},
  {n:6,title:"TELL THE TRUTH",id:"b2158bdb-5393-4b43-beef-0c6e646c3d32",dur:"3:41",lesson:"Own the mistake, fix what you can, and carry on."},
  {n:7,title:"BE A GOOD FRIEND",id:"4be55941-72f4-4951-83a1-6822be926269",dur:"3:58",lesson:"Notice people. Include people. Don't join in with cruelty."},
  {n:8,title:"TRY AGAIN",id:"3333e2ec-be58-4646-ab64-4a7d80361fde",dur:"3:33",lesson:"Stop, think, ask for help, and have another go."},
  {n:9,title:"READ SOMETHING",id:"c51b44e1-4cd0-4dac-b729-5ed9a8ff29e5",dur:"3:36",lesson:"Curiosity starts wherever you decide to open something."},
  {n:10,title:"WHERE'S YOUR JUMPER?",id:"a34f52f3-1847-483b-8ea2-0e6f27418da5",dur:"3:40",lesson:"Put your things away and tomorrow-you will be grateful."},
].map(t=>({...t,audio:`https://cdn1.suno.ai/${t.id}.mp3`,art:`https://cdn2.suno.ai/image_${t.id}.jpeg`}));

function Cover(){
  return <div style={{position:"relative",aspectRatio:"1",overflow:"hidden",borderRadius:28,background:"linear-gradient(155deg,#f8a9c5 0%,#f6c98b 42%,#8ac6d1 100%)",boxShadow:"0 28px 70px #0008",border:"1px solid #ffffff55"}}>
    <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 72% 20%,#fff9 0 8%,transparent 9%),linear-gradient(180deg,transparent 55%,#20374a66 56% 100%)"}}/>
    <div style={{position:"absolute",left:"8%",top:"8%",right:"8%",textAlign:"center",color:"#172231",textShadow:"0 2px #fff8"}}>
      <div style={{fontSize:"clamp(10px,3vw,15px)",fontWeight:900,letterSpacing:4}}>NULLWORKS // ANVIL PRESENTS</div>
      <div style={{fontFamily:"Georgia,serif",fontWeight:900,fontSize:"clamp(43px,14vw,82px)",lineHeight:.78,letterSpacing:-4,marginTop:18}}>NAN<br/>WISDOM</div>
      <div style={{fontSize:"clamp(10px,3vw,15px)",fontWeight:900,letterSpacing:3,marginTop:18}}>VOLUME ONE</div>
    </div>
    <div style={{position:"absolute",left:"50%",bottom:"12%",transform:"translateX(-50%)",width:"48%",height:"43%"}}>
      <div style={{position:"absolute",left:"31%",top:"0",width:"38%",aspectRatio:"1",borderRadius:"50%",background:"#e3b18d",border:"5px solid #243746",boxShadow:"inset -10px -8px #b97d6e"}}/>
      <div style={{position:"absolute",left:"22%",top:"5%",width:"56%",height:"18%",borderRadius:"70% 70% 30% 30%",background:"#d8d5d0",border:"4px solid #243746"}}/>
      <div style={{position:"absolute",left:"17%",top:"29%",width:"66%",height:"67%",borderRadius:"42% 42% 15% 15%",background:"#744d7c",border:"5px solid #243746",boxShadow:"inset -18px -10px #513758"}}/>
      <div style={{position:"absolute",left:"22%",top:"21%",width:"56%",height:5,background:"#243746",transform:"rotate(-4deg)"}}/>
      <div style={{position:"absolute",left:"10%",top:"49%",width:"30%",height:9,borderRadius:9,background:"#e3b18d",border:"3px solid #243746",transform:"rotate(22deg)"}}/>
      <div style={{position:"absolute",right:"8%",top:"46%",width:"31%",height:9,borderRadius:9,background:"#e3b18d",border:"3px solid #243746",transform:"rotate(-28deg)"}}/>
    </div>
    <div style={{position:"absolute",left:"6%",bottom:"5%",right:"6%",textAlign:"center",fontWeight:900,fontSize:"clamp(11px,3vw,16px)",letterSpacing:2,color:"#fff",textShadow:"0 2px 5px #172231"}}>GOOD BEATS. GOOD LAUGHS. GOOD SENSE.</div>
  </div>
}

export default function Page(){
  const [active,setActive]=useState<number|null>(null);
  const refs=useRef<Record<number,HTMLAudioElement|null>>({});
  const play=(i:number)=>{Object.entries(refs.current).forEach(([k,a])=>{if(Number(k)!==i&&a)a.pause()});setActive(i)};
  return <main style={{minHeight:"100vh",background:"#111722",color:"#f7f1e6",fontFamily:"Arial,Helvetica,sans-serif",padding:"20px 14px 72px"}}>
    <div style={{maxWidth:720,margin:"0 auto"}}>
      <header style={{padding:"12px 0 28px"}}>
        <Cover/>
        <div style={{textAlign:"center",padding:"24px 8px 0"}}>
          <div style={{fontSize:12,letterSpacing:3,color:"#f4b6c9",fontWeight:800}}>NAN WISDOM // VOLUME ONE</div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(36px,10vw,64px)",lineHeight:.98,margin:"9px 0 9px",letterSpacing:-2}}>Good beats.<br/>Good laughs.<br/>Good sense.</h1>
          <p style={{margin:"16px auto 0",maxWidth:560,color:"#cbd0d7",fontSize:16,lineHeight:1.6}}>Ten songs. Ten useful bits of common sense. One very old London grandmother with absolutely no patience for nonsense.</p>
        </div>
      </header>

      <section style={{display:"grid",gap:12}}>
        {tracks.map((t,i)=><article key={t.id} style={{display:"grid",gridTemplateColumns:"72px 1fr",gap:13,background:active===i?"#222b3b":"#171e2a",border:active===i?"1px solid #f4b6c977":"1px solid #ffffff14",borderRadius:18,padding:12,boxShadow:active===i?"0 12px 30px #0005":"none"}}>
          <img src={t.art} alt="" style={{width:72,height:72,borderRadius:13,objectFit:"cover",background:"#293140"}}/>
          <div style={{minWidth:0}}>
            <div style={{display:"flex",justifyContent:"space-between",gap:8,alignItems:"baseline"}}>
              <div style={{fontWeight:900,fontSize:15,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}><span style={{color:"#f4b6c9",marginRight:8,fontVariantNumeric:"tabular-nums"}}>{String(t.n).padStart(2,"0")}</span>{t.title}</div>
              <span style={{fontSize:11,color:"#8f98a8",flex:"0 0 auto"}}>{t.dur}</span>
            </div>
            <div style={{fontSize:12,lineHeight:1.35,color:"#aeb6c2",marginTop:5}}>{t.lesson}</div>
            <audio ref={el=>{refs.current[i]=el}} onPlay={()=>play(i)} onEnded={()=>{if(i<tracks.length-1){const next=refs.current[i+1];if(next){next.play();setActive(i+1)}}}} controls preload="metadata" src={t.audio} style={{width:"100%",height:36,marginTop:8}}/>
          </div>
        </article>)}
      </section>

      <section style={{marginTop:42,padding:"32px 20px",borderRadius:24,background:"#f2d4c2",color:"#202633"}}>
        <div style={{fontSize:11,letterSpacing:3,fontWeight:900,color:"#754f68"}}>WHO IS NAN?</div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(32px,8vw,48px)",lineHeight:1,margin:"9px 0 15px"}}>Nan knows a thing or two.</h2>
        <p style={{fontSize:16,lineHeight:1.65,margin:0}}>Nan Wisdom is a very old London grandmother with very little patience for nonsense. She thinks children are perfectly capable of being kind, responsible, curious little humans. So she made them some songs.</p>
        <p style={{fontSize:14,lineHeight:1.6,margin:"16px 0 0",color:"#5b4d50"}}>Every song contains one useful piece of common sense, stays completely family-friendly, and is built to be something grown-ups can survive hearing in the car more than once. A surprisingly ambitious standard for children's music.</p>
      </section>

      <footer style={{textAlign:"center",padding:"36px 12px 8px",fontSize:11,letterSpacing:2,color:"#788292",lineHeight:1.8}}>NAN WISDOM<br/>A NULLWORKS // ANVIL EXPERIMENT IN FAMILY MUSIC<br/><span style={{color:"#f4b6c9"}}>VOLUME ONE // 2026</span></footer>
    </div>
  </main>
}
