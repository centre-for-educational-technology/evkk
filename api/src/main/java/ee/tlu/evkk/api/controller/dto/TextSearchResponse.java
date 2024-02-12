package ee.tlu.evkk.api.controller.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 17.04.2022
 */
@Getter
@Setter
public class TextSearchResponse {

  private UUID textId;
  private String content;
  private Map<String, String> properties;
  private String downloadUrl;
}
