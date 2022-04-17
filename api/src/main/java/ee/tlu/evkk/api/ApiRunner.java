package ee.tlu.evkk.api;

import ee.tlu.evkk.dal.dto.Pageable;
import ee.tlu.evkk.dal.dto.Text;
import ee.tlu.evkk.dal.repository.TextRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
  private TextRepository textRepository;

  @Override
  @Transactional
  public void run(String... args) {
    Map<String, List<String>> filters = Map.of("sugu", List.of("mees"), "emakeel", List.of("eesti"));
    Pageable pageable = new Pageable(40, 1);
    List<Text> texts = textRepository.search(filters, pageable).collect(Collectors.toUnmodifiableList());
  }

}
