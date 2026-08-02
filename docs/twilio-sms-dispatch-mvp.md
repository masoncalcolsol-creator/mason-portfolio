# Governed Twilio SMS Dispatch MVP

## Scope

This route provides a fail-closed outbound SMS seam for approved NULLWORKS recipients.

Endpoint:

```text
POST /api/neuraxis/twilio/sms/dispatch
```

## Required Vercel production environment variables

```text
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER
NULLWORKS_SMS_DISPATCH_SECRET
NULLWORKS_SMS_ALLOWLIST
HIVE_GITHUB_TOKEN
HIVE_REPO
HIVE_BRANCH
```

Optional when using a Twilio Messaging Service:

```text
TWILIO_MESSAGING_SERVICE_SID
```

`NULLWORKS_SMS_ALLOWLIST` is a comma-separated list of approved E.164 recipient numbers, for example:

```text
+16025550123,+14805550123
```

Never commit real credentials or phone numbers to GitHub.

## Generate a dispatch secret in PowerShell

```powershell
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
[Convert]::ToBase64String($bytes)
```

Store the result only in Vercel and the approved invoking system.

## Production test from PowerShell

Set values only in the current terminal session:

```powershell
$env:NW_SMS_SECRET = "PASTE_THE_DISPATCH_SECRET_HERE"
$to = "+1XXXXXXXXXX"
$uri = "https://mason-portfolio-main.vercel.app/api/neuraxis/twilio/sms/dispatch"
$headers = @{ "x-nullworks-sms-secret" = $env:NW_SMS_SECRET }
$payload = @{
  to = $to
  body = "NULLWORKS Twilio SMS MVP test. Reply STOP to opt out."
  source = "manual-mvp-test"
  consent = $true
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri $uri -Headers $headers -ContentType "application/json" -Body $payload
```

## Expected PASS evidence

1. HTTP response includes `ok: true`.
2. Response includes a Twilio `messageSid` beginning with `SM`.
3. Twilio initially reports `queued` or another accepted state.
4. Recipient receives the text.
5. Twilio invokes the existing message-status callback.
6. The Hive receives a `governed_sms_dispatch` receipt and a delivery-status receipt.

## Failure behavior

The route rejects:

- Missing or incorrect dispatch secret.
- Recipient not present in the environment allowlist.
- Missing explicit consent assertion.
- Empty or invalid phone number.
- Empty message.
- Message longer than 480 characters.
- Missing Twilio configuration.

The route never returns or logs the dispatch secret or Twilio Auth Token.

## Production boundary

A successful test proves the Twilio/Vercel/Hive dispatch seam. It does not, by itself, give ChatGPT scheduled tasks a callable Twilio action. The approved trigger bridge must be connected separately and must preserve the same secret, allowlist, consent, deduplication, and receipt controls.
