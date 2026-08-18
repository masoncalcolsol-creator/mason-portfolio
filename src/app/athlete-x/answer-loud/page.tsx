import type { Metadata } from "next";
import AnswerLoudExperience from "./AnswerLoudExperience";

export const metadata: Metadata = {
  title: "ANSWER LOUD | Athlete X",
  description: "Seven sports. Seven original sonic identities. One proof that athletes should own their sound.",
};

export default function AnswerLoudPage() {
  return <AnswerLoudExperience />;
}
