[Skip to main content](https://developer.android.com/reference/android/speech/SpeechRecognizer#main-content)

[![Android Developers](https://www.gstatic.com/devrel-devsite/prod/v7669de8735de7fa899c49c793af6b01f3bfef3435bb66621d079ef252c528b54/android/images/lockup.png)](https://developer.android.com/)

`/`

Language

- [English](https://developer.android.com/reference/android/speech/SpeechRecognizer)
- [Deutsch](https://developer.android.com/reference/android/speech/SpeechRecognizer?hl=de)
- [Español – América Latina](https://developer.android.com/reference/android/speech/SpeechRecognizer?hl=es-419)
- [Français](https://developer.android.com/reference/android/speech/SpeechRecognizer?hl=fr)
- [Indonesia](https://developer.android.com/reference/android/speech/SpeechRecognizer?hl=id)
- [Polski](https://developer.android.com/reference/android/speech/SpeechRecognizer?hl=pl)
- [Português – Brasil](https://developer.android.com/reference/android/speech/SpeechRecognizer?hl=pt-br)
- [Tiếng Việt](https://developer.android.com/reference/android/speech/SpeechRecognizer?hl=vi)
- [中文 – 简体](https://developer.android.com/reference/android/speech/SpeechRecognizer?hl=zh-cn)
- [日本語](https://developer.android.com/reference/android/speech/SpeechRecognizer?hl=ja)
- [한국어](https://developer.android.com/reference/android/speech/SpeechRecognizer?hl=ko)

[Android Studio](https://developer.android.com/studio)

[Sign in](https://developer.android.com/_d/signin?continue=https%3A%2F%2Fdeveloper.android.com%2Freference%2Fandroid%2Fspeech%2FSpeechRecognizer&prompt=select_account)

- [API reference](https://developer.android.com/reference)

- On this page
- [Summary](https://developer.android.com/reference/android/speech/SpeechRecognizer#summary)
  - [Constants](https://developer.android.com/reference/android/speech/SpeechRecognizer#constants)
  - [Public methods](https://developer.android.com/reference/android/speech/SpeechRecognizer#public-methods)
  - [Inherited methods](https://developer.android.com/reference/android/speech/SpeechRecognizer#inherited-methods)
- [Constants](https://developer.android.com/reference/android/speech/SpeechRecognizer#constants_1)
  - [CONFIDENCE\_SCORES](https://developer.android.com/reference/android/speech/SpeechRecognizer#CONFIDENCE_SCORES)
  - [DETECTED\_LANGUAGE](https://developer.android.com/reference/android/speech/SpeechRecognizer#DETECTED_LANGUAGE)
  - [ERROR\_AUDIO](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_AUDIO)
  - [ERROR\_CANNOT\_CHECK\_SUPPORT](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_CANNOT_CHECK_SUPPORT)
  - [ERROR\_CANNOT\_LISTEN\_TO\_DOWNLOAD\_EVENTS](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_CANNOT_LISTEN_TO_DOWNLOAD_EVENTS)
  - [ERROR\_CLIENT](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_CLIENT)
  - [ERROR\_INSUFFICIENT\_PERMISSIONS](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_INSUFFICIENT_PERMISSIONS)
  - [ERROR\_LANGUAGE\_NOT\_SUPPORTED](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_LANGUAGE_NOT_SUPPORTED)
  - [ERROR\_LANGUAGE\_UNAVAILABLE](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_LANGUAGE_UNAVAILABLE)
  - [ERROR\_NETWORK](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_NETWORK)
  - [ERROR\_NETWORK\_TIMEOUT](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_NETWORK_TIMEOUT)
  - [ERROR\_NO\_MATCH](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_NO_MATCH)
  - [ERROR\_RECOGNIZER\_BUSY](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_RECOGNIZER_BUSY)
  - [ERROR\_SERVER](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_SERVER)
  - [ERROR\_SERVER\_DISCONNECTED](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_SERVER_DISCONNECTED)
  - [ERROR\_SPEECH\_TIMEOUT](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_SPEECH_TIMEOUT)
  - [ERROR\_TOO\_MANY\_REQUESTS](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_TOO_MANY_REQUESTS)
  - [LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_DETECTION_CONFIDENCE_LEVEL)
  - [LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL\_CONFIDENT](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_DETECTION_CONFIDENCE_LEVEL_CONFIDENT)
  - [LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL\_HIGHLY\_CONFIDENT](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_DETECTION_CONFIDENCE_LEVEL_HIGHLY_CONFIDENT)
  - [LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL\_NOT\_CONFIDENT](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_DETECTION_CONFIDENCE_LEVEL_NOT_CONFIDENT)
  - [LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL\_UNKNOWN](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_DETECTION_CONFIDENCE_LEVEL_UNKNOWN)
  - [LANGUAGE\_SWITCH\_RESULT](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_SWITCH_RESULT)
  - [LANGUAGE\_SWITCH\_RESULT\_FAILED](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_SWITCH_RESULT_FAILED)
  - [LANGUAGE\_SWITCH\_RESULT\_NOT\_ATTEMPTED](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_SWITCH_RESULT_NOT_ATTEMPTED)
  - [LANGUAGE\_SWITCH\_RESULT\_SKIPPED\_NO\_MODEL](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_SWITCH_RESULT_SKIPPED_NO_MODEL)
  - [LANGUAGE\_SWITCH\_RESULT\_SUCCEEDED](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_SWITCH_RESULT_SUCCEEDED)
  - [RECOGNITION\_PARTS](https://developer.android.com/reference/android/speech/SpeechRecognizer#RECOGNITION_PARTS)
  - [RESULTS\_ALTERNATIVES](https://developer.android.com/reference/android/speech/SpeechRecognizer#RESULTS_ALTERNATIVES)
  - [RESULTS\_RECOGNITION](https://developer.android.com/reference/android/speech/SpeechRecognizer#RESULTS_RECOGNITION)
  - [TOP\_LOCALE\_ALTERNATIVES](https://developer.android.com/reference/android/speech/SpeechRecognizer#TOP_LOCALE_ALTERNATIVES)
- [Public methods](https://developer.android.com/reference/android/speech/SpeechRecognizer#public-methods_1)
  - [cancel](https://developer.android.com/reference/android/speech/SpeechRecognizer#cancel())
  - [checkRecognitionSupport](https://developer.android.com/reference/android/speech/SpeechRecognizer#checkRecognitionSupport(android.content.Intent,%20java.util.concurrent.Executor,%20android.speech.RecognitionSupportCallback))
  - [createOnDeviceSpeechRecognizer](https://developer.android.com/reference/android/speech/SpeechRecognizer#createOnDeviceSpeechRecognizer(android.content.Context))
  - [createSpeechRecognizer](https://developer.android.com/reference/android/speech/SpeechRecognizer#createSpeechRecognizer(android.content.Context))
  - [createSpeechRecognizer](https://developer.android.com/reference/android/speech/SpeechRecognizer#createSpeechRecognizer(android.content.Context,%20android.content.ComponentName))
  - [destroy](https://developer.android.com/reference/android/speech/SpeechRecognizer#destroy())
  - [isOnDeviceRecognitionAvailable](https://developer.android.com/reference/android/speech/SpeechRecognizer#isOnDeviceRecognitionAvailable(android.content.Context))
  - [isRecognitionAvailable](https://developer.android.com/reference/android/speech/SpeechRecognizer#isRecognitionAvailable(android.content.Context))
  - [setRecognitionListener](https://developer.android.com/reference/android/speech/SpeechRecognizer#setRecognitionListener(android.speech.RecognitionListener))
  - [startListening](https://developer.android.com/reference/android/speech/SpeechRecognizer#startListening(android.content.Intent))
  - [stopListening](https://developer.android.com/reference/android/speech/SpeechRecognizer#stopListening())
  - [triggerModelDownload](https://developer.android.com/reference/android/speech/SpeechRecognizer#triggerModelDownload(android.content.Intent))
  - [triggerModelDownload](https://developer.android.com/reference/android/speech/SpeechRecognizer#triggerModelDownload(android.content.Intent,%20java.util.concurrent.Executor,%20android.speech.ModelDownloadListener))

- [Android Developers](https://developer.android.com/)
- [Develop](https://developer.android.com/develop)
- [API reference](https://developer.android.com/reference)

Was this helpful?

- On this page
- [Summary](https://developer.android.com/reference/android/speech/SpeechRecognizer#summary)
  - [Constants](https://developer.android.com/reference/android/speech/SpeechRecognizer#constants)
  - [Public methods](https://developer.android.com/reference/android/speech/SpeechRecognizer#public-methods)
  - [Inherited methods](https://developer.android.com/reference/android/speech/SpeechRecognizer#inherited-methods)
- [Constants](https://developer.android.com/reference/android/speech/SpeechRecognizer#constants_1)
  - [CONFIDENCE\_SCORES](https://developer.android.com/reference/android/speech/SpeechRecognizer#CONFIDENCE_SCORES)
  - [DETECTED\_LANGUAGE](https://developer.android.com/reference/android/speech/SpeechRecognizer#DETECTED_LANGUAGE)
  - [ERROR\_AUDIO](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_AUDIO)
  - [ERROR\_CANNOT\_CHECK\_SUPPORT](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_CANNOT_CHECK_SUPPORT)
  - [ERROR\_CANNOT\_LISTEN\_TO\_DOWNLOAD\_EVENTS](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_CANNOT_LISTEN_TO_DOWNLOAD_EVENTS)
  - [ERROR\_CLIENT](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_CLIENT)
  - [ERROR\_INSUFFICIENT\_PERMISSIONS](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_INSUFFICIENT_PERMISSIONS)
  - [ERROR\_LANGUAGE\_NOT\_SUPPORTED](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_LANGUAGE_NOT_SUPPORTED)
  - [ERROR\_LANGUAGE\_UNAVAILABLE](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_LANGUAGE_UNAVAILABLE)
  - [ERROR\_NETWORK](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_NETWORK)
  - [ERROR\_NETWORK\_TIMEOUT](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_NETWORK_TIMEOUT)
  - [ERROR\_NO\_MATCH](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_NO_MATCH)
  - [ERROR\_RECOGNIZER\_BUSY](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_RECOGNIZER_BUSY)
  - [ERROR\_SERVER](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_SERVER)
  - [ERROR\_SERVER\_DISCONNECTED](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_SERVER_DISCONNECTED)
  - [ERROR\_SPEECH\_TIMEOUT](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_SPEECH_TIMEOUT)
  - [ERROR\_TOO\_MANY\_REQUESTS](https://developer.android.com/reference/android/speech/SpeechRecognizer#ERROR_TOO_MANY_REQUESTS)
  - [LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_DETECTION_CONFIDENCE_LEVEL)
  - [LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL\_CONFIDENT](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_DETECTION_CONFIDENCE_LEVEL_CONFIDENT)
  - [LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL\_HIGHLY\_CONFIDENT](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_DETECTION_CONFIDENCE_LEVEL_HIGHLY_CONFIDENT)
  - [LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL\_NOT\_CONFIDENT](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_DETECTION_CONFIDENCE_LEVEL_NOT_CONFIDENT)
  - [LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL\_UNKNOWN](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_DETECTION_CONFIDENCE_LEVEL_UNKNOWN)
  - [LANGUAGE\_SWITCH\_RESULT](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_SWITCH_RESULT)
  - [LANGUAGE\_SWITCH\_RESULT\_FAILED](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_SWITCH_RESULT_FAILED)
  - [LANGUAGE\_SWITCH\_RESULT\_NOT\_ATTEMPTED](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_SWITCH_RESULT_NOT_ATTEMPTED)
  - [LANGUAGE\_SWITCH\_RESULT\_SKIPPED\_NO\_MODEL](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_SWITCH_RESULT_SKIPPED_NO_MODEL)
  - [LANGUAGE\_SWITCH\_RESULT\_SUCCEEDED](https://developer.android.com/reference/android/speech/SpeechRecognizer#LANGUAGE_SWITCH_RESULT_SUCCEEDED)
  - [RECOGNITION\_PARTS](https://developer.android.com/reference/android/speech/SpeechRecognizer#RECOGNITION_PARTS)
  - [RESULTS\_ALTERNATIVES](https://developer.android.com/reference/android/speech/SpeechRecognizer#RESULTS_ALTERNATIVES)
  - [RESULTS\_RECOGNITION](https://developer.android.com/reference/android/speech/SpeechRecognizer#RESULTS_RECOGNITION)
  - [TOP\_LOCALE\_ALTERNATIVES](https://developer.android.com/reference/android/speech/SpeechRecognizer#TOP_LOCALE_ALTERNATIVES)
- [Public methods](https://developer.android.com/reference/android/speech/SpeechRecognizer#public-methods_1)
  - [cancel](https://developer.android.com/reference/android/speech/SpeechRecognizer#cancel())
  - [checkRecognitionSupport](https://developer.android.com/reference/android/speech/SpeechRecognizer#checkRecognitionSupport(android.content.Intent,%20java.util.concurrent.Executor,%20android.speech.RecognitionSupportCallback))
  - [createOnDeviceSpeechRecognizer](https://developer.android.com/reference/android/speech/SpeechRecognizer#createOnDeviceSpeechRecognizer(android.content.Context))
  - [createSpeechRecognizer](https://developer.android.com/reference/android/speech/SpeechRecognizer#createSpeechRecognizer(android.content.Context))
  - [createSpeechRecognizer](https://developer.android.com/reference/android/speech/SpeechRecognizer#createSpeechRecognizer(android.content.Context,%20android.content.ComponentName))
  - [destroy](https://developer.android.com/reference/android/speech/SpeechRecognizer#destroy())
  - [isOnDeviceRecognitionAvailable](https://developer.android.com/reference/android/speech/SpeechRecognizer#isOnDeviceRecognitionAvailable(android.content.Context))
  - [isRecognitionAvailable](https://developer.android.com/reference/android/speech/SpeechRecognizer#isRecognitionAvailable(android.content.Context))
  - [setRecognitionListener](https://developer.android.com/reference/android/speech/SpeechRecognizer#setRecognitionListener(android.speech.RecognitionListener))
  - [startListening](https://developer.android.com/reference/android/speech/SpeechRecognizer#startListening(android.content.Intent))
  - [stopListening](https://developer.android.com/reference/android/speech/SpeechRecognizer#stopListening())
  - [triggerModelDownload](https://developer.android.com/reference/android/speech/SpeechRecognizer#triggerModelDownload(android.content.Intent))
  - [triggerModelDownload](https://developer.android.com/reference/android/speech/SpeechRecognizer#triggerModelDownload(android.content.Intent,%20java.util.concurrent.Executor,%20android.speech.ModelDownloadListener))


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

Summary:

[Constants](https://developer.android.com/reference/android/speech/SpeechRecognizer#constants)


\| [Methods](https://developer.android.com/reference/android/speech/SpeechRecognizer#pubmethods)


\| [Inherited Methods](https://developer.android.com/reference/android/speech/SpeechRecognizer#inhmethods)

# SpeechRecognizer    Stay organized with collections      Save and categorize content based on your preferences.

* * *

[Kotlin](https://developer.android.com/reference/kotlin/android/speech/SpeechRecognizer "View this page in Kotlin") \|Java

`
public

class
SpeechRecognizer
`

`

    extends Object

``

`

|     |     |
| --- | --- |
| [java.lang.Object](https://developer.android.com/reference/java/lang/Object) |
| ↳ | android.speech.SpeechRecognizer |

* * *

This class provides access to the speech recognition service. This service allows access to the
speech recognizer. Do not instantiate this class directly, instead, call
`SpeechRecognizer.createSpeechRecognizer(Context)`, or
`SpeechRecognizer.createOnDeviceSpeechRecognizer(Context)`. This class's methods must be
invoked only from the main application thread.



**Important:** the caller MUST invoke `destroy()` on a
SpeechRecognizer object when it is no longer needed.



The implementation of this API is likely to stream audio to remote servers to perform speech
recognition. As such this API is not intended to be used for continuous recognition, which would
consume a significant amount of battery and bandwidth.



Please note that the application must have `Manifest.permission.RECORD_AUDIO`
permission to use this class.

## Summary

| ### Constants |
| --- |
| `String` | `CONFIDENCE_SCORES`<br>Key used to retrieve a float array from the `Bundle` passed to the<br>`RecognitionListener.onResults(Bundle)` and<br>`RecognitionListener.onPartialResults(Bundle)` methods. |
| `String` | `DETECTED_LANGUAGE`<br>Key used to retrieve a `String` representation of the IETF language tag (as defined by<br>BCP 47, e.g., "en-US", "de-DE") of the detected language of the most recent audio chunk. |
| `int` | `ERROR_AUDIO`<br>Audio recording error. |
| `int` | `ERROR_CANNOT_CHECK_SUPPORT`<br>The service does not allow to check for support. |
| `int` | `ERROR_CANNOT_LISTEN_TO_DOWNLOAD_EVENTS`<br>The service does not support listening to model downloads events. |
| `int` | `ERROR_CLIENT`<br>Other client side errors. |
| `int` | `ERROR_INSUFFICIENT_PERMISSIONS`<br>Insufficient permissions |
| `int` | `ERROR_LANGUAGE_NOT_SUPPORTED`<br>Requested language is not available to be used with the current recognizer. |
| `int` | `ERROR_LANGUAGE_UNAVAILABLE`<br>Requested language is supported, but not available currently (e.g. not downloaded yet). |
| `int` | `ERROR_NETWORK`<br>Other network related errors. |
| `int` | `ERROR_NETWORK_TIMEOUT`<br>Network operation timed out. |
| `int` | `ERROR_NO_MATCH`<br>No recognition result matched. |
| `int` | `ERROR_RECOGNIZER_BUSY`<br>RecognitionService busy. |
| `int` | `ERROR_SERVER`<br>Server sends error status. |
| `int` | `ERROR_SERVER_DISCONNECTED`<br>Server has been disconnected, e.g. because the app has crashed. |
| `int` | `ERROR_SPEECH_TIMEOUT`<br>No speech input |
| `int` | `ERROR_TOO_MANY_REQUESTS`<br>Too many requests from the same client. |
| `String` | `LANGUAGE_DETECTION_CONFIDENCE_LEVEL`<br>Key used to retrieve the level of confidence of the detected language<br>of the most recent audio chunk,<br>represented by an `int` value prefixed by `LANGUAGE_DETECTION_CONFIDENCE_LEVEL_`. |
| `int` | `LANGUAGE_DETECTION_CONFIDENCE_LEVEL_CONFIDENT` |
| `int` | `LANGUAGE_DETECTION_CONFIDENCE_LEVEL_HIGHLY_CONFIDENT` |
| `int` | `LANGUAGE_DETECTION_CONFIDENCE_LEVEL_NOT_CONFIDENT` |
| `int` | `LANGUAGE_DETECTION_CONFIDENCE_LEVEL_UNKNOWN` |
| `String` | `LANGUAGE_SWITCH_RESULT`<br>Key used to retrieve the result of the language switch of the most recent audio chunk,<br>represented by an `int` value prefixed by `LANGUAGE_SWITCH_`. |
| `int` | `LANGUAGE_SWITCH_RESULT_FAILED`<br>Switch attempted and failed. |
| `int` | `LANGUAGE_SWITCH_RESULT_NOT_ATTEMPTED`<br>Switch not attempted. |
| `int` | `LANGUAGE_SWITCH_RESULT_SKIPPED_NO_MODEL`<br>Switch skipped because the language model is missing<br>or the language is not allowlisted for auto switch. |
| `int` | `LANGUAGE_SWITCH_RESULT_SUCCEEDED`<br>Switch attempted and succeeded. |
| `String` | `RECOGNITION_PARTS`<br>Key used to receive an ArrayList<`RecognitionPart`\> object from the<br>`Bundle` passed to the `RecognitionListener.onResults(Bundle)` and<br>`RecognitionListener.onSegmentResults(Bundle)` methods. |
| `String` | `RESULTS_ALTERNATIVES`<br>Key used to retrieve an ArrayList<`AlternativeSpans`\> from the `Bundle`<br>passed to the `RecognitionListener.onResults(Bundle)` and<br>`RecognitionListener.onPartialResults(Bundle)` methods. |
| `String` | `RESULTS_RECOGNITION`<br>Key used to retrieve an `ArrayList<String>` from the `Bundle` passed to the<br>`RecognitionListener.onResults(Bundle)` and<br>`RecognitionListener.onPartialResults(Bundle)` methods. |
| `String` | `TOP_LOCALE_ALTERNATIVES`<br>Key used to retrieve an ArrayList<`String`\> containing representations of the<br>IETF language tags (as defined by BCP 47, e.g., "en-US", "en-UK") denoting the alternative<br>locales for the same language retrieved by the key `DETECTED_LANGUAGE`. |

| ### Public methods |
| --- |
| `<br>        void` | `<br>      cancel()<br>`<br>Cancels the speech recognition. |
| `<br>        void` | `<br>      checkRecognitionSupport(Intent recognizerIntent, Executor executor, RecognitionSupportCallback supportListener)<br>`<br>Checks whether `recognizerIntent` is supported by<br>`SpeechRecognizer.startListening(Intent)`. |
| `<br>        static<br>        SpeechRecognizer` | `<br>      createOnDeviceSpeechRecognizer(Context context)<br>`<br>Factory method to create a new `SpeechRecognizer`. |
| `<br>        static<br>        SpeechRecognizer` | `<br>      createSpeechRecognizer(Context context)<br>`<br>Factory method to create a new `SpeechRecognizer`. |
| `<br>        static<br>        SpeechRecognizer` | `<br>      createSpeechRecognizer(Context context, ComponentName serviceComponent)<br>`<br>Factory method to create a new `SpeechRecognizer`. |
| `<br>        void` | `<br>      destroy()<br>`<br>Destroys the `SpeechRecognizer` object. |
| `<br>        static<br>        boolean` | `<br>      isOnDeviceRecognitionAvailable(Context context)<br>`<br>Checks whether an on-device speech recognition service is available on the system. |
| `<br>        static<br>        boolean` | `<br>      isRecognitionAvailable(Context context)<br>`<br>Checks whether a speech recognition service is available on the system. |
| `<br>        void` | `<br>      setRecognitionListener(RecognitionListener listener)<br>`<br>Sets the listener that will receive all the callbacks. |
| `<br>        void` | `<br>      startListening(Intent recognizerIntent)<br>`<br>Starts listening for speech. |
| `<br>        void` | `<br>      stopListening()<br>`<br>Stops listening for speech. |
| `<br>        void` | `<br>      triggerModelDownload(Intent recognizerIntent)<br>`<br>Attempts to download the support for the given `recognizerIntent`. |
| `<br>        void` | `<br>      triggerModelDownload(Intent recognizerIntent, Executor executor, ModelDownloadListener listener)<br>`<br>Attempts to download the support for the given `recognizerIntent`. |

| ### Inherited methods |
| --- |
| From class
`

          java.lang.Object

`

|     |     |
| --- | --- |
| `<br>        Object` | `<br>      clone()<br>`<br>Creates and returns a copy of this object. |
| `<br>        boolean` | `<br>      equals(Object obj)<br>`<br>Indicates whether some other object is "equal to" this one. |
| `<br>        void` | `<br>      finalize()<br>`<br>Called by the garbage collector on an object when garbage collection<br>determines that there are no more references to the object. |
| `<br>        final<br>        Class<?>` | `<br>      getClass()<br>`<br>Returns the runtime class of this `Object`. |
| `<br>        int` | `<br>      hashCode()<br>`<br>Returns a hash code value for the object. |
| `<br>        final<br>        void` | `<br>      notify()<br>`<br>Wakes up a single thread that is waiting on this object's<br>monitor. |
| `<br>        final<br>        void` | `<br>      notifyAll()<br>`<br>Wakes up all threads that are waiting on this object's monitor. |
| `<br>        String` | `<br>      toString()<br>`<br>Returns a string representation of the object. |
| `<br>        final<br>        void` | `<br>      wait(long timeoutMillis, int nanos)<br>`<br>Causes the current thread to wait until it is awakened, typically<br>by being _notified_ or _interrupted_, or until a<br>certain amount of real time has elapsed. |
| `<br>        final<br>        void` | `<br>      wait(long timeoutMillis)<br>`<br>Causes the current thread to wait until it is awakened, typically<br>by being _notified_ or _interrupted_, or until a<br>certain amount of real time has elapsed. |
| `<br>        final<br>        void` | `<br>      wait()<br>`<br>Causes the current thread to wait until it is awakened, typically<br>by being _notified_ or _interrupted_. | |

## Constants

### CONFIDENCE\_SCORES


Added in [API level 14](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String CONFIDENCE_SCORES
```

Key used to retrieve a float array from the `Bundle` passed to the
`RecognitionListener.onResults(Bundle)` and
`RecognitionListener.onPartialResults(Bundle)` methods. The array should be
the same size as the ArrayList provided in `RESULTS_RECOGNITION`, and should contain
values ranging from 0.0 to 1.0, or -1 to represent an unavailable confidence score.


Confidence values close to 1.0 indicate high confidence (the speech recognizer is confident
that the recognition result is correct), while values close to 0.0 indicate low confidence.


This value is optional and might not be provided.

Constant Value:

"confidence\_scores"



### DETECTED\_LANGUAGE


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String DETECTED_LANGUAGE
```

Key used to retrieve a `String` representation of the IETF language tag (as defined by
BCP 47, e.g., "en-US", "de-DE") of the detected language of the most recent audio chunk.



This info is returned to the client in the `Bundle` passed to
`RecognitionListener.onLanguageDetection(Bundle)` only if
`RecognizerIntent.EXTRA_ENABLE_LANGUAGE_DETECTION` is set. Additionally, if
`RecognizerIntent.EXTRA_LANGUAGE_DETECTION_ALLOWED_LANGUAGES` are listed,
the detected language is constrained to be one from the list.

Constant Value:

"detected\_language"



### ERROR\_AUDIO


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_AUDIO
```

Audio recording error.

Constant Value:

3
(0x00000003)



### ERROR\_CANNOT\_CHECK\_SUPPORT


Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_CANNOT_CHECK_SUPPORT
```

The service does not allow to check for support.

Constant Value:

14
(0x0000000e)



### ERROR\_CANNOT\_LISTEN\_TO\_DOWNLOAD\_EVENTS


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_CANNOT_LISTEN_TO_DOWNLOAD_EVENTS
```

The service does not support listening to model downloads events.

Constant Value:

15
(0x0000000f)



### ERROR\_CLIENT


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_CLIENT
```

Other client side errors.

Constant Value:

5
(0x00000005)



### ERROR\_INSUFFICIENT\_PERMISSIONS


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_INSUFFICIENT_PERMISSIONS
```

Insufficient permissions

Constant Value:

9
(0x00000009)



### ERROR\_LANGUAGE\_NOT\_SUPPORTED


Added in [API level 31](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_LANGUAGE_NOT_SUPPORTED
```

Requested language is not available to be used with the current recognizer.

Constant Value:

12
(0x0000000c)



### ERROR\_LANGUAGE\_UNAVAILABLE


Added in [API level 31](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_LANGUAGE_UNAVAILABLE
```

Requested language is supported, but not available currently (e.g. not downloaded yet).

Constant Value:

13
(0x0000000d)



### ERROR\_NETWORK


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_NETWORK
```

Other network related errors.

Constant Value:

2
(0x00000002)



### ERROR\_NETWORK\_TIMEOUT


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_NETWORK_TIMEOUT
```

Network operation timed out.

Constant Value:

1
(0x00000001)



### ERROR\_NO\_MATCH


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_NO_MATCH
```

No recognition result matched.

Constant Value:

7
(0x00000007)



### ERROR\_RECOGNIZER\_BUSY


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_RECOGNIZER_BUSY
```

RecognitionService busy.

Constant Value:

8
(0x00000008)



### ERROR\_SERVER


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_SERVER
```

Server sends error status.

Constant Value:

4
(0x00000004)



### ERROR\_SERVER\_DISCONNECTED


Added in [API level 31](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_SERVER_DISCONNECTED
```

Server has been disconnected, e.g. because the app has crashed.

Constant Value:

11
(0x0000000b)



### ERROR\_SPEECH\_TIMEOUT


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_SPEECH_TIMEOUT
```

No speech input

Constant Value:

6
(0x00000006)



### ERROR\_TOO\_MANY\_REQUESTS


Added in [API level 31](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int ERROR_TOO_MANY_REQUESTS
```

Too many requests from the same client.

Constant Value:

10
(0x0000000a)



### LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String LANGUAGE_DETECTION_CONFIDENCE_LEVEL
```

Key used to retrieve the level of confidence of the detected language
of the most recent audio chunk,
represented by an `int` value prefixed by `LANGUAGE_DETECTION_CONFIDENCE_LEVEL_`.



This info is returned to the client in the `Bundle` passed to
`RecognitionListener.onLanguageDetection(Bundle)` only if
`RecognizerIntent.EXTRA_ENABLE_LANGUAGE_DETECTION` is set.

Constant Value:

"language\_detection\_confidence\_level"



### LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL\_CONFIDENT


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int LANGUAGE_DETECTION_CONFIDENCE_LEVEL_CONFIDENT
```

Constant Value:

2
(0x00000002)



### LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL\_HIGHLY\_CONFIDENT


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int LANGUAGE_DETECTION_CONFIDENCE_LEVEL_HIGHLY_CONFIDENT
```

Constant Value:

3
(0x00000003)



### LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL\_NOT\_CONFIDENT


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int LANGUAGE_DETECTION_CONFIDENCE_LEVEL_NOT_CONFIDENT
```

Constant Value:

1
(0x00000001)



### LANGUAGE\_DETECTION\_CONFIDENCE\_LEVEL\_UNKNOWN


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int LANGUAGE_DETECTION_CONFIDENCE_LEVEL_UNKNOWN
```

Constant Value:

0
(0x00000000)



### LANGUAGE\_SWITCH\_RESULT


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String LANGUAGE_SWITCH_RESULT
```

Key used to retrieve the result of the language switch of the most recent audio chunk,
represented by an `int` value prefixed by `LANGUAGE_SWITCH_`.



This info is returned to the client in the `Bundle` passed to the
`RecognitionListener.onLanguageDetection(Bundle)` only if
`RecognizerIntent.EXTRA_ENABLE_LANGUAGE_SWITCH` is set.

Constant Value:

"language\_switch\_result"



### LANGUAGE\_SWITCH\_RESULT\_FAILED


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int LANGUAGE_SWITCH_RESULT_FAILED
```

Switch attempted and failed.

Constant Value:

2
(0x00000002)



### LANGUAGE\_SWITCH\_RESULT\_NOT\_ATTEMPTED


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int LANGUAGE_SWITCH_RESULT_NOT_ATTEMPTED
```

Switch not attempted.

Constant Value:

0
(0x00000000)



### LANGUAGE\_SWITCH\_RESULT\_SKIPPED\_NO\_MODEL


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int LANGUAGE_SWITCH_RESULT_SKIPPED_NO_MODEL
```

Switch skipped because the language model is missing
or the language is not allowlisted for auto switch.

Constant Value:

3
(0x00000003)



### LANGUAGE\_SWITCH\_RESULT\_SUCCEEDED


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int LANGUAGE_SWITCH_RESULT_SUCCEEDED
```

Switch attempted and succeeded.

Constant Value:

1
(0x00000001)



### RECOGNITION\_PARTS


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String RECOGNITION_PARTS
```

Key used to receive an ArrayList<`RecognitionPart`\> object from the
`Bundle` passed to the `RecognitionListener.onResults(Bundle)` and
`RecognitionListener.onSegmentResults(Bundle)` methods.



A single `SpeechRecognizer` result is represented as a `String`. Each word of
the resulting String, as well as any potential adjacent punctuation, is represented by a
`RecognitionPart` item from the ArrayList retrieved by this key.

Constant Value:

"recognition\_parts"



### RESULTS\_ALTERNATIVES


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String RESULTS_ALTERNATIVES
```

Key used to retrieve an ArrayList<`AlternativeSpans`\> from the `Bundle`
passed to the `RecognitionListener.onResults(Bundle)` and
`RecognitionListener.onPartialResults(Bundle)` methods. The list should be the same
size as the ArrayList provided in `RESULTS_RECOGNITION`.



A single `SpeechRecognizer` result is represented as a `String`. For a
specific span (substring) of the originally recognized result string the recognizer provides
a list of alternative hypotheses in the form of an `AlternativeSpan` object.
Alternatives for different spans of a result string are listed in an `AlternativeSpans`
object. Each item from the ArrayList retrieved by this key corresponds to a single result
string provided in `RESULTS_RECOGNITION`.



This value is optional and might not be provided.

Constant Value:

"results\_alternatives"



### RESULTS\_RECOGNITION


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String RESULTS_RECOGNITION
```

Key used to retrieve an `ArrayList<String>` from the `Bundle` passed to the
`RecognitionListener.onResults(Bundle)` and
`RecognitionListener.onPartialResults(Bundle)` methods. These strings are the possible
recognition results, where the first element is the most likely candidate.

Constant Value:

"results\_recognition"



### TOP\_LOCALE\_ALTERNATIVES


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String TOP_LOCALE_ALTERNATIVES
```

Key used to retrieve an ArrayList<`String`\> containing representations of the
IETF language tags (as defined by BCP 47, e.g., "en-US", "en-UK") denoting the alternative
locales for the same language retrieved by the key `DETECTED_LANGUAGE`.

This info is returned to the client in the `Bundle` passed to
`RecognitionListener.onLanguageDetection(Bundle)` only if
`RecognizerIntent.EXTRA_ENABLE_LANGUAGE_DETECTION` is set.

Constant Value:

"top\_locale\_alternatives"



## Public methods

### cancel

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public void cancel ()
```

Cancels the speech recognition. Please note that
`setRecognitionListener(RecognitionListener)` should be called beforehand, otherwise
no notifications will be received.


This method must be called from the main thread of your app.

### checkRecognitionSupport

Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public void checkRecognitionSupport (Intent recognizerIntent,
                Executor executor,
                RecognitionSupportCallback supportListener)
```

Checks whether `recognizerIntent` is supported by
`SpeechRecognizer.startListening(Intent)`.

| Parameters |
| --- |
| `recognizerIntent` | `Intent`: contains parameters for the recognition to be performed. The intent<br> may also contain optional extras. See `RecognizerIntent` for<br> the list of supported extras, any unlisted extra might be ignored.<br> <br> This value cannot be `null`. |
| `executor` | `Executor`: This value cannot be `null`.<br> <br> Callback and listener events are dispatched through this<br> `Executor`, providing an easy way to control which thread is<br> used. To dispatch events through the main thread of your<br> application, you can use<br> `Context.getMainExecutor()`.<br> Otherwise, provide an `Executor` that dispatches to an appropriate thread. |
| `supportListener` | `RecognitionSupportCallback`: the listener on which to receive the support query results.<br> <br> This value cannot be `null`. |

### createOnDeviceSpeechRecognizer

Added in [API level 31](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static SpeechRecognizer createOnDeviceSpeechRecognizer (Context context)
```

Factory method to create a new `SpeechRecognizer`.



Please note that `setRecognitionListener(RecognitionListener)` should be called
before dispatching any command to the created `SpeechRecognizer`, otherwise no
notifications will be received.



**Important:** the caller MUST invoke `destroy()` on a
SpeechRecognizer object when it is no longer needed.


This method must be called from the main thread of your app.

| Parameters |
| --- |
| `context` | `Context`: in which to create `SpeechRecognizer`<br> This value cannot be `null`. |

| Returns |
| --- |
| `SpeechRecognizer` | a new on-device `SpeechRecognizer`.<br> <br> This value cannot be `null`. |

| Throws |
| --- |
| `UnsupportedOperationException` | iff `isOnDeviceRecognitionAvailable(Context)`<br> is false |

### createSpeechRecognizer

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static SpeechRecognizer createSpeechRecognizer (Context context)
```

Factory method to create a new `SpeechRecognizer`. Please note that
`setRecognitionListener(RecognitionListener)` should be called before dispatching any
command to the created `SpeechRecognizer`, otherwise no notifications will be
received.



**Important:** the caller MUST invoke `destroy()` on a
SpeechRecognizer object when it is no longer needed.



For apps targeting Android 11 (API level 30) interaction with a speech recognition
service requires  element to be added to the manifest file:


```
<queries>
   <intent>
     <action
        android:name="android.speech.RecognitionService" />
   </intent>
 </queries>

```

.


This method must be called from the main thread of your app.

| Parameters |
| --- |
| `context` | `Context`: in which to create `SpeechRecognizer` |

| Returns |
| --- |
| `SpeechRecognizer` | a new `SpeechRecognizer` |

### createSpeechRecognizer

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static SpeechRecognizer createSpeechRecognizer (Context context,
                ComponentName serviceComponent)
```

Factory method to create a new `SpeechRecognizer`. Please note that
`setRecognitionListener(RecognitionListener)` should be called before dispatching any
command to the created `SpeechRecognizer`, otherwise no notifications will be
received.
Use this version of the method to specify a specific service to direct this
`SpeechRecognizer` to.



**Important:** the caller MUST invoke `destroy()` on a
SpeechRecognizer object when it is no longer needed.



**Important**: before calling this method, please check via
`android.content.pm.PackageManager.queryIntentServices(Intent,int)` that `serviceComponent` actually exists and provides
`RecognitionService.SERVICE_INTERFACE`. Normally you would not use this; call
`createSpeechRecognizer(Context)` to use the system default recognition
service instead or `createOnDeviceSpeechRecognizer(Context)` to use on-device
recognition.

For apps targeting Android 11 (API level 30) interaction with a speech recognition
service requires  element to be added to the manifest file:


```
<queries>
   <intent>
     <action
        android:name="android.speech.RecognitionService" />
   </intent>
 </queries>

```

.


This method must be called from the main thread of your app.

| Parameters |
| --- |
| `context` | `Context`: in which to create `SpeechRecognizer` |
| `serviceComponent` | `ComponentName`: the `ComponentName` of a specific service to direct this<br> `SpeechRecognizer` to |

| Returns |
| --- |
| `SpeechRecognizer` | a new `SpeechRecognizer` |

### destroy

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public void destroy ()
```

Destroys the `SpeechRecognizer` object.

### isOnDeviceRecognitionAvailable

Added in [API level 31](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static boolean isOnDeviceRecognitionAvailable (Context context)
```

Checks whether an on-device speech recognition service is available on the system. If this
method returns `false`,
`SpeechRecognizer.createOnDeviceSpeechRecognizer(Context)` will
fail.

| Parameters |
| --- |
| `context` | `Context`: with which on-device `SpeechRecognizer` will be created.<br> <br> This value cannot be `null`. |

| Returns |
| --- |
| `boolean` | `true` if on-device recognition is available, `false` otherwise |

### isRecognitionAvailable

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static boolean isRecognitionAvailable (Context context)
```

Checks whether a speech recognition service is available on the system. If this method
returns `false`, `SpeechRecognizer.createSpeechRecognizer(Context)` will
fail.

| Parameters |
| --- |
| `context` | `Context`: with which `SpeechRecognizer` will be created.<br> <br> This value cannot be `null`. |

| Returns |
| --- |
| `boolean` | `true` if recognition is available, `false` otherwise |

### setRecognitionListener

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public void setRecognitionListener (RecognitionListener listener)
```

Sets the listener that will receive all the callbacks. The previous unfinished commands will
be executed with the old listener, while any following command will be executed with the new
listener.


This method must be called from the main thread of your app.

| Parameters |
| --- |
| `listener` | `RecognitionListener`: listener that will receive all the callbacks from the created<br> `SpeechRecognizer`, this must not be null. |

### startListening

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public void startListening (Intent recognizerIntent)
```

Starts listening for speech. Please note that
`setRecognitionListener(RecognitionListener)` should be called beforehand, otherwise
no notifications will be received.


This method must be called from the main thread of your app.

| Parameters |
| --- |
| `recognizerIntent` | `Intent`: contains parameters for the recognition to be performed. The intent<br> may also contain optional extras, see `RecognizerIntent`. If<br> these values are not set explicitly, default values will be used by<br> the recognizer. |

### stopListening

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public void stopListening ()
```

Stops listening for speech. Speech captured so far will be recognized as if the user had
stopped speaking at this point.



Note that in the default case, this does not need to be called, as the speech endpointer
will automatically stop the recognizer listening when it determines speech has completed.
However, you can manipulate endpointer parameters directly using the intent extras defined in
`RecognizerIntent`, in which case you may sometimes want to manually call this method
to stop listening sooner.



Upon invocation clients must wait until `RecognitionListener.onResults` or
`RecognitionListener.onError` are invoked before calling
`SpeechRecognizer.startListening` again. Otherwise such an attempt would be rejected by
recognition service.



Please note that
`setRecognitionListener(RecognitionListener)` should be called beforehand, otherwise
no notifications will be received.


This method must be called from the main thread of your app.

### triggerModelDownload

Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public void triggerModelDownload (Intent recognizerIntent)
```

Attempts to download the support for the given `recognizerIntent`. This might trigger
user interaction to approve the download. Callers can verify the status of the request via
`checkRecognitionSupport(Intent,Executor,RecognitionSupportCallback)`.

| Parameters |
| --- |
| `recognizerIntent` | `Intent`: contains parameters for the recognition to be performed. The intent<br> may also contain optional extras, see `RecognizerIntent`.<br> <br> This value cannot be `null`. |

### triggerModelDownload

Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public void triggerModelDownload (Intent recognizerIntent,
                Executor executor,
                ModelDownloadListener listener)
```

Attempts to download the support for the given `recognizerIntent`. This might trigger
user interaction to approve the download. Callers can verify the status of the request via
`checkRecognitionSupport(Intent,Executor,RecognitionSupportCallback)`.



The updates about the model download request are received via the given
`ModelDownloadListener`:



If the model is already available, `ModelDownloadListener.onSuccess()` will be
called directly. The model can be safely used afterwards.


If the `RecognitionService` has started the download,
`ModelDownloadListener.onProgress(int)` will be called an unspecified (zero or more)
number of times until the download is complete.
When the download finishes, `ModelDownloadListener.onSuccess()` will be called.
The model can be safely used afterwards.


If the `RecognitionService` has only scheduled the download, but won't satisfy it
immediately, `ModelDownloadListener.onScheduled()` will be called.
There will be no further updates on this listener.


If the request fails at any time due to a network or scheduling error,
`ModelDownloadListener.onError(int)` will be called.

| Parameters |
| --- |
| `recognizerIntent` | `Intent`: contains parameters for the recognition to be performed. The intent<br> may also contain optional extras, see `RecognizerIntent`.<br> <br> This value cannot be `null`. |
| `executor` | `Executor`: for dispatching listener callbacks.<br> <br> This value cannot be `null`.<br> <br> Callback and listener events are dispatched through this<br> `Executor`, providing an easy way to control which thread is<br> used. To dispatch events through the main thread of your<br> application, you can use<br> `Context.getMainExecutor()`.<br> Otherwise, provide an `Executor` that dispatches to an appropriate thread. |
| `listener` | `ModelDownloadListener`: on which to receive updates about the model download request.<br> <br> This value cannot be `null`. |

Was this helpful?

Content and code samples on this page are subject to the licenses described in the [Content License](https://developer.android.com/license). Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates.

Last updated 2026-02-26 UTC.




\[\[\["Easy to understand","easyToUnderstand","thumb-up"\],\["Solved my problem","solvedMyProblem","thumb-up"\],\["Other","otherUp","thumb-up"\]\],\[\["Missing the information I need","missingTheInformationINeed","thumb-down"\],\["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"\],\["Out of date","outOfDate","thumb-down"\],\["Samples / code issue","samplesCodeIssue","thumb-down"\],\["Other","otherDown","thumb-down"\]\],\["Last updated 2026-02-26 UTC."\],\[\],\[\]\]