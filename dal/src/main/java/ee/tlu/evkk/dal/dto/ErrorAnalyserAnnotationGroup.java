package ee.tlu.evkk.dal.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ErrorAnalyserAnnotationGroup {
  List<ErrorAnalyserTransformedAnnotation> annotations;
  Map<String, Integer> errorTypeCount;
  int queriedErrorCount;

  public ErrorAnalyserAnnotationGroup() {
    this.annotations = new ArrayList<>();
    this.errorTypeCount = new HashMap<>();
    this.queriedErrorCount = 0;
  }

  public List<ErrorAnalyserTransformedAnnotation> getAnnotations() {
    return annotations;
  }

  public void setAnnotations(List<ErrorAnalyserTransformedAnnotation> annotations) {
    this.annotations = annotations;
  }

  public Map<String, Integer> getErrorTypeCount() {
    return errorTypeCount;
  }

  public void setErrorTypeCount(Map<String, Integer> errorTypeCount) {
    this.errorTypeCount = errorTypeCount;
  }

  public int getQueriedErrorCount() {
    return queriedErrorCount;
  }

  public void setQueriedErrorCount(int queriedErrorCount) {
    this.queriedErrorCount = queriedErrorCount;
  }
}
