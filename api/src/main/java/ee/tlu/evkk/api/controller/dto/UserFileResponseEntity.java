package ee.tlu.evkk.api.controller.dto;

import java.time.Instant;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
public class UserFileResponseEntity {

  private UUID userFileId;
  private String name;
  private String mediaType;
  private Instant createdAt;

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

}
