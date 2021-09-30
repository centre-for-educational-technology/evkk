package ee.tlu.evkk.api;

import ee.tlu.evkk.api.integration.StanzaClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author Mikk Tarvas
 * Date: 09.02.2020
 */
@SpringBootApplication
public class ApiRunner implements CommandLineRunner {

  public static void main(String[] args) {
    SpringApplication.run(ApiRunner.class, args);
  }

  @Autowired
  private StanzaClient stanzaClient;

  @Override
  public void run(String... args) {
    //stanzaClient.test();
  }

}
