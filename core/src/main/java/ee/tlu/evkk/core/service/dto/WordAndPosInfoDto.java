package ee.tlu.evkk.core.service.dto;

public class WordAndPosInfoDto {

  private String word;
  private int startChar;
  private int endChar;

  public String getWord() {
    return word;
  }

  public void setWord(String word) {
    this.word = word;
  }

  public int getStartChar() {
    return startChar;
  }

  public void setStartChar(int startChar) {
    this.startChar = startChar;
  }

  public int getEndChar() {
    return endChar;
  }

  public void setEndChar(int endChar) {
    this.endChar = endChar;
  }
}
