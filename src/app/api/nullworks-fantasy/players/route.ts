import { NextResponse } from "next/server";

export const runtime = "nodejs";

const POSITIONS = new Set(["QB", "RB", "WR", "TE", "K"]);
const NFL_TEAMS = [
  "ARI", "ATL", "BAL", "BUF", "CAR", "CHI", "CIN", "CLE",
  "DAL", "DEN", "DET", "GB", "HOU", "IND", "JAX", "KC",
  "LAC", "LAR", "LV", "MIA", "MIN", "NE", "NO", "NYG",
  "NYJ", "PHI", "PIT", "SEA", "SF", "TB", "TEN", "WAS",
];

const FALLBACK = [
  ["Josh Allen", "QB", "BUF"], ["Lamar Jackson", "QB", "BAL"], ["Jalen Hurts", "QB", "PHI"],
  ["Joe Burrow", "QB", "CIN"], ["Patrick Mahomes", "QB", "KC"], ["Jayden Daniels", "QB", "WAS"],
  ["C.J. Stroud", "QB", "HOU"], ["Justin Herbert", "QB", "LAC"], ["Dak Prescott", "QB", "DAL"],
  ["Jared Goff", "QB", "DET"], ["Bijan Robinson", "RB", "ATL"], ["Jahmyr Gibbs", "RB", "DET"],
  ["Saquon Barkley", "RB", "PHI"], ["Christian McCaffrey", "RB", "SF"], ["Jonathan Taylor", "RB", "IND"],
  ["Breece Hall", "RB", "NYJ"], ["De'Von Achane", "RB", "MIA"], ["Josh Jacobs", "RB", "GB"],
  ["Kyren Williams", "RB", "LAR"], ["Derrick Henry", "RB", "BAL"], ["Amon-Ra St. Brown", "WR", "DET"],
  ["Ja'Marr Chase", "WR", "CIN"], ["Justin Jefferson", "WR", "MIN"], ["CeeDee Lamb", "WR", "DAL"],
  ["Puka Nacua", "WR", "LAR"], ["A.J. Brown", "WR", "PHI"], ["Nico Collins", "WR", "HOU"],
  ["Garrett Wilson", "WR", "NYJ"], ["Tyreek Hill", "WR", "MIA"], ["Marvin Harrison Jr.", "WR", "ARI"],
  ["Malik Nabers", "WR", "NYG"], ["Drake London", "WR", "ATL"], ["Brian Thomas Jr.", "WR", "JAX"],
  ["Travis Kelce", "TE", "KC"], ["Sam LaPorta", "TE", "DET"], ["Trey McBride", "TE", "ARI"],
  ["George Kittle", "TE", "SF"], ["Brock Bowers", "TE", "LV"], ["Mark Andrews", "TE", "BAL"],
  ["Jake Elliott", "K", "PHI"], ["Brandon Aubrey", "K", "DAL"], ["Harrison Butker", "K", "KC"],
] as const;

function fallbackPlayers() {
  const players = FALLBACK.map(([name, position, team], index) => ({
    id: `${position}:fallback-${index + 1}`,
    name,
    position,
    team,
    status: "Active",
    searchRank: index + 1,
    age: null,
    yearsExp: null,
    trending: 0,
  }));

  players.push(...NFL_TEAMS.map((team, index) => ({
    id: `DEF:${team}`,
    name: `${team} Defense`,
    position: "DEF",
    team,
    status: "Active",
    searchRank: 350 + index,
    age: null,
    yearsExp: null,
    trending: 0,
  })));

  return players;
}

export async function GET() {
  try {
    const [playersResponse, trendingResponse] = await Promise.all([
      fetch("https://api.sleeper.app/v1/players/nfl", {
        next: { revalidate: 86_400 },
        signal: AbortSignal.timeout(12_000),
        headers: { "user-agent": "NULLWORKS-Fantasy-League/1.0" },
      }),
      fetch("https://api.sleeper.app/v1/players/nfl/trending/add?lookback_hours=24&limit=100", {
        next: { revalidate: 3_600 },
        signal: AbortSignal.timeout(8_000),
        headers: { "user-agent": "NULLWORKS-Fantasy-League/1.0" },
      }).catch(() => null),
    ]);

    if (!playersResponse.ok) throw new Error(`Sleeper player endpoint returned ${playersResponse.status}`);
    const raw = await playersResponse.json() as Record<string, any>;
    const trendingRows = trendingResponse?.ok ? await trendingResponse.json() as Array<{ player_id: string; count: number }> : [];
    const trending = new Map(trendingRows.map((row) => [String(row.player_id), Number(row.count || 0)]));

    const players = Object.entries(raw)
      .flatMap(([playerId, player]) => {
        const position = String(player.fantasy_positions?.[0] || player.position || "").toUpperCase();
        const team = String(player.team || "FA").toUpperCase();
        const active = player.active !== false && !["Inactive", "Retired"].includes(String(player.status));
        const name = String(player.full_name || `${player.first_name || ""} ${player.last_name || ""}`).trim();
        if (!POSITIONS.has(position) || !name || !active) return [];

        return [{
          id: `${position}:${playerId}`,
          name,
          position,
          team,
          status: String(player.status || "Active"),
          searchRank: Number.isFinite(Number(player.search_rank)) ? Math.max(1, Number(player.search_rank)) : 4_000,
          age: Number.isFinite(Number(player.age)) ? Number(player.age) : null,
          yearsExp: Number.isFinite(Number(player.years_exp)) ? Number(player.years_exp) : null,
          trending: trending.get(playerId) || 0,
        }];
      })
      .sort((left, right) => left.searchRank - right.searchRank || right.trending - left.trending)
      .slice(0, 500);

    players.push(...NFL_TEAMS.map((team, index) => ({
      id: `DEF:${team}`,
      name: `${team} Defense`,
      position: "DEF",
      team,
      status: "Active",
      searchRank: 2_000 + index,
      age: null,
      yearsExp: null,
      trending: 0,
    })));

    return NextResponse.json({
      players,
      source: "Sleeper public read-only NFL API",
      refreshedAt: new Date().toISOString(),
      fallback: false,
    }, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch (error) {
    return NextResponse.json({
      players: fallbackPlayers(),
      source: "NULLWORKS fallback player pool",
      refreshedAt: new Date().toISOString(),
      fallback: true,
      error: error instanceof Error ? error.message : String(error),
    }, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  }
}
