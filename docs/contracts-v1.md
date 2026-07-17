# Pulse contract v1

The canonical TypeScript schemas are in `src/contracts`. Android consumes the matching envelope through `android/contracts`. Every boundary message contains:

- `version`: currently exactly `1.0`
- `type`: one frozen event or command name
- `sessionId`, `eventId`, and `correlationId`
- `timestamp`: ISO 8601 wall-clock time
- `payload`: a strict type-specific object

Timeline payloads additionally carry session-relative monotonic milliseconds. Consumers must acknowledge and ignore an already-seen `eventId`; they must never repeat a command because of a retry.

## Phase 2 delivery

Watch vital events use one urgent DataItem per event at `/pulse/vitals/{eventId}`. The phone writes `/pulse/vital-acks/{eventId}` only after the event is committed to its local replay queue. The watch retains unacknowledged DataItems across a disconnect and removes them after acknowledgement. Both devices retain recently processed event IDs so a reconnect cannot duplicate a sample.

The phone owns the session clock. A `session_state` DataItem at `/pulse/session-state` includes the current session-relative elapsed time as transport metadata; the watch maps that value onto its own monotonic clock. Contract payloads remain strict and unchanged.

Phone-to-backend delivery uses `/v1/session-stream`, a persistent WebSocket carrying one canonical event JSON object per message. The backend responds with `eventAcknowledgementSchema` JSON for every message. The phone sends one event at a time, persists unacknowledged events, reconnects with bounded exponential backoff, and replays after a missing acknowledgement. Backend event-ID suppression makes replay idempotent.

## Boundaries

| Boundary | Messages |
| --- | --- |
| Watch to phone | `heart_rate_sample`, `heart_rate_availability`, `watch_status`, `session_action` |
| Phone to watch | `session_state`, `haptic_command`, `connection_status` |
| Phone to backend | `session_started`, `session_ended`, `session_context_updated`, `vital_sample_received`, `transcript_segment_received`, `audio_route_changed`, `consent_updated`, `playback_completed` |
| Backend to phone | `play_tts`, `cancel_tts`, `send_watch_haptic`, `report_ready` |

Changing a field or event requires a contract version change and coordinated producer/consumer updates. Unknown keys are rejected by TypeScript ingress validation.

## Session Lifecycle

Valid transitions are:

```text
created -> calibrating | failed
calibrating -> active | ending | failed
active -> ending | failed
ending -> completed | failed
completed -> (terminal)
failed -> (terminal)
```

Invalid transitions produce `Invalid session transition: <from> -> <to>`. Events for unknown or terminal sessions are rejected explicitly.

## Fixture Validation

Canonical JSON fixtures live in `fixtures/events`. Validate TypeScript consumers with `npm test` and Android consumers with:

```text
android\gradlew.bat :contracts:testDebugUnitTest
```

## Backend endpoints

- `GET /health`: backend, transcription-provider, command-channel, and runtime-mode health
- `POST /v1/events`: strict v1 event ingestion and duplicate acknowledgement
- `WS /v1/session-stream`: persistent event ingestion and per-event acknowledgement
- `GET /v1/sessions/{sessionId}/events`: current in-memory mock timeline
- `GET /v1/sessions/{sessionId}/vitals`: ordered vital samples and latest sample
- `PATCH /v1/sessions/{sessionId}/status`: lifecycle transition validation

Backend storage remains in memory. Restarting it clears sessions and duplicate IDs; backend process restart recovery is deferred to hardening. Phase 2 replay covers transport disconnects while the backend process and session store remain alive.
