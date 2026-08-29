import AnvilShell from "../AnvilShell";
import ListeningPage from "../ListeningPage";

const tracks=[
{n:1,title:"MIND YOUR MANNERS",id:"cc5f0653-5723-4ef0-86a4-a59c4c55bce6",dur:"2:40",note:"Manners are how you show people they matter."},
{n:2,title:"MAKE YOUR BED",id:"b882c16b-d877-4711-acf2-6d12bf0408e7",dur:"3:03",note:"Start the day with one small job already done."},
{n:3,title:"DO YOUR CHORES",id:"89d32cb0-4190-4fed-8e36-669839b7318e",dur:"2:36",note:"If you live there, you help there."},
{n:4,title:"THEY'RE YOUR PET",id:"b225e251-f999-438e-b843-e0b505423df1",dur:"3:51",note:"Gentle hands, fresh water, and your job gets done."},
{n:5,title:"PACK IT TONIGHT",id:"e75a1e56-29a4-45fd-ad06-5b553c843c3d",dur:"3:46",note:"Tomorrow morning is easier when tonight-you helps."},
{n:6,title:"TELL THE TRUTH",id:"b2158bdb-5393-4b43-beef-0c6e646c3d32",dur:"3:41",note:"Own the mistake, fix what you can, and carry on."},
{n:7,title:"BE A GOOD FRIEND",id:"4be55941-72f4-4951-83a1-6822be926269",dur:"3:58",note:"Notice people. Include people. Don't join in with cruelty."},
{n:8,title:"TRY AGAIN",id:"3333e2ec-be58-4646-ab64-4a7d80361fde",dur:"3:33",note:"Stop, think, ask for help, and have another go."},
{n:9,title:"READ SOMETHING",id:"c51b44e1-4cd0-4dac-b729-5ed9a8ff29e5",dur:"3:36",note:"Curiosity starts wherever you decide to open something."},
{n:10,title:"WHERE'S YOUR JUMPER?",id:"a34f52f3-1847-483b-8ea2-0e6f27418da5",dur:"3:40",note:"Put your things away and tomorrow-you will be grateful."},
];

export default function Page(){return <AnvilShell accent="#f4a8bf"><ListeningPage title="NAN WISDOM" eyebrow="VOLUME ONE // FAMILY MUSIC" description="Ten songs. Ten useful bits of common sense. One very old London grandmother with absolutely no patience for nonsense." accent="#f4a8bf" background="linear-gradient(180deg,#111722,#0d1119 55%,#090b10)" tracks={tracks} footer="GOOD BEATS. GOOD LAUGHS. GOOD SENSE. // NULLWORKS // ANVIL // 2026"/></AnvilShell>}
