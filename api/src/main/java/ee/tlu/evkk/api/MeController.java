package ee.tlu.evkk.api;

import ee.tlu.evkk.api.controller.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static ee.tlu.evkk.api.ApiMapper.INSTANCE;
import static ee.tlu.evkk.api.config.AuthenticatedUserInfo.getAuthenticatedUser;

@RestController
@RequiredArgsConstructor
@RequestMapping("user/me")
public class MeController {

  @GetMapping
  public UserDto getUserDetails() {
    return INSTANCE.toUserDto(getAuthenticatedUser());
  }
}
