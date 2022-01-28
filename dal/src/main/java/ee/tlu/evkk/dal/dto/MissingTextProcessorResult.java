package ee.tlu.evkk.dal.dto;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
public class MissingTextProcessorResult {

  private UUID textId;
  private String processorType;

  public UUID getTextId() {
    return textId;
  }

  public void setTextId(UUID textId) {
    this.textId = textId;
  }

  public String getProcessorType() {
    return processorType;
  }

  public void setProcessorType(String processorType) {
    this.processorType = processorType;
  }

}
