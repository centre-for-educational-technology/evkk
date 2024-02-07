package ee.evkk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class WordContextResponseDto {

  private List<WordContextDto> contextList;
  private String initialKeyword;
  private String lemmatizedKeyword;
}
