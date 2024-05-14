package ee.tlu.evkk.core.service.dto;

import java.util.List;
import java.util.Map;

import ee.tlu.evkk.dal.dto.ErrorAnalyserTransformedAnnotation;

public class ErrorAnalyserTransformedAnnotationsResult {
    private List<ErrorAnalyserTransformedAnnotation> transformedAnnotations;
    private Map<String, Integer> errorTypes;

    public ErrorAnalyserTransformedAnnotationsResult(List<ErrorAnalyserTransformedAnnotation> transformedAnnotations,
            Map<String, Integer> errorTypes) {
        this.transformedAnnotations = transformedAnnotations;
        this.errorTypes = errorTypes;
    }

    public List<ErrorAnalyserTransformedAnnotation> getTransformedAnnotations() {
        return transformedAnnotations;
    }

    public Map<String, Integer> getErrorTypes() {
        return errorTypes;
    }
}
