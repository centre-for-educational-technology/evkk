package ee.tlu.evkk.core.text.processor.impl;

import ee.tlu.evkk.core.integration.StanzaServerClient;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;

import static ee.tlu.evkk.core.text.processor.TextProcessor.Type.LEMMATIZER;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
//@Component
@RequiredArgsConstructor
public class LemmatizerTextProcessor extends AbstractTextProcessor {

  private final StanzaServerClient stanzaServerClient;

  @Override
  public long getVersion() {
    return 1L;
  }

  @NonNull
  @Override
  public Type getType() {
    return LEMMATIZER;
  }

  @NonNull
  @Override
  protected Object doProcess(@NonNull String input, @NonNull Context context) {
    return stanzaServerClient.getLemmad(input);
  }

}
