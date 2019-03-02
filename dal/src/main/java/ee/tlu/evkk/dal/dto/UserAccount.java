package ee.tlu.evkk.dal.dto;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-13
 */
public class UserAccount {

    private UUID userAccountId;
    private String emailAddress;
    private String passwordHash;

    public UUID getUserAccountId() {
        return userAccountId;
    }

    public void setUserAccountId(UUID userAccountId) {
        this.userAccountId = userAccountId;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

}