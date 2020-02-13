package ee.tlu.evkk.api.controller.integration;

import ee.tlu.evkk.api.ApiMapper;
import ee.tlu.evkk.api.controller.integration.dto.FileResponseEntity;
import ee.tlu.evkk.api.dao.UserFileDao;
import ee.tlu.evkk.api.dao.dto.UserFileView;
import ee.tlu.evkk.api.service.SessionTokenService;
import ee.tlu.evkk.api.util.UriComponentsBuilderFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
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

  public IntegrationFileController(SessionTokenService sessionTokenService, UserFileDao userFileDao, UriComponentsBuilderFactory uriComponentsBuilderFactory) {
    super(sessionTokenService);
    this.userFileDao = userFileDao;
    this.uriComponentsBuilderFactory = uriComponentsBuilderFactory;
    this.sessionTokenService = sessionTokenService;
  }

  @GetMapping("/list")
  public List<FileResponseEntity> listFiles(HttpServletRequest request) {
    List<FileResponseEntity> files = new ArrayList<>();

    //TODO: add public files
    UUID userId = getUserIdForAccessToken(request);
    if (userId != null) files.addAll(getUserFiles(userId));

    return files;
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
