package ee.tlu.evkk.api.service;

import ee.tlu.evkk.api.dao.UserFileDao;
import ee.tlu.evkk.api.dao.dto.FileType;
import ee.tlu.evkk.api.dao.dto.UserFile;
import ee.tlu.evkk.api.dao.dto.UserFileView;
import ee.tlu.evkk.api.exception.FileNotFoundException;
import ee.tlu.evkk.api.service.dto.GetFileResult;
import ee.tlu.evkk.api.service.dto.GetUserFileResult;
import org.springframework.core.io.InputStreamSource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
@Service
public class UserFileService {

  private final FileService fileService;
  private final UserFileDao userFileDao;

  public UserFileService(FileService fileService, UserFileDao userFileDao) {
    this.fileService = fileService;
    this.userFileDao = userFileDao;
  }

  public UUID insert(UUID userId, String fileName, InputStreamSource inputStreamSource, String mediaType) {
    Map<String, String> metadata = new HashMap<>();
    metadata.put("userId", userId.toString());
    UUID fileId = fileService.insert(inputStreamSource, FileType.USER_UPLOAD, mediaType, metadata);
    UserFile userFile = new UserFile();
    userFile.setFileId(fileId);
    userFile.setUserId(userId);
    userFile.setName(fileName);
    return userFileDao.insert(userFile);
  }

  public GetUserFileResult get(UUID userFileId) throws FileNotFoundException {
    UserFileView userFileView = userFileDao.findViewById(userFileId);
    if (userFileView == null) throw new FileNotFoundException();
    GetFileResult result = fileService.get(userFileView.getFileId(), FileType.USER_UPLOAD);

    return new GetUserFileResult() {
      @Override
      public UserFileView getUserFile() {
        return userFileView;
      }

      @Override
      public InputStream getContent() throws IOException {
        return result.getContent();
      }
    };
  }

}
