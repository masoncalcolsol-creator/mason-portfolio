import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Amplification Seam | Goblin Clock",
  description:
    "A live NULLWORKS visualization showing how an 11.861-second measurement seam becomes 19 minutes 46.1 seconds under 100× time compression.",
  openGraph: {
    title: "The Amplification Seam | Goblin Clock",
    description:
      "AI does not create the seam. It compresses consequence until the seam becomes impossible to ignore.",
    type: "website",
  },
};

export default function GoblinAmplificationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
