package ee.tlu.evkk.core.service;

import ee.tlu.evkk.core.text.processor.TextProcessor.Type;
import ee.tlu.evkk.core.text.processor.TextProcessorRunner;
import ee.tlu.evkk.dal.dao.TextDao;
import ee.tlu.evkk.dal.dto.Text;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
@Service
public class TextProcessorService {

  private final TextDao textDao;
  private final TextProcessorRunner textProcessorRunner;

  public TextProcessorService(TextDao textDao, TextProcessorRunner textProcessorRunner) {
    this.textDao = textDao;
    this.textProcessorRunner = textProcessorRunner;
  }

  public void processText(Type type, UUID textId) {
    Optional<Text> text = textDao.findById(textId);
    if (text.isEmpty()) throw new RuntimeException("Text not found"); //TODO: use business exception

    String hash = text.get().getHash();
    long version = textProcessorRunner.getVersion(type);

    String content = text.get().getContent();
  }

}
