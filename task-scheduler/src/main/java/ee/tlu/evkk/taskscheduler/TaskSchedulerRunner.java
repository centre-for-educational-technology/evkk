package ee.tlu.evkk.taskscheduler;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author Mikk Tarvas
 * Date: 05.03.2020
 */
@SpringBootApplication
public class TaskSchedulerRunner implements CommandLineRunner {

  public static void main(String[] args) {
    SpringApplication.run(TaskSchedulerRunner.class, args);
  }

  @Override
  public void run(String... args) {

  }

}
