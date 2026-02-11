package ResumeBuilder.backend.Utilities;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class BCryptUtility {
    private final BCryptPasswordEncoder _BCryptPasswordEncoder;

    public BCryptUtility() {
        _BCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public String encode(String key) {
        return _BCryptPasswordEncoder.encode(key);
    }

    public boolean matches(String key, String hashedKey) {
        return _BCryptPasswordEncoder.matches(key, hashedKey);
    }
}
