package ee.tlu.evkk.clusterfinder.client;

import ee.evkk.dto.integration.FileResponseEntity;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;

import java.util.Arrays;
import java.util.List;

public class EvkkClient {

  private final RestOperations restOperations;

  public EvkkClient(RestOperations restOperations) {
    this.restOperations = restOperations;
  }

  public List<FileResponseEntity> listFiles(String sessionToken) {
    ResponseEntity<FileResponseEntity[]> response = restOperations.getForEntity("/api/integration/file/list?evkkAccessToken={token}", FileResponseEntity[].class, sessionToken);
    if (response.getBody() == null) throw new NullPointerException();
    return Arrays.asList(response.getBody());
  }

  public Resource downloadFile(String sessionToken, String userFileId) {
    ResponseEntity<Resource> response = restOperations.getForEntity("/api/integration/file/download?evkkAccessToken={token}&userFileId={userFileId}", Resource.class, sessionToken, userFileId);
    return response.getBody();
  }

}
