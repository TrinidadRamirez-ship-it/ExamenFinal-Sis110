package com.sicjac.backend.estudiante;

import com.sicjac.backend.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class EstudianteService {

    private final EstudianteRepository estudianteRepository;

    public EstudianteService(EstudianteRepository estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }

    public List<EstudianteResponse> listar() {
        return estudianteRepository.findAll()
                .stream()
                .map(EstudianteResponse::fromEntity)
                .toList();
    }

    public EstudianteResponse obtenerPorId(Long id) {
        return EstudianteResponse.fromEntity(buscarEntidadPorId(id));
    }

    @Transactional
    public EstudianteResponse crear(EstudianteRequest request) {
        // La validacion de formato vive en el DTO; aqui protegemos reglas de negocio y duplicados.
        validarDuplicadosParaCrear(request);

        Estudiante estudiante = new Estudiante(
                normalizarTexto(request.nombre()),
                normalizarTexto(request.apellido()),
                normalizarEmail(request.email()),
                normalizarTexto(request.codigo()),
                request.edad(),
                request.semestre(),
                normalizarTexto(request.carrera())
        );

        return EstudianteResponse.fromEntity(estudianteRepository.save(estudiante));
    }

    @Transactional
    public EstudianteResponse actualizar(Long id, EstudianteRequest request) {
        Estudiante estudiante = buscarEntidadPorId(id);
        // En actualizacion se excluye el registro actual para permitir conservar email o codigo.
        validarDuplicadosParaActualizar(id, request);

        estudiante.setNombre(normalizarTexto(request.nombre()));
        estudiante.setApellido(normalizarTexto(request.apellido()));
        estudiante.setEmail(normalizarEmail(request.email()));
        estudiante.setCodigo(normalizarTexto(request.codigo()));
        estudiante.setEdad(request.edad());
        estudiante.setSemestre(request.semestre());
        estudiante.setCarrera(normalizarTexto(request.carrera()));

        return EstudianteResponse.fromEntity(estudiante);
    }

    @Transactional
    public void eliminar(Long id) {
        Estudiante estudiante = buscarEntidadPorId(id);
        estudianteRepository.delete(estudiante);
    }

    private Estudiante buscarEntidadPorId(Long id) {
        return estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe un estudiante con id " + id + "."));
    }

    private void validarDuplicadosParaCrear(EstudianteRequest request) {
        String email = normalizarEmail(request.email());
        String codigo = normalizarTexto(request.codigo());

        if (estudianteRepository.existsByEmailIgnoreCase(email)) {
            throw new IllegalArgumentException("Ya existe un estudiante registrado con ese correo electronico.");
        }

        if (estudianteRepository.existsByCodigoIgnoreCase(codigo)) {
            throw new IllegalArgumentException("Ya existe un estudiante registrado con ese codigo.");
        }
    }

    private void validarDuplicadosParaActualizar(Long id, EstudianteRequest request) {
        String email = normalizarEmail(request.email());
        String codigo = normalizarTexto(request.codigo());

        if (estudianteRepository.existsByEmailIgnoreCaseAndIdNot(email, id)) {
            throw new IllegalArgumentException("Ya existe otro estudiante registrado con ese correo electronico.");
        }

        if (estudianteRepository.existsByCodigoIgnoreCaseAndIdNot(codigo, id)) {
            throw new IllegalArgumentException("Ya existe otro estudiante registrado con ese codigo.");
        }
    }

    private String normalizarTexto(String valor) {
        return valor == null ? null : valor.trim();
    }

    private String normalizarEmail(String email) {
        return email == null ? null : email.trim().toLowerCase();
    }
}
