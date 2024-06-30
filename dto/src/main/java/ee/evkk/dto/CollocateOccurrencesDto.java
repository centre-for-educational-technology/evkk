package ee.evkk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CollocateOccurrencesDto {

  private Long occurrences;
  private Long leftOccurrences;
  private Long rightOccurrences;
}
