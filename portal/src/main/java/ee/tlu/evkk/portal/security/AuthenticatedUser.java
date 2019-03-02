package ee.tlu.evkk.portal.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
public class AuthenticatedUser extends User {

    private final UUID userAccountId;

    public AuthenticatedUser(UUID userAccountId, String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.userAccountId = userAccountId;
    }

    public UUID getUserAccountId() {
        return userAccountId;
    }

}