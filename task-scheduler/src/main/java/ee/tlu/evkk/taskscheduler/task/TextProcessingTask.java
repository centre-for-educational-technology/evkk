package ee.tlu.evkk.taskscheduler.task;

import ee.tlu.evkk.core.service.TextProcessorService;
import ee.tlu.evkk.core.text.processor.TextProcessor;
import ee.tlu.evkk.dal.dto.MissingTextProcessorResult;
import org.springframework.core.task.AsyncListenableTaskExecutor;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.stream.Stream;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
public class TextProcessingTask {

  private final AsyncListenableTaskExecutor executor;
  private final TextProcessorService textProcessorService;

  public TextProcessingTask(AsyncListenableTaskExecutor executor, TextProcessorService textProcessorService) {
    this.executor = executor;
    this.textProcessorService = textProcessorService;
  }

  @Transactional
  public void execute() {
    try (Stream<MissingTextProcessorResult> missingTextProcessorResults = textProcessorService.findMissingTextProcessorResults()) {
      missingTextProcessorResults.forEach(missingTextProcessorResult -> processText(missingTextProcessorResult.getProcessorType(), missingTextProcessorResult.getTextId()));
    }
  }

  private void processText(String processorType, UUID textId) {
    //TODO: threading + transactions
    textProcessorService.processText(TextProcessor.Type.valueOf(processorType), textId);
  }

}
