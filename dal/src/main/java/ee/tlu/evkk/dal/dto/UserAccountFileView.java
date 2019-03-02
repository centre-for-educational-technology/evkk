package ee.tlu.evkk.dal.dto;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
public class UserAccountFileView {

    private UUID userAccountFileId;
    private UUID fileId;
    private UUID userAccountId;
    private String name;
    private String contentType;
    private LocalDateTime createdAt;

    public UUID getUserAccountFileId() {
        return userAccountFileId;
    }

    public void setUserAccountFileId(UUID userAccountFileId) {
        this.userAccountFileId = userAccountFileId;
    }

    public UUID getFileId() {
        return fileId;
    }

    public void setFileId(UUID fileId) {
        this.fileId = fileId;
    }

    public UUID getUserAccountId() {
        return userAccountId;
    }

    public void setUserAccountId(UUID userAccountId) {
        this.userAccountId = userAccountId;
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