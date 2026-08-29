import AnvilShell from "../AnvilShell";
import ListeningPage from "../ListeningPage";

const base="https://foveyfclihpsnwhfchib.supabase.co/storage/v1/object/public/anvil-media/nan-wisdom";
const tracks=[
{n:1,title:"MIND YOUR MANNERS",src:`${base}/01-mind-your-manners.mp3`,dur:"2:40",note:"Manners are how you show people they matter."},
{n:2,title:"MAKE YOUR BED",src:`${base}/02-make-your-bed.mp3`,dur:"3:03",note:"Start the day with one small job already done."},
{n:3,title:"DO YOUR CHORES",src:`${base}/03-do-your-chores.mp3`,dur:"2:36",note:"If you live there, you help there."},
{n:4,title:"THEY'RE YOUR PET",src:`${base}/04-theyre-your-pet.mp3`,dur:"3:51",note:"Gentle hands, fresh water, and your job gets done."},
{n:5,title:"PACK IT TONIGHT",src:`${base}/05-pack-it-tonight.mp3`,dur:"3:46",note:"Tomorrow morning is easier when tonight-you helps."},
{n:6,title:"TELL THE TRUTH",src:`${base}/06-tell-the-truth.mp3`,dur:"3:41",note:"Own the mistake, fix what you can, and carry on."},
{n:7,title:"BE A GOOD FRIEND",src:`${base}/07-be-a-good-friend.mp3`,dur:"3:58",note:"Notice people. Include people. Don't join in with cruelty."},
{n:8,title:"TRY AGAIN",src:`${base}/08-try-again.mp3`,dur:"3:33",note:"Stop, think, ask for help, and have another go."},
{n:9,title:"READ SOMETHING",src:`${base}/09-read-something.mp3`,dur:"3:36",note:"Curiosity starts wherever you decide to open something."},
{n:10,title:"WHERE'S YOUR JUMPER?",src:`${base}/10-wheres-your-jumper.mp3`,dur:"3:40",note:"Put your things away and tomorrow-you will be grateful."},
];

export default function Page(){return <AnvilShell accent="#f4a8bf"><ListeningPage title="NAN WISDOM" eyebrow="VOLUME ONE // FAMILY MUSIC" description="Ten songs. Ten useful bits of common sense. One very old London grandmother with absolutely no patience for nonsense." accent="#f4a8bf" background="linear-gradient(180deg,#111722,#0d1119 55%,#090b10)" tracks={tracks} footer="GOOD BEATS. GOOD LAUGHS. GOOD SENSE. // NULLWORKS // ANVIL // 2026"/></AnvilShell>}
