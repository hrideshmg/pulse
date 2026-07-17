[Skip to main content](https://developer.android.com/reference/android/speech/RecognitionListener#main-content)

[![Android Developers](https://www.gstatic.com/devrel-devsite/prod/v7669de8735de7fa899c49c793af6b01f3bfef3435bb66621d079ef252c528b54/android/images/lockup.png)](https://developer.android.com/)

`/`

- English
- Deutsch
- Español – América Latina
- Français
- Indonesia
- Polski
- Português – Brasil
- Tiếng Việt
- 中文 – 简体
- 日本語
- 한국어

[Android Studio](https://developer.android.com/studio)Sign in

- [API reference](https://developer.android.com/reference)

- [Android Developers](https://developer.android.com/)
- [Develop](https://developer.android.com/develop)
- [API reference](https://developer.android.com/reference)


 Stay organized with collections


 Save and categorize content based on your preferences.



Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

# RecognitionListener

* * *

[Kotlin](https://developer.android.com/reference/kotlin/android/speech/RecognitionListener "View this page in Kotlin") \|Java

`
public

interface
RecognitionListener
`

`

`

|     |
| --- |
| android.speech.RecognitionListener |

* * *

Used for receiving notifications from the SpeechRecognizer when the
recognition related events occur. All the callbacks are executed on the
Application main thread.

## Summary

| ### Public methods |
| --- |
| `<br>        abstract<br>        void` | `<br>      onBeginningOfSpeech()<br>`<br>The user has started to speak. |
| `<br>        abstract<br>        void` | `<br>      onBufferReceived(byte[] buffer)<br>`<br>More sound has been received. |
| `<br>        default<br>        void` | `<br>      onEndOfSegmentedSession()<br>`<br>Called at the end of a segmented recognition request. |
| `<br>        abstract<br>        void` | `<br>      onEndOfSpeech()<br>`<br>Called after the user stops speaking. |
| `<br>        abstract<br>        void` | `<br>      onError(int error)<br>`<br>A network or recognition error occurred. |
| `<br>        abstract<br>        void` | `<br>      onEvent(int eventType, Bundle params)<br>`<br>Reserved for adding future events. |
| `<br>        default<br>        void` | `<br>      onLanguageDetection(Bundle results)<br>`<br>Called when the language detection (and switching) results are available. |
| `<br>        abstract<br>        void` | `<br>      onPartialResults(Bundle partialResults)<br>`<br>Called when partial recognition results are available. |
| `<br>        abstract<br>        void` | `<br>      onReadyForSpeech(Bundle params)<br>`<br>Called when the endpointer is ready for the user to start speaking. |
| `<br>        abstract<br>        void` | `<br>      onResults(Bundle results)<br>`<br>Called when recognition results are ready. |
| `<br>        abstract<br>        void` | `<br>      onRmsChanged(float rmsdB)<br>`<br>The sound level in the audio stream has changed. |
| `<br>        default<br>        void` | `<br>      onSegmentResults(Bundle segmentResults)<br>`<br>Called for each ready segment of a recognition request. |

## Public methods

### onBeginningOfSpeech

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public abstract void onBeginningOfSpeech ()
```

The user has started to speak.

### onBufferReceived

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public abstract void onBufferReceived (byte[] buffer)
```

More sound has been received. The purpose of this function is to allow giving feedback to the
user regarding the captured audio. There is no guarantee that this method will be called.

| Parameters |
| --- |
| `buffer` | `byte`: a buffer containing a sequence of big-endian 16-bit integers representing a<br> single channel audio stream. The sample rate is implementation dependent. |

### onEndOfSegmentedSession

Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public void onEndOfSegmentedSession ()
```

Called at the end of a segmented recognition request. To request segmented speech results
use `RecognizerIntent.EXTRA_SEGMENTED_SESSION`.

### onEndOfSpeech

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public abstract void onEndOfSpeech ()
```

Called after the user stops speaking.

### onError

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public abstract void onError (int error)
```

A network or recognition error occurred.

| Parameters |
| --- |
| `error` | `int`: code is defined in `SpeechRecognizer`. Implementations need to handle any<br> integer error constant to be passed here beyond constants prefixed with ERROR\_.<br> <br> Value is one of the following:<br> <br>- `SpeechRecognizer.ERROR_NETWORK_TIMEOUT`<br>- `SpeechRecognizer.ERROR_NETWORK`<br>- `SpeechRecognizer.ERROR_AUDIO`<br>- `SpeechRecognizer.ERROR_SERVER`<br>- `SpeechRecognizer.ERROR_CLIENT`<br>- `SpeechRecognizer.ERROR_SPEECH_TIMEOUT`<br>- `SpeechRecognizer.ERROR_NO_MATCH`<br>- `SpeechRecognizer.ERROR_RECOGNIZER_BUSY`<br>- `SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS`<br>- `SpeechRecognizer.ERROR_TOO_MANY_REQUESTS`<br>- `SpeechRecognizer.ERROR_SERVER_DISCONNECTED`<br>- `SpeechRecognizer.ERROR_LANGUAGE_NOT_SUPPORTED`<br>- `SpeechRecognizer.ERROR_LANGUAGE_UNAVAILABLE`<br>- `SpeechRecognizer.ERROR_CANNOT_CHECK_SUPPORT`<br>- `SpeechRecognizer.ERROR_CANNOT_LISTEN_TO_DOWNLOAD_EVENTS` |

### onEvent

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public abstract void onEvent (int eventType,
                Bundle params)
```

Reserved for adding future events.

| Parameters |
| --- |
| `eventType` | `int`: the type of the occurred event |
| `params` | `Bundle`: a Bundle containing the passed parameters |

### onLanguageDetection

Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public void onLanguageDetection (Bundle results)
```

Called when the language detection (and switching) results are available. This callback
can be invoked on any number of occasions at any time between `onBeginningOfSpeech()`
and `onEndOfSpeech()`, depending on the speech recognition service implementation.



To request language detection,
use `RecognizerIntent.EXTRA_ENABLE_LANGUAGE_DETECTION`.


To request automatic language switching,
use `RecognizerIntent.EXTRA_ENABLE_LANGUAGE_SWITCH`.

| Parameters |
| --- |
| `results` | `Bundle`: the returned language detection (and switching) results.<br> <br>To retrieve the most confidently detected language IETF tag<br>(as defined by BCP 47, e.g., "en-US", "de-DE"),<br>use `Bundle.getString(String)`<br>with `SpeechRecognizer.DETECTED_LANGUAGE` as the parameter.<br> <br>To retrieve the language detection confidence level represented by a value<br>prefixed by `LANGUAGE_DETECTION_CONFIDENCE_LEVEL_` and<br>defined in `SpeechRecognizer`, use `Bundle.getInt(String)`<br>with `SpeechRecognizer.LANGUAGE_DETECTION_CONFIDENCE_LEVEL` as the parameter.<br> <br>To retrieve the alternative locales for the same language<br>retrieved by the key `SpeechRecognizer.DETECTED_LANGUAGE`,<br>use `Bundle.getStringArrayList(String)`<br>with `SpeechRecognizer.TOP_LOCALE_ALTERNATIVES` as the parameter.<br> <br>To retrieve the language switching results represented by a value<br>prefixed by `LANGUAGE_SWITCH_RESULT_` and defined in `SpeechRecognizer`,<br>use `Bundle.getInt(String)`<br>with `SpeechRecognizer.LANGUAGE_SWITCH_RESULT` as the parameter.<br> <br>This value cannot be `null`. |

### onPartialResults

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public abstract void onPartialResults (Bundle partialResults)
```

Called when partial recognition results are available. The callback might be called at any
time between `onBeginningOfSpeech()` and `onResults(Bundle)` when partial
results are ready. This method may be called zero, one or multiple times for each call to
`SpeechRecognizer.startListening(Intent)`, depending on the speech recognition
service implementation. To request partial results, use
`RecognizerIntent.EXTRA_PARTIAL_RESULTS`

| Parameters |
| --- |
| `partialResults` | `Bundle`: the returned results. To retrieve the results in<br> ArrayList<String> format use `Bundle.getStringArrayList(String)` with<br> `SpeechRecognizer.RESULTS_RECOGNITION` as a parameter |

### onReadyForSpeech

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public abstract void onReadyForSpeech (Bundle params)
```

Called when the endpointer is ready for the user to start speaking.

| Parameters |
| --- |
| `params` | `Bundle`: parameters set by the recognition service. Reserved for future use. |

### onResults

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public abstract void onResults (Bundle results)
```

Called when recognition results are ready.



Called with the results for the full speech since `onReadyForSpeech(Bundle)`.
To get recognition results in segments rather than for the full session see
`RecognizerIntent.EXTRA_SEGMENTED_SESSION`.


| Parameters |
| --- |
| `results` | `Bundle`: the recognition results. To retrieve the results in `ArrayList<String>` format use `Bundle.getStringArrayList(String)` with<br> `SpeechRecognizer.RESULTS_RECOGNITION` as a parameter. A float array of<br> confidence values might also be given in `SpeechRecognizer.CONFIDENCE_SCORES`. |

### onRmsChanged

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public abstract void onRmsChanged (float rmsdB)
```

The sound level in the audio stream has changed. There is no guarantee that this method will
be called.

| Parameters |
| --- |
| `rmsdB` | `float`: the new RMS dB value |

### onSegmentResults

Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public void onSegmentResults (Bundle segmentResults)
```

Called for each ready segment of a recognition request. To request segmented speech results
use `RecognizerIntent.EXTRA_SEGMENTED_SESSION`. The callback might be called
any number of times between `onReadyForSpeech(Bundle)` and
`onEndOfSegmentedSession()`.

| Parameters |
| --- |
| `segmentResults` | `Bundle`: the returned results. To retrieve the results in<br> ArrayList<String> format use `Bundle.getStringArrayList(String)` with<br> `SpeechRecognizer.RESULTS_RECOGNITION` as a parameter.<br> <br> This value cannot be `null`. |

Content and code samples on this page are subject to the licenses described in the [Content License](https://developer.android.com/license). Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates.

Last updated 2026-02-26 UTC.




\[\[\["Easy to understand","easyToUnderstand","thumb-up"\],\["Solved my problem","solvedMyProblem","thumb-up"\],\["Other","otherUp","thumb-up"\]\],\[\["Missing the information I need","missingTheInformationINeed","thumb-down"\],\["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"\],\["Out of date","outOfDate","thumb-down"\],\["Samples / code issue","samplesCodeIssue","thumb-down"\],\["Other","otherDown","thumb-down"\]\],\["Last updated 2026-02-26 UTC."\],\[\],\[\]\]