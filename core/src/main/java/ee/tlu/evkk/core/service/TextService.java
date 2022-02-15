package ee.tlu.evkk.core.service;

import ee.tlu.evkk.core.text.processor.TextProcessor;
import ee.tlu.evkk.dal.json.Json;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2022
 */
@Service
public class TextService {

  private final TextProcessorService textProcessorService;

  public TextService(TextProcessorService textProcessorService) {
    this.textProcessorService = textProcessorService;
  }

  public String annotateWithEstnltk(UUID textId) {
    Json json = textProcessorService.processText(TextProcessor.Type.ANNOTATE_ESTNLTK, textId);
    return json.getAsObject(String.class);
  }

}
