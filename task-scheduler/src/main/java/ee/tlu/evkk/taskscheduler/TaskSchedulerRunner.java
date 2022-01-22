package ee.tlu.evkk.taskscheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.task.TaskExecutorBuilder;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

/**
 * @author Mikk Tarvas
 * Date: 05.03.2020
 */
@SpringBootApplication
public class TaskSchedulerRunner implements CommandLineRunner {

  public static void main(String[] args) {
    SpringApplication.run(TaskSchedulerRunner.class, args);
  }

  @Autowired
  private TaskExecutorBuilder taskExecutorBuilder;

  private static final Logger log = LoggerFactory.getLogger(TaskSchedulerRunner.class);

  @Override
  public void run(String... args) {

    if (1 == 1) return;

    ThreadPoolTaskExecutor executor = taskExecutorBuilder
      .allowCoreThreadTimeOut(true)
      .queueCapacity(100)
      .build();
    executor.initialize();


    // ExecutorService e = Executors.newWorkStealingPool();
    // ConcurrentTaskExecutor executor = new ConcurrentTaskExecutor(e);

    for (int i = 0; i < 1000000; i++) {
      int j = i;
      executor.submitListenable(new Runnable() {
        @Override
        public void run() {
          log.info("Start: " + j);
          try {
            Thread.sleep(1000L);
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
        }
      });
    }
    log.info("#########################");
  }

}
