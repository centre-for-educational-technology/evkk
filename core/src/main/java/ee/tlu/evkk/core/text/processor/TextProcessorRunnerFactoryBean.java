package ee.tlu.evkk.core.text.processor;

import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.stream.Collectors;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
@Component
public class TextProcessorRunnerFactoryBean implements FactoryBean<TextProcessorRunner> {

  private final Collection<TextProcessor> processors;

  public TextProcessorRunnerFactoryBean(ObjectProvider<TextProcessor> processors) {
    this.processors = processors.stream().collect(Collectors.toList());
  }

  @Override
  public TextProcessorRunner getObject() {
    return TextProcessorRunner.create(processors);
  }

  @Override
  public Class<?> getObjectType() {
    return TextProcessorRunner.class;
  }

}
