package ResumeBuilder.backend.Repositories;

import java.util.Optional;

import org.springframework.stereotype.Service;

import ResumeBuilder.backend.Models.DatabaseModels.UserAccountModel;

@Service
public class UserAccountRepository {
    private final UserAccountInterface _userAccountInterface;

    public UserAccountRepository(UserAccountInterface userAccountInterface) {
        _userAccountInterface = userAccountInterface;
    }

    public void save(UserAccountModel userAccountModel) {
        _userAccountInterface.save(userAccountModel);
    }

    public Optional<UserAccountModel> findByUsername(String username) {
        return _userAccountInterface.findByUsername(username);
    }

    public void delete(UserAccountModel userAccountModel) {
        _userAccountInterface.delete(userAccountModel);
    }
}
