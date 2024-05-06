package ee.evkk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class CollocateDto {

  private String collocate;
  private BigDecimal score;
  private Long coOccurrences;
  private Long frequencyCount;
  private BigDecimal frequencyPercentage;
  private Long leftOccurrences;
  private Long rightOccurrences;
}
