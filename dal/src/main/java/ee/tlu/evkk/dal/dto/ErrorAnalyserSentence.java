package ee.tlu.evkk.dal.dto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
  private List<List<ErrorAnalyserAnnotation>> groupedAnnotations;
  private Map<Integer, Map<String, Integer>> errorTypes;

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

  // public List<ErrorAnalyserAnnotation> getAnnotations() {
  // return annotations;
  // }

  public List<List<ErrorAnalyserAnnotation>> getGroupedAnnotations() {
    List<List<ErrorAnalyserAnnotation>> annotationGroups = new ArrayList<>();
    for (ErrorAnalyserAnnotation annotation : annotations) {
      Integer annotatorId = Integer.valueOf(annotation.getAnnotatorId());
      if (annotatorId >= annotationGroups.size()) {
        // Expand the list to accommodate the annotatorId
        annotationGroups.addAll(Collections.nCopies(annotatorId - annotationGroups.size() + 1, null));
      }
      // Ensure there is a list for the annotatorId
      if (annotationGroups.get(annotatorId) == null) {
        annotationGroups.set(annotatorId, new ArrayList<>());
      }
      List<ErrorAnalyserAnnotation> annotationGroup = annotationGroups.get(annotatorId);
      annotationGroup.add(annotation);
    }
    return annotationGroups;
  }

  public Map<Integer, Map<String, Integer>> getErrorTypes() {

    Map<Integer, Map<String, Integer>> errorLists = new HashMap<>();

    for (ErrorAnalyserAnnotation annotation : annotations) {
      Integer annotatorId = Integer.valueOf(annotation.getAnnotatorId());
      String errorType = annotation.getErrorType();
      List<String> mainErrorTypes = Arrays.asList("U:LEX", "U:PUNCT", "M:LEX", "M:PUNCT", "R:LEX", "R:CASE",
          "R:NOM:FORM", "R:PUNCT", "R:SPELL", "R:VERB:FORM", "R:WO", "R:WS");
      List<String> compoundErrorTypesStart = Arrays.asList("R:LEX", "R:NOM:FORM", "R:SPELL", "R:VERB:FORM", "R:WO",
          "R:WS");
      List<String> compoundErrorTypesEnd = Arrays.asList("CASE", "NOM:FORM", "SPELL", "VERB:FORM", "WO", "WS");

      Map<String, Integer> errorList = errorLists.getOrDefault(annotatorId, new HashMap<>());
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
      errorLists.put(annotatorId, errorList);
    }
    return errorLists;
  }
}
