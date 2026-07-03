package com.sicjac.backend.estudiante;

import com.sicjac.backend.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EstudianteServiceTest {

    @Mock
    private EstudianteRepository estudianteRepository;

    @InjectMocks
    private EstudianteService estudianteService;

    @Test
    void crearNormalizaDatosYGuardaEstudiante() {
        EstudianteRequest request = requestValido();

        when(estudianteRepository.existsByEmailIgnoreCase("ana@example.com")).thenReturn(false);
        when(estudianteRepository.existsByCodigoIgnoreCase("SIS-1001")).thenReturn(false);
        when(estudianteRepository.save(any(Estudiante.class))).thenAnswer(invocation -> invocation.getArgument(0));

        EstudianteResponse response = estudianteService.crear(request);

        assertThat(response.nombre()).isEqualTo("Ana");
        assertThat(response.email()).isEqualTo("ana@example.com");
        verify(estudianteRepository).save(any(Estudiante.class));
    }

    @Test
    void crearRechazaEmailDuplicado() {
        EstudianteRequest request = requestValido();

        when(estudianteRepository.existsByEmailIgnoreCase("ana@example.com")).thenReturn(true);

        assertThatThrownBy(() -> estudianteService.crear(request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("correo electronico");

        verify(estudianteRepository, never()).save(any(Estudiante.class));
    }

    @Test
    void obtenerPorIdLanzaExcepcionCuandoNoExiste() {
        when(estudianteRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> estudianteService.obtenerPorId(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void actualizarModificaEntidadExistente() {
        Estudiante estudiante = new Estudiante(
                "Ana",
                "Rojas",
                "ana@example.com",
                "SIS-1001",
                20,
                4,
                "Sistemas"
        );
        EstudianteRequest request = new EstudianteRequest(
                "Maria",
                "Lopez",
                "maria@example.com",
                "SIS-2002",
                21,
                5,
                "Informatica"
        );

        when(estudianteRepository.findById(1L)).thenReturn(Optional.of(estudiante));
        when(estudianteRepository.existsByEmailIgnoreCaseAndIdNot("maria@example.com", 1L)).thenReturn(false);
        when(estudianteRepository.existsByCodigoIgnoreCaseAndIdNot("SIS-2002", 1L)).thenReturn(false);

        EstudianteResponse response = estudianteService.actualizar(1L, request);

        assertThat(response.nombre()).isEqualTo("Maria");
        assertThat(response.carrera()).isEqualTo("Informatica");
    }

    private EstudianteRequest requestValido() {
        return new EstudianteRequest(
                " Ana ",
                "Rojas",
                "ANA@EXAMPLE.COM ",
                "SIS-1001",
                20,
                4,
                "Sistemas"
        );
    }
}
