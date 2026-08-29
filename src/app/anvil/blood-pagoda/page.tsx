import type { Metadata } from "next";
import AnvilShell from "../AnvilShell";
import ListeningPage from "../ListeningPage";
const base="https://foveyfclihpsnwhfchib.supabase.co/storage/v1/object/public/anvil-media/blood-pagoda";
const tracks=[
{n:1,title:"石の神が歩く",src:`${base}/01-stone-god-walks.mp3`,note:"Ishi no Kami ga Aruku // The Stone God Walks"},
{n:2,title:"鉄の灯籠",src:`${base}/02-iron-lantern.mp3`,note:"Tetsu no Tōrō // Iron Lantern"},
{n:3,title:"山の骨",src:`${base}/03-bones-of-the-mountain.mp3`,note:"Yama no Hone // Bones of the Mountain"},
{n:4,title:"終電後",src:`${base}/04-after-the-last-train.mp3`,note:"Shūden-go // After the Last Train"},
{n:5,title:"海霧",src:`${base}/05-sea-fog.mp3`,note:"Umigiri // Sea Fog"},
{n:6,title:"煙突の月",src:`${base}/06-moon-of-the-chimney.mp3`,note:"Entotsu no Tsuki // Moon Over the Smokestack"},
{n:7,title:"古い橋",src:`${base}/07-old-bridge.mp3`,note:"Furui Hashi // The Old Bridge"},
{n:8,title:"防波堤",src:`${base}/08-breakwater.mp3`,note:"Bōhatei // Breakwater"},
{n:9,title:"夜の踏切",src:`${base}/09-night-crossing.mp3`,note:"Yoru no Fumikiri // Night Railroad Crossing"},
{n:10,title:"桜と煙",src:`${base}/10-cherry-blossoms-and-smoke.mp3`,note:"Sakura to Kemuri // Cherry Blossoms and Smoke"},
{n:11,title:"郵便受け",src:`${base}/11-mailbox.mp3`,note:"Yūbin Uke // The Mailbox"},
{n:12,title:"雨の台所",src:`${base}/12-rainy-kitchen.mp3`,note:"Ame no Daidokoro // Rain in the Kitchen"},
{n:13,title:"頭の上のシャベル",src:`${base}/13-shovel-overhead.mp3`,note:"Atama no Ue no Shaberu // The Shovel Above My Head"},
];
export const metadata:Metadata={title:"血の楼閣 — 最初の十三 | BLOOD PAGODA // ANVIL",description:"BLOOD PAGODA. 最初の十三. Thirteen movements of Japanese occult acid-doom, preserved by NULLWORKS // ANVIL.",alternates:{canonical:"/anvil/blood-pagoda"},openGraph:{title:"血の楼閣 — 最初の十三 | BLOOD PAGODA",description:"13 songs // BLOOD PAGODA // NULLWORKS ANVIL",url:"https://nullworks.systems/anvil/blood-pagoda",siteName:"NULLWORKS // ANVIL",type:"music.album",images:[{url:`${base}/cover.png`,width:1254,height:1254,alt:"血の楼閣 — 最初の十三"}]},twitter:{card:"summary_large_image",title:"血の楼閣 — 最初の十三 | BLOOD PAGODA",description:"13 songs // BLOOD PAGODA // NULLWORKS ANVIL",images:[`${base}/cover.png`]}};
export default function Page(){return <AnvilShell accent="#b84a3d"><ListeningPage title="血の楼閣" eyebrow="BLOOD PAGODA // 最初の十三" description="Thirteen songs from BLOOD PAGODA. Japanese occult acid-doom preserved in canonical sequence by NULLWORKS // ANVIL." accent="#b84a3d" background="linear-gradient(180deg,#090604,#080504 48%,#030303)" coverSrc={`${base}/cover.png`} tracks={tracks} footer="血の楼閣 // 最初の十三 // NULLWORKS // ANVIL"/></AnvilShell>}
