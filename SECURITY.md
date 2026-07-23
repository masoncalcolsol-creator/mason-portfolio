# Security Policy

## Supported surface

The supported production surface is the current `main` branch and the deployed NULLWORKS portfolio at:

`https://mason-portfolio-main.vercel.app`

Experimental branches, historical previews, archived routes, and local development environments may not receive security fixes.

## Reporting a vulnerability

Do not publish suspected vulnerabilities, credentials, personal information, partner information, or exploit details in a public issue or pull request.

Use GitHub's private vulnerability-reporting or private security-advisory flow from the repository's **Security** tab when available. If that option is unavailable, use the official contact channel published through the NULLWORKS production site and clearly mark the message **SECURITY REPORT**.

Include only the information necessary to reproduce and assess the issue:

- affected route or component;
- concise description of the behavior;
- safe reproduction steps;
- potential impact;
- screenshots or logs with secrets and personal information removed;
- a private contact method for follow-up.

## Research boundaries

Good-faith testing must avoid:

- accessing, changing, retaining, or exposing data belonging to another person;
- degrading availability or disrupting production;
- social engineering, phishing, harassment, or physical intrusion;
- automated high-volume scanning;
- denial-of-service testing;
- persistence, lateral movement, or destructive actions;
- disclosure before NULLWORKS has had a reasonable opportunity to investigate and remediate.

Stop testing immediately when sensitive information, credentials, partner data, or another person's information becomes visible.

## Secrets

Never submit live API keys, passwords, tokens, private keys, recovery codes, or unredacted environment files. A credential found in code should be treated as compromised and reported privately so it can be revoked and rotated.

## Response

NULLWORKS will preserve the report, assess severity, verify the affected surface, and communicate a remediation decision when a valid private contact method is provided. Submission does not create a contract, bounty obligation, employment relationship, or permission to exceed these boundaries.
