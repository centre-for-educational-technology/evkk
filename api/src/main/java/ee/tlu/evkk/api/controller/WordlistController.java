package ee.tlu.evkk.api.controller;

import ee.evkk.dto.WordlistRequestDto;
import ee.evkk.dto.WordlistResponseDto;
import ee.tlu.evkk.api.service.WordlistService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/tools/wordlist")
public class WordlistController {

  private final WordlistService wordlistService;

  public WordlistController(WordlistService wordlistService) {
    this.wordlistService = wordlistService;
  }

  @PostMapping
  public List<WordlistResponseDto> getWordlistResponse(@RequestBody @Valid WordlistRequestDto dto) throws IOException {
    return wordlistService.getWordlistResponse(dto);
  }
}
