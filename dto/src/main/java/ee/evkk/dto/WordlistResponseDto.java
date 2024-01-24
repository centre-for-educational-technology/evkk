package ee.evkk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class WordlistResponseDto {

  private String word;
  private Long frequencyCount;
  private BigDecimal frequencyPercentage;
}
