package com.sicjac.backend.estudiante;

import io.swagger.v3.oas.annotations.media.Schema;

public record EstudianteResponse(
        @Schema(example = "1")
        Long id,

        @Schema(example = "Ana")
        String nombre,

        @Schema(example = "Rojas")
        String apellido,

        @Schema(example = "ana.rojas@example.com")
        String email,

        @Schema(example = "SIS-1001")
        String codigo,

        @Schema(example = "20")
        Integer edad,

        @Schema(example = "4")
        Integer semestre,

        @Schema(example = "Ingenieria de Sistemas")
        String carrera
) {

    public static EstudianteResponse fromEntity(Estudiante estudiante) {
        return new EstudianteResponse(
                estudiante.getId(),
                estudiante.getNombre(),
                estudiante.getApellido(),
                estudiante.getEmail(),
                estudiante.getCodigo(),
                estudiante.getEdad(),
                estudiante.getSemestre(),
                estudiante.getCarrera()
        );
    }
}
