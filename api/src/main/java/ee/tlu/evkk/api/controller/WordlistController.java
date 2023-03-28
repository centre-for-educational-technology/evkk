package ee.tlu.evkk.api.controller;

import ee.tlu.evkk.api.controller.dto.WordlistRequestDto;
import ee.tlu.evkk.api.controller.dto.WordlistResponseDto;
import ee.tlu.evkk.api.service.WordlistService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/wordlist")
public class WordlistController {

  private final WordlistService wordlistService;

  public WordlistController(WordlistService wordlistService) {
    this.wordlistService = wordlistService;
  }

  @PostMapping
  public List<WordlistResponseDto> getWordlistResponse(@RequestBody @Valid WordlistRequestDto dto) {
    return wordlistService.getWordlistResponse(dto);
  }
}
