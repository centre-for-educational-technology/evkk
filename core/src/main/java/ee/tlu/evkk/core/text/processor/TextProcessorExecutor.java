package ee.tlu.evkk.core.text.processor;

import ee.tlu.evkk.core.text.processor.TextProcessor.Context;
import ee.tlu.evkk.core.text.processor.TextProcessor.Type;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

import static java.util.Objects.requireNonNull;
import static java.util.function.Function.identity;
import static java.util.stream.Collectors.toUnmodifiableMap;
import static org.springframework.util.Assert.notNull;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
@RequiredArgsConstructor
public class TextProcessorExecutor {

  private final Map<Type, TextProcessor> processorsByType;

  static TextProcessorExecutor create(Collection<TextProcessor> processors) {
    Map<Type, TextProcessor> processorsByType = processors.stream().collect(toUnmodifiableMap(TextProcessor::getType, identity()));
    return new TextProcessorExecutor(processorsByType);
  }

  private TextProcessor getProcessor(Type type) {
    TextProcessor processor = processorsByType.get(type);
    if (processor == null) throw new IllegalStateException("No text processor found for: " + type);
    return processor;
  }

  public long getVersion(Type type) {
    return getProcessor(type).getVersion();
  }

  public Set<Type> getTypes() {
    return processorsByType.keySet();
  }

  public Object execute(@NonNull Type type, @NonNull Context context, @NonNull String text) {
    requireNonNull(type, "type must not be null");
    requireNonNull(context, "context must not be null");
    requireNonNull(text, "text must not be null");

    Object result = getProcessor(type).process(text, context);
    notNull(result, "Contract violation: processor must not return NULL");
    return result;
  }

}
