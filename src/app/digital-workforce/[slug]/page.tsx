import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  GitBranch,
  Network,
  ShieldCheck,
  Star,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import ExecutivePortrait from "../ExecutivePortrait";
import { employees, getEmployee } from "../registry";
import styles from "./page.module.css";
import enh from "./profile-enhancements.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return employees.map((employee) => ({ slug: employee.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const employee = getEmployee(slug);

  if (!employee) {
    return { title: "Employee not found | NULLWORKS" };
  }

  return {
    title: `${employee.name} — ${employee.title} | NULLWORKS`,
    description: employee.mission,
    robots: {
      index: false,
      follow: false,
    },
  };
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export default async function EmployeeProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const employee = getEmployee(slug);

  if (!employee) {
    notFound();
  }

  const related = employees
    .filter((candidate) => candidate.department === employee.department && candidate.slug !== employee.slug)
    .slice(0, 4);

  const isFounder = employee.slug === "mason-perry";
  const isLeadership = employee.status === "EXECUTIVE";

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <Link href="/digital-workforce" className={styles.backLink}>
            <ArrowLeft size={17} /> Workforce directory
          </Link>
          <div className={styles.brand}>NULLWORKS // Employee System</div>
          <div className={styles.unlisted}>Unlisted profile</div>
        </header>

        <section className={`${styles.profileHero} ${styles[employee.accent]}`}>
          <div className={styles.cover}>
            <div className={styles.coverGrid} />
            <span>{employee.department}</span>
            <b>{employee.id}</b>
          </div>

          <div className={`${styles.identityRow} ${isLeadership ? enh.executiveIdentityRow : ""}`}>
            <div className={isLeadership ? enh.executivePicture : styles.avatar}>
              {isLeadership ? <ExecutivePortrait employee={employee} /> : initials(employee.name)}
            </div>
            <div className={styles.identityActions}>
              <span className={employee.status === "EXECUTIVE" ? styles.executivePill : styles.provisionalPill}>
                {isFounder ? "FOUNDER" : employee.status}
              </span>
              <span className={styles.registryPill}>{employee.registryState}</span>
            </div>
          </div>

          <div className={`${styles.identityCopy} ${isLeadership ? enh.executiveIdentityCopy : ""}`}>
            <div className={styles.nameLine}>
              <h1>{employee.name}</h1>
              <BadgeCheck size={25} />
            </div>
            <h2>{employee.title}</h2>
            <p>{employee.department} · NULLWORKS OI SUITe</p>
          </div>

          <div className={styles.profileMetrics}>
            <div><strong>{isFounder ? "Founder" : employee.status === "EXECUTIVE" ? "Digital executive" : "Specialist"}</strong><span>workforce class</span></div>
            <div><strong>{employee.registryState}</strong><span>registry state</span></div>
            <div><strong>{employee.reportsTo}</strong><span>reports / escalates to</span></div>
          </div>
        </section>

        <div className={styles.contentGrid}>
          <div className={styles.mainColumn}>
            <section className={styles.card}>
              <div className={styles.cardEyebrow}><UserRoundCheck size={16} /> About</div>
              <p className={styles.about}>{employee.about}</p>
            </section>

            {isLeadership ? (
              <>
                <section className={enh.featuredCard}>
                  <div className={styles.cardEyebrow}><Star size={16} /> Featured operating doctrine</div>
                  <blockquote>“{employee.motto}”</blockquote>
                  <p>{employee.mission}</p>
                </section>

                <section className={styles.card}>
                  <div className={styles.cardEyebrow}><BriefcaseBusiness size={16} /> Experience</div>
                  <div className={enh.experienceItem}>
                    <div className={enh.experienceMark}>NW</div>
                    <div>
                      <h3>{employee.title}</h3>
                      <strong>NULLWORKS · Current operating role</strong>
                      <span>{employee.department} · OI SUITe</span>
                      <p>{employee.mission}</p>
                    </div>
                  </div>
                </section>

                <section className={styles.card}>
                  <div className={styles.cardEyebrow}><Activity size={16} /> Operating activity</div>
                  <div className={enh.activityList}>
                    <article>
                      <span>Current lane</span>
                      <p>Owns the bounded {employee.department.toLowerCase()} mission and returns evidence, state, and escalation receipts.</p>
                    </article>
                    <article>
                      <span>Authority posture</span>
                      <p>Executes and recommends inside the assigned lane while Mason Perry retains final human authority.</p>
                    </article>
                    <article>
                      <span>Continuous improvement</span>
                      <p>Uses corrections, failures, and review feedback to improve future packets without silently changing company canon.</p>
                    </article>
                  </div>
                </section>
              </>
            ) : null}

            <section className={styles.card}>
              <div className={styles.cardEyebrow}><Workflow size={16} /> Operating lane</div>
              <h3>{employee.mission}</h3>
              <div className={styles.laneFlow}>
                <span>Receive bounded packet</span>
                <b>→</b>
                <span>Execute specialty</span>
                <b>→</b>
                <span>Return evidence + state</span>
                <b>→</b>
                <span>Escalate or close</span>
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.cardEyebrow}><Network size={16} /> Skills and capabilities</div>
              <div className={styles.skills}>
                {employee.skills.map((skill, index) => (
                  <div key={skill}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{skill}</strong>
                  </div>
                ))}
              </div>
            </section>

            {!isLeadership ? (
              <section className={styles.quoteCard}>
                <blockquote>“{employee.motto}”</blockquote>
                <span>{employee.name} // operating doctrine</span>
              </section>
            ) : null}

            <section className={styles.boundaryCard}>
              <ShieldCheck size={24} />
              <div>
                <strong>Authority boundary</strong>
                <p>
                  This employee may investigate, organize, retrieve, compare, draft, build, test, and recommend inside the assigned lane. Consequential action, public claims, sensitive access, and final interpretation remain subject to visible review and human authority.
                </p>
              </div>
            </section>
          </div>

          <aside className={styles.sideColumn}>
            <section className={styles.sideCard}>
              <div className={styles.cardEyebrow}><Building2 size={16} /> Company position</div>
              <dl>
                <div><dt>Department</dt><dd>{employee.department}</dd></div>
                <div><dt>Registry ID</dt><dd>{employee.id}</dd></div>
                <div><dt>Status</dt><dd>{isFounder ? "FOUNDER" : employee.status}</dd></div>
                <div><dt>Identity state</dt><dd>{employee.registryState}</dd></div>
                <div><dt>Escalation</dt><dd>{employee.reportsTo}</dd></div>
              </dl>
            </section>

            <section className={styles.sideCard}>
              <div className={styles.cardEyebrow}><GitBranch size={16} /> Related specialists</div>
              <div className={styles.relatedList}>
                {related.length > 0 ? related.map((candidate) => (
                  <Link key={candidate.id} href={`/digital-workforce/${candidate.slug}`}>
                    <span>{initials(candidate.name)}</span>
                    <div><strong>{candidate.name}</strong><small>{candidate.title}</small></div>
                  </Link>
                )) : (
                  <p>No other profiles currently share this department.</p>
                )}
              </div>
            </section>

            <section className={styles.truthCard}>
              <ShieldCheck size={22} />
              <strong>Registry note</strong>
              <p>
                LOCKED profiles are approved identities. RECOVERED profiles have operating-history support. SCAFFOLD profiles are provisional public-safe workcell identities pending a complete receipt and identity audit.
              </p>
            </section>
          </aside>
        </div>

        <footer className={styles.footer}>
          <span>{employee.name} // NULLWORKS Digital Workforce</span>
          <strong>Human authority remains final.</strong>
        </footer>
      </div>
    </main>
  );
}
