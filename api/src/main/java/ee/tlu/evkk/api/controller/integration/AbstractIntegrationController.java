package ee.tlu.evkk.api.controller.integration;

import ee.tlu.evkk.api.dao.dto.SessionToken;
import ee.tlu.evkk.api.exception.SessionNotFoundException;
import ee.tlu.evkk.api.service.SessionTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
public abstract class AbstractIntegrationController {

  private static final Logger log = LoggerFactory.getLogger(AbstractIntegrationController.class);

  private final SessionTokenService sessionTokenService;

  protected AbstractIntegrationController(SessionTokenService sessionTokenService) {
    this.sessionTokenService = sessionTokenService;
  }

  protected UUID getUserIdForAccessToken(HttpServletRequest request) {
    UUID accessToken = extractAccessToken(request);
    if (accessToken == null) return null;
    SessionToken sessionToken;
    try {
      sessionToken = sessionTokenService.getSessionToken(accessToken);
    } catch (SessionNotFoundException ex) {
      throw new AccessDeniedException("Session not found for access token", ex);
    }
    return sessionToken.getUserId();
  }

  private UUID extractAccessToken(HttpServletRequest request) {
    String asString = extractAccessTokenAsString(request);
    if (!hasText(asString)) return null;
    try {
      return UUID.fromString(asString.strip());
    } catch (IllegalArgumentException ex) {
      log.warn("Invalid UUID: {}", ex.getMessage());
      return null;
    }
  }

  private String extractAccessTokenAsString(HttpServletRequest request) {
    String fromParameter = request.getParameter("evkkAccessToken");
    if (hasText(fromParameter)) return fromParameter;
    String fromHeader1 = request.getHeader("evkk-access-token");
    if (hasText(fromHeader1)) return fromHeader1;
    String fromHeader2 = request.getHeader("EVKK-ACCESS-TOKEN");
    if (hasText(fromHeader1)) return fromHeader2;
    return null;
  }

  private static boolean hasText(String candidate) {
    return candidate != null && !candidate.isBlank();
  }

}
