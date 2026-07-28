-- LIVE LEARNING FOREST · SEED NURSERY 1.1
-- Preserve structured curiosity context in the review queue and append-only ledger.

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
  s.payload,
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
      'proposal_text', new.proposal_text,
      'source_locator', new.source_locator,
      'preference', new.preference,
      'route_depth', new.route_depth,
      'state', new.state,
      'submission_payload', new.payload,
      'canonical_effect', 'NONE'
    ),
    '',
    new.created_at
  );
  return new;
end;
$$;

comment on view public.llf_review_queue is
  'Governed review queue including structured Seed Nursery context and the latest append-only review decision.';
