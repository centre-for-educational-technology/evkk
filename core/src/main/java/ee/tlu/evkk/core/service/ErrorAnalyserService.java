package ee.tlu.evkk.core.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ee.tlu.evkk.dal.dto.ErrorAnalyserAnnotation;
import ee.tlu.evkk.dal.dto.ErrorAnalyserSentence;
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

    public List<ErrorAnalyserTransformedSentence> transformErrorTypes(List<ErrorAnalyserSentence> listItems,
            List<String> querriedErrorTypes) {

        this.querriedErrorTypes = querriedErrorTypes;

        List<ErrorAnalyserTransformedSentence> transformedListItems = new ArrayList<ErrorAnalyserTransformedSentence>();
        for (ErrorAnalyserSentence listItem : listItems) {
            querriedErrorCount = 0;
            List<ErrorAnalyserAnnotation> annotations = listItem.getAnnotations();
            Map<String, Integer> errorTypes = getErrorTypesAndQuerriedErrorCount(annotations);
            List<Map<String, ErrorAnalyserAnnotation>> groupedAnnotations = getGroupedAnnotations(annotations);

            ErrorAnalyserTransformedSentence transformedListItem = new ErrorAnalyserTransformedSentence(
                    listItem.getSentenceId(), listItem.getSentence(), listItem.getTextId(), listItem.getLanguageLevel(),
                    listItem.getNativeLanguage(), listItem.getTextType(), listItem.getAge(), listItem.getAgeRange(),
                    listItem.getEducation(), listItem.getCitizenship(), listItem.getAnnotations(), errorTypes,
                    querriedErrorCount, groupedAnnotations);
            transformedListItems.add(transformedListItem);
        }
        return transformedListItems;
    }

    public void countQuerriedErrors(String error) {
        if (querriedErrorTypes.contains(error)) {
            querriedErrorCount++;
        }
    }

    public Map<String, Integer> getErrorTypesAndQuerriedErrorCount(List<ErrorAnalyserAnnotation> annotations) {
        Map<String, Integer> errorTypes = new HashMap<String, Integer>();
        for (ErrorAnalyserAnnotation annotation : annotations) {
            String errorType = annotation.getErrorType();
            if (mainErrorTypes.contains(errorType)) {
                errorTypes.put(errorType, errorTypes.getOrDefault(errorType, 0) + 1);
                countQuerriedErrors(errorType);
            } else {
                for (String firstError : compoundErrorTypesStart) {
                    if (errorType.startsWith(firstError)) {
                        errorTypes.put(firstError, errorTypes.getOrDefault(errorType, 0) + 1);
                        countQuerriedErrors(firstError);
                        String remaining = errorType.substring(firstError.length() + 1);
                        if (!remaining.isEmpty()) {
                            for (String secondError : compoundErrorTypesEnd) {
                                if (remaining.startsWith(secondError)) {
                                    String modifiedSecondError = "R:" + secondError;
                                    errorTypes.put(modifiedSecondError,
                                            errorTypes.getOrDefault(modifiedSecondError, 0) + 1);
                                    countQuerriedErrors(modifiedSecondError);
                                    remaining = remaining.substring(secondError.length());
                                    if (!remaining.isEmpty()) {
                                        for (String thirdError : compoundErrorTypesEnd) {
                                            if (remaining.startsWith(thirdError)) {
                                                String modifiedThirdError = "R:" + thirdError;
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
        }
        Map<String, Integer> sortedMap = errorTypes.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new));
        return sortedMap;
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
        return annotationGroups;
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
