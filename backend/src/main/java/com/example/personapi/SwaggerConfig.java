package com.example.personapi;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        servers = @Server(url = "/")
)
public class SwaggerConfig {

    static {
        io.swagger.v3.core.jackson.ModelResolver.enumsAsRef = true;
    }

    @Bean
    public OpenAPI appOpenAPI() {
        return new OpenAPI()
                .info(
                        new Info()
                                .title("Person API")
                                .version("1")
                );
    }

}
