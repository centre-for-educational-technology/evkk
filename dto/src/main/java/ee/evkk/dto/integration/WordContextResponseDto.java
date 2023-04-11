package ee.evkk.dto.integration;

import ee.evkk.dto.WordContextDto;

import java.util.List;

public class WordContextResponseDto {

  private List<WordContextDto> contextList;
  private boolean keywordLemmatized;

  public WordContextResponseDto(List<WordContextDto> contextList, boolean keywordLemmatized) {
    this.contextList = contextList;
    this.keywordLemmatized = keywordLemmatized;
  }

  public List<WordContextDto> getContextList() {
    return contextList;
  }

  public void setContextList(List<WordContextDto> contextList) {
    this.contextList = contextList;
  }

  public boolean isKeywordLemmatized() {
    return keywordLemmatized;
  }

  public void setKeywordLemmatized(boolean keywordLemmatized) {
    this.keywordLemmatized = keywordLemmatized;
  }
}
