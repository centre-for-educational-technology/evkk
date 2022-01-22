package ee.tlu.evkk.taskscheduler.task;

import com.spotify.futures.CompletableFutures;
import ee.tlu.evkk.core.service.TextProcessorService;
import ee.tlu.evkk.core.text.processor.TextProcessor;
import ee.tlu.evkk.dal.dto.MissingTextProcessorResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.task.AsyncListenableTaskExecutor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionOperations;
import org.springframework.util.concurrent.ListenableFuture;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Stream;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
public class TextProcessingTask {

  private static final Logger log = LoggerFactory.getLogger(TextProcessingTask.class);

  private final AsyncListenableTaskExecutor executor;
  private final TransactionOperations transactionOperations;
  private final TextProcessorService textProcessorService;

  public TextProcessingTask(AsyncListenableTaskExecutor executor, TransactionOperations transactionOperations, TextProcessorService textProcessorService) {
    this.executor = executor;
    this.transactionOperations = transactionOperations;
    this.textProcessorService = textProcessorService;
  }

  @Transactional
  public void execute() {
    try (Stream<MissingTextProcessorResult> missingTextProcessorResults = textProcessorService.findMissingTextProcessorResults()) {
      missingTextProcessorResults
        .map(missingTextProcessorResult -> processText(missingTextProcessorResult.getProcessorType(), missingTextProcessorResult.getTextId()))
        .collect(CompletableFutures.joinList())
        .join();
    }
  }

  private CompletableFuture<?> processText(String processorType, UUID textId) {
    ListenableFuture<?> result = executor.submitListenable(() -> transactionOperations.executeWithoutResult(status -> doProcessText(processorType, textId)));
    return result.completable();
  }

  private void doProcessText(String processorType, UUID textId) {
    try {
      textProcessorService.processText(TextProcessor.Type.valueOf(processorType), textId);
    } catch (Exception ex) {
      log.error("Unable to process text", ex);
    }
  }

}
