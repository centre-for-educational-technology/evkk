package ee.tlu.evkk.api.controller.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@Getter
@Setter
public class StatusResponseEntity {

  private String loggedInEmailAddress;
  private Map<String, String> integrationPaths;
}
