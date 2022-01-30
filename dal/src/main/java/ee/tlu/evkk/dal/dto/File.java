package ee.tlu.evkk.dal.dto;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
public class File {

  private UUID fileId;
  private Long oid;
  private FileType fileType;
  private String mediaType;
  private Json2 metadata;

  public UUID getFileId() {
    return fileId;
  }

  public void setFileId(UUID fileId) {
    this.fileId = fileId;
  }

  public Long getOid() {
    return oid;
  }

  public void setOid(Long oid) {
    this.oid = oid;
  }

  public FileType getFileType() {
    return fileType;
  }

  public void setFileType(FileType fileType) {
    this.fileType = fileType;
  }

  public String getMediaType() {
    return mediaType;
  }

  public void setMediaType(String mediaType) {
    this.mediaType = mediaType;
  }

  public Json2 getMetadata() {
    return metadata;
  }

  public void setMetadata(Json2 metadata) {
    this.metadata = metadata;
  }

}
