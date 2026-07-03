package com.sicjac.backend.security;

import com.sicjac.backend.config.JwtProperties;
import com.sicjac.backend.entity.UserAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.LinkedHashSet;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtEncoder jwtEncoder;
    private final JwtProperties properties;

    public String createToken(UserAccount user) {
        Instant issuedAt = Instant.now();
        var authorities = new LinkedHashSet<String>();
        user.getRoles().forEach(role -> {
            authorities.add(role.getName().name());
            role.getPermissions().forEach(permission ->
                    authorities.add(permission.getName().name()));
        });

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(properties.issuer())
                .issuedAt(issuedAt)
                .expiresAt(issuedAt.plus(properties.expiration()))
                .subject(user.getEmail())
                .claim("userId", user.getId().toString())
                .claim("authorities", authorities)
                .build();

        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}
