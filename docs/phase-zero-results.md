# Phase 0 hardware results

Test date: Not run

Devices:

- Watch model / Wear OS version: Not recorded
- Phone model / Android version: Not recorded
- Earbuds model / firmware: Not recorded

| Probe | Required evidence | Result |
| --- | --- | --- |
| Real heart rate | BPM and phone timestamp | Not run |
| Phone-to-watch haptic | One observed two-pulse vibration | Not run |
| Earbud microphone | Intelligible recorded speech | Not run |
| Earbud TTS | Private audible message | Not run |
| Capture after TTS | Final transcript after playback | Not run |
| Deepgram streaming | One final transcript | Not run |
| NitroStudio | `phase_zero_probe` response | Not run |
| Deployment access | Account/project deployment mechanism confirmed | Not run |

## Selected Paths

- Heart rate: Undecided. Select `real` only after repeated timestamped readings reach the phone; otherwise select the official Health Services simulator and visibly label all readings simulated.
- Audio input: Undecided. Select `earbuds` only when the route name appears and recordings are consistently intelligible; otherwise select the phone microphone while retaining earbud TTS output.
- Transcription: Undecided. Select `cloud` after a final Deepgram result; otherwise use Android on-device recognition for short segments and make no diarization claim.

Phase 1 must not begin until these three entries are decided from tests on the demo hardware.
