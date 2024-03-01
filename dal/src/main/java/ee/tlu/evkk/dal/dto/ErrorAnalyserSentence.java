package ee.tlu.evkk.dal.dto;

import java.util.Arrays;
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
  private Map<String, Integer> errorTypes;

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

  public Map<String, Integer> getErrorTypes() {
    Map<String, Integer> errorCounter = countErrors(annotations);
    return errorCounter;
  }

  public static Map<String, Integer> countErrors(List<ErrorAnalyserAnnotation> annotations) {
    Map<String, Integer> errors = new HashMap<>();
    for (ErrorAnalyserAnnotation annotation : annotations) {
      String errorType = annotation.getErrorType();

      List<String> mainErrorTypes = Arrays.asList("U:LEX", "U:PUNCT", "M:LEX", "M:PUNCT", "R:LEX", "R:CASE",
          "R:NOM:FORM", "R:PUNCT", "R:SPELL", "R:VERB:FORM", "R:WO", "R:WS");

      List<String> compoundErrorTypesStart = Arrays.asList("R:LEX", "R:NOM:FORM", "R:SPELL", "R:VERB:FORM", "R:WO",
          "R:WS");

      List<String> compoundErrorTypesEnd = Arrays.asList("CASE", "NOM:FORM", "SPELL", "VERB:FORM", "WO", "WS");

      if (mainErrorTypes.contains(errorType)) {
        errors.put(errorType, errors.getOrDefault(errorType, 0) + 1);
      } else {
        for (String firstError : compoundErrorTypesStart) {
          if (errorType.startsWith(firstError)) {
            errors.put(firstError, errors.getOrDefault(firstError, 0) + 1);
            String remaining = errorType.substring(firstError.length() + 1);
            if (!remaining.isEmpty()) {
              for (String secondError : compoundErrorTypesEnd) {
                if (remaining.startsWith(secondError)) {
                  String modifiedSecondError = "R:" + secondError;
                  errors.put(modifiedSecondError, errors.getOrDefault(modifiedSecondError, 0) + 1);
                  remaining = remaining.substring(secondError.length());
                  if (!remaining.isEmpty()) {
                    for (String thirdError : compoundErrorTypesEnd) {
                      if (remaining.startsWith(thirdError)) {
                        String modifiedThirdError = "R:" + thirdError;
                        errors.put(modifiedThirdError, errors.getOrDefault(modifiedThirdError, 0) + 1);
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
    return errors;
  }
}
