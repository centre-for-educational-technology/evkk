package ee.tlu.evkk.core.text.processor.impl;

import ee.tlu.evkk.core.integration.StanzaServerClient;
import ee.tlu.evkk.core.text.processor.TextProcessor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
@Component
public class LanguageLevelTextProcessor extends AbstractTextProcessor {

  private final StanzaServerClient stanzaServerClient;

  public LanguageLevelTextProcessor(StanzaServerClient stanzaServerClient) {
    this.stanzaServerClient = stanzaServerClient;
  }

  @Override
  public long getVersion() {
    return 1L;
  }

  @NonNull
  @Override
  public TextProcessor.Type getType() {
    return Type.LANGUAGE_LEVEL;
  }

  @NonNull
  @Override
  protected Object doProcess(@NonNull String input) {
    return stanzaServerClient.getKeeletase(input);
  }

}
