package ee.tlu.evkk.api.dao.dto;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
public class UserFile {

  private UUID userFileId;
  private UUID fileId;
  private UUID userId;
  private String name;

  public UUID getUserFileId() {
    return userFileId;
  }

  public void setUserFileId(UUID userFileId) {
    this.userFileId = userFileId;
  }

  public UUID getFileId() {
    return fileId;
  }

  public void setFileId(UUID fileId) {
    this.fileId = fileId;
  }

  public UUID getUserId() {
    return userId;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

}
