package ee.tlu.evkk.api.filter;

import ee.tlu.evkk.api.service.AccessTokenService;
import ee.tlu.evkk.dal.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import static java.lang.String.format;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.apache.logging.log4j.util.Strings.isNotEmpty;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final AccessTokenService accessTokenService;

  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request,
                                  @NonNull HttpServletResponse response,
                                  @NonNull FilterChain filterChain) throws ServletException, IOException {
    if (SecurityContextHolder.getContext().getAuthentication() == null) {
      String authHeader = request.getHeader("Authorization");

      if (isNotEmpty(authHeader) && authHeader.startsWith("Bearer ")) {
        String token = authHeader.substring(7);
        try {
          if (accessTokenService.isExistingTokenValid(token)) {
            User user = accessTokenService.extractUser(token);
            Authentication authentication = new UsernamePasswordAuthenticationToken(user, token, getAuthorities(user));
            SecurityContextHolder.getContext().setAuthentication(authentication);
          }
        } catch (Exception e) {
          response.setStatus(SC_UNAUTHORIZED);
        }
      }
    }

    filterChain.doFilter(request, response);
  }

  private Set<GrantedAuthority> getAuthorities(User user) {
    Set<GrantedAuthority> authorities = new HashSet<>();
    authorities.add(new SimpleGrantedAuthority(format("ROLE_%s", user.getRoleName())));
    return authorities;
  }
}
