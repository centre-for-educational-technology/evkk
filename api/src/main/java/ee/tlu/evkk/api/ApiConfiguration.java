package ee.tlu.evkk.api;

import ee.tlu.evkk.api.integration.MasinoppeEnnustusClient;
import ee.tlu.evkk.api.integration.MinitornPikkusClient;
import ee.tlu.evkk.api.integration.StanzaClient;
import ee.tlu.evkk.api.jdbc.SqlObjectFactory;
import ee.tlu.evkk.api.util.UriComponentsBuilderFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.client.RestTemplate;

import javax.sql.DataSource;
import java.nio.file.Paths;

/**
 * @author Mikk Tarvas
 * Date: 09.02.2020
 */
@Configuration
@PropertySource("classpath:/api.properties")
@EnableConfigurationProperties(ApiProperties.class)
public class ApiConfiguration {

  @Value("${evkk.api.lib.paths.masinoppe-ennustus}")
  private String masinoppeEnnustusPath;

  private final ApiProperties apiProperties;

  private final UriComponentsBuilderFactory uriComponentsBuilderFactory;

  public ApiConfiguration(ApiProperties apiProperties, UriComponentsBuilderFactory uriComponentsBuilderFactory) {
    this.apiProperties = apiProperties;
    this.uriComponentsBuilderFactory = uriComponentsBuilderFactory;
  }

  @Bean
  public MasinoppeEnnustusClient masinoppeEnnustusClient() {
    return new MasinoppeEnnustusClient(Paths.get(masinoppeEnnustusPath));
  }

  @Bean
  public MinitornPikkusClient minitornPikkusClient(RestTemplateBuilder restTemplateBuilder) {
    return new MinitornPikkusClient(restTemplateBuilder.build());
  }

  @Bean
  public StanzaClient stanzaClient(RestTemplateBuilder restTemplateBuilder) {
    String stanzaUri = uriComponentsBuilderFactory.stanza().toUriString();
    RestTemplate rest = restTemplateBuilder.rootUri(stanzaUri).build();
    return new StanzaClient(rest);
  }

  @Bean
  public SqlObjectFactory sqlObjectFactory(DataSource dataSource) {
    return new SqlObjectFactory(dataSource);
  }

}
