package ee.tlu.evkk.dal.dto;

import java.time.Duration;

/**
 * @author Mikk Tarvas
 * Date: 18.11.2019
 */
public enum TokenType {

  SESSION_TOKEN(Duration.ofDays(30));

  private final Duration defaultValidity;

  TokenType(Duration defaultValidity) {
    this.defaultValidity = defaultValidity;
  }

  public Duration getDefaultValidity() {
    return defaultValidity;
  }

}
