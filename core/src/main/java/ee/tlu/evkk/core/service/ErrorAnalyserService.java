package ee.tlu.evkk.core.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ee.tlu.evkk.core.service.dto.ErrorAnalyserTransformedAnnotationsResult;
import ee.tlu.evkk.dal.dto.ErrorAnalyserAnnotation;
import ee.tlu.evkk.dal.dto.ErrorAnalyserSentence;
import ee.tlu.evkk.dal.dto.ErrorAnalyserTransformedAnnotation;
import ee.tlu.evkk.dal.dto.ErrorAnalyserTransformedSentence;

@Service
public class ErrorAnalyserService {
    private final List<String> mainErrorTypes = Arrays.asList("U:LEX", "U:PUNCT", "M:LEX",
            "M:PUNCT", "R:LEX", "R:CASE",
            "R:NOM:FORM", "R:PUNCT", "R:SPELL", "R:VERB:FORM", "R:WO", "R:WS");
    private final List<String> compoundErrorTypesStart = Arrays.asList("R:LEX", "R:NOM:FORM",
            "R:SPELL", "R:VERB:FORM", "R:WO",
            "R:WS");
    private final List<String> compoundErrorTypesEnd = Arrays.asList("CASE", "NOM:FORM",
            "SPELL", "VERB:FORM", "WO", "WS");
    private List<String> querriedErrorTypes;
    private Integer querriedErrorCount;

    public List<ErrorAnalyserTransformedSentence> transformSentence(List<ErrorAnalyserSentence> listItems,
            List<String> querriedErrorTypes) {

        if (querriedErrorTypes == null) {
            querriedErrorTypes = new ArrayList<>();
        }

        this.querriedErrorTypes = querriedErrorTypes;

        List<ErrorAnalyserTransformedSentence> transformedListItems = new ArrayList<ErrorAnalyserTransformedSentence>();

        for (ErrorAnalyserSentence listItem : listItems) {
            querriedErrorCount = 0;
            List<ErrorAnalyserAnnotation> annotations = listItem.getAnnotations();
            ErrorAnalyserTransformedAnnotationsResult transformedAnnotationsResult = transformAnnotations(annotations);

            List<ErrorAnalyserTransformedAnnotation> transformedAnnotations = transformedAnnotationsResult
                    .getTransformedAnnotations();

            Map<String, Integer> errorTypes = transformedAnnotationsResult.getErrorTypes();
            List<Map<String, ErrorAnalyserAnnotation>> groupedAnnotations = getGroupedAnnotations(annotations);
            Map<String, Object> transformedSentence = transformSentence(listItem.getSentence());

            ErrorAnalyserTransformedSentence transformedListItem = new ErrorAnalyserTransformedSentence(
                    listItem.getSentenceId(), listItem.getSentence(), listItem.getTextId(), listItem.getLanguageLevel(),
                    listItem.getNativeLanguage(), listItem.getTextType(), listItem.getAge(), listItem.getAgeRange(),
                    listItem.getEducation(), listItem.getCitizenship(), annotations, transformedAnnotations, errorTypes,
                    querriedErrorCount, groupedAnnotations, transformedSentence);
            transformedListItems.add(transformedListItem);
        }
        return transformedListItems;
    }

    public void countQuerriedErrors(String error) {
        if (querriedErrorTypes.contains(error)) {
            querriedErrorCount++;
        }
    }

    // Eraldab liitvigades lihtvead ja loeb palju vigasid annotatsioonide peale
    // kokku on
    public ErrorAnalyserTransformedAnnotationsResult transformAnnotations(List<ErrorAnalyserAnnotation> annotations) {
        List<ErrorAnalyserTransformedAnnotation> transformedAnnotations = new ArrayList<ErrorAnalyserTransformedAnnotation>();
        Map<String, Integer> errorTypes = new HashMap<String, Integer>();
        for (ErrorAnalyserAnnotation annotation : annotations) {
            List<String> annotationErrorTypes = new ArrayList<>();
            String errorType = annotation.getErrorType();
            if (mainErrorTypes.contains(errorType)) {
                annotationErrorTypes.add(errorType);
                errorTypes.put(errorType, errorTypes.getOrDefault(errorType, 0) + 1);
                countQuerriedErrors(errorType);
            } else {
                for (String firstError : compoundErrorTypesStart) {
                    if (errorType.startsWith(firstError)) {
                        annotationErrorTypes.add(firstError);
                        errorTypes.put(firstError, errorTypes.getOrDefault(errorType, 0) + 1);
                        countQuerriedErrors(firstError);
                        String remaining = errorType.substring(firstError.length() + 1);
                        if (!remaining.isEmpty()) {
                            for (String secondError : compoundErrorTypesEnd) {
                                if (remaining.startsWith(secondError)) {
                                    String modifiedSecondError = "R:" + secondError;
                                    annotationErrorTypes.add(modifiedSecondError);
                                    errorTypes.put(modifiedSecondError,
                                            errorTypes.getOrDefault(modifiedSecondError, 0) + 1);
                                    countQuerriedErrors(modifiedSecondError);
                                    remaining = remaining.substring(secondError.length());
                                    if (!remaining.isEmpty()) {
                                        for (String thirdError : compoundErrorTypesEnd) {
                                            if (remaining.startsWith(thirdError)) {
                                                String modifiedThirdError = "R:" + thirdError;
                                                annotationErrorTypes.add(modifiedThirdError);
                                                errorTypes.put(modifiedThirdError,
                                                        errorTypes.getOrDefault(modifiedThirdError,
                                                                0) + 1);
                                                countQuerriedErrors(modifiedThirdError);
                                                break;
                                            }
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
            }
            ErrorAnalyserTransformedAnnotation transformedAnnotation = new ErrorAnalyserTransformedAnnotation(
                    annotation.getAnnotationId(), annotation.getAnnotatorId(), annotation.getScopeStart(),
                    annotation.getScopeEnd(), annotation.getErrorType(), annotationErrorTypes,
                    annotation.getCorrection());
            transformedAnnotations.add(transformedAnnotation);
        }

        Map<String, Integer> sortederrorTypes = errorTypes.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new));

        ErrorAnalyserTransformedAnnotationsResult result = new ErrorAnalyserTransformedAnnotationsResult(
                transformedAnnotations,
                sortederrorTypes);
        return result;

    }

    public List<Map<String, ErrorAnalyserAnnotation>> getGroupedAnnotations(List<ErrorAnalyserAnnotation> annotations) {
        List<Map<String, ErrorAnalyserAnnotation>> annotationGroups = new ArrayList<>();
        for (ErrorAnalyserAnnotation annotation : annotations) {
            Integer annotatorId = Integer.valueOf(annotation.getAnnotatorId());
            if (annotatorId >= annotationGroups.size()) {
                annotationGroups.addAll(Collections.nCopies(annotatorId -
                        annotationGroups.size() + 1, null));
            }
            if (annotationGroups.get(annotatorId) == null) {
                annotationGroups.set(annotatorId, new HashMap<String, ErrorAnalyserAnnotation>());
            }
            String scopeStart = annotation.getScopeStart();
            String scopeEnd = annotation.getScopeEnd();
            String key = String.format("%s::%s::%d", scopeStart, scopeEnd, annotatorId);

            Map<String, ErrorAnalyserAnnotation> annotationGroup = annotationGroups.get(annotatorId);
            annotationGroup.put(key, annotation);
        }

        annotationGroups.removeIf(Objects::isNull);
        return annotationGroups;
    }

    // public Map<String, ErrorAnalyserAnnotation> getSplitSentence() {
    // Map<String, ErrorAnalyserAnnotation> splitSentence;
    // return splitSentence;
    // }

    // public List<Map<String, ErrorAnalyserAnnotation>> transformSentence(String
    // sentence) {
    // Map<String, ErrorAnalyserAnnotation> transformedSentence = new HashMap<>();
    // String[] words = sentence.split(" ");

    // for (int index = 0; index < words.length; index++) {
    // String key = String.format("%d::%d::-1", index, index + 1);
    // Map<String, ErrorAnalyserAnnotation> value = new HashMap<>();
    // value.put("content", words[index]);
    // value.put("status", "initial");
    // transformedSentence.put(key, value);
    // }
    // return transformedSentence;
    // }

    public static Map<String, Object> transformSentence(String sentence) {
        Map<String, Object> transformedSentence = new HashMap<>();
        String[] words = sentence.split(" ");

        for (int index = 0; index < words.length; index++) {
            String key = String.format("%d::%d::-1", index, index + 1);
            Map<String, String> value = new HashMap<>();
            value.put("content", words[index]);
            value.put("status", "initial");
            transformedSentence.put(key, value);
        }

        return transformedSentence;
    }

    // PRAEGU EI KASUTA
    // public List<Map<String, Integer>>
    // getGroupedErrorTypes(List<ErrorAnalyserAnnotation> annotations) {
    // List<Map<String, Integer>> errorLists = new ArrayList<>();
    // for (ErrorAnalyserAnnotation annotation : annotations) {
    // Integer annotatorId = Integer.valueOf(annotation.getAnnotatorId());
    // if (annotatorId >= errorLists.size()) {
    // errorLists.addAll(Collections.nCopies(annotatorId - errorLists.size() + 1,
    // null));
    // }
    // if (errorLists.get(annotatorId) == null) {
    // errorLists.set(annotatorId, new HashMap<String, Integer>());
    // }

    // String errorType = annotation.getErrorType();

    // Map<String, Integer> errorList = errorLists.get(annotatorId);
    // if (mainErrorTypes.contains(errorType)) {
    // errorList.put(errorType, errorList.getOrDefault(errorType, 0) + 1);
    // } else {
    // for (String firstError : compoundErrorTypesStart) {
    // if (errorType.startsWith(firstError)) {
    // errorList.put(firstError, errorList.getOrDefault(errorType, 0) + 1);
    // String remaining = errorType.substring(firstError.length() + 1);
    // if (!remaining.isEmpty()) {
    // for (String secondError : compoundErrorTypesEnd) {
    // if (remaining.startsWith(secondError)) {
    // String modifiedSecondError = "R:" + secondError;
    // errorList.put(modifiedSecondError,
    // errorList.getOrDefault(modifiedSecondError, 0) + 1);
    // remaining = remaining.substring(secondError.length());
    // if (!remaining.isEmpty()) {
    // for (String thirdError : compoundErrorTypesEnd) {
    // if (remaining.startsWith(thirdError)) {
    // String modifiedThirdError = "R:" + thirdError;
    // errorList.put(modifiedThirdError,
    // errorList.getOrDefault(modifiedThirdError, 0) + 1);
    // break;
    // }
    // }
    // }
    // break;
    // }
    // }
    // }
    // break;
    // }
    // }
    // }
    // errorLists.set(annotatorId, errorList);
    // }
    // return errorLists;
    // }
}
