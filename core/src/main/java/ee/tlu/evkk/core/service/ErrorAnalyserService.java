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

import ee.tlu.evkk.dal.dto.ErrorAnalyserAnnotationGroup;
import ee.tlu.evkk.dal.dto.ErrorAnalyserGroupedAnnotations;
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
  private List<String> queriedErrorTypes;

  //KUST?
  public Map<String, Object> splitSentence(String sentence) {
    Map<String, Object> transformedSentence = new HashMap<>();
    String[] elements = sentence.split(" ");

    for (int index = 0; index < elements.length; index++) {
      String key = String.format("%d::%d::-1", index, index + 1);
      Map<String, String> value = new HashMap<>();
      value.put("content", elements[index]);
      value.put("status", "initial");
      transformedSentence.put(key, value);
    }

    return transformedSentence;
  }

  public List<ErrorAnalyserTransformedSentence> transformSentence(List<ErrorAnalyserSentence> listItems,
                                                                  List<String> queriedErrorTypes) {

    if (queriedErrorTypes == null) {
      queriedErrorTypes = new ArrayList<>();
    }

    this.queriedErrorTypes = queriedErrorTypes;

    List<ErrorAnalyserTransformedSentence> transformedListItems = new ArrayList<>();

    for (ErrorAnalyserSentence listItem : listItems) {

      List<ErrorAnalyserAnnotation> annotations = listItem.getAnnotations();
      ErrorAnalyserTransformedAnnotationsResult transformedAnnotationsResult = transformAnnotations(annotations);

      List<ErrorAnalyserTransformedAnnotation> transformedAnnotations = transformedAnnotationsResult
        .getTransformedAnnotations();

      Map<String, Integer> errorTypes = transformedAnnotationsResult.getErrorTypes();
      ErrorAnalyserGroupedAnnotations groupedAnnotations = getGroupedAnnotations(annotations);
      Map<String, Object> transformedSentence = splitSentence(listItem.getSentence());

      //märgendusversioonid on sorditud päringule vastavate vigade arvu alusel, valib esimese
      int queriedErrorCount = groupedAnnotations.getAnnotationGroups().get(0).getQueriedErrorCount();

      ErrorAnalyserTransformedSentence transformedListItem = new ErrorAnalyserTransformedSentence(
        listItem.getSentenceId(), listItem.getSentence(), listItem.getTextId(), listItem.getLanguageLevel(),
        listItem.getNativeLanguage(), listItem.getTextType(), listItem.getAge(), listItem.getAgeRange(),
        listItem.getEducation(), listItem.getCitizenship(), annotations, transformedAnnotations, errorTypes,
        queriedErrorCount, groupedAnnotations.getAnnotationGroups(), transformedSentence);
      transformedListItems.add(transformedListItem);
    }

    //sordib kõik elemendid pärigule kõige paremini vastanud märgendusversioonide alusel
    transformedListItems.sort(Comparator.comparingInt(ErrorAnalyserTransformedSentence::getQueriedErrorTypeCount).reversed());

    return transformedListItems;
  }

  //Lõpus kustutada
  public void countQueriedErrors(String error) {
    if (queriedErrorTypes.contains(error)) {
      //queriedErrorCount++;
    }
  }

  public List<String> extractErrors(ErrorAnalyserAnnotation annotation) {
    List<String> annotationErrorTypes = new ArrayList<>();
    String errorType = annotation.getErrorType();

    if (mainErrorTypes.contains(errorType)) {
      annotationErrorTypes.add(errorType);
    } else {
      for (String firstError : compoundErrorTypesStart) {
        if (errorType.startsWith(firstError)) {
          annotationErrorTypes.add(firstError);
          String remaining = errorType.substring(firstError.length() + 1);
          if (!remaining.isEmpty()) {
            for (String secondError : compoundErrorTypesEnd) {
              if (remaining.startsWith(secondError)) {
                String modifiedSecondError = "R:" + secondError;
                annotationErrorTypes.add(modifiedSecondError);
                if (!remaining.substring(secondError.length()).isEmpty()) {

                  remaining = remaining.substring(secondError.length() + 1);
                  if (!remaining.isEmpty()) {
                    for (String thirdError : compoundErrorTypesEnd) {
                      if (remaining.startsWith(thirdError)) {
                        String modifiedThirdError = "R:" + thirdError;
                        annotationErrorTypes.add(modifiedThirdError);
                        break;
                      }
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

    return annotationErrorTypes;
  }

  // Eraldab liitvigades lihtvead ja loeb palju vigasid annotatsioonide peale kokku on
  //SEE ON PRAEGU TOIMIV VARIANT PÄRAST EEMALDADA
  public ErrorAnalyserTransformedAnnotationsResult transformAnnotations(List<ErrorAnalyserAnnotation> annotations) {
    List<ErrorAnalyserTransformedAnnotation> transformedAnnotations = new ArrayList<>();
    Map<String, Integer> errorTypes = new HashMap<>();
    for (ErrorAnalyserAnnotation annotation : annotations) {
      List<String> annotationErrorTypes = new ArrayList<>();
      String errorType = annotation.getErrorType();
      if (mainErrorTypes.contains(errorType)) {
        annotationErrorTypes.add(errorType);
        errorTypes.put(errorType, errorTypes.getOrDefault(errorType, 0) + 1);
        countQueriedErrors(errorType);
      } else {
        for (String firstError : compoundErrorTypesStart) {
          if (errorType.startsWith(firstError)) {
            annotationErrorTypes.add(firstError);
            errorTypes.put(firstError, errorTypes.getOrDefault(errorType, 0) + 1);
            countQueriedErrors(firstError);
            String remaining = errorType.substring(firstError.length() + 1);
            if (!remaining.isEmpty()) {
              for (String secondError : compoundErrorTypesEnd) {
                if (remaining.startsWith(secondError)) {
                  String modifiedSecondError = "R:" + secondError;
                  annotationErrorTypes.add(modifiedSecondError);
                  errorTypes.put(modifiedSecondError,
                    errorTypes.getOrDefault(modifiedSecondError, 0) + 1);
                  countQueriedErrors(modifiedSecondError);
                  if (!remaining.substring(secondError.length()).isEmpty()) {

                    remaining = remaining.substring(secondError.length() + 1);
                    if (!remaining.isEmpty()) {
                      for (String thirdError : compoundErrorTypesEnd) {
                        if (remaining.startsWith(thirdError)) {
                          String modifiedThirdError = "R:" + thirdError;
                          annotationErrorTypes.add(modifiedThirdError);
                          errorTypes.put(modifiedThirdError,
                            errorTypes.getOrDefault(modifiedThirdError,
                              0) + 1);
                          countQueriedErrors(modifiedThirdError);
                          break;
                        }
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

    Map<String, Integer> sortedErrorTypes = errorTypes.entrySet().stream()
      .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
      .collect(Collectors.toMap(
        Map.Entry::getKey,
        Map.Entry::getValue,
        (oldValue, newValue) -> oldValue, LinkedHashMap::new));

    return new ErrorAnalyserTransformedAnnotationsResult(
      transformedAnnotations,
      sortedErrorTypes, 0); //mida see viimane teeb

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

  //SEE ON EDASPIDI
  //Tagasi objekt {
  // annotationGroups: [{annotations: [], errorTypes: }]
  // queriedErrorCount: int
  // }
  public ErrorAnalyserGroupedAnnotations getGroupedAnnotations(List<ErrorAnalyserAnnotation> annotations) {
    List<ErrorAnalyserAnnotationGroup> annotationGroups = new ArrayList<>();
    int queriedErrorCount = 0;

    for (ErrorAnalyserAnnotation annotation : annotations) {
      int annotatorId = Integer.parseInt(annotation.getAnnotatorId());

      if (annotationGroups.size() <= annotatorId) {
        annotationGroups.addAll(Collections.nCopies(annotatorId -
          annotationGroups.size() + 1, null));
      }
      if (annotationGroups.get(annotatorId) == null) {
        annotationGroups.set(annotatorId, new ErrorAnalyserAnnotationGroup());
      }

      ErrorAnalyserAnnotationGroup currentAnnotationGroup = annotationGroups.get(annotatorId);

      List<String> extractedErrorTypes = extractErrors(annotation);

      //loendab vigu ja mitu neist vastab päringule
      for (String extractedErrorType : extractedErrorTypes) {
        int updatedErrorCount = currentAnnotationGroup.getErrorTypeCount().getOrDefault(extractedErrorType, 0) + 1;
        currentAnnotationGroup.getErrorTypeCount().put(extractedErrorType, updatedErrorCount);
        if (queriedErrorTypes.contains(extractedErrorType)) {
          int updatedQueriedErrorCount = currentAnnotationGroup.getQueriedErrorCount() + 1;
          currentAnnotationGroup.setQueriedErrorCount(updatedQueriedErrorCount);
        }
      }

      //teisendab märgendused uuele kujule
      String scopeStart = annotation.getScopeStart();
      String scopeEnd = annotation.getScopeEnd();
      String key = String.format("%s::%s::%d", scopeStart, scopeEnd, annotatorId);

      ErrorAnalyserTransformedAnnotation transformedAnnotation = new ErrorAnalyserTransformedAnnotation(annotation.getAnnotationId(), annotation.getAnnotatorId(), scopeStart,
        scopeEnd, annotation.getErrorType(), extractedErrorTypes,
        annotation.getCorrection());

      currentAnnotationGroup.getAnnotationGroup().put(key, transformedAnnotation);
    }

    //eemaldab tühjad elemendid listist
    annotationGroups.removeIf(Objects::isNull);

    //sordib vead esinemise järjekorras
    for (ErrorAnalyserAnnotationGroup annotationGroup : annotationGroups) {
      Map<String, Integer> sortedMap = annotationGroup.getErrorTypeCount().entrySet().stream()
        .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
        .collect(Collectors.toMap(
          Map.Entry::getKey,
          Map.Entry::getValue,
          (oldValue, newValue) -> oldValue,
          LinkedHashMap::new));
      annotationGroup.setErrorTypeCount(sortedMap);
    }

    //sordib märgendusversioonid päringule vastavate vigade arvu alusel
    annotationGroups.sort(Comparator.comparingInt(ErrorAnalyserAnnotationGroup::getQueriedErrorCount).reversed());

    return new ErrorAnalyserGroupedAnnotations(annotationGroups, queriedErrorCount);
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
