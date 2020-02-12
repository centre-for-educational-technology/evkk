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

  public UriComponentsBuilder charCounter() {
    return UriComponentsBuilder.fromHttpUrl(charCounterPath);
  }

}
