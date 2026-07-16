import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Factory,
  Hammer,
  Layers3,
  Network,
  Orbit,
  Sparkles,
  UserRoundCheck,
  Wrench,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "POLYMATH³ | Mason Perry · NULLWORKS",
  description:
    "When cross-domain knowledge becomes an operating system: physical-world competence, synthesis, and an organized AI workforce.",
};

const layers = [
  {
    mark: "¹",
    title: "Polymath",
    body: "Knowledge across multiple domains. The person can learn, translate, and operate beyond one professional lane.",
    icon: Layers3,
  },
  {
    mark: "²",
    title: "Polymath Squared",
    body: "The domains begin multiplying one another. A lesson from one field changes how work is understood in another.",
    icon: Orbit,
  },
  {
    mark: "³",
    title: "Polymath Cubed",
    body: "AI turns the combined knowledge into an executable organizational system that can preserve, test, translate, and instantiate the connections.",
    icon: Network,
  },
];

const operatingFields = [
  ["Physical operations", "Machines, maintenance, constraints, safety, failure, recovery, and the reality of work under pressure."],
  ["Software and AI", "Models, APIs, interfaces, tools, permissions, orchestration, evidence, and deployment."],
  ["Creative production", "Music, visual direction, canon, versioning, emotional intent, selection, and human authorship."],
  ["Evidence systems", "Source receipts, provenance, chronology, uncertainty, review, and consequence ownership."],
  ["Business workflows", "Lending, intake, hiring, handoffs, exceptions, implementation, and measurable compression."],
  ["Organizational design", "Roles, authority, memory, continuity, telemetry, quality gates, and human control."],
];

export default function PolymathThreePage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <span className={styles.brandMark}>NW</span>
            <span>
              <strong>NULLWORKS FIELD ESSAY</strong>
              <small>Mason Perry · Operational Intelligence Systems Architect</small>
            </span>
          </a>
          <nav className={styles.nav}>
            <a href="/operating-map"><Network size={16} /> Operating map</a>
            <a href="/"><ArrowLeft size={16} /> Portfolio</a>
          </nav>
        </header>

        <section className={styles.hero}>
          <div>
            <div className={styles.kicker}><Sparkles size={16} /> FIELD NOTE // POLYMATH³</div>
            <h1>When cross-domain knowledge becomes an operating system.</h1>
            <p className={styles.lead}>
              A modern polymath is no longer limited by how many disciplines one person can personally execute. The new constraint is whether they can organize knowledge, tools, humans, and AI into one coherent system.
            </p>
            <div className={styles.heroActions}>
              <a href="#essay" className={styles.primaryButton}>Read the essay <ArrowRight size={17} /></a>
              <a href="/software-recency-bias" className={styles.secondaryButton}>Read the companion essay</a>
            </div>
          </div>

          <aside className={styles.heroPanel}>
            <div className={styles.cube}>³</div>
            <p className={styles.panelLabel}>THE THESIS</p>
            <blockquote>
              I am not trying to become the best specialist in every room. I am building the system that lets every specialist, tool, and lesson work together.
            </blockquote>
          </aside>
        </section>

        <section className={styles.layerGrid}>
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <article key={layer.mark} className={styles.layerCard}>
                <div className={styles.layerTop}><Icon size={23} /><span>{layer.mark}</span></div>
                <h2>{layer.title}</h2>
                <p>{layer.body}</p>
              </article>
            );
          })}
        </section>

        <article id="essay" className={styles.article}>
          <section className={styles.section}>
            <div className={styles.sectionNumber}>01</div>
            <div>
              <p className={styles.eyebrow}>NOT A COLLECTION OF HOBBIES</p>
              <h2>The point is not knowing a little about many things.</h2>
              <p>
                “Polymath” is often flattened into a personality label: curious, multi-passionate, distractible, interested in too many things. That misses the operational value.
              </p>
              <p>
                The useful version is not accumulation. It is transfer. A machine failure changes how you think about software reliability. A lending workflow changes how you think about missing information. A song production pipeline changes how you think about version control, canon, and human review. A legal evidence system changes how you think about source receipts everywhere else.
              </p>
              <blockquote className={styles.pullQuote}>The value is not the number of domains. It is the number of useful connections between them.</blockquote>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionNumber}>02</div>
            <div>
              <p className={styles.eyebrow}>THE SECOND EXPONENT</p>
              <h2>Polymath² begins when the fields multiply one another.</h2>
              <p>
                Cross-domain judgment creates leverage because mature real-world systems contain lessons that newer technical fields often rediscover from scratch: authority, handoffs, quality gates, maintenance, exceptions, apprenticeship, evidence, and continuity.
              </p>
              <p>
                The operator stops asking, “What does this industry normally do?” and starts asking, “Where else has this exact class of problem already been solved?”
              </p>
            </div>
          </section>

          <section className={`${styles.section} ${styles.darkSection}`}>
            <div className={styles.sectionNumber}>03</div>
            <div>
              <p className={styles.eyebrow}>THE THIRD EXPONENT</p>
              <h2>AI makes the synthesis executable.</h2>
              <p>
                The historical limitation of the polymath was bandwidth. One person could see connections across domains but still had to personally research, draft, test, document, translate, build, and maintain every output.
              </p>
              <p>
                An organized AI workforce changes that boundary. Specialist workrooms can preserve local context, translate lessons across domains, produce governed artifacts, compare options, expose assumptions, and return work for human review.
              </p>
              <div className={styles.formula}>
                <div><UserRoundCheck size={25} /><strong>Human judgment</strong><span>Meaning, authority, consequence, taste</span></div>
                <div className={styles.plus}>×</div>
                <div><Layers3 size={25} /><strong>Cross-domain knowledge</strong><span>Transferable patterns and lived context</span></div>
                <div className={styles.plus}>×</div>
                <div><BrainCircuit size={25} /><strong>Organized AI workforce</strong><span>Execution, continuity, comparison, scale</span></div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionNumber}>04</div>
            <div>
              <p className={styles.eyebrow}>THE OPERATING FIELD</p>
              <h2>One operator. Multiple realities. One system.</h2>
              <div className={styles.fieldGrid}>
                {operatingFields.map(([title, body]) => (
                  <div key={title} className={styles.fieldCard}>
                    <Wrench size={19} />
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </div>
                ))}
              </div>
              <p>
                These fields do not sit beside one another as unrelated interests. They continuously exchange methods. Industrial maintenance contributes failure thinking. Evidence architecture contributes receipts. Creative production contributes direction and canon. AI contributes scale. Organizational design holds the entire system together.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionNumber}>05</div>
            <div>
              <p className={styles.eyebrow}>SPECIALISTS STILL MATTER</p>
              <h2>This is not a claim that expertise is obsolete.</h2>
              <p>
                A polymathic operator should not pretend to possess every specialist’s depth. The advantage is knowing enough to recognize the class of problem, ask better questions, recruit the right capability, establish the boundary, and integrate the answer into the larger operating model.
              </p>
              <p>
                The specialist is not diminished by being part of a system. Neither is the operator. Neither is the AI. The value comes from placing each resource where it can contribute without confusing one component for the whole.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionNumber}>06</div>
            <div>
              <p className={styles.eyebrow}>THE REAL MOAT</p>
              <h2>The reusable capability is the synthesis engine.</h2>
              <p>
                Individual applications may be temporary. Models will change. Vendors will disappear. Interfaces will be replaced. The durable asset is the operating structure that can absorb a new problem, preserve its context, connect it to prior knowledge, assign the right resources, and produce a usable intervention.
              </p>
              <blockquote className={styles.finalQuote}>
                Polymath³ is not knowing everything. It is building a system that can make everything you know work together.
              </blockquote>
            </div>
          </section>
        </article>

        <section className={styles.cta}>
          <div>
            <p className={styles.eyebrow}>NULLWORKS // OPERATIONAL INTELLIGENCE</p>
            <h2>The applications are proof vehicles. The reusable factory is the product.</h2>
          </div>
          <div className={styles.ctaActions}>
            <a href="/operating-map" className={styles.primaryButton}>Open the operating map <ArrowRight size={17} /></a>
            <a href="/second-shift-ai" className={styles.secondaryButton}>See the second digital life</a>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>© 2026 Mason Perry · NULLWORKS</span>
          <span>Human Authority final.</span>
        </footer>
      </div>
    </main>
  );
}
