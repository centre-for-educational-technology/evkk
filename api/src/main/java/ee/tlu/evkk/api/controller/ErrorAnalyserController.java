package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.dal.dao.ErrorAnalyserDao;
import ee.tlu.evkk.dal.dto.ErrorAnalyserOptions;
import ee.tlu.evkk.dal.dto.ErrorAnalyserSentence;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/errors")
public class ErrorAnalyserController {

  private final ErrorAnalyserDao errorAnalyserDao;

  public ErrorAnalyserController(ErrorAnalyserDao errorAnalyserDao) {
    this.errorAnalyserDao = errorAnalyserDao;
  }

  @GetMapping("/getErrors")
  public ResponseEntity<List<ErrorAnalyserSentence>> getErrors(
      @RequestParam(name = "error", required = false) List<String> errors,
      @RequestParam(name = "level", required = false) List<String> levels,
      @RequestParam(name = "nativeLanguage", required = false) List<String> nativeLanguages,
      @RequestParam(name = "textType", required = false) List<String> textTypes,
      @RequestParam(name = "education", required = false) List<String> educationLevels,
      @RequestParam(name = "citizenship", required = false) List<String> citizenshipList,
      @RequestParam(name = "age", required = false) List<String> ageRanges) {
    List<ErrorAnalyserSentence> body = errorAnalyserDao.findErrors(errors, levels, nativeLanguages, textTypes,
        educationLevels, citizenshipList, ageRanges);
    return ResponseEntity.ok(body);
  }

  @GetMapping("/getFilterOptions")
  public ResponseEntity<ErrorAnalyserOptions> getFilterOptions() {
    List<String> textType = errorAnalyserDao.findFilterOptions("tekstityyp");
    List<String> nativeLanguage = errorAnalyserDao.findFilterOptions("emakeel");
    List<String> citizenship = errorAnalyserDao.findFilterOptions("kodakondsus");

    ErrorAnalyserOptions body = new ErrorAnalyserOptions(textType, nativeLanguage, citizenship);
    return ResponseEntity.ok(body);
  }
}
