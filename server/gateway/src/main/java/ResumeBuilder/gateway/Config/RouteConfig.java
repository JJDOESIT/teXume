package ResumeBuilder.gateway.Config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class RouteConfig {

        private final Environment _environment;

        public RouteConfig(Environment environment) {
                _environment = environment;
        }

        // Custom route config
        @Bean
        public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
                String backendUrl = _environment.getProperty("services.backend.url");
                String templateUrl = _environment.getProperty("services.template.url");

                return builder.routes()
                                .route("backend_route", r -> r.path("/api/account/**", "/api/authentication/**")
                                                .uri(backendUrl))
                                .route("template_route", r -> r.path("/api/template/**")
                                                .uri(templateUrl))
                                .build();
        }
}