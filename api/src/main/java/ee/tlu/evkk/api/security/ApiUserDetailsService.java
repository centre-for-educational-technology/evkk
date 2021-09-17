package ee.tlu.evkk.api.security;

import ee.tlu.evkk.api.ApiMapper;
import ee.tlu.evkk.api.dao.RolePermissionDao;
import ee.tlu.evkk.api.dao.UserDao;
import ee.tlu.evkk.api.dao.dto.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@Component
public class ApiUserDetailsService implements UserDetailsService {

  private final UserDao userDao;
  private final RolePermissionDao rolePermissionDao;

  public ApiUserDetailsService(UserDao userDao, RolePermissionDao rolePermissionDao) {
    this.userDao = userDao;
    this.rolePermissionDao = rolePermissionDao;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userDao.findByEmailAddress(username);
    if (user == null) throw new UsernameNotFoundException(username);
    Set<String> permissionNames = rolePermissionDao.findPermissionNamesByRoleName(user.getRoleName());
    return ApiMapper.INSTANCE.toAuthenticatedUser(user, permissionNames);
  }

}
