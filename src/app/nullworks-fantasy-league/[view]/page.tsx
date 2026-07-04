import { notFound } from "next/navigation";
import FantasyApp from "../FantasyApp";
import type { AppView } from "../types";

const VIEWS: AppView[] = [
  "dashboard",
  "draft",
  "team",
  "matchups",
  "players",
  "waivers",
  "trades",
  "league",
  "commissioner",
];

export const dynamicParams = false;

export function generateStaticParams() {
  return VIEWS.map((view) => ({ view }));
}

export default async function FantasyLeagueViewPage({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  if (!VIEWS.includes(view as AppView)) notFound();
  return <FantasyApp view={view as AppView} />;
}
