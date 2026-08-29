import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnvilShell from "../AnvilShell";
import { getProject, projects } from "../catalog";
import NanWisdomPlayer from "../../nan-wisdom/page";
import NonOperaItalicaPlayer from "../../non-opera-italica/page";
import VexLikesSexPlayer from "../../9v-vex-likes-sex/page";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: `${project.name} | NULLWORKS // ANVIL`, description: project.summary } : {};
}

export default async function AnvilProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // Preserve the full listening-room implementations where they already exist.
  // The canonical ANVIL route is the stable URL; the player remains the project experience.
  if (slug === "nan-wisdom") return <AnvilShell accent={project.accent}><NanWisdomPlayer /></AnvilShell>;
  if (slug === "non-opera-italica") return <AnvilShell accent={project.accent}><NonOperaItalicaPlayer /></AnvilShell>;
  if (slug === "9-volt") return <AnvilShell accent={project.accent}><VexLikesSexPlayer /></AnvilShell>;

  const index = projects.findIndex((item) => item.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return (
    <AnvilShell accent={project.accent}>
      <style>{`
        .projectHero{width:min(1180px,calc(100% - 32px));margin:auto;padding:clamp(55px,9vw,120px) 0 70px;position:relative;overflow:hidden}.projectHero:after{content:attr(data-texture);position:absolute;right:-2%;top:20%;font:950 clamp(45px,9vw,130px)/.8 ui-monospace,monospace;color:color-mix(in srgb,var(--accent) 6%,transparent);transform:rotate(-5deg);max-width:70%;text-align:right;pointer-events:none}.projectEyebrow{color:var(--accent);font:950 11px ui-monospace,monospace;letter-spacing:.16em}.projectHero h1{position:relative;z-index:2;margin:20px 0 0;max-width:1050px;font-size:clamp(68px,13vw,175px);line-height:.77;letter-spacing:-.075em}.projectLead{position:relative;z-index:2;max-width:880px;margin:34px 0 0;color:#c3beb4;font-size:clamp(19px,2.4vw,28px);line-height:1.52}.status{display:inline-block;margin-top:26px;border:1px solid color-mix(in srgb,var(--accent) 55%,#333);border-radius:999px;padding:9px 12px;color:var(--accent);font:900 10px ui-monospace,monospace;letter-spacing:.12em}.projectGrid{width:min(1180px,calc(100% - 32px));margin:auto;display:grid;grid-template-columns:1fr 1fr;gap:14px}.panel{border:1px solid #302e29;border-radius:25px;padding:clamp(22px,4vw,38px);background:linear-gradient(145deg,color-mix(in srgb,var(--accent) 5%,#0a0a09),#090909)}.panelLabel{color:var(--accent);font:900 10px ui-monospace,monospace;letter-spacing:.15em}.panel h2{margin:12px 0 22px;font-size:clamp(35px,5vw,66px);line-height:.9;letter-spacing:-.055em}.fact{padding:15px 0;border-top:1px solid #2c2a26;color:#c5c0b6;font-weight:750}.work{display:flex;gap:15px;align-items:baseline;padding:14px 0;border-top:1px solid #2c2a26}.work b{color:var(--accent);font:900 11px ui-monospace,monospace}.work span{font-size:18px;font-weight:850}.projectPager{width:min(1180px,calc(100% - 32px));margin:14px auto 0;display:grid;grid-template-columns:1fr 1fr;gap:14px}.projectPager a{border:1px solid #302e29;border-radius:20px;padding:18px;color:#aaa49a;text-decoration:none;font:850 12px ui-monospace,monospace}.projectPager a:last-child{text-align:right}.projectPager strong{display:block;margin-top:6px;color:#eee9df;font-size:17px}@media(max-width:760px){.projectGrid,.projectPager{grid-template-columns:1fr}.projectHero:after{top:12%;max-width:100%}}
      `}</style>
      <header className="projectHero" data-texture={project.texture}>
        <div className="projectEyebrow">{project.kicker}</div>
        <h1>{project.name}</h1>
        <p className="projectLead">{project.summary}</p>
        <span className="status">{project.status}</span>
      </header>
      <section className="projectGrid">
        <article className="panel"><div className="panelLabel">IDENTITY CONTRACT</div><h2>What stays true.</h2>{project.facts.map((fact) => <div className="fact" key={fact}>{fact}</div>)}</article>
        <article className="panel"><div className="panelLabel">CANON / WORKS</div><h2>{project.works?.length ? "Known material." : "System status."}</h2>{project.works?.length ? project.works.map((work, i) => <div className="work" key={work}><b>{String(i + 1).padStart(2,"0")}</b><span>{work}</span></div>) : <><div className="fact">Project identity preserved under the canonical ANVIL hierarchy.</div><div className="fact">Release media and provenance can be attached without changing this route.</div><div className="fact">Future GOBLIN TRACT relationships belong behind the project, not in a disposable brochure.</div></>}</article>
      </section>
      <nav className="projectPager"><Link href={`/anvil/${prev.slug}`}>← PREVIOUS<strong>{prev.name}</strong></Link><Link href={`/anvil/${next.slug}`}>NEXT →<strong>{next.name}</strong></Link></nav>
    </AnvilShell>
  );
}
