package ee.tlu.evkk.api.dao.dto;

import java.time.Duration;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
public enum FileType {

  TEMPORARY(Duration.ofDays(1));

  private final Duration expiresIn;

  FileType(Duration expiresIn) {
    this.expiresIn = expiresIn;
  }

  public Duration getExpiresIn() {
    return expiresIn;
  }

}
