package ee.tlu.evkk.core.integration;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;

import java.util.Map;

/**
 * @author Mikk Tarvas
 * Date: 30.09.2021
 */
public class StanzaServerClient extends AbstractRestOperationsClient {

  private final RestOperations rest;

  public StanzaServerClient(RestOperations restOperations) {
    this.rest = restOperations;
  }

  public String[] getSonaliik(String tekst) {
    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/sonaliik", requestEntity, String[].class));
    return forEntity.getBody();
  }

  public String[] getLemmad(String tekst) {
    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/lemmad", requestEntity, String[].class));
    return forEntity.getBody();
  }

  public String[][] getLaused(String tekst) {
    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[][]> forEntity = retry().execute(context -> rest.postForEntity("/laused", requestEntity, String[][].class));
    return forEntity.getBody();
  }

  public String[] getSonad(String tekst) {
    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/sonad", requestEntity, String[].class));
    return forEntity.getBody();
  }

  public String[][] getKeeletase(String tekst) {
    Map<String, String> map = Map.of("tekst", tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[][]> forEntity = retry().execute(context -> rest.postForEntity("/keeletase", requestEntity, String[][].class));
    return forEntity.getBody();
  }

  public String getStanzaConllu(String tekst, String failinimi, String keel) {
    Map<String, String> map = Map.of("tekst", tekst, "failinimi", failinimi, "keel", keel);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
   ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/stanzaconllu", requestEntity, String[].class));
    return forEntity.getBody()[0];
  }

  public String[] getTahedSonadLaused(String tekst, String keel) {
    Map<String, String> map = Map.of("tekst", tekst, "keel", keel);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
   ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/tahedsonadlaused", requestEntity, String[].class));
    return forEntity.getBody();
  }

  public String getTervitus(){
    return retry().execute(context -> rest.getForEntity("/tervitus", String.class)).getBody();
  }

}
