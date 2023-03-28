package ee.tlu.evkk.api.controller.dto;

import ee.tlu.evkk.api.enums.WordlistType;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Set;
import java.util.UUID;

public class WordlistRequestDto {

  @NotNull
  private Set<UUID> corpusTextIds;

  @NotNull
  private WordlistType type;

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

  public WordlistType getType() {
    return type;
  }

  public void setType(WordlistType type) {
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
