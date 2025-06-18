package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.dal.dao.*;
import ee.tlu.evkk.dal.dto.*;
import ee.tlu.evkk.api.service.ShortUrlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/short-url")
@RequiredArgsConstructor
public class ShortUrlController {

  private final ShortUrlService shortUrlService;

  @PostMapping("/generate")
  public ResponseEntity<List<String>> create(@RequestParam("originalUrl") String originalUrl) {
    if (originalUrl == null || originalUrl.isBlank()) {
      return ResponseEntity.badRequest().build();
    }

    List<String> response = shortUrlService.createShortUrl(originalUrl);
    return ResponseEntity.ok(response);
  }
}
