package ee.tlu.evkk.dal.dto;

import java.util.List;

public class ErrorAnalyserSentence {
  private String sentenceId;
  private String sentence;
  private String textId;
  private String languageLevel;
  private List<ErrorAnalyserAnnotation> annotations;

  public ErrorAnalyserSentence(String sentenceId, String sentence, String textId, String languageLevel, List<ErrorAnalyserAnnotation> annotations) {
    this.sentenceId = sentenceId;
    this.sentence = sentence;
    this.textId = textId;
    this.languageLevel = languageLevel;
    this.annotations = annotations;
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

  public List<ErrorAnalyserAnnotation> getAnnotations() {
    return annotations;
  }
}
