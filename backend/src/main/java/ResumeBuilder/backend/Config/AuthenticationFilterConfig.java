package ResumeBuilder.backend.Config;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import ResumeBuilder.backend.Models.AuthenticationModels.AuthenticationPrincipalModel;
import ResumeBuilder.backend.Models.DatabaseModels.GuestAccountModel;
import ResumeBuilder.backend.Repositories.GuestAccountRepository;
import ResumeBuilder.backend.Utilities.HmacUtility;
import ResumeBuilder.backend.Utilities.JwtUtility;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthenticationFilterConfig extends OncePerRequestFilter {
    private final JwtUtility _jwtUtility;
    private final GuestAccountRepository _guestAccountRepository;
    private final HmacUtility _hmacUtility;

    public AuthenticationFilterConfig(JwtUtility jwtUtility, HmacUtility hmacUtility,
            GuestAccountRepository guestAccountRepository) {
        _jwtUtility = jwtUtility;
        _hmacUtility = hmacUtility;
        _guestAccountRepository = guestAccountRepository;
    }

    // Custom JWT/Session authentication filter
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = request.getHeader("Authorization");
        AuthenticationPrincipalModel authenticationPrincipalModel = new AuthenticationPrincipalModel();

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);

            if (_jwtUtility.validateToken(token)) {
                Claims payload = _jwtUtility.getPayload(token);
                String username = payload.getSubject();
                authenticationPrincipalModel.identity = username;

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        authenticationPrincipalModel, null,
                        Collections.emptyList());

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                filterChain.doFilter(request, response);
                return;
            }

            String encodedToken = _hmacUtility.encode(token);

            Optional<GuestAccountModel> optionalGuestAccountModel = _guestAccountRepository
                    .findBySession(encodedToken);
            GuestAccountModel guestAccountModel = optionalGuestAccountModel.orElse(null);

            if (guestAccountModel != null) {
                authenticationPrincipalModel.identity = encodedToken;
                authenticationPrincipalModel.isSession = true;

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        authenticationPrincipalModel, null,
                        Collections.emptyList());

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                filterChain.doFilter(request, response);
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
