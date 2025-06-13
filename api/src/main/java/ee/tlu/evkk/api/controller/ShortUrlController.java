package ee.tlu.evkk.api.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import ee.tlu.evkk.api.service.ShortUrlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;
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
