package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.service.LanguageLevelService;
import ee.tlu.evkk.dal.dto.LanguageLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/language-levels")
@RequiredArgsConstructor
@CrossOrigin("*")

public class LanguageLevelController {

  private final LanguageLevelService languageLevelService;

  @GetMapping
  public List<LanguageLevel> getAll() {
    return languageLevelService.getAllLanguageLevels();
  }
}
