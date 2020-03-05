package ee.tlu.evkk.daemon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author Mikk Tarvas
 * Date: 05.03.2020
 */
@SpringBootApplication
public class DaemonRunner {

  public static void main(String[] args) {
    SpringApplication.run(DaemonRunner.class, args);
  }

}
