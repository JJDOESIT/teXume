package ResumeBuilder.gateway.Config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RouteConfig {

        // Custom route config
        @Bean
        public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
                return builder.routes()
                                .route("backend_route", r -> r.path("/api/account/**", "/api/authentication/**")
                                                .uri("http://localhost:8082"))
                                .route("template_route", r -> r.path("/api/template/**")
                                                .uri("http://localhost:8083"))
                                .build();
        }
}
