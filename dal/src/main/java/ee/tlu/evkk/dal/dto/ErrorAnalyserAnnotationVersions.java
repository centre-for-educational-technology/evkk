package ee.tlu.evkk.dal.dto;

import java.util.List;

public class ErrorAnalyserAnnotationVersions {
  List<ErrorAnalyserAnnotationVersion> annotationVersions;
  int queriedErrorCount;

  public ErrorAnalyserAnnotationVersions(List<ErrorAnalyserAnnotationVersion> annotationVersions, int queriedErrorCount) {
    this.annotationVersions = annotationVersions;
    this.queriedErrorCount = queriedErrorCount;
  }

  public List<ErrorAnalyserAnnotationVersion> getAnnotationVersions() {
    return annotationVersions;
  }

  public int getQueriedErrorCount() {
    return queriedErrorCount;
  }
}
