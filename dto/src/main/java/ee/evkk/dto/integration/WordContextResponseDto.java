package ee.evkk.dto.integration;

import ee.evkk.dto.WordContextDto;

import java.util.List;

public class WordContextResponseDto {

  private List<WordContextDto> contextList;
  private String initialKeyword;
  private String lemmatizedKeyword;

  public WordContextResponseDto(List<WordContextDto> contextList, String initialKeyword, String lemmatizedKeyword) {
    this.contextList = contextList;
    this.initialKeyword = initialKeyword;
    this.lemmatizedKeyword = lemmatizedKeyword;
  }

  public List<WordContextDto> getContextList() {
    return contextList;
  }

  public void setContextList(List<WordContextDto> contextList) {
    this.contextList = contextList;
  }

  public String getInitialKeyword() {
    return initialKeyword;
  }

  public void setInitialKeyword(String initialKeyword) {
    this.initialKeyword = initialKeyword;
  }

  public String getLemmatizedKeyword() {
    return lemmatizedKeyword;
  }

  public void setLemmatizedKeyword(String lemmatizedKeyword) {
    this.lemmatizedKeyword = lemmatizedKeyword;
  }
}
