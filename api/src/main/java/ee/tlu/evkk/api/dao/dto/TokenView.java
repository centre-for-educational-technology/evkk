package ee.tlu.evkk.api.dao.dto;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 19.11.2019
 */
public class TokenView {

  private UUID tokenId;
  private TokenType type;
  private Json data;
  private Boolean isConsumed;
  private Boolean isExpired;

  public UUID getTokenId() {
    return tokenId;
  }

  public void setTokenId(UUID tokenId) {
    this.tokenId = tokenId;
  }

  public TokenType getType() {
    return type;
  }

  public void setType(TokenType type) {
    this.type = type;
  }

  public Json getData() {
    return data;
  }

  public void setData(Json data) {
    this.data = data;
  }

  public Boolean getConsumed() {
    return isConsumed;
  }

  public void setConsumed(Boolean consumed) {
    isConsumed = consumed;
  }

  public Boolean getExpired() {
    return isExpired;
  }

  public void setExpired(Boolean expired) {
    isExpired = expired;
  }

}
