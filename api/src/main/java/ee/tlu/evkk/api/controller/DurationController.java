package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.DurationService;
import ee.tlu.evkk.dal.dto.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/durations")
@RequiredArgsConstructor
@CrossOrigin("*")

public class DurationController {

  private final DurationService durationService;

  @GetMapping
  public List<Duration> getAll() {
    return durationService.getAllDurations();
  }
}
