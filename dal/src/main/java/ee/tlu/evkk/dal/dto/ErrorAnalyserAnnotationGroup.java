package ee.tlu.evkk.dal.dto;

import java.util.HashMap;
import java.util.Map;

public class ErrorAnalyserAnnotationGroup {
  Map<String, ErrorAnalyserTransformedAnnotation> annotationGroup;
  Map<String, Integer> errorTypeCount;
  int queriedErrorCount;

  public ErrorAnalyserAnnotationGroup() {
    this.annotationGroup = new HashMap<>();
    this.errorTypeCount = new HashMap<>();
    this.queriedErrorCount = 0;
  }

  public Map<String, ErrorAnalyserTransformedAnnotation> getAnnotationGroup() {
    return annotationGroup;
  }

  public void setAnnotationGroup(Map<String, ErrorAnalyserTransformedAnnotation> annotationGroup) {
    this.annotationGroup = annotationGroup;
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
