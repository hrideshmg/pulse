# Phase 2 validation

## Automated checks

Validated on 2026-07-17:

```text
npm run typecheck
npm test
android\gradlew.bat --no-daemon "-Pkotlin.incremental=false" :contracts:testDebugUnitTest :phone:testDebugUnitTest :phone:assembleDebug :watch:assembleDebug
```

These checks cover strict event validation, WebSocket acknowledgements, duplicate suppression, timeline ordering for out-of-order samples, the ten-second stale threshold, and compilation of both Android applications. The non-incremental Kotlin flag avoids a local Gradle/Kotlin cache-lock issue; it does not change application behavior.

## Hardware acceptance

Run with `VITALS_SOURCE=watch` on the exact demo watch and phone:

1. Start the backend, install both debug apps, and set a phone-reachable `BACKEND_URL`.
2. Start a session on the phone. Confirm the watch shows the session, phone connection, backend connection, and sensor capability or an explicit unsupported state.
3. Grant heart-rate permission and keep the watch app visible. Confirm one live BPM reaches the phone and `GET /v1/sessions/{sessionId}/vitals` with `source=watch`.
4. Leave the latest reading unchanged for more than ten seconds and confirm the phone labels it `STALE`.
5. Disconnect the phone from the watch while readings are queued. Confirm the watch remains responsive and shows queued readings.
6. Reconnect. Confirm queued counts clear and the backend timeline contains each event ID once in ascending `sessionElapsedMs` order.
7. Interrupt the phone's network while leaving the backend process running, collect several readings, and restore the network. Confirm the phone queue replays without duplicate samples.

Run separately with `VITALS_SOURCE=simulated`:

1. Start a session and run the scripted sequence.
2. Confirm the phone displays `SIMULATED VITALS`, the watch sensor does not start, and all backend samples have `source=simulator`.
3. Confirm the sequence uses the same phone replay queue, WebSocket ingress, acknowledgement, deduplication, and ordered storage as watch samples.

Physical hardware checks are not automated and must be dated here after execution. Until then, the real-watch portions of the Phase 2 acceptance gate remain unverified.

Backend process restart recovery is not part of Phase 2: storage is still in memory. Disconnect/reconnect validation must leave the backend process alive.
