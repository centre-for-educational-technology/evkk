package ee.tlu.evkk.taskscheduler.task;

import ee.tlu.evkk.core.service.TextProcessorService;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.boot.task.TaskExecutorBuilder;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
@Component
public class TextProcessingTaskFactoryBean implements FactoryBean<TextProcessingTask> {

  private final TaskExecutorBuilder taskExecutorBuilder;
  private final TextProcessorService textProcessorService;

  public TextProcessingTaskFactoryBean(TaskExecutorBuilder taskExecutorBuilder, TextProcessorService textProcessorService) {
    this.taskExecutorBuilder = taskExecutorBuilder;
    this.textProcessorService = textProcessorService;
  }

  @Override
  public TextProcessingTask getObject() {
    ThreadPoolTaskExecutor executor = taskExecutorBuilder.build();
    executor.initialize();
    return new TextProcessingTask(executor, textProcessorService);
  }

  @Override
  public Class<?> getObjectType() {
    return TextProcessingTask.class;
  }

}
