package ee.tlu.evkk.core.text.processor;

import org.springframework.lang.NonNull;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
public interface TextProcessor {

  long getVersion();

  @NonNull
  Type getType();

  @NonNull
  Object process(@NonNull String input);

  enum Type {

    LEMMATIZER,
    CORRECTOR,
    LANGUAGE_LEVEL

  }

}
