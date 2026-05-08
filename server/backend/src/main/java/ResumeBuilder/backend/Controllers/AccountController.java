package ResumeBuilder.backend.Controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ResumeBuilder.common.Models.Database.GuestAccountModel;
import ResumeBuilder.common.Models.Database.UserAccountModel;
import ResumeBuilder.common.Models.Database.UserInfoModel;
import ResumeBuilder.common.Repositories.GuestAccount.GuestAccountRepository;
import ResumeBuilder.common.Repositories.UserAccount.UserAccountRepository;
import ResumeBuilder.common.Utilities.BCryptUtility;
import ResumeBuilder.common.Utilities.JwtUtility;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    private final JwtUtility _jwtUtility;
    private final BCryptUtility _BCryptUtility;
    private final UserAccountRepository _userAccountRepository;
    private final GuestAccountRepository _guestAccountRepository;

    public AccountController(JwtUtility jwtUtility, BCryptUtility BCryptUtility,
            UserAccountRepository userAccountRepository,
            GuestAccountRepository guestAccountRepository) {
        _jwtUtility = jwtUtility;
        _BCryptUtility = BCryptUtility;
        _userAccountRepository = userAccountRepository;
        _guestAccountRepository = guestAccountRepository;
    }

    // Get user info
    @GetMapping("/get-user-info")
    public ResponseEntity<Map<String, UserInfoModel>> getUserInfo(HttpServletRequest request) {
        try {
            String identity = request.getHeader("identity");
            String session = request.getHeader("role");

            if (identity == null) {
                return ResponseEntity.status(403).build();
            }

            boolean isSession = session.equals("guest");

            if (!isSession) {
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

    // Get user account
    @GetMapping("/get-user-account")
    public ResponseEntity<UserAccountModel> getUserAccount(HttpServletRequest request) {
        try {
            String identity = request.getHeader("identity");
            String session = request.getHeader("role");

            if (identity == null) {
                return ResponseEntity.status(403).build();
            }

            boolean isSession = session.equals("guest");

            if (isSession) {
                return ResponseEntity.status(403).build();
            }

            Optional<UserAccountModel> optionalUserAccountModel = _userAccountRepository
                    .findByUsername(identity);
            UserAccountModel userAccountModel = optionalUserAccountModel.get();
            userAccountModel.password = "";
            return ResponseEntity.ok().body(userAccountModel);
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
            String session = request.getHeader("role");

            if (identity == null) {
                return ResponseEntity.status(403).build();
            }

            boolean isSession = session.equals("guest");

            if (!isSession) {
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

    // Update user info
    @PostMapping("/update-user-account")
    public ResponseEntity<String> updateUserAccount(@RequestBody UserAccountModel userAccountModel,
            HttpServletRequest request) {
        try {
            String identity = request.getHeader("identity");
            String session = request.getHeader("role");

            if (identity == null) {
                return ResponseEntity.status(403).build();
            }

            boolean isSession = session.equals("guest");

            if (isSession) {
                return ResponseEntity.status(403).build();
            }

            Optional<UserAccountModel> optionalUserAccountModel = _userAccountRepository
                    .findByUsername(identity);
            UserAccountModel databaseUserAccountModel = optionalUserAccountModel.get();
            databaseUserAccountModel.username = userAccountModel.username;

            try {
                _userAccountRepository.save(databaseUserAccountModel);
            } catch (DataIntegrityViolationException error) {
                return ResponseEntity.status(409).build();
            }

            databaseUserAccountModel.userInfoModel.firstName = userAccountModel.userInfoModel.firstName;
            databaseUserAccountModel.userInfoModel.lastName = userAccountModel.userInfoModel.lastName;

            if (!userAccountModel.password.equals("")) {
                databaseUserAccountModel.password = _BCryptUtility.encode(userAccountModel.password);
            }

            _userAccountRepository.save(databaseUserAccountModel);

            String jwt = _jwtUtility.generateToken(userAccountModel.username);
            return ResponseEntity.ok().body(jwt);
        } catch (Exception error) {
            return ResponseEntity.status(500).build();
        }
    }
}
