package ee.tlu.evkk.core.integration;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;

import java.util.Map;

/**
 * @author Mikk Tarvas
 * Date: 30.09.2021
 */
public class CorrectorServerClient extends AbstractRestOperationsClient {

  private final RestOperations rest;

  public CorrectorServerClient(RestOperations restOperations) {
    this.rest = restOperations;
  }

  public String[] getKorrektuur(String tekst) {
    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/korrektuur", requestEntity, String[].class));
    return forEntity.getBody();
  }

}
