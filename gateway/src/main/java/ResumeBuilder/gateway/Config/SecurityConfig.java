package ResumeBuilder.gateway.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.reactive.CorsConfigurationSource;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

        private final CorsConfigurationSource _corsConfigurationSource;

        public SecurityConfig(CorsConfigurationSource corsConfigurationSource) {
                _corsConfigurationSource = corsConfigurationSource;
        }

        // Custom security filter
        @Bean
        public SecurityWebFilterChain securityFilterChain(ServerHttpSecurity http) {
                return http
                                .csrf(csrf -> csrf.disable())
                                .cors(cors -> cors.configurationSource(_corsConfigurationSource))
                                .authorizeExchange(auth -> auth
                                                .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                                .pathMatchers("/api/**").permitAll()
                                                .anyExchange().authenticated())
                                .build();
        }
}