package ee.tlu.evkk.api.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
@Component
public class UriComponentsBuilderFactory {

  @Value("${evkk.api.integration.paths.char-counter}")
  private String charCounterPath;
  @Value("${evkk.api.api-path}")
  private String apiPath;

  public UriComponentsBuilder charCounter() {
    return UriComponentsBuilder.fromHttpUrl(charCounterPath);
  }

  public UriComponentsBuilder api() {
    return UriComponentsBuilder.fromHttpUrl(apiPath);
  }

}
