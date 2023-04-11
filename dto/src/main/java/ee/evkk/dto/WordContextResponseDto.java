package ee.evkk.dto;

public class WordContextResponseDto {

  private String keyword;
  private String contextBefore;
  private String contextAfter;

  public WordContextResponseDto(String keyword, String contextBefore, String contextAfter) {
    this.keyword = keyword;
    this.contextBefore = contextBefore;
    this.contextAfter = contextAfter;
  }

  public String getKeyword() {
    return keyword;
  }

  public void setKeyword(String keyword) {
    this.keyword = keyword;
  }

  public String getContextBefore() {
    return contextBefore;
  }

  public void setContextBefore(String contextBefore) {
    this.contextBefore = contextBefore;
  }

  public String getContextAfter() {
    return contextAfter;
  }

  public void setContextAfter(String contextAfter) {
    this.contextAfter = contextAfter;
  }
}
