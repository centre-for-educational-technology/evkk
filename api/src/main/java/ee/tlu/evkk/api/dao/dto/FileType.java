package ee.tlu.evkk.api.dao.dto;

import org.springframework.lang.Nullable;

import java.time.Duration;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
public enum FileType {

  TEMPORARY(Duration.ofDays(1)),
  USER_UPLOAD(null);

  private final Duration expiresIn;

  FileType(@Nullable Duration expiresIn) {
    this.expiresIn = expiresIn;
  }

  public Duration getExpiresIn() {
    return expiresIn;
  }

}
