package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.dal.dao.ErrorAnalyserDao;
import ee.tlu.evkk.dal.dto.ErrorAnalyserSentence;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/errors")
public class ErrorAnalyserController {

  private final ErrorAnalyserDao errorAnalyserDao;

  public ErrorAnalyserController(ErrorAnalyserDao errorAnalyserDao) {
    this.errorAnalyserDao = errorAnalyserDao;
  }
  //ei ole vaja
  @GetMapping("/getAll")
  public List<String> getAll() {
    return errorAnalyserDao.findAll();
  }

  //ei ole vaja
  @GetMapping("/getSentenceById")
  public String getSentenceById(String sentenceId) {
    return errorAnalyserDao.findSentenceById(UUID.fromString(sentenceId));
  }

  //ei ole vaja
  @GetMapping("/getAnnotationBySentenceId")
  public String getAnnotationBySentenceId(String sentenceId) {
    return errorAnalyserDao.findAnnotationBySentenceId(UUID.fromString(sentenceId));
  }

  //ei ole vaja
  @GetMapping("/getAnnotationByErrorType")
  public String getAnnotationByErrorType(String errorType) {
    return errorAnalyserDao.findAnnotationByErrorType(errorType);
  }

  @GetMapping("/getErrors")
  public ResponseEntity<List<ErrorAnalyserSentence>> getErrors(
      @RequestParam(name = "error", required = false) List<String> errors,
      @RequestParam(name = "level", required = false) List<String> levels) {
    List<ErrorAnalyserSentence> body = errorAnalyserDao.findErrors(errors, levels);
    return ResponseEntity.ok(body);
  }
}
