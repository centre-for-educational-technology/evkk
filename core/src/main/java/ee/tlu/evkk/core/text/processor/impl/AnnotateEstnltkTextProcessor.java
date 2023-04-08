package ee.tlu.evkk.core.text.processor.impl;

import ee.tlu.evkk.core.integration.KlasterdajaServerClient;
import org.springframework.stereotype.Component;

import javax.annotation.Nonnull;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2022
 */
@Component
public class AnnotateEstnltkTextProcessor extends AbstractTextProcessor {

  private final KlasterdajaServerClient klasterdajaServerClient;

  public AnnotateEstnltkTextProcessor(KlasterdajaServerClient klasterdajaServerClient) {
    this.klasterdajaServerClient = klasterdajaServerClient;
  }

  @Override
  public long getVersion() {
    return 1;
  }

  @Nonnull
  @Override
  public Type getType() {
    return Type.ANNOTATE_ESTNLTK;
  }

  @Nonnull
  @Override
  protected Object doProcess(@Nonnull String input, @Nonnull Context context) {
    boolean isEstonianText = context.getLanguageCode().map(code -> code.equals("eesti")).orElse(Boolean.FALSE);
    // This processor only supports annotating texts in estonian
    Map<String, String> ańswer = new HashMap<>();
    if (!isEstonianText) {
      ańswer.put("content", "");
    } else {
      ańswer.put("content", klasterdajaServerClient.klasterdajaParsi(input));
    }
    return ańswer;

  }

}
