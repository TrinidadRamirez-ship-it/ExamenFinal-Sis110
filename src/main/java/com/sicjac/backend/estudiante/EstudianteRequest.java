package com.sicjac.backend.estudiante;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record EstudianteRequest(
        @NotBlank(message = "El nombre es obligatorio.")
        @Size(min = 2, max = 80, message = "El nombre debe tener entre 2 y 80 caracteres.")
        String nombre,

        @NotBlank(message = "El apellido es obligatorio.")
        @Size(min = 2, max = 80, message = "El apellido debe tener entre 2 y 80 caracteres.")
        String apellido,

        @NotBlank(message = "El correo electronico es obligatorio.")
        @Email(message = "El correo electronico debe tener un formato valido.")
        @Size(max = 120, message = "El correo electronico no debe superar 120 caracteres.")
        String email,

        @NotBlank(message = "El codigo de estudiante es obligatorio.")
        @Pattern(regexp = "^[A-Z]{3}-\\d{4}$", message = "El codigo debe tener el formato ABC-1234.")
        String codigo,

        @NotNull(message = "La edad es obligatoria.")
        @Min(value = 16, message = "La edad minima permitida es 16.")
        @Max(value = 80, message = "La edad maxima permitida es 80.")
        Integer edad,

        @NotNull(message = "El semestre es obligatorio.")
        @Min(value = 1, message = "El semestre minimo es 1.")
        @Max(value = 10, message = "El semestre maximo es 10.")
        Integer semestre,

        @NotBlank(message = "La carrera es obligatoria.")
        @Size(min = 3, max = 60, message = "La carrera debe tener entre 3 y 60 caracteres.")
        String carrera
) {
}
