package ee.evkk.dto;

import java.util.List;

public class CollocateResponseDto {

  private List<CollocateDto> collocateList;
  private String initialKeyword;
  private String lemmatizedKeyword;

  public CollocateResponseDto(List<CollocateDto> collocateList, String initialKeyword, String lemmatizedKeyword) {
    this.collocateList = collocateList;
    this.initialKeyword = initialKeyword;
    this.lemmatizedKeyword = lemmatizedKeyword;
  }

  public List<CollocateDto> getCollocateList() {
    return collocateList;
  }

  public void setCollocateList(List<CollocateDto> collocateList) {
    this.collocateList = collocateList;
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
