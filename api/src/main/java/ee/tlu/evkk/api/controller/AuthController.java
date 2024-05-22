package ee.tlu.evkk.api.controller;

import ee.evkk.dto.enums.Language;
import ee.tlu.evkk.api.controller.dto.AccessTokenDto;
import ee.tlu.evkk.api.controller.dto.RefreshTokenDto;
import ee.tlu.evkk.api.controller.dto.UserLoginDto;
import ee.tlu.evkk.api.controller.dto.UserTokensDto;
import ee.tlu.evkk.api.exception.TokenExpiredException;
import ee.tlu.evkk.api.exception.TokenNotFoundException;
import ee.tlu.evkk.api.service.HarIdService;
import ee.tlu.evkk.api.service.LoginService;
import ee.tlu.evkk.api.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URISyntaxException;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthController {

  private final HarIdService harIdService;
  private final RefreshTokenService refreshTokenService;
  private final LoginService loginService;

  @GetMapping("login/harid")
  public RedirectView loginWithHarId(@RequestParam Language language) throws URISyntaxException {
    return new RedirectView(harIdService.getHarIdAuthenticationUri(language).toString());
  }

  @GetMapping("login/harid/success")
  public RedirectView loginWithHarIdSuccess(@RequestParam(value = "code", required = false) String code,
                                            HttpServletResponse response) throws URISyntaxException {
    UserLoginDto userLoginDto = harIdService.authenticateWithHarIdToken(code);
    return loginService.finalizeLogin(userLoginDto, response);
  }

  @PostMapping("renew")
  public AccessTokenDto renewTokens(@RequestBody RefreshTokenDto refreshTokenDto,
                                    HttpServletResponse response) throws TokenNotFoundException, TokenExpiredException {
    return refreshTokenService.renewToken(refreshTokenDto, response);
  }

  @DeleteMapping("logout")
  public void logout(@RequestBody @Valid UserTokensDto userTokensDto, HttpServletResponse response) {
    loginService.logout(userTokensDto, response);
  }
}
