package ResumeBuilder.backend.Controllers;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ResumeBuilder.backend.Models.ApiModels.Authentication.LoginModel;
import ResumeBuilder.backend.Models.ApiModels.Authentication.SignUpGuestModel;
import ResumeBuilder.backend.Models.ApiModels.Authentication.SignUpModel;
import ResumeBuilder.backend.Models.AuthenticationModels.AuthenticationPrincipalModel;
import ResumeBuilder.backend.Models.DatabaseModels.GuestAccountModel;
import ResumeBuilder.backend.Models.DatabaseModels.UserAccountModel;
import ResumeBuilder.backend.Models.DatabaseModels.UserInfoModel;
import ResumeBuilder.backend.Repositories.GuestAccountRepository;
import ResumeBuilder.backend.Repositories.UserAccountRepository;
import ResumeBuilder.backend.Utilities.BCryptUtility;
import ResumeBuilder.backend.Utilities.HmacUtility;
import ResumeBuilder.backend.Utilities.JwtUtility;

@RestController
@RequestMapping("/api/authentication")
public class AuthenticationController {
    private final JwtUtility _jwtUtility;
    private final BCryptUtility _BCryptUtility;
    private final HmacUtility _hmacUtility;
    private final UserAccountRepository _userAccountRepository;
    private final GuestAccountRepository _guestAccountRepository;

    public AuthenticationController(JwtUtility jwtUtility, BCryptUtility BCryptUtility, HmacUtility hmacUtility,
            UserAccountRepository userAccountRepository, GuestAccountRepository guestAccountRepository) {
        _jwtUtility = jwtUtility;
        _BCryptUtility = BCryptUtility;
        _hmacUtility = hmacUtility;
        _userAccountRepository = userAccountRepository;
        _guestAccountRepository = guestAccountRepository;
    }

    // User attempts to login
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginModel loginModel) {
        try {
            Optional<UserAccountModel> optionalUserAccountModel = _userAccountRepository
                    .findByUsername(loginModel.username);

            UserAccountModel userAccountModel = optionalUserAccountModel.orElse(null);

            if (userAccountModel == null) {
                return ResponseEntity.status(400).body(Map.of("message", "Invalid username/password"));
            }

            if (!_BCryptUtility.matches(loginModel.password, userAccountModel.password)) {
                return ResponseEntity.status(400).body(Map.of("message", "Invalid username/password"));
            }

            String jwt = _jwtUtility.generateToken(loginModel.username);
            return ResponseEntity.ok().body(Map.of("jwt", jwt));
        } catch (Exception error) {
            return ResponseEntity.status(500).build();
        }
    }

    // User attempts to sign up
    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUp(@RequestBody SignUpModel signUpModel) {
        try {
            UserAccountModel userAccountModel = new UserAccountModel();
            userAccountModel.username = signUpModel.username;
            userAccountModel.password = _BCryptUtility.encode(signUpModel.password);
            userAccountModel.admin = false;
            userAccountModel.userInfoModel = new UserInfoModel();
            userAccountModel.userInfoModel.firstName = signUpModel.firstName;
            userAccountModel.userInfoModel.lastName = signUpModel.lastName;
            try {
                _userAccountRepository.save(userAccountModel);
            } catch (DataIntegrityViolationException error) {
                return ResponseEntity.status(409).build();
            }
            return ResponseEntity.ok().build();
        } catch (Exception error) {
            return ResponseEntity.status(500).build();
        }
    }

    // Attempt to sign up guest user
    @PostMapping("/sign-up-guest")
    public ResponseEntity<Map<String, String>> signUpGuest(@RequestBody SignUpGuestModel signUpGuestModel) {
        try {
            UserAccountModel userAccountModel = new UserAccountModel();
            userAccountModel.admin = false;
            userAccountModel.userInfoModel = signUpGuestModel.userInfoModel;

            GuestAccountModel guestAccountModel = new GuestAccountModel();
            guestAccountModel.userAccountModel = userAccountModel;

            for (int attempts = 0; attempts < 3; attempts++) {
                try {
                    String token = UUID.randomUUID().toString();
                    String encodedToken = _hmacUtility.encode(token);

                    guestAccountModel.session = encodedToken;
                    _guestAccountRepository.save(guestAccountModel);
                    return ResponseEntity.ok().body(Map.of("token", token));
                } catch (Exception error) {
                    System.out.println(error.getMessage());
                }
            }
            return ResponseEntity.status(500).build();
        } catch (Exception error) {
            return ResponseEntity.status(500).build();
        }
    }

    // Return whether the user is logged in or not
    @GetMapping("/is-logged-in")
    public ResponseEntity<Boolean> isLoggedIn(Authentication authentication) {
        try {
            AuthenticationPrincipalModel authenticationPrincipalModel = (AuthenticationPrincipalModel) authentication
                    .getPrincipal();
            if (authenticationPrincipalModel.isSession) {
                return ResponseEntity.ok().body(false);
            }
            return ResponseEntity.ok().body(true);
        } catch (Exception error) {
            return ResponseEntity.status(500).build();
        }
    }
}
