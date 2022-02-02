package ee.tlu.evkk.core.text.processor.impl;

import ee.tlu.evkk.core.integration.StanzaServerClient;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
//@Component
public class LemmatizerTextProcessor extends AbstractTextProcessor {

  private final StanzaServerClient stanzaServerClient;

  public LemmatizerTextProcessor(StanzaServerClient stanzaServerClient) {
    this.stanzaServerClient = stanzaServerClient;
  }

  @Override
  public long getVersion() {
    return 1L;
  }

  @NonNull
  @Override
  public Type getType() {
    return Type.LEMMATIZER;
  }

  @NonNull
  @Override
  protected Object doProcess(@NonNull String input) {
    return stanzaServerClient.getLemmad(input);
  }

}
