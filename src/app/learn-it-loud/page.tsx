import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  Clock3,
  Cloud,
  Globe2,
  GraduationCap,
  Headphones,
  Languages,
  Music2,
  Play,
  ShieldCheck,
  SlidersHorizontal,
  ThumbsUp,
  Users,
  WandSparkles,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Learn It Loud | A 30-Minute Music Learning Lab",
  description:
    "A proposed classroom pilot where students create, compare, and discuss curriculum-grounded songs in genres they already care about.",
};

const subjectExamples = [
  "The Panama Canal",
  "The Bill of Rights",
  "Newton’s laws",
  "Fractions and ratios",
  "Parts of speech",
  "Vocabulary review",
  "Scientific processes",
  "Multilingual language support",
];

const guardrails = [
  "Teacher-approved curriculum facts anchor every prompt.",
  "Age-appropriate language and content filters are mandatory.",
  "Students can change style, structure, emphasis, and delivery—not the learning objective.",
  "The teacher remains final authority over the lesson, prompt, and classroom playback.",
  "A pilot can run without publishing student names or personal data.",
];

const pilotMetrics = [
  ["Attention", "Did students stay engaged through the full 30-minute activity?"],
  ["Recall", "What curriculum facts could students retrieve immediately and later?"],
  ["Transfer", "Could students explain the concept outside the lyrics?"],
  ["Participation", "Did more students contribute through listening, voting, and discussion?"],
  ["Teacher load", "Did the activity add useful learning without creating an unmanageable production burden?"],
];

export default function LearnItLoudPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <span className={styles.brandMark}>NW</span>
            <span>
              <strong>NULLWORKS FIELD CONCEPT</strong>
              <small>Operational learning through music</small>
            </span>
          </a>
          <nav className={styles.nav}>
            <a href="/architecture-lineage"><ArrowLeft size={16} /> Mr. Sloth system</a>
            <a href="/"><ArrowLeft size={16} /> Portfolio</a>
          </nav>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.kicker}><Music2 size={17} /> PROPOSED CLASSROOM PILOT // 30 MINUTES</div>
            <h1>What if students could remix the lesson into something they actually want to hear?</h1>
            <p className={styles.lead}>
              <strong>Learn It Loud</strong> is a proposed classroom activity that turns curriculum into student-directed music. Students create a song, compare short sections from classmates, and discuss what made the strongest pieces work—all while repeatedly hearing the information they are meant to learn.
            </p>
            <div className={styles.heroActions}>
              <a href="#demo" className={styles.primaryButton}>Hear the example <Play size={17} /></a>
              <a href="#pilot" className={styles.secondaryButton}>Open the pilot design <ArrowRight size={17} /></a>
            </div>
          </div>

          <aside className={styles.slothCard}>
            <div className={styles.slothFace} aria-hidden="true">🦥</div>
            <p className={styles.slothLabel}>MR. SLOTH’S FIELD NOTE</p>
            <blockquote>
              The music is not the lesson wrapped in decoration. The act of choosing, comparing, and explaining the music becomes part of the learning loop.
            </blockquote>
            <span>This page describes a pilot concept—not a finished classroom product.</span>
          </aside>
        </section>

        <section className={styles.signalStrip}>
          <div><Headphones size={24} /><strong>Interest increases attention.</strong></div>
          <div><Brain size={24} /><strong>Repetition strengthens recall.</strong></div>
          <div><Users size={24} /><strong>Discussion makes preference explainable.</strong></div>
        </section>

        <section id="demo" className={styles.demoSection}>
          <div className={styles.demoCopy}>
            <p className={styles.eyebrow}>THE PROOF VEHICLE</p>
            <h2>Big Ditch Energy</h2>
            <p>
              This Panama Canal song began with a real learning need: a fourteen-year-old was studying the subject, and the adults around him wanted to understand it better too. The result is a curriculum-focused ska-style song designed to make the facts easier to revisit.
            </p>
            <p>
              One song is not the product. It demonstrates the compressed production loop that makes the classroom exercise possible.
            </p>
          </div>
          <div className={styles.playerCard}>
            <div className={styles.playerHeader}>
              <span><Music2 size={18} /> CLASSROOM DEMO</span>
              <small>Panama Canal · ska-inspired</small>
            </div>
            <a
              href="https://suno.com/s/hUAYoK5UBjL1Wgaa"
              target="_blank"
              rel="noreferrer"
              className={styles.playButton}
            >
              <Play size={18} /> Play Big Ditch Energy
            </a>
          </div>
        </section>

        <article className={styles.article}>
          <section className={styles.section}>
            <div className={styles.sectionNumber}>01</div>
            <div>
              <p className={styles.eyebrow}>THE 30-MINUTE LOOP</p>
              <h2>Three ten-minute movements. One continuous lesson.</h2>
              <div className={styles.steps}>
                <article>
                  <span>00–10</span>
                  <WandSparkles size={25} />
                  <h3>Create</h3>
                  <p>
                    Students choose from teacher-approved genres and shape a curriculum-grounded prompt. They can adjust the feel, order, hook, instrumentation, and delivery while the required learning content remains fixed.
                  </p>
                </article>
                <article>
                  <span>10–20</span>
                  <Headphones size={25} />
                  <h3>Compare</h3>
                  <p>
                    Each student shares one result to a classroom queue. The system proposes a listening order based on genre and sound preferences, then serves short sections from different parts of the songs—not only the opening.
                  </p>
                </article>
                <article>
                  <span>20–30</span>
                  <ThumbsUp size={25} />
                  <h3>Discuss</h3>
                  <p>
                    Students vote on the strongest sections and explain why they worked. The class assembles a composite lesson track while the teacher connects musical choices back to the curriculum.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.darkSection}`}>
            <div className={styles.sectionNumber}>02</div>
            <div>
              <p className={styles.eyebrow}>WHAT STUDENTS ARE REALLY PRACTICING</p>
              <h2>The activity is more than passive listening.</h2>
              <div className={styles.practiceGrid}>
                <div><SlidersHorizontal size={21} /><strong>Creative direction</strong><span>Translate an intention into style, sequence, emphasis, and sound.</span></div>
                <div><BookOpenCheck size={21} /><strong>Content accuracy</strong><span>Work inside factual and curricular boundaries rather than inventing the lesson.</span></div>
                <div><BarChart3 size={21} /><strong>Comparative judgment</strong><span>Listen across alternatives and identify what actually improved the result.</span></div>
                <div><Users size={21} /><strong>Explainable preference</strong><span>Move from “I like it” to a reasoned description of rhythm, hook, tone, clarity, or delivery.</span></div>
                <div><Cloud size={21} /><strong>Shared authorship</strong><span>Contribute one component to a class-level artifact without needing every idea to win.</span></div>
                <div><GraduationCap size={21} /><strong>Knowledge retrieval</strong><span>Hear the target information repeatedly, then explain it outside the song.</span></div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionNumber}>03</div>
            <div>
              <p className={styles.eyebrow}>ANY SUBJECT THAT CAN BE EXPLAINED</p>
              <h2>The Panama Canal is only one example.</h2>
              <p className={styles.bodyCopy}>
                The reusable capability is the pipeline: teacher-controlled content, rapid musical variation, structured listening, and guided discussion. The subject can change without rebuilding the operating model.
              </p>
              <div className={styles.subjectCloud}>
                {subjectExamples.map((subject) => <span key={subject}>{subject}</span>)}
              </div>
              <blockquote className={styles.pullQuote}>
                Students think they are comparing hooks, beats, and genres. The curriculum keeps repeating underneath every choice.
              </blockquote>
            </div>
          </section>

          <section className={`${styles.section} ${styles.languageSection}`}>
            <div className={styles.sectionNumber}>04</div>
            <div>
              <p className={styles.eyebrow}>MULTILINGUAL POSSIBILITY</p>
              <h2>Music can hold two languages in the same learning object.</h2>
              <div className={styles.languageLayout}>
                <div className={styles.languageIcon}><Languages size={48} /></div>
                <div>
                  <p className={styles.bodyCopy}>
                    A multilingual version could pair a student’s first language with the English curriculum target. A verse could establish meaning in Mandarin, Spanish, Japanese, or another home language, then repeat the same principle in English with aligned vocabulary and structure.
                  </p>
                  <p className={styles.bodyCopy}>
                    This may be especially useful in classrooms where students are learning grade-level content and English at the same time. It should be tested with teachers and language-learning specialists rather than assumed to work automatically.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionNumber}>05</div>
            <div>
              <p className={styles.eyebrow}>THE TEACHER IS NOT REMOVED</p>
              <h2>Human Authority remains at the center of the classroom.</h2>
              <div className={styles.guardrailGrid}>
                {guardrails.map((item) => (
                  <div key={item}><ShieldCheck size={19} /><span>{item}</span></div>
                ))}
              </div>
              <p className={styles.bodyCopy}>
                AI compresses music production. It does not select the educational objective, certify factual accuracy, manage the classroom, understand every student, or own the consequences. Those remain human responsibilities.
              </p>
            </div>
          </section>

          <section id="pilot" className={`${styles.section} ${styles.pilotSection}`}>
            <div className={styles.sectionNumber}>06</div>
            <div>
              <p className={styles.eyebrow}>A PILOT SMALL ENOUGH TO BREAK SAFELY</p>
              <h2>One teacher. One lesson. One class period.</h2>
              <div className={styles.pilotPlan}>
                <div><Clock3 size={22} /><strong>Duration</strong><span>30-minute classroom exercise plus a short teacher debrief.</span></div>
                <div><Users size={22} /><strong>Participants</strong><span>One existing class with normal teacher supervision.</span></div>
                <div><BookOpenCheck size={22} /><strong>Curriculum</strong><span>One clearly bounded concept already scheduled for instruction.</span></div>
                <div><Music2 size={22} /><strong>Production</strong><span>Prebuilt genre choices and a guarded prompt pipeline prepared before class.</span></div>
              </div>
              <h3 className={styles.measureTitle}>Measure the learning—not the novelty.</h3>
              <div className={styles.metrics}>
                {pilotMetrics.map(([title, question]) => (
                  <div key={title}><CheckCircle2 size={18} /><strong>{title}</strong><span>{question}</span></div>
                ))}
              </div>
            </div>
          </section>
        </article>

        <section className={styles.invitation}>
          <div>
            <p className={styles.eyebrow}>CHILDREN’S MEDIA × MUSIC × LEARNING DESIGN</p>
            <h2>Come improve it, break it, pilot it, fund it—or point us toward the person who should.</h2>
            <p>
              The immediate ask is not endorsement. It is informed pressure from educators, children’s media professionals, musicians, learning designers, accessibility specialists, and people who know where classroom ideas fail in practice.
            </p>
          </div>
          <div className={styles.invitationButtons}>
            <a href="/" className={styles.primaryButton}>Open Mason’s portfolio <ArrowRight size={17} /></a>
            <a href="https://suno.com/s/hUAYoK5UBjL1Wgaa" target="_blank" rel="noreferrer" className={styles.secondaryButton}>Hear Big Ditch Energy <Play size={17} /></a>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>© 2026 Mason Perry · NULLWORKS</span>
          <span><Globe2 size={14} /> Proposed pilot · Human Authority final.</span>
        </footer>
      </div>
    </main>
  );
}
