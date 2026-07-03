package com.sicjac.backend.service;

import com.sicjac.backend.config.JwtProperties;
import com.sicjac.backend.dto.AuthResponse;
import com.sicjac.backend.dto.LoginRequest;
import com.sicjac.backend.dto.RegisterRequest;
import com.sicjac.backend.dto.UserResponse;
import com.sicjac.backend.entity.Role;
import com.sicjac.backend.entity.RoleName;
import com.sicjac.backend.entity.UserAccount;
import com.sicjac.backend.exception.EmailAlreadyExistsException;
import com.sicjac.backend.repository.RoleRepository;
import com.sicjac.backend.repository.UserAccountRepository;
import com.sicjac.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserAccountRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final JwtProperties jwtProperties;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.email());
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new EmailAlreadyExistsException();
        }

        Role defaultRole = roleRepository.findById(RoleName.ROLE_USER)
                .orElseThrow(() -> new IllegalStateException("El rol ROLE_USER no está configurado."));

        UserAccount user = new UserAccount();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.getRoles().add(defaultRole);

        try {
            user = userRepository.saveAndFlush(user);
        } catch (DataIntegrityViolationException exception) {
            throw new EmailAlreadyExistsException();
        }

        return responseFor(user);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String email = normalizeEmail(request.email());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, request.password())
        );

        UserAccount user = findByEmail(email);
        return responseFor(user);
    }

    @Transactional(readOnly = true)
    public UserResponse currentUser(String email) {
        return UserResponse.from(findByEmail(email));
    }

    private UserAccount findByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado."));
    }

    private AuthResponse responseFor(UserAccount user) {
        return new AuthResponse(
                jwtService.createToken(user),
                "Bearer",
                jwtProperties.expiration().toSeconds(),
                UserResponse.from(user)
        );
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
