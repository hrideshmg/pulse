package dev.nitrostack.coach.phone

import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class VitalPipelineTest {
    @Test
    fun readingBecomesStaleAfterTenSeconds() {
        assertFalse(isReadingStale(receivedAtEpochMs = 1_000, nowEpochMs = 11_000))
        assertTrue(isReadingStale(receivedAtEpochMs = 1_000, nowEpochMs = 11_001))
        assertTrue(isReadingStale(receivedAtEpochMs = null, nowEpochMs = 1_000))
    }
}
