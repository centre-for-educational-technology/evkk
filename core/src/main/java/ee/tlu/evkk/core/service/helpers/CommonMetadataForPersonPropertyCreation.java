package ee.tlu.evkk.core.service.helpers;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

@Getter
@AllArgsConstructor
public class CommonMetadataForPersonPropertyCreation {

  private Map<String, String> resource;
  private String metadataKey;
  private String keyToCreate;
}
