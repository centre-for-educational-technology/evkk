package ee.tlu.evkk.core.text.processor.impl;

import ee.tlu.evkk.core.integration.KlasterdajaServerClient;
import org.springframework.stereotype.Component;

import javax.annotation.Nonnull;

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
    return klasterdajaServerClient.klasterdajaParsi(input);
  }

}
