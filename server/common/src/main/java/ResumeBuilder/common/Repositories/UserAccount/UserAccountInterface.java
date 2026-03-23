package ResumeBuilder.common.Repositories.UserAccount;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ResumeBuilder.common.Models.Database.UserAccountModel;

@Repository
public interface UserAccountInterface extends JpaRepository<UserAccountModel, Integer> {
    Optional<UserAccountModel> findByUsername(String username);
}
