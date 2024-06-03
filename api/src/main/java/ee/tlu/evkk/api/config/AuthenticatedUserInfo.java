package ee.tlu.evkk.api.config;

import ee.tlu.evkk.api.exception.UnauthorizedException;
import ee.tlu.evkk.dal.dto.User;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.context.SecurityContextHolder;

import static lombok.AccessLevel.PRIVATE;

@NoArgsConstructor(access = PRIVATE)
public class AuthenticatedUserInfo {

  @SneakyThrows
  public static User getAuthenticatedUser() {
    var user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (user instanceof User) return (User) user;
    throw new UnauthorizedException();
  }
}
