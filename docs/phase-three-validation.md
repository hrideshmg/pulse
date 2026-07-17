# Phase 3 validation

Validation date: 2026-07-17

## Automated checks

| Check | Command | Result |
| --- | --- | --- |
| TypeScript typecheck | `npm run typecheck` | Passed |
| NitroStack build | `npm run build` | Passed |
| Node contracts/backend/stress tests | `node --test dist/contracts/contracts.test.js dist/backend/stress-engine.test.js dist/backend/server.test.js` | Passed: 16 tests |
| Android contracts, phone, and watch debug build | From `android`: `.\gradlew.bat --no-daemon "-Pkotlin.incremental=false" :contracts:testDebugUnitTest :phone:testDebugUnitTest :phone:assembleDebug :watch:assembleDebug` | Passed |

The same Gradle task fails when launched from the repository root because the Gradle build root is `android`.

## Implemented acceptance coverage

- Fixed stress fixtures produce deterministic output even when vital samples arrive out of order.
- A sustained elevation emits exactly one `sustained_elevation` transition.
- A brief spike does not classify as sustained stress.
- Recovery clears the signal only after a continuous recovery duration and applies cooldown.
- Current-session vitals and stress endpoints expose consent state, latest vitals, freshness, rolling windows, stress state, and stress transitions.
- MCP vitals/stress authorization rejects missing `read:vitals` consent, missing authenticated scope, and mismatched session claims.

## Manual acceptance still required

- Start a real watch session with `VITALS_SOURCE=watch`.
- Confirm `session://current/vitals` in NitroStudio shows fresh watch BPM and timestamps.
- Confirm `session://current/stress` reports the derived state and can answer whether the wearer is stressed and since when.
- Confirm resource update notifications occur on meaningful stress-state changes rather than every raw heart-rate packet.
