import type { Metadata } from "next";
import styles from "../corporate.module.css";

export const metadata: Metadata = {
  title: "PORTUS LUNARIS | The First Lunar Spaceport",
  description: "PORTUS LUNARIS is a NULLWORKS lunar spaceport research program developed through NOXWORKS and governed by UMBRA.",
};

const systems = [
  {
    name: "ARGUS",
    title: "Reconnaissance",
    short: "Map the unknown before we decide what belongs there.",
    includes: ["Surface terrain and pit reconnaissance", "Rim and anchor-zone mapping", "Tethered cave / throat exploration", "LiDAR, ranging and photogrammetry", "Thermal, radiation and communications measurements", "Subsurface geometry and access qualification"],
    decision: "ARGUS does not assume the cavern is a habitat, industrial bay or reactor site. It measures what is actually there, builds the map, and gives the PORTUS operations layer and Human Authority evidence for deciding the best use later."
  },
  {
    name: "LANTERN",
    title: "Navigation + communications",
    short: "Give machines and people a shared local reference system.",
    includes: ["Surveyed local reference points", "Machine-readable location and state", "Surface and subsurface communications relays", "Operational beacons and landmarks", "Local grid and route references", "Degraded-comms operating support"],
    decision: "LANTERN turns a place with no terrestrial GPS infrastructure into an operating environment where every asset can know where it is, what it is connected to and how to report its state."
  },
  {
    name: "VESTA",
    title: "Power + thermal",
    short: "Provide continuous power and get waste heat safely back to space.",
    includes: ["Surface power generation architecture", "Electrical distribution", "Power conversion and isolation", "Thermal transport and rejection", "Radiator-field architecture", "Dust-control experiments"],
    decision: "VESTA is kept separate from the pit-preservation decision. A reactor does not go underground because the hole looks convenient; it goes where later evidence shows the total safety, thermal, maintenance and preservation case is strongest."
  },
  {
    name: "FORGE",
    title: "Local materials",
    short: "Turn lunar material into useful infrastructure.",
    includes: ["Excavation and material handling", "Regolith / basalt classification", "Oxygen and material-processing research", "Construction-material production", "Feedstock handling and quality control", "Progressive local manufacturing"],
    decision: "FORGE reduces the amount of bulk construction mass that has to be carried from Earth and creates the material stream used to expand the port."
  },
  {
    name: "PAVIS",
    title: "Landing infrastructure",
    short: "Make arrival repeatable instead of disposable.",
    includes: ["Reusable landing and launch surfaces", "Blast and ejecta management", "Hardstand and equipment pads", "Roads and logistics corridors", "Berms and protective earthworks", "Inspection, repair and progressive expansion"],
    decision: "PAVIS treats plume, dust and missed-landing consequences as zoning problems. The goal is repeatable cargo traffic without sacrificing the infrastructure the port is trying to build."
  },
  {
    name: "PORTUS",
    title: "Port operations",
    short: "Coordinate the separate systems as one working port.",
    includes: ["Mission and work coordination", "Robot and equipment state", "Energy and logistics orchestration", "Telemetry and evidence", "Failure handling and recovery", "Human Authority and decision boundaries", "Multi-vendor interface coordination"],
    decision: "PORTUS is the lunar port operations layer inside PORTUS LUNARIS. It coordinates the domain systems through UMBRA governance; it is not the underlying NULLWORKS operating architecture."
  }
];

const ladder = ["Terrestrial analog", "Orbital + site evidence", "ARGUS pathfinder", "Pit / subsurface reconnaissance", "LANTERN deployment", "FORGE demonstration", "PAVIS landing surface", "VESTA continuous power", "Integrated PORTUS operations", "Repeated cargo + published interfaces"];

const detailStyle = {border:"1px solid #293638", background:"#0b1618", borderRadius:18, overflow:"hidden", minHeight:0} as const;
const summaryStyle = {cursor:"pointer", padding:"22px 24px", listStyle:"none"} as const;
const listStyle = {margin:"16px 0 0", paddingLeft:20, color:"#aebbb6", lineHeight:1.7} as const;

export default function PortusLunarisPage(){
  return <main className={styles.page}><div className={styles.shell}>
    <nav className={styles.nav}><a className={styles.brand} href="/">NULLWORKS<span>NOXWORKS · PORTUS LUNARIS · MARE TRANQUILLITATIS</span></a><div className={styles.links}><a href="#architecture">Architecture</a><a href="#site">Site</a><a href="#path">Path</a><a href="#participate">Participate</a><a href="/">NULLWORKS</a></div></nav>

    <section className={styles.hero}><div><div className={styles.eyebrow}>NOXWORKS · PORTUS LUNARIS · ACTIVE RESEARCH PROGRAM</div><h1 className={styles.title}>The First Lunar Spaceport.</h1><p className={styles.lead}>We are not going to the Moon merely to visit a destination. We are building the infrastructure that turns the Moon into a destination.</p><div className={styles.actions}><a className={styles.primary} href="#architecture">Explore the system</a><a className={styles.secondary} href="#participate">Work with the program</a></div></div><aside className={styles.side}><strong>A port, not a flag.</strong><br/><br/>PORTUS LUNARIS is the lunar spaceport program. NOXWORKS is the NULLWORKS lunar prototype lab developing the lunar work. UMBRA is the governed operational architecture underneath it, with PENUMBRA as the human-facing supervisory interface.</aside></section>

    <div className={styles.band}>NULLWORKS → NOXWORKS → PORTUS LUNARIS · UMBRA GOVERNANCE → PENUMBRA HUMAN SUPERVISION</div>

    <section className={styles.section}><div className={styles.statement}><strong>The port is the system. UMBRA is the architecture.</strong><p>No single reactor, robot, cave or landing pad is the Moonport. PORTUS LUNARIS is an integrated infrastructure program intended to let different machines, suppliers, missions and eventually people operate through shared services and explicit interfaces. UMBRA provides the governed operational/control architecture that keeps authority, policy, telemetry, verification and receipts intact as those workers change.</p></div></section>

    <section className={styles.section} id="architecture"><div className={styles.sectionHeader}><div className={styles.kicker}>Six port systems · governed by UMBRA</div><h2 className={styles.h2}>We do not know what we do not know until we map it.</h2><p className={styles.body}>Each PORTUS LUNARIS system has a job, an evidence boundary and a decision it is responsible for informing. UMBRA governs how capabilities are exposed and coordinated; PENUMBRA keeps the accountable human in view. Tap any system to open it.</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>{systems.map((s)=><details key={s.name} style={detailStyle}><summary style={summaryStyle}><div className={styles.cardLabel}>{s.name}</div><h3 style={{fontSize:22,margin:"26px 0 8px"}}>{s.title}</h3><p style={{margin:0,color:"#9eaca7",lineHeight:1.55}}>{s.short}</p><div style={{marginTop:18,fontSize:12,letterSpacing:'.12em',textTransform:'uppercase',color:'#c9d3cf'}}>Tap to expand +</div></summary><div style={{padding:"0 24px 24px",borderTop:"1px solid #293638"}}><div style={{marginTop:20,fontSize:12,letterSpacing:'.14em',textTransform:'uppercase',color:'#82918b'}}>Includes</div><ul style={listStyle}>{s.includes.map(x=><li key={x}>{x}</li>)}</ul><div style={{marginTop:22,fontSize:12,letterSpacing:'.14em',textTransform:'uppercase',color:'#82918b'}}>Why it matters</div><p style={{color:'#c9d3cf',lineHeight:1.7}}>{s.decision}</p></div></details>)}</div></section>

    <section className={styles.section} id="site"><div className={styles.sectionHeader}><div className={styles.kicker}>Working site candidate</div><h2 className={styles.h2}>Mare Tranquillitatis Pit.</h2><p className={styles.body}>PORT-T currently centers engineering research on the Mare Tranquillitatis Pit region at approximately 8.3355°N, 33.222°E.</p></div><div style={{border:'1px solid #293638',borderRadius:20,overflow:'hidden',background:'#0b1618',marginBottom:18}}><img src="/portus-lunaris/mtp-pit.jpg" alt="Mare Tranquillitatis Pit, LROC NAC view" style={{display:'block',width:'100%',height:'auto'}}/><div style={{padding:'16px 20px',color:'#9eaca7',fontSize:13,lineHeight:1.6}}>Mare Tranquillitatis Pit · LROC NAC view recovered from the PORT-T visual evidence capture. This image shows the observed pit geometry; it does not prove the size or suitability of any connected subsurface cavern.</div></div><div className={styles.two}><div className={styles.panel}><h3>What we know now</h3><p>The pit is a confirmed lunar skylight/collapse feature with a large opening, steep walls, overhang/recess geometry and visible interior floor sectors. It is already worth serious reconnaissance.</p><p>What we do not yet know is just as important: full subsurface geometry, roof thickness, continuity, structural competence, access difficulty and best long-term use.</p></div><div className={styles.panel}><div className={styles.kicker}>Preservation law</div><h3>Map first. Build second.</h3><p><strong>Nothing irreversible goes down the throat until ARGUS has mapped the throat.</strong></p><p>ARGUS goes in to answer the question before UMBRA-governed port operations assign the answer. If the volume is best for people, protect it. If it is best for equipment, use it. If it is unsafe or low-value, build outward and keep the port moving.</p></div></div></section>

    <section className={styles.section}><div className={styles.sectionHeader}><div className={styles.kicker}>Autonomy by necessity</div><h2 className={styles.h2}>The machines must be able to work when Earth cannot drive them.</h2><p className={styles.body}>PORTUS LUNARIS is being designed around autonomous local operation under communications delay, interruption and uncertain terrain. Earth supplies objectives and bounded supervisory direction; local systems must sense, act, preserve evidence, fail safely and recover without pretending a distant operator is sitting in the cab.</p></div></section>

    <section className={styles.section} id="path"><div className={styles.sectionHeader}><div className={styles.kicker}>Earth first</div><h2 className={styles.h2}>Prove the interfaces before shipping the hardware.</h2><p className={styles.body}>The first PORTUS LUNARIS proving ground is terrestrial: integrated robotics, navigation, communications, material handling, landing-infrastructure experiments and emulated power/thermal interfaces under deliberately degraded operating conditions. Specialized vacuum, dust, thermal and reduced-gravity questions require specialized test environments rather than pretending one Earth facility reproduces the Moon.</p></div><div className={styles.list}>{ladder.map((x,i)=><div className={styles.item} key={x}><strong>{String(i).padStart(2,"0")}</strong><span>{x}</span></div>)}</div></section>

    <section className={styles.section}><div className={styles.two}><div className={styles.panel}><h3>Build outward from the unknown.</h3><p>Landing zones, power, radiators, material processing, logistics routes and protected operations are separate engineering decisions. Unique lunar volume is preserved until evidence establishes its best use.</p></div><div className={styles.panel}><h3>Failure must not kill the program.</h3><p>If one candidate pit, machine, process or supplier fails qualification, PORTUS LUNARIS continues. The program is designed around replaceable components, bounded authority and progressive evidence, while UMBRA keeps the governance architecture intact.</p></div></div></section>

    <section className={styles.section} id="participate"><div className={styles.statement}><strong>This is an infrastructure problem big enough for an ecosystem.</strong><p>PORTUS LUNARIS is seeking conversations with researchers, space operators, robotics teams, energy and thermal engineers, materials specialists, civil/construction automation groups, sensing and metrology teams, communications specialists, manufacturers and suppliers interested in discrete Earth-testable demonstrators that can mature toward lunar use.</p><div className={styles.actions}><a className={styles.primary} href="/contact">Contact NULLWORKS</a></div></div></section>

    <section className={styles.section}><div className={styles.notice}><strong>Public evidence boundary.</strong> PORTUS LUNARIS is an active NULLWORKS research and systems program developed through NOXWORKS. It is not a deployed lunar facility, qualified human habitat, approved nuclear installation or validated commercial spaceport. Site and engineering decisions remain evidence-bound and subject to testing.</div></section>

    <footer className={styles.footer}><span>PORTUS LUNARIS · NOXWORKS · NULLWORKS</span><span>Build the port that lets everyone else get to work.</span></footer>
  </div></main>;
}
