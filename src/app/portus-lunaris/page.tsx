import type { Metadata } from "next";
import styles from "../corporate.module.css";

export const metadata: Metadata = {
  title: "PORTUS LUNARIS | The First Lunar Spaceport",
  description: "PORTUS LUNARIS is a NULLWORKS research program for the infrastructure that can turn the Moon from a destination into an operating environment.",
};

const systems = [
  ["ARGUS", "Reconnaissance", "Autonomous terrain, pit and subsurface reconnaissance; mapping, ranging, thermal and environmental characterization before permanent occupation."],
  ["LANTERN", "Navigation + communications", "Local references, communications, machine-readable location and operational state without depending on terrestrial navigation infrastructure."],
  ["VESTA", "Power + thermal", "Continuous surface power, electrical distribution, thermal management and dust-control research for long-duration industrial operation."],
  ["FORGE", "Local materials", "Excavate, classify and process lunar material into useful construction and resource streams, reducing dependence on imported bulk mass."],
  ["PAVIS", "Landing infrastructure", "Reusable landing and launch surfaces, blast-management zones, hardstand, roads, berms and progressive surface expansion."],
  ["PORTUS", "Operating layer", "The supervisory architecture joining robots, energy, construction, logistics, telemetry, evidence, failure handling and Human Authority."],
];

const ladder = ["Terrestrial analog", "Orbital + site evidence", "ARGUS pathfinder", "Pit / subsurface reconnaissance", "LANTERN deployment", "FORGE demonstration", "PAVIS landing surface", "VESTA continuous power", "Integrated PORTUS operations", "Repeated cargo + published interfaces"];

export default function PortusLunarisPage(){
  return <main className={styles.page}><div className={styles.shell}>
    <nav className={styles.nav}><a className={styles.brand} href="/">NULLWORKS<span>PORTUS LUNARIS · MARE TRANQUILLITATIS</span></a><div className={styles.links}><a href="#architecture">Architecture</a><a href="#site">Site</a><a href="#path">Path</a><a href="#participate">Participate</a><a href="/">NULLWORKS</a></div></nav>

    <section className={styles.hero}><div><div className={styles.eyebrow}>PORTUS LUNARIS · ACTIVE RESEARCH PROGRAM</div><h1 className={styles.title}>The First Lunar Spaceport.</h1><p className={styles.lead}>We are not going to the Moon merely to visit a destination. We are building the infrastructure that turns the Moon into a destination.</p><div className={styles.actions}><a className={styles.primary} href="#architecture">Explore the architecture</a><a className={styles.secondary} href="#participate">Work with the program</a></div></div><aside className={styles.side}><strong>A port, not a flag.</strong><br/><br/>PORTUS LUNARIS begins with the infrastructure future operators need: power, autonomous robotics, navigation and communications, local-material construction, reusable landing surfaces, protected operations and interoperable port services.</aside></section>

    <div className={styles.band}>RECONNAISSANCE → NAVIGATION → POWER → MATERIALS → LANDING INFRASTRUCTURE → PORT OPERATIONS</div>

    <section className={styles.section}><div className={styles.statement}><strong>The port is the system.</strong><p>No single reactor, robot, cave or landing pad is the Moonport. PORTUS LUNARIS is an integrated infrastructure architecture intended to let different machines, suppliers, missions and eventually people operate through shared services and explicit interfaces.</p></div></section>

    <section className={styles.section} id="architecture"><div className={styles.sectionHeader}><div className={styles.kicker}>Six-system architecture</div><h2 className={styles.h2}>Build the infrastructure before depending on it.</h2><p className={styles.body}>Each system can be developed and tested independently, then integrated into a common operating architecture. The design favors multi-vendor and international components rather than dependence on a single supplier.</p></div><div className={styles.grid}>{systems.map(([name,title,body])=><div className={styles.card} key={name}><div className={styles.cardLabel}>{name}</div><h3>{title}</h3><p>{body}</p></div>)}</div></section>

    <section className={styles.section} id="site"><div className={styles.two}><div className={styles.panel}><div className={styles.kicker}>Working site candidate</div><h3>Mare Tranquillitatis</h3><p>PORT-T currently centers engineering research on the Mare Tranquillitatis Pit region at approximately 8.3355°N, 33.222°E. The pit is a confirmed lunar skylight/collapse feature and a compelling reconnaissance target.</p><p>Subsurface geometry, structural competence, accessibility and suitability for protected operations remain engineering questions—not assumptions.</p></div><div className={styles.panel}><div className={styles.kicker}>Preservation law</div><h3>Map first. Build second.</h3><p><strong>Nothing irreversible goes down the throat until ARGUS has mapped the throat.</strong></p><p>The pit and possible connected subsurface volume are treated as potentially high-value future infrastructure. Heavy industrial use, permanent occupation and irreversible alteration wait for characterization.</p></div></div></section>

    <section className={styles.section}><div className={styles.sectionHeader}><div className={styles.kicker}>Autonomy by necessity</div><h2 className={styles.h2}>The machines must be able to work when Earth cannot drive them.</h2><p className={styles.body}>PORTUS LUNARIS is being designed around autonomous local operation under communications delay, interruption and uncertain terrain. Earth supplies objectives and bounded supervisory direction; local systems must sense, act, preserve evidence, fail safely and recover without pretending a distant operator is sitting in the cab.</p></div></section>

    <section className={styles.section} id="path"><div className={styles.sectionHeader}><div className={styles.kicker}>Earth first</div><h2 className={styles.h2}>Prove the interfaces before shipping the hardware.</h2><p className={styles.body}>The first PORTUS LUNARIS proving ground is terrestrial: integrated robotics, navigation, communications, material handling, landing-infrastructure experiments and emulated power/thermal interfaces under deliberately degraded operating conditions. Specialized vacuum, dust, thermal and reduced-gravity questions require specialized test environments rather than pretending one Earth facility reproduces the Moon.</p></div><div className={styles.list}>{ladder.map((x,i)=><div className={styles.item} key={x}><strong>{String(i).padStart(2,"0")}</strong><span>{x}</span></div>)}</div></section>

    <section className={styles.section}><div className={styles.two}><div className={styles.panel}><h3>Build outward from the unknown.</h3><p>Landing zones, power, radiators, material processing, logistics routes and protected operations are separate engineering decisions. Unique lunar volume is preserved until evidence establishes its best use.</p></div><div className={styles.panel}><h3>Failure must not kill the architecture.</h3><p>If one candidate pit, machine, process or supplier fails qualification, the port architecture continues. The program is designed around replaceable components, bounded authority and progressive evidence.</p></div></div></section>

    <section className={styles.section} id="participate"><div className={styles.statement}><strong>This is an infrastructure problem big enough for an ecosystem.</strong><p>PORTUS LUNARIS is seeking conversations with researchers, space operators, robotics teams, energy and thermal engineers, materials specialists, civil/construction automation groups, sensing and metrology teams, communications specialists, manufacturers and suppliers interested in discrete Earth-testable demonstrators that can mature toward lunar use.</p><div className={styles.actions}><a className={styles.primary} href="/contact">Contact NULLWORKS</a></div></div></section>

    <section className={styles.section}><div className={styles.notice}><strong>Public evidence boundary.</strong> PORTUS LUNARIS is an active NULLWORKS research and systems-architecture program. It is not a deployed lunar facility, qualified human habitat, approved nuclear installation or validated commercial spaceport. Site and engineering decisions remain evidence-bound and subject to testing.</div></section>

    <footer className={styles.footer}><span>PORTUS LUNARIS · NULLWORKS</span><span>Build the port that lets everyone else get to work.</span></footer>
  </div></main>;
}
