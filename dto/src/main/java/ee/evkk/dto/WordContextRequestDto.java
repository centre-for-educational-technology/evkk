package ee.evkk.dto;

import ee.evkk.dto.enums.WordContextType;
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
}
