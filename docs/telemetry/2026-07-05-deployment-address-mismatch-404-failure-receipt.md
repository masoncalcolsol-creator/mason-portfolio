# NULLWORKS Failure Receipt
## ORI TAC OPS Deployment Address Mismatch / False Finish Line

- **Date:** 2026-07-05
- **System:** NULLWORKS portfolio / ORI TAC OPS OISA article
- **Human authority:** Mason Perry
- **Repository:** `masoncalcolsol-creator/mason-portfolio`
- **Route:** `/field-notes/ori-tac-ops-oisa-beta-test`
- **Classification:** Delivery-address failure, not page-code failure
- **Status:** Preserved / corrected / doctrine updated

## Human intent

Build and privately inspect the ORI TAC OPS OISA case-study page before adding it to public Field Notes navigation.

## Expected behavior

The exact URL supplied to Mason should open the new article route on mobile and desktop.

## Observed behavior

The first URL supplied was:

`https://mason-portfolio-phi.vercel.app/field-notes/ori-tac-ops-oisa-beta-test`

Mason opened it on mobile and received a styled `404 — This page could not be found.` response.

The domain itself was alive, but it was serving a deployment that did not contain the new route.

## What had actually passed

- The source route existed in the GitHub repository.
- The pull request build completed.
- Vercel reported the feature preview deployment as Ready.
- The page code rendered correctly on the feature deployment.

## What had not passed

- The exact public address handed to Mason had not been opened and verified.
- The `mason-portfolio-phi.vercel.app` alias was assumed to represent the deployment containing the new route.
- Successful build/deployment telemetry was incorrectly promoted into a delivery claim.

## Root cause

**Deployment-address mismatch.**

The page was built in the `mason-portfolio-main` Vercel project, but the supplied `mason-portfolio-phi.vercel.app` address pointed to a different or stale deployment state.

The system conflated:

- code exists
- build passed
- deployment reported ready
- exact destination verified

These are separate gates.

## Corrected verification

Mason opened the Vercel feature deployment route:

`https://mason-portfolio-main-git-feature-o-3b3f13-mason-perrys-projects.vercel.app/field-notes/ori-tac-ops-oisa-beta-test`

The article rendered successfully on mobile. Mason supplied a screenshot showing:

- NULLWORKS Field Notes header
- standalone OISA case-study badge
- complete article headline
- article deck and byline
- opening body copy
- styled quote block

This human observation closed the page-render gate for the feature deployment.

## Impact

- Mason encountered a false 404.
- The page was incorrectly described as ready at a URL that had not been verified.
- Confidence in the deployment receipt was reduced.
- No source code, article content, user data, or repository state was lost.

## Countermeasure

A page may not be called live, ready, delivered, or production-verified until all four gates are separately recorded:

1. **Source gate** — route exists in the intended repository and branch.
2. **Build gate** — framework/type checks or deployment build pass.
3. **Deployment gate** — the intended hosting project reports a successful deployment.
4. **Destination gate** — the exact URL given to the human opens successfully and displays the expected artifact.

For stable public releases, add a fifth gate:

5. **Alias gate** — the permanent production domain is explicitly bound to the verified deployment and retested after promotion.

## Permanent doctrine

> **Build success is not route success.**

> **Deployment success is not delivery success.**

> **A route is not live until the exact destination URL is opened and verified.**

> **No fake finish lines.**

## Audit classification

- **Responsible layer:** deployment/delivery verification
- **Code defect:** no evidence
- **Content defect:** no evidence
- **Human-authority correction:** Mason's first live route check exposed the false finish line
- **Recovery time:** immediate after correct Vercel preview address was used
- **Recurrence risk:** medium until permanent-domain checks are added to every publishing test flight

## New telemetry fields for future deployments

```yaml
deployment_receipt:
  repository:
  branch:
  commit_sha:
  hosting_project:
  deployment_id:
  preview_url:
  production_alias:
  route:
  source_gate:
  build_gate:
  deployment_gate:
  exact_url_opened_by:
  exact_url_opened_at:
  http_result:
  expected_content_observed:
  mobile_visual_gate:
  desktop_visual_gate:
  navigation_status:
  unresolved_unknowns:
```

## Final result

**Feature deployment render: PASS**

**Originally supplied `mason-portfolio-phi` destination: FAIL / 404**

**Permanent production-domain binding: still a separate infrastructure gate**

This failure remains part of the ORI TAC OPS article test-flight record and must not be deleted when the permanent domain is corrected.
