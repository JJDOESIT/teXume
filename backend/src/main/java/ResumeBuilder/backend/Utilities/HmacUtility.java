package ResumeBuilder.backend.Utilities;

import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.SecretKey;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.security.Keys;

@Service
public class HmacUtility {
    private final SecretKey _key;

    public HmacUtility(Environment environment) {
        _key = Keys.hmacShaKeyFor(environment.getProperty("spring.hmac.key").getBytes());
    }

    // Encode a string using SHA-256
    public String encode(String token) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(_key);
            return Base64.getUrlEncoder().withoutPadding().encodeToString(mac.doFinal(token.getBytes()));
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return null;
        }
    }
}
