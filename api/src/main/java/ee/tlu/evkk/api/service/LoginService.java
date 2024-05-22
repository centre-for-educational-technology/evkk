package ee.tlu.evkk.api.service;

import ee.tlu.evkk.api.controller.dto.UserLoginDto;
import ee.tlu.evkk.api.controller.dto.UserTokensDto;
import ee.tlu.evkk.api.service.dto.HarIdUserResponse;
import ee.tlu.evkk.dal.dao.UserDao;
import ee.tlu.evkk.dal.dto.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletResponse;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

  private final JwtService jwtService;
  private final RefreshTokenService refreshTokenService;
  private final UserDao userDao;

  public UserLoginDto login(HarIdUserResponse harIdUser) {
    User user = userDao.findByIdCode(harIdUser.getPureIdCode());
    if (user == null) {
      user = createNewUser(harIdUser);
    }

    return new UserLoginDto(
      jwtService.generateToken(user),
      refreshTokenService.generateToken(user).getToken()
    );
  }

  public RedirectView finalizeLogin(UserLoginDto userLoginDto, HttpServletResponse response) {
    if (!userLoginDto.isLoginFailed() && !userLoginDto.isIdCodeMissing() && !userLoginDto.isRedirectToHarId()) {
      refreshTokenService.createCookie(userLoginDto.getRefreshToken(), response);
    }
    return new RedirectView(userLoginDto.getRedirectUri().toString());
  }

  public void logout(UserTokensDto userTokensDto, HttpServletResponse response) {
    jwtService.blacklistToken(userTokensDto.getAccessToken());
    refreshTokenService.revokeTokenAndRemoveCookie(userTokensDto.getRefreshToken(), response);
    SecurityContextHolder.getContext().setAuthentication(null);
  }

  private User createNewUser(HarIdUserResponse harIdUser) {
    String idCode = harIdUser.getIdCode();

    User user = User
      .builder()
      .emailAddress(harIdUser.getEmail())
      .idCode(harIdUser.getIdCode().split(":")[2])
      .idCodePrefix(idCode.substring(0, idCode.indexOf(':', idCode.indexOf(':') + 1)))
      .firstName(harIdUser.getFirstName())
      .lastName(harIdUser.getLastName())
      .roleName("USER")
      .uiLocales(harIdUser.getUiLocales())
      .build();

    User newUser = userDao.insert(user);
    log.info("New user created with ID {}", newUser.getUserId());
    return newUser;
  }
}
