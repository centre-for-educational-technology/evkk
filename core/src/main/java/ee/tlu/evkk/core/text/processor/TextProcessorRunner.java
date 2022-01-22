package ee.tlu.evkk.core.text.processor;

import ee.tlu.evkk.core.text.processor.TextProcessor.Type;
import org.springframework.util.Assert;

import java.util.Collection;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
public class TextProcessorRunner {

  private final Map<Type, TextProcessor> processorsByType;

  private TextProcessorRunner(Map<Type, TextProcessor> processorsByType) {
    this.processorsByType = processorsByType;
  }

  static TextProcessorRunner create(Collection<TextProcessor> processors) {
    Map<Type, TextProcessor> processorsByType = processors.stream().collect(Collectors.toUnmodifiableMap(TextProcessor::getType, Function.identity()));
    return new TextProcessorRunner(processorsByType);
  }

  private TextProcessor getProcessor(Type type) {
    TextProcessor processor = processorsByType.get(type);
    if (processor == null) throw new IllegalStateException("No text processor found for: " + type);
    return processor;
  }

  public long getVersion(Type type) {
    return getProcessor(type).getVersion();
  }

  public Result run(Type type, String text) {
    TextProcessor processor = processorsByType.get(type);
    long version = processor.getVersion();
    Object result = processor.process(text);
    Assert.notNull(result, "Contract violation: processor must not return NULL");
    return new Result(version, result);
  }

  public static final class Result {

    private final long version;
    private final Object result;

    private Result(long version, Object result) {
      this.version = version;
      this.result = result;
    }

    public long getVersion() {
      return version;
    }

    public Object getResult() {
      return result;
    }

  }

}
