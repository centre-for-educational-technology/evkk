package ee.evkk.db;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
@SpringBootApplication
public class DbRunner implements CommandLineRunner {

  public static void main(String[] args) {
    SpringApplication.run(DbRunner.class, args);
  }

  @Override
  public void run(String... args) {

  }

}
