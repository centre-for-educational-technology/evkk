package ee.tlu.evkk.core.text.processor.impl;

import ee.tlu.evkk.core.text.processor.TextProcessor;
import org.springframework.lang.NonNull;

import static java.util.Objects.requireNonNull;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
public abstract class AbstractTextProcessor implements TextProcessor {

  @NonNull
  @Override
  public final Object process(@NonNull String input, @NonNull Context context) {
    requireNonNull(input, "input must not be null");
    return doProcess(input, context);
  }

  @NonNull
  protected abstract Object doProcess(@NonNull String input, @NonNull Context context);

}
