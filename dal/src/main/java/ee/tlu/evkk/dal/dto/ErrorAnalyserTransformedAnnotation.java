package ee.tlu.evkk.dal.dto;

import java.util.List;

public class ErrorAnalyserTransformedAnnotation {
  private final String annotationId;
  private final String annotatorId;
  private final String scopeStart;
  private final String scopeEnd;
  private final String errorType;
  private final List<String> extractedErrorTypes;
  private final String content;

  public ErrorAnalyserTransformedAnnotation(String annotationId, String annotatorId, String scopeStart,
                                            String scopeEnd, String errorType, List<String> extractedErrorTypes, String correction) {
    this.annotationId = annotationId;
    this.annotatorId = annotatorId;
    this.scopeStart = scopeStart;
    this.scopeEnd = scopeEnd;
    this.errorType = errorType;
    this.extractedErrorTypes = extractedErrorTypes;
    this.content = correction;
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

  public String getScopeEnd() {
    return scopeEnd;
  }

  public String getErrorType() {
    return errorType;
  }

  public List<String> getExtractedErrorTypes() {
    return extractedErrorTypes;
  }

  public String getContent() {
    return content;
  }

}
