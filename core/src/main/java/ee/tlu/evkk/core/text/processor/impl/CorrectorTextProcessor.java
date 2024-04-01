package ee.tlu.evkk.core.text.processor.impl;

import ee.tlu.evkk.core.integration.CorrectorServerClient;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import static ee.tlu.evkk.core.text.processor.TextProcessor.Type.CORRECTOR;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
@Component
@RequiredArgsConstructor
public class CorrectorTextProcessor extends AbstractTextProcessor {

  private final CorrectorServerClient correctorServerClient;

  @Override
  public long getVersion() {
    return 1L;
  }

  @NonNull
  @Override
  public Type getType() {
    return CORRECTOR;
  }

  @NonNull
  @Override
  protected Object doProcess(@NonNull String input, @NonNull Context context) {
    return correctorServerClient.getKorrektuur(input);
  }

}
