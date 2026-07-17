package dev.nitrostack.coach.watch

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.os.SystemClock
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.core.content.ContextCompat
import androidx.health.services.client.HealthServices
import androidx.health.services.client.MeasureCallback
import androidx.health.services.client.data.Availability
import androidx.health.services.client.data.DataPointContainer
import androidx.health.services.client.data.DataType
import androidx.health.services.client.data.DeltaDataType
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.wear.compose.material3.MaterialTheme
import androidx.wear.compose.material3.Button
import androidx.wear.compose.material3.Text
import com.google.android.gms.wearable.PutDataMapRequest
import com.google.android.gms.wearable.Wearable
import dev.nitrostack.pulse.contracts.PulseContract
import dev.nitrostack.pulse.contracts.PulseDataLayer
import dev.nitrostack.pulse.contracts.PulseLog
import kotlinx.coroutines.awaitCancellation
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.time.Instant
import java.util.UUID

data class HeartRateState(
    val bpm: Double? = null,
    val availability: String = "unknown",
    val sensorSupported: Boolean? = null
)

class MainActivity : ComponentActivity() {
    private val heartRate = MutableStateFlow(HeartRateState())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        WatchStateStore.restore(this)
        setContent { MaterialTheme { VitalsScreen() } }
    }

    @Composable
    private fun VitalsScreen() {
        val reading by heartRate.collectAsStateWithLifecycle()
        val bridge by WatchStateStore.state.collectAsStateWithLifecycle()
        var permitted by remember {
            mutableStateOf(ContextCompat.checkSelfPermission(this, Manifest.permission.BODY_SENSORS) == PackageManager.PERMISSION_GRANTED)
        }
        val permission = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { permitted = it }

        LaunchedEffect(Unit) {
            if (!permitted) permission.launch(Manifest.permission.BODY_SENSORS)
            while (true) {
                val connected = Wearable.getNodeClient(this@MainActivity).connectedNodes.await().isNotEmpty()
                WatchStateStore.updateConnection(phoneConnected = connected)
                delay(2_000)
            }
        }
        if (permitted && bridge.sessionStatus in setOf("calibrating", "active")) {
            HeartRateMeasurement()
        }

        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(reading.bpm?.let { "${it.toInt()} BPM" } ?: "-- BPM", style = MaterialTheme.typography.titleLarge)
            Text(if (permitted) availabilityLabel(reading) else "Sensor permission required")
            Text("Phone ${if (bridge.phoneConnected) "connected" else "offline"}")
            Text("Backend ${if (bridge.backendConnected) "connected" else "offline"}")
            Text("Session ${bridge.sessionStatus}")
            if (bridge.pendingEvents > 0) Text("${bridge.pendingEvents} reading(s) queued")
            Button(
                onClick = { sendSessionAction(if (bridge.sessionStatus in setOf("calibrating", "active")) "end" else "start") },
                enabled = bridge.phoneConnected
            ) {
                Text(if (bridge.sessionStatus in setOf("calibrating", "active")) "End session" else "Start session")
            }
        }
    }

    @Composable
    private fun HeartRateMeasurement() {
        val measureClient = remember { HealthServices.getClient(this).measureClient }
        val callback = remember {
            object : MeasureCallback {
                override fun onAvailabilityChanged(dataType: DeltaDataType<*, *>, availability: Availability) {
                    if (dataType != DataType.HEART_RATE_BPM) return
                    val normalized = normalizeAvailability(availability)
                    heartRate.value = heartRate.value.copy(availability = normalized)
                    sendAvailability(normalized)
                }

                override fun onDataReceived(data: DataPointContainer) {
                    val bpm = data.getData(DataType.HEART_RATE_BPM).lastOrNull()?.value ?: return
                    heartRate.value = HeartRateState(bpm, "available", true)
                    sendReading(bpm)
                }
            }
        }

        LaunchedEffect(measureClient, callback) {
            val capabilities = try {
                withContext(Dispatchers.IO) { measureClient.getCapabilitiesAsync().get() }
            } catch (_: Exception) {
                heartRate.value = heartRate.value.copy(sensorSupported = false, availability = "unavailable")
                sendAvailability("unavailable")
                return@LaunchedEffect
            }
            val supported = DataType.HEART_RATE_BPM in capabilities.supportedDataTypesMeasure
            heartRate.value = heartRate.value.copy(sensorSupported = supported)
            if (!supported) {
                heartRate.value = heartRate.value.copy(availability = "unavailable")
                sendAvailability("unavailable")
                return@LaunchedEffect
            }
            try {
                measureClient.registerMeasureCallback(DataType.HEART_RATE_BPM, callback)
                awaitCancellation()
            } finally {
                measureClient.unregisterMeasureCallbackAsync(DataType.HEART_RATE_BPM, callback)
            }
        }
    }

    private fun sendReading(bpm: Double) {
        val bridge = WatchStateStore.state.value
        val sessionId = bridge.sessionId ?: return
        if (!bridge.sessionClockSynchronized) return
        val eventId = UUID.randomUUID().toString()
        val event = PulseContract.envelope(
            type = "heart_rate_sample",
            sessionId = sessionId,
            eventId = eventId,
            payload = JSONObject()
                .put("sessionId", sessionId)
                .put("bpm", bpm)
                .put("availability", "available")
                .put("sessionElapsedMs", sessionElapsedMs(bridge))
                .put("deviceTimestamp", Instant.now().toString())
                .put("source", "watch")
        )
        putVitalEvent(eventId, event)
    }

    private fun sendAvailability(availability: String) {
        val bridge = WatchStateStore.state.value
        val sessionId = bridge.sessionId ?: return
        if (!bridge.sessionClockSynchronized) return
        val eventId = UUID.randomUUID().toString()
        val event = PulseContract.envelope(
            type = "heart_rate_availability",
            sessionId = sessionId,
            eventId = eventId,
            payload = JSONObject()
                .put("availability", availability)
                .put("sessionElapsedMs", sessionElapsedMs(bridge))
        )
        putVitalEvent(eventId, event)
    }

    private fun putVitalEvent(eventId: String, event: JSONObject) {
        val request = PutDataMapRequest.create(PulseDataLayer.vitalEventPath(eventId)).apply {
            dataMap.putString(PulseDataLayer.EVENT_JSON, event.toString())
        }.asPutDataRequest().setUrgent()
        Wearable.getDataClient(this).putDataItem(request).addOnSuccessListener {
            WatchStateStore.addPending(this, eventId)
            PulseLog.boundary("watch", "watch_to_phone", event, "Queued vital event")
        }
    }

    private fun sendSessionAction(action: String) {
        val eventId = UUID.randomUUID().toString()
        val event = PulseContract.envelope(
            type = "session_action",
            sessionId = WatchStateStore.state.value.sessionId ?: "watch-request-$eventId",
            eventId = eventId,
            payload = JSONObject().put("action", action)
        )
        val request = PutDataMapRequest.create(PulseDataLayer.sessionActionPath(eventId)).apply {
            dataMap.putString(PulseDataLayer.EVENT_JSON, event.toString())
        }.asPutDataRequest().setUrgent()
        Wearable.getDataClient(this).putDataItem(request).addOnSuccessListener {
            WatchStateStore.addPending(this, eventId)
            PulseLog.boundary("watch", "watch_to_phone", event, "Queued session action")
        }
    }

    private fun sessionElapsedMs(state: WatchState) =
        (SystemClock.elapsedRealtime() - state.sessionStartElapsedRealtimeMs).coerceAtLeast(0)

    private fun availabilityLabel(state: HeartRateState) = when (state.sensorSupported) {
        false -> "Heart rate unsupported"
        null -> "Checking sensor"
        true -> "Sensor ${state.availability.replace('_', ' ')}"
    }

    private fun normalizeAvailability(value: Availability): String {
        val text = value.toString().lowercase()
        return when {
            "acquir" in text -> "acquiring"
            "unavailable" in text -> "unavailable"
            "available" in text -> "available"
            else -> "unknown"
        }
    }
}
