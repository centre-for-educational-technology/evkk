package ee.evkk.dto;

import ee.evkk.dto.enums.WordType;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Set;
import java.util.UUID;

public class WordlistRequestDto {

  @NotNull
  private Set<UUID> corpusTextIds;

  @NotNull
  private WordType type;

  private boolean excludeStopwords;

  private Set<String> customStopwords;

  private boolean keepCapitalization;

  @Min(value = 1)
  private Integer minFrequency;


  public Set<UUID> getCorpusTextIds() {
    return corpusTextIds;
  }

  public void setCorpusTextIds(Set<UUID> corpusTextIds) {
    this.corpusTextIds = corpusTextIds;
  }

  public WordType getType() {
    return type;
  }

  public void setType(WordType type) {
    this.type = type;
  }

  public boolean isExcludeStopwords() {
    return excludeStopwords;
  }

  public void setExcludeStopwords(boolean excludeStopwords) {
    this.excludeStopwords = excludeStopwords;
  }

  public Set<String> getCustomStopwords() {
    return customStopwords;
  }

  public void setCustomStopwords(Set<String> customStopwords) {
    this.customStopwords = customStopwords;
  }

  public boolean isKeepCapitalization() {
    return keepCapitalization;
  }

  public void setKeepCapitalization(boolean keepCapitalization) {
    this.keepCapitalization = keepCapitalization;
  }

  public Integer getMinFrequency() {
    return minFrequency;
  }

  public void setMinFrequency(Integer minFrequency) {
    this.minFrequency = minFrequency;
  }
}
