import styles from "./mobile-deployment-receipt.module.css";

const stages = [
  {
    number: "01",
    title: "Concept + argument",
    body: "Turned the Da Vinci-versus-Toyota observation into a public thesis about specialist agents, visible work, telemetry, and human authority.",
  },
  {
    number: "02",
    title: "Article + truth boundaries",
    body: "Drafted, revised, structured, and published the long-form Field Note while preserving the 65+, 800+, and 119+ qualification boundaries.",
  },
  {
    number: "03",
    title: "Visual production",
    body: "Directed the OI SUITe infographic, cinematic operator artwork, and Mr Smith visual revisions through specialist feedback and approval loops.",
  },
  {
    number: "04",
    title: "LinkedIn package",
    body: "Produced the main post, article comment, closing comment, hashtags, alt text, and tagged follow-up copy for public distribution.",
  },
  {
    number: "05",
    title: "Landing page + deployment",
    body: "Built the Field Note route, updated the portfolio, committed through GitHub, reconnected Vercel, triggered production, and verified the public route.",
  },
  {
    number: "06",
    title: "Failure recovery + kaizen",
    body: "Preserved the blocked connector write, stale build, 404 route, weak visual attempts, asset replacements, and the corrections that restored motion.",
  },
];

export default function MobileDeploymentReceipt() {
  return (
    <section className={styles.receipt} aria-labelledby="mobile-deployment-receipt-title">
      <div className={styles.topline}>
        <span>OI SUITe field receipt // July 3, 2026</span>
        <strong>Mobile deployment</strong>
      </div>

      <h2 id="mobile-deployment-receipt-title" className={styles.title}>
        FYI: this article became its own proof of operation.
      </h2>

      <p className={styles.lead}>
        Mason directed this workflow from his phone while driving through intermittent canyon cell coverage. The OI SUITe carried the coordination layer across writing, specialist art direction, publishing, code changes, deployment, verification, and recovery.
      </p>

      <div className={styles.grid}>
        {stages.map((stage) => (
          <article key={stage.number} className={styles.card}>
            <span className={styles.number}>{stage.number}</span>
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
          </article>
        ))}
      </div>

      <blockquote className={styles.statement}>
        The OI SUITe can turn one operator&apos;s intent into a coordinated, evidence-preserving, multi-specialist publishing and deployment workflow without surrendering final human authority.
      </blockquote>

      <div className={styles.boundary}>
        <strong>Truth and safety boundary</strong>
        <p>
          This was not one autonomous agent completing everything. Mason set intent, selected the thesis, approved copy and imagery, corrected failures, authorized repository and deployment changes, and remained the final decision-maker. The system coordinated specialists, context, artifacts, routing, telemetry, and recovery. This field test documents mobile and voice-first potential; nobody should manually operate a phone while driving.
        </p>
      </div>

      <div className={styles.flow} aria-label="Concept, write, render, publish, deploy, debug, learn">
        <span>Concept</span><b>→</b><span>Write</span><b>→</b><span>Render</span><b>→</b><span>Publish</span><b>→</b><span>Deploy</span><b>→</b><span>Debug</span><b>→</b><span>Learn</span>
      </div>
    </section>
  );
}
