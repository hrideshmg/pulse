# Phase 0 hardware results

Test date: 2026-07-17

Devices:

- Watch model / Wear OS version: Accepted manually; exact model/version not recorded in repo
- Phone model / Android version: Accepted manually; exact model/version not recorded in repo
- Earbuds model / firmware: Accepted manually; exact model/firmware not recorded in repo

| Probe | Required evidence | Result |
| --- | --- | --- |
| Real heart rate | BPM and phone timestamp | Passed by manual acceptance gate |
| Phone-to-watch haptic | One observed two-pulse vibration | Passed by manual acceptance gate |
| Earbud microphone | Intelligible recorded speech | Passed by manual acceptance gate |
| Earbud TTS | Private audible message | Passed by manual acceptance gate |
| Capture after TTS | Final transcript after playback | Passed by manual acceptance gate |
| Deepgram streaming | One final transcript | Passed by manual acceptance gate |
| NitroStudio | `phase_zero_probe` response | Passed by manual acceptance gate |
| Deployment access | Account/project deployment mechanism confirmed | Passed by manual acceptance gate |

## Selected Paths

- Heart rate: `real` watch capture accepted for the demo path.
- Audio input: `earbuds` accepted for the demo path.
- Transcription: `cloud` accepted for the demo path.

The Phase 0 gate is accepted based on the user's manual device test on 2026-07-17. Detailed device metadata and raw screenshots/logs were not recorded in this repository.
