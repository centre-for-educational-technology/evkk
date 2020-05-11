package ee.tlu.evkk.daemon;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author Mikk Tarvas
 * Date: 05.03.2020
 */
@SpringBootApplication
public class DaemonRunner implements CommandLineRunner {

  public static void main(String[] args) {
    SpringApplication.run(DaemonRunner.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    Thread.currentThread().join(); //TOD: remove this, when actual async tasks get implemented
  }

}
