package ee.tlu.evkk.api.service;

import ee.evkk.dto.TextToSpeechDto;
import ee.tlu.evkk.core.integration.TextToSpeechClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class TextToSpeechService {

  private final TextToSpeechClient textToSpeechClient;

  public byte[] generateSpeech(TextToSpeechDto textToSpeechDto) {
    return textToSpeechClient.getText(textToSpeechDto);
  }
}
