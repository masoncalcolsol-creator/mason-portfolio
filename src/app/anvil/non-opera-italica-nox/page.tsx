import type {Metadata} from "next";
import AnvilShell from "../AnvilShell";
import ListeningPage from "../ListeningPage";
const base="https://foveyfclihpsnwhfchib.supabase.co/storage/v1/object/public/anvil-media/non-opera-italica-nox";
const tracks=[
{n:1,title:"NOX ORITUR",src:`${base}/01-nox-oritur.mp3`,dur:"4:04"},
{n:2,title:"POPULUS INTRAT",src:`${base}/02-populus-intrat.mp3`,dur:"3:58"},
{n:3,title:"LUNA ACCIPIT",src:`${base}/03-luna-accipit.mp3`,dur:"4:44"},
{n:4,title:"LABOR CAECUS",src:`${base}/04-labor-caecus.mp3`,dur:"3:53"},
{n:5,title:"NOX SUPER URBEM",src:`${base}/05-nox-super-urbem.mp3`,dur:"4:33"},
{n:6,title:"LUNA NON VIDET",src:`${base}/06-luna-non-videt.mp3`,dur:"4:58"},
{n:7,title:"FRIGUS OPERIS",src:`${base}/07-frigus-operis.mp3`,dur:"4:14"},
{n:8,title:"ET NOX MANET",src:`${base}/08-et-nox-manet.mp3`,dur:"4:28"}
];
export const metadata:Metadata={
  title:"NOX ACCIPIT | NON OPERA ITALICA // ANVIL",
  description:"Night cycle. Eight movements. Latin industrial doom opera for CARNIFICINA, pipe organ and low orchestra.",
  alternates:{canonical:"/anvil/non-opera-italica-nox"},
  openGraph:{
    title:"NOX ACCIPIT",
    description:"Day dies over the works. The people enter. The moon takes flesh and does not look. Night remains.",
    url:"https://nullworks.systems/anvil/non-opera-italica-nox",
    siteName:"NULLWORKS // ANVIL",
    type:"music.album",
    images:[{url:`${base}/poster.jpg`,width:1152,height:1712,alt:"NOX ACCIPIT teatro poster"}]
  },
  twitter:{card:"summary_large_image",title:"NOX ACCIPIT",description:"NON OPERA ITALICA night cycle. Eight movements.",images:[`${base}/poster.jpg`]}
};
export default function Page(){return <AnvilShell accent="#c4b48a"><ListeningPage title="NOX ACCIPIT" eyebrow="CARNIFICINA // NON OPERA ITALICA NOX" description="Night cycle. Eight movements. Latin. Pipe organ and low orchestra. Day dies over the works. The people enter. The moon takes flesh and does not look. Labor continues without a witness. Night remains." accent="#c4b48a" background="linear-gradient(180deg,#07060a,#080706 52%,#030303)" coverSrc={`${base}/poster.jpg`} coverKind="poster" tracks={tracks} footer="NOX ORITUR. LUNA ACCIPIT. ET NOX MANET. // NULLWORKS // ANVIL"/></AnvilShell>}
