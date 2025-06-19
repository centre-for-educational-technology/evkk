package ee.tlu.evkk.api.service;

import ee.tlu.evkk.dal.dao.*;
import ee.tlu.evkk.dal.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShortUrlService {

  private final ShortUrlDao shortUrlDao;

  public List<String> createShortUrl(String originalUrl) {
    String code = generateUniqueCode();

    Timestamp now = Timestamp.valueOf(LocalDateTime.now());
    Timestamp expires = Timestamp.valueOf(LocalDateTime.now().plusYears(1));

    ShortUrl shortUrl = ShortUrl.builder()
      .code(code)
      .originalUrl(originalUrl)
      .createdAt(now)
      .expiresAt(expires)
      .build();

    shortUrlDao.insertShortUrl(shortUrl);

    return List.of("/api/" + code);
  }

  private String generateUniqueCode() {
    String characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    SecureRandom random = new SecureRandom();
    String code;
    do {
      StringBuilder sb = new StringBuilder();
      for (int i = 0; i < 6; i++) {
        sb.append(characters.charAt(random.nextInt(characters.length())));
      }
      code = sb.toString();
    } while (shortUrlDao.findByCode(code) != null);
    return code;
  }
}
