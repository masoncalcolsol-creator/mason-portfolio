import Link from "next/link";
import AnvilShell from "../AnvilShell";
const labs=[
["SONG FORGE","Composition / experimental song system","/anvil-song-forge"],
["FRANZ VAULT","Physical source library: pump organ, squeaks, pedals, room noise and the famous cat interruption","/franz-vault"],
["SOUND LIBRARY","Captured source material and reusable physical audio","/sound-library"],
["LINEAGE UNIVERSE","Reverse chronology, ancestry and phenotype experiments","/anvil"],
["GOBLIN AMPLIFICATION","Experimental amplification / artifact surface already present in the NULLWORKS repo","/goblin-amplification"]];
export default function Page(){return <AnvilShell accent="#63d2ff"><style>{`.labs{width:min(1180px,calc(100% - 32px));margin:auto;padding:70px 0}.labs h1{font-size:clamp(65px,12vw,150px);line-height:.8;letter-spacing:-.07em;margin:0 0 25px}.labs>p{max-width:820px;color:#aaa49a;font-size:21px;line-height:1.6}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:45px}.lab{min-height:220px;border:1px solid #302e29;border-radius:24px;padding:25px;text-decoration:none;color:#eee9df;background:#0a0a09}.lab b{color:var(--accent);font:900 10px ui-monospace,monospace;letter-spacing:.13em}.lab h2{font-size:36px;letter-spacing:-.04em;margin:16px 0 12px}.lab p{color:#9f9a91;line-height:1.55}@media(max-width:700px){.grid{grid-template-columns:1fr}}`}</style><section className="labs"><h1>LABS</h1><p>ANVIL is not only a label surface. These are the composition, capture, lineage and physical-source systems already living in the NULLWORKS codebase.</p><div className="grid">{labs.map(l=><Link className="lab" href={l[2]} key={l[0]}><b>EXISTING SYSTEM</b><h2>{l[0]}</h2><p>{l[1]}</p></Link>)}</div></section></AnvilShell>}
