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
    // "tere tore juku läks kooli. väga tore"
    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = rest.postForEntity("/lemmad", requestEntity, String[].class);
    return forEntity.getBody();
  }

  public String[] getLaused(String tekst) {
    Map<String, String> map = Map.of("tekst", "tere tore juku läks kooli. väga tore");
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = rest.postForEntity("/lemmad", requestEntity, String[].class);
    return forEntity.getBody();
  }

  public String[] getSonad(String tekst) {
    Map<String, String> map = Map.of("tekst", "tere tore juku läks kooli. väga tore");
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = rest.postForEntity("/sonad", requestEntity, String[].class);
    return forEntity.getBody();
  }

}
