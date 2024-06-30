package ee.tlu.evkk.core.integration;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;

import java.util.Map;

import static java.util.Collections.singletonList;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@RequiredArgsConstructor
public class GrammarWorkerServerClient extends AbstractRestOperationsClient {

  private final RestOperations rest;

  public String getGrammarWorker(String tekst) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(APPLICATION_JSON);
    headers.setAccept(singletonList(APPLICATION_JSON));

    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map, headers);
    ResponseEntity<String> forEntity = retry().execute(context -> rest.postForEntity("/grammarchecker", requestEntity, String.class));
    return forEntity.getBody();
  }

  public String getSpeller(String tekst) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(APPLICATION_JSON);
    headers.setAccept(singletonList(APPLICATION_JSON));

    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map, headers);
    ResponseEntity<String> forEntity = retry().execute(context -> rest.postForEntity("/spellchecker", requestEntity, String.class));
    return forEntity.getBody();
  }

}
