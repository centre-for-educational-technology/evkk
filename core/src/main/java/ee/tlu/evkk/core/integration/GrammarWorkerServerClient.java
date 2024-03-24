package ee.tlu.evkk.core.integration;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;

import java.util.Collections;
import java.util.Map;

/**
 * @author Mikk Tarvas
 * Date: 30.09.2021
 */
public class GrammarWorkerServerClient extends AbstractRestOperationsClient {

  private final RestOperations rest;

  public GrammarWorkerServerClient(RestOperations restOperations) {
    this.rest = restOperations;
  }

  public String getGrammarWorker(String tekst) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON)); // Explicitly accept JSON

    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map, headers);
    ResponseEntity<String> forEntity = retry().execute(context -> rest.postForEntity("/grammarchecker", requestEntity, String.class));
    return forEntity.getBody();
  }

  public String getSpeller(String tekst) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON)); // Explicitly accept JSON

    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map, headers);
    ResponseEntity<String> forEntity = retry().execute(context -> rest.postForEntity("/spellchecker", requestEntity, String.class));
    return forEntity.getBody();
  }

}
