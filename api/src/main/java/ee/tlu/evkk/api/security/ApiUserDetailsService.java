package ee.tlu.evkk.api.security;

import ee.tlu.evkk.api.dao.UserDao;
import ee.tlu.evkk.api.dao.dto.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@Component
public class ApiUserDetailsService implements UserDetailsService {

  private final UserDao userDao;

  public ApiUserDetailsService(UserDao userDao) {
    this.userDao = userDao;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userDao.findByEmailAddress(username);
    if (user == null) throw new UsernameNotFoundException(username);
    return new AuthenticatedUser(user.getUserId(), user.getEmailAddress(), user.getPasswordHash(), Collections.emptyList());
  }

}
