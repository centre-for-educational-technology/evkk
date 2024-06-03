package ee.tlu.evkk.dal.dto;

import java.util.Map;

public class ErrorAnalyserAnnotationGroup {
  Map<String, ErrorAnalyserTransformedAnnotation> annotationGroup;
  Map<String, Integer> errorTypeCount;

  public ErrorAnalyserAnnotationGroup(Map<String, ErrorAnalyserTransformedAnnotation> annotationGroup, Map<String, Integer> errorTypeCount) {
    this.annotationGroup = annotationGroup;
    this.errorTypeCount = errorTypeCount;
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
}
