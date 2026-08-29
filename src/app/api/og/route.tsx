import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "NULLWORKS").slice(0, 100);
  const description = (searchParams.get("description") || "Governed architecture for consequential systems.").slice(0, 240);
  const kicker = (searchParams.get("kicker") || "NULLWORKS // GOVERNED SYSTEMS").slice(0, 80);
  const accent = searchParams.get("accent") || "#78e6d2";

  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"64px 72px",background:"linear-gradient(145deg,#05070b,#0b1320 70%,#07100f)",color:"#f4f1e9",fontFamily:"Arial, sans-serif"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:22,fontWeight:800,letterSpacing:4}}>
        <div>NULLWORKS</div><div style={{color:accent}}>SYSTEMS // ARCHITECTURE</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",maxWidth:1020}}>
        <div style={{fontSize:20,letterSpacing:5,fontWeight:800,color:accent,marginBottom:22}}>{kicker}</div>
        <div style={{fontSize:title.length>48?58:72,lineHeight:1.02,fontWeight:900,letterSpacing:-2}}>{title}</div>
        <div style={{fontSize:27,lineHeight:1.35,color:"#b9c0c8",marginTop:26,maxWidth:1000}}>{description}</div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:19,color:"#89929d",letterSpacing:2}}><div>ARCHITECTURE BEFORE AUTONOMY.</div><div>nullworks.systems</div></div>
    </div>,
    { width: 1200, height: 630 }
  );
}
