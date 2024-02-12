package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.dal.dao.ErrorAnalyserDao;
import ee.tlu.evkk.dal.dto.ErrorAnalyserEnums;
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
      @RequestParam(name = "language", required = false) List<String> languages) {
    List<ErrorAnalyserSentence> body = errorAnalyserDao.findErrors(errors, levels, languages);
    return ResponseEntity.ok(body);
  }

  @GetMapping("/getFilterEnums")
  public ResponseEntity<ErrorAnalyserEnums> getFilterEnums() {
    List<String> languageLevels = errorAnalyserDao.findFilterEnums("keeletase");
    List<String> nativeLanguages = errorAnalyserDao.findFilterEnums("emakeel");
    ErrorAnalyserEnums body = new ErrorAnalyserEnums(languageLevels, nativeLanguages);
    return ResponseEntity.ok(body);
  }

}
