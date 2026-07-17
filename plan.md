# Pulse implementation plan

## Goal

Build **Pulse**: an MCP server that gives AI agents a nervous system. A person wears a Pixel Watch, carries an Android phone, and wears Bluetooth earbuds. Their live physiological and conversational state — heart rate, a derived stress signal, session context, a rolling transcript, speech metrics — is exposed to any AI agent as structured, agent-readable **MCP Resources**. The agent can respond into the physical world only through **consent-scoped MCP Tools** (buzz the watch, whisper a short line to the earbuds), and every Resource read and Tool call is recorded in a queryable **audit log**.

The MCP server is the product, not a wrapper. It must be built with the **NitroStack MCP server SDK** and deployed on NitroStack. Every agent-facing read and action passes through it: access is limited, structured, and fully traceable.

The flagship demonstration is a **real-time co-regulation loop**:

1. The wearer's heart rate climbs and stays elevated; the vitals Resource shows sustained elevation.
2. An MCP-connected agent perceives the stress and decides — from session context and transcript, not a fixed threshold — whether and how to intervene.
3. The agent calls `haptic_nudge` to interrupt the spiral, or `whisper_coach` to deliver a short spoken affirmation.
4. The heart-rate curve visibly bends downward. No human intervened except the one being helped.
5. Afterwards, anyone can ask the server "why did you buzz me at 0:14?" and get an answer citing the exact heart-rate spike and transcript moment, straight from the audit log.

## Feature priorities

Build in this order. Each feature should reach its acceptance gate before the next becomes the focus.

1. **Vitals as a Resource** — live heart rate plus a derived stress signal (sustained-elevation detection). This is the core and most important feature; the agent reads *state*, not just raw numbers.
2. **Context + transcript as Resources** — pre-loaded session context (who the wearer is, what the situation is), a rolling transcript, and speech metrics such as pace.
3. **HR-synced session report** — transcript and heart-rate trace aligned on a single scrubber; click a spike and see/hear the exact moment that caused it, with per-session and cross-session trends.
4. **Consent-gated Tools** — `haptic_nudge` and `whisper_coach`, each scoped to exactly what the wearer approved.
5. **Audit log** — every Resource read and Tool call timestamped, recorded, and queryable after the fact.

**Nice-to-have (later phase only):** the Conversation Copilot — on-demand advice triggered by a watch tap, pulled from session context and transcript. Do not let it pull effort from the five core features.

## Scope decisions

- The Pixel Watch handles heart-rate sensing, haptics, basic session status, and (later, nice-to-have) the copilot tap.
- The Android phone handles context entry, microphone capture, live captions, the Bluetooth audio route, and text-to-speech playback.
- A session backend ingests vital and transcript events, derives signals, stores session state, and dispatches device commands.
- The **NitroStack MCP server** (built with the NitroStack MCP server SDK, TypeScript) is the *only* agent-facing surface. Agents never talk to the backend or devices directly.
- A demo agent acts as an MCP host for the co-regulation loop. It must call the MCP server live during the demo.
- Raw audio and high-frequency sensor packets stay outside MCP. MCP exposes useful state and consented actions.
- Deepgram streaming speech-to-text is the default transcription path; Android on-device recognition is a fallback.
- Raw audio is not stored by default. Stored sessions contain transcript segments, metrics, vital samples, and interventions.

## Non-goals for the first working version

- Medical diagnosis or claims about anxiety, panic, or cardiac health
- Support for iPhones or non-Wear OS watches
- Reliable operation with every Bluetooth headset
- Coach personas, resume parsing, calendar integration, or participant research
- Multiple simultaneous wearers in one session
- Fully autonomous advice on every sentence
- Custom speech recognition or language models

## Agent execution model

A coordinator agent owns this plan, shared contracts, and phase acceptance. Specialist agents may implement isolated components against frozen interfaces.

1. Complete the acceptance gate for a phase before depending on it downstream.
2. Do not change shared event or command schemas silently. Update the contract first, then every producer and consumer.
3. Give each implementation agent a narrow scope, the files it may change, the relevant contracts, and the validation command or manual check it must run.
4. Every handoff must state what changed, how it was verified, what remains mocked, and which assumptions could still fail on real hardware.
5. Keep real and simulated implementations behind explicit runtime flags. The UI must show when simulated data is active.
6. Prefer small vertical slices over broad scaffolding. Live heart rate readable in NitroStudio is worth more than five unfinished services.
7. Keep the demo path stable. Experimental features stay disabled by default until they pass their phase gate.
8. Do not let separate agents edit the same integration boundary at the same time.
9. Record reproducible setup and validation commands as the project evolves.
10. When a hardware or external API path fails, activate the documented fallback instead of redesigning the system.

## Shared domain model

Define these records before integrating components.

### Session

- `sessionId`
- `status`: `created`, `calibrating`, `active`, `ending`, `completed`, `failed`
- `startedAt`, `endedAt`
- `simulatedVitals`
- `audioInputRoute`

### Session context

- Wearer summary: who they are, relevant background
- Situation: what is happening right now (pitch, interview, presentation, difficult conversation)
- Other participants and their roles
- Goals for the session and topics to avoid
- Stress sensitivity settings (baseline offset, trigger durations)

### Vital sample

- `sessionId`
- BPM
- Availability
- Session-relative timestamp and device timestamp
- Source: `watch` or `simulator`

### Stress signal (derived)

- `state`: `baseline`, `elevated`, `sustained_elevation`, `recovering`
- Baseline BPM and current delta
- Elevation start time and duration so far
- Evidence: the samples that produced the current state
- Cooldown status

### Transcript segment

- `sessionId`, `segmentId`
- `speaker`: `wearer`, `participant`, `agent`, or `unknown`
- Text, session-relative start and end times, provider timestamp, confidence, final/interim status

### Metric snapshot (speech)

- Words per minute
- Fillers per minute
- Longest speaking-turn duration and current silence duration

### Consent grant

- `grantId`, `sessionId`
- Scope: `read:vitals`, `read:context`, `read:transcript`, `act:haptic`, `act:audio`
- Granted/revoked timestamps
- Granted only through the wearer's phone UI — never through MCP itself

### Intervention

- `interventionId`
- Type: `haptic_nudge`, `whisper_coach`, or (later) `copilot_advice`
- Trigger evidence and requesting agent identity
- Generated message (for audio)
- Requested, queued, played, and dismissed timestamps; delivery result

### Audit entry

- `auditId`, `sessionId`, timestamp
- Kind: `resource_read` or `tool_call`
- Subject: resource URI or tool name, plus validated arguments
- Consent scope checked and result
- Outcome and correlation ID linking to any resulting intervention

Use session-relative monotonic time for timeline alignment. Keep wall-clock timestamps for logs and cross-device debugging.

## Shared interfaces

Freeze versioned message schemas before integration. Every message needs a version, session ID, event ID, timestamp, and correlation ID. Consumers must ignore duplicate event IDs so reconnects do not repeat haptics or audio.

### Watch to phone

- `heart_rate_sample`
- `heart_rate_availability`
- `watch_status`
- `session_action`
- (later) `advice_requested` — copilot tap

### Phone to watch

- `session_state`
- `haptic_command`
- `connection_status`

### Phone to backend

- `session_started`, `session_ended`
- `session_context_updated`
- `vital_sample_received`
- `transcript_segment_received`
- `audio_route_changed`
- `consent_updated`
- `playback_completed`

### Backend to phone

- `play_tts`, `cancel_tts`
- `send_watch_haptic`
- `report_ready`

# Development phases

## Phase 0: prove the risky hardware paths

Do not build the full application until the hardware assumptions are tested on the exact Pixel Watch, Android phone, and earbuds intended for the demo. The heart-rate path is the gate for everything; the audio path only blocks Phases 4 and 6 and may be validated in parallel.

### Build

- Read heart rate from the Pixel Watch using Wear OS Health Services; show BPM and availability on the watch.
- Send one small data item from watch to phone through the Wearable Data Layer.
- Trigger one haptic pattern on the watch from a phone command.
- Initialize a minimal NitroStack MCP server project with the NitroStack MCP server SDK; confirm NitroStudio connectivity and deployment access.
- Route microphone input from the earbuds when Android exposes them as a communication device; record a short clip.
- Play a short Android `TextToSpeech` message through the earbuds and verify capture resumes afterwards.
- Open a streaming transcription connection and receive one final transcript segment.

### Acceptance gate

- Real heart rate appears on the phone with a timestamp.
- A phone command causes a watch vibration.
- NitroStack exposes one test resource and one test tool visible in NitroStudio.
- The tested audio route can capture intelligible speech and play TTS.
- At least one transcription result reaches a test client.

### Required fallback decisions

- If the earbud microphone is unreliable, use the phone microphone and keep earbuds for TTS output.
- If real heart-rate delivery is unreliable, use the Wear OS sensor simulator or an in-app simulator, clearly labelled.
- If cloud transcription is unavailable, use on-device recognition for short demo segments.

Document the chosen heart-rate and audio paths before continuing.

## Phase 1: establish contracts and runnable foundations

Create the smallest runnable watch, phone, backend, and MCP server shells. No features beyond health checks and mocked events.

### Build

- Define the shared domain records and versioned event schemas.
- Define the session lifecycle and invalid transitions.
- Configure environment variables and secret handling.
- Add runtime flags for simulated vitals, phone-mic fallback, transcription fallback, and simulated device actions.
- Add structured logs with session IDs, event IDs, and correlation IDs — this becomes the substrate for the Phase 7 audit log, so log every boundary crossing from day one.
- Add health checks for the backend, MCP server, transcription provider, and device command channel.
- Make each component runnable without requiring every other component to be online.

### Acceptance gate

- All components start with documented commands.
- Shared schema fixtures validate in every component that consumes them.
- Mock heart-rate and transcript events can move through the system without hardware.
- Missing secrets or unavailable dependencies produce explicit errors instead of silent failure.

## Phase 2: vitals capture pipeline (watch → phone → backend)

The physical half of the core feature. Keep the watch app deliberately small: it is a sensor, not the main application.

### Build

- Request heart-rate permissions and check Health Services capabilities before starting measurement.
- Use `MeasureClient` for the foreground demo implementation.
- Display BPM, sensor availability, phone connection, and session state on the watch.
- Synchronize latest heart rate and availability to the phone through `DataClient`; mark live updates as urgent.
- Add event IDs, acknowledgements, duplicate suppression, and reconnect behavior on the watch–phone bridge.
- Stream vital samples from phone to backend over the persistent session connection; replay unacknowledged events on reconnect.
- Store vital samples against the session with session-relative timestamps.
- Add a simulated-heart-rate control (scripted sequences) available only in demo/development mode and clearly labelled.
- Display the latest reading, staleness, and connection state in the phone app.

### Acceptance gate

- A real heart-rate update travels watch → phone → backend once and in order.
- Stale readings are marked stale rather than presented as current.
- Losing the phone connection does not crash or freeze the watch app; reconnection does not duplicate samples.
- A simulated sequence flows through the identical pipeline and is labelled as simulated end to end.

## Phase 3: Vitals as a Resource (priority 1 — the core)

Expose vitals through the NitroStack MCP server. This is the moment the project becomes Pulse: an agent reads a living human's state as a first-class MCP Resource.

### Build

- Derive the stress signal on the backend, deterministically:
  - Calibrate a baseline during the session's calibration period.
  - Detect sustained elevation relative to baseline and configured sensitivity.
  - Apply trigger duration, recovery duration, and cooldown rules.
  - Emit typed signal events carrying the evidence (samples) that caused them.
- Implement MCP resources with the NitroStack MCP server SDK:
  - `session://current/vitals` — latest BPM, availability, source, freshness timestamp, and a short rolling window (not high-frequency raw packets).
  - `session://current/stress` — derived state, baseline, delta, elevation duration, evidence summary.
- Strict Zod input/output schemas; read-only resource annotations.
- Resource update notifications on meaningful state changes (e.g. `elevated` → `sustained_elevation`), not on every sample.
- Require a session-scoped authorization context; reject stale, completed, or unknown sessions.
- Enforce the `read:vitals` consent scope (a minimal consent check now; the full consent UI arrives in Phase 6).
- Record every resource read in the structured log (audit substrate).

### Acceptance gate

- NitroStudio can read live heart rate and the derived stress state from the real watch, with freshness timestamps.
- A synthetic heart-rate sequence produces exactly one `sustained_elevation` event; a brief spike produces none; recovery clears the state.
- Fixed sample fixtures always produce the same stress-signal output.
- An agent connected to the MCP server can answer "is the wearer stressed right now, and since when?" using only Resources.
- Reads without a valid session or scope fail with clear errors.

## Phase 4: Context + transcript as Resources (priority 2)

Give the agent the *why* behind the numbers, so decisions are contextual rather than threshold-triggered.

### Build

- Phone UI for pre-loading session context (wearer summary, situation, participants, goals, topics to avoid) before a session starts; `session_context_updated` events keep the backend current.
- Audio capture on the phone: explicit user-started session, foreground service, communication-device selection with phone-mic fallback, `AudioRecord` PCM capture.
- Stream audio to Deepgram through the backend or short-lived provider credentials; display interim captions on the phone; persist only final segments.
- Capture speaker labels when diarization supports it; normalize timestamps to session-relative time.
- Handle provider disconnects and stream restarts without resetting the session timeline; on-device fallback for short segments.
- Compute speech metrics from final wearer segments: words per minute, long turns, silence.
- Implement MCP resources:
  - `session://current/context`
  - `session://current/transcript` — rolling window of final segments (parameterized reads via a `get_transcript_window` read-only tool if needed)
  - `session://current/speech-metrics`
- Enforce `read:context` and `read:transcript` consent scopes; log every read.
- Redact or omit raw audio from logs; raw audio never enters MCP payloads or persistent storage.

### Acceptance gate

- A scripted two-speaker conversation produces ordered final segments readable through MCP within seconds of being spoken.
- Fixed transcript fixtures always produce the same pace metrics.
- An agent reading context + transcript + stress can explain *why* the wearer might be stressed (e.g. "heart rate rose as the pricing objection was raised").
- Provider failure activates a visible fallback state; reconnection does not duplicate segments.
- Ten minutes of capture does not leak resources or lose the audio route under normal conditions.

## Phase 5: HR-synced session report (priority 3)

Build the report from stored evidence. The model may summarize; it may not manufacture events.

### Build

- Persist the full session timeline: vital samples, stress-signal transitions, transcript segments, metrics, and (once Phase 6 exists) interventions.
- Align the transcript and heart-rate trace on a single scrubber in the phone UI: click a spike and see — and where audio consent allows, hear — the exact transcript moment that caused it.
- Chronological timeline generation from stored data; per-session summaries (pace, stress episodes, recovery times).
- Cross-session trends once more than one session exists (baseline drift, stress-episode frequency, recovery speed).
- Expose `session://{sessionId}/report` as an MCP resource.
- Session deletion and retention controls; deleting a session removes transcript, vitals, metrics, and interventions.
- Include limitations in the report when speaker labels, audio, or heart rate were unavailable; identify simulated data.

### Acceptance gate

- The report regenerates deterministically from stored session data.
- Every quoted statement maps to a transcript segment; every heart-rate claim maps to recorded samples.
- Clicking a heart-rate spike on the scrubber lands on the correct transcript moment.
- Missing data reduces report detail without causing generation failure.
- Deleting a session removes all of its stored data.

## Phase 6: consent-gated Tools (priority 4)

The agent's hands: `haptic_nudge` and `whisper_coach`. Every action is scoped to exactly what the wearer approved.

### Build

- Consent model: the wearer grants and revokes scopes (`act:haptic`, `act:audio`, plus the read scopes) only through the phone UI. Grants are per-session, timestamped, and revocable mid-session with immediate effect. MCP exposes no way to grant consent.
- `haptic_nudge` tool: pattern selection from predefined calming patterns, dispatch through backend → phone → watch, delivery acknowledgement returned to the caller.
- `whisper_coach` tool: short text (strict word limit) → TTS through the earbuds. Request transient audio focus only during playback; pause or tag captured audio during TTS so the pipeline never transcribes the agent's own voice; queue playback until the wearer and participants are silent; expire messages that go stale before a safe window appears.
- Store every tool action as an Intervention with trigger evidence and delivery result; agent speech enters the transcript with speaker `agent`.
- Tool annotations (side-effecting, non-idempotent) via the NitroStack SDK; idempotency keys so retries never duplicate physical feedback.
- Clear errors for missing consent, revoked consent, stale sessions, and malformed arguments.
- **Wire the flagship co-regulation loop**: a demo agent (MCP host) subscribes to the stress resource, and on `sustained_elevation` decides from context + transcript whether and how to intervene, then calls `haptic_nudge` and/or `whisper_coach`. Recovery cancels queued escalation. Detection stays deterministic on the backend; the agent decides and acts on evidence, it does not invent it.

### Acceptance gate

- With consent granted, an MCP tool call from NitroStudio buzzes the real watch and whispers through the real earbuds, each returning a delivery result.
- With consent revoked, the same calls fail with a clear consent error and no physical effect.
- Tool retries do not duplicate haptics or audio; recovery cancels queued audio; the same elevated period cannot trigger repeated interventions.
- The full loop runs live: scripted or real sustained elevation → agent perceives via Resources → decides → acts via Tools → heart-rate curve response is recorded.
- Whispered audio never appears as wearer or participant speech in the transcript.

## Phase 7: audit log (priority 5)

Make every interaction explainable after the fact. This is the trust-and-safety headline.

### Build

- Promote the Phase 1 structured logs into a first-class, persistent audit log: every Resource read and Tool call gets an Audit entry with timestamp, subject, arguments, consent check, outcome, and correlation ID.
- Link tool-call audit entries to their Intervention and to the evidence (stress-signal event, transcript window) the agent read beforehand, via correlation IDs.
- Expose the log through MCP: `session://current/audit` (and per-session historical access) plus a read-only `query_audit_log` tool for filtered queries (time range, kind, tool name).
- Support the interrogation demo: "why did you buzz me at 0:14?" must be answerable by an agent citing the heart-rate spike and the transcript moment, sourced entirely from the audit log and linked evidence.
- Audit entries are append-only; session deletion removes them with the session.

### Acceptance gate

- Every Resource read and Tool call from Phases 3–6 appears in the audit log with a consent check result.
- An agent can reconstruct the complete chain for one intervention: what it read, what it decided on, what it called, what the device did, and how the heart rate responded.
- The "why did you buzz me at 0:14?" question gets a correct, evidence-cited answer live.
- Audit queries are scoped to the authorized session; no cross-session leakage.

## Phase 8 (nice-to-have): Conversation Copilot

Only start this once Phases 0–7 have all passed their gates. It must never destabilize the core demo path.

### Build

- `advice_requested` event from a watch tap, with duplicate suppression across reconnects.
- A `copilot_advice` flow: the agent reads context, recent transcript, and speech metrics through MCP, generates one short, actionable suggestion (strict word limit), and delivers it via `whisper_coach` under the existing `act:audio` consent scope.
- Use cases: on-demand advice in high-stakes conversations (meetings, pitches), or "points you forgot to mention" pulled from the pre-loaded session context against what the transcript shows was actually said.
- Requested, thinking, queued, playing, completed states on phone and watch.
- Guardrails: never invent facts about the wearer or participants; never speak confidential context aloud unless directly useful; advice expires if stale before a safe playback window.

### Acceptance gate

- A watch tap produces one relevant earbud suggestion through an observable MCP tool chain.
- A second tap during processing does not create overlapping playback.
- Disabling the copilot leaves vitals, transcripts, tools, reports, and audit untouched.

## Phase 9: harden the complete system

Run failures through the full stack instead of validating components only in isolation.

### Validate

- Permission denial and later grant; watch disconnect and reconnect
- Earbud disconnect during capture and during TTS; phone-mic fallback
- Transcription provider timeout and restart
- MCP server restart during a session
- Duplicate and out-of-order events; agent timeout or malformed tool arguments
- Backend command expiry; loss of network during a session
- Consent revocation mid-session with a queued intervention
- Real and simulated heart-rate modes
- Data deletion and secret-leakage checks

### Acceptance gate

- The co-regulation loop survives recoverable failures without restarting the entire session.
- No failure causes repeated haptics or repeated audio playback.
- The wearer always sees whether vitals, audio, transcription, and agent access are connected.
- The audit log contains enough correlation data to trace one intervention across devices and services.
- Raw audio, API keys, and private context do not appear in logs or client bundles.

## Phase 10: deploy and freeze the demo path

### Build

- Deploy the NitroStack MCP server to the required public NitroStack URL; verify with NitroStudio and the actual demo agent host.
- Deploy the session backend and agent host; configure production secrets outside source control.
- Prepare the demo script around the two wow moments:
  1. **The closed biometric loop, live.** Heart rate climbs past ~110 on screen → the watch buzzes → a whispered line lands → the curve visibly bends downward, captioned "No human intervened."
  2. **Interrogate the MCP.** Ask "why did you buzz me at 0:14?" and get an answer citing the spike and the transcript moment.
- Prepare a seeded session context and a simulated heart-rate sequence that mirrors the live demo exactly.
- Record a backup video showing the complete MCP tool chain and physical feedback.
- Document external libraries, APIs, permissions, and data handling.
- Disable unfinished experimental features (including the copilot if it has not passed its gate) in the demo build.

### Final acceptance gate

- The public MCP deployment is reachable and exposes tools, resources, and prompts.
- The live co-regulation loop completes on the real watch and earbuds; the heart-rate flow works with real sensors or the clearly labelled simulator.
- The audit interrogation works live.
- The report shows the HR-synced scrubber with transcript, vitals, and interventions aligned.
- A backup video and deterministic fallback path are ready.
- No code changes after the demo build is frozen unless they fix a submission-blocking failure, and then the entire demo path is revalidated.

# MCP surface summary

All built with the NitroStack MCP server SDK; every primitive tested in NitroStudio before an agent connects.

### Resources

- `session://current/vitals` — latest BPM, availability, freshness, short rolling window (Phase 3)
- `session://current/stress` — derived stress state with evidence (Phase 3)
- `session://current/context` (Phase 4)
- `session://current/transcript` (Phase 4)
- `session://current/speech-metrics` (Phase 4)
- `session://{sessionId}/report` (Phase 5)
- `session://current/audit` (Phase 7)
- `device://watch/status`, `device://audio/status`

### Tools

- `get_transcript_window` — read-only, parameterized (Phase 4)
- `generate_session_report` — read-only (Phase 5)
- `haptic_nudge` — side-effecting, consent scope `act:haptic` (Phase 6)
- `whisper_coach` — side-effecting, consent scope `act:audio` (Phase 6)
- `query_audit_log` — read-only (Phase 7)

### Prompts

- `co_regulate` — perceive sustained stress, decide from context, intervene minimally (Phase 6)
- `explain_intervention` — answer "why did you do that?" from the audit log (Phase 7)
- `review_session` — walk the HR-synced report (Phase 5)
- `conversation_copilot` — on-demand advice (Phase 8, nice-to-have)

# Feature flags and fallbacks

- `VITALS_SOURCE=watch|simulated`
- `AUDIO_INPUT=earbuds|phone`
- `TRANSCRIPTION_MODE=cloud|on_device|fixture`
- `DEVICE_ACTIONS=real|simulated`
- `COPILOT_ENABLED=false` (default off until Phase 8 passes)
- `STORE_RAW_AUDIO=false`

Every fallback combination used in the demo must be tested end to end beforehand. A fallback that has never run end to end is not a fallback.

# Observability requirements

Every intervention should produce a trace containing:

1. Source signal (sustained heart-rate elevation, or copilot tap)
2. Session and correlation IDs
3. MCP resources read (as audit entries)
4. Model decision summary
5. MCP tool selected and validated arguments
6. Device command dispatch
7. Playback or haptic acknowledgement
8. Resulting heart-rate samples

The audit log is the primary observability surface — it doubles as the judges' proof that the agent acted through MCP rather than hidden application functions. Expose a simple debug timeline on the phone or backend dashboard.

# Security and privacy requirements

- Require explicit recording consent before a session begins; show an ongoing microphone notification while recording.
- Consent scopes are granted and revoked only through the wearer's phone UI, never through MCP; revocation takes effect immediately.
- Scope all MCP reads and actions to the active, authorized session.
- Keep provider and model credentials on the backend; encrypt network traffic.
- Do not store raw audio unless the wearer explicitly opts in; allow full session deletion.
- Avoid medical language in the UI and generated reports.
- Treat session context, participant information, and transcripts as private data.

# Reference documentation

- Wear OS Health Services: https://developer.android.com/health-and-fitness/health-services
- Health Services simulated data: https://developer.android.com/health-and-fitness/health-services/simulated-data
- Wearable Data Layer overview: https://developer.android.com/training/wearables/data/overview
- Wearable data items: https://developer.android.com/training/wearables/data/data-items
- Android haptics APIs: https://developer.android.com/develop/ui/views/haptics/haptics-apis
- Android AudioManager: https://developer.android.com/reference/android/media/AudioManager
- BLE Audio recording: https://developer.android.com/develop/connectivity/bluetooth/ble-audio/audio-recording
- Android audio focus: https://developer.android.com/media/optimize/audio-focus
- Android TextToSpeech: https://developer.android.com/reference/android/speech/tts/TextToSpeech
- Android microphone foreground services: https://developer.android.com/develop/background-work/services/fgs/service-types
- NitroStack tools: https://docs.nitrostack.ai/sdk/typescript/tools
- NitroStack resources: https://docs.nitrostack.ai/sdk/typescript/resources
- NitroStack prompts: https://docs.nitrostack.ai/sdk/typescript/prompts
- NitroStack events: https://docs.nitrostack.ai/sdk/typescript/events
- NitroStack Studio testing: https://docs.nitrostack.ai/studio/testing
- NitroStack deployment: https://docs.nitrostack.ai/deployment/cloud
- MCP server guide: https://modelcontextprotocol.io/docs/develop/build-server
- MCP debugging guide: https://modelcontextprotocol.io/docs/tools/debugging
- Deepgram streaming speech-to-text: https://developers.deepgram.com/reference/speech-to-text/listen-streaming
- Deepgram diarization: https://developers.deepgram.com/docs/diarization
