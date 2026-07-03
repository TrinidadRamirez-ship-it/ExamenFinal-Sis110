package com.sicjac.backend.exception;

import java.time.Instant;

public record ApiErrorResponse(
        Instant timestamp,
        String mensaje,
        int estado,
        Object detalles
) {
}
