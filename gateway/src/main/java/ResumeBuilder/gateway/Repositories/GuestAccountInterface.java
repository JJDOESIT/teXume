package ResumeBuilder.gateway.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ResumeBuilder.gateway.Models.DatabaseModels.GuestAccountModel;

@Repository
public interface GuestAccountInterface extends JpaRepository<GuestAccountModel, Integer> {
    Optional<GuestAccountModel> findBySession(String session);
}
