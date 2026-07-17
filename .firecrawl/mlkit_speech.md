[Skip to main content](https://developers.google.com/ml-kit/genai/speech-recognition/android#main-content)

[![ML Kit](https://developers.google.com/static/ml-kit/images/MLKit_Icon.png)](https://developers.google.com/ml-kit)

- [ML Kit](https://developers.google.com/ml-kit)

`/`

Language

- [English](https://developers.google.com/ml-kit/genai/speech-recognition/android)
- [Deutsch](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=de)
- [Español](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=es)
- [Español – América Latina](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=es-419)
- [Français](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=fr)
- [Indonesia](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=id)
- [Italiano](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=it)
- [Polski](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=pl)
- [Português – Brasil](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=pt-br)
- [Tiếng Việt](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=vi)
- [Türkçe](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=tr)
- [Русский](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=ru)
- [עברית](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=he)
- [العربيّة](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=ar)
- [فارسی](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=fa)
- [हिंदी](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=hi)
- [বাংলা](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=bn)
- [ภาษาไทย](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=th)
- [中文 – 简体](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=zh-cn)
- [中文 – 繁體](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=zh-tw)
- [日本語](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=ja)
- [한국어](https://developers.google.com/ml-kit/genai/speech-recognition/android?hl=ko)

[Sign in](https://developers.google.com/_d/signin?continue=https%3A%2F%2Fdevelopers.google.com%2Fml-kit%2Fgenai%2Fspeech-recognition%2Fandroid&prompt=select_account)

- [Guides](https://developers.google.com/ml-kit/guides)

- On this page
- [Key capabilities](https://developers.google.com/ml-kit/genai/speech-recognition/android#key-capabilities)
- [Example results](https://developers.google.com/ml-kit/genai/speech-recognition/android#example-results)
- [Comparison with the platform Speech Recognition API](https://developers.google.com/ml-kit/genai/speech-recognition/android#comparison-platform)
- [Get started](https://developers.google.com/ml-kit/genai/speech-recognition/android#get-started)
- [Audio input requirements](https://developers.google.com/ml-kit/genai/speech-recognition/android#audio-input-requirements)
- [Supported languages and devices](https://developers.google.com/ml-kit/genai/speech-recognition/android#supported-languages)
- [Supported devices](https://developers.google.com/ml-kit/genai/speech-recognition/android#supported-devices)
- [Common setup issues](https://developers.google.com/ml-kit/genai/speech-recognition/android#common-setup-issues)
- [Sample code](https://developers.google.com/ml-kit/genai/speech-recognition/android#sample-code)

- [Home](https://developers.google.com/)
- [Products](https://developers.google.com/products)
- [ML Kit](https://developers.google.com/ml-kit)
- [Guides](https://developers.google.com/ml-kit/guides)

Was this helpful?



 Send feedback



# GenAI Speech Recognition API    Stay organized with collections      Save and categorize content based on your preferences.

- On this page
- [Key capabilities](https://developers.google.com/ml-kit/genai/speech-recognition/android#key-capabilities)
- [Example results](https://developers.google.com/ml-kit/genai/speech-recognition/android#example-results)
- [Comparison with the platform Speech Recognition API](https://developers.google.com/ml-kit/genai/speech-recognition/android#comparison-platform)
- [Get started](https://developers.google.com/ml-kit/genai/speech-recognition/android#get-started)
- [Audio input requirements](https://developers.google.com/ml-kit/genai/speech-recognition/android#audio-input-requirements)
- [Supported languages and devices](https://developers.google.com/ml-kit/genai/speech-recognition/android#supported-languages)
- [Supported devices](https://developers.google.com/ml-kit/genai/speech-recognition/android#supported-devices)
- [Common setup issues](https://developers.google.com/ml-kit/genai/speech-recognition/android#common-setup-issues)
- [Sample code](https://developers.google.com/ml-kit/genai/speech-recognition/android#sample-code)

![](https://developers.google.com/static/ml-kit/images/genai/card-speech-recognition.svg)

Within ML Kit's GenAI Speech Recognition API, you can transcribe audio content
to text. This API supports the following modes:

- **Basic**: The Speech Recognition API uses the traditional on-device speech
recognition model, similar to the [SpeechRecognizer API](https://developers.google.com/android/reference/com/google/mlkit/genai/speechrecognition/SpeechRecognizer)
  - Generally available on most Android devices with API level
    31 and higher
- **Advanced**: The Speech Recognition API uses the GenAI model, which produces
broader language coverage and better overall quality

  - Available on Pixel 10 devices, with more devices in development

## Key capabilities

- Captures streaming input from microphone or audio file
- Transcribed text is provided as a continuous stream, which may initially be
partial (and subject to change) before becoming the final content.

## Example results

| Audio | Mode | Locale | Transcription |
| --- | --- | --- | --- |
| audio\_1 | Basic | en-US | "This is a short message" |
| audio\_2 | Advanced | es-ES | "Este es un mensaje corto." |

## Comparison with the platform Speech Recognition API

When using Basic mode, the ML Kit Speech Recognition API offers similar core
functionality to the platform Speech Recognition API. A key advantage of ML Kit
is its support for a wider range of Android platform versions, requiring API
level 31 or higher, which is broader than some platform APIs.

Also, the ML Kit Speech Recognition API uses the on-device Gemini model in
Advanced mode, providing broader language coverage.

## Get started

Add the ML Kit Speech Recognition API as a dependency in your `build.gradle`
configuration

```
implementation("com.google.mlkit:genai-speech-recognition:1.0.0-alpha1")
```

To integrate the Speech Recognition API into your app, create a
`SpeechRecognizer` client. Check the status of the necessary on-device model
features and download the model if it isn't already on the device. After
preparing your audio input in a `SpeechRecognizerRequest`, run inference using
the client to receive streaming output from the [Kotlin flow](https://developers.google.com/kotlin/flow). Finally,
remember to close the client to release resources.

```
// 1. Create a SpeechRecognizer with desired options.
val options: SpeechRecognizerOptions =
    speechRecognizerOptions {
        locale = Locale.US
        preferredMode = SpeechRecognizerOptions.Mode.MODE_ADVANCED
    }
val speechRecognizer: SpeechRecognizer = SpeechRecognition.getClient(options)

// 2. Check if the recognition model is available or needs downloading.
launch {
    val status: Int = speechRecognizer.checkStatus()
    if (status == FeatureStatus.DOWNLOADABLE) {
        // 3. If needed, download the model and monitor progress.
        speechRecognizer.download.collect { downloadStatus ->
            when (downloadStatus) {
                is DownloadStatus.DownloadCompleted -> {
                    // Model is ready, start recognition.
                    startMyRecognition(speechRecognizer)
                }
                is DownloadStatus.DownloadFailed -> {
                    // Handle download failure (e.g., inform the user).
                }
                is DownloadStatus.DownloadProgress -> {
                    // Handle download progress (e.g., update a progress bar).
                }
            }
        }
    } else if (status == FeatureStatus.AVAILABLE) {
        // Model is already ready, start recognition immediately.
        startMyRecognition(speechRecognizer)
    } else {
        // Handle other statuses (e.g., DOWNLOADING, UNAVAILABLE).
    }
}

// 4. Define your recognition logic using a suspend function.
suspend fun startMyRecognition(recognizer: SpeechRecognizer) {
    // Create a request (e.g., specifying audio source).
    val request: SpeechRecognizerRequest
        = speechRecognizerRequest { audioSource = AudioSource.fromMic() }
    // Start recognition and process the continuous stream of responses.
    recognizer.startRecognition(request).collect {
        // Process the SpeechRecognitionResponse data here.
    }
}

// 5. Stop recognition and clean up resources when the session is complete.
launch {
    recognizer.stopRecognition()
    recognizer.close()
}
```

## Audio input requirements

The GenAI Speech Recognition API supports input from the microphone or a custom
source via a file descriptor.

If you use `AudioSource.fromPfd(parcelFileDescriptor)`, the input audio must
meet the following strict requirements:

- **Format**: Raw, headerless 16-bit PCM.
- **Channels**: Mono (single channel).
- **Sample Rate**: 16 kHz.

For most use cases, `AudioSource.fromMic()` is recommended as it handles these
constraints automatically.

## Supported languages and devices

|     |     |
| --- | --- |
| **Mode** | **Locales** |
| Basic | en-US, fr-FR (beta), it-IT (beta), de-DE (beta), es-ES (beta),<br> hi-IN (beta), ja-JP (beta), pt-BR (beta), tr-TR (beta), pl-PL (beta),<br> cmn-Hans-CN (beta), ko-KR (beta), cmn-Hant-TW (beta), ru-RU (beta),<br> vi-VN (beta) |
| Advanced | Locales that typically have high accuracy:<br> en-US, ko-KR, es-ES,<br> fr-FR, de-DE, it-IT, pt-PT, cmn-Hans-CN, cmn-Hant-TW, ja-JP, th-TH,<br> ru-RU, nl-NL (beta), da-DK (beta), sv-SE (beta), pl-PL (beta),<br> hi-IN (beta), vi-VN (beta), id-ID (beta), ar-SA (beta),<br> tr-TR (beta) |

## Supported devices

|     |     |
| --- | --- |
| **Mode** | **Supported Devices** |
| Basic | Android devices using API level 31 and higher. |
| Advanced | Pixel 10 |

## Common setup issues

ML Kit GenAI APIs rely on the Android AICore app to access Gemini Nano. When a device is just setup (including reset), or the AICore app is just reset (e.g. clear data, uninstalled then reinstalled), the AICore app may not have enough time to finish initialization (including downloading latest configurations from server). As a result, the ML Kit GenAI APIs may not function as expected. Here are the common setup error messages you may see and how to handle them:

|     |     |
| --- | --- |
| **Example error message** | **How to handle** |
| AICore failed with error type 4-CONNECTION\_ERROR and error code 601-BINDING\_FAILURE: AICore service failed to bind. | This could happen when you install the app using ML Kit GenAI APIs immediately after device setup or when AICore is uninstalled after your app is installed. Updating AICore app then reinstalling your app should fix it. |
| AICore failed with error type 3-PREPARATION\_ERROR and error code 606-FEATURE\_NOT\_FOUND: Feature ... is not available. | This could happen when AICore hasn't finished downloading the latest configurations. When the device is connected to the internet, it usually takes a few minutes to a few hours to update. Restarting the device can speed up the update.<br> <br> Note that if the device's bootloader is unlocked, you'll also see this error—this API does not support devices with unlocked bootloaders. |
| AICore failed with error type 1-DOWNLOAD\_ERROR and error code 0-UNKNOWN: Feature ... failed with failure status 0 and error esz: UNAVAILABLE: Unable to resolve host ... | Keep network connection, wait for a few minutes and retry. |

## Sample code

- Explore the ML Kit Speech Recognition API code sample on
[GitHub](https://github.com/googlesamples/mlkit/tree/master/android/speech)

Was this helpful?



 Send feedback



Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-07-15 UTC.


Need to tell us more?






\[\[\["Easy to understand","easyToUnderstand","thumb-up"\],\["Solved my problem","solvedMyProblem","thumb-up"\],\["Other","otherUp","thumb-up"\]\],\[\["Missing the information I need","missingTheInformationINeed","thumb-down"\],\["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"\],\["Out of date","outOfDate","thumb-down"\],\["Samples / code issue","samplesCodeIssue","thumb-down"\],\["Other","otherDown","thumb-down"\]\],\["Last updated 2026-07-15 UTC."\],\[\],\[\]\]



Info


Chat


API


## Page info

bug\_reportfullscreenclose\_fullscreenclose

### On this page

- On this page
- [Key capabilities](https://developers.google.com/ml-kit/genai/speech-recognition/android#key-capabilities)
- [Example results](https://developers.google.com/ml-kit/genai/speech-recognition/android#example-results)
- [Comparison with the platform Speech Recognition API](https://developers.google.com/ml-kit/genai/speech-recognition/android#comparison-platform)
- [Get started](https://developers.google.com/ml-kit/genai/speech-recognition/android#get-started)
- [Audio input requirements](https://developers.google.com/ml-kit/genai/speech-recognition/android#audio-input-requirements)
- [Supported languages and devices](https://developers.google.com/ml-kit/genai/speech-recognition/android#supported-languages)
- [Supported devices](https://developers.google.com/ml-kit/genai/speech-recognition/android#supported-devices)
- [Common setup issues](https://developers.google.com/ml-kit/genai/speech-recognition/android#common-setup-issues)
- [Sample code](https://developers.google.com/ml-kit/genai/speech-recognition/android#sample-code)