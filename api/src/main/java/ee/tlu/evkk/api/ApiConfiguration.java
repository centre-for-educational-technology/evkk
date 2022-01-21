package ee.tlu.evkk.api;

import ee.tlu.evkk.api.integration.MasinoppeEnnustusClient;
import ee.tlu.evkk.api.integration.MinitornPikkusClient;
import ee.tlu.evkk.api.integration.StanzaClient;
import ee.tlu.evkk.common.env.ServiceLocator;
import ee.tlu.evkk.core.CoreConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.client.RestTemplate;

import java.nio.file.Paths;

import static ee.tlu.evkk.common.env.ServiceLocator.ServiceName.STANZA_SERVER;

/**
 * @author Mikk Tarvas
 * Date: 09.02.2020
 */
@Configuration
@Import(CoreConfiguration.class)
@PropertySource("classpath:/api.properties")
@EnableConfigurationProperties(ApiProperties.class)
public class ApiConfiguration {

  @Value("${evkk.api.lib.paths.masinoppe-ennustus}")
  private String masinoppeEnnustusPath;
  private final ServiceLocator serviceLocator;

  public ApiConfiguration(ServiceLocator serviceLocator) {
    this.serviceLocator = serviceLocator;
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
    String stanzaUri = serviceLocator.locate(STANZA_SERVER).toString();
    RestTemplate rest = restTemplateBuilder.rootUri(stanzaUri).build();
    return new StanzaClient(rest);
  }

}
