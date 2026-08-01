# Amanda Brief Runtime Rollback Receipt

Date: 2026-08-01

## Failure

The production `/amanda-brief` route returned HTTP 500 after the unlocked route attempted to gunzip a newly split eight-part Base64 payload. The TypeScript build passed, but the assembled compressed stream failed at runtime.

## Immediate recovery

- Restored `main` to the last known-good Amanda payload commit.
- Preserved the eight draft payload-part files for forensic comparison; they are no longer imported by the live route.
- Triggered a fresh Vercel production deployment from the recovered state.
- PIN remains `1004`.

## Next repair rule

Do not reattach the expanded page until the complete compressed payload has been reconstructed and gunzip-tested as one artifact before repository write and production deployment.
