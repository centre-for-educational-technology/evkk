package ee.tlu.evkk.api.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import ee.tlu.evkk.api.security.ApiAuthenticationRedirectStrategy;
import ee.tlu.evkk.api.security.ApiUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

/**
 * @author Mikk Tarvas
 * Date: 04.02.2020
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  private final ApiUserDetailsService userDetailsService;
  private final ObjectMapper objectMapper;

  public SecurityConfiguration(ApiUserDetailsService userDetailsService, ObjectMapper objectMapper) {
    this.userDetailsService = userDetailsService;
    this.objectMapper = objectMapper;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    CookieCsrfTokenRepository csrfTokenRepository = new CookieCsrfTokenRepository();
    csrfTokenRepository.setCookieHttpOnly(false); //TODO: get via conf flag

    http
      .csrf().disable() //TODO: use repo
      .authorizeRequests()
      .mvcMatchers(GET, "/status").permitAll()
      .mvcMatchers(POST, "/login").permitAll()
      .mvcMatchers(POST, "/tools/minitorn-pikkus").permitAll()
      .mvcMatchers(POST, "/tools/masinoppe-ennustus").permitAll()
      .mvcMatchers("/texts/**").permitAll()
      .mvcMatchers("/textfromfile/**").permitAll()
      .mvcMatchers("/integration/**").permitAll()
      .mvcMatchers("/tools/**").permitAll()
      .mvcMatchers("/errors/**").permitAll()
      .anyRequest().authenticated().and()
      .formLogin().successHandler(successHandler()).and()
      .logout().logoutSuccessHandler(logoutSuccessHandler())
      .and().exceptionHandling().authenticationEntryPoint(authenticationEntryPoint());
  }

  @Component
  public static class CorsFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response,
                                    final FilterChain filterChain) throws ServletException, IOException {
      response.addHeader("Access-Control-Allow-Origin", "*");
      response.addHeader("Access-Control-Allow-Methods", "*");
      response.addHeader("Access-Control-Allow-Headers", "*");
      response.addHeader("Access-Control-Allow-Credentials", "true");
      response.addIntHeader("Access-Control-Max-Age", 3600);
      filterChain.doFilter(request, response);
    }
  }

  private AuthenticationSuccessHandler successHandler() {
    SavedRequestAwareAuthenticationSuccessHandler authenticationSuccessHandler = new SavedRequestAwareAuthenticationSuccessHandler();
    authenticationSuccessHandler.setRedirectStrategy(new ApiAuthenticationRedirectStrategy(objectMapper));
    return authenticationSuccessHandler;
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth
      .userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

  private AuthenticationEntryPoint authenticationEntryPoint() {
    return new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED);
  }

  private LogoutSuccessHandler logoutSuccessHandler() {
    return new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK);
  }

}
