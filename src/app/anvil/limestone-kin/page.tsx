import type {Metadata} from "next";
import AnvilShell from "../AnvilShell";
import ListeningPage from "../ListeningPage";
const base="https://foveyfclihpsnwhfchib.supabase.co/storage/v1/object/public/anvil-media/limestone-kin";
const coverSrc=`${base}/cover.png`;
const tracks=[{
  n:1,
  title:"THE HILLS STILL KNOW",
  src:`${base}/01-the-hills-still-know.mp3`,
  dur:"4:48",
  note:"V1.2 master. Porch light, limestone ridge, the hills keep the rest."
}];
export const metadata:Metadata={
  title:"LIMESTONE KIN — THE HILLS STILL KNOW | NULLWORKS // ANVIL",
  description:"Limestone Kin. One night song from the ridge: church light, two guitars, and the hills that still know.",
  alternates:{canonical:"/anvil/limestone-kin"},
  openGraph:{
    title:"LIMESTONE KIN — THE HILLS STILL KNOW",
    description:"Porch-light hill-country song preserved by NULLWORKS // ANVIL.",
    url:"https://nullworks.systems/anvil/limestone-kin",
    siteName:"NULLWORKS // ANVIL",
    type:"music.song",
    images:[{url:coverSrc,width:1400,height:1400,alt:"LIMESTONE KIN — THE HILLS STILL KNOW"}]
  },
  twitter:{card:"summary_large_image",title:"LIMESTONE KIN — THE HILLS STILL KNOW",description:"Porch-light hill-country song.",images:[coverSrc]}
};
export default function Page(){
  return <AnvilShell accent="#c4a36a"><ListeningPage title="LIMESTONE KIN" eyebrow="THE HILLS STILL KNOW // V1.2" description="One song from limestone country. Church on the ridge. Two guitars on the porch. The hills still know what the town put down." accent="#c4a36a" background="linear-gradient(180deg,#0b0d12,#090a0c 50%,#050505)" coverSrc={coverSrc} tracks={tracks} footer="LIMESTONE KIN // THE HILLS STILL KNOW // NULLWORKS // ANVIL"/></AnvilShell>;
}
