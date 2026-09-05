import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AnvilGhostScroll from "./components/AnvilGhostScroll";
import PublicQuickNav from "./components/PublicQuickNav";
import PublicLinkNormalizer from "./components/PublicLinkNormalizer";
import PortfolioThemeShell from "./PortfolioThemeShell";
import "./globals.css";
import "./oisa.css";
import "./landing-fixes.css";
import "./public-quicknav.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://nullworks.systems"),
  title: {
    default: "NULLWORKS | AI Architecture for Consequential Systems",
    template: "%s | NULLWORKS",
  },
  description:
    "NULLWORKS designs governed software and operational architecture connecting humans, AI, applications, evidence, authority, and physical systems.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "NULLWORKS | AI Architecture for Consequential Systems",
    description:
      "Governed software and operational architecture for consequential human-AI systems.",
    type: "website",
    url: "https://nullworks.systems",
    siteName: "NULLWORKS",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AnvilGhostScroll />
        <PublicLinkNormalizer />
        <PortfolioThemeShell>{children}</PortfolioThemeShell>
        <PublicQuickNav />
      </body>
    </html>
  );
}
