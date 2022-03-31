package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.ApiMapper;
import ee.tlu.evkk.api.controller.dto.StatusResponseEntity;
import ee.tlu.evkk.api.security.AuthenticatedUser;
import ee.tlu.evkk.api.service.SessionTokenService;
import ee.tlu.evkk.common.env.ServiceLocator;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@RestController
@RequestMapping("/")
public class RootController {

  private final ServiceLocator serviceLocator;
  private final SessionTokenService sessionTokenService;

  public RootController(ServiceLocator serviceLocator, SessionTokenService sessionTokenService) {
    this.serviceLocator = serviceLocator;
    this.sessionTokenService = sessionTokenService;
  }

  @GetMapping("/status")
  public StatusResponseEntity status(@AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
    String loggedInEmailAddress = authenticatedUser == null ? null : authenticatedUser.getUsername();
    return ApiMapper.INSTANCE.toStatusResponseEntity(loggedInEmailAddress, buildIntegrationPaths(authenticatedUser));
  }

  private Map<String, String> buildIntegrationPaths(AuthenticatedUser authenticatedUser) {
    Map<String, UriComponentsBuilder> uris = new HashMap<>();
    UriComponentsBuilder clusterFinderUri = UriComponentsBuilder.fromUri(serviceLocator.locate(ServiceLocator.ServiceName.CLUSTER_FINDER));
    uris.put("clusterFinder", clusterFinderUri);

    // If user is logged in, inject session token to uri
    if (authenticatedUser != null) {
      UUID userId = authenticatedUser.getUserId();
      String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();
      UUID sessionTokenId = sessionTokenService.getSessionTokenId(userId, sessionId);
      for (Map.Entry<String, UriComponentsBuilder> entry : uris.entrySet()) {
        UriComponentsBuilder withSessionToken = entry.getValue().queryParam("evkkSessionToken", sessionTokenId.toString());
        uris.put(entry.getKey(), withSessionToken);
      }
    }

    Map<String, String> result = new HashMap<>();
    for (Map.Entry<String, UriComponentsBuilder> entry : uris.entrySet()) result.put(entry.getKey(), entry.getValue().toUriString());
    return result;
  }

}
