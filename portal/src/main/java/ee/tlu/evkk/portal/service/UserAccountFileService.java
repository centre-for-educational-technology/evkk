package ee.tlu.evkk.portal.service;

import ee.tlu.evkk.dal.dao.UserAccountFileDao;
import ee.tlu.evkk.dal.dto.UserAccountFile;
import ee.tlu.evkk.dal.dto.UserAccountFileView;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
@Component
public class UserAccountFileService {

    @Autowired
    private FileService fileService;
    @Autowired
    private UserAccountFileDao userAccountFileDao;

    public UUID insert(UUID userAccountId, InputStream contents, String name, String contentType) throws IOException, SQLException {
        UUID fileId = fileService.createFile(contents, name, contentType);
        UserAccountFile userAccountFile = new UserAccountFile();
        userAccountFile.setFileId(fileId);
        userAccountFile.setUserAccountId(userAccountId);
        return userAccountFileDao.insert(userAccountFile);
    }

    public ResponseEntity<Resource> getFile(UUID userAccountId, UUID userAccountFileId) throws SQLException, IOException {
        UserAccountFileView fileView = userAccountFileDao.getViewByUserAccountFileId(userAccountFileId);
        if (!userAccountId.equals(fileView.getUserAccountId())) {
            throw new AccessDeniedException("access denied");
        }

        InputStream contents = fileService.getFileContents(fileView.getFileId());
        //TODO: we actually do not want to hold entire file in memory at once, but because transaction is active only inside controller, this is a temporary work-around
        byte[] bytes = IOUtils.toByteArray(contents);

        HttpHeaders headers = new HttpHeaders();
        if (fileView.getContentType() != null) {
            MediaType mediaType = MediaType.parseMediaType(fileView.getContentType());
            headers.setContentType(mediaType);
        }

        ContentDisposition contentDisposition = ContentDisposition.builder("attachment").filename(fileView.getName(), StandardCharsets.UTF_8).build();
        headers.setContentDisposition(contentDisposition);

        return new ResponseEntity<>(new ByteArrayResource(bytes), headers, HttpStatus.OK);
    }

}