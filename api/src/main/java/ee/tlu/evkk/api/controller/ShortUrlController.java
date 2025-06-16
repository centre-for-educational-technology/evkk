package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.ShortUrlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/short-url")
@RequiredArgsConstructor
public class ShortUrlController {

  private final ShortUrlService shortUrlService;

  @PostMapping("/generate")
  public ResponseEntity<Map<String, Object>> create(@RequestParam("originalUrl") String originalUrl) {
    if (originalUrl == null || originalUrl.isBlank()) {
      return ResponseEntity.badRequest().body(Map.of("error", "originalUrl puudub"));
    }

    try {
      Map<String, Object> response = shortUrlService.createShortUrl(originalUrl);
      return ResponseEntity.ok(response);
    } catch (IOException e) {
      return ResponseEntity.status(500).body(Map.of("error", "Salvestamine ebaõnnestus"));
    }
  }
}
