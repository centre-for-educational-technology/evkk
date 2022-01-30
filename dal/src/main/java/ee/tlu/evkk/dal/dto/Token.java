package ee.tlu.evkk.dal.dto;

import ee.tlu.evkk.dal.json.Json;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 18.11.2019
 */
public class Token {

  private UUID tokenId;
  private TokenType type;
  private Json data;

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

}
