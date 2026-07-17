[Skip to main content](https://docs.cloud.google.com/speech-to-text/docs/quotas#main-content)

[![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/v7669de8735de7fa899c49c793af6b01f3bfef3435bb66621d079ef252c528b54/clouddocs/images/lockup_full_color.svg)](https://docs.cloud.google.com/)

`/`

[Console](https://console.cloud.google.com/)Language

- [English](https://docs.cloud.google.com/speech-to-text/docs/quotas)
- [Deutsch](https://docs.cloud.google.com/speech-to-text/docs/quotas?hl=de)
- [Español](https://docs.cloud.google.com/speech-to-text/docs/quotas?hl=es)
- [Español – América Latina](https://docs.cloud.google.com/speech-to-text/docs/quotas?hl=es-419)
- [Français](https://docs.cloud.google.com/speech-to-text/docs/quotas?hl=fr)
- [Indonesia](https://docs.cloud.google.com/speech-to-text/docs/quotas?hl=id)
- [Italiano](https://docs.cloud.google.com/speech-to-text/docs/quotas?hl=it)
- [Português](https://docs.cloud.google.com/speech-to-text/docs/quotas?hl=pt)
- [Português – Brasil](https://docs.cloud.google.com/speech-to-text/docs/quotas?hl=pt-br)
- [עברית](https://docs.cloud.google.com/speech-to-text/docs/quotas?hl=he)
- [中文 – 简体](https://docs.cloud.google.com/speech-to-text/docs/quotas?hl=zh-cn)
- [中文 – 繁體](https://docs.cloud.google.com/speech-to-text/docs/quotas?hl=zh-tw)
- [日本語](https://docs.cloud.google.com/speech-to-text/docs/quotas?hl=ja)
- [한국어](https://docs.cloud.google.com/speech-to-text/docs/quotas?hl=ko)

[Sign in](https://docs.cloud.google.com/_d/signin?continue=https%3A%2F%2Fdocs.cloud.google.com%2Fspeech-to-text%2Fdocs%2Fquotas&prompt=select_account)

[![](https://docs.cloud.google.com/_static/clouddocs/images/icons/categories/ai-and-machine-learning-color.svg)](https://docs.cloud.google.com/speech-to-text/docs)

- [Cloud Speech-to-Text](https://docs.cloud.google.com/speech-to-text/docs)

[Start free](https://console.cloud.google.com/freetrial)

- On this page
- [Content limits](https://docs.cloud.google.com/speech-to-text/docs/quotas#content)
  - [Synchronous requests](https://docs.cloud.google.com/speech-to-text/docs/quotas#synchronous_requests)
  - [Streaming requests](https://docs.cloud.google.com/speech-to-text/docs/quotas#streaming_requests)
  - [Batch requests](https://docs.cloud.google.com/speech-to-text/docs/quotas#batch_requests)
  - [Multiple language recognition](https://docs.cloud.google.com/speech-to-text/docs/quotas#multiple_language_recognition)
  - [Adaptation](https://docs.cloud.google.com/speech-to-text/docs/quotas#adaptation)
- [Resource limits](https://docs.cloud.google.com/speech-to-text/docs/quotas#resource_limits)
- [Request limits](https://docs.cloud.google.com/speech-to-text/docs/quotas#request_limits)

- [Home](https://docs.cloud.google.com/)
- [Documentation](https://docs.cloud.google.com/docs)
- [AI and ML](https://docs.cloud.google.com/docs/ai-ml)
- [Cloud Speech-to-Text](https://docs.cloud.google.com/speech-to-text/docs)

Was this helpful?



 Send feedback



# Quotas and limits    Stay organized with collections      Save and categorize content based on your preferences.

- On this page
- [Content limits](https://docs.cloud.google.com/speech-to-text/docs/quotas#content)
  - [Synchronous requests](https://docs.cloud.google.com/speech-to-text/docs/quotas#synchronous_requests)
  - [Streaming requests](https://docs.cloud.google.com/speech-to-text/docs/quotas#streaming_requests)
  - [Batch requests](https://docs.cloud.google.com/speech-to-text/docs/quotas#batch_requests)
  - [Multiple language recognition](https://docs.cloud.google.com/speech-to-text/docs/quotas#multiple_language_recognition)
  - [Adaptation](https://docs.cloud.google.com/speech-to-text/docs/quotas#adaptation)
- [Resource limits](https://docs.cloud.google.com/speech-to-text/docs/quotas#resource_limits)
- [Request limits](https://docs.cloud.google.com/speech-to-text/docs/quotas#request_limits)






This document contains the current API restrictions and usage limits for
Cloud Speech-to-Text. This page will be updated to reflect any changes to these
restrictions and usage limits. We reserve the right to change these limits.

You can [request a quota\\
increase](https://docs.cloud.google.com/docs/quotas/help/request_increase) if
necessary. See the Google Cloud [quota page](https://docs.cloud.google.com/docs/quota) for more
information on viewing and managing your quota.

After submitting your request, Google might contact you for more information,
and inform you whether your request is approved or denied.

## Content limits

### Synchronous requests

Synchronous recognition requests (using the [`Recognize`](https://docs.cloud.google.com/speech-to-text/docs/reference/rpc/google.cloud.speech.v2#google.cloud.speech.v2.Speech.Recognize) method) accept audio data either inline in the
[`content`](https://docs.cloud.google.com/speech-to-text/docs/reference/rpc/google.cloud.speech.v2#google.cloud.speech.v2.RecognizeRequest.FIELDS.bytes.google.cloud.speech.v2.RecognizeRequest.content) field of the request or as a [Cloud Storage URI](https://docs.cloud.google.com/storage/docs/reference-uris) in the [`uri`](https://docs.cloud.google.com/speech-to-text/docs/reference/rpc/google.cloud.speech.v2#google.cloud.speech.v2.RecognizeRequest.FIELDS.string.google.cloud.speech.v2.RecognizeRequest.uri) field of the request. Audio sent to a synchronous
request is limited to 10 MB or 1 minute of audio duration (whichever is reached
first). For more information on synchronous recognition, see the [synchronous\\
recognition overview](https://docs.cloud.google.com/speech-to-text/docs/sync-recognize).

### Streaming requests

Streaming recognition requests (using the [`StreamingRecognize`](https://docs.cloud.google.com/speech-to-text/docs/reference/rpc/google.cloud.speech.v2#google.cloud.speech.v2.Speech.StreamingRecognize) method) only accept inline audio in the
[`audio`](https://docs.cloud.google.com/speech-to-text/docs/reference/rpc/google.cloud.speech.v2#google.cloud.speech.v2.StreamingRecognizeRequest.FIELDS.bytes.google.cloud.speech.v2.StreamingRecognizeRequest.audio) field of the request. Each request
in the stream is limited to 25 KB of audio. A stream can remain open for up to 5
minutes, and the audio must be sent at a rate that approximates real time. If
you need to stream content for longer than 5 minutes, see the [endless streaming\\
tutorial](https://docs.cloud.google.com/speech-to-text/docs/endless-streaming-tutorial). For more information on streaming
recognition, see the [streaming recognition overview](https://docs.cloud.google.com/speech-to-text/docs/streaming-recognize).

### Batch requests

Batch recognition requests (using the [`BatchRecognize`](https://docs.cloud.google.com/speech-to-text/docs/reference/rpc/google.cloud.speech.v2#google.cloud.speech.v2.Speech.BatchRecognize) method) only accept audio as a [Cloud Storage\\
URI](https://docs.cloud.google.com/storage/docs/reference-uris) in the [`uri`](https://docs.cloud.google.com/speech-to-text/docs/reference/rpc/google.cloud.speech.v2#google.cloud.speech.v2.BatchRecognizeFileMetadata.FIELDS.string.google.cloud.speech.v2.BatchRecognizeFileMetadata.uri) field
of the request. Each [`BatchRecognizeRequest`](https://docs.cloud.google.com/speech-to-text/docs/reference/rpc/google.cloud.speech.v2#batchrecognizerequest)
can contain up to 5 [`files`](https://docs.cloud.google.com/speech-to-text/docs/reference/rpc/google.cloud.speech.v2#google.cloud.speech.v2.BatchRecognizeRequest.FIELDS.repeated.google.cloud.speech.v2.BatchRecognizeFileMetadata.google.cloud.speech.v2.BatchRecognizeRequest.files) to transcribe (best practice is to use 1 file per request, to be able to poll a separate operation ID for each file). This limit in the past used to be 15 files per request, and in the future it will be reduced down to 1 file per request.
Each file can be up to 8 hours in duration. For more information on asynchronous
recognition, see the [batch recognition overview](https://docs.cloud.google.com/speech-to-text/docs/batch-recognize).

### Multiple language recognition

Multiple language recognition is only available in the global, US, and EU
Cloud Speech-to-Text endpoints.

### Adaptation

Within any request, you may also supply [`PhraseSet` and `CustomClass`](https://docs.cloud.google.com/speech-to-text/docs/adaptation-model) resources. The following limits apply to these
resources:

| Speech Adaptation Limit | Value |
| --- | --- |
| Maximum allowable phrase boost value | 20 |
| Phrases in a PhraseSet | 1,200 |
| Phrases per request | 5,000 |
| Characters per phrase | 100 |
| Total characters per request | 100,000 |
| Maximum number of items in a CustomClass | 500 |
| Maximum characters per CustomClass item | 500 |
| Maximum number of PhraseSets per SpeechAdaptation | 20 |
| Maximum number of CustomClasses per SpeechAdaptation | 20 |

## Resource limits

The current API resource limits for Cloud Speech-to-Text are as follows (and are
subject to change):

| Type of Limit | Usage Limit |
| --- | --- |
| Number of recognizers (per region) | 5,000 |
| Number of custom classes (per region) | 5,000 |
| Number of phrase sets (per region) | 5,000 |

## Request limits

The current API usage limits for Cloud Speech-to-Text are as follows (and are subject
to change):

| Type of Limit | Usage Limit |
| --- | --- |
| Resource requests per 60 seconds (per region) | 100 |
| Operation requests per 60 seconds (per region) | 150 |
| Synchronous recognition requests per 60 seconds (per region) | 300 |
| Streaming recognition requests per 60 seconds (per region) \* | 1,000,000 |
| Concurrent StreamingRecognize sessions (per region) \* | 300 |
| Batch recognition requests per 60 seconds (per region) | 150 |

\\* Streaming recognition has a quota limit of 300 concurrent sessions per 5
minutes and a limit of 3,000 requests per minute, which applies to all
concurrent sessions together. The initial configuration request for a session
does not count against the request quota.

These limits apply to each Cloud Speech-to-Text developer project, and are shared
across all applications and IP addresses using a given a developer project.

Was this helpful?



 Send feedback



Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-07-10 UTC.


Need to tell us more?






\[\[\["Easy to understand","easyToUnderstand","thumb-up"\],\["Solved my problem","solvedMyProblem","thumb-up"\],\["Other","otherUp","thumb-up"\]\],\[\["Hard to understand","hardToUnderstand","thumb-down"\],\["Incorrect information or sample code","incorrectInformationOrSampleCode","thumb-down"\],\["Missing the information/samples I need","missingTheInformationSamplesINeed","thumb-down"\],\["Other","otherDown","thumb-down"\]\],\["Last updated 2026-07-10 UTC."\],\[\],\[\]\]