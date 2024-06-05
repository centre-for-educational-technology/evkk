package ee.tlu.evkk.core.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import ee.tlu.evkk.dal.dto.ErrorAnalyserAnnotationVersion;
import ee.tlu.evkk.dal.dto.ErrorAnalyserAnnotationVersions;
import org.springframework.stereotype.Service;

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

  public List<ErrorAnalyserTransformedSentence> transformSentence(List<ErrorAnalyserSentence> sentences,
                                                                  List<String> queriedErrorTypes) {

    if (queriedErrorTypes == null) {
      queriedErrorTypes = new ArrayList<>();
    }

    this.queriedErrorTypes = queriedErrorTypes;

    List<ErrorAnalyserTransformedSentence> transformedSentences = new ArrayList<>();

    for (ErrorAnalyserSentence sentence : sentences) {

      List<ErrorAnalyserAnnotation> annotations = sentence.getAnnotations();
      ErrorAnalyserAnnotationVersions annotationVersions = groupAnnotationVersions(annotations);

      //märgendusversioonid on sorditud päringule vastavate vigade arvu alusel, valib esimese
      int queriedErrorCount = annotationVersions.getAnnotationVersions().get(0).getQueriedErrorCount();

      ErrorAnalyserTransformedSentence transformedSentence = new ErrorAnalyserTransformedSentence(
        sentence.getSentenceId(), sentence.getSentence(), sentence.getTextId(), sentence.getLanguageLevel(),
        sentence.getNativeLanguage(), sentence.getTextType(), sentence.getAge(), sentence.getAgeRange(),
        sentence.getEducation(), sentence.getCitizenship(), queriedErrorCount, annotationVersions.getAnnotationVersions());
      transformedSentences.add(transformedSentence);
    }

    //sordib kõik elemendid pärigule kõige paremini vastanud märgendusversioonide alusel
    transformedSentences.sort(Comparator.comparingInt(ErrorAnalyserTransformedSentence::getQueriedErrorTypeCount).reversed());

    return transformedSentences;
  }

  //Teisendab liht- ja liitvead lihtvigade massiiviks
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

  //Jaotab märgendid versiooni alusel rühmadeks ja töötleb/loendab vigu
  public ErrorAnalyserAnnotationVersions groupAnnotationVersions(List<ErrorAnalyserAnnotation> annotations) {
    List<ErrorAnalyserAnnotationVersion> annotationVersions = new ArrayList<>();
    int queriedErrorCount = 0;

    for (ErrorAnalyserAnnotation annotation : annotations) {
      int annotatorId = Integer.parseInt(annotation.getAnnotatorId());

      if (annotationVersions.size() <= annotatorId) {
        annotationVersions.addAll(Collections.nCopies(annotatorId -
          annotationVersions.size() + 1, null));
      }
      if (annotationVersions.get(annotatorId) == null) {
        annotationVersions.set(annotatorId, new ErrorAnalyserAnnotationVersion());
      }

      ErrorAnalyserAnnotationVersion currentAnnotationVersion = annotationVersions.get(annotatorId);

      List<String> extractedErrorTypes = extractErrors(annotation);

      //loendab vigu ja mitu neist vastab päringule
      for (String extractedErrorType : extractedErrorTypes) {
        int updatedErrorCount = currentAnnotationVersion.getErrorTypeCount().getOrDefault(extractedErrorType, 0) + 1;
        currentAnnotationVersion.getErrorTypeCount().put(extractedErrorType, updatedErrorCount);
        if (queriedErrorTypes.contains(extractedErrorType)) {
          int updatedQueriedErrorCount = currentAnnotationVersion.getQueriedErrorCount() + 1;
          currentAnnotationVersion.setQueriedErrorCount(updatedQueriedErrorCount);
        }
      }

      //teisendab märgendused uuele kujule
      ErrorAnalyserTransformedAnnotation transformedAnnotation = new ErrorAnalyserTransformedAnnotation(annotation.getAnnotationId(), annotation.getAnnotatorId(), annotation.getScopeStart(),
        annotation.getScopeEnd(), annotation.getErrorType(), extractedErrorTypes,
        annotation.getCorrection());

      currentAnnotationVersion.getAnnotations().add(transformedAnnotation);
    }

    //eemaldab tühjad elemendid listist
    annotationVersions.removeIf(Objects::isNull);

    //sordib vead esinemise järjekorras
    for (ErrorAnalyserAnnotationVersion annotationVersion : annotationVersions) {
      Map<String, Integer> sortedMap = annotationVersion.getErrorTypeCount().entrySet().stream()
        .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
        .collect(Collectors.toMap(
          Map.Entry::getKey,
          Map.Entry::getValue,
          (oldValue, newValue) -> oldValue,
          LinkedHashMap::new));
      annotationVersion.setErrorTypeCount(sortedMap);
    }

    //sordib märgendusversioonid päringule vastavate vigade arvu alusel
    annotationVersions.sort(Comparator.comparingInt(ErrorAnalyserAnnotationVersion::getQueriedErrorCount).reversed());

    return new ErrorAnalyserAnnotationVersions(annotationVersions, queriedErrorCount);
  }
}
