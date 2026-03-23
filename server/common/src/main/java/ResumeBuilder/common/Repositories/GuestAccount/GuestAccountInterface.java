package ResumeBuilder.common.Repositories.GuestAccount;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ResumeBuilder.common.Models.Database.GuestAccountModel;

@Repository
public interface GuestAccountInterface extends JpaRepository<GuestAccountModel, Integer> {
    Optional<GuestAccountModel> findBySession(String session);
}
