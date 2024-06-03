package ee.tlu.evkk.dal.dto;

import java.util.List;

public class ErrorAnalyserGroupedAnnotations {
  List<ErrorAnalyserAnnotationGroup> annotationGroups;
  int queriedErrorCount;

  public ErrorAnalyserGroupedAnnotations(List<ErrorAnalyserAnnotationGroup> annotationGroups, int queriedErrorCount) {
    this.annotationGroups = annotationGroups;
    this.queriedErrorCount = queriedErrorCount;
  }

  public List<ErrorAnalyserAnnotationGroup> getAnnotationGroups() {
    return annotationGroups;
  }

  public int getQueriedErrorCount() {
    return queriedErrorCount;
  }
}
