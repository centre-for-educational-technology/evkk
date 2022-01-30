package ee.tlu.evkk.core.service;

import ee.tlu.evkk.core.text.processor.TextProcessor.Type;
import ee.tlu.evkk.core.text.processor.TextProcessorExecutor;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dao.TextProcessorResultDao;
import ee.tlu.evkk.dal.dto.Json2;
import ee.tlu.evkk.dal.dto.MissingTextProcessorResult;
import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.dto.TextProcessorResult;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UncheckedIOException;
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

  private final TextDao textDao;
  private final TextProcessorResultDao textProcessorResultDao;
  private final TextProcessorExecutor textProcessorExecutor;

  public TextProcessorService(TextDao textDao, TextProcessorResultDao textProcessorResultDao, TextProcessorExecutor textProcessorExecutor) {
    this.textDao = textDao;
    this.textProcessorResultDao = textProcessorResultDao;
    this.textProcessorExecutor = textProcessorExecutor;
  }

  public Json2 processText(Type type, UUID textId) {
    Optional<Text> text = textDao.findById(textId);
    if (text.isEmpty()) throw new RuntimeException("Text not found: " + textId); //TODO: use business exception

    String hash = text.get().getHash();
    long version = textProcessorExecutor.getVersion(type);

    Optional<TextProcessorResult> found = textProcessorResultDao.findResultForTypeAndVersion(hash, type.toString(), version);
    if (found.isPresent()) {
      return found.get().getResult();
    }

    Json2 result;
    try {
      result = Json2.createFromObject(textProcessorExecutor.execute(type, text.get().getContent()));
    } catch (Exception ex) {
      throw new RuntimeException("Unable to process textId " + textId + " using " + type + " processor", ex);
    }

    TextProcessorResult textProcessorResult = new TextProcessorResult();
    textProcessorResult.setTextHash(hash);
    textProcessorResult.setResult(result);
    textProcessorResult.setType(type.toString());
    textProcessorResult.setVersion(version);

    textProcessorResultDao.upsert(textProcessorResult);

    return result;
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
