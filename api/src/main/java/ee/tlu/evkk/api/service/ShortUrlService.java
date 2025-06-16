package ee.tlu.evkk.api.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class ShortUrlService {

  private final ObjectMapper mapper = new ObjectMapper();
  private final File storageFile = new File("src/main/resources/data/short_urls.json");

  public Map<String, Object> createShortUrl(String originalUrl) throws IOException {
    List<Map<String, Object>> urls = new ArrayList<>();
    if (storageFile.exists()) {
      urls = mapper.readValue(storageFile, new TypeReference<>() {});
    }

    // leia järgmine ID
    int nextId = urls.stream()
      .map(m -> (Integer) m.getOrDefault("id", 0))
      .max(Integer::compareTo)
      .orElse(0) + 1;

    // loo unikaalne 6-kohaline kood
    String code = generateUniqueCode(urls);

    LocalDateTime now = LocalDateTime.now();

    Map<String, Object> entry = new HashMap<>();
    entry.put("id", nextId);
    entry.put("code", code);
    entry.put("original_url", originalUrl);
    entry.put("created_at", now.toString());
    entry.put("expires_at", now.plusYears(1).toString());

    urls.add(entry);
    mapper.writerWithDefaultPrettyPrinter().writeValue(storageFile, urls);

    return Map.of(
      "shortUrl", "http://localhost:9090/api/" + code
    );
  }

  private String generateUniqueCode(List<Map<String, Object>> existing) {
    String characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    SecureRandom random = new SecureRandom();
    Set<String> existingCodes = new HashSet<>();
    for (Map<String, Object> entry : existing) {
      existingCodes.add((String) entry.get("code"));
    }

    String code;
    do {
      StringBuilder sb = new StringBuilder();
      for (int i = 0; i < 6; i++) {
        sb.append(characters.charAt(random.nextInt(characters.length())));
      }
      code = sb.toString();
    } while (existingCodes.contains(code));

    return code;
  }
}
