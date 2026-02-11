package ResumeBuilder.backend.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ResumeBuilder.backend.Models.DatabaseModels.UserAccountModel;

@Repository
public interface UserAccountInterface extends JpaRepository<UserAccountModel, Integer> {
    Optional<UserAccountModel> findByUsername(String username);
}
