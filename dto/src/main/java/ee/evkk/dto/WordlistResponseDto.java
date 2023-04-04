package ee.evkk.dto;

import java.math.BigDecimal;

public class WordlistResponseDto {

  private String word;
  private Long frequencyCount;
  private BigDecimal frequencyPercentage;

  public WordlistResponseDto(String word, Long frequencyCount, BigDecimal frequencyPercentage) {
    this.word = word;
    this.frequencyCount = frequencyCount;
    this.frequencyPercentage = frequencyPercentage;
  }

  public String getWord() {
    return word;
  }

  public void setWord(String word) {
    this.word = word;
  }

  public Long getFrequencyCount() {
    return frequencyCount;
  }

  public void setFrequencyCount(Long frequencyCount) {
    this.frequencyCount = frequencyCount;
  }

  public BigDecimal getFrequencyPercentage() {
    return frequencyPercentage;
  }

  public void setFrequencyPercentage(BigDecimal frequencyPercentage) {
    this.frequencyPercentage = frequencyPercentage;
  }
}
