package ee.tlu.evkk.taskscheduler.task;

import ee.tlu.evkk.core.service.TextProcessorService;
import ee.tlu.evkk.dal.dto.MissingTextProcessorResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.task.AsyncListenableTaskExecutor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionOperations;
import org.springframework.util.concurrent.ListenableFuture;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Stream;

import static com.spotify.futures.CompletableFutures.joinList;
import static ee.tlu.evkk.core.text.processor.TextProcessor.Type.valueOf;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
@Slf4j
@RequiredArgsConstructor
public class TextProcessingTask {

  private final AsyncListenableTaskExecutor executor;
  private final TransactionOperations transactionOperations;
  private final TextProcessorService textProcessorService;

  @Transactional
  public CompletableFuture<Void> execute() {
    try (Stream<MissingTextProcessorResult> missingTextProcessorResults = textProcessorService.findMissingTextProcessorResults()) {
      return missingTextProcessorResults
        .map(missingTextProcessorResult -> processText(missingTextProcessorResult.getProcessorType(), missingTextProcessorResult.getTextId()))
        .collect(joinList()).thenApply(ignore -> null);
    }
  }

  private CompletableFuture<?> processText(String processorType, UUID textId) {
    ListenableFuture<?> result = executor.submitListenable(() -> transactionOperations.executeWithoutResult(status -> doProcessText(processorType, textId)));
    return result.completable();
  }

  private void doProcessText(String processorType, UUID textId) {
    try {
      textProcessorService.processText(valueOf(processorType), textId);
    } catch (Exception ex) {
      log.error("Unable to process text", ex);
    }
  }

}
