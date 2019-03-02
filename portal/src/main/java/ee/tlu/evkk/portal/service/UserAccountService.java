package ee.tlu.evkk.portal.service;

import ee.tlu.evkk.dal.dao.UserAccountDao;
import ee.tlu.evkk.dal.dto.UserAccount;
import ee.tlu.evkk.portal.security.AuthenticatedUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
@Service
public class UserAccountService implements UserDetailsService {

    @Autowired
    private UserAccountDao userAccountDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAccount userAccount = userAccountDao.findByEmailAddress(username);
        if (userAccount == null) {
            throw new UsernameNotFoundException(username);
        }

        UUID userAccountId = userAccount.getUserAccountId();
        String emailAddress = userAccount.getEmailAddress();
        String passwordHash = userAccount.getPasswordHash();

        return new AuthenticatedUser(userAccountId, emailAddress, passwordHash, Collections.emptyList());
    }

}