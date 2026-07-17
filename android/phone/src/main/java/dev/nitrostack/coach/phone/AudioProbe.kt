package dev.nitrostack.coach.phone

import android.annotation.SuppressLint
import android.content.Context
import android.media.AudioAttributes
import android.media.AudioDeviceInfo
import android.media.AudioFormat
import android.media.AudioManager
import android.media.AudioRecord
import android.media.MediaRecorder
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.cancelAndJoin
import kotlinx.coroutines.currentCoroutineContext
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import okhttp3.WebSocket
import okhttp3.WebSocketListener
import okio.ByteString
import org.json.JSONObject
import java.io.File
import java.io.FileOutputStream
import java.util.Locale

data class AudioProbeState(
    val route: String = "Phone microphone",
    val capturing: Boolean = false,
    val status: String = "Ready",
    val transcript: String = ""
)

class AudioProbe(private val context: Context, private val scope: CoroutineScope) : TextToSpeech.OnInitListener {
    val state = MutableStateFlow(AudioProbeState())
    private val audioManager = context.getSystemService(AudioManager::class.java)
    private val tts = TextToSpeech(context, this)
    private var selectedDevice: AudioDeviceInfo? = null
    private var captureJob: Job? = null
    private var recorder: AudioRecord? = null
    private var socket: WebSocket? = null

    override fun onInit(result: Int) {
        if (result == TextToSpeech.SUCCESS) tts.language = Locale.US
        else state.value = state.value.copy(status = "TTS initialization failed")
        tts.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
            override fun onStart(utteranceId: String?) = Unit
            override fun onError(utteranceId: String?) { if (utteranceId == "phase-zero-resume") resumeAfterTts() }
            override fun onDone(utteranceId: String?) { if (utteranceId == "phase-zero-resume") resumeAfterTts() }
        })
    }

    fun routes(): List<AudioDeviceInfo> = audioManager.availableCommunicationDevices

    fun selectRoute(device: AudioDeviceInfo?) {
        selectedDevice = device
        val routed = device != null && audioManager.setCommunicationDevice(device)
        val name = if (routed) device.productName.toString() else "Phone microphone"
        state.value = state.value.copy(route = name, status = if (routed) "Communication route selected" else "Phone-mic fallback active")
    }

    @SuppressLint("MissingPermission")
    fun startCapture() {
        if (captureJob != null) return
        val sampleRate = 16_000
        val minimum = AudioRecord.getMinBufferSize(sampleRate, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT)
        val format = AudioFormat.Builder()
            .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
            .setSampleRate(sampleRate)
            .setChannelMask(AudioFormat.CHANNEL_IN_MONO)
            .build()
        val newRecorder = AudioRecord.Builder()
            .setAudioSource(MediaRecorder.AudioSource.VOICE_RECOGNITION)
            .setAudioFormat(format)
            .setBufferSizeInBytes(minimum * 2)
            .build()
        selectedDevice?.let(newRecorder::setPreferredDevice)
        recorder = newRecorder
        socket = openTranscriptionSocket()
        val output = File(context.cacheDir, "phase-zero-${System.currentTimeMillis()}.pcm")
        newRecorder.startRecording()
        state.value = state.value.copy(capturing = true, status = "Capturing to ${output.name}")
        captureJob = scope.launch(Dispatchers.IO) {
            FileOutputStream(output).use { file ->
                val buffer = ByteArray(minimum)
                while (currentCoroutineContext().isActive) {
                    val read = newRecorder.read(buffer, 0, buffer.size)
                    if (read > 0) {
                        file.write(buffer, 0, read)
                        socket?.send(ByteString.of(*buffer.copyOf(read)))
                    }
                }
            }
        }
    }

    fun stopCapture(onStopped: (() -> Unit)? = null) {
        val job = captureJob ?: run { onStopped?.invoke(); return }
        captureJob = null
        scope.launch {
            recorder?.stop()
            job.cancelAndJoin()
            recorder?.release()
            recorder = null
            socket?.send("{\"type\":\"Finalize\"}")
            socket?.close(1000, "capture complete")
            socket = null
            state.value = state.value.copy(capturing = false, status = "Capture stopped")
            onStopped?.invoke()
        }
    }

    fun speakProbe() {
        val wasCapturing = captureJob != null
        stopCapture {
            tts.speak(
                "Take a breath. You are ready.",
                TextToSpeech.QUEUE_FLUSH,
                android.os.Bundle().apply {
                    putInt(TextToSpeech.Engine.KEY_PARAM_STREAM, AudioManager.STREAM_MUSIC)
                },
                if (wasCapturing) "phase-zero-resume" else "phase-zero"
            )
            state.value = state.value.copy(status = "Playing TTS through ${state.value.route}")
        }
    }

    private fun resumeAfterTts() {
        scope.launch(Dispatchers.Main) {
            startCapture()
            state.value = state.value.copy(status = "TTS complete; capture resumed")
        }
    }

    private fun openTranscriptionSocket(): WebSocket? {
        if (BuildConfig.DEEPGRAM_API_KEY.isBlank()) {
            state.value = state.value.copy(status = "Capturing locally; DEEPGRAM_API_KEY is missing")
            return null
        }
        val request = Request.Builder()
            .url("wss://api.deepgram.com/v1/listen?model=nova-3&language=en-US&encoding=linear16&sample_rate=16000&channels=1&punctuate=true&interim_results=true")
            .header("Authorization", "Token ${BuildConfig.DEEPGRAM_API_KEY}")
            .build()
        return OkHttpClient().newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: Response) {
                state.value = state.value.copy(status = "Deepgram stream connected")
            }

            override fun onMessage(webSocket: WebSocket, text: String) {
                val json = JSONObject(text)
                if (!json.optBoolean("is_final")) return
                val transcript = json.optJSONObject("channel")
                    ?.optJSONArray("alternatives")?.optJSONObject(0)?.optString("transcript").orEmpty()
                if (transcript.isNotBlank()) state.value = state.value.copy(transcript = transcript, status = "Final transcript received")
            }

            override fun onFailure(webSocket: WebSocket, error: Throwable, response: Response?) {
                state.value = state.value.copy(status = "Transcription failed: ${error.message}")
            }
        })
    }

    fun close() {
        stopCapture()
        audioManager.clearCommunicationDevice()
        tts.shutdown()
    }
}
