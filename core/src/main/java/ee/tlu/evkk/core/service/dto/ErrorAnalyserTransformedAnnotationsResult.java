package ee.tlu.evkk.core.service.dto;

import java.util.List;
import java.util.Map;

import ee.tlu.evkk.dal.dto.ErrorAnalyserTransformedAnnotation;

public class ErrorAnalyserTransformedAnnotationsResult {
  private final List<ErrorAnalyserTransformedAnnotation> transformedAnnotations;
  private final Map<String, Integer> errorTypes;
  private final int queriedErrorTypeCount;

  public ErrorAnalyserTransformedAnnotationsResult(List<ErrorAnalyserTransformedAnnotation> transformedAnnotations,
                                                   Map<String, Integer> errorTypes, int queriedErrorTypeCount) {
    this.transformedAnnotations = transformedAnnotations;
    this.errorTypes = errorTypes;
    this.queriedErrorTypeCount = queriedErrorTypeCount;
  }

  public List<ErrorAnalyserTransformedAnnotation> getTransformedAnnotations() {
    return transformedAnnotations;
  }

  public Map<String, Integer> getErrorTypes() {
    return errorTypes;
  }

  public int getQueriedErrorTypeCount() {
    return queriedErrorTypeCount;
  }
}
