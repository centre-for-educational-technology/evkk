package ee.tlu.evkk.taskscheduler;

import ee.tlu.evkk.core.CoreConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

/**
 * @author Mikk Tarvas
 * Date: 20.01.2022
 */
@Configuration
@Import(CoreConfiguration.class)
//@EnableScheduling
public class TaskSchedulerConfiguration {

  @Scheduled(fixedDelay = 5000L)
  public void foo() {

  }

}
