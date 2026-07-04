package com.sicjac.backend.repository;

import com.sicjac.backend.entity.Permission;
import com.sicjac.backend.entity.PermissionName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, PermissionName> {
}
