package ee.tlu.evkk.api.service;

import ee.tlu.evkk.api.dao.UserFileDao;
import ee.tlu.evkk.api.dao.dto.FileType;
import ee.tlu.evkk.api.dao.dto.UserFile;
import ee.tlu.evkk.api.dao.dto.UserFileView;
import ee.tlu.evkk.api.exception.FieldAwareBusinessException;
import ee.tlu.evkk.api.exception.FileContentExtractionException;
import ee.tlu.evkk.api.exception.FileNotFoundException;
import ee.tlu.evkk.api.exception.UnsupportedFileFormatException;
import ee.tlu.evkk.api.io.IOUtils;
import ee.tlu.evkk.api.service.dto.GetFileResult;
import ee.tlu.evkk.api.service.dto.GetUserFileResult;
import ee.tlu.evkk.api.text.extractor.ContentExtractorExecutor;
import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import ee.tlu.evkk.api.text.extractor.ex.UnsupportedMimeTypeException;
import org.springframework.core.io.InputStreamSource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
  private final ContentExtractorExecutor contentExtractorExecutor;

  public UserFileService(FileService fileService, UserFileDao userFileDao, ContentExtractorExecutor contentExtractorExecutor) {
    this.fileService = fileService;
    this.userFileDao = userFileDao;
    this.contentExtractorExecutor = contentExtractorExecutor;
  }

  public void insert(UUID userId, MultipartFile[] files) throws FieldAwareBusinessException {
    for (int i = 0; i < files.length; i++) {
      MultipartFile file = files[i];
      try {
        insert(userId, file.getOriginalFilename(), IOUtils.cacheInputStreamSource(file), file.getContentType());
      } catch (UnsupportedFileFormatException | FileContentExtractionException ex) {
        throw new FieldAwareBusinessException("file[" + i + "]", ex);
      }
    }
  }

  private UUID insert(UUID userId, String fileName, InputStreamSource iss, String mediaType) throws UnsupportedFileFormatException, FileContentExtractionException {
    Map<String, String> metadata = new HashMap<>();
    metadata.put("userId", userId.toString());
    UUID fileId = fileService.insert(iss, FileType.USER_UPLOAD, mediaType, metadata);

    String content;
    try {
      content = contentExtractorExecutor.extract(iss, fileName);
    } catch (TextExtractionException ex) {
      throw new FileContentExtractionException(); //TODO: args?
    } catch (UnsupportedMimeTypeException ex) {
      throw new UnsupportedFileFormatException(); //TODO: args?
    }

    UserFile userFile = new UserFile();
    userFile.setFileId(fileId);
    userFile.setUserId(userId);
    userFile.setName(fileName);
    userFile.setContent(content);
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
