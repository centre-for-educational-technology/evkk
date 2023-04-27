package ee.evkk.dto;

import java.math.BigDecimal;

public class CollocateDto {

  private String collocate;
  private BigDecimal score;
  private Long coOccurrences;
  private Long frequencyCount;
  private BigDecimal frequencyPercentage;

  public CollocateDto(String collocate, BigDecimal score, Long coOccurrences, Long frequencyCount, BigDecimal frequencyPercentage) {
    this.collocate = collocate;
    this.score = score;
    this.coOccurrences = coOccurrences;
    this.frequencyCount = frequencyCount;
    this.frequencyPercentage = frequencyPercentage;
  }

  public String getCollocate() {
    return collocate;
  }

  public void setCollocate(String collocate) {
    this.collocate = collocate;
  }

  public BigDecimal getScore() {
    return score;
  }

  public void setScore(BigDecimal score) {
    this.score = score;
  }

  public Long getCoOccurrences() {
    return coOccurrences;
  }

  public void setCoOccurrences(Long coOccurrences) {
    this.coOccurrences = coOccurrences;
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
