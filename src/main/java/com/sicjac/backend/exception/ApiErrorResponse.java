package com.sicjac.backend.exception;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;

public record ApiErrorResponse(
        @Schema(example = "2026-07-03T18:30:00Z")
        Instant timestamp,

        @Schema(example = "Uno o mas campos tienen valores invalidos.")
        String mensaje,

        @Schema(example = "400")
        int estado,

        @Schema(example = "{\"email\":\"El correo electronico debe tener un formato valido.\"}")
        Object detalles
) {
}
