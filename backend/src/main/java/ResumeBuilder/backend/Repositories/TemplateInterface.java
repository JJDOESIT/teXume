package ResumeBuilder.backend.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ResumeBuilder.backend.Models.DatabaseModels.TemplateModel;

@Repository
public interface TemplateInterface extends JpaRepository<TemplateModel, Integer> {
    Optional<TemplateModel> findByName(String name);
}
