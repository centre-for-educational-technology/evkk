package ee.tlu.evkk.dal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Duration;

import static java.time.Duration.ofDays;

/**
 * @author Mikk Tarvas
 * Date: 18.11.2019
 */
@Getter
@AllArgsConstructor
public enum TokenType {

  SESSION_TOKEN(ofDays(30));

  private final Duration defaultValidity;
}
