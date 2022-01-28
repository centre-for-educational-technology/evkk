package ee.tlu.evkk.taskscheduler;

import ee.tlu.evkk.core.CoreConfiguration;
import ee.tlu.evkk.taskscheduler.task.TextProcessingTask;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

/**
 * @author Mikk Tarvas
 * Date: 20.01.2022
 */
@Configuration
@PropertySource("classpath:task-scheduler.properties")
@Import(CoreConfiguration.class)
@EnableScheduling
@EnableConfigurationProperties(TaskSchedulerConfiguration.Properties.class)
public class TaskSchedulerConfiguration {

  private static final Logger log = LoggerFactory.getLogger(TaskSchedulerConfiguration.class);

  private final Properties properties;
  private final TextProcessingTask textProcessingTask;

  public TaskSchedulerConfiguration(Properties properties, TextProcessingTask textProcessingTask) {
    this.properties = properties;
    this.textProcessingTask = textProcessingTask;
  }

  @Scheduled(fixedDelay = 5000L)
  public void processTexts() {
    if (properties.getTextProcessingEnabled() != Boolean.TRUE) {
      log.info("TextProcessingTask is not enabled");
      return;
    }
    textProcessingTask.execute().join();
  }

  @ConfigurationProperties("evkk.task-scheduler")
  public static class Properties {

    private Boolean textProcessingEnabled;

    public Boolean getTextProcessingEnabled() {
      return textProcessingEnabled;
    }

    public void setTextProcessingEnabled(Boolean textProcessingEnabled) {
      this.textProcessingEnabled = textProcessingEnabled;
    }

  }

}
