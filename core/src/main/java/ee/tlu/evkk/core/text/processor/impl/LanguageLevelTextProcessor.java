package ee.tlu.evkk.core.text.processor.impl;

import ee.tlu.evkk.core.integration.StanzaServerClient;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;

import static ee.tlu.evkk.core.text.processor.TextProcessor.Type.LANGUAGE_LEVEL;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
//@Component
@RequiredArgsConstructor
public class LanguageLevelTextProcessor extends AbstractTextProcessor {

  private final StanzaServerClient stanzaServerClient;

  @Override
  public long getVersion() {
    return 1L;
  }

  @NonNull
  @Override
  public Type getType() {
    return LANGUAGE_LEVEL;
  }

  @NonNull
  @Override
  protected Object doProcess(@NonNull String input, @NonNull Context context) {
    return stanzaServerClient.getKeeletase(input);
  }

}
