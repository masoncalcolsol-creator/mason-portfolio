# Failure Receipt — Partial Cancellation-Card Removal

**Date:** 2026-08-01  
**System:** NULLWORKS Amanda subscription-update page  
**Failure class:** False finish line / literal-command completion without intent completion

## Human intent

Remove the unidentified cancellation item from the subscription page entirely because Mason did not recognize the service and did not want the record displayed.

## What the system did

The first repair searched for the unidentified label and removed the nearest matching rendered container. The matching rule allowed generic classes containing `item`, `proof`, or `receipt`, so it selected and deleted only the title sub-container.

The unidentified card body remained visible without its heading.

## Why this was a false finish line

The implementation satisfied the narrow literal action — the title text disappeared — but failed the operational intent: remove the complete rendered record and all associated explanatory, evidence, and receipt content.

The deployment was reported as complete without verifying the resulting mobile render.

## Root cause

1. Container-selection logic was too broad.
2. The removal function chose the nearest nested element rather than the complete card boundary.
3. Completion was inferred from code execution instead of validating the final rendered object.

## Correction

The route now:

1. Locates the unidentified label.
2. Searches only for enclosing elements whose class contains `card`.
3. Calculates the matching closing tag with nesting awareness.
4. Removes the smallest complete card that contains the label.

## Prevention rule

When the human asks to remove an item, slide, block, record, or card, removal means the entire semantic object and all child content unless the human explicitly limits the request to a title, field, or subsection.

A removal is not complete until the final rendered output is checked for orphaned content, blank containers, or surviving evidence text.

## Doctrine hook

**No fake finish lines. Preserve the failure. Verify the rendered outcome, not merely the mutation.**
