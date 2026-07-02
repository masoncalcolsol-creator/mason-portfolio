import type { Metadata } from "next";
import { BulletGrid, FieldNoteShell, H2, Lead, P, Quote, TruthBox } from "../_components/FieldNoteShell";

export const metadata: Metadata = {
  title: "Let the Expert Expert | NULLWORKS OI Field Notes",
  description:
    "Human-centered AI should remove friction around experts, preserve their authority, and make their knowledge easier to apply—not replace them blindly.",
};

const HITESH_POST =
  "https://www.linkedin.com/posts/jain-hitesh_aitinkerers-share-7478103608933105665-YD1-/?utm_source=share&utm_medium=member_android&rcm=ACoAAFkqbQUBGKLAGhj7Y8TVjaU1DKwScLLC3tc";

export default function LetTheExpertExpertPage() {
  return (
    <FieldNoteShell
      number={1}
      eyebrow="Human-centered AI // operator authority"
      title="Let the Expert Expert"
      deck="The first job of AI is not to remove the person who understands the work. It is to remove the friction preventing that person from using what they know."
      source={{ label: "Hitesh Jain's AI Tinkerers LinkedIn share", href: HITESH_POST }}
    >
      <Lead>
        The most useful AI question is not “Which jobs can disappear?” It is “What prevents a willing expert from applying their judgment at full strength?”
      </Lead>

      <P>
        A good mechanic loses time searching manuals, reconstructing prior failures, retyping notes, waiting for parts information, and translating field evidence into paperwork. A lender loses time comparing changing programs, rebuilding context, and searching scattered documents. A legal professional loses time locating source material, rebuilding timelines, and separating fact from repetition. A postal employee loses time when damaged labels, fragmented records, and disconnected systems hide the next recoverable action.
      </P>

      <P>
        None of those examples begin with a shortage of human intelligence. They begin with a shortage of usable structure around the intelligence already present.
      </P>

      <Quote>
        AI should not replace the expert. It should remove the searching, retyping, waiting, context rebuilding, and administrative drag that prevents the expert from expert-ing.
      </Quote>

      <H2>Two signals arrived at the same time</H2>

      <P>
        In late June, Hitesh Jain shared an AI Tinkerers discussion on LinkedIn about harnessing AI. The post was another signal that the industry is moving beyond novelty and asking a harder question: how should humans direct these systems responsibly and productively?
      </P>

      <P>
        At nearly the same moment, I submitted TAC OPS—an independent human-in-the-loop logistics exception-recovery concept—to USPS technology leadership. Gary C. Reblin, the Chief Technology Officer of the United States Postal Service, replied that the concept looked interesting and routed it for technical evaluation.
      </P>

      <TruthBox>
        TAC OPS is not an authorized, approved, or deployed USPS system. It is an independently developed prototype concept. The public receipt is narrower and still meaningful: a human-centered AI strategy created by a frontline electronics technician reached senior technical leadership, received a direct response, and was forwarded for evaluation.
      </TruthBox>

      <P>
        That interaction mattered because the central premise was not “replace postal employees.” It was the opposite. Preserve the employee who understands the physical reality, then give that employee a better operating layer for evidence, exceptions, recovery, and learning.
      </P>

      <H2>The expert is more than a user</H2>

      <P>
        Traditional software often treats the operator as the final recipient of a system designed elsewhere. Human-centered Operational Intelligence treats the operator as part of the control architecture.
      </P>

      <BulletGrid
        items={[
          {
            title: "The expert supplies reality",
            body: "They know the exceptions, informal workarounds, failure patterns, customer pressures, and physical constraints that rarely appear in a clean requirements document.",
          },
          {
            title: "AI supplies compression",
            body: "It can retrieve, compare, organize, draft, classify, simulate, and expose patterns faster than a human can manually rebuild the same context.",
          },
          {
            title: "The system supplies structure",
            body: "It connects evidence, decisions, ownership, work state, authority, and feedback so that useful output does not disappear into another conversation.",
          },
          {
            title: "The human supplies authority",
            body: "The accountable person decides what is true enough, safe enough, appropriate enough, and authorized enough to become action.",
          },
        ]}
      />

      <H2>Automation is not the same as augmentation</H2>

      <P>
        Automation asks whether a task can be completed without a person touching it. Augmentation asks whether the person can make a better decision, recover faster, handle more complexity, or spend more time on the part of the job that requires judgment.
      </P>

      <P>
        Some work should be automated. Repetitive transfers, routine classification, document preparation, and low-risk checks can often be safely compressed. But the presence of automation does not erase the need for a visible authority model. The more consequential the action, the more important it becomes to know which source was used, what remains uncertain, who reviewed the output, and who approved the result.
      </P>

      <Quote>
        “Human in the loop” should not mean a person is added at the end to absorb liability. The human should be designed into the operating system from the beginning.
      </Quote>

      <H2>The employee becomes the improvement engine</H2>

      <P>
        The willing operator is not merely protected by this model. They become more valuable. Every correction can teach the system. Every unusual case can strengthen the exception library. Every recovery can become a reusable procedure. Every failure can become a receipt instead of vanishing into institutional amnesia.
      </P>

      <P>
        That is the bridge from ordinary AI assistance to Operational Intelligence: the system does not merely produce answers. It captures the relationship between work, evidence, decisions, authority, results, and learning.
      </P>

      <P>
        Once that operating loop begins working, another problem appears. A single expert may no longer be directing one assistant. They may be directing many specialized AI workers, tools, workrooms, and automated processes. The expert has gained capacity—but also inherited a coordination burden.
      </P>

      <Quote>
        The next problem is not whether AI can help the expert. It is how the expert controls the digital workforce without becoming the new bottleneck.
      </Quote>
    </FieldNoteShell>
  );
}
