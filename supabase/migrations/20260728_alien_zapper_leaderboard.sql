create extension if not exists pgcrypto;
create table if not exists public.alien_zapper_scores (
  id uuid primary key default gen_random_uuid(),
  receipt text not null unique,
  player_name text not null check (char_length(player_name) between 2 and 20),
  venue text not null,
  score integer not null check (score between 0 and 100000),
  bad_hits integer not null default 0,
  friendly_hits integer not null default 0,
  misses integer not null default 0,
  round_seconds integer not null check (round_seconds in (30,45,60,90)),
  played_at timestamptz not null default now(),
  actor_hash text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists alien_zapper_scores_rank_idx on public.alien_zapper_scores (score desc, played_at asc);
create index if not exists alien_zapper_scores_actor_idx on public.alien_zapper_scores (actor_hash, created_at desc);
alter table public.alien_zapper_scores enable row level security;
revoke all on public.alien_zapper_scores from anon, authenticated;
grant all on public.alien_zapper_scores to service_role;
