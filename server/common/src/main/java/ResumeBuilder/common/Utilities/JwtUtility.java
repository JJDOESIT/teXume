package ResumeBuilder.common.Utilities;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.util.Date;

import javax.crypto.SecretKey;

@Service
public class JwtUtility {
    private final SecretKey _key;
    private final int _expiration;

    public JwtUtility(Environment environment) {
        _key = Keys.hmacShaKeyFor(environment.getProperty("spring.jwt.key").getBytes());
        _expiration = Integer.parseInt(environment.getProperty("spring.jwt.expiration"));
    }

    // Create a token
    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + _expiration * 1000 * 60 * 60))
                .signWith(_key)
                .compact();
    }

    // Validate the token
    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(_key).build().parseSignedClaims(token);
            return true;
        } catch (Exception error) {
            return false;
        }
    }

    // Fetch the payload
    public Claims getPayload(String token) {
        return Jwts.parser()
                .verifyWith(_key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
