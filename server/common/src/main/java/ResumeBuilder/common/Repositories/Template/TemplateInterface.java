package ResumeBuilder.common.Repositories.Template;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ResumeBuilder.common.Models.Database.TemplateModel;

@Repository
public interface TemplateInterface extends JpaRepository<TemplateModel, Integer> {
    Optional<TemplateModel> findByName(String name);
}
