import type { Metadata } from "next";
import LivingSignalSamplePage from "../[slug]/page";
import EnhancedSonarContacts from "./EnhancedSonarContacts";

export const metadata: Metadata = {
  title: "Sonar Fish | NULLWORKS Living Signal Framework",
  description:
    "A grayscale sonar field with a pale scanner, expanding pings, and rare digital fish events, including occasional skeletal reveals.",
};

export default function SonarFishPage() {
  return (
    <>
      <EnhancedSonarContacts />
      <LivingSignalSamplePage params={Promise.resolve({ slug: "sonar-fish" })} />
    </>
  );
}
