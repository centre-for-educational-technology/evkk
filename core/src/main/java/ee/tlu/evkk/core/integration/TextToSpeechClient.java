package ee.tlu.evkk.core.integration;

import ee.evkk.dto.TextToSpeechDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;

@RequiredArgsConstructor
public class TextToSpeechClient extends AbstractRestOperationsClient {

  private final RestOperations rest;

  @Value("${text-to-speech.url}")
  private String textToUrl;

  public byte[] getText(TextToSpeechDto textToSpeechDto) {
    ResponseEntity<byte[]> response = retry().execute(context -> rest.postForEntity(
      textToUrl,
      new HttpEntity<>(textToSpeechDto),
      byte[].class
    ));
    return response.getBody();
  }

}
