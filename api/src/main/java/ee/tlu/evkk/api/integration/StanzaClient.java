package ee.tlu.evkk.api.integration;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;

import java.util.Map;

/**
 * @author Mikk Tarvas
 * Date: 30.09.2021
 */
public class StanzaClient {

  private final RestOperations rest;

  public StanzaClient(RestOperations restOperations) {
    this.rest = restOperations;
  }

  public String[] getLemmad(String tekst) {
    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = rest.postForEntity("/lemmad", requestEntity, String[].class);
    return forEntity.getBody();
  }

  public String[] getLaused(String tekst) {
    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = rest.postForEntity("/lemmad", requestEntity, String[].class);
    return forEntity.getBody();
  }

  public String[] getSonad(String tekst) {
    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = rest.postForEntity("/sonad", requestEntity, String[].class);
    return forEntity.getBody();
  }

<<<<<<< HEAD
  public String[] getKorrektuur(String tekst) {
    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = rest.postForEntity("/korrektuur", requestEntity, String[].class);
    return forEntity.getBody();
  }

=======
  public String[][] getKeeletase(String tekst) {
    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[][]> forEntity = rest.postForEntity("/keeletase", requestEntity, String[][].class);
    return forEntity.getBody();
  }


>>>>>>> jaagup20211202
}
