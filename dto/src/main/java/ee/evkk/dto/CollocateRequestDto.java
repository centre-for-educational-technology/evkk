package ee.evkk.dto;

import ee.evkk.dto.enums.CollocateFormula;
import ee.evkk.dto.enums.WordType;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;
import java.util.UUID;

public class CollocateRequestDto {

  private Set<UUID> corpusTextIds;

  private String ownTexts;

  @NotNull
  private WordType type;

  @NotBlank
  private String keyword;

  @NotNull
  @Min(3)
  @Max(5)
  private int searchCount;

  @NotNull
  private CollocateFormula formula;

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

  public int getSearchCount() {
    return searchCount;
  }

  public void setSearchCount(int searchCount) {
    this.searchCount = searchCount;
  }

  public CollocateFormula getFormula() {
    return formula;
  }

  public void setFormula(CollocateFormula formula) {
    this.formula = formula;
  }

  public boolean isKeepCapitalization() {
    return keepCapitalization;
  }

  public void setKeepCapitalization(boolean keepCapitalization) {
    this.keepCapitalization = keepCapitalization;
  }
}
