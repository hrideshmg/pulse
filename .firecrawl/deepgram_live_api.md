For AI agents: a documentation index is available at the root level at /llms.txt. Append /llms.txt to any URL for a page-level index, or .md for the markdown version of any page.

Transcribe audio and video using Deepgram’s speech-to-text WebSocket

## Handshake [Try it](https://playground.deepgram.com/)

WSS

wss://api.deepgram.com/v1/listen

### Authentication

AuthorizationToken

Use `Authorization: Token <API_KEY>`
Example: `Authorization: Token 12345abcdef`

OR

AuthorizationBearer

Use `Authorization: Bearer <JWT>`
Example: `Authorization: Bearer eyJhbGciOiJ...`

### Headers

AuthorizationstringRequired

Use your API key or a [temporary token](https://developers.deepgram.com/guides/fundamentals/token-based-authentication) for authentication via the `Authorization` header. In client-side environments where custom headers are not supported, use the [`Sec-WebSocket-Protocol`](https://developers.deepgram.com/guides/deep-dives/using-the-sec-websocket-protocol) header instead.

**Example:**`Authorization: Token %DEEPGRAM_API_KEY%` or `Authorization: Bearer %DEEPGRAM_TOKEN%`

### Query parameters

callbackanyOptional

URL to which we'll make the callback request

callback\_methodenumOptionalDefaults to `POST`

HTTP method by which the callback request will be made

Allowed values:POSTGETPUTDELETE

channelsanyOptionalDefaults to `1`

The number of channels in the submitted audio

detect\_entitiesenumOptionalDefaults to `false`

Identifies and extracts key entities from content in submitted audio. Entities appear in final results. When enabled, Punctuation will also be enabled by default

Allowed values:truefalse

diarizeenumOptionalDefaults to `false`Deprecated

Deprecated: use `diarize_model` instead. Recognize speaker changes. Each word in the transcript will be assigned a speaker number starting at 0.

Allowed values:truefalse

diarize\_modelenumOptional

Select and enable a specific diarization model version. Specifying this parameter enables diarization and selects the model — you do not need to also set `diarize=true`. Supported values for streaming: `v1`, `latest`. The `v2` value is not supported on streaming and returns a validation error.

Allowed values:latestv1

dictationenumOptionalDefaults to `false`

Identify and extract key entities from content in submitted audio

Allowed values:truefalse

encodingenumOptional

Specify the expected encoding of your submitted audio

Show 11 enum values

endpointinganyOptionalDefaults to `10`

Indicates how long Deepgram will wait to detect whether a speaker has finished speaking or pauses for a significant period of time. When set to a value, the streaming endpoint immediately finalizes the transcription for the processed time range and returns the transcript with a speech\_final parameter set to true. Can also be set to false to disable endpointing

extraanyOptional

Arbitrary key-value pairs that are attached to the API response for usage in downstream processing

interim\_resultsenumOptionalDefaults to `false`

Specifies whether the streaming endpoint should provide ongoing transcription updates as more audio is received. When set to true, the endpoint sends continuous updates, meaning transcription results may evolve over time

Allowed values:truefalse

keytermanyOptional

Key term prompting can boost specialized terminology and brands. Only compatible with Nova-3

keywordsanyOptional

Keywords can boost or suppress specialized terminology and brands

languageanyOptionalDefaults to `en`

The [BCP-47 language tag](https://tools.ietf.org/html/bcp47) that hints at the primary spoken language. Depending on the Model you choose only certain languages are available

mip\_opt\_outanyOptionalDefaults to `false`

Opts out requests from the Deepgram Model Improvement Program. Refer to our Docs for pricing impacts before setting this to true. [https://dpgr.am/deepgram-mip](https://dpgr.am/deepgram-mip)

modelenumRequired

AI model to use for the transcription

Show 30 enum values

multichannelenumOptionalDefaults to `false`

Transcribe each audio channel independently

Allowed values:truefalse

numeralsenumOptionalDefaults to `false`

Convert numbers from written format to numerical format

Allowed values:truefalse

profanity\_filterenumOptionalDefaults to `false`

Profanity Filter looks for recognized profanity and converts it to the nearest recognized non-profane word or removes it from the transcript completely

Allowed values:truefalse

punctuateenumOptionalDefaults to `false`

Add punctuation and capitalization to the transcript

Allowed values:truefalse

redactenumOptionalDefaults to `false`

Redaction removes sensitive information from your transcripts

Show 6 enum values

replaceanyOptional

Search for terms or phrases in submitted audio and replaces them

sample\_rateanyOptional

Sample rate of submitted audio. Required (and only read) when a value is provided for encoding

searchanyOptional

Search for terms or phrases in submitted audio

smart\_formatenumOptionalDefaults to `false`

Apply formatting to transcript output. When set to true, additional formatting will be applied to transcripts to improve readability

Allowed values:truefalse

taganyOptional

Label your requests for the purpose of identification during usage reporting

utterance\_end\_msanyOptional

Indicates how long Deepgram will wait to send an UtteranceEnd message after a word has been transcribed. Use with interim\_results

vad\_eventsenumOptionalDefaults to `false`

Indicates that speech has started. You'll begin receiving Speech Started messages upon speech starting

Allowed values:truefalse

versionanyOptionalDefaults to `latest`

Version of an AI model to use

### Send

ListenV1MediastringRequired`format: "binary"`

Send audio or video data to be transcribed

OR

ListenV1FinalizeobjectRequired

Send a Finalize message to flush the WebSocket stream

OR

ListenV1CloseStreamobjectRequired

Send a CloseStream message to close the WebSocket stream

OR

ListenV1KeepAliveobjectRequired

Send a KeepAlive message to keep the WebSocket stream alive

### Receive

ListenV1ResultsobjectRequired

Receive transcription results

OR

ListenV1MetadataobjectRequired

Receive metadata about the transcription

OR

ListenV1UtteranceEndobjectRequired

Receive an utterance end event

OR

ListenV1SpeechStartedobjectRequired

Receive a speech started event