package ee.tlu.evkk.api.dao.dto;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
public class SessionToken {

  private UUID sessionTokenId;
  private UUID userId;
  private String sessionId;

  public UUID getSessionTokenId() {
    return sessionTokenId;
  }

  public void setSessionTokenId(UUID sessionTokenId) {
    this.sessionTokenId = sessionTokenId;
  }

  public UUID getUserId() {
    return userId;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  public String getSessionId() {
    return sessionId;
  }

  public void setSessionId(String sessionId) {
    this.sessionId = sessionId;
  }
}
