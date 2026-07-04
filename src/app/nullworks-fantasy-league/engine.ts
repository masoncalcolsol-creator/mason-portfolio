import type {
  Account,
  ActivityEvent,
  DraftPick,
  FantasyDatabase,
  FantasyLeague,
  FantasyPlayer,
  FantasyTeam,
  LeagueSettings,
  Matchup,
  Position,
  StarterSlot,
  Trade,
  WaiverClaim,
} from "./types";

export const STORAGE_KEY = "nullworks-fantasy-league:v1";

export const STARTER_SLOTS: Array<{ key: string; label: string; type: StarterSlot }> = [
  { key: "QB", label: "QB", type: "QB" },
  { key: "RB1", label: "RB", type: "RB" },
  { key: "RB2", label: "RB", type: "RB" },
  { key: "WR1", label: "WR", type: "WR" },
  { key: "WR2", label: "WR", type: "WR" },
  { key: "TE", label: "TE", type: "TE" },
  { key: "FLEX", label: "FLEX", type: "FLEX" },
  { key: "K", label: "K", type: "K" },
  { key: "DEF", label: "DEF", type: "DEF" },
];

export const DEFAULT_SETTINGS: LeagueSettings = {
  teamCount: 10,
  rosterSize: 15,
  playoffTeams: 6,
  regularSeasonWeeks: 14,
  draftRounds: 15,
  pickTimerSeconds: 90,
  scoring: {
    reception: 1,
    passYard: 0.04,
    passTd: 4,
    interception: -2,
    rushYard: 0.1,
    rushTd: 6,
    receivingYard: 0.1,
    receivingTd: 6,
    fumble: -2,
  },
};

const BOT_TEAMS = [
  "Fourth & Null",
  "Runtime Raiders",
  "Black Box Blitz",
  "Neon Audibles",
  "Waiver Goblins",
  "Sunday Operators",
  "Red Zone Receipts",
  "The Andon Cord",
  "Telemetry Titans",
  "Human Authority",
  "Exception Handlers",
  "The Handoff",
];

const TEAM_COLORS = [
  "#edff24",
  "#87ff38",
  "#21f6c7",
  "#f4ff8b",
  "#b6ff00",
  "#fff200",
  "#b8ff56",
  "#e1ff00",
  "#8eff00",
  "#d6ff4a",
  "#aaff26",
  "#f7ff67",
];

export function id(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function inviteCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let value = "";
  for (let index = 0; index < 6; index += 1) {
    value += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return value;
}

export async function hashPassword(value: string) {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) hash = Math.imul(31, hash) + value.charCodeAt(index) | 0;
  return String(hash >>> 0);
}

export function blankDatabase(): FantasyDatabase {
  return {
    version: 1,
    activeAccountId: null,
    currentLeagueId: null,
    accounts: [],
    leagues: [],
  };
}

function abbreviation(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 4)
    .toUpperCase();
}

function blankStarters() {
  return Object.fromEntries(STARTER_SLOTS.map((slot) => [slot.key, null])) as Record<string, string | null>;
}

export function createSchedule(teamIds: string[], weeks: number): Matchup[] {
  if (teamIds.length < 2) return [];
  const rotating = [...teamIds];
  if (rotating.length % 2 === 1) rotating.push("BYE");
  const rounds = rotating.length - 1;
  const half = rotating.length / 2;
  const schedule: Matchup[] = [];

  for (let week = 1; week <= weeks; week += 1) {
    const round = (week - 1) % rounds;
    const list = [...rotating];
    for (let move = 0; move < round; move += 1) {
      list.splice(1, 0, list.pop()!);
    }

    for (let index = 0; index < half; index += 1) {
      const left = list[index];
      const right = list[list.length - 1 - index];
      if (left === "BYE" || right === "BYE") continue;
      const reverse = week % 2 === 0;
      schedule.push({
        id: id("matchup"),
        week,
        homeTeamId: reverse ? right : left,
        awayTeamId: reverse ? left : right,
        homeScore: null,
        awayScore: null,
        complete: false,
      });
    }
  }

  return schedule;
}

export function createLeague(account: Account, options?: Partial<LeagueSettings> & { name?: string }): FantasyLeague {
  const settings: LeagueSettings = {
    ...DEFAULT_SETTINGS,
    ...options,
    scoring: { ...DEFAULT_SETTINGS.scoring, ...(options?.scoring ?? {}) },
  };
  const leagueId = id("league");
  const userTeamId = id("team");
  const teams: FantasyTeam[] = Array.from({ length: settings.teamCount }, (_, index) => {
    const isUser = index === 0;
    const teamName = isUser ? `${account.name.split(" ")[0]}'s NULL Squad` : BOT_TEAMS[index - 1] ?? `Bot Team ${index}`;
    return {
      id: isUser ? userTeamId : id("team"),
      ownerAccountId: isUser ? account.id : null,
      ownerName: isUser ? account.name : `OI Manager ${String(index).padStart(2, "0")}`,
      name: teamName,
      abbreviation: abbreviation(teamName),
      color: TEAM_COLORS[index % TEAM_COLORS.length],
      isBot: !isUser,
      wins: 0,
      losses: 0,
      ties: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      faab: 100,
      roster: [],
      starters: blankStarters(),
    };
  });

  return {
    id: leagueId,
    code: inviteCode(),
    name: options?.name?.trim() || "NULLWORKS Fantasy League",
    season: new Date().getFullYear(),
    commissionerAccountId: account.id,
    status: "setup",
    currentWeek: 1,
    settings,
    teams,
    draft: {
      started: false,
      completed: false,
      currentPick: 1,
      order: teams.map((team) => team.id),
      picks: [],
      startedAt: null,
      lastPickAt: null,
    },
    schedule: createSchedule(teams.map((team) => team.id), settings.regularSeasonWeeks),
    waiverClaims: [],
    trades: [],
    activity: [activity("league", `${account.name} created ${options?.name?.trim() || "NULLWORKS Fantasy League"}.`)],
    createdAt: new Date().toISOString(),
  };
}

export function activity(type: ActivityEvent["type"], message: string): ActivityEvent {
  return { id: id("activity"), type, message, createdAt: new Date().toISOString() };
}

export function currentDraftTeamId(league: FantasyLeague) {
  const teamCount = league.draft.order.length;
  const zero = league.draft.currentPick - 1;
  const round = Math.floor(zero / teamCount);
  const indexInRound = zero % teamCount;
  const orderIndex = round % 2 === 0 ? indexInRound : teamCount - 1 - indexInRound;
  return league.draft.order[orderIndex];
}

export function draftRound(league: FantasyLeague) {
  return Math.floor((league.draft.currentPick - 1) / league.draft.order.length) + 1;
}

export function ownedPlayerIds(league: FantasyLeague) {
  return new Set(league.teams.flatMap((team) => team.roster));
}

export function availablePlayers(league: FantasyLeague, players: FantasyPlayer[]) {
  const owned = ownedPlayerIds(league);
  return players.filter((player) => !owned.has(player.id));
}

export function isEligible(player: FantasyPlayer | undefined, slotType: StarterSlot) {
  if (!player) return false;
  if (slotType === "FLEX") return player.position === "RB" || player.position === "WR" || player.position === "TE";
  return player.position === slotType;
}

export function optimizeTeam(team: FantasyTeam, players: FantasyPlayer[]) {
  const lookup = new Map(players.map((player) => [player.id, player]));
  const roster = team.roster
    .map((playerId) => lookup.get(playerId))
    .filter((player): player is FantasyPlayer => Boolean(player))
    .sort((left, right) => left.searchRank - right.searchRank);
  const used = new Set<string>();
  const starters = blankStarters();

  for (const slot of STARTER_SLOTS) {
    const candidate = roster.find((player) => !used.has(player.id) && isEligible(player, slot.type));
    if (candidate) {
      starters[slot.key] = candidate.id;
      used.add(candidate.id);
    }
  }

  return { ...team, starters };
}

function positionalNeed(team: FantasyTeam, position: Position) {
  const counts = team.roster.reduce<Record<string, number>>((accumulator, playerId) => {
    const marker = playerId.split(":")[0];
    accumulator[marker] = (accumulator[marker] ?? 0) + 1;
    return accumulator;
  }, {});
  const targets: Record<Position, number> = { QB: 2, RB: 5, WR: 5, TE: 2, K: 1, DEF: 1 };
  return Math.max(0, targets[position] - (counts[position] ?? 0));
}

export function playerValue(player: FantasyPlayer, team?: FantasyTeam) {
  const positionBonus: Record<Position, number> = { QB: 120, RB: 235, WR: 225, TE: 150, K: 25, DEF: 30 };
  const trend = Math.min(60, player.trending ?? 0);
  const need = team ? positionalNeed(team, player.position) * 18 : 0;
  return 10_000 - Math.min(9_500, player.searchRank * 8) + positionBonus[player.position] + trend + need;
}

export function startDraft(league: FantasyLeague) {
  if (league.status !== "setup") return league;
  return {
    ...league,
    status: "drafting" as const,
    draft: {
      ...league.draft,
      started: true,
      startedAt: new Date().toISOString(),
      lastPickAt: new Date().toISOString(),
    },
    activity: [activity("draft", "The live snake draft opened."), ...league.activity],
  };
}

export function makeDraftPick(league: FantasyLeague, player: FantasyPlayer, auto = false): FantasyLeague {
  if (league.status !== "drafting" || league.draft.completed) return league;
  if (ownedPlayerIds(league).has(player.id)) return league;

  const teamId = currentDraftTeamId(league);
  const team = league.teams.find((candidate) => candidate.id === teamId);
  if (!team || team.roster.length >= league.settings.rosterSize) return league;

  const pick: DraftPick = {
    pickNumber: league.draft.currentPick,
    round: draftRound(league),
    teamId,
    playerId: player.id,
    madeAt: new Date().toISOString(),
    auto,
  };
  const teams = league.teams.map((candidate) =>
    candidate.id === teamId
      ? { ...candidate, roster: [...candidate.roster, player.id] }
      : candidate,
  );
  const nextPick = league.draft.currentPick + 1;
  const totalPicks = league.settings.draftRounds * league.draft.order.length;
  const complete = nextPick > totalPicks;
  const optimizedTeams = complete ? teams.map((candidate) => optimizeTeam(candidate, [player])) : teams;

  return {
    ...league,
    status: complete ? "in_season" : league.status,
    teams: complete ? optimizedTeams : teams,
    draft: {
      ...league.draft,
      currentPick: complete ? totalPicks : nextPick,
      completed: complete,
      picks: [...league.draft.picks, pick],
      lastPickAt: new Date().toISOString(),
    },
    activity: [
      activity("draft", `${team.name} ${auto ? "auto-selected" : "drafted"} ${player.name} (${player.position} · ${player.team}).`),
      ...league.activity,
    ],
  };
}

export function autoDraftUntilHuman(league: FantasyLeague, players: FantasyPlayer[], humanAccountId: string) {
  let next = league;
  let guard = 0;

  while (next.status === "drafting" && !next.draft.completed && guard < 400) {
    const teamId = currentDraftTeamId(next);
    const team = next.teams.find((candidate) => candidate.id === teamId);
    if (!team || team.ownerAccountId === humanAccountId) break;
    const pool = availablePlayers(next, players)
      .sort((left, right) => playerValue(right, team) - playerValue(left, team));
    const pick = pool[0];
    if (!pick) break;
    next = makeDraftPick(next, pick, true);
    guard += 1;
  }

  if (next.draft.completed) {
    next = { ...next, teams: next.teams.map((team) => optimizeTeam(team, players)) };
  }
  return next;
}

function stringHash(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function simulatedPlayerPoints(player: FantasyPlayer, week: number) {
  const baseline: Record<Position, number> = { QB: 19.5, RB: 12.5, WR: 11.8, TE: 8.8, K: 8.1, DEF: 7.6 };
  const quality = Math.max(-3, 8 - player.searchRank / 35);
  const noiseSeed = stringHash(`${player.id}:${week}:${player.team}`);
  const noise = ((noiseSeed % 1_000) / 1_000 - 0.42) * 15;
  const boom = noiseSeed % 29 === 0 ? 12 : 0;
  const bust = noiseSeed % 31 === 0 ? -8 : 0;
  return Math.max(0, Number((baseline[player.position] + quality + noise + boom + bust).toFixed(2)));
}

export function teamWeekScore(team: FantasyTeam, players: FantasyPlayer[], week: number) {
  const lookup = new Map(players.map((player) => [player.id, player]));
  return Number(Object.values(team.starters).reduce((total, playerId) => {
    const player = playerId ? lookup.get(playerId) : undefined;
    return total + (player ? simulatedPlayerPoints(player, week) : 0);
  }, 0).toFixed(2));
}

function processPendingWaivers(league: FantasyLeague) {
  const pending = league.waiverClaims
    .filter((claim) => claim.status === "pending")
    .sort((left, right) => right.bid - left.bid || left.priority - right.priority || left.createdAt.localeCompare(right.createdAt));
  const claimed = new Set<string>();
  let teams = [...league.teams];
  const claims = league.waiverClaims.map((claim) => ({ ...claim }));
  const events: ActivityEvent[] = [];

  for (const claim of pending) {
    const team = teams.find((candidate) => candidate.id === claim.teamId);
    const claimRecord = claims.find((candidate) => candidate.id === claim.id)!;
    if (!team || claimed.has(claim.addPlayerId) || team.faab < claim.bid) {
      claimRecord.status = "lost";
      continue;
    }

    if (claim.dropPlayerId && !team.roster.includes(claim.dropPlayerId)) {
      claimRecord.status = "lost";
      continue;
    }

    teams = teams.map((candidate) => candidate.id === team.id ? {
      ...candidate,
      faab: candidate.faab - claim.bid,
      roster: [...candidate.roster.filter((playerId) => playerId !== claim.dropPlayerId), claim.addPlayerId],
    } : candidate);
    claimed.add(claim.addPlayerId);
    claimRecord.status = "won";
    events.push(activity("waiver", `${team.name} won a waiver claim for $${claim.bid} FAAB.`));
  }

  return { ...league, teams, waiverClaims: claims, activity: [...events, ...league.activity] };
}

export function simulateCurrentWeek(league: FantasyLeague, players: FantasyPlayer[]) {
  if (league.status !== "in_season") return league;
  const week = league.currentWeek;
  let next = processPendingWaivers({ ...league, teams: league.teams.map((team) => optimizeTeam(team, players)) });
  const teamMap = new Map(next.teams.map((team) => [team.id, { ...team }]));
  const schedule = next.schedule.map((matchup) => {
    if (matchup.week !== week || matchup.complete) return matchup;
    const home = teamMap.get(matchup.homeTeamId);
    const away = teamMap.get(matchup.awayTeamId);
    if (!home || !away) return matchup;
    const homeScore = teamWeekScore(home, players, week);
    const awayScore = teamWeekScore(away, players, week);
    home.pointsFor += homeScore;
    home.pointsAgainst += awayScore;
    away.pointsFor += awayScore;
    away.pointsAgainst += homeScore;
    if (homeScore > awayScore) {
      home.wins += 1;
      away.losses += 1;
    } else if (awayScore > homeScore) {
      away.wins += 1;
      home.losses += 1;
    } else {
      home.ties += 1;
      away.ties += 1;
    }
    return { ...matchup, homeScore, awayScore, complete: true };
  });
  const nextWeek = week + 1;
  const complete = week >= next.settings.regularSeasonWeeks;
  next = {
    ...next,
    teams: Array.from(teamMap.values()).map((team) => ({ ...team, pointsFor: Number(team.pointsFor.toFixed(2)), pointsAgainst: Number(team.pointsAgainst.toFixed(2)) })),
    schedule,
    currentWeek: complete ? week : nextWeek,
    status: complete ? "complete" : next.status,
    activity: [activity("score", `Week ${week} finalized${complete ? "; the regular season is complete" : ""}.`), ...next.activity],
  };
  return next;
}

export function submitWaiver(league: FantasyLeague, claim: Omit<WaiverClaim, "id" | "status" | "createdAt">) {
  return {
    ...league,
    waiverClaims: [...league.waiverClaims, { ...claim, id: id("waiver"), status: "pending" as const, createdAt: new Date().toISOString() }],
    activity: [activity("waiver", "A new waiver claim entered the queue."), ...league.activity],
  };
}

export function proposeTrade(league: FantasyLeague, trade: Omit<Trade, "id" | "status" | "createdAt">) {
  return {
    ...league,
    trades: [...league.trades, { ...trade, id: id("trade"), status: "pending" as const, createdAt: new Date().toISOString() }],
    activity: [activity("trade", "A trade proposal was submitted."), ...league.activity],
  };
}

export function resolveTrade(league: FantasyLeague, tradeId: string, accept: boolean) {
  const trade = league.trades.find((candidate) => candidate.id === tradeId);
  if (!trade || trade.status !== "pending") return league;
  if (!accept) {
    return {
      ...league,
      trades: league.trades.map((candidate) => candidate.id === tradeId ? { ...candidate, status: "rejected" as const } : candidate),
      activity: [activity("trade", "A trade proposal was rejected."), ...league.activity],
    };
  }

  const from = league.teams.find((team) => team.id === trade.fromTeamId);
  const to = league.teams.find((team) => team.id === trade.toTeamId);
  const valid = from && to && trade.offerPlayerIds.every((playerId) => from.roster.includes(playerId)) && trade.requestPlayerIds.every((playerId) => to.roster.includes(playerId));
  if (!valid) return league;

  const teams = league.teams.map((team) => {
    if (team.id === from!.id) {
      return { ...team, roster: [...team.roster.filter((playerId) => !trade.offerPlayerIds.includes(playerId)), ...trade.requestPlayerIds] };
    }
    if (team.id === to!.id) {
      return { ...team, roster: [...team.roster.filter((playerId) => !trade.requestPlayerIds.includes(playerId)), ...trade.offerPlayerIds] };
    }
    return team;
  });

  return {
    ...league,
    teams,
    trades: league.trades.map((candidate) => candidate.id === tradeId ? { ...candidate, status: "accepted" as const } : candidate),
    activity: [activity("trade", `${from!.name} and ${to!.name} completed a trade.`), ...league.activity],
  };
}

export function standings(league: FantasyLeague) {
  return [...league.teams].sort((left, right) =>
    right.wins - left.wins ||
    right.ties - left.ties ||
    right.pointsFor - left.pointsFor ||
    left.pointsAgainst - right.pointsAgainst,
  );
}

export function playerLabel(player: FantasyPlayer | undefined) {
  return player ? `${player.name} · ${player.position} · ${player.team || "FA"}` : "Empty";
}
