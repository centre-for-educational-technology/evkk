package ee.evkk.dto;

import ee.evkk.dto.enums.WordContextType;
import ee.evkk.dto.enums.WordType;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;
import java.util.UUID;

public class WordContextRequestDto {

  private Set<UUID> corpusTextIds;

  private String ownTexts;

  @NotNull
  private WordType type;

  @NotBlank
  private String keyword;

  @NotNull
  @Min(1)
  @Max(15)
  private int displayCount;

  @NotNull
  private WordContextType displayType;

  private boolean keepCapitalization;

  public Set<UUID> getCorpusTextIds() {
    return corpusTextIds;
  }

  public void setCorpusTextIds(Set<UUID> corpusTextIds) {
    this.corpusTextIds = corpusTextIds;
  }

  public String getOwnTexts() {
    return ownTexts;
  }

  public void setOwnTexts(String ownTexts) {
    this.ownTexts = ownTexts;
  }

  public WordType getType() {
    return type;
  }

  public void setType(WordType type) {
    this.type = type;
  }

  public String getKeyword() {
    return keyword;
  }

  public void setKeyword(String keyword) {
    this.keyword = keyword;
  }

  public int getDisplayCount() {
    return displayCount;
  }

  public void setDisplayCount(int displayCount) {
    this.displayCount = displayCount;
  }

  public WordContextType getDisplayType() {
    return displayType;
  }

  public void setDisplayType(WordContextType displayType) {
    this.displayType = displayType;
  }

  public boolean isKeepCapitalization() {
    return keepCapitalization;
  }

  public void setKeepCapitalization(boolean keepCapitalization) {
    this.keepCapitalization = keepCapitalization;
  }
}
