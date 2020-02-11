package ee.tlu.evkk.api.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
public class AuthenticatedUser extends User {

  private final UUID userId;

  public AuthenticatedUser(UUID userId, String username, String password, Collection<? extends GrantedAuthority> authorities) {
    super(username, password, authorities);
    this.userId = userId;
  }

  public AuthenticatedUser(UUID userId, String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
    super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
    this.userId = userId;
  }

  public UUID getUserId() {
    return userId;
  }

}
