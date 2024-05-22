package ee.tlu.evkk.api.service;

import ee.tlu.evkk.api.controller.dto.AccessTokenDto;
import ee.tlu.evkk.api.controller.dto.RefreshTokenDto;
import ee.tlu.evkk.api.exception.TokenExpiredException;
import ee.tlu.evkk.api.exception.TokenNotFoundException;
import ee.tlu.evkk.dal.dao.RefreshTokenDao;
import ee.tlu.evkk.dal.dao.UserDao;
import ee.tlu.evkk.dal.dto.RefreshToken;
import ee.tlu.evkk.dal.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.math.BigInteger;
import java.security.SecureRandom;

import static ee.tlu.evkk.api.constant.AuthConstants.REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS;
import static ee.tlu.evkk.api.constant.AuthConstants.REFRESH_TOKEN_EXPIRES_IN_SECONDS;
import static java.time.Instant.now;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

  private final UserDao userDao;
  private final RefreshTokenDao refreshTokenDao;
  private final JwtService jwtService;

  public RefreshToken generateToken(User user) {
    refreshTokenDao.deleteByUserId(user.getUserId());

    RefreshToken refreshToken = RefreshToken.builder()
      .token(new BigInteger(130, new SecureRandom()).toString(32))
      .expiresAt(now().plusMillis(REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS))
      .userId(userDao.findByIdCode(user.getIdCode()).getUserId())
      .build();

    return refreshTokenDao.insert(refreshToken);
  }

  public AccessTokenDto renewToken(RefreshTokenDto refreshTokenDto, HttpServletResponse response) throws TokenNotFoundException, TokenExpiredException {
    RefreshToken token = refreshTokenDao.findByToken(refreshTokenDto.getToken());

    if (token == null) {
      throw new TokenNotFoundException();
    }

    if (token.getExpiresAt().isBefore(now())) {
      refreshTokenDao.deleteByUserId(token.getUserId());
      throw new TokenExpiredException();
    }

    User user = userDao.findById(token.getUserId());
    createCookie(generateToken(user).getToken(), response);
    return new AccessTokenDto(jwtService.generateToken(user));
  }

  public void revokeTokenAndRemoveCookie(String token, HttpServletResponse response) {
    refreshTokenDao.deleteByToken(token);
    removeCookie(response);
  }

  public void createCookie(String token, HttpServletResponse response) {
    Cookie refreshTokenCookie = new Cookie("refreshToken", token);
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setSecure(true);
    refreshTokenCookie.setPath("/");
    refreshTokenCookie.setMaxAge(REFRESH_TOKEN_EXPIRES_IN_SECONDS);

    response.addCookie(refreshTokenCookie);
  }

  private void removeCookie(HttpServletResponse response) {
    Cookie refreshTokenCookie = new Cookie("refreshToken", null);
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setSecure(true);
    refreshTokenCookie.setPath("/");
    refreshTokenCookie.setMaxAge(0);
    response.addCookie(refreshTokenCookie);
  }
}
