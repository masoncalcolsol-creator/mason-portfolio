export type Position = "QB" | "RB" | "WR" | "TE" | "K" | "DEF";
export type StarterSlot = Position | "FLEX";
export type LeagueStatus = "setup" | "drafting" | "in_season" | "complete";
export type AppView =
  | "dashboard"
  | "draft"
  | "team"
  | "matchups"
  | "players"
  | "waivers"
  | "trades"
  | "league"
  | "commissioner";

export type FantasyPlayer = {
  id: string;
  name: string;
  position: Position;
  team: string;
  status: string;
  searchRank: number;
  age?: number | null;
  yearsExp?: number | null;
  trending?: number;
};

export type Account = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

export type LeagueSettings = {
  teamCount: number;
  rosterSize: number;
  playoffTeams: number;
  regularSeasonWeeks: number;
  draftRounds: number;
  pickTimerSeconds: number;
  scoring: {
    reception: number;
    passYard: number;
    passTd: number;
    interception: number;
    rushYard: number;
    rushTd: number;
    receivingYard: number;
    receivingTd: number;
    fumble: number;
  };
};

export type FantasyTeam = {
  id: string;
  ownerAccountId: string | null;
  ownerName: string;
  name: string;
  abbreviation: string;
  color: string;
  isBot: boolean;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
  pointsAgainst: number;
  faab: number;
  roster: string[];
  starters: Record<string, string | null>;
};

export type DraftPick = {
  pickNumber: number;
  round: number;
  teamId: string;
  playerId: string;
  madeAt: string;
  auto: boolean;
};

export type DraftState = {
  started: boolean;
  completed: boolean;
  currentPick: number;
  order: string[];
  picks: DraftPick[];
  startedAt: string | null;
  lastPickAt: string | null;
};

export type Matchup = {
  id: string;
  week: number;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  complete: boolean;
};

export type WaiverClaim = {
  id: string;
  teamId: string;
  addPlayerId: string;
  dropPlayerId: string | null;
  bid: number;
  priority: number;
  status: "pending" | "won" | "lost" | "cancelled";
  createdAt: string;
};

export type Trade = {
  id: string;
  fromTeamId: string;
  toTeamId: string;
  offerPlayerIds: string[];
  requestPlayerIds: string[];
  status: "pending" | "accepted" | "rejected" | "cancelled";
  createdAt: string;
};

export type ActivityEvent = {
  id: string;
  type: "league" | "draft" | "waiver" | "trade" | "score" | "roster";
  message: string;
  createdAt: string;
};

export type FantasyLeague = {
  id: string;
  code: string;
  name: string;
  season: number;
  commissionerAccountId: string;
  status: LeagueStatus;
  currentWeek: number;
  settings: LeagueSettings;
  teams: FantasyTeam[];
  draft: DraftState;
  schedule: Matchup[];
  waiverClaims: WaiverClaim[];
  trades: Trade[];
  activity: ActivityEvent[];
  createdAt: string;
};

export type FantasyDatabase = {
  version: 1;
  activeAccountId: string | null;
  currentLeagueId: string | null;
  accounts: Account[];
  leagues: FantasyLeague[];
};
