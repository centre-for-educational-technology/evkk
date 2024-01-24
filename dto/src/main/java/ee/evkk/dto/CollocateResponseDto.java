package ee.evkk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CollocateResponseDto {

  private List<CollocateDto> collocateList;
  private String initialKeyword;
  private String lemmatizedKeyword;
}
