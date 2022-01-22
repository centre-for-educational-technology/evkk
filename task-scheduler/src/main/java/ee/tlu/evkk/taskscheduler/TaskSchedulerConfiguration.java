package ee.tlu.evkk.taskscheduler;

import ee.tlu.evkk.core.CoreConfiguration;
import ee.tlu.evkk.taskscheduler.task.TextProcessingTask;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Mikk Tarvas
 * Date: 20.01.2022
 */
@Configuration
@Import(CoreConfiguration.class)
@EnableScheduling
public class TaskSchedulerConfiguration {

  private final TextProcessingTask textProcessingTask;

  public TaskSchedulerConfiguration(TextProcessingTask textProcessingTask) {
    this.textProcessingTask = textProcessingTask;
  }

  @Scheduled(fixedDelay = 5000L)
  public void processTexts() {
    textProcessingTask.execute();
  }

}
