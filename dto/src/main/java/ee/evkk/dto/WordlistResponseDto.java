package ee.evkk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class WordlistResponseDto {

  private List<WordlistResponseEntryDto> resultList;
  private List<String> wordlist;
}
