package ee.tlu.evkk.core.service;

import ee.tlu.evkk.core.text.processor.TextProcessor.Context;
import ee.tlu.evkk.core.text.processor.TextProcessor.Type;
import ee.tlu.evkk.core.text.processor.TextProcessorExecutor;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dao.TextProcessorResultDao;
import ee.tlu.evkk.dal.dto.MissingTextProcessorResult;
import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.dto.TextProcessorResult;
import ee.tlu.evkk.dal.json.Json;
import ee.tlu.evkk.dal.json.JsonFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
@Service
public class TextProcessorService {

  private final JsonFactory jsonFactory;
  private final TextDao textDao;
  private final TextProcessorResultDao textProcessorResultDao;
  private final TextPropertyService textPropertyService;
  private final TextProcessorExecutor textProcessorExecutor;

  public TextProcessorService(JsonFactory jsonFactory, TextDao textDao, TextProcessorResultDao textProcessorResultDao, TextPropertyService textPropertyService, TextProcessorExecutor textProcessorExecutor) {
    this.jsonFactory = jsonFactory;
    this.textDao = textDao;
    this.textProcessorResultDao = textProcessorResultDao;
    this.textPropertyService = textPropertyService;
    this.textProcessorExecutor = textProcessorExecutor;
  }

  public void processText(Type type, UUID textId) {
    Optional<Text> text = textDao.findById(textId);
    if (text.isEmpty()) throw new RuntimeException("Text not found: " + textId); //TODO: use business exception

    String hash = text.get().getHash();
    long version = textProcessorExecutor.getVersion(type);

    Optional<TextProcessorResult> found = textProcessorResultDao.findResultForTypeAndVersion(hash, type.toString(), version);
    if (found.isPresent()) {
      return;
    }

    Json result;
    String finalText = text.get().getContent()
      .replace("\\n", " ")
      .replace("\\t", " ");

    try {
      result = jsonFactory.createFromObject(textProcessorExecutor.execute(type, buildProcessorContext(textId), finalText));
    } catch (Exception ex) {
      textProcessorResultDao.upsert(buildTextProcessorResult(hash, buildEmptyJson(), type.toString(), version));
      throw new RuntimeException("Unable to process textId " + textId + " using " + type + " processor", ex);
    }
    textProcessorResultDao.upsert(buildTextProcessorResult(hash, result, type.toString(), version));
  }

  private Json buildEmptyJson() {
    return jsonFactory.createFromObject(Map.of("contents", ""));
  }

  private TextProcessorResult buildTextProcessorResult(String hash, Json result, String type, Long version) {
    TextProcessorResult textProcessorResult = new TextProcessorResult();
    textProcessorResult.setTextHash(hash);
    textProcessorResult.setResult(result);
    textProcessorResult.setType(type);
    textProcessorResult.setVersion(version);
    return textProcessorResult;
  }

  private Context buildProcessorContext(UUID textId) {
    MultiValueMap<String, String> textProperties = textPropertyService.getTextProperties(textId);
    Context context = Context.newInstance();
    if (textProperties.containsKey("failinimi"))
      context = context.withOriginalFileName(textProperties.getFirst("failinimi"));
    if (textProperties.containsKey("tekstikeel"))
      context = context.withLanguageCode(textProperties.getFirst("tekstikeel"));
    context = context.withFallbackFileName(textId + ".txt");
    return context;
  }

  public Stream<MissingTextProcessorResult> findMissingTextProcessorResults() {
    var processors = textProcessorExecutor.getTypes().stream().collect(Collectors.toUnmodifiableMap(Enum::toString, textProcessorExecutor::getVersion));
    var cursor = textProcessorResultDao.findMissingTextProcessorResults(processors);
    var result = StreamSupport.stream(cursor.spliterator(), false);
    return result.onClose(() -> {
      try {
        cursor.close();
      } catch (IOException ex) {
        throw new UncheckedIOException(ex);
      }
    });
  }

}
