package ResumeBuilder.gateway.Config;

import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import ResumeBuilder.gateway.Models.DatabaseModels.GuestAccountModel;
import ResumeBuilder.gateway.Repositories.GuestAccountRepository;
import ResumeBuilder.gateway.Utilities.HmacUtility;
import ResumeBuilder.gateway.Utilities.JwtUtility;
import io.jsonwebtoken.Claims;
import reactor.core.publisher.Mono;

@Component
public class AuthConfig implements WebFilter {
    private final JwtUtility _jwtUtility;
    private final GuestAccountRepository _guestAccountRepository;
    private final HmacUtility _hmacUtility;

    public AuthConfig(JwtUtility jwtUtility, HmacUtility hmacUtility,
            GuestAccountRepository guestAccountRepository) {
        _jwtUtility = jwtUtility;
        _hmacUtility = hmacUtility;
        _guestAccountRepository = guestAccountRepository;
    }

    // Custom auth config
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String token = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);

            if (_jwtUtility.validateToken(token)) {
                Claims payload = _jwtUtility.getPayload(token);
                String username = payload.getSubject();

                ServerHttpRequest mutatedRequest = exchange.getRequest().mutate().header("identity", username).build();
                ServerWebExchange mutatedExchange = exchange.mutate().request(mutatedRequest).build();
                return chain.filter(mutatedExchange);
            }

            String encodedToken = _hmacUtility.encode(token);

            Optional<GuestAccountModel> optionalGuestAccountModel = _guestAccountRepository
                    .findBySession(encodedToken);
            GuestAccountModel guestAccountModel = optionalGuestAccountModel.orElse(null);

            if (guestAccountModel != null) {
                ServerHttpRequest mutatedRequest = exchange.getRequest().mutate().header("identity", encodedToken)
                        .header("isSession", "").build();
                ServerWebExchange mutatedExchange = exchange.mutate().request(mutatedRequest).build();
                return chain.filter(mutatedExchange);
            }
        }
        return chain.filter(exchange);
    }
}
