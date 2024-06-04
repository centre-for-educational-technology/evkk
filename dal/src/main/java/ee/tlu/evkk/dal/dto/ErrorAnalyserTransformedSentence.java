package ee.tlu.evkk.dal.dto;

import java.util.List;
import java.util.Map;

public class ErrorAnalyserTransformedSentence {
  private final String sentenceId;
  private final String sentence;
  private final String textId;
  private final String languageLevel;
  private final String nativeLanguage;
  private final String textType;
  private final String age;
  private final String ageRange;
  private final String education;
  private final String citizenship;
  private final List<ErrorAnalyserAnnotation> annotations; // selle võib tulevikus eemaldada
  private final List<ErrorAnalyserTransformedAnnotation> transformedAnnotations; //see eemaldada
  private final Map<String, Integer> errorTypes;
  private final Integer queriedErrorTypeCount;
  private final List<ErrorAnalyserAnnotationGroup> groupedAnnotations;

  public ErrorAnalyserTransformedSentence(String sentenceId, String sentence, String textId, String languageLevel,
                                          String nativeLanguage, String textType, String age, String ageRange, String education, String citizenship,
                                          List<ErrorAnalyserAnnotation> annotations, List<ErrorAnalyserTransformedAnnotation> transformedAnnotations,
                                          Map<String, Integer> errorTypes,
                                          Integer queriedErrorTypeCount, List<ErrorAnalyserAnnotationGroup> groupedAnnotations
  ) {
    this.sentenceId = sentenceId;
    this.sentence = sentence;
    this.textId = textId;
    this.languageLevel = languageLevel;
    this.nativeLanguage = nativeLanguage;
    this.textType = textType;
    this.age = age;
    this.ageRange = ageRange;
    this.education = education;
    this.citizenship = citizenship;
    this.annotations = annotations;
    this.transformedAnnotations = transformedAnnotations;
    this.errorTypes = errorTypes;
    this.queriedErrorTypeCount = queriedErrorTypeCount;
    this.groupedAnnotations = groupedAnnotations;
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

  public List<ErrorAnalyserTransformedAnnotation> getTransformedAnnotations() {
    return transformedAnnotations;
  }

  public Map<String, Integer> getErrorTypes() {
    return errorTypes;
  }

  public Integer getQueriedErrorTypeCount() {
    return queriedErrorTypeCount;
  }

  public List<ErrorAnalyserAnnotationGroup> getGroupedAnnotations() {
    return groupedAnnotations;
  }


}
