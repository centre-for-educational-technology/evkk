package ee.tlu.evkk.dal.dto;

public class ErrorAnalyserAnnotation {
  private final String annotationId;
  private final String annotatorId;
  private final String scopeStart;
  private final String scopeEnd;
  private final String errorType;
  private final String correction;

  public ErrorAnalyserAnnotation(String annotationId, String annotatorId, String scopeStart, String scopeEnd, String errorType, String correction) {
    this.annotationId = annotationId;
    this.annotatorId = annotatorId;
    this.scopeStart = scopeStart;
    this.scopeEnd = scopeEnd;
    this.errorType = errorType;
    this.correction = correction;
  }

  public String getAnnotationId() {
    return annotationId;
  }

  public String getAnnotatorId() {
    return annotatorId;
  }

  public String getScopeStart() {
    return scopeStart;
  }

  public String getScopeEnd() { return scopeEnd; }

  public String getErrorType() { return errorType; }

  public String getCorrection() { return correction; }
}
