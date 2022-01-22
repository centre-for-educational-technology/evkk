package ee.tlu.evkk.api;

import ee.tlu.evkk.core.service.TextProcessorService;
import ee.tlu.evkk.core.text.processor.TextProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.UUID;

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
  private TextProcessorService textProcessorService;

  @Override
  public void run(String... args) {
    textProcessorService.processText(TextProcessor.Type.LEMMATIZER, UUID.fromString("06d08671-7d41-4b7a-a10c-fd81502659b9"));
  }

}
