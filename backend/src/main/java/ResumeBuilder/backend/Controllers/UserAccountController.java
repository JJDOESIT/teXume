package ResumeBuilder.backend.Controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ResumeBuilder.backend.Models.AuthenticationModels.AuthenticationPrincipalModel;
import ResumeBuilder.backend.Models.DatabaseModels.GuestAccountModel;
import ResumeBuilder.backend.Models.DatabaseModels.UserAccountModel;
import ResumeBuilder.backend.Models.DatabaseModels.UserInfoModel;
import ResumeBuilder.backend.Repositories.GuestAccountRepository;
import ResumeBuilder.backend.Repositories.UserAccountRepository;

@RestController
@RequestMapping("/api/user-account")
public class UserAccountController {
    private final UserAccountRepository _userAccountRepository;
    private final GuestAccountRepository _guestAccountRepository;

    public UserAccountController(UserAccountRepository userAccountRepository,
            GuestAccountRepository guestAccountRepository) {
        _userAccountRepository = userAccountRepository;
        _guestAccountRepository = guestAccountRepository;
    }

    @GetMapping("/get-user-account")
    public ResponseEntity<Map<String, UserAccountModel>> getUserAccount(Authentication authentication) {
        AuthenticationPrincipalModel authenticationPrincipalModel = (AuthenticationPrincipalModel) authentication
                .getPrincipal();

        if (!authenticationPrincipalModel.isSession) {
            Optional<UserAccountModel> userAccountModel = _userAccountRepository
                    .findByUsername(authenticationPrincipalModel.identity);
            return ResponseEntity.ok().body(Map.of("userInfo", userAccountModel.get()));
        } else {
            Optional<GuestAccountModel> optionalGuestAccountModel = _guestAccountRepository
                    .findBySession(authenticationPrincipalModel.identity);
            GuestAccountModel guestAccountModel = optionalGuestAccountModel.orElse(null);
            return ResponseEntity.ok().body(Map.of("userInfo", guestAccountModel.userAccountModel));
        }
    }

    @GetMapping("/get-user-info")
    public ResponseEntity<Map<String, UserInfoModel>> getUserInfo(Authentication authentication) {
        try {
            AuthenticationPrincipalModel authenticationPrincipalModel = (AuthenticationPrincipalModel) authentication
                    .getPrincipal();

            if (!authenticationPrincipalModel.isSession) {
                Optional<UserAccountModel> userAccountModel = _userAccountRepository
                        .findByUsername(authenticationPrincipalModel.identity);
                return ResponseEntity.ok().body(Map.of("userInfo", userAccountModel.get().userInfoModel));
            } else {
                Optional<GuestAccountModel> optionalGuestAccountModel = _guestAccountRepository
                        .findBySession(authenticationPrincipalModel.identity);
                GuestAccountModel guestAccountModel = optionalGuestAccountModel.orElse(null);
                return ResponseEntity.ok().body(Map.of("userInfo", guestAccountModel.userAccountModel.userInfoModel));
            }
        } catch (Exception error) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/update-user-info")
    public ResponseEntity<Void> updateUserInfo(@RequestBody UserInfoModel userInfoModel,
            Authentication authentication) {
        try {
            AuthenticationPrincipalModel authenticationPrincipalModel = (AuthenticationPrincipalModel) authentication
                    .getPrincipal();

            if (!authenticationPrincipalModel.isSession) {
                Optional<UserAccountModel> optionalUserAccountModel = _userAccountRepository
                        .findByUsername(authenticationPrincipalModel.identity);
                UserAccountModel userAccountModel = optionalUserAccountModel.get();
                userAccountModel.userInfoModel = userInfoModel;
                _userAccountRepository.save(userAccountModel);
            } else {
                Optional<GuestAccountModel> optionalGuestAccountModel = _guestAccountRepository
                        .findBySession(authenticationPrincipalModel.identity);
                GuestAccountModel guestAccountModel = optionalGuestAccountModel.orElse(null);
                guestAccountModel.userAccountModel.userInfoModel = userInfoModel;
                _guestAccountRepository.save(guestAccountModel);
            }
            return ResponseEntity.ok().build();
        } catch (Exception error) {
            return ResponseEntity.status(500).build();
        }
    }
}
