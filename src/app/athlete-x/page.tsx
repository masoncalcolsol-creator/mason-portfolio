import type { Metadata } from "next";
import AthleteExperience from "./AthleteExperience";

export const metadata: Metadata = {
  title: "ANVIL Athlete X | Custom Athlete Soundtrack System",
  description: "A live concept showing how one athlete identity can move across sports, genres, campaigns, and markets.",
};

export default function AthleteXPage() {
  return <AthleteExperience />;
}
