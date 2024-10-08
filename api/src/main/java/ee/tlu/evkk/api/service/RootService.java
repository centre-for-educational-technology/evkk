package ee.tlu.evkk.api.service;

import ee.tlu.evkk.api.exception.TokenNotFoundException;
import ee.tlu.evkk.api.service.interfaces.AbstractAccessTokenService;
import ee.tlu.evkk.api.service.interfaces.AbstractRefreshTokenService;
import ee.tlu.evkk.dal.dao.UserDao;
import ee.tlu.evkk.dal.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import static ee.tlu.evkk.api.constant.AuthConstants.REFRESH_TOKEN_COOKIE_NAME;
import static java.util.Arrays.stream;

@Service
@RequiredArgsConstructor
public class RootService {

  private final AbstractAccessTokenService accessTokenService;
  private final AbstractRefreshTokenService refreshTokenService;
  private final UserDao userDao;

  public User getUser(HttpServletRequest request) throws TokenNotFoundException {
    var refreshToken = getRefreshToken(request);
    if (refreshToken == null || refreshTokenService.isTokenInvalid(refreshToken)) return null;

    return userDao.findByRefreshToken(refreshToken)
      .orElseThrow(TokenNotFoundException::new);
  }

  public String getAccessToken(User user) {
    if (user == null) return null;
    return accessTokenService.getAccessToken(user);
  }

  private String getRefreshToken(HttpServletRequest request) {
    if (request.getCookies() != null) {
      Cookie tokenCookie = stream(request.getCookies())
        .filter(cookie -> cookie.getName().equals(REFRESH_TOKEN_COOKIE_NAME))
        .findFirst().orElse(null);
      return tokenCookie != null
        ? tokenCookie.getValue()
        : null;
    }

    return null;
  }
}
