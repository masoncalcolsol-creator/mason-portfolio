import type { Metadata } from "next";
import { BulletGrid, FieldNoteShell, H2, Lead, P, Quote, TruthBox } from "../_components/FieldNoteShell";
import diagramStyles from "../da-vinci-vs-toyota/page.module.css";
import TestFlightReceipt from "./TestFlightReceipt";

export const metadata: Metadata = {
  title: "ORI TAC OPS Was the OISA Beta Test We Did Not Know We Were Running | NULLWORKS",
  description:
    "How a field operator observed a normalized logistics exception, reconstructed the hidden human-machine workflow, and built the missing human-centered work cell.",
};

function OISACaseDiagram() {
  return (
    <section className={diagramStyles.diagram} aria-labelledby="oisa-case-diagram-title">
      <div className={diagramStyles.diagramHeader}>
        <div>
          <div className={diagramStyles.diagramEyebrow}>Field-originated operating architecture</div>
          <h3 id="oisa-case-diagram-title" className={diagramStyles.diagramTitle}>The OISA method inside ORI TAC OPS</h3>
        </div>
        <div className={diagramStyles.diagramBadge}>Observe → recover → build → measure</div>
      </div>

      <div className={diagramStyles.systemGrid}>
        <div className={`${diagramStyles.systemNode} ${diagramStyles.intake}`}>
          <span>01</span>
          <strong>Gemba observation</strong>
          <p>A recurring damaged-label exception appears inside real work rather than inside a generic AI use case.</p>
        </div>

        <div className={`${diagramStyles.systemNode} ${diagramStyles.boardroom}`}>
          <span>02</span>
          <strong>Exception tracing</strong>
          <p>The visible label failure is followed through ambiguity, handoffs, downstream handling, and accountability.</p>
        </div>

        <div className={`${diagramStyles.systemNode} ${diagramStyles.memory}`}>
          <span>03</span>
          <strong>Evidence recovery</strong>
          <p>Surviving text, images, tracking blocks, corrections, and uncertainty stay attached to the case.</p>
        </div>

        <div className={`${diagramStyles.systemNode} ${diagramStyles.specialists}`}>
          <span>04</span>
          <strong>Bounded digital roles</strong>
          <p>Capture, OCR, validation, routing, printing, and receipt creation are separated into visible functions.</p>
        </div>

        <div className={diagramStyles.operator}>
          <div className={diagramStyles.operatorHalo} aria-hidden="true" />
          <div className={diagramStyles.operatorLabel}>Human operator</div>
          <div className={diagramStyles.operatorTitle}>Verify. Correct. Decide.</div>
          <p>The employee owns interpretation, approval, escalation, and final responsibility when automation meets reality.</p>
          <div className={diagramStyles.authorityPill}>Approved process remains final</div>
        </div>

        <div className={`${diagramStyles.systemNode} ${diagramStyles.telemetry}`}>
          <span>05</span>
          <strong>Uncertainty exposed</strong>
          <p>Low confidence, unreadable fields, conflicting interpretations, and manual corrections remain visible.</p>
        </div>

        <div className={`${diagramStyles.systemNode} ${diagramStyles.workers}`}>
          <span>06</span>
          <strong>Portable work cell</strong>
          <p>Phone, web interface, printer, helper labels, hard case, and training path become one testable field article.</p>
        </div>

        <div className={`${diagramStyles.systemNode} ${diagramStyles.review}`}>
          <span>07</span>
          <strong>Authority-safe routing</strong>
          <p>The prototype becomes a controlled-pilot request instead of silently entering institutional production.</p>
        </div>

        <div className={`${diagramStyles.systemNode} ${diagramStyles.delivery}`}>
          <span>08</span>
          <strong>Telemetry + kaizen</strong>
          <p>Recovery rate, human time, false recovery, rework, burden, cost, and unresolved risks become the next test.</p>
        </div>
      </div>

      <div className={diagramStyles.flowLine}>
        <span>Observe real work</span>
        <b>→</b>
        <span>follow the exception</span>
        <b>→</b>
        <span>protect human authority</span>
        <b>→</b>
        <span>build the smallest work cell</span>
      </div>
    </section>
  );
}

export default function OriTacOpsOisaBetaTestPage() {
  return (
    <FieldNoteShell
      number={7}
      standalone
      standaloneLabel="OISA case study // pre-release test flight"
      eyebrow="Gemba discovery // Human authority // Rapid prototyping"
      title="ORI TAC OPS Was the OISA Beta Test We Did Not Know We Were Running"
      deck="A blue-collar operator entered an unfamiliar system, found a normalized exception, reconstructed the hidden human-machine workflow, and fabricated the missing work cell."
    >
      <Lead>
        For months, I treated ORI TAC OPS as a software project. That description is incomplete. The software matters, but the more important artifact is the behavior that produced it.
      </Lead>

      <P>
        I entered a large physical operating system without being trained as a logistics-software product manager. I encountered a recurring exception: damaged, degraded, incomplete, or unreadable parcel labels created work that the normal automated flow could not complete cleanly.
      </P>

      <P>
        The organization already had people, machines, scanners, sorting logic, manual recovery practices, downstream handling, and institutional knowledge. What it did not appear to have at the point I was observing was one simple, portable, human-controlled work cell that could preserve surviving evidence, expose uncertainty, support correction, and create a recovery receipt.
      </P>

      <Quote>
        Software was the fixture required to test the operating-system hypothesis.
      </Quote>

      <H2>The real sequence</H2>

      <BulletGrid
        items={[
          {
            title: "Observe the exception",
            body: "Begin with real work and a normalized failure, not with a generic AI use case looking for somewhere to land.",
          },
          {
            title: "Follow the hidden work",
            body: "Trace ambiguity, evidence loss, human judgment, handoffs, downstream delay, and accountability beyond the visible symptom.",
          },
          {
            title: "Define authority",
            body: "Separate what a machine may assist from what a human must verify, approve, reject, or escalate.",
          },
          {
            title: "Fabricate the work cell",
            body: "Build the interface, hardware configuration, evidence flow, and training path required to test the operating theory in reality.",
          },
        ]}
      />

      <OISACaseDiagram />

      <H2>What ORI TAC OPS became</H2>

      <P>
        The working concept combined a mobile capture interface, OCR-assisted extraction, editable human correction, tracking-block and destination recovery, helper-label printing, a portable hard-case configuration, a Brother QL-820NWB label printer, QR-linked deployment and training paths, human-in-the-loop exception handling, and a visible evidence trail.
      </P>

      <P>
        Those pieces matter because they form a complete work cell. The app alone is not the system. The system is the relationship among the operator, the evidence, the machine interpretation, the correction path, the physical printer, the helper output, the authority boundary, and the next approved handoff.
      </P>

      <H2>What the prototype does not claim</H2>

      <TruthBox title="Institutional and evidence boundary">
        ORI TAC OPS is an independent human-centered logistics exception-recovery concept with a working portable prototype and a controlled-pilot request. It is not an approved, authorized, purchased, connected, or deployed USPS production system. No controlled pilot has yet validated recovery rates, exact savings, training time, enterprise impact, or a 40x return on investment.
      </TruthBox>

      <P>
        That boundary is not a weakness. It is evidence that the architecture recognizes authority. A prototype that enters a serious institution without permission is not human-centered operational intelligence. It is an unmanaged risk.
      </P>

      <H2>The institutional-routing receipt</H2>

      <P>
        The concept did not remain trapped on a personal laptop. After a senior Postal technology leader publicly invited me to submit it through Postal channels, I sent the controlled-pilot packet from my USPS email. The response described the concept as interesting and routed it toward technical review.
      </P>

      <P>
        That is not approval, procurement, deployment, or endorsement. It is a real routing receipt: a field-originated operating concept advanced far enough to enter the appropriate institutional conversation.
      </P>

      <H2>Why this is evidence for OISA</H2>

      <BulletGrid
        items={[
          {
            title: "Gemba discovery",
            body: "The opportunity was found by watching actual work and following an exception across the operating system.",
          },
          {
            title: "Human-centered architecture",
            body: "The system assists extraction while the employee retains verification, judgment, escalation, and final authority.",
          },
          {
            title: "Specialized digital work",
            body: "Capture, OCR, validation, printing, routing, and evidence are bounded functions rather than one magical autonomous agent.",
          },
          {
            title: "Live prototyping",
            body: "Software and hardware were fabricated because the operating theory required a physical, testable article.",
          },
          {
            title: "Failure visibility",
            body: "Uncertain data remains editable and visible instead of being silently converted into false confidence.",
          },
          {
            title: "Institutional restraint",
            body: "The work was translated into a bounded pilot request rather than treated as permission to deploy.",
          },
        ]}
      />

      <Quote>
        The OISA title did not produce TAC OPS. TAC OPS is one of the receipts that produced the OISA title.
      </Quote>

      <H2>The retrospective realization</H2>

      <P>
        ORI TAC OPS appeared before NULLWORKS had a mature public identity. The same pattern later appeared in lending, legal evidence, music production, travel, continuity recovery, and other systems: find the real human constraint, recover missing context, define authority, organize bounded digital capability, build the smallest functioning work cell, run the case, preserve failure, and improve the system.
      </P>

      <P>
        We were not repeatedly building unrelated apps. We were repeatedly testing the same operating discipline in different environments.
      </P>

      <H2>The ROI question</H2>

      <P>
        There may be a substantial economic case, but the current evidence does not support publishing a specific return as fact. A valid pilot would measure exception volume, current handling, operator minutes, downstream transportation and handling, recovery rate, false recovery, rework, disposal or redirection outcomes, training burden, hardware cost, support cost, privacy, safety, and human cognitive load.
      </P>

      <TruthBox title="ROI hypothesis">
        The previously discussed 40x possibility belongs in the hypothesis ledger, not the headline. A serious financial model begins only after the current-state process and controlled-pilot telemetry are available.
      </TruthBox>

      <H2>The developing profession</H2>

      <P>
        The role is not “person who makes an app for every problem.” A Human-Centered Operational Intelligence Systems Architect enters a real system, discovers how human and digital work actually interact, recovers the WHY and WHEN behind the process, defines evidence and authority, and rapidly prototypes the work cells required to improve the complete operating system.
      </P>

      <P>
        ORI TAC OPS does not prove that the entire profession is validated. It is evidence that the behavior already produces real, inspectable artifacts.
      </P>

      <H2>The scrutiny request</H2>

      <P>
        I want operators, Postal experts, logistics engineers, industrial engineers, human-factors researchers, software engineers, and skeptics to challenge the case. Is this industrial engineering, systems engineering, product management, forward-deployed engineering, or something else? Which part requires a new professional category? What pilot data would be sufficient? Where could this work cell create false confidence or more burden than value?
      </P>

      <Quote>
        Enter the system. Find the hidden leak. Recover the reason. Protect the human. Build the work cell. Measure what changes. Preserve what survives.
      </Quote>

      <P>
        I did not enter the Postal Service intending to become a software developer. I encountered a system that could not explain one of its recurring exceptions clearly enough for me to stop asking why, so I built the missing test article.
      </P>

      <P>
        ORI TAC OPS was not a side software project. It was an early OISA field test running in plain sight.
      </P>

      <TestFlightReceipt />
    </FieldNoteShell>
  );
}
