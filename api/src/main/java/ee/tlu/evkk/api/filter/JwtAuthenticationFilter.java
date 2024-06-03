package ee.tlu.evkk.api.filter;

import ee.tlu.evkk.api.service.JwtService;
import ee.tlu.evkk.dal.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import static ee.tlu.evkk.api.config.SecurityConfiguration.PROTECTED_URLS;
import static java.lang.String.format;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.apache.logging.log4j.util.Strings.isNotEmpty;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final AntPathMatcher antPathMatcher = new AntPathMatcher();

  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request,
                                  @NonNull HttpServletResponse response,
                                  @NonNull FilterChain filterChain) throws ServletException, IOException {
    if (isProtected(request.getServletPath()) && SecurityContextHolder.getContext().getAuthentication() == null) {
      String authHeader = request.getHeader("Authorization");

      if (isNotEmpty(authHeader) && authHeader.startsWith("Bearer ")) {
        String token = authHeader.substring(7);
        try {
          if (jwtService.isTokenValid(token)) {
            User user = jwtService.extractUser(token);
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

  private boolean isProtected(String servletPath) {
    return PROTECTED_URLS.stream()
      .anyMatch(url -> antPathMatcher.match(url, servletPath));
  }

  private Set<GrantedAuthority> getAuthorities(User user) {
    Set<GrantedAuthority> authorities = new HashSet<>();
    authorities.add(new SimpleGrantedAuthority(format("ROLE_%s", user.getRoleName())));
    return authorities;
  }
}
