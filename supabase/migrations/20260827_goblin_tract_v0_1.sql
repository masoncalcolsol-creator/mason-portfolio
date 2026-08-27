-- NULLWORKS // GOBLIN TRACT v0.1
-- Living Multimodal Artifact & Provenance System
-- Append-first evidence; mutable interpretation lives in observations/relationships.

create extension if not exists pgcrypto;

create table if not exists goblin_artifacts (
  id uuid primary key default gen_random_uuid(),
  artifact_code text unique not null,
  title text,
  artifact_type text not null default 'artifact',
  occurred_at timestamptz,
  ingested_at timestamptz not null default now(),
  summary text,
  canonical_status text not null default 'canonical' check (canonical_status in ('canonical','provisional','withdrawn')),
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists goblin_media_objects (
  id uuid primary key default gen_random_uuid(),
  artifact_id uuid not null references goblin_artifacts(id) on delete restrict,
  media_role text not null default 'original' check (media_role in ('original','derivative','preview','external_reference')),
  media_type text not null,
  original_filename text,
  storage_provider text,
  storage_key text,
  external_uri text,
  sha256 text,
  byte_size bigint,
  mime_type text,
  created_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  check (storage_key is not null or external_uri is not null)
);

create unique index if not exists goblin_media_sha256_unique
  on goblin_media_objects (sha256)
  where sha256 is not null and media_role = 'original';

create table if not exists goblin_entities (
  id uuid primary key default gen_random_uuid(),
  entity_code text unique,
  name text not null,
  entity_type text not null,
  created_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists goblin_relationships (
  id uuid primary key default gen_random_uuid(),
  subject_artifact_id uuid references goblin_artifacts(id) on delete restrict,
  subject_entity_id uuid references goblin_entities(id) on delete restrict,
  predicate text not null,
  object_artifact_id uuid references goblin_artifacts(id) on delete restrict,
  object_entity_id uuid references goblin_entities(id) on delete restrict,
  status text not null default 'proposed' check (status in ('proposed','canonical','rejected','superseded')),
  confidence numeric check (confidence is null or (confidence >= 0 and confidence <= 1)),
  asserted_by text not null,
  asserted_at timestamptz not null default now(),
  evidence jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  check (((subject_artifact_id is not null)::int + (subject_entity_id is not null)::int) = 1),
  check (((object_artifact_id is not null)::int + (object_entity_id is not null)::int) = 1)
);

create table if not exists goblin_observations (
  id uuid primary key default gen_random_uuid(),
  artifact_id uuid references goblin_artifacts(id) on delete restrict,
  entity_id uuid references goblin_entities(id) on delete restrict,
  body text not null,
  observation_type text not null default 'interpretation',
  asserted_by text not null,
  model_or_agent text,
  asserted_at timestamptz not null default now(),
  status text not null default 'active' check (status in ('active','superseded','rejected')),
  evidence jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  check (((artifact_id is not null)::int + (entity_id is not null)::int) = 1)
);

create table if not exists goblin_collections (
  id uuid primary key default gen_random_uuid(),
  collection_code text unique,
  title text not null,
  description text,
  collection_type text not null default 'trail',
  created_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists goblin_collection_members (
  collection_id uuid not null references goblin_collections(id) on delete cascade,
  artifact_id uuid references goblin_artifacts(id) on delete restrict,
  entity_id uuid references goblin_entities(id) on delete restrict,
  ordinal integer,
  note text,
  added_at timestamptz not null default now(),
  check (((artifact_id is not null)::int + (entity_id is not null)::int) = 1)
);

create table if not exists goblin_source_receipts (
  id uuid primary key default gen_random_uuid(),
  artifact_id uuid not null references goblin_artifacts(id) on delete restrict,
  source_kind text not null,
  source_uri text,
  source_vendor_id text,
  sha256 text,
  ingested_by text not null,
  ingested_at timestamptz not null default now(),
  transformation text not null default 'none',
  receipt jsonb not null default '{}'::jsonb
);

create index if not exists goblin_artifacts_occurred_idx on goblin_artifacts (occurred_at desc);
create index if not exists goblin_relationship_subject_artifact_idx on goblin_relationships (subject_artifact_id);
create index if not exists goblin_relationship_subject_entity_idx on goblin_relationships (subject_entity_id);
create index if not exists goblin_relationship_object_artifact_idx on goblin_relationships (object_artifact_id);
create index if not exists goblin_relationship_object_entity_idx on goblin_relationships (object_entity_id);
create index if not exists goblin_observations_artifact_idx on goblin_observations (artifact_id);
create index if not exists goblin_observations_entity_idx on goblin_observations (entity_id);

comment on table goblin_artifacts is 'Immutable-ish identity and historical metadata for GOBLIN TRACT artifacts. Corrections should be receipted; interpretation belongs in observations.';
comment on table goblin_relationships is 'Typed provenance graph edges. AI-proposed edges remain proposed until promoted.';
comment on table goblin_observations is 'Versionable human/machine interpretations. Observations do not rewrite historical artifacts.';
