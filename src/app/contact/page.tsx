import type { Metadata } from "next";
import styles from "../corporate.module.css";

export const metadata: Metadata = { title: "Contact | NULLWORKS", description: "Contact NULLWORKS about consequential systems, AI architecture, operational assurance, partnerships, or research." };

export default function ContactPage(){return <main className={styles.page}><div className={styles.shell}>
<nav className={styles.nav}><a className={styles.brand} href="/">NULLWORKS<span>CONTACT</span></a><div className={styles.links}><a href="/architecture">Architecture</a><a href="/products">Systems</a><a href="/proof">Proof</a><a href="/company">Company</a></div></nav>
<section className={styles.compactHero}><div className={styles.eyebrow}>Bring the real problem</div><h1 className={styles.title}>Start with the outcome, not the software shopping list.</h1><p className={styles.lead}>The useful first message is simple: what needs to happen, who owns the consequence, what currently gets in the way, and what failure costs. NULLWORKS can work outward from there.</p><div className={styles.actions}><a className={styles.primary} href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20conversation">Email NULLWORKS</a><a className={styles.secondary} href="/triage">Run workflow triage</a></div></section>
<section className={styles.section}><div className={styles.two}><div className={styles.panel}><h3>System / workflow problem</h3><p>Describe the current process, desired outcome, actors, evidence, authority, exceptions, and known failure conditions. Screenshots, documents, recordings, and ugly real-world details are more useful than polished diagrams.</p></div><div className={styles.panel}><h3>Partnership / research</h3><p>For institutional, technical, research, or Japan-related conversations, describe the system or question worth exploring. A useful relationship does not need to begin as a sales engagement.</p></div></div></section>
<footer className={styles.footer}><a className={styles.route} href="/">← NULLWORKS</a><span>Map first. Prescribe second.</span></footer>
</div></main>}
