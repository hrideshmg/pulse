# Phase 5 Validation

Phase 5 builds each report deterministically from stored session evidence. SQLite already retained sessions, events, vital samples, final transcript segments, and regenerated stress transitions; this phase adds persisted speech-metric snapshots and deterministic backfill for databases created before the metric table existed.

## Scope

- `GET /v1/sessions/{sessionId}/report` returns one chronological evidence timeline and a per-session summary.
- `session://{sessionId}/report` exposes the same report as an MCP Resource.
- `generate_session_report` exposes the report through the `session-report` MCP widget.
- `review_session` instructs clients to cite transcript segment IDs and vital evidence IDs.
- The scrubber exists only in the MCP widget under `src/widgets`; the Android phone UI is unchanged.
- Cross-session trends and session deletion or retention controls are not implemented.
- Reports do not include speaker-label or simulation labeling.

Raw audio is never retained, so reports always state that audio playback is unavailable. Missing transcript or heart-rate evidence adds a limitation while preserving a valid reduced report.

## Automated Checks

Run:

```text
npm run typecheck
npm test
npm --prefix src/widgets run build
```

The tests verify deterministic timeline ordering, stress-episode and recovery summaries, missing-data degradation, report schema validity, omission of speaker and simulation labels, and speech-metric/report stability after reopening SQLite.

## Studio Check

1. Start the backend with `npm run dev:backend` and the MCP server with `npm run dev`.
2. In NitroStudio, call `generate_session_report` with a stored session ID.
3. Confirm the `session-report` widget renders the heart-rate trace and transcript on one scrubber.
4. Click a heart-rate point and confirm the scrubber moves to its session-relative timestamp and selects the transcript segment spanning, or nearest to, that moment.
