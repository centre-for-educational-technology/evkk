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
public class StatusResponseDto {

  private UserDto user;
  private String accessToken;
  private Map<String, String> integrationPaths;
}