package ee.tlu.evkk.dal.dto;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
public class TextProcessorResult {

  private UUID textProcessorResultId;
  private String textHash;
  private String type;
  private Long version;
  private Json result;

  public UUID getTextProcessorResultId() {
    return textProcessorResultId;
  }

  public void setTextProcessorResultId(UUID textProcessorResultId) {
    this.textProcessorResultId = textProcessorResultId;
  }

  public String getTextHash() {
    return textHash;
  }

  public void setTextHash(String textHash) {
    this.textHash = textHash;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Long getVersion() {
    return version;
  }

  public void setVersion(Long version) {
    this.version = version;
  }

  public Json getResult() {
    return result;
  }

  public void setResult(Json result) {
    this.result = result;
  }

}
