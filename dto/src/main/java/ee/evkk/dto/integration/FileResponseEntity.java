package ee.evkk.dto.integration;

import java.time.Instant;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
public class FileResponseEntity {

  private UUID userFileId;
  private String name;
  private String url;
  private String mediaType;
  private Instant createdAt;
  private Boolean isPublic;

  public UUID getUserFileId() {
    return userFileId;
  }

  public void setUserFileId(UUID userFileId) {
    this.userFileId = userFileId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
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
