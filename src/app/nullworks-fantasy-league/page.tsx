import type { Metadata } from "next";
import FantasyApp from "./FantasyApp";

export const metadata: Metadata = {
  title: "NULLWORKS Fantasy League",
  description: "A complete local-first fantasy football league operating system with accounts, league creation, snake draft, rosters, lineups, matchups, standings, waivers, trades, commissioner controls, and a full season engine.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NullworksFantasyLeaguePage() {
  return <FantasyApp view="dashboard" />;
}
