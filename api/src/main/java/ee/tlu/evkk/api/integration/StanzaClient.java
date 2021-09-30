package ee.tlu.evkk.api.integration;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;

/**
 * @author Mikk Tarvas
 * Date: 30.09.2021
 */
public class StanzaClient {

  private final RestOperations rest;

  public StanzaClient(RestOperations restOperations) {
    this.rest = restOperations;
  }

  public void test() {
    ResponseEntity<byte[]> forEntity = rest.getForEntity("/", byte[].class);
  }


}
