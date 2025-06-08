package ee.tlu.evkk.api.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/h5p-request")
public class H5PRequestController {

  @GetMapping("/{id}")
  public ResponseEntity<byte[]> h5pRequest(@PathVariable String id) {
    String remoteUrl = "https://sisuloome.e-koolikott.ee/sites/default/files/h5p/exports/interactive-content-" + id + ".h5p";

    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<byte[]> remoteResponse = restTemplate.exchange(
      remoteUrl,
      HttpMethod.GET,
      null,
      byte[].class
    );

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

    return new ResponseEntity<>(
      remoteResponse.getBody(),
      headers,
      remoteResponse.getStatusCode()
    );
  }

}
