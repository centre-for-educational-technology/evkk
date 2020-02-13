package ee.tlu.evkk.api.dao.dto;

import java.time.Instant;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
public class UserFileView extends UserFile {

  private String mediaType;
  private Instant createdAt;

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
