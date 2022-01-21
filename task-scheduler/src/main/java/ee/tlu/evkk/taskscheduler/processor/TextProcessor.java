package ee.tlu.evkk.taskscheduler.processor;

import org.springframework.lang.NonNull;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
public interface TextProcessor {

  @NonNull
  Long getVersion();

  @NonNull
  Type getType();

  @NonNull
  Object process(@NonNull String input);

  enum Type {

    LEMMATIZER

  }

}
