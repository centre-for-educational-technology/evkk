package ee.evkk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WordContextDto {

  private String keyword;
  private String contextBefore;
  private String contextAfter;
}
