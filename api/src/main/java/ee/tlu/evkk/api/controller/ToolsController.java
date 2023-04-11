package ee.tlu.evkk.api.controller;

import ee.evkk.dto.WordContextRequestDto;
import ee.evkk.dto.WordContextResponseDto;
import ee.evkk.dto.WordlistRequestDto;
import ee.evkk.dto.WordlistResponseDto;
import ee.tlu.evkk.api.service.WordContextService;
import ee.tlu.evkk.api.service.WordlistService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/tools")
public class ToolsController {

  private final WordlistService wordlistService;
  private final WordContextService wordContextService;

  public ToolsController(WordlistService wordlistService, WordContextService wordContextService) {
    this.wordlistService = wordlistService;
    this.wordContextService = wordContextService;
  }

  @PostMapping("wordlist")
  public List<WordlistResponseDto> getWordlistResponse(@RequestBody @Valid WordlistRequestDto dto) throws IOException {
    return wordlistService.getWordlistResponse(dto);
  }

  @PostMapping("wordcontext")
  public List<WordContextResponseDto> getWordContextResponse(@RequestBody @Valid WordContextRequestDto dto) {
    return wordContextService.getWordContextResponse(dto);
  }
}
