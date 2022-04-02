package ee.tlu.evkk.api.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@Component
public class ApiAuthenticationRedirectStrategy extends DefaultRedirectStrategy {

  private final ObjectMapper objectMapper;

  public ApiAuthenticationRedirectStrategy(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  @Override
  public void sendRedirect(HttpServletRequest request, HttpServletResponse response, String url) throws IOException {
    String redirectUrl = calculateRedirectUrl(request.getContextPath(), url);
    redirectUrl = response.encodeRedirectURL(redirectUrl);
    response.setStatus(HttpStatus.OK.value());
    Map<String, String> body = new HashMap<>();
    body.put("redirect", redirectUrl);
    String asString = objectMapper.writeValueAsString(body);
    IOUtils.write(asString, response.getOutputStream(), StandardCharsets.UTF_8); //TODO: does not work
    response.flushBuffer();
  }

}
