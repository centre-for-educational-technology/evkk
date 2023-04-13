package ee.tlu.evkk.core.integration;

import ee.tlu.evkk.dal.dto.WordAndPosInfoDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;

import java.util.Map;

import static java.util.Objects.requireNonNull;

/**
 * @author Mikk Tarvas
 * Date: 30.09.2021
 */
public class StanzaServerClient extends AbstractRestOperationsClient {

  private static final String MAP_PARAMETER = "tekst";

  private final RestOperations rest;

  public StanzaServerClient(RestOperations restOperations) {
    this.rest = restOperations;
  }

  public String[] getSonaliik(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/sonaliik", requestEntity, String[].class));
    return forEntity.getBody();
  }

  public String[] getSilbid(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/silbid", requestEntity, String[].class));
    return forEntity.getBody();
  }

  public String[][] getVormimargendid(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[][]> forEntity = retry().execute(context -> rest.postForEntity("/vormimargendid", requestEntity, String[][].class));
    return forEntity.getBody();
  }

  public String[] getLemmad(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/lemmad", requestEntity, String[].class));
    return forEntity.getBody();
  }

  public WordAndPosInfoDto[] getLemmadJaPosInfo(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<WordAndPosInfoDto[]> forEntity = retry().execute(context -> rest.postForEntity("/lemmadjaposinfo", requestEntity, WordAndPosInfoDto[].class));
    return forEntity.getBody();
  }

  public String[][] getLaused(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[][]> forEntity = retry().execute(context -> rest.postForEntity("/laused", requestEntity, String[][].class));
    return forEntity.getBody();
  }

  public WordAndPosInfoDto[][] getSonadLausetenaJaPosInfo(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<WordAndPosInfoDto[][]> forEntity = retry().execute(context -> rest.postForEntity("/sonadlausetenajaposinfo", requestEntity, WordAndPosInfoDto[][].class));
    return forEntity.getBody();
  }

  public WordAndPosInfoDto[][] getLemmadLausetenaJaPosInfo(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<WordAndPosInfoDto[][]> forEntity = retry().execute(context -> rest.postForEntity("/lemmadlausetenajaposinfo", requestEntity, WordAndPosInfoDto[][].class));
    return forEntity.getBody();
  }

  public String[] getSonad(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/sonad", requestEntity, String[].class));
    return forEntity.getBody();
  }

  public WordAndPosInfoDto[] getSonadJaPosInfo(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<WordAndPosInfoDto[]> forEntity = retry().execute(context -> rest.postForEntity("/sonadjaposinfo", requestEntity, WordAndPosInfoDto[].class));
    return forEntity.getBody();
  }

  public String[] getKeerukus(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/keerukus", requestEntity, String[].class));
    return forEntity.getBody();
  }

  public String[] getMitmekesisus(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/mitmekesisus", requestEntity, String[].class));
    return forEntity.getBody();
  }

  public String[][] getKeeletase(String tekst) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[][]> forEntity = retry().execute(context -> rest.postForEntity("/keeletase", requestEntity, String[][].class));
    return forEntity.getBody();
  }

  public String getStanzaConllu(String tekst, String failinimi, String keel) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst, "failinimi", failinimi, "keel", keel);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/stanzaconllu", requestEntity, String[].class));
    return requireNonNull(forEntity.getBody())[0];
  }

  public String[] getTahedSonadLaused(String tekst, String keel) {
    Map<String, String> map = Map.of(MAP_PARAMETER, tekst, "keel", keel);
    HttpEntity<?> requestEntity = new HttpEntity<>(map);
    ResponseEntity<String[]> forEntity = retry().execute(context -> rest.postForEntity("/tahedsonadlaused", requestEntity, String[].class));
    return forEntity.getBody();
  }

}
