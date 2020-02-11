package ee.tlu.evkk.api.dao.dto;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
public class User {

  private UUID userId;
  private String emailAddress;
  private String passwordHash;

  public UUID getUserId() {
    return userId;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
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
