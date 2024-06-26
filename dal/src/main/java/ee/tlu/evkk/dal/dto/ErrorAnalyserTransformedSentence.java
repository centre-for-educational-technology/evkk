package ee.tlu.evkk.dal.dto;

import java.util.List;

public class ErrorAnalyserTransformedSentence {
  private final String sentenceId;
  private final String sentence;
  private final String textId;
  private final String languageLevel;
  private final String textType;
  private final String age;
  private final String ageRange;
  private final String education;
  private final String citizenship;
  private final Integer queriedErrorTypeCount;
  private final List<ErrorAnalyserAnnotationVersion> annotationVersions;

  public ErrorAnalyserTransformedSentence(String sentenceId, String sentence, String textId, String languageLevel,
                                          String textType, String age, String ageRange, String education, String citizenship,
                                          Integer queriedErrorTypeCount, List<ErrorAnalyserAnnotationVersion> annotationVersions
  ) {
    this.sentenceId = sentenceId;
    this.sentence = sentence;
    this.textId = textId;
    this.languageLevel = languageLevel;
    this.textType = textType;
    this.age = age;
    this.ageRange = ageRange;
    this.education = education;
    this.citizenship = citizenship;
    this.queriedErrorTypeCount = queriedErrorTypeCount;
    this.annotationVersions = annotationVersions;
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

  public Integer getQueriedErrorTypeCount() {
    return queriedErrorTypeCount;
  }

  public List<ErrorAnalyserAnnotationVersion> getAnnotationVersions() {
    return annotationVersions;
  }


}
