package ee.tlu.evkk.api.controller.dto;

import java.util.Map;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 17.04.2022
 */
public class TextSearchResponse {

  private UUID textId;
  private String content;
  private Map<String, String> properties;
  private String downloadUrl;

  public UUID getTextId() {
    return textId;
  }

  public void setTextId(UUID textId) {
    this.textId = textId;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Map<String, String> getProperties() {
    return properties;
  }

  public void setProperties(Map<String, String> properties) {
    this.properties = properties;
  }

  public String getDownloadUrl() {
    return downloadUrl;
  }

  public void setDownloadUrl(String downloadUrl) {
    this.downloadUrl = downloadUrl;
  }

}
