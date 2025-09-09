package ee.tlu.evkk.core.text.processor.impl;

import ee.tlu.evkk.core.integration.KlasterdajaServerClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.Nonnull;
import java.util.HashMap;
import java.util.Map;

import static ee.tlu.evkk.core.text.processor.TextProcessor.Type.ANNOTATE_ESTNLTK;
import static java.lang.Boolean.FALSE;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2022
 */
@Component
@RequiredArgsConstructor
public class AnnotateEstnltkTextProcessor extends AbstractTextProcessor {

  private final KlasterdajaServerClient klasterdajaServerClient;

  @Override
  public long getVersion() {
    return 1L;
  }

  @Nonnull
  @Override
  public Type getType() {
    return ANNOTATE_ESTNLTK;
  }

  @Nonnull
  @Override
  protected Object doProcess(@Nonnull String input, @Nonnull Context context) {
    boolean isEstonianText = context.getLanguageCode().map(code -> code.equals("eesti")).orElse(FALSE);
    // This processor only supports annotating texts in estonian
    Map<String, String> answer = new HashMap<>();
    answer.put("content", isEstonianText
      ? getResponse(input)
      : "");
    return answer;
  }

  private String getResponse(String input) {
    return klasterdajaServerClient.klasterdajaParsi(input)
      .replace("<redacted> ", ""); // removing one space keeps the correct formatting
  }
}
