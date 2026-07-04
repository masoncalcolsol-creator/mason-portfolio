-- NULLWORKS Fantasy League production schema
-- The deployed app currently runs in local-first browser mode.
-- Apply this migration to a Supabase project to activate shared cross-device leagues.

create extension if not exists pgcrypto;

create table if not exists public.nfl_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nfl_leagues (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  season integer not null,
  commissioner_id uuid not null references public.nfl_profiles(id),
  status text not null default 'setup' check (status in ('setup','drafting','in_season','complete')),
  current_week integer not null default 1,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nfl_teams (
  id uuid primary key default gen_random_uuid(),
  league_id uuid not null references public.nfl_leagues(id) on delete cascade,
  owner_id uuid references public.nfl_profiles(id),
  owner_name text not null,
  name text not null,
  abbreviation text not null,
  color text not null default '#edff24',
  is_bot boolean not null default false,
  wins integer not null default 0,
  losses integer not null default 0,
  ties integer not null default 0,
  points_for numeric not null default 0,
  points_against numeric not null default 0,
  faab integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(league_id, owner_id)
);

create table if not exists public.nfl_players (
  id text primary key,
  sleeper_player_id text,
  name text not null,
  position text not null,
  team text,
  status text,
  search_rank integer,
  age integer,
  years_exp integer,
  source_updated_at timestamptz,
  raw jsonb not null default '{}'::jsonb
);

create table if not exists public.nfl_roster_players (
  team_id uuid not null references public.nfl_teams(id) on delete cascade,
  player_id text not null references public.nfl_players(id),
  acquired_via text not null default 'draft',
  acquired_at timestamptz not null default now(),
  primary key(team_id, player_id)
);

create table if not exists public.nfl_lineups (
  id uuid primary key default gen_random_uuid(),
  league_id uuid not null references public.nfl_leagues(id) on delete cascade,
  team_id uuid not null references public.nfl_teams(id) on delete cascade,
  week integer not null,
  slots jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default now(),
  unique(team_id, week)
);

create table if not exists public.nfl_drafts (
  id uuid primary key default gen_random_uuid(),
  league_id uuid not null unique references public.nfl_leagues(id) on delete cascade,
  status text not null default 'pending',
  current_pick integer not null default 1,
  draft_order jsonb not null default '[]'::jsonb,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.nfl_draft_picks (
  id uuid primary key default gen_random_uuid(),
  draft_id uuid not null references public.nfl_drafts(id) on delete cascade,
  pick_number integer not null,
  round integer not null,
  team_id uuid not null references public.nfl_teams(id),
  player_id text not null references public.nfl_players(id),
  auto_pick boolean not null default false,
  made_at timestamptz not null default now(),
  unique(draft_id, pick_number),
  unique(draft_id, player_id)
);

create table if not exists public.nfl_matchups (
  id uuid primary key default gen_random_uuid(),
  league_id uuid not null references public.nfl_leagues(id) on delete cascade,
  week integer not null,
  home_team_id uuid not null references public.nfl_teams(id),
  away_team_id uuid not null references public.nfl_teams(id),
  home_score numeric,
  away_score numeric,
  complete boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(league_id, week, home_team_id, away_team_id)
);

create table if not exists public.nfl_waiver_claims (
  id uuid primary key default gen_random_uuid(),
  league_id uuid not null references public.nfl_leagues(id) on delete cascade,
  team_id uuid not null references public.nfl_teams(id) on delete cascade,
  add_player_id text not null references public.nfl_players(id),
  drop_player_id text references public.nfl_players(id),
  bid integer not null default 0,
  priority integer not null,
  status text not null default 'pending' check (status in ('pending','won','lost','cancelled')),
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create table if not exists public.nfl_trades (
  id uuid primary key default gen_random_uuid(),
  league_id uuid not null references public.nfl_leagues(id) on delete cascade,
  from_team_id uuid not null references public.nfl_teams(id),
  to_team_id uuid not null references public.nfl_teams(id),
  offered_player_ids text[] not null default '{}',
  requested_player_ids text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending','accepted','rejected','cancelled')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.nfl_activity (
  id uuid primary key default gen_random_uuid(),
  league_id uuid not null references public.nfl_leagues(id) on delete cascade,
  actor_id uuid references public.nfl_profiles(id),
  event_type text not null,
  message text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists nfl_teams_league_idx on public.nfl_teams(league_id);
create index if not exists nfl_roster_team_idx on public.nfl_roster_players(team_id);
create index if not exists nfl_matchups_week_idx on public.nfl_matchups(league_id, week);
create index if not exists nfl_waivers_status_idx on public.nfl_waiver_claims(league_id, status, bid desc);
create index if not exists nfl_trades_status_idx on public.nfl_trades(league_id, status);
create index if not exists nfl_activity_created_idx on public.nfl_activity(league_id, created_at desc);

alter table public.nfl_profiles enable row level security;
alter table public.nfl_leagues enable row level security;
alter table public.nfl_teams enable row level security;
alter table public.nfl_players enable row level security;
alter table public.nfl_roster_players enable row level security;
alter table public.nfl_lineups enable row level security;
alter table public.nfl_drafts enable row level security;
alter table public.nfl_draft_picks enable row level security;
alter table public.nfl_matchups enable row level security;
alter table public.nfl_waiver_claims enable row level security;
alter table public.nfl_trades enable row level security;
alter table public.nfl_activity enable row level security;

create policy "profiles visible to authenticated users" on public.nfl_profiles for select to authenticated using (true);
create policy "users manage own profile" on public.nfl_profiles for all to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "players are public read" on public.nfl_players for select using (true);

create policy "league members read leagues" on public.nfl_leagues for select to authenticated using (
  commissioner_id = auth.uid() or exists (
    select 1 from public.nfl_teams where nfl_teams.league_id = nfl_leagues.id and nfl_teams.owner_id = auth.uid()
  )
);
create policy "commissioner manages league" on public.nfl_leagues for all to authenticated using (commissioner_id = auth.uid()) with check (commissioner_id = auth.uid());

create policy "league members read teams" on public.nfl_teams for select to authenticated using (
  exists (select 1 from public.nfl_leagues l where l.id = league_id and (l.commissioner_id = auth.uid() or exists (select 1 from public.nfl_teams mine where mine.league_id = l.id and mine.owner_id = auth.uid())))
);
create policy "owners update own team" on public.nfl_teams for update to authenticated using (owner_id = auth.uid());
create policy "commissioner inserts teams" on public.nfl_teams for insert to authenticated with check (exists (select 1 from public.nfl_leagues l where l.id = league_id and l.commissioner_id = auth.uid()));

create policy "members read roster" on public.nfl_roster_players for select to authenticated using (
  exists (select 1 from public.nfl_teams t join public.nfl_leagues l on l.id = t.league_id where t.id = team_id and (l.commissioner_id = auth.uid() or exists (select 1 from public.nfl_teams mine where mine.league_id = l.id and mine.owner_id = auth.uid())))
);
create policy "owners manage roster" on public.nfl_roster_players for all to authenticated using (exists (select 1 from public.nfl_teams t where t.id = team_id and (t.owner_id = auth.uid() or exists (select 1 from public.nfl_leagues l where l.id = t.league_id and l.commissioner_id = auth.uid())))) with check (exists (select 1 from public.nfl_teams t where t.id = team_id and (t.owner_id = auth.uid() or exists (select 1 from public.nfl_leagues l where l.id = t.league_id and l.commissioner_id = auth.uid()))));

create policy "members read league operations" on public.nfl_lineups for select to authenticated using (exists (select 1 from public.nfl_leagues l where l.id = league_id and (l.commissioner_id = auth.uid() or exists (select 1 from public.nfl_teams t where t.league_id = l.id and t.owner_id = auth.uid()))));
create policy "members read drafts" on public.nfl_drafts for select to authenticated using (exists (select 1 from public.nfl_leagues l where l.id = league_id and (l.commissioner_id = auth.uid() or exists (select 1 from public.nfl_teams t where t.league_id = l.id and t.owner_id = auth.uid()))));
create policy "members read draft picks" on public.nfl_draft_picks for select to authenticated using (exists (select 1 from public.nfl_drafts d join public.nfl_leagues l on l.id = d.league_id where d.id = draft_id and (l.commissioner_id = auth.uid() or exists (select 1 from public.nfl_teams t where t.league_id = l.id and t.owner_id = auth.uid()))));
create policy "members read matchups" on public.nfl_matchups for select to authenticated using (exists (select 1 from public.nfl_leagues l where l.id = league_id and (l.commissioner_id = auth.uid() or exists (select 1 from public.nfl_teams t where t.league_id = l.id and t.owner_id = auth.uid()))));
create policy "members read waivers" on public.nfl_waiver_claims for select to authenticated using (exists (select 1 from public.nfl_leagues l where l.id = league_id and (l.commissioner_id = auth.uid() or exists (select 1 from public.nfl_teams t where t.league_id = l.id and t.owner_id = auth.uid()))));
create policy "members submit waivers" on public.nfl_waiver_claims for insert to authenticated with check (exists (select 1 from public.nfl_teams t where t.id = team_id and t.owner_id = auth.uid()));
create policy "members read trades" on public.nfl_trades for select to authenticated using (exists (select 1 from public.nfl_leagues l where l.id = league_id and (l.commissioner_id = auth.uid() or exists (select 1 from public.nfl_teams t where t.league_id = l.id and t.owner_id = auth.uid()))));
create policy "members create trades" on public.nfl_trades for insert to authenticated with check (exists (select 1 from public.nfl_teams t where t.id = from_team_id and t.owner_id = auth.uid()));
create policy "members read activity" on public.nfl_activity for select to authenticated using (exists (select 1 from public.nfl_leagues l where l.id = league_id and (l.commissioner_id = auth.uid() or exists (select 1 from public.nfl_teams t where t.league_id = l.id and t.owner_id = auth.uid()))));
