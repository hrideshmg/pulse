# Pulse NitroStack Widgets

NitroStack widgets are custom, theme-aware Next.js/React UI components. They render the result of an MCP tool and can call other MCP tools, preserve widget state, send a chat follow-up, and request inline, fullscreen, or picture-in-picture display.

They are not a replacement for Pulse's Android phone UI, Wear OS UI, backend authorization, or agent-facing MCP Resources. The agent must continue to use the canonical Resources; widgets make the MCP interaction understandable to a human in NitroStudio, an MCP Apps client, or an OpenAI Apps SDK client.

## Core demo widgets

### Live Nervous-System Card

- Displays latest BPM, source (`watch` or `simulator`), freshness, baseline delta, availability, and stress state.
- Includes a compact rolling heart-rate trace and the start time/duration of sustained elevation.
- Backed by a read-only `get_live_state` tool that composes `session://current/vitals` and `session://current/stress`.
- Phase: 3.

### Co-Regulation Decision Card

- Shows the evidence the agent considered: stress state, relevant context, transcript excerpt, and speech metrics.
- Shows the minimal intervention selected, its rationale, and the cooldown/duplicate-prevention result.
- Backed by the `co_regulate` prompt flow or an intervention-result tool.
- Phase: 6.

### Intervention Delivery Receipt

- Displays haptic pattern or whispered message, consent-check result, request time, command status, delivery acknowledgement, and correlation ID.
- Makes physical actions demonstrably traceable through MCP.
- Attached to `haptic_nudge` and `whisper_coach` tool responses.
- Phase: 6.

### HR-Synced Session Timeline

- Fullscreen scrubber with the heart-rate trace, stress-state transitions, final transcript segments, speech metrics, and intervention markers aligned on session-relative time.
- Selecting a heart-rate spike reveals its evidence and the matching transcript moment.
- Backed by `generate_session_report` or a read-only `get_session_timeline` tool.
- Phase: 5.

### Audit Trace Explorer

- Renders the full causal chain: Resource reads, consent checks, model decision summary, tool call, device command, delivery acknowledgement, and resulting heart-rate samples.
- Supports time-range, event-kind, tool-name, and intervention-ID filters.
- Backed by `query_audit_log`.
- Phase: 7.

### Intervention Explanation Card

- Focused answer to "why did you buzz me at 0:14?"
- Cites the exact stress evidence, transcript window, consent result, requested action, delivery result, and recovery samples.
- Backed by `explain_intervention` or a filtered `query_audit_log` result.
- Phase: 7.

## Supporting widgets

### Transcript and Speech Metrics Card

- Shows a rolling final transcript with speaker labels, WPM, fillers per minute, long turns, and current silence.
- Provides a selected time window without exposing raw audio.
- Backed by `get_transcript_window` and a read-only speech-metrics tool.
- Phase: 4.

### Session Context Brief

- Displays the situation, participants, goals, topics to avoid, and relevant wearer summary.
- Must omit or redact fields not needed by the viewer or current agent session.
- Backed by a read-only `get_context_brief` tool.
- Phase: 4.

### Consent Status Panel

- Displays per-session read and action scopes, grant/revocation timestamps, and whether an action is currently permitted.
- Read-only. Consent must only be granted or revoked through the wearer's Android phone UI.
- Backed by a read-only `get_consent_status` tool.
- Phase: 6.

### Device Health Panel

- Displays watch, phone, earbuds, microphone, transcription provider, backend, and agent-access connectivity.
- Clearly identifies simulated vitals, simulated device actions, and active fallbacks.
- Backed by `get_device_status`.
- Phase: 2, expanded through Phase 6.

### Simulation Controller

- Clearly labelled development/demo-only control for deterministic heart-rate scripts.
- Shows the active scenario, elapsed step, and simulation state.
- Backed by side-effecting `start_simulated_vitals` and `stop_simulated_vitals` tools, protected by development/demo authorization.
- Phase: 2.

### Session Report Viewer

- Displays session summaries, stress episodes, recovery times, speech trends, report limitations, and simulated-data markers.
- Can link out to the timeline and audit explorer.
- Backed by `generate_session_report`.
- Phase: 5.

### Conversation Copilot Card

- Displays a watch-tap request, short suggestion, safety/expiry status, queue state, and TTS delivery result.
- Does not expose confidential context unless it is needed for the consented suggestion.
- Backed by the Phase 8 `copilot_advice` flow and `whisper_coach`.
- Phase: 8, optional.

## Recommended build order

1. Live Nervous-System Card.
2. HR-Synced Session Timeline.
3. Intervention Delivery Receipt.
4. Audit Trace Explorer and Intervention Explanation Card.
5. Supporting widgets after their corresponding MCP surface passes its phase gate.

## Implementation rules

- Attach widgets to tool responses. Use small read-only presentation tools when a widget needs to compose one or more canonical Resources.
- Keep Resources as the source of truth for agents; do not require a widget for an agent to understand or act on a session.
- Every widget-initiated tool call must pass the same session authorization, consent enforcement, idempotency, and audit logging as any other MCP call.
- Use fullscreen for the timeline and audit explorer; use compact inline cards for live state and delivery receipts.
- Provide realistic normal, unavailable, stale, simulated, consent-revoked, and error examples in `src/widgets/widget-manifest.json` so every state can be previewed in NitroStudio.
