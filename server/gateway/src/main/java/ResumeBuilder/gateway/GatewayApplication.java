package ResumeBuilder.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan(basePackages = "ResumeBuilder.common.Models.Database")
@ComponentScan(basePackages = { "ResumeBuilder.gateway", "ResumeBuilder.common" })
@EnableJpaRepositories(basePackages = { "ResumeBuilder.common.Repositories" })
@SpringBootApplication
public class GatewayApplication {
	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}
}
