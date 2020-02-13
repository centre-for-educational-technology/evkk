package ee.tlu.evkk.api.service;

import ee.tlu.evkk.api.dao.UserFileDao;
import ee.tlu.evkk.api.dao.dto.FileType;
import ee.tlu.evkk.api.dao.dto.UserFile;
import org.springframework.core.io.InputStreamSource;
import org.springframework.stereotype.Service;

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

}
