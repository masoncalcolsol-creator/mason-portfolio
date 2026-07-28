-- LIVE LEARNING FOREST · PUBLIC GROVE 1.0
-- Durable submissions, append-only review decisions, and hash-chained event receipts.

create extension if not exists pgcrypto;

create table if not exists public.llf_public_submissions (
  receipt text primary key,
  kind text not null check (kind in ('seed', 'proposal', 'preference', 'lexicon')),
  topic_id text,
  label text,
  edge_type text,
  proposal_text text,
  source_locator text,
  preference text check (preference is null or preference in ('red', 'yellow', 'green')),
  route_depth smallint check (route_depth is null or route_depth between 1 and 3),
  state text not null,
  actor_hash text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint llf_submission_shape check (
    (kind = 'seed' and label is not null and length(label) between 1 and 240)
    or (kind = 'proposal' and topic_id is not null and proposal_text is not null and source_locator is not null)
    or (kind = 'preference' and topic_id is not null and preference is not null)
    or (kind = 'lexicon' and label is not null and length(label) between 1 and 80)
  )
);

create index if not exists llf_public_submissions_created_idx
  on public.llf_public_submissions (created_at desc);
create index if not exists llf_public_submissions_actor_created_idx
  on public.llf_public_submissions (actor_hash, created_at desc);
create index if not exists llf_public_submissions_kind_state_idx
  on public.llf_public_submissions (kind, state, created_at desc);

create table if not exists public.llf_review_events (
  review_receipt text primary key,
  submission_receipt text not null references public.llf_public_submissions(receipt),
  decision text not null check (decision in ('ACCEPT', 'REJECT', 'DEFER', 'NEEDS_EVIDENCE')),
  note text,
  reviewer text not null,
  created_at timestamptz not null default now()
);

create index if not exists llf_review_events_submission_idx
  on public.llf_review_events (submission_receipt, created_at desc);

create table if not exists public.llf_event_ledger (
  event_id bigint generated always as identity primary key,
  event_receipt text not null unique,
  event_type text not null,
  entity_receipt text not null,
  actor_class text not null,
  payload jsonb not null,
  prior_event_hash text,
  event_hash text not null,
  created_at timestamptz not null default now()
);

create or replace function public.llf_chain_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  previous_hash text;
begin
  perform pg_advisory_xact_lock(hashtext('LIVE_LEARNING_FOREST_EVENT_CHAIN'));
  select event_hash into previous_hash
    from public.llf_event_ledger
    order by event_id desc
    limit 1;

  new.prior_event_hash := previous_hash;
  new.event_hash := encode(
    digest(
      coalesce(previous_hash, '') || '|' ||
      new.event_receipt || '|' ||
      new.event_type || '|' ||
      new.entity_receipt || '|' ||
      new.actor_class || '|' ||
      new.payload::text || '|' ||
      new.created_at::text,
      'sha256'
    ),
    'hex'
  );
  return new;
end;
$$;

drop trigger if exists llf_event_chain_before_insert on public.llf_event_ledger;
create trigger llf_event_chain_before_insert
before insert on public.llf_event_ledger
for each row execute function public.llf_chain_event();

create or replace function public.llf_submission_to_ledger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.llf_event_ledger (
    event_receipt,
    event_type,
    entity_receipt,
    actor_class,
    payload,
    event_hash,
    created_at
  ) values (
    new.receipt,
    'PUBLIC_' || upper(new.kind) || '_SUBMITTED',
    new.receipt,
    'ANONYMOUS_PUBLIC_ACTOR',
    jsonb_build_object(
      'kind', new.kind,
      'topic_id', new.topic_id,
      'label', new.label,
      'edge_type', new.edge_type,
      'preference', new.preference,
      'route_depth', new.route_depth,
      'state', new.state,
      'canonical_effect', 'NONE'
    ),
    '',
    new.created_at
  );
  return new;
end;
$$;

drop trigger if exists llf_submission_after_insert on public.llf_public_submissions;
create trigger llf_submission_after_insert
after insert on public.llf_public_submissions
for each row execute function public.llf_submission_to_ledger();

create or replace function public.llf_review_to_ledger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.llf_event_ledger (
    event_receipt,
    event_type,
    entity_receipt,
    actor_class,
    payload,
    event_hash,
    created_at
  ) values (
    new.review_receipt,
    'HUMAN_REVIEW_DECISION',
    new.submission_receipt,
    new.reviewer,
    jsonb_build_object(
      'decision', new.decision,
      'note', new.note,
      'publication_effect', 'NONE_UNLESS_SEPARATE_CANONICAL_VERSION_EVENT_EXISTS'
    ),
    '',
    new.created_at
  );
  return new;
end;
$$;

drop trigger if exists llf_review_after_insert on public.llf_review_events;
create trigger llf_review_after_insert
after insert on public.llf_review_events
for each row execute function public.llf_review_to_ledger();

create or replace function public.llf_reject_mutation()
returns trigger
language plpgsql
as $$
begin
  raise exception 'Live Learning Forest records are append-only. Create a new event instead.';
end;
$$;

drop trigger if exists llf_submissions_immutable on public.llf_public_submissions;
create trigger llf_submissions_immutable
before update or delete on public.llf_public_submissions
for each row execute function public.llf_reject_mutation();

drop trigger if exists llf_reviews_immutable on public.llf_review_events;
create trigger llf_reviews_immutable
before update or delete on public.llf_review_events
for each row execute function public.llf_reject_mutation();

drop trigger if exists llf_ledger_immutable on public.llf_event_ledger;
create trigger llf_ledger_immutable
before update or delete on public.llf_event_ledger
for each row execute function public.llf_reject_mutation();

create or replace view public.llf_review_queue as
select
  s.receipt,
  s.kind,
  s.topic_id,
  s.label,
  s.edge_type,
  s.proposal_text,
  s.source_locator,
  s.preference,
  s.route_depth,
  s.state as submission_state,
  s.created_at,
  r.review_receipt as latest_review_receipt,
  r.decision as latest_decision,
  r.note as latest_review_note,
  r.reviewer as latest_reviewer,
  r.created_at as latest_reviewed_at
from public.llf_public_submissions s
left join lateral (
  select *
  from public.llf_review_events re
  where re.submission_receipt = s.receipt
  order by re.created_at desc
  limit 1
) r on true;

-- Canonical pages remain separate from public submissions and review decisions.
create table if not exists public.llf_canonical_page_versions (
  version_id text primary key,
  topic_id text not null,
  slug text not null,
  document jsonb not null,
  publication_authority text not null,
  published_at timestamptz not null,
  previous_version_id text references public.llf_canonical_page_versions(version_id),
  is_current boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists llf_one_current_page_per_topic
  on public.llf_canonical_page_versions(topic_id)
  where is_current;

create or replace function public.llf_canonical_version_to_ledger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.llf_event_ledger (
    event_receipt,
    event_type,
    entity_receipt,
    actor_class,
    payload,
    event_hash,
    created_at
  ) values (
    'NW-LLF-PUBLISH-' || replace(new.version_id, ' ', '-'),
    'CANONICAL_PAGE_VERSION_PUBLISHED',
    new.version_id,
    new.publication_authority,
    jsonb_build_object(
      'topic_id', new.topic_id,
      'slug', new.slug,
      'previous_version_id', new.previous_version_id,
      'is_current', new.is_current
    ),
    '',
    new.published_at
  );
  return new;
end;
$$;

drop trigger if exists llf_canonical_after_insert on public.llf_canonical_page_versions;
create trigger llf_canonical_after_insert
after insert on public.llf_canonical_page_versions
for each row execute function public.llf_canonical_version_to_ledger();

alter table public.llf_public_submissions enable row level security;
alter table public.llf_review_events enable row level security;
alter table public.llf_event_ledger enable row level security;
alter table public.llf_canonical_page_versions enable row level security;

revoke all on public.llf_public_submissions from anon, authenticated;
revoke all on public.llf_review_events from anon, authenticated;
revoke all on public.llf_event_ledger from anon, authenticated;
revoke all on public.llf_canonical_page_versions from anon, authenticated;
revoke all on public.llf_review_queue from anon, authenticated;

comment on table public.llf_public_submissions is
  'Immutable anonymous public seed, proposal, preference, and lexical-review submissions. These records never directly mutate canonical knowledge.';
comment on table public.llf_event_ledger is
  'Append-only hash-chained receipts for Live Learning Forest submissions, reviews, and canonical publication events.';
comment on view public.llf_review_queue is
  'Governed review queue showing each immutable submission and its latest append-only review decision.';
