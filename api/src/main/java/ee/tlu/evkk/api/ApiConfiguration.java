package ee.tlu.evkk.api;

import ee.tlu.evkk.api.ApiProperties.LibpathsProperties;
import ee.tlu.evkk.api.integration.MasinoppeEnnustusClient;
import ee.tlu.evkk.api.integration.MinitornPikkusClient;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.nio.file.Paths;

/**
 * @author Mikk Tarvas
 * Date: 09.02.2020
 */
@Configuration
@PropertySource("classpath:/api.properties")
@EnableConfigurationProperties(ApiProperties.class)
public class ApiConfiguration {

  private final ApiProperties apiProperties;

  public ApiConfiguration(ApiProperties apiProperties) {
    this.apiProperties = apiProperties;
  }

  @Bean
  public MasinoppeEnnustusClient masinoppeEnnustusClient() {
    LibpathsProperties libpaths = apiProperties.getLibpaths();
    return new MasinoppeEnnustusClient(Paths.get(libpaths.getMasinoppeEnnustus()));
  }

  @Bean
  public MinitornPikkusClient minitornPikkusClient(RestTemplateBuilder restTemplateBuilder) {
    return new MinitornPikkusClient(restTemplateBuilder.build());
  }

}
