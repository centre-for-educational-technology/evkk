package ee.tlu.evkk.core.text.processor.impl;

import ee.tlu.evkk.core.integration.CorrectorServerClient;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
@Component
public class CorrectorTextProcessor extends AbstractTextProcessor {

  private final CorrectorServerClient correctorServerClient;

  public CorrectorTextProcessor(CorrectorServerClient correctorServerClient) {
    this.correctorServerClient = correctorServerClient;
  }

  @Override
  public long getVersion() {
    return 1L;
  }

  @NonNull
  @Override
  public Type getType() {
    return Type.CORRECTOR;
  }

  @NonNull
  @Override
  protected Object doProcess(@NonNull String input, @NonNull Context context) {
    return correctorServerClient.getKorrektuur(input);
  }

}
