package ee.tlu.evkk.dal.dto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ErrorAnalyserSentence {
  private String sentenceId;
  private String sentence;
  private String textId;
  private String languageLevel;
  private String nativeLanguage;
  private String textType;
  private String age;
  private String ageRange;
  private String education;
  private String citizenship;
  private List<ErrorAnalyserAnnotation> annotations;
  private List<Map<String, ErrorAnalyserAnnotation>> groupedAnnotations;
  private Map<String, Integer> errorTypes;
  private List<Map<String, Integer>> groupedErrorTypes;
  private Integer querriedErrorTypeCount;

  private List<String> mainErrorTypes = Arrays.asList("U:LEX", "U:PUNCT", "M:LEX",
      "M:PUNCT", "R:LEX", "R:CASE",
      "R:NOM:FORM", "R:PUNCT", "R:SPELL", "R:VERB:FORM", "R:WO", "R:WS");
  private List<String> compoundErrorTypesStart = Arrays.asList("R:LEX", "R:NOM:FORM",
      "R:SPELL", "R:VERB:FORM", "R:WO",
      "R:WS");
  private List<String> compoundErrorTypesEnd = Arrays.asList("CASE", "NOM:FORM",
      "SPELL", "VERB:FORM", "WO", "WS");

  public ErrorAnalyserSentence(String sentenceId, String sentence, String textId, String languageLevel,
      String nativeLanguage, String textType, String age, String ageRange, String education, String citizenship,
      List<ErrorAnalyserAnnotation> annotations) {
    this.sentenceId = sentenceId;
    this.sentence = sentence;
    this.textId = textId;
    this.languageLevel = languageLevel;
    this.nativeLanguage = nativeLanguage;
    this.annotations = annotations;
    this.textType = textType;
    this.age = age;
    this.ageRange = ageRange;
    this.education = education;
    this.citizenship = citizenship;
  }

  public ErrorAnalyserSentence() {
  }

  public String getSentenceId() {
    return sentenceId;
  }

  public String getSentence() {
    return sentence;
  }

  public String getTextId() {
    return textId;
  }

  public String getLanguageLevel() {
    return languageLevel;
  }

  public String getNativeLanguage() {
    return nativeLanguage;
  }

  public String getTextType() {
    return textType;
  }

  public String getAge() {
    return age;
  }

  public String getAgeRange() {
    return ageRange;
  }

  public String getEducation() {
    return education;
  }

  public String getCitizenship() {
    return citizenship;
  }

  public List<ErrorAnalyserAnnotation> getAnnotations() {
    return annotations;
  }

  // public List<List<ErrorAnalyserAnnotation>> getGroupedAnnotations() {
  // List<List<ErrorAnalyserAnnotation>> annotationGroups = new ArrayList<>();
  // for (ErrorAnalyserAnnotation annotation : annotations) {
  // Integer annotatorId = Integer.valueOf(annotation.getAnnotatorId());
  // if (annotatorId >= annotationGroups.size()) {
  // annotationGroups.addAll(Collections.nCopies(annotatorId -
  // annotationGroups.size() + 1, null));
  // }
  // if (annotationGroups.get(annotatorId) == null) {
  // annotationGroups.set(annotatorId, new ArrayList<>());
  // }
  // List<ErrorAnalyserAnnotation> annotationGroup =
  // annotationGroups.get(annotatorId);
  // annotationGroup.add(annotation);
  // }
  // return annotationGroups;
  // }

  public List<Map<String, ErrorAnalyserAnnotation>> getGroupedAnnotations() {
    List<Map<String, ErrorAnalyserAnnotation>> annotationGroups = new ArrayList<>();
    for (ErrorAnalyserAnnotation annotation : annotations) {
      Integer annotatorId = Integer.valueOf(annotation.getAnnotatorId());
      if (annotatorId >= annotationGroups.size()) {
        annotationGroups.addAll(Collections.nCopies(annotatorId - annotationGroups.size() + 1, null));
      }
      if (annotationGroups.get(annotatorId) == null) {
        annotationGroups.set(annotatorId, new HashMap<String, ErrorAnalyserAnnotation>());
      }
      String scopeStart = annotation.getScopeStart(); // Assuming getScopeStart() returns a String
      String scopeEnd = annotation.getScopeEnd(); // Assuming getScopeEnd() returns a String
      String key = String.format("%s::%s::%d", scopeStart, scopeEnd, annotatorId);

      Map<String, ErrorAnalyserAnnotation> annotationGroup = annotationGroups.get(annotatorId);
      annotationGroup.put(key, annotation);
    }
    return annotationGroups;
  }

  public Map<String, Integer> getErrorTypes() {
    Map<String, Integer> errorTypes = new HashMap<String, Integer>();
    for (ErrorAnalyserAnnotation annotation : annotations) {
      String errorType = annotation.getErrorType();
      if (mainErrorTypes.contains(errorType)) {
        errorTypes.put(errorType, errorTypes.getOrDefault(errorType, 0) + 1);
      } else {
        for (String firstError : compoundErrorTypesStart) {
          if (errorType.startsWith(firstError)) {
            errorTypes.put(firstError, errorTypes.getOrDefault(errorType, 0) + 1);
            String remaining = errorType.substring(firstError.length() + 1);
            if (!remaining.isEmpty()) {
              for (String secondError : compoundErrorTypesEnd) {
                if (remaining.startsWith(secondError)) {
                  String modifiedSecondError = "R:" + secondError;
                  errorTypes.put(modifiedSecondError,
                      errorTypes.getOrDefault(modifiedSecondError, 0) + 1);
                  remaining = remaining.substring(secondError.length());
                  if (!remaining.isEmpty()) {
                    for (String thirdError : compoundErrorTypesEnd) {
                      if (remaining.startsWith(thirdError)) {
                        String modifiedThirdError = "R:" + thirdError;
                        errorTypes.put(modifiedThirdError, errorTypes.getOrDefault(modifiedThirdError,
                            0) + 1);
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

  public List<Map<String, Integer>> getGroupedErrorTypes() {
    List<Map<String, Integer>> errorLists = new ArrayList<>();
    for (ErrorAnalyserAnnotation annotation : annotations) {
      Integer annotatorId = Integer.valueOf(annotation.getAnnotatorId());
      if (annotatorId >= errorLists.size()) {
        errorLists.addAll(Collections.nCopies(annotatorId - errorLists.size() + 1, null));
      }
      if (errorLists.get(annotatorId) == null) {
        errorLists.set(annotatorId, new HashMap<String, Integer>());
      }

      String errorType = annotation.getErrorType();

      Map<String, Integer> errorList = errorLists.get(annotatorId);
      if (mainErrorTypes.contains(errorType)) {
        errorList.put(errorType, errorList.getOrDefault(errorType, 0) + 1);
      } else {
        for (String firstError : compoundErrorTypesStart) {
          if (errorType.startsWith(firstError)) {
            errorList.put(firstError, errorList.getOrDefault(errorType, 0) + 1);
            String remaining = errorType.substring(firstError.length() + 1);
            if (!remaining.isEmpty()) {
              for (String secondError : compoundErrorTypesEnd) {
                if (remaining.startsWith(secondError)) {
                  String modifiedSecondError = "R:" + secondError;
                  errorList.put(modifiedSecondError, errorList.getOrDefault(modifiedSecondError, 0) + 1);
                  remaining = remaining.substring(secondError.length());
                  if (!remaining.isEmpty()) {
                    for (String thirdError : compoundErrorTypesEnd) {
                      if (remaining.startsWith(thirdError)) {
                        String modifiedThirdError = "R:" + thirdError;
                        errorList.put(modifiedThirdError, errorList.getOrDefault(modifiedThirdError, 0) + 1);
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
      errorLists.set(annotatorId, errorList);
    }
    return errorLists;
  }
}
