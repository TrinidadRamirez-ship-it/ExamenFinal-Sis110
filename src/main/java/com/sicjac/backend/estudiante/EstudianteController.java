package com.sicjac.backend.estudiante;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/estudiantes")
@Tag(name = "Estudiantes", description = "Operaciones CRUD para estudiantes")
public class EstudianteController {

    private final EstudianteService estudianteService;

    public EstudianteController(EstudianteService estudianteService) {
        this.estudianteService = estudianteService;
    }

    @GetMapping
    @Operation(summary = "Listar estudiantes")
    public ResponseEntity<List<EstudianteResponse>> listar(
            @RequestParam(defaultValue = "false") boolean soloMayoresDeEdad) {
        List<EstudianteResponse> estudiantes = estudianteService.listar();

        if (soloMayoresDeEdad) {
            estudiantes = estudiantes.stream()
                    .filter(estudiante -> estudiante.edad() >= 18)
                    .toList();
        }

        return ResponseEntity.ok(estudiantes);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener estudiante por id")
    public ResponseEntity<EstudianteResponse> obtenerPorId(
            @PathVariable @Min(value = 1, message = "El id debe ser mayor o igual a 1.") Long id) {
        return ResponseEntity.ok(estudianteService.obtenerPorId(id));
    }

    @PostMapping
    @Operation(summary = "Crear estudiante")
    public ResponseEntity<EstudianteResponse> crear(@Valid @RequestBody EstudianteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(estudianteService.crear(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar estudiante")
    public ResponseEntity<EstudianteResponse> actualizar(
            @PathVariable @Min(value = 1, message = "El id debe ser mayor o igual a 1.") Long id,
            @Valid @RequestBody EstudianteRequest request) {
        return ResponseEntity.ok(estudianteService.actualizar(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar estudiante")
    public ResponseEntity<Void> eliminar(
            @PathVariable @Min(value = 1, message = "El id debe ser mayor o igual a 1.") Long id) {
        estudianteService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
