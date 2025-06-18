package ee.tlu.evkk.api.service;

import ee.tlu.evkk.dal.dao.*;
import ee.tlu.evkk.dal.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RedirectService {

  private final ShortUrlDao shortUrlDao;

  public Optional<String> resolveOriginalUrl(String code) {
    ShortUrl shortUrl = shortUrlDao.findByCode(code);
    return Optional.ofNullable(shortUrl)
      .map(ShortUrl::getOriginalUrl);
  }
}
