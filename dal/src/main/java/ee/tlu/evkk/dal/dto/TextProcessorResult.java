package ee.tlu.evkk.dal.dto;

import ee.tlu.evkk.dal.json.Json;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
@Getter
@Setter
public class TextProcessorResult {

  private UUID textProcessorResultId;
  private String textHash;
  private String type;
  private Long version;
  private Json result;
}
