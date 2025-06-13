package ee.tlu.evkk.api.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class RedirectService {

  private final ObjectMapper mapper = new ObjectMapper();
  private final File storageFile = new File("src/main/resources/data/short_urls.json");

  public Optional<String> resolveOriginalUrl(String code) throws IOException {
    if (!storageFile.exists()) return Optional.empty();

    List<Map<String, Object>> urls = mapper.readValue(storageFile, new TypeReference<>() {});
    return urls.stream()
      .filter(entry -> code.equals(entry.get("code")))
      .map(entry -> (String) entry.get("original_url"))
      .findFirst();
  }
}
