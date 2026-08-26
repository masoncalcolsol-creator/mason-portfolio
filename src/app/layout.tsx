import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AnvilGhostScroll from "./components/AnvilGhostScroll";
import PublicQuickNav from "./components/PublicQuickNav";
import "./globals.css";
import "./oisa.css";
import "./landing-fixes.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mason-portfolio-main.vercel.app"),
  title: { default: "Mason Perry | Operational Intelligence Systems Architect", template: "%s | Mason Perry" },
  description: "Founder of NULLWORKS. I design human-readable Operational Intelligence systems that coordinate experts, AI workers, workflows, evidence, authority, continuity, and telemetry.",
  openGraph: {
    title: "Mason Perry | Operational Intelligence Systems Architect",
    description: "Human-centered AI orchestration, OI SUITes, workflow compression, and forward-deployed applied-AI systems.",
    type: "website",
    url: "https://mason-portfolio-main.vercel.app",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AnvilGhostScroll />
        {children}
        <PublicQuickNav />
      </body>
    </html>
  );
}
