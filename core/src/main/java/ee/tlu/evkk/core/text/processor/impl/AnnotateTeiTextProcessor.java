package ee.tlu.evkk.core.text.processor.impl;

import ee.tlu.evkk.core.exception.TextProcessorException;
import ee.tlu.evkk.core.service.TeiAnnotationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.Nonnull;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static ee.tlu.evkk.core.text.processor.TextProcessor.Type.ANNOTATE_TEI;

@Component
@RequiredArgsConstructor
public class AnnotateTeiTextProcessor extends AbstractTextProcessor {

  private final TeiAnnotationService teiAnnotationService;

  @Override
  public long getVersion() {
    return 1L;
  }

  @Nonnull
  @Override
  public Type getType() {
    return ANNOTATE_TEI;
  }

  @Nonnull
  @Override
  protected Object doProcess(@Nonnull String input, @Nonnull Context context) {
    UUID textId = context.getTextId()
      .orElseThrow(() -> new TextProcessorException("Unable to get text ID required for TEI annotation processor"));
    Map<String, String> answer = new HashMap<>();
    answer.put("content", teiAnnotationService.getTeiAnnotationByTextId(textId));
    return answer;
  }
}