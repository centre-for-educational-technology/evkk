package ee.tlu.evkk.core.service;

import ee.tlu.evkk.core.service.dto.TextWithProperties;
import ee.tlu.evkk.core.text.processor.TextProcessor;
import ee.tlu.evkk.dal.dto.Pageable;
import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.dto.TextProperty;
import ee.tlu.evkk.dal.json.Json;
import ee.tlu.evkk.dal.repository.TextPropertyRepository;
import ee.tlu.evkk.dal.repository.TextRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2022
 */
@Service
public class TextService {

  private final TextRepository textRepository;
  private final TextPropertyRepository textPropertyRepository;
  private final TextProcessorService textProcessorService;

  public TextService(TextRepository textRepository, TextPropertyRepository textPropertyRepository, TextProcessorService textProcessorService) {
    this.textRepository = textRepository;
    this.textPropertyRepository = textPropertyRepository;
    this.textProcessorService = textProcessorService;
  }

  public String annotateWithEstnltk(UUID textId) {
    Json json = textProcessorService.processText(TextProcessor.Type.ANNOTATE_ESTNLTK, textId);
    return json.getAsObject(String.class);
  }

  public List<TextWithProperties> search(Map<String, ? extends Collection<String>> filters, Pageable pageable) {
    List<Text> texts = textRepository.search(filters, pageable);
    Set<UUID> textIds = texts.stream().map(Text::getId).collect(Collectors.toUnmodifiableSet());
    Map<UUID, List<TextProperty>> textPropertiesByTextId = textPropertyRepository.findByTextIds(textIds).stream().collect(Collectors.groupingBy(TextProperty::getTextId));
    return texts.stream().map(text -> toTextWithProperties(text, textPropertiesByTextId)).collect(Collectors.toUnmodifiableList());
  }

  private TextWithProperties toTextWithProperties(Text text, Map<UUID, List<TextProperty>> textPropertiesByTextId) {
    List<TextProperty> properties = textPropertiesByTextId.getOrDefault(text.getId(), Collections.emptyList());
    return new TextWithProperties(text, properties);
  }

}
