package ee.tlu.evkk.core.text.processor.impl;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
@Component
public class LemmatizerTextProcessor extends AbstractTextProcessor {

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
    return "asdasdasd"; //TODO: impl
  }

}
