package ee.tlu.evkk.dal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WordAndPosInfoDto {

  private String word;
  private int startChar;
  private int endChar;
}
