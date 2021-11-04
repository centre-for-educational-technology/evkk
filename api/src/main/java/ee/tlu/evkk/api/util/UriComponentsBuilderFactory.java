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

  @Value("${evkk.api.integration.paths.clusterfinder}")
  private String clusterFinderPath;
  @Value("${evkk.api.integration.paths.stanza}")
  private String stanzaPath;
  @Value("${evkk.api.apiPath}")
  private String apiPath;

  public UriComponentsBuilder clusterFinder() {
    return UriComponentsBuilder.fromHttpUrl(clusterFinderPath);
  }

  public UriComponentsBuilder stanza() {
    return UriComponentsBuilder.fromHttpUrl(stanzaPath);
  }

  public UriComponentsBuilder api() {
    return UriComponentsBuilder.fromHttpUrl(apiPath);
  }

}
