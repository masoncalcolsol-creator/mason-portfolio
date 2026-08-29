import styles from "../corporate.module.css";

export type BlindRedTeamReviewProps = {
  reviewerName: string;
  firstName: string;
  artifactName: string;
  artifactVersion: string;
  artifactUrl: string;
  responseEmail: string;
  responseSubject: string;
};

export default function BlindRedTeamReview({reviewerName,firstName,artifactName,artifactVersion,artifactUrl,responseEmail,responseSubject}:BlindRedTeamReviewProps){
  const mailto=`mailto:${responseEmail}?subject=${encodeURIComponent(responseSubject)}`;
  return <main className={styles.page}><div className={styles.shell}>
    <nav className={styles.nav}><div className={styles.brand}>NULLWORKS<span>INDEPENDENT RED TEAM · CONTROLLED FIRST PASS</span></div><div className={styles.mono}>REVIEWER: {reviewerName}</div></nav>
    <section className={styles.compactHero}><div className={styles.eyebrow}>Cold review</div><h1 className={styles.title}>{firstName}, try to break this.</h1><p className={styles.lead}>Your target is <strong>{artifactName}</strong> ({artifactVersion}). Read this copy before looking up NULLWORKS, Continuity Calculus, or any supporting material.</p><div className={styles.actions}><a className={styles.primary} href={artifactUrl} target="_blank" rel="noreferrer">Open paper</a><a className={styles.secondary} href={`${artifactUrl}?download=1`}>Download PDF</a><a className={styles.secondary} href={mailto}>Send first-pass review</a></div></section>
    <section className={styles.section}><div className={styles.sectionHeader}><div className={styles.kicker}>Your only assignment</div><h2 className={styles.h2}>Assume the paper may be wrong.</h2><p className={styles.body}>Read it as a hostile technical reviewer. We are not asking for encouragement, endorsement, or a courtesy read. Find the places where the argument fails.</p></div><div className={styles.list}><div className={styles.item}><strong>Attack the thesis</strong><span>Identify claims that do not follow, hidden assumptions, contradictions, or places where the framework collapses under a real counterexample.</span></div><div className={styles.item}><strong>Attack the vocabulary</strong><span>Flag renamed existing concepts, ambiguous terms, category mistakes, or language that creates the appearance of rigor without adding explanatory power.</span></div><div className={styles.item}><strong>Attack operationality</strong><span>Ask whether the framework can actually be implemented, measured, falsified, governed, and maintained rather than merely described.</span></div><div className={styles.item}><strong>Attack the boundaries</strong><span>Find cases where legitimate succession cannot be distinguished from drift, where authority can be captured, or where preserving evidence becomes impractical.</span></div><div className={styles.item}><strong>Extend it</strong><span>If the framework implies something the paper does not explicitly say, follow that implication. We care about what the model lets you derive, not only what you remember reading.</span></div></div></section>
    <section className={styles.section}><div className={styles.statement}><strong>No briefing on purpose.</strong><p>For the first pass, please do not ask Mason what a section means and do not browse the wider NULLWORKS site. Mark confusion as confusion. If context is missing, that is itself useful criticism.</p></div></section>
    <section className={styles.section}><div className={styles.sectionHeader}><div className={styles.kicker}>Review artifact</div><h2 className={styles.h2}>{artifactName}</h2><p className={styles.body}>The viewer and download button resolve to the same locked review artifact.</p></div><iframe title={artifactName} src={artifactUrl} style={{width:"100%",height:"78vh",border:"1px solid #293638",borderRadius:18,background:"#fff"}} /></section>
    <section className={styles.section}><div className={styles.notice}><strong>Response format:</strong> whatever is natural. Margin notes, bullets, a memo, voice notes, or an ugly list of objections are all valid. Please send the first-pass response before discussing the paper with Mason so the unassisted read remains intact.</div></section>
    <footer className={styles.footer}><span>NULLWORKS · RED TEAM PROTOCOL</span><a className={styles.route} href={mailto}>Return first pass →</a></footer>
  </div></main>;
}
