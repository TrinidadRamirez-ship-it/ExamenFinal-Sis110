package com.sicjac.backend.estudiante;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sicjac.backend.exception.GlobalExceptionHandler;
import com.sicjac.backend.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EstudianteController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(GlobalExceptionHandler.class)
class EstudianteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private EstudianteService estudianteService;

    @Test
    void listarDevuelveEstudiantes() throws Exception {
        when(estudianteService.listar()).thenReturn(List.of(responseValido()));

        mockMvc.perform(get("/api/estudiantes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].email").value("ana@example.com"));
    }

    @Test
    void crearDevuelveCreated() throws Exception {
        when(estudianteService.crear(any(EstudianteRequest.class))).thenReturn(responseValido());

        mockMvc.perform(post("/api/estudiantes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestValido())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.codigo").value("SIS-1001"));
    }

    @Test
    void crearConDatosInvalidosDevuelveBadRequest() throws Exception {
        EstudianteRequest request = new EstudianteRequest(
                "",
                "Rojas",
                "correo-invalido",
                "MAL",
                12,
                20,
                ""
        );

        mockMvc.perform(post("/api/estudiantes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.estado").value(400))
                .andExpect(jsonPath("$.detalles.nombre").exists())
                .andExpect(jsonPath("$.detalles.email").exists());
    }

    @Test
    void obtenerInexistenteDevuelveNotFound() throws Exception {
        when(estudianteService.obtenerPorId(99L))
                .thenThrow(new ResourceNotFoundException("No existe un estudiante con id 99."));

        mockMvc.perform(get("/api/estudiantes/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.estado").value(404));
    }

    @Test
    void actualizarDevuelveOk() throws Exception {
        when(estudianteService.actualizar(eq(1L), any(EstudianteRequest.class))).thenReturn(responseValido());

        mockMvc.perform(put("/api/estudiantes/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestValido())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void eliminarDevuelveNoContent() throws Exception {
        doNothing().when(estudianteService).eliminar(1L);

        mockMvc.perform(delete("/api/estudiantes/1"))
                .andExpect(status().isNoContent());
    }

    private EstudianteRequest requestValido() {
        return new EstudianteRequest(
                "Ana",
                "Rojas",
                "ana@example.com",
                "SIS-1001",
                20,
                4,
                "Sistemas"
        );
    }

    private EstudianteResponse responseValido() {
        return new EstudianteResponse(
                1L,
                "Ana",
                "Rojas",
                "ana@example.com",
                "SIS-1001",
                20,
                4,
                "Sistemas"
        );
    }
}
