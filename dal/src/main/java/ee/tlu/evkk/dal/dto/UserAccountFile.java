package ee.tlu.evkk.dal.dto;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
public class UserAccountFile {

    private UUID userAccountFileId;
    private UUID fileId;
    private UUID userAccountId;

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

}