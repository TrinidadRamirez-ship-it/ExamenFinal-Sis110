package com.sicjac.backend.repository;

import com.sicjac.backend.entity.Role;
import com.sicjac.backend.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, RoleName> {
}
