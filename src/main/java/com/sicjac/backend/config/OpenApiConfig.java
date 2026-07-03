package com.sicjac.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    // Configuracion base visible en /swagger-ui.html y /v3/api-docs.
    @Bean
    OpenAPI backendOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("Examen Final SIS110 API")
                        .version("1.0.0")
                        .description("Documentacion REST del backend Spring Boot."));
    }
}
