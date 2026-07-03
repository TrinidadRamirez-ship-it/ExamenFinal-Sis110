package com.sicjac.backend.estudiante;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByCodigoIgnoreCase(String codigo);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);

    boolean existsByCodigoIgnoreCaseAndIdNot(String codigo, Long id);
}
