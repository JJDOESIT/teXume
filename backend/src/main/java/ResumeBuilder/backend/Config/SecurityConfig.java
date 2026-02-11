package ResumeBuilder.backend.Config;

import org.springframework.security.config.Customizer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import ResumeBuilder.backend.Repositories.GuestAccountRepository;
import ResumeBuilder.backend.Utilities.HmacUtility;
import ResumeBuilder.backend.Utilities.JwtUtility;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
        private final JwtUtility _jwtUtility;
        private final HmacUtility _hmacUtility;
        private final GuestAccountRepository _guestAccountRepository;

        public SecurityConfig(JwtUtility jwtUtility, HmacUtility hmacUtility,
                        GuestAccountRepository guestAccountRepository) {
                _jwtUtility = jwtUtility;
                _hmacUtility = hmacUtility;
                _guestAccountRepository = guestAccountRepository;
        }

        // Custom security chain
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                return http.csrf(csrf -> csrf.disable())
                                .cors(Customizer.withDefaults()).authorizeHttpRequests(auth -> auth
                                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                                .requestMatchers("/api/authentication/**").permitAll()
                                                .requestMatchers("/api/template/**").permitAll()
                                                .anyRequest().authenticated())
                                .addFilterBefore(
                                                new AuthenticationFilterConfig(_jwtUtility, _hmacUtility,
                                                                _guestAccountRepository),
                                                UsernamePasswordAuthenticationFilter.class)
                                .build();
        }
}
