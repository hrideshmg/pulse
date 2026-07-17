package dev.nitrostack.coach.phone

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.IBinder
import androidx.core.content.ContextCompat

class TranscriptionService : Service() {
    private var foregroundStarted = false

    override fun onCreate() {
        super.onCreate()
        val manager = getSystemService(NotificationManager::class.java)
        manager.createNotificationChannel(NotificationChannel(
            CHANNEL_ID,
            "Pulse transcription",
            NotificationManager.IMPORTANCE_LOW
        ))
        val notification = Notification.Builder(this, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_btn_speak_now)
            .setContentTitle("Pulse session active")
            .setContentText("Transcribing microphone audio")
            .setOngoing(true)
            .build()
        runCatching {
            startForeground(NOTIFICATION_ID, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_MICROPHONE)
        }.onSuccess {
            foregroundStarted = true
        }.onFailure {
            PulseApplication.pipeline(this).reportMessage("Android blocked microphone service: ${it.message}")
            stopSelf()
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (!foregroundStarted) return START_NOT_STICKY
        val application = PulseApplication.instance(this)
        runCatching {
            application.audioProbe.startCapture(application.vitalPipeline.currentSessionElapsedMs())
        }.onFailure {
            application.vitalPipeline.reportMessage("Unable to start transcription: ${it.message}")
            stopSelf()
        }
        return START_NOT_STICKY
    }

    override fun onDestroy() {
        PulseApplication.instance(this).audioProbe.stopCapture()
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    companion object {
        private const val CHANNEL_ID = "pulse-transcription"
        private const val NOTIFICATION_ID = 1001

        fun start(context: Context): Boolean = runCatching {
            ContextCompat.startForegroundService(context, Intent(context, TranscriptionService::class.java))
        }.isSuccess

        fun stop(context: Context) {
            context.stopService(Intent(context, TranscriptionService::class.java))
        }
    }
}
