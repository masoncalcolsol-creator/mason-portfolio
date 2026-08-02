import type { Metadata } from "next";
import styles from "./moonshot.module.css";

export const metadata: Metadata = {
  title: "Operation Moonshot | NULLWORKS",
  description: "Two diametrically opposed systems papers about the Moon: one evidence-bound, one explicitly speculative.",
};

export default function OperationMoonshotIndex() {
  return (
    <main className={styles.indexPage}>
      <section className={styles.indexHero}>
        <article className={`${styles.indexHalf} ${styles.indexLight}`}>
          <div className={styles.indexTag}>Paper I · Evidence-bound systems research</div>
          <h1>The Lunar Industrial Bootstrap</h1>
          <p>
            Stop designing interplanetary spacecraft around the constraints of Earth launch. Use the Moon as a quarry, refinery, power node, logistics base, and force multiplier feeding orbital shipyards.
          </p>
          <a href="/operation-moonshot/industrial-bootstrap">Enter the light</a>
        </article>
        <article className={`${styles.indexHalf} ${styles.indexDark}`}>
          <div className={styles.indexTag}>Paper II · Speculative systems fiction</div>
          <h1>The Instrument in the Sky</h1>
          <p>
            If Earth were an experiment, what would a rational observation system do when the organisms inside the experiment learned how to reach the instrument?
          </p>
          <a href="/operation-moonshot/observation-system">Enter the shadow</a>
        </article>
      </section>
    </main>
  );
}
