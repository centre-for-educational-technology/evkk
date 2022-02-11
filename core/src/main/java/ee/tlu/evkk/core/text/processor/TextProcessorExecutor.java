package ee.tlu.evkk.core.text.processor;

import ee.tlu.evkk.core.text.processor.TextProcessor.Context;
import ee.tlu.evkk.core.text.processor.TextProcessor.Type;
import org.springframework.lang.NonNull;
import org.springframework.util.Assert;

import java.util.Collection;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
public class TextProcessorExecutor {

  private final Map<Type, TextProcessor> processorsByType;

  private TextProcessorExecutor(Map<Type, TextProcessor> processorsByType) {
    this.processorsByType = processorsByType;
  }

  static TextProcessorExecutor create(Collection<TextProcessor> processors) {
    Map<Type, TextProcessor> processorsByType = processors.stream().collect(Collectors.toUnmodifiableMap(TextProcessor::getType, Function.identity()));
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
    Objects.requireNonNull(type, "type must not be null");
    Objects.requireNonNull(context, "context must not be null");
    Objects.requireNonNull(text, "text must not be null");

    Object result = getProcessor(type).process(text, context);
    Assert.notNull(result, "Contract violation: processor must not return NULL");
    return result;
  }

}
