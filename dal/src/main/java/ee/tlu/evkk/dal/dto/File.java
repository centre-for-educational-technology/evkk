package ee.tlu.evkk.dal.dto;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
public class File {

    private UUID fileId;
    private Long oid;
    private String name;
    private String contentType;
    private LocalDateTime createdAt;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}