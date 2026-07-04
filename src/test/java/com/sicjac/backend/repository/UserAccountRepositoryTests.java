package com.sicjac.backend.repository;

import com.sicjac.backend.entity.Role;
import com.sicjac.backend.entity.RoleName;
import com.sicjac.backend.entity.UserAccount;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class UserAccountRepositoryTests {

    @Autowired
    private UserAccountRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Test
    void savesUserAndLoadsRolesAndPermissionsByEmail() {
        Role role = roleRepository.findById(RoleName.ROLE_USER).orElseThrow();

        UserAccount user = new UserAccount();
        user.setEmail("user@example.com");
        user.setPasswordHash("encoded-password");
        user.setFirstName("Test");
        user.setLastName("User");
        user.getRoles().add(role);
        userRepository.saveAndFlush(user);

        UserAccount stored = userRepository.findByEmailIgnoreCase("USER@EXAMPLE.COM").orElseThrow();

        assertThat(stored.getId()).isNotNull();
        assertThat(stored.getRoles())
                .extracting(Role::getName)
                .containsExactly(RoleName.ROLE_USER);
        assertThat(stored.getRoles().iterator().next().getPermissions()).isNotEmpty();
    }

    @Test
    void detectsExistingEmailIgnoringCase() {
        Role role = roleRepository.findById(RoleName.ROLE_USER).orElseThrow();
        UserAccount user = new UserAccount();
        user.setEmail("unique@example.com");
        user.setPasswordHash("encoded-password");
        user.setFirstName("Unique");
        user.setLastName("User");
        user.getRoles().add(role);
        userRepository.saveAndFlush(user);

        assertThat(userRepository.existsByEmailIgnoreCase("UNIQUE@EXAMPLE.COM")).isTrue();
    }
}
