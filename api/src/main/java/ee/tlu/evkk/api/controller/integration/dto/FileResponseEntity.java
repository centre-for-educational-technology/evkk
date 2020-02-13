package ee.tlu.evkk.api.controller.integration.dto;

import java.time.Instant;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
public class FileResponseEntity {

  private String name;
  private String url;
  private String mediaType;
  private Instant createdAt;
  private Boolean isPublic;

  public String getName() {
    return name;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getMediaType() {
    return mediaType;
  }

  public void setMediaType(String mediaType) {
    this.mediaType = mediaType;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Instant createdAt) {
    this.createdAt = createdAt;
  }

  public Boolean getPublic() {
    return isPublic;
  }

  public void setPublic(Boolean aPublic) {
    isPublic = aPublic;
  }

}
