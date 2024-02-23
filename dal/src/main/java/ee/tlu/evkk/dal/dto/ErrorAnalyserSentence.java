package ee.tlu.evkk.dal.dto;

import java.util.List;

public class ErrorAnalyserSentence {
  private String sentenceId;
  private String sentence;
  private String textId;
  private String languageLevel;
  private String nativeLanguage;
  private String textType;
  // private String age;
  private String ageRange;
  private String education;
  private String citizenship;

  private List<ErrorAnalyserAnnotation> annotations;

  public ErrorAnalyserSentence(String sentenceId, String sentence, String textId, String languageLevel,
      String nativeLanguage, String textType, String ageRange, String education, String citizenship,
      List<ErrorAnalyserAnnotation> annotations) {
    this.sentenceId = sentenceId;
    this.sentence = sentence;
    this.textId = textId;
    this.languageLevel = languageLevel;
    this.nativeLanguage = nativeLanguage;
    this.annotations = annotations;
    this.textType = textType;
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
}
