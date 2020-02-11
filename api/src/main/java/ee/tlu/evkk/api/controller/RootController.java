package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.ApiMapper;
import ee.tlu.evkk.api.controller.dto.StatusResponseEntity;
import ee.tlu.evkk.api.security.AuthenticatedUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@RestController
@RequestMapping("/")
public class RootController {

  @GetMapping("/status")
  public StatusResponseEntity status(@AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
    String loggedInEmailAddress = authenticatedUser == null ? null : authenticatedUser.getUsername();
    return ApiMapper.INSTANCE.toStatusResponseEntity(loggedInEmailAddress);
  }

}
