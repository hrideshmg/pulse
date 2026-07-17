[Skip to main content](https://developer.android.com/reference/android/speech/RecognizerIntent#main-content)

[![Android Developers](https://www.gstatic.com/devrel-devsite/prod/v7669de8735de7fa899c49c793af6b01f3bfef3435bb66621d079ef252c528b54/android/images/lockup.png)](https://developer.android.com/)

`/`

Language

- [English](https://developer.android.com/reference/android/speech/RecognizerIntent)
- [Deutsch](https://developer.android.com/reference/android/speech/RecognizerIntent?hl=de)
- [Español – América Latina](https://developer.android.com/reference/android/speech/RecognizerIntent?hl=es-419)
- [Français](https://developer.android.com/reference/android/speech/RecognizerIntent?hl=fr)
- [Indonesia](https://developer.android.com/reference/android/speech/RecognizerIntent?hl=id)
- [Polski](https://developer.android.com/reference/android/speech/RecognizerIntent?hl=pl)
- [Português – Brasil](https://developer.android.com/reference/android/speech/RecognizerIntent?hl=pt-br)
- [Tiếng Việt](https://developer.android.com/reference/android/speech/RecognizerIntent?hl=vi)
- [中文 – 简体](https://developer.android.com/reference/android/speech/RecognizerIntent?hl=zh-cn)
- [日本語](https://developer.android.com/reference/android/speech/RecognizerIntent?hl=ja)
- [한국어](https://developer.android.com/reference/android/speech/RecognizerIntent?hl=ko)

[Android Studio](https://developer.android.com/studio)

[Sign in](https://developer.android.com/_d/signin?continue=https%3A%2F%2Fdeveloper.android.com%2Freference%2Fandroid%2Fspeech%2FRecognizerIntent&prompt=select_account)

- [API reference](https://developer.android.com/reference)

- On this page
- [Summary](https://developer.android.com/reference/android/speech/RecognizerIntent#summary)
  - [Constants](https://developer.android.com/reference/android/speech/RecognizerIntent#constants)
  - [Public methods](https://developer.android.com/reference/android/speech/RecognizerIntent#public-methods)
  - [Inherited methods](https://developer.android.com/reference/android/speech/RecognizerIntent#inherited-methods)
- [Constants](https://developer.android.com/reference/android/speech/RecognizerIntent#constants_1)
  - [ACTION\_GET\_LANGUAGE\_DETAILS](https://developer.android.com/reference/android/speech/RecognizerIntent#ACTION_GET_LANGUAGE_DETAILS)
  - [ACTION\_RECOGNIZE\_SPEECH](https://developer.android.com/reference/android/speech/RecognizerIntent#ACTION_RECOGNIZE_SPEECH)
  - [ACTION\_VOICE\_SEARCH\_HANDS\_FREE](https://developer.android.com/reference/android/speech/RecognizerIntent#ACTION_VOICE_SEARCH_HANDS_FREE)
  - [ACTION\_WEB\_SEARCH](https://developer.android.com/reference/android/speech/RecognizerIntent#ACTION_WEB_SEARCH)
  - [DETAILS\_META\_DATA](https://developer.android.com/reference/android/speech/RecognizerIntent#DETAILS_META_DATA)
  - [EXTRA\_AUDIO\_INJECT\_SOURCE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_AUDIO_INJECT_SOURCE)
  - [EXTRA\_AUDIO\_SOURCE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_AUDIO_SOURCE)
  - [EXTRA\_AUDIO\_SOURCE\_CHANNEL\_COUNT](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_AUDIO_SOURCE_CHANNEL_COUNT)
  - [EXTRA\_AUDIO\_SOURCE\_ENCODING](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_AUDIO_SOURCE_ENCODING)
  - [EXTRA\_AUDIO\_SOURCE\_SAMPLING\_RATE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_AUDIO_SOURCE_SAMPLING_RATE)
  - [EXTRA\_BIASING\_STRINGS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_BIASING_STRINGS)
  - [EXTRA\_CALLING\_PACKAGE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_CALLING_PACKAGE)
  - [EXTRA\_CONFIDENCE\_SCORES](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_CONFIDENCE_SCORES)
  - [EXTRA\_ENABLE\_BIASING\_DEVICE\_CONTEXT](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_ENABLE_BIASING_DEVICE_CONTEXT)
  - [EXTRA\_ENABLE\_FORMATTING](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_ENABLE_FORMATTING)
  - [EXTRA\_ENABLE\_LANGUAGE\_DETECTION](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_ENABLE_LANGUAGE_DETECTION)
  - [EXTRA\_ENABLE\_LANGUAGE\_SWITCH](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_ENABLE_LANGUAGE_SWITCH)
  - [EXTRA\_HIDE\_PARTIAL\_TRAILING\_PUNCTUATION](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_HIDE_PARTIAL_TRAILING_PUNCTUATION)
  - [EXTRA\_LANGUAGE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE)
  - [EXTRA\_LANGUAGE\_DETECTION\_ALLOWED\_LANGUAGES](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE_DETECTION_ALLOWED_LANGUAGES)
  - [EXTRA\_LANGUAGE\_MODEL](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE_MODEL)
  - [EXTRA\_LANGUAGE\_PREFERENCE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE_PREFERENCE)
  - [EXTRA\_LANGUAGE\_SWITCH\_ALLOWED\_LANGUAGES](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE_SWITCH_ALLOWED_LANGUAGES)
  - [EXTRA\_LANGUAGE\_SWITCH\_INITIAL\_ACTIVE\_DURATION\_TIME\_MILLIS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE_SWITCH_INITIAL_ACTIVE_DURATION_TIME_MILLIS)
  - [EXTRA\_LANGUAGE\_SWITCH\_MAX\_SWITCHES](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE_SWITCH_MAX_SWITCHES)
  - [EXTRA\_MASK\_OFFENSIVE\_WORDS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_MASK_OFFENSIVE_WORDS)
  - [EXTRA\_MAX\_RESULTS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_MAX_RESULTS)
  - [EXTRA\_ONLY\_RETURN\_LANGUAGE\_PREFERENCE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_ONLY_RETURN_LANGUAGE_PREFERENCE)
  - [EXTRA\_ORIGIN](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_ORIGIN)
  - [EXTRA\_PARTIAL\_RESULTS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_PARTIAL_RESULTS)
  - [EXTRA\_PREFER\_OFFLINE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_PREFER_OFFLINE)
  - [EXTRA\_PROMPT](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_PROMPT)
  - [EXTRA\_REQUEST\_WORD\_CONFIDENCE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_REQUEST_WORD_CONFIDENCE)
  - [EXTRA\_REQUEST\_WORD\_TIMING](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_REQUEST_WORD_TIMING)
  - [EXTRA\_RESULTS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_RESULTS)
  - [EXTRA\_RESULTS\_PENDINGINTENT](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_RESULTS_PENDINGINTENT)
  - [EXTRA\_RESULTS\_PENDINGINTENT\_BUNDLE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_RESULTS_PENDINGINTENT_BUNDLE)
  - [EXTRA\_SECURE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_SECURE)
  - [EXTRA\_SEGMENTED\_SESSION](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_SEGMENTED_SESSION)
  - [EXTRA\_SPEECH\_INPUT\_COMPLETE\_SILENCE\_LENGTH\_MILLIS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS)
  - [EXTRA\_SPEECH\_INPUT\_MINIMUM\_LENGTH\_MILLIS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS)
  - [EXTRA\_SPEECH\_INPUT\_POSSIBLY\_COMPLETE\_SILENCE\_LENGTH\_MILLIS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS)
  - [EXTRA\_SUPPORTED\_LANGUAGES](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_SUPPORTED_LANGUAGES)
  - [EXTRA\_WEB\_SEARCH\_ONLY](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_WEB_SEARCH_ONLY)
  - [FORMATTING\_OPTIMIZE\_LATENCY](https://developer.android.com/reference/android/speech/RecognizerIntent#FORMATTING_OPTIMIZE_LATENCY)
  - [FORMATTING\_OPTIMIZE\_QUALITY](https://developer.android.com/reference/android/speech/RecognizerIntent#FORMATTING_OPTIMIZE_QUALITY)
  - [LANGUAGE\_MODEL\_FREE\_FORM](https://developer.android.com/reference/android/speech/RecognizerIntent#LANGUAGE_MODEL_FREE_FORM)
  - [LANGUAGE\_MODEL\_WEB\_SEARCH](https://developer.android.com/reference/android/speech/RecognizerIntent#LANGUAGE_MODEL_WEB_SEARCH)
  - [LANGUAGE\_SWITCH\_BALANCED](https://developer.android.com/reference/android/speech/RecognizerIntent#LANGUAGE_SWITCH_BALANCED)
  - [LANGUAGE\_SWITCH\_HIGH\_PRECISION](https://developer.android.com/reference/android/speech/RecognizerIntent#LANGUAGE_SWITCH_HIGH_PRECISION)
  - [LANGUAGE\_SWITCH\_QUICK\_RESPONSE](https://developer.android.com/reference/android/speech/RecognizerIntent#LANGUAGE_SWITCH_QUICK_RESPONSE)
  - [RESULT\_AUDIO\_ERROR](https://developer.android.com/reference/android/speech/RecognizerIntent#RESULT_AUDIO_ERROR)
  - [RESULT\_CLIENT\_ERROR](https://developer.android.com/reference/android/speech/RecognizerIntent#RESULT_CLIENT_ERROR)
  - [RESULT\_NETWORK\_ERROR](https://developer.android.com/reference/android/speech/RecognizerIntent#RESULT_NETWORK_ERROR)
  - [RESULT\_NO\_MATCH](https://developer.android.com/reference/android/speech/RecognizerIntent#RESULT_NO_MATCH)
  - [RESULT\_SERVER\_ERROR](https://developer.android.com/reference/android/speech/RecognizerIntent#RESULT_SERVER_ERROR)
- [Public methods](https://developer.android.com/reference/android/speech/RecognizerIntent#public-methods_1)
  - [getVoiceDetailsIntent](https://developer.android.com/reference/android/speech/RecognizerIntent#getVoiceDetailsIntent(android.content.Context))

- [Android Developers](https://developer.android.com/)
- [Develop](https://developer.android.com/develop)
- [API reference](https://developer.android.com/reference)

Was this helpful?

- On this page
- [Summary](https://developer.android.com/reference/android/speech/RecognizerIntent#summary)
  - [Constants](https://developer.android.com/reference/android/speech/RecognizerIntent#constants)
  - [Public methods](https://developer.android.com/reference/android/speech/RecognizerIntent#public-methods)
  - [Inherited methods](https://developer.android.com/reference/android/speech/RecognizerIntent#inherited-methods)
- [Constants](https://developer.android.com/reference/android/speech/RecognizerIntent#constants_1)
  - [ACTION\_GET\_LANGUAGE\_DETAILS](https://developer.android.com/reference/android/speech/RecognizerIntent#ACTION_GET_LANGUAGE_DETAILS)
  - [ACTION\_RECOGNIZE\_SPEECH](https://developer.android.com/reference/android/speech/RecognizerIntent#ACTION_RECOGNIZE_SPEECH)
  - [ACTION\_VOICE\_SEARCH\_HANDS\_FREE](https://developer.android.com/reference/android/speech/RecognizerIntent#ACTION_VOICE_SEARCH_HANDS_FREE)
  - [ACTION\_WEB\_SEARCH](https://developer.android.com/reference/android/speech/RecognizerIntent#ACTION_WEB_SEARCH)
  - [DETAILS\_META\_DATA](https://developer.android.com/reference/android/speech/RecognizerIntent#DETAILS_META_DATA)
  - [EXTRA\_AUDIO\_INJECT\_SOURCE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_AUDIO_INJECT_SOURCE)
  - [EXTRA\_AUDIO\_SOURCE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_AUDIO_SOURCE)
  - [EXTRA\_AUDIO\_SOURCE\_CHANNEL\_COUNT](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_AUDIO_SOURCE_CHANNEL_COUNT)
  - [EXTRA\_AUDIO\_SOURCE\_ENCODING](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_AUDIO_SOURCE_ENCODING)
  - [EXTRA\_AUDIO\_SOURCE\_SAMPLING\_RATE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_AUDIO_SOURCE_SAMPLING_RATE)
  - [EXTRA\_BIASING\_STRINGS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_BIASING_STRINGS)
  - [EXTRA\_CALLING\_PACKAGE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_CALLING_PACKAGE)
  - [EXTRA\_CONFIDENCE\_SCORES](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_CONFIDENCE_SCORES)
  - [EXTRA\_ENABLE\_BIASING\_DEVICE\_CONTEXT](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_ENABLE_BIASING_DEVICE_CONTEXT)
  - [EXTRA\_ENABLE\_FORMATTING](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_ENABLE_FORMATTING)
  - [EXTRA\_ENABLE\_LANGUAGE\_DETECTION](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_ENABLE_LANGUAGE_DETECTION)
  - [EXTRA\_ENABLE\_LANGUAGE\_SWITCH](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_ENABLE_LANGUAGE_SWITCH)
  - [EXTRA\_HIDE\_PARTIAL\_TRAILING\_PUNCTUATION](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_HIDE_PARTIAL_TRAILING_PUNCTUATION)
  - [EXTRA\_LANGUAGE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE)
  - [EXTRA\_LANGUAGE\_DETECTION\_ALLOWED\_LANGUAGES](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE_DETECTION_ALLOWED_LANGUAGES)
  - [EXTRA\_LANGUAGE\_MODEL](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE_MODEL)
  - [EXTRA\_LANGUAGE\_PREFERENCE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE_PREFERENCE)
  - [EXTRA\_LANGUAGE\_SWITCH\_ALLOWED\_LANGUAGES](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE_SWITCH_ALLOWED_LANGUAGES)
  - [EXTRA\_LANGUAGE\_SWITCH\_INITIAL\_ACTIVE\_DURATION\_TIME\_MILLIS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE_SWITCH_INITIAL_ACTIVE_DURATION_TIME_MILLIS)
  - [EXTRA\_LANGUAGE\_SWITCH\_MAX\_SWITCHES](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_LANGUAGE_SWITCH_MAX_SWITCHES)
  - [EXTRA\_MASK\_OFFENSIVE\_WORDS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_MASK_OFFENSIVE_WORDS)
  - [EXTRA\_MAX\_RESULTS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_MAX_RESULTS)
  - [EXTRA\_ONLY\_RETURN\_LANGUAGE\_PREFERENCE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_ONLY_RETURN_LANGUAGE_PREFERENCE)
  - [EXTRA\_ORIGIN](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_ORIGIN)
  - [EXTRA\_PARTIAL\_RESULTS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_PARTIAL_RESULTS)
  - [EXTRA\_PREFER\_OFFLINE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_PREFER_OFFLINE)
  - [EXTRA\_PROMPT](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_PROMPT)
  - [EXTRA\_REQUEST\_WORD\_CONFIDENCE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_REQUEST_WORD_CONFIDENCE)
  - [EXTRA\_REQUEST\_WORD\_TIMING](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_REQUEST_WORD_TIMING)
  - [EXTRA\_RESULTS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_RESULTS)
  - [EXTRA\_RESULTS\_PENDINGINTENT](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_RESULTS_PENDINGINTENT)
  - [EXTRA\_RESULTS\_PENDINGINTENT\_BUNDLE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_RESULTS_PENDINGINTENT_BUNDLE)
  - [EXTRA\_SECURE](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_SECURE)
  - [EXTRA\_SEGMENTED\_SESSION](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_SEGMENTED_SESSION)
  - [EXTRA\_SPEECH\_INPUT\_COMPLETE\_SILENCE\_LENGTH\_MILLIS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS)
  - [EXTRA\_SPEECH\_INPUT\_MINIMUM\_LENGTH\_MILLIS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS)
  - [EXTRA\_SPEECH\_INPUT\_POSSIBLY\_COMPLETE\_SILENCE\_LENGTH\_MILLIS](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS)
  - [EXTRA\_SUPPORTED\_LANGUAGES](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_SUPPORTED_LANGUAGES)
  - [EXTRA\_WEB\_SEARCH\_ONLY](https://developer.android.com/reference/android/speech/RecognizerIntent#EXTRA_WEB_SEARCH_ONLY)
  - [FORMATTING\_OPTIMIZE\_LATENCY](https://developer.android.com/reference/android/speech/RecognizerIntent#FORMATTING_OPTIMIZE_LATENCY)
  - [FORMATTING\_OPTIMIZE\_QUALITY](https://developer.android.com/reference/android/speech/RecognizerIntent#FORMATTING_OPTIMIZE_QUALITY)
  - [LANGUAGE\_MODEL\_FREE\_FORM](https://developer.android.com/reference/android/speech/RecognizerIntent#LANGUAGE_MODEL_FREE_FORM)
  - [LANGUAGE\_MODEL\_WEB\_SEARCH](https://developer.android.com/reference/android/speech/RecognizerIntent#LANGUAGE_MODEL_WEB_SEARCH)
  - [LANGUAGE\_SWITCH\_BALANCED](https://developer.android.com/reference/android/speech/RecognizerIntent#LANGUAGE_SWITCH_BALANCED)
  - [LANGUAGE\_SWITCH\_HIGH\_PRECISION](https://developer.android.com/reference/android/speech/RecognizerIntent#LANGUAGE_SWITCH_HIGH_PRECISION)
  - [LANGUAGE\_SWITCH\_QUICK\_RESPONSE](https://developer.android.com/reference/android/speech/RecognizerIntent#LANGUAGE_SWITCH_QUICK_RESPONSE)
  - [RESULT\_AUDIO\_ERROR](https://developer.android.com/reference/android/speech/RecognizerIntent#RESULT_AUDIO_ERROR)
  - [RESULT\_CLIENT\_ERROR](https://developer.android.com/reference/android/speech/RecognizerIntent#RESULT_CLIENT_ERROR)
  - [RESULT\_NETWORK\_ERROR](https://developer.android.com/reference/android/speech/RecognizerIntent#RESULT_NETWORK_ERROR)
  - [RESULT\_NO\_MATCH](https://developer.android.com/reference/android/speech/RecognizerIntent#RESULT_NO_MATCH)
  - [RESULT\_SERVER\_ERROR](https://developer.android.com/reference/android/speech/RecognizerIntent#RESULT_SERVER_ERROR)
- [Public methods](https://developer.android.com/reference/android/speech/RecognizerIntent#public-methods_1)
  - [getVoiceDetailsIntent](https://developer.android.com/reference/android/speech/RecognizerIntent#getVoiceDetailsIntent(android.content.Context))


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

Summary:

[Constants](https://developer.android.com/reference/android/speech/RecognizerIntent#constants)


\| [Methods](https://developer.android.com/reference/android/speech/RecognizerIntent#pubmethods)


\| [Inherited Methods](https://developer.android.com/reference/android/speech/RecognizerIntent#inhmethods)

# RecognizerIntent    Stay organized with collections      Save and categorize content based on your preferences.

* * *

[Kotlin](https://developer.android.com/reference/kotlin/android/speech/RecognizerIntent "View this page in Kotlin") \|Java

`
public

class
RecognizerIntent
`

`

    extends Object

``

`

|     |     |
| --- | --- |
| [java.lang.Object](https://developer.android.com/reference/java/lang/Object) |
| ↳ | android.speech.RecognizerIntent |

* * *

Constants for supporting speech recognition through starting an `Intent`

## Summary

| ### Constants |
| --- |
| `String` | `ACTION_GET_LANGUAGE_DETAILS`<br>A broadcast intent which can be fired to the `BroadcastReceiver` component specified<br>in the meta-data defined in the `DETAILS_META_DATA` meta-data of an<br>`Activity` satisfying `ACTION_WEB_SEARCH`. |
| `String` | `ACTION_RECOGNIZE_SPEECH`<br>Starts an activity that will prompt the user for speech and send it through a<br>speech recognizer. |
| `String` | `ACTION_VOICE_SEARCH_HANDS_FREE`<br>Starts an activity that will prompt the user for speech without requiring the user's<br>visual attention or touch input. |
| `String` | `ACTION_WEB_SEARCH`<br>Starts an activity that will prompt the user for speech, send it through a<br>speech recognizer, and either display a web search result or trigger<br>another type of action based on the user's speech. |
| `String` | `DETAILS_META_DATA`<br>Meta-data name under which an `Activity` implementing `ACTION_WEB_SEARCH` can<br>use to expose the class name of a `BroadcastReceiver` which can respond to request for<br>more information, from any of the broadcast intents specified in this class. |
| `String` | `EXTRA_AUDIO_INJECT_SOURCE`<br>_This constant was deprecated_<br>_in API level 33._<br>_Replaced with `EXTRA_AUDIO_SOURCE`_ |
| `String` | `EXTRA_AUDIO_SOURCE`<br>Optional `ParcelFileDescriptor` pointing to an already opened audio<br>source for the recognizer to use. |
| `String` | `EXTRA_AUDIO_SOURCE_CHANNEL_COUNT`<br>Optional integer, to be used with `EXTRA_AUDIO_SOURCE`, to indicate the number of<br>channels in the audio. |
| `String` | `EXTRA_AUDIO_SOURCE_ENCODING`<br>Optional integer (from `AudioFormat`), to be used with<br>`EXTRA_AUDIO_SOURCE`, to indicate the audio encoding. |
| `String` | `EXTRA_AUDIO_SOURCE_SAMPLING_RATE`<br>Optional integer, to be used with `EXTRA_AUDIO_SOURCE`, to indicate the sampling<br>rate of the audio. |
| `String` | `EXTRA_BIASING_STRINGS`<br>Optional list of strings, towards which the recognizer should bias the recognition results. |
| `String` | `EXTRA_CALLING_PACKAGE`<br>The extra key used in an intent to the speech recognizer for voice search. |
| `String` | `EXTRA_CONFIDENCE_SCORES`<br>A float array of confidence scores of the recognition results when performing<br>`ACTION_RECOGNIZE_SPEECH`. |
| `String` | `EXTRA_ENABLE_BIASING_DEVICE_CONTEXT`<br>Optional boolean to enable biasing towards device context. |
| `String` | `EXTRA_ENABLE_FORMATTING`<br>Optional string to enable text formatting (e.g. unspoken punctuation (examples: question<br>mark, comma, period, etc.), capitalization, etc.) and specify the optimization strategy. |
| `String` | `EXTRA_ENABLE_LANGUAGE_DETECTION`<br>Optional boolean indicating whether to enable language detection. |
| `String` | `EXTRA_ENABLE_LANGUAGE_SWITCH`<br>Optional string to enable automatic switching to the language being spoken with<br>the desired sensitivity level, instead of being restricted to a single language. |
| `String` | `EXTRA_HIDE_PARTIAL_TRAILING_PUNCTUATION`<br>Optional boolean, to be used with `EXTRA_ENABLE_FORMATTING`, to prevent the<br>recognizer adding punctuation after the last word of the partial results. |
| `String` | `EXTRA_LANGUAGE`<br>Optional IETF language tag (as defined by BCP 47), for example "en-US". |
| `String` | `EXTRA_LANGUAGE_DETECTION_ALLOWED_LANGUAGES`<br>Optional list of IETF language tags (as defined by BCP 47, e.g. "en-US", "de-DE"). |
| `String` | `EXTRA_LANGUAGE_MODEL`<br>Informs the recognizer which speech model to prefer when performing<br>`ACTION_RECOGNIZE_SPEECH`. |
| `String` | `EXTRA_LANGUAGE_PREFERENCE`<br>The key to the extra in the `Bundle` returned by `ACTION_GET_LANGUAGE_DETAILS`<br>which is a `String` that represents the current language preference this user has<br>specified - a locale string like "en-US". |
| `String` | `EXTRA_LANGUAGE_SWITCH_ALLOWED_LANGUAGES`<br>Optional list of IETF language tags (as defined by BCP 47, e.g. "en-US", "de-DE"). |
| `String` | `EXTRA_LANGUAGE_SWITCH_INITIAL_ACTIVE_DURATION_TIME_MILLIS`<br>Optional integer to use for `EXTRA_ENABLE_LANGUAGE_SWITCH`. |
| `String` | `EXTRA_LANGUAGE_SWITCH_MAX_SWITCHES`<br>Optional integer to use for `EXTRA_ENABLE_LANGUAGE_SWITCH`. |
| `String` | `EXTRA_MASK_OFFENSIVE_WORDS`<br>Optional boolean indicating whether the recognizer should mask the offensive words in<br>recognition results. |
| `String` | `EXTRA_MAX_RESULTS`<br>Optional limit on the maximum number of results to return. |
| `String` | `EXTRA_ONLY_RETURN_LANGUAGE_PREFERENCE`<br>Specify this boolean extra in a broadcast of `ACTION_GET_LANGUAGE_DETAILS` to<br>indicate that only the current language preference is needed in the response. |
| `String` | `EXTRA_ORIGIN`<br>Optional value which can be used to indicate the referer url of a page in which<br>speech was requested. |
| `String` | `EXTRA_PARTIAL_RESULTS`<br>Optional boolean to indicate whether partial results should be returned by the recognizer<br>as the user speaks (default is false). |
| `String` | `EXTRA_PREFER_OFFLINE`<br>Optional boolean, to be used with `ACTION_RECOGNIZE_SPEECH`,<br>`ACTION_VOICE_SEARCH_HANDS_FREE`, `ACTION_WEB_SEARCH` to indicate whether to<br>only use an offline speech recognition engine. |
| `String` | `EXTRA_PROMPT`<br>Optional text prompt to show to the user when asking them to speak. |
| `String` | `EXTRA_REQUEST_WORD_CONFIDENCE`<br>Optional boolean indicating whether the recognizer should return the confidence<br>level of each word in the final recognition results. |
| `String` | `EXTRA_REQUEST_WORD_TIMING`<br>Optional boolean indicating whether the recognizer should return the timestamp<br>of each word in the final recognition results. |
| `String` | `EXTRA_RESULTS`<br>An ArrayList<String> of the recognition results when performing<br>`ACTION_RECOGNIZE_SPEECH`. |
| `String` | `EXTRA_RESULTS_PENDINGINTENT`<br>When the intent is `ACTION_RECOGNIZE_SPEECH`, the speech input activity will<br>return results to you via the activity results mechanism. |
| `String` | `EXTRA_RESULTS_PENDINGINTENT_BUNDLE`<br>If you use `EXTRA_RESULTS_PENDINGINTENT` to supply a forwarding intent, you can<br>also use this extra to supply additional extras for the final intent. |
| `String` | `EXTRA_SECURE`<br>Optional boolean to indicate that a "hands free" voice search was performed while the device<br>was in a secure mode. |
| `String` | `EXTRA_SEGMENTED_SESSION`<br>Optional string to enable segmented session mode of the specified type, which can be<br>`EXTRA_AUDIO_SOURCE`, `EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS` or<br>`EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS`. |
| `String` | `EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS`<br>The amount of time that it should take after the recognizer stops hearing speech to<br>consider the input complete hence end the recognition session. |
| `String` | `EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS`<br>Optional integer to indicate the minimum length of the recognition session. |
| `String` | `EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS`<br>The amount of time that it should take after we stop hearing speech to consider the input<br>possibly complete. |
| `String` | `EXTRA_SUPPORTED_LANGUAGES`<br>The key to the extra in the `Bundle` returned by `ACTION_GET_LANGUAGE_DETAILS`<br>which is an `ArrayList` of `String`s that represents the languages supported by<br>this implementation of voice recognition - a list of strings like "en-US", "cmn-Hans-CN",<br>etc. |
| `String` | `EXTRA_WEB_SEARCH_ONLY`<br>Optional boolean, to be used with `ACTION_WEB_SEARCH`, to indicate whether to<br>only fire web searches in response to a user's speech. |
| `String` | `FORMATTING_OPTIMIZE_LATENCY`<br>Optimizes formatting latency. |
| `String` | `FORMATTING_OPTIMIZE_QUALITY`<br>Optimizes formatting quality. |
| `String` | `LANGUAGE_MODEL_FREE_FORM`<br>Use a language model based on free-form speech recognition. |
| `String` | `LANGUAGE_MODEL_WEB_SEARCH`<br>Use a language model based on web search terms. |
| `String` | `LANGUAGE_SWITCH_BALANCED`<br>A value to use for `EXTRA_ENABLE_LANGUAGE_SWITCH`. |
| `String` | `LANGUAGE_SWITCH_HIGH_PRECISION`<br>A value to use for `EXTRA_ENABLE_LANGUAGE_SWITCH`. |
| `String` | `LANGUAGE_SWITCH_QUICK_RESPONSE`<br>A value to use for `EXTRA_ENABLE_LANGUAGE_SWITCH`. |
| `int` | `RESULT_AUDIO_ERROR`<br>Result code returned when an audio error was encountered |
| `int` | `RESULT_CLIENT_ERROR`<br>Result code returned when there is a generic client error |
| `int` | `RESULT_NETWORK_ERROR`<br>Result code returned when a network error was encountered |
| `int` | `RESULT_NO_MATCH`<br>Result code returned when no matches are found for the given speech |
| `int` | `RESULT_SERVER_ERROR`<br>Result code returned when the recognition server returns an error |

| ### Public methods |
| --- |
| `<br>        static<br>        final<br>        Intent` | `<br>      getVoiceDetailsIntent(Context context)<br>`<br>Returns the broadcast intent to fire with<br>`Context.sendOrderedBroadcast(Intent,String,BroadcastReceiver,android.os.Handler,int,String,Bundle)`<br>to receive details from the package that implements voice search. |

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

### ACTION\_GET\_LANGUAGE\_DETAILS


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String ACTION_GET_LANGUAGE_DETAILS
```

A broadcast intent which can be fired to the `BroadcastReceiver` component specified
in the meta-data defined in the `DETAILS_META_DATA` meta-data of an
`Activity` satisfying `ACTION_WEB_SEARCH`.


When fired with
`Context.sendOrderedBroadcast(Intent,String,BroadcastReceiver,android.os.Handler,int,String,android.os.Bundle)`,
a `Bundle` of extras will be returned to the provided result receiver, and should
ideally contain values for `EXTRA_LANGUAGE_PREFERENCE` and
`EXTRA_SUPPORTED_LANGUAGES`.


(Whether these are actually provided is up to the particular implementation. It is
recommended that `Activity`s implementing `ACTION_WEB_SEARCH` provide this
information, but it is not required.)

Constant Value:

"android.speech.action.GET\_LANGUAGE\_DETAILS"



### ACTION\_RECOGNIZE\_SPEECH


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String ACTION_RECOGNIZE_SPEECH
```

Starts an activity that will prompt the user for speech and send it through a
speech recognizer. The results will be returned via activity results (in
`Activity.onActivityResult`, if you start the intent using
`Activity.startActivityForResult(Intent,int)`), or forwarded via a PendingIntent
if one is provided.



Starting this intent with just `Activity.startActivity(Intent)` is not supported.
You must either use `Activity.startActivityForResult(Intent,int)`, or provide a
PendingIntent, to receive recognition results.



The implementation of this API is likely to stream audio to remote servers to perform
speech recognition which can use a substantial amount of bandwidth.



Required extras:


- `EXTRA_LANGUAGE_MODEL`

Optional extras:


- `EXTRA_PROMPT`
- `EXTRA_LANGUAGE`
- `EXTRA_MAX_RESULTS`
- `EXTRA_RESULTS_PENDINGINTENT`
- `EXTRA_RESULTS_PENDINGINTENT_BUNDLE`

Result extras (returned in the result, not to be specified in the request):


- `EXTRA_RESULTS`

NOTE: There may not be any applications installed to handle this action, so you should
make sure to catch `ActivityNotFoundException`.

Constant Value:

"android.speech.action.RECOGNIZE\_SPEECH"



### ACTION\_VOICE\_SEARCH\_HANDS\_FREE


Added in [API level 16](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String ACTION_VOICE_SEARCH_HANDS_FREE
```

Starts an activity that will prompt the user for speech without requiring the user's
visual attention or touch input. It will send it through a speech recognizer,
and either synthesize speech for a web search result or trigger
another type of action based on the user's speech.

This activity may be launched while device is locked in a secure mode.
Special care must be taken to ensure that the voice actions that are performed while
hands free cannot compromise the device's security.
The activity should check the value of the `EXTRA_SECURE` extra to determine
whether the device has been securely locked. If so, the activity should either restrict
the set of voice actions that are permitted or require some form of secure
authentication before proceeding.

To ensure that the activity's user interface is visible while the lock screen is showing,
the activity should set the
`WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED` window flag.
Otherwise the activity's user interface may be hidden by the lock screen. The activity
should take care not to leak private information when the device is securely locked.



Optional extras:


- `EXTRA_SECURE`

In some cases, a matching Activity may not exist, so ensure you
safeguard against this.

Constant Value:

"android.speech.action.VOICE\_SEARCH\_HANDS\_FREE"



### ACTION\_WEB\_SEARCH


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String ACTION_WEB_SEARCH
```

Starts an activity that will prompt the user for speech, send it through a
speech recognizer, and either display a web search result or trigger
another type of action based on the user's speech.



If you want to avoid triggering any type of action besides web search, you can use
the `EXTRA_WEB_SEARCH_ONLY` extra.



Required extras:


- `EXTRA_LANGUAGE_MODEL`

Optional extras:


- `EXTRA_PROMPT`
- `EXTRA_LANGUAGE`
- `EXTRA_MAX_RESULTS`
- `EXTRA_PARTIAL_RESULTS`
- `EXTRA_WEB_SEARCH_ONLY`
- `EXTRA_ORIGIN`

Result extras (returned in the result, not to be specified in the request):


- `EXTRA_RESULTS`
- `EXTRA_CONFIDENCE_SCORES` (optional)


NOTE: There may not be any applications installed to handle this action, so you should
make sure to catch `ActivityNotFoundException`.

Constant Value:

"android.speech.action.WEB\_SEARCH"



### DETAILS\_META\_DATA


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String DETAILS_META_DATA
```

Meta-data name under which an `Activity` implementing `ACTION_WEB_SEARCH` can
use to expose the class name of a `BroadcastReceiver` which can respond to request for
more information, from any of the broadcast intents specified in this class.


Broadcast intents can be directed to the class name specified in the meta-data by creating
an `Intent`, setting the component with
`Intent.setComponent(android.content.ComponentName)`, and using
`Context.sendOrderedBroadcast(Intent,String,BroadcastReceiver,android.os.Handler,int,String,android.os.Bundle)`
with another `BroadcastReceiver` which can receive the results.


The `getVoiceDetailsIntent(Context)` method is provided as a convenience to create
a broadcast intent based on the value of this meta-data, if available.


This is optional and not all `Activity`s which implement `ACTION_WEB_SEARCH`
are required to implement this. Thus retrieving this meta-data may be null.

Constant Value:

"android.speech.DETAILS"



### EXTRA\_AUDIO\_INJECT\_SOURCE


Added in [API level 31](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

Deprecated in
[API level\\
33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_AUDIO_INJECT_SOURCE
```

**This constant was deprecated**
**in API level 33.**

Replaced with `EXTRA_AUDIO_SOURCE`

The extra key used in an intent which is providing an already opened audio source for the
RecognitionService to use. Data should be a URI to an audio resource.



Depending on the recognizer implementation, this value may have no effect.

Constant Value:

"android.speech.extra.AUDIO\_INJECT\_SOURCE"



### EXTRA\_AUDIO\_SOURCE


Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_AUDIO_SOURCE
```

Optional `ParcelFileDescriptor` pointing to an already opened audio
source for the recognizer to use. The caller of the recognizer is responsible for closing
the audio. If this extra is not set or the recognizer does not support this feature, the
recognizer will open the mic for audio and close it when the recognition is finished.



Along with this extra, please send `EXTRA_AUDIO_SOURCE_CHANNEL_COUNT`,
`EXTRA_AUDIO_SOURCE_ENCODING`, and `EXTRA_AUDIO_SOURCE_SAMPLING_RATE`
extras, otherwise the default values of these extras will be used.



Additionally, `EXTRA_ENABLE_BIASING_DEVICE_CONTEXT` may have no effect when this
extra is set.



This can also be used as the string value for `EXTRA_SEGMENTED_SESSION` to
enable segmented session mode. The audio must be passed in using this extra. The
recognition session will end when and only when the audio is closed.

**See also:**

- `EXTRA_SEGMENTED_SESSION`

Constant Value:

"android.speech.extra.AUDIO\_SOURCE"



### EXTRA\_AUDIO\_SOURCE\_CHANNEL\_COUNT


Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_AUDIO_SOURCE_CHANNEL_COUNT
```

Optional integer, to be used with `EXTRA_AUDIO_SOURCE`, to indicate the number of
channels in the audio. The default value is 1.

Constant Value:

"android.speech.extra.AUDIO\_SOURCE\_CHANNEL\_COUNT"



### EXTRA\_AUDIO\_SOURCE\_ENCODING


Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_AUDIO_SOURCE_ENCODING
```

Optional integer (from `AudioFormat`), to be used with
`EXTRA_AUDIO_SOURCE`, to indicate the audio encoding. The default value is
`AudioFormat.ENCODING_PCM_16BIT`.

Constant Value:

"android.speech.extra.AUDIO\_SOURCE\_ENCODING"



### EXTRA\_AUDIO\_SOURCE\_SAMPLING\_RATE


Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_AUDIO_SOURCE_SAMPLING_RATE
```

Optional integer, to be used with `EXTRA_AUDIO_SOURCE`, to indicate the sampling
rate of the audio. The default value is 16000.

Constant Value:

"android.speech.extra.AUDIO\_SOURCE\_SAMPLING\_RATE"



### EXTRA\_BIASING\_STRINGS


Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_BIASING_STRINGS
```

Optional list of strings, towards which the recognizer should bias the recognition results.
These are separate from the device context.

Constant Value:

"android.speech.extra.BIASING\_STRINGS"



### EXTRA\_CALLING\_PACKAGE


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_CALLING_PACKAGE
```

The extra key used in an intent to the speech recognizer for voice search. Not
generally to be used by developers. The system search dialog uses this, for example,
to set a calling package for identification by a voice search API. If this extra
is set by anyone but the system process, it should be overridden by the voice search
implementation.

Constant Value:

"calling\_package"



### EXTRA\_CONFIDENCE\_SCORES


Added in [API level 14](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_CONFIDENCE_SCORES
```

A float array of confidence scores of the recognition results when performing
`ACTION_RECOGNIZE_SPEECH`. The array should be the same size as the ArrayList
returned in `EXTRA_RESULTS`, and should contain values ranging from 0.0 to 1.0,
or -1 to represent an unavailable confidence score.


Confidence values close to 1.0 indicate high confidence (the speech recognizer is
confident that the recognition result is correct), while values close to 0.0 indicate
low confidence.


Returned in the results; not to be specified in the recognition request. This extra is
optional and might not be provided. Only present when `Activity.RESULT_OK` is
returned in an activity result.

Constant Value:

"android.speech.extra.CONFIDENCE\_SCORES"



### EXTRA\_ENABLE\_BIASING\_DEVICE\_CONTEXT


Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_ENABLE_BIASING_DEVICE_CONTEXT
```

Optional boolean to enable biasing towards device context. The recognizer will use the
device context to tune the recognition results.



Depending on the recognizer implementation, this value may have no effect.

Constant Value:

"android.speech.extra.ENABLE\_BIASING\_DEVICE\_CONTEXT"



### EXTRA\_ENABLE\_FORMATTING


Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_ENABLE_FORMATTING
```

Optional string to enable text formatting (e.g. unspoken punctuation (examples: question
mark, comma, period, etc.), capitalization, etc.) and specify the optimization strategy.
If set, the partial and final result texts will be formatted. Each result list will
contain two hypotheses in the order of 1) formatted text 2) raw text.



Depending on the recognizer implementation, this value may have no effect.

**See also:**

- `FORMATTING_OPTIMIZE_QUALITY`
- `FORMATTING_OPTIMIZE_LATENCY`

Constant Value:

"android.speech.extra.ENABLE\_FORMATTING"



### EXTRA\_ENABLE\_LANGUAGE\_DETECTION


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_ENABLE_LANGUAGE_DETECTION
```

Optional boolean indicating whether to enable language detection. When enabled, the
recognizer will consistently identify the language of the current spoken utterance and
provide that info via `RecognitionListener.onLanguageDetection(Bundle)`.



Depending on the recognizer implementation, this flag may have no effect.

Constant Value:

"android.speech.extra.ENABLE\_LANGUAGE\_DETECTION"



### EXTRA\_ENABLE\_LANGUAGE\_SWITCH


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_ENABLE_LANGUAGE_SWITCH
```

Optional string to enable automatic switching to the language being spoken with
the desired sensitivity level, instead of being restricted to a single language.
The corresponding language models must be downloaded to support the switch.
Otherwise, the recognizer will report an error on a switch failure. The recognizer
provides the switch results via `RecognitionListener.onLanguageDetection(Bundle)`.



Since detection is a necessary requirement for the language switching,
setting this value implicitly enables `EXTRA_ENABLE_LANGUAGE_DETECTION`.



Depending on the recognizer implementation, this value may have no effect.

**See also:**

- `LANGUAGE_SWITCH_HIGH_PRECISION`
- `LANGUAGE_SWITCH_BALANCED`
- `LANGUAGE_SWITCH_QUICK_RESPONSE`

Constant Value:

"android.speech.extra.ENABLE\_LANGUAGE\_SWITCH"



### EXTRA\_HIDE\_PARTIAL\_TRAILING\_PUNCTUATION


Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_HIDE_PARTIAL_TRAILING_PUNCTUATION
```

Optional boolean, to be used with `EXTRA_ENABLE_FORMATTING`, to prevent the
recognizer adding punctuation after the last word of the partial results. The default is
false.

Constant Value:

"android.speech.extra.HIDE\_PARTIAL\_TRAILING\_PUNCTUATION"



### EXTRA\_LANGUAGE


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_LANGUAGE
```

Optional IETF language tag (as defined by BCP 47), for example "en-US". This tag informs the
recognizer to perform speech recognition in a language different than the one set in the
`Locale.getDefault()`.

Constant Value:

"android.speech.extra.LANGUAGE"



### EXTRA\_LANGUAGE\_DETECTION\_ALLOWED\_LANGUAGES


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_LANGUAGE_DETECTION_ALLOWED_LANGUAGES
```

Optional list of IETF language tags (as defined by BCP 47, e.g. "en-US", "de-DE").
This extra is to be used with `EXTRA_ENABLE_LANGUAGE_DETECTION`.
If set, the recognizer will constrain the language detection output
to this list of languages, potentially improving detection accuracy.

Constant Value:

"android.speech.extra.LANGUAGE\_DETECTION\_ALLOWED\_LANGUAGES"



### EXTRA\_LANGUAGE\_MODEL


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_LANGUAGE_MODEL
```

Informs the recognizer which speech model to prefer when performing
`ACTION_RECOGNIZE_SPEECH`. The recognizer uses this
information to fine tune the results. This extra is required. Activities implementing
`ACTION_RECOGNIZE_SPEECH` may interpret the values as they see fit.

**See also:**

- `LANGUAGE_MODEL_FREE_FORM`
- `LANGUAGE_MODEL_WEB_SEARCH`

Constant Value:

"android.speech.extra.LANGUAGE\_MODEL"



### EXTRA\_LANGUAGE\_PREFERENCE


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_LANGUAGE_PREFERENCE
```

The key to the extra in the `Bundle` returned by `ACTION_GET_LANGUAGE_DETAILS`
which is a `String` that represents the current language preference this user has
specified - a locale string like "en-US".

Constant Value:

"android.speech.extra.LANGUAGE\_PREFERENCE"



### EXTRA\_LANGUAGE\_SWITCH\_ALLOWED\_LANGUAGES


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_LANGUAGE_SWITCH_ALLOWED_LANGUAGES
```

Optional list of IETF language tags (as defined by BCP 47, e.g. "en-US", "de-DE"). This extra
is to be used with `EXTRA_ENABLE_LANGUAGE_SWITCH`. If set, the recognizer will apply
the auto switch only to these languages, even if the speech models of other languages also
exist. The corresponding language models must be downloaded to support the switch.
Otherwise, the recognizer will report an error on a switch failure.

Constant Value:

"android.speech.extra.LANGUAGE\_SWITCH\_ALLOWED\_LANGUAGES"



### EXTRA\_LANGUAGE\_SWITCH\_INITIAL\_ACTIVE\_DURATION\_TIME\_MILLIS


Added in [API level 35](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_LANGUAGE_SWITCH_INITIAL_ACTIVE_DURATION_TIME_MILLIS
```

Optional integer to use for `EXTRA_ENABLE_LANGUAGE_SWITCH`. If set, the language
switch will only be activated for this value of ms of audio since the START\_OF\_SPEECH. This
could provide a more stable recognition result when the language switch is only required in
the beginning of the session.



Depending on the recognizer implementation, this flag may have no effect.

**See also:**

- `EXTRA_ENABLE_LANGUAGE_SWITCH`

Constant Value:

"android.speech.extra.LANGUAGE\_SWITCH\_INITIAL\_ACTIVE\_DURATION\_TIME\_MILLIS"



### EXTRA\_LANGUAGE\_SWITCH\_MAX\_SWITCHES


Added in [API level 35](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_LANGUAGE_SWITCH_MAX_SWITCHES
```

Optional integer to use for `EXTRA_ENABLE_LANGUAGE_SWITCH`. If set, the language
switch will be deactivated when LANGUAGE\_SWITCH\_MAX\_SWITCHES reached.



Depending on the recognizer implementation, this flag may have no effect.

**See also:**

- `EXTRA_ENABLE_LANGUAGE_SWITCH`

Constant Value:

"android.speech.extra.LANGUAGE\_SWITCH\_MAX\_SWITCHES"



### EXTRA\_MASK\_OFFENSIVE\_WORDS


Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_MASK_OFFENSIVE_WORDS
```

Optional boolean indicating whether the recognizer should mask the offensive words in
recognition results. The Default is true.

Constant Value:

"android.speech.extra.MASK\_OFFENSIVE\_WORDS"



### EXTRA\_MAX\_RESULTS


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_MAX_RESULTS
```

Optional limit on the maximum number of results to return. If omitted the recognizer
will choose how many results to return. Must be an integer.

Constant Value:

"android.speech.extra.MAX\_RESULTS"



### EXTRA\_ONLY\_RETURN\_LANGUAGE\_PREFERENCE


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_ONLY_RETURN_LANGUAGE_PREFERENCE
```

Specify this boolean extra in a broadcast of `ACTION_GET_LANGUAGE_DETAILS` to
indicate that only the current language preference is needed in the response. This
avoids any additional computation if all you need is `EXTRA_LANGUAGE_PREFERENCE`
in the response.

Constant Value:

"android.speech.extra.ONLY\_RETURN\_LANGUAGE\_PREFERENCE"



### EXTRA\_ORIGIN


Added in [API level 14](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_ORIGIN
```

Optional value which can be used to indicate the referer url of a page in which
speech was requested. For example, a web browser may choose to provide this for
uses of speech on a given page.

Constant Value:

"android.speech.extra.ORIGIN"



### EXTRA\_PARTIAL\_RESULTS


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_PARTIAL_RESULTS
```

Optional boolean to indicate whether partial results should be returned by the recognizer
as the user speaks (default is false). The server may ignore a request for partial
results in some or all cases.

Constant Value:

"android.speech.extra.PARTIAL\_RESULTS"



### EXTRA\_PREFER\_OFFLINE


Added in [API level 23](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_PREFER_OFFLINE
```

Optional boolean, to be used with `ACTION_RECOGNIZE_SPEECH`,
`ACTION_VOICE_SEARCH_HANDS_FREE`, `ACTION_WEB_SEARCH` to indicate whether to
only use an offline speech recognition engine. The default is false, meaning that either
network or offline recognition engines may be used.



Depending on the recognizer implementation, these values may have
no effect.

Constant Value:

"android.speech.extra.PREFER\_OFFLINE"



### EXTRA\_PROMPT


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_PROMPT
```

Optional text prompt to show to the user when asking them to speak.

Constant Value:

"android.speech.extra.PROMPT"



### EXTRA\_REQUEST\_WORD\_CONFIDENCE


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_REQUEST_WORD_CONFIDENCE
```

Optional boolean indicating whether the recognizer should return the confidence
level of each word in the final recognition results.

Constant Value:

"android.speech.extra.REQUEST\_WORD\_CONFIDENCE"



### EXTRA\_REQUEST\_WORD\_TIMING


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_REQUEST_WORD_TIMING
```

Optional boolean indicating whether the recognizer should return the timestamp
of each word in the final recognition results.

Constant Value:

"android.speech.extra.REQUEST\_WORD\_TIMING"



### EXTRA\_RESULTS


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_RESULTS
```

An ArrayList<String> of the recognition results when performing
`ACTION_RECOGNIZE_SPEECH`. Generally this list should be ordered in
descending order of speech recognizer confidence. (See `EXTRA_CONFIDENCE_SCORES`).
Returned in the results; not to be specified in the recognition request. Only present
when `Activity.RESULT_OK` is returned in an activity result. In a PendingIntent,
the lack of this extra indicates failure.

Constant Value:

"android.speech.extra.RESULTS"



### EXTRA\_RESULTS\_PENDINGINTENT


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_RESULTS_PENDINGINTENT
```

When the intent is `ACTION_RECOGNIZE_SPEECH`, the speech input activity will
return results to you via the activity results mechanism. Alternatively, if you use this
extra to supply a PendingIntent, the results will be added to its bundle and the
PendingIntent will be sent to its target.

Constant Value:

"android.speech.extra.RESULTS\_PENDINGINTENT"



### EXTRA\_RESULTS\_PENDINGINTENT\_BUNDLE


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_RESULTS_PENDINGINTENT_BUNDLE
```

If you use `EXTRA_RESULTS_PENDINGINTENT` to supply a forwarding intent, you can
also use this extra to supply additional extras for the final intent. The search results
will be added to this bundle, and the combined bundle will be sent to the target.

Constant Value:

"android.speech.extra.RESULTS\_PENDINGINTENT\_BUNDLE"



### EXTRA\_SECURE


Added in [API level 16](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_SECURE
```

Optional boolean to indicate that a "hands free" voice search was performed while the device
was in a secure mode. An example of secure mode is when the device's screen lock is active,
and it requires some form of authentication to be unlocked.

When the device is securely locked, the voice search activity should either restrict
the set of voice actions that are permitted, or require some form of secure authentication
before proceeding.

Constant Value:

"android.speech.extras.EXTRA\_SECURE"



### EXTRA\_SEGMENTED\_SESSION


Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_SEGMENTED_SESSION
```

Optional string to enable segmented session mode of the specified type, which can be
`EXTRA_AUDIO_SOURCE`, `EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS` or
`EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS`. When segmented session mode is
supported by the recognizer implementation and this extra is set, it will return the
recognition results in segments via `RecognitionListener.onSegmentResults(Bundle)`
and terminate the session with `RecognitionListener.onEndOfSegmentedSession()`.



When setting this extra, make sure the extra used as the string value here is also set
in the same intent with proper value.



Depending on the recognizer implementation, this value may have no effect.

**See also:**

- `EXTRA_AUDIO_SOURCE`
- `EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS`
- `EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS`

Constant Value:

"android.speech.extra.SEGMENTED\_SESSION"



### EXTRA\_SPEECH\_INPUT\_COMPLETE\_SILENCE\_LENGTH\_MILLIS


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS
```

The amount of time that it should take after the recognizer stops hearing speech to
consider the input complete hence end the recognition session.



Note that it is extremely rare you'd want to specify this value in an intent.
Generally, it should be specified only when it is also used as the value for
`EXTRA_SEGMENTED_SESSION` to enable segmented session mode. Note also that certain
values may cause undesired or unexpected results - use judiciously!



Depending on the recognizer implementation, these values may have no effect.

Constant Value:

"android.speech.extras.SPEECH\_INPUT\_COMPLETE\_SILENCE\_LENGTH\_MILLIS"



### EXTRA\_SPEECH\_INPUT\_MINIMUM\_LENGTH\_MILLIS


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS
```

Optional integer to indicate the minimum length of the recognition session. The recognizer
will not stop recognizing speech before this amount of time.



Note that it is extremely rare you'd want to specify this value in an intent.
Generally, it should be specified only when it is also used as the value for
`EXTRA_SEGMENTED_SESSION` to enable segmented session mode. Note also that certain
values may cause undesired or unexpected results - use judiciously!



Depending on the recognizer implementation, these values may have no effect.

Constant Value:

"android.speech.extras.SPEECH\_INPUT\_MINIMUM\_LENGTH\_MILLIS"



### EXTRA\_SPEECH\_INPUT\_POSSIBLY\_COMPLETE\_SILENCE\_LENGTH\_MILLIS


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS
```

The amount of time that it should take after we stop hearing speech to consider the input
possibly complete. This is used to prevent the endpointer cutting off during very short
mid-speech pauses.

Note that it is extremely rare you'd want to specify this value in an intent. If
you don't have a very good reason to change these, you should leave them as they are. Note
also that certain values may cause undesired or unexpected results - use judiciously!
Additionally, depending on the recognizer implementation, these values may have no effect.

Constant Value:

"android.speech.extras.SPEECH\_INPUT\_POSSIBLY\_COMPLETE\_SILENCE\_LENGTH\_MILLIS"



### EXTRA\_SUPPORTED\_LANGUAGES


Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_SUPPORTED_LANGUAGES
```

The key to the extra in the `Bundle` returned by `ACTION_GET_LANGUAGE_DETAILS`
which is an `ArrayList` of `String`s that represents the languages supported by
this implementation of voice recognition - a list of strings like "en-US", "cmn-Hans-CN",
etc.

Constant Value:

"android.speech.extra.SUPPORTED\_LANGUAGES"



### EXTRA\_WEB\_SEARCH\_ONLY


Added in [API level 11](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String EXTRA_WEB_SEARCH_ONLY
```

Optional boolean, to be used with `ACTION_WEB_SEARCH`, to indicate whether to
only fire web searches in response to a user's speech. The default is false, meaning
that other types of actions can be taken based on the user's speech.

Constant Value:

"android.speech.extra.WEB\_SEARCH\_ONLY"



### FORMATTING\_OPTIMIZE\_LATENCY


Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String FORMATTING_OPTIMIZE_LATENCY
```

Optimizes formatting latency. This will result in a slightly lower quality of punctuation
but can improve the experience for real-time use cases. This is a value to use for
`EXTRA_ENABLE_FORMATTING`.

**See also:**

- `EXTRA_ENABLE_FORMATTING`

Constant Value:

"latency"



### FORMATTING\_OPTIMIZE\_QUALITY


Added in [API level 33](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String FORMATTING_OPTIMIZE_QUALITY
```

Optimizes formatting quality. This will increase latency but provide the highest
punctuation quality. This is a value to use for `EXTRA_ENABLE_FORMATTING`.

**See also:**

- `EXTRA_ENABLE_FORMATTING`

Constant Value:

"quality"



### LANGUAGE\_MODEL\_FREE\_FORM


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String LANGUAGE_MODEL_FREE_FORM
```

Use a language model based on free-form speech recognition. This is a value to use for
`EXTRA_LANGUAGE_MODEL`.

**See also:**

- `EXTRA_LANGUAGE_MODEL`

Constant Value:

"free\_form"



### LANGUAGE\_MODEL\_WEB\_SEARCH


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String LANGUAGE_MODEL_WEB_SEARCH
```

Use a language model based on web search terms. This is a value to use for
`EXTRA_LANGUAGE_MODEL`.

**See also:**

- `EXTRA_LANGUAGE_MODEL`

Constant Value:

"web\_search"



### LANGUAGE\_SWITCH\_BALANCED


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String LANGUAGE_SWITCH_BALANCED
```

A value to use for `EXTRA_ENABLE_LANGUAGE_SWITCH`.



Enables language switch only when a new language is detected as at least
`SpeechRecognizer.LANGUAGE_DETECTION_CONFIDENCE_LEVEL_CONFIDENT`, which means
the service is balancing between detecting a new language confidently and switching early.

**See also:**

- `EXTRA_ENABLE_LANGUAGE_SWITCH`

Constant Value:

"balanced"



### LANGUAGE\_SWITCH\_HIGH\_PRECISION


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String LANGUAGE_SWITCH_HIGH_PRECISION
```

A value to use for `EXTRA_ENABLE_LANGUAGE_SWITCH`.



Enables language switch only when a new language is detected as
`SpeechRecognizer.LANGUAGE_DETECTION_CONFIDENCE_LEVEL_HIGHLY_CONFIDENT`,
which means the service may wait for longer before switching.

**See also:**

- `EXTRA_ENABLE_LANGUAGE_SWITCH`

Constant Value:

"high\_precision"



### LANGUAGE\_SWITCH\_QUICK\_RESPONSE


Added in [API level 34](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final String LANGUAGE_SWITCH_QUICK_RESPONSE
```

A value to use for `EXTRA_ENABLE_LANGUAGE_SWITCH`.



Enables language switch only when a new language is detected as at least
`SpeechRecognizer.LANGUAGE_DETECTION_CONFIDENCE_LEVEL_NOT_CONFIDENT`,
which means the service should switch at the earliest moment possible.

**See also:**

- `EXTRA_ENABLE_LANGUAGE_SWITCH`

Constant Value:

"quick\_response"



### RESULT\_AUDIO\_ERROR


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int RESULT_AUDIO_ERROR
```

Result code returned when an audio error was encountered

Constant Value:

5
(0x00000005)



### RESULT\_CLIENT\_ERROR


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int RESULT_CLIENT_ERROR
```

Result code returned when there is a generic client error

Constant Value:

2
(0x00000002)



### RESULT\_NETWORK\_ERROR


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int RESULT_NETWORK_ERROR
```

Result code returned when a network error was encountered

Constant Value:

4
(0x00000004)



### RESULT\_NO\_MATCH


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int RESULT_NO_MATCH
```

Result code returned when no matches are found for the given speech

Constant Value:

1
(0x00000001)



### RESULT\_SERVER\_ERROR


Added in [API level 3](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final int RESULT_SERVER_ERROR
```

Result code returned when the recognition server returns an error

Constant Value:

3
(0x00000003)



## Public methods

### getVoiceDetailsIntent

Added in [API level 8](https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels)

```
public static final Intent getVoiceDetailsIntent (Context context)
```

Returns the broadcast intent to fire with
`Context.sendOrderedBroadcast(Intent,String,BroadcastReceiver,android.os.Handler,int,String,Bundle)`
to receive details from the package that implements voice search.


This is based on the value specified by the voice search `Activity` in
`DETAILS_META_DATA`, and if this is not specified, will return null. Also if there
is no chosen default to resolve for `ACTION_WEB_SEARCH`, this will return null.


If an intent is returned and is fired, a `Bundle` of extras will be returned to the
provided result receiver, and should ideally contain values for
`EXTRA_LANGUAGE_PREFERENCE` and `EXTRA_SUPPORTED_LANGUAGES`.


(Whether these are actually provided is up to the particular implementation. It is
recommended that `Activity`s implementing `ACTION_WEB_SEARCH` provide this
information, but it is not required.)

| Parameters |
| --- |
| `context` | `Context`: a context object |

| Returns |
| --- |
| `Intent` | the broadcast intent to fire or null if not available |

Was this helpful?

Content and code samples on this page are subject to the licenses described in the [Content License](https://developer.android.com/license). Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates.

Last updated 2026-02-26 UTC.




\[\[\["Easy to understand","easyToUnderstand","thumb-up"\],\["Solved my problem","solvedMyProblem","thumb-up"\],\["Other","otherUp","thumb-up"\]\],\[\["Missing the information I need","missingTheInformationINeed","thumb-down"\],\["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"\],\["Out of date","outOfDate","thumb-down"\],\["Samples / code issue","samplesCodeIssue","thumb-down"\],\["Other","otherDown","thumb-down"\]\],\["Last updated 2026-02-26 UTC."\],\[\],\[\]\]