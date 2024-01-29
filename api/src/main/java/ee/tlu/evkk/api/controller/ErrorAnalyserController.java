package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.dal.dao.ErrorAnalyserDao;
import ee.tlu.evkk.core.service.ErrorAnalyserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/errors")
public class ErrorAnalyserController {

  private final ErrorAnalyserDao errorAnalyserDao;
  private final ErrorAnalyserService errorAnalyserService;

  public ErrorAnalyserController(ErrorAnalyserDao errorAnalyserDao, ErrorAnalyserService errorAnalyserService) {
    this.errorAnalyserDao = errorAnalyserDao;
    this.errorAnalyserService = errorAnalyserService;
  }
  @GetMapping("/getAll")
  public List<String> getAll() {
    return errorAnalyserDao.findAll();
  }

  //seda ei ole vaja? http://localhost:9090/api/errors/getSentenceById?sentenceId=56ca94f9-e82a-4886-9bd1-1316012a1ce2
  @GetMapping("/getSentenceById")
  public String getSentenceById(String sentenceId) {
    return errorAnalyserDao.findSentenceById(UUID.fromString(sentenceId));
  }

  @GetMapping("/getAnnotationBySentenceId")
  public String getAnnotationBySentenceId(String sentenceId) {
    return errorAnalyserDao.findAnnotationBySentenceId(UUID.fromString(sentenceId));
  }

  //TODO getAnnotationByErrorType
  @GetMapping("/getAnnotationByErrorType")
  public String getAnnotationByErrorType(String errorType) {
    return errorAnalyserDao.findAnnotationByErrorType(errorType);
  }
  //TODO getAnnotationByLanguageLevel
}
