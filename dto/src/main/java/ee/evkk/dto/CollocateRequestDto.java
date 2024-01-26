package ee.evkk.dto;

import ee.evkk.dto.enums.CollocateFormula;
import ee.evkk.dto.enums.WordType;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class CollocateRequestDto {

  private Set<UUID> corpusTextIds;

  private String ownTexts;

  @NotNull
  private WordType type;

  @NotBlank
  private String keyword;

  @NotNull
  @Min(1)
  @Max(5)
  private int searchCount;

  @NotNull
  private CollocateFormula formula;

  private boolean keepCapitalization;
}
