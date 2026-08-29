import styles from "../corporate.module.css";

export type BlindRedTeamRevealProps={reviewerName:string;firstName:string;artifactName:string;};

export default function BlindRedTeamReveal({reviewerName,firstName,artifactName}:BlindRedTeamRevealProps){return <main className={styles.page}><div className={styles.shell}>
<nav className={styles.nav}><a className={styles.brand} href="/">NULLWORKS<span>RED TEAM · PHASE TWO</span></a><div className={styles.mono}>REVIEWER: {reviewerName}</div></nav>
<section className={styles.compactHero}><div className={styles.eyebrow}>First pass preserved</div><h1 className={styles.title}>{firstName}, there was a second reason we asked you to read it cold.</h1><p className={styles.lead}>Your review of {artifactName} was the red team. The unassisted transfer was also an experiment.</p></section>
<section className={styles.section}><div className={styles.statement}><strong>The question behind the question</strong><p>Could a technically capable person who did not participate in the framework&apos;s development reconstruct enough of its intended conceptual state to reason about it independently, attack its actual premises, and potentially derive consequences that were not explicitly taught?</p></div></section>
<section className={styles.section}><div className={styles.sectionHeader}><div className={styles.kicker}>Why this connects to the paper</div><h2 className={styles.h2}>The artifact had to carry enough continuity to survive the handoff.</h2></div><div className={styles.list}>
<div className={styles.item}><strong>Comprehension was not the score</strong><span>A confusing section may be a defect in the artifact rather than a defect in the reviewer. Missing context is evidence.</span></div>
<div className={styles.item}><strong>Criticism is stronger evidence</strong><span>If you could attack the framework&apos;s real claims without its development history, enough state transferred for independent reasoning to begin.</span></div>
<div className={styles.item}><strong>Novel inference matters</strong><span>If you derived an implication that was not explicitly stated, the transfer may have carried a generative model rather than merely information.</span></div>
<div className={styles.item}><strong>Failure matters too</strong><span>Where the transfer failed tells us what context, invariants, definitions, or lineage the successor artifact failed to inherit.</span></div>
</div></section>
<section className={styles.section}><div className={styles.notice}><strong>Now we want the second review:</strong> knowing that the cold handoff itself was being examined, do you think the transfer worked? Where did you reconstruct the intended model correctly? Where did you have to invent missing context? What would make the next successor artifact transfer better?</div></section>
<section className={styles.section}><div className={styles.sectionHeader}><div className={styles.kicker}>The curtain is open</div><h2 className={styles.h2}>Now inspect the machinery.</h2><p className={styles.body}>The links below were deliberately withheld from phase one.</p></div><div className={styles.grid}>
<a className={styles.card} href="/"><div className={styles.cardLabel}>Company</div><h3>NULLWORKS</h3><p>The operating thesis and current corporate front door.</p></a>
<a className={styles.card} href="/architecture"><div className={styles.cardLabel}>Architecture</div><h3>UMBRA / PENUMBRA</h3><p>The governed execution architecture surrounding intelligence.</p></a>
<a className={styles.card} href="/products"><div className={styles.cardLabel}>Systems</div><h3>Working implementations</h3><p>Different domains used as proof vehicles for the underlying architecture.</p></a>
<a className={styles.card} href="/proof"><div className={styles.cardLabel}>Evidence</div><h3>Receipts</h3><p>Research, tests, field work, and bounded claims.</p></a>
</div></section>
<footer className={styles.footer}><a className={styles.route} href="/">NULLWORKS</a><span>PHASE TWO · REVEALED</span></footer>
</div></main>}
