package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.core.service.ErrorAnalyserService;
import ee.tlu.evkk.dal.dao.ErrorAnalyserDao;
import ee.tlu.evkk.dal.dto.ErrorAnalyserOptions;
import ee.tlu.evkk.dal.dto.ErrorAnalyserSentence;
import ee.tlu.evkk.dal.dto.ErrorAnalyserTransformedSentence;

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
  private final ErrorAnalyserService errorAnalyserService;

  public ErrorAnalyserController(ErrorAnalyserDao errorAnalyserDao, ErrorAnalyserService errorAnalyserService) {
    this.errorAnalyserDao = errorAnalyserDao;
    this.errorAnalyserService = errorAnalyserService;
  }

  @GetMapping("/getErrors")
  public ResponseEntity<List<ErrorAnalyserTransformedSentence>> getErrors(
      @RequestParam(name = "errorType", required = false) List<String> errorTypes,
      @RequestParam(name = "languageLevel", required = false) List<String> languageLevels,
      @RequestParam(name = "nativeLanguage", required = false) List<String> nativeLanguages,
      @RequestParam(name = "textType", required = false) List<String> textTypes,
      @RequestParam(name = "education", required = false) List<String> educationLevels,
      @RequestParam(name = "citizenship", required = false) List<String> citizenshipList,
      @RequestParam(name = "ageRange", required = false) List<String> ageRanges) {
    List<ErrorAnalyserSentence> result = errorAnalyserDao.findErrors(errorTypes, languageLevels, nativeLanguages,
        textTypes,
        educationLevels, citizenshipList, ageRanges);

    List<ErrorAnalyserTransformedSentence> transformedResult = errorAnalyserService.transformErrorTypes(result,
        errorTypes);

    return ResponseEntity.ok(transformedResult);
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
