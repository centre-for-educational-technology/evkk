package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.RedirectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class RedirectController {

  private final RedirectService redirectService;

  @GetMapping("/{code:[a-z0-9]{6}}")
  public ResponseEntity<?> redirectToOriginalUrl(@PathVariable String code) throws IOException {
    Optional<String> originalUrl = redirectService.resolveOriginalUrl(code);
    return originalUrl
      .map(url -> ResponseEntity.status(302).header("Location", url).build())
      .orElseGet(() -> ResponseEntity.notFound().build());
  }
}
