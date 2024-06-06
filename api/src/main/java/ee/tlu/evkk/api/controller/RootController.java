package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.controller.dto.StatusResponseEntity;
import ee.tlu.evkk.common.env.ServiceLocator;
import ee.tlu.evkk.dal.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

import static ee.tlu.evkk.api.ApiMapper.INSTANCE;
import static ee.tlu.evkk.common.env.ServiceLocator.ServiceName.CLUSTER_FINDER;
import static org.springframework.web.util.UriComponentsBuilder.fromUri;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@RestController
@RequiredArgsConstructor
@RequestMapping
public class RootController {

  private final ServiceLocator serviceLocator;

  @GetMapping("/status")
  public StatusResponseEntity status(@AuthenticationPrincipal User user) {
    var userDto = user == null ? null : INSTANCE.toUserDto(user);
    return INSTANCE.toStatusResponseEntity(userDto, buildIntegrationPaths());
  }

  private Map<String, String> buildIntegrationPaths() {
    Map<String, UriComponentsBuilder> uris = new HashMap<>();
    UriComponentsBuilder clusterFinderUri = fromUri(serviceLocator.locate(CLUSTER_FINDER));
    uris.put("clusterFinder", clusterFinderUri);

    Map<String, String> result = new HashMap<>();
    for (Map.Entry<String, UriComponentsBuilder> entry : uris.entrySet())
      result.put(entry.getKey(), entry.getValue().toUriString());
    return result;
  }

}
