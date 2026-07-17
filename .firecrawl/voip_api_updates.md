[Skip to main content](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates#main-content)

[![Android Developers](https://www.gstatic.com/devrel-devsite/prod/v7669de8735de7fa899c49c793af6b01f3bfef3435bb66621d079ef252c528b54/android/images/lockup.png)](https://developer.android.com/)

`/`

Language

- [English](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates)
- [Deutsch](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=de)
- [Español – América Latina](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=es-419)
- [Français](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=fr)
- [Indonesia](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=id)
- [Italiano](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=it)
- [Polski](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=pl)
- [Português – Brasil](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=pt-br)
- [Tiếng Việt](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=vi)
- [Türkçe](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=tr)
- [Русский](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=ru)
- [עברית](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=he)
- [العربيّة](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=ar)
- [فارسی](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=fa)
- [हिंदी](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=hi)
- [বাংলা](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=bn)
- [ภาษาไทย](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=th)
- [中文 – 简体](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=zh-cn)
- [中文 – 繁體](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=zh-tw)
- [日本語](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=ja)
- [한국어](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates?hl=ko)

[Android Studio](https://developer.android.com/studio)

[Sign in](https://developer.android.com/_d/signin?continue=https%3A%2F%2Fdeveloper.android.com%2Fdevelop%2Fconnectivity%2Ftelecom%2Fvoip-app%2Fapi-updates&prompt=select_account)

- [Develop](https://developer.android.com/develop)
- [Core areas](https://developer.android.com/develop/core-areas)
- [Connectivity](https://developer.android.com/develop/connectivity)

- On this page
- [Behavior change in Android 14](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates#behavior_change_in_android_14)
- [Rationale for the change](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates#rationale_for_the_change)
- [Key changes in Android 14](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates#key_changes_in_android_14)
- [Required developer actions](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates#required_developer_actions)
- [Deprecated APIs and their replacements](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates#deprecated_apis_and_their_replacements)

- [Android Developers](https://developer.android.com/)
- [Develop](https://developer.android.com/develop)
- [Core areas](https://developer.android.com/develop/core-areas)
- [Connectivity](https://developer.android.com/develop/connectivity)
- [Guides](https://developer.android.com/develop/connectivity/overview)

Was this helpful?

# Audio routing API updates in Android 14 for VoIP apps    Stay organized with collections      Save and categorize content based on your preferences.

- On this page
- [Behavior change in Android 14](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates#behavior_change_in_android_14)
- [Rationale for the change](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates#rationale_for_the_change)
- [Key changes in Android 14](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates#key_changes_in_android_14)
- [Required developer actions](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates#required_developer_actions)
- [Deprecated APIs and their replacements](https://developer.android.com/develop/connectivity/telecom/voip-app/api-updates#deprecated_apis_and_their_replacements)

Android 14 introduced API updates accompanied by user experience changes to
audio routing behavior for Bluetooth LE Audio (LEA) devices, including hearing
aids. These changes impacted how VoIP apps manage audio output selection. This
document provides essential information for developers to adapt their VoIP apps
to these changes and ensure a seamless user experience.

## Behavior change in Android 14

- **LEA device routing:** LEA devices are now enabled by default on Pixel phones
and AOSP. However, to actively recognize and select LEA devices as audio output,
apps must use the new APIs introduced in API level 31.
- **Hearing aid routing:** Previously, audio would always default to hearing
aids, even if the user explicitly selected the earpiece. In Android 14, hearing
aids are now presented as one of the available audio output options, requiring
explicit selection by the user.

## Rationale for the change

- Prior to Android 12, there was no API to explicitly use hearing aids for
calls, leading to audio always defaulting to hearing aids when connected.
- This made it difficult for users to switch from hearing aids to earpieces
without disconnecting their hearing aids.
- The same issue applied to Bluetooth LE Audio headsets.

To address these challenges, Android 14 introduced changes to provide VoIP apps
with more control over audio routing and ensure consistent behavior across
Bluetooth accessories.

## Key changes in Android 14

- **Generic APIs for route selection:** Android 12 introduced [`AudioManager.setCommunicationDevice`](https://developer.android.com/develop/connectivity/telecom/voip-app/reference/android/media/AudioManager#getCommunicationDevice())
to allow apps to specify audio routes, including hearing aids and LEA devices.
However, in Android 12 and 13, hearing aids were not visible as devices,
limiting the usefulness of this API.
- **Hearing aid visibility:** In Android 14, hearing aids are now visible as
devices, enabling apps to provide UI elements for users to select their
preferred audio output.
- **API Deprecations:** Several APIs related to audio routing have been
deprecated in Android 14. Developers must migrate to the new APIs introduced in
API level 31 to manage audio output selection effectively.

## Required developer actions

- **Highly Recommended:** Migrate to [Telecom Jetpack Library](https://developer.android.com/develop/connectivity/telecom/voip-app/telecom). If possible,
migrate your VoIP app to the Telecom Jetpack library for streamlined audio
routing management.
- Use [`setCommunicationDevice()`](https://developer.android.com/reference/android/media/AudioManager#getCommunicationDevice()) or the latest APIs (listed below) if
migration is not feasible.

## Deprecated APIs and their replacements

| Deprecated in Android 14 | New APIs |
| --- | --- |
| [AudioManager.isBluetoothScoOn()](https://developer.android.com/reference/android/media/AudioManager#isBluetoothScoOn()) | [AudioManager.getCommunicationDevice()](https://developer.android.com/reference/android/media/AudioManager#getCommunicationDevice()) |
| [AudioManager.isSpeakerphoneOn()](https://developer.android.com/reference/android/media/AudioManager#isSpeakerphoneOn()) |
| [AudioManager.setSpeakerphoneOn()](https://developer.android.com/reference/android/media/AudioManager#setSpeakerphoneOn(boolean)) | [AudioManager.setCommunicationDevice()](https://developer.android.com/reference/android/media/AudioManager#setCommunicationDevice(android.media.AudioDeviceInfo)) |
| [AudioManager.startBluetoothSco()](https://developer.android.com/reference/android/media/AudioManager#startBluetoothSco()) |
| [AudioManager.stopBluetoothSco()](https://developer.android.com/reference/android/media/AudioManager#stopBluetoothSco()) | [AudioManager.clearCommunicationDevice()](https://developer.android.com/reference/android/media/AudioManager#clearCommunicationDevice()) |
| [Connection.getCallAudioState()](https://developer.android.com/reference/android/telecom/Connection#getCallAudioState()) | **Jetpack:**<br>[CallControlScope.getAvailableEndpoints()](https://developer.android.com/reference/androidx/core/telecom/CallControlScope#getAvailableEndpoints())<br>[CallControlScope.getCurrentCallEndpoint()](https://developer.android.com/reference/androidx/core/telecom/CallControlScope#getCurrentCallEndpoint())<br>[CallControlScope#isMuted()](https://developer.android.com/reference/androidx/core/telecom/CallControlScope#getIsMuted())<br>**Platform:**<br>[CallEventCallback.onAvailableCallEndpointsChanged()](https://developer.android.com/reference/android/telecom/CallEventCallback#onAvailableCallEndpointsChanged(java.util.List%3Candroid.telecom.CallEndpoint%3E))<br>[CallEventCallback.onCallEndpointChanged()](https://developer.android.com/reference/android/telecom/CallEventCallback#onCallEndpointChanged(android.telecom.CallEndpoint))<br>[CallEventCallback.onMuteStateChanged()](https://developer.android.com/reference/android/telecom/CallEventCallback#onMuteStateChanged(boolean)) |
| [Connection.onCallAudioStateChanged()](https://developer.android.com/reference/android/telecom/Connection#onCallAudioStateChanged(android.telecom.CallAudioState)) |
| [Connection.requestBluetoothAudio()](https://developer.android.com/reference/android/telecom/Connection#requestBluetoothAudio()) | **Jetpack:**<br>[CallControlScope#requestEndpointChange()](https://developer.android.com/reference/androidx/core/telecom/CallControlScope#requestEndpointChange(androidx.core.telecom.CallEndpointCompat))<br>**Platform:**<br>[CallControl#requestCallEndpointChange()](https://developer.android.com/reference/android/telecom/CallControl#requestCallEndpointChange(android.telecom.CallEndpoint,%20java.util.concurrent.Executor,%20android.os.OutcomeReceiver%3Cjava.lang.Void,android.telecom.CallException%3E)) |
| [Connection.setAudioRoute()](https://developer.android.com/reference/android/telecom/Connection#setAudioRoute(int)) |

Was this helpful?

Content and code samples on this page are subject to the licenses described in the [Content License](https://developer.android.com/license). Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates.

Last updated 2026-02-26 UTC.




\[\[\["Easy to understand","easyToUnderstand","thumb-up"\],\["Solved my problem","solvedMyProblem","thumb-up"\],\["Other","otherUp","thumb-up"\]\],\[\["Missing the information I need","missingTheInformationINeed","thumb-down"\],\["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"\],\["Out of date","outOfDate","thumb-down"\],\["Samples / code issue","samplesCodeIssue","thumb-down"\],\["Other","otherDown","thumb-down"\]\],\["Last updated 2026-02-26 UTC."\],\[\],\[\]\]