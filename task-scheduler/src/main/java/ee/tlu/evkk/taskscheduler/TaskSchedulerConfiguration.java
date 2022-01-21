package ee.tlu.evkk.taskscheduler;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

/**
 * @author Mikk Tarvas
 * Date: 20.01.2022
 */
//@Configuration
//@EnableScheduling
public class TaskSchedulerConfiguration {

  @Scheduled(fixedDelay = 5000L)
  public void foo() {

  }

}
