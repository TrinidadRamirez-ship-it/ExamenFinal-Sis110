package com.sicjac.backend.estudiante;

public record EstudianteResponse(
        Long id,
        String nombre,
        String apellido,
        String email,
        String codigo,
        Integer edad,
        Integer semestre,
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
