package ResumeBuilder.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@EntityScan(basePackages = "ResumeBuilder.common.Models.Database")
@ComponentScan(basePackages = { "ResumeBuilder.backend", "ResumeBuilder.common" })
@EnableJpaRepositories(basePackages = { "ResumeBuilder.common.Repositories" })
@SpringBootApplication
public class BackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
}
