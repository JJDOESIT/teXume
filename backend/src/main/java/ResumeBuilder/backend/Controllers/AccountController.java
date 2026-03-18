package ResumeBuilder.backend.Controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ResumeBuilder.backend.Models.DatabaseModels.GuestAccountModel;
import ResumeBuilder.backend.Models.DatabaseModels.UserAccountModel;
import ResumeBuilder.backend.Models.DatabaseModels.UserInfoModel;
import ResumeBuilder.backend.Repositories.GuestAccountRepository;
import ResumeBuilder.backend.Repositories.UserAccountRepository;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    private final UserAccountRepository _userAccountRepository;
    private final GuestAccountRepository _guestAccountRepository;

    public AccountController(UserAccountRepository userAccountRepository,
            GuestAccountRepository guestAccountRepository) {
        _userAccountRepository = userAccountRepository;
        _guestAccountRepository = guestAccountRepository;
    }

    // Get user info
    @GetMapping("/get-user-info")
    public ResponseEntity<Map<String, UserInfoModel>> getUserInfo(HttpServletRequest request) {
        try {
            String identity = request.getHeader("identity");
            String isSession = request.getHeader("isSession");
            if (isSession == null) {
                Optional<UserAccountModel> userAccountModel = _userAccountRepository
                        .findByUsername(identity);
                return ResponseEntity.ok().body(Map.of("userInfo", userAccountModel.get().userInfoModel));
            } else {
                Optional<GuestAccountModel> optionalGuestAccountModel = _guestAccountRepository
                        .findBySession(identity);
                GuestAccountModel guestAccountModel = optionalGuestAccountModel.get();
                return ResponseEntity.ok().body(Map.of("userInfo", guestAccountModel.userAccountModel.userInfoModel));
            }
        } catch (Exception error) {
            return ResponseEntity.status(500).build();
        }
    }

    // Update user info
    @PostMapping("/update-user-info")
    public ResponseEntity<Void> updateUserInfo(@RequestBody UserInfoModel userInfoModel,
            HttpServletRequest request) {
        try {
            String identity = request.getHeader("identity");
            String isSession = request.getHeader("isSession");
            if (isSession == null) {
                Optional<UserAccountModel> optionalUserAccountModel = _userAccountRepository
                        .findByUsername(identity);
                UserAccountModel userAccountModel = optionalUserAccountModel.get();
                userAccountModel.userInfoModel = userInfoModel;
                _userAccountRepository.save(userAccountModel);
            } else {
                Optional<GuestAccountModel> optionalGuestAccountModel = _guestAccountRepository
                        .findBySession(identity);
                GuestAccountModel guestAccountModel = optionalGuestAccountModel.get();
                guestAccountModel.userAccountModel.userInfoModel = userInfoModel;
                _guestAccountRepository.save(guestAccountModel);
            }
            return ResponseEntity.ok().build();
        } catch (Exception error) {
            return ResponseEntity.status(500).build();
        }
    }
}
