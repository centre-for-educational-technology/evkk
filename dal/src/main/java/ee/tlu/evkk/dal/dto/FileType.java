package ee.tlu.evkk.dal.dto;

import lombok.Getter;
import org.springframework.lang.Nullable;

import java.time.Duration;

import static java.time.Duration.ofDays;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
@Getter
public enum FileType {

  TEMPORARY(ofDays(1)),
  USER_UPLOAD(null);

  private final Duration expiresIn;

  FileType(@Nullable Duration expiresIn) {
    this.expiresIn = expiresIn;
  }
}
