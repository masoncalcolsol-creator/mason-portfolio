import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private NARAXIS Briefing",
  description: "Encrypted patient-generated briefing.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function PrivateBriefingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
