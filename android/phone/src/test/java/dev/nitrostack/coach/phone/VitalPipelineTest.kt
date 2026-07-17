package dev.nitrostack.coach.phone

import org.junit.Assert.assertFalse
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class VitalPipelineTest {
    @Test
    fun readingBecomesStaleAfterTenSeconds() {
        assertFalse(isReadingStale(receivedAtEpochMs = 1_000, nowEpochMs = 11_000))
        assertTrue(isReadingStale(receivedAtEpochMs = 1_000, nowEpochMs = 11_001))
        assertTrue(isReadingStale(receivedAtEpochMs = null, nowEpochMs = 1_000))
    }

    @Test
    fun staleReadingDoesNotDisplayTheOldBpm() {
        assertEquals(
            "No live heart-rate reading - STALE - watch",
            heartRateDisplay(bpm = 82.0, stale = true, source = "watch")
        )
        assertEquals("82 BPM - LIVE - watch", heartRateDisplay(82.9, stale = false, source = "watch"))
    }

    @Test
    fun vitalOrderingUsesTimestampWhenElapsedTimesMatch() {
        assertFalse(shouldApplyVitalUpdate(1_000, "2026-01-01T00:00:00Z", 1_000, "2026-01-01T00:00:01Z"))
        assertTrue(shouldApplyVitalUpdate(1_000, "2026-01-01T00:00:02Z", 1_000, "2026-01-01T00:00:01Z"))
        assertTrue(shouldApplyVitalUpdate(1_001, "2026-01-01T00:00:00Z", 1_000, "2026-01-01T00:00:01Z"))
    }
}
