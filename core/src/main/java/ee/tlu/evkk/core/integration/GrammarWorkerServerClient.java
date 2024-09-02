package ee.tlu.evkk.core.integration;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;

import java.util.Map;

@RequiredArgsConstructor
public class GrammarWorkerServerClient extends AbstractRestOperationsClient {

  private static final String MAP_PARAMETER = "tekst";

  private final RestOperations rest;

  // TODO ELLE-310 use this when request to Tartu's API fails
  public String getGrammarWorker(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String> forEntity = retry().execute(context -> rest.postForEntity("/grammarchecker", requestEntity, String.class));
    return forEntity.getBody();
  }

  public String getSpeller(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String> forEntity = retry().execute(context -> rest.postForEntity("/spellchecker", requestEntity, String.class));
    return forEntity.getBody();
  }

}
