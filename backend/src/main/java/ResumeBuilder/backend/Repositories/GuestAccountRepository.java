package ResumeBuilder.backend.Repositories;

import java.util.Optional;

import org.springframework.stereotype.Service;

import ResumeBuilder.backend.Models.DatabaseModels.GuestAccountModel;

@Service
public class GuestAccountRepository {
    private final GuestAccountInterface _guestAccountInterface;

    public GuestAccountRepository(GuestAccountInterface guestAccountInterface) {
        _guestAccountInterface = guestAccountInterface;
    }

    public void save(GuestAccountModel guestAccountModel) {
        _guestAccountInterface.save(guestAccountModel);
    }

    public Optional<GuestAccountModel> findBySession(String session) {
        return _guestAccountInterface.findBySession(session);
    }

    public void delete(GuestAccountModel guestAccountModel) {
        _guestAccountInterface.delete(guestAccountModel);
    }
}
