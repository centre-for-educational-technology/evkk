package ee.tlu.evkk.dal.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
@Getter
@Setter
public class MissingTextProcessorResult {

  private UUID textId;
  private String processorType;
}
