package ee.tlu.evkk.api.controller.integration;

import ee.evkk.dto.integration.FileResponseEntity;
import ee.tlu.evkk.api.ApiMapper;
import ee.tlu.evkk.api.controller.support.ResponseEntityFactory;
import ee.tlu.evkk.api.dao.UserFileDao;
import ee.tlu.evkk.api.dao.dto.UserFileView;
import ee.tlu.evkk.api.exception.FileNotFoundException;
import ee.tlu.evkk.api.service.SessionTokenService;
import ee.tlu.evkk.api.service.UserFileService;
import ee.tlu.evkk.api.service.dto.GetUserFileResult;
import ee.tlu.evkk.api.util.UriComponentsBuilderFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
@Controller
@RequestMapping("/integration/file")
public class IntegrationFileController extends AbstractIntegrationController {

  private final UserFileDao userFileDao;
  private final UriComponentsBuilderFactory uriComponentsBuilderFactory;
  private final SessionTokenService sessionTokenService;
  private final UserFileService userFileService;
  private final ResponseEntityFactory responseEntityFactory;

  public IntegrationFileController(SessionTokenService sessionTokenService, UserFileDao userFileDao, UriComponentsBuilderFactory uriComponentsBuilderFactory,
                                   UserFileService userFileService, ResponseEntityFactory responseEntityFactory) {
    super(sessionTokenService);
    this.userFileDao = userFileDao;
    this.uriComponentsBuilderFactory = uriComponentsBuilderFactory;
    this.sessionTokenService = sessionTokenService;
    this.userFileService = userFileService;
    this.responseEntityFactory = responseEntityFactory;
  }

  @ResponseBody
  @Transactional
  @GetMapping("/list")
  public List<FileResponseEntity> listFiles(HttpServletRequest request) {
    List<FileResponseEntity> files = new ArrayList<>();

    //TODO: add public files?
    UUID userId = getUserIdForAccessToken(request);
    if (userId != null) files.addAll(getUserFiles(userId));

    return files;
  }


  @ResponseBody
  @Transactional
  @PostMapping("/upload")
  public FileResponseEntity uploadFile(HttpServletRequest request, @RequestParam("file") MultipartFile[] files) {
    UUID userId = getUserIdForAccessToken(request);
    //TODO: impl
    return null;
  }

  @Transactional
  @GetMapping("/download")
  public ResponseEntity<Resource> download(HttpServletRequest request, @RequestParam("userFileId") UUID userFileId) throws FileNotFoundException, IOException {
    UUID userId = getUserIdForAccessToken(request);
    //TODO: ACL

    GetUserFileResult userFileResult = userFileService.get(userFileId);
    UserFileView userFile = userFileResult.getUserFile();
    return responseEntityFactory.download(userFile.getName(), userFile.getCreatedAt(), userFileResult.getContent());
  }

  private List<FileResponseEntity> getUserFiles(UUID userId) {
    UriComponentsBuilder apiUri = uriComponentsBuilderFactory.api();
    List<UserFileView> userFileViews = userFileDao.findViewsByUserId(userId);
    List<FileResponseEntity> result = new ArrayList<>(userFileViews.size());
    String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();
    UUID sessionTokenId = sessionTokenService.getSessionTokenId(userId, sessionId);

    for (UserFileView userFileView : userFileViews) {
      String url = apiUri
        .cloneBuilder()
        .pathSegment("integration", "file", userFileView.getUserFileId().toString())
        .queryParam("evkkAccessToken", sessionTokenId.toString())
        .toUriString();

      result.add(ApiMapper.INSTANCE.toFileResponseEntity(userFileView, url, false));
    }

    return result;
  }

}
