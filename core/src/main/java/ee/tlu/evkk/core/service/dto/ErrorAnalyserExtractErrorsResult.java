package ee.tlu.evkk.core.service.dto;

import java.util.List;
import java.util.Map;

public class ErrorAnalyserExtractErrorsResult {
  List<String> annotationErrorTypes;
  Map<String, Integer> errorTypeCount;

  public ErrorAnalyserExtractErrorsResult(List<String> annotationErrorTypes, Map<String, Integer> errorTypeCount) {
    this.annotationErrorTypes = annotationErrorTypes;
    this.errorTypeCount = errorTypeCount;
  }

  public List<String> getAnnotationErrorTypes() {
    return annotationErrorTypes;
  }

  public Map<String, Integer> getErrorTypeCount() {
    return errorTypeCount;
  }
}
