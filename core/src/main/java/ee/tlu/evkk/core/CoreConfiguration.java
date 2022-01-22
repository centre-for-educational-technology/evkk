package ee.tlu.evkk.core;

import ee.tlu.evkk.common.env.ServiceLocator;
import ee.tlu.evkk.common.env.ServiceLocatorFactoryBean;
import ee.tlu.evkk.core.integration.StanzaServerClient;
import ee.tlu.evkk.dal.DalConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

import static ee.tlu.evkk.common.env.ServiceLocator.ServiceName.STANZA_SERVER;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
@Configuration
@ComponentScan
@Import(DalConfiguration.class)
@EnableConfigurationProperties(CoreProperties.class)
@PropertySource("classpath:core.properties")
public class CoreConfiguration {

  @Bean
  public ServiceLocatorFactoryBean serviceLocatorFactoryBean(CoreProperties coreProperties) {
    return new ServiceLocatorFactoryBean(coreProperties.getServiceProfile());
  }

  @Bean
  public StanzaServerClient stanzaClient(ServiceLocator serviceLocator, RestTemplateBuilder restTemplateBuilder) {
    URI stanzaServerUri = serviceLocator.locate(STANZA_SERVER);
    RestTemplate rest = restTemplateBuilder.rootUri(stanzaServerUri.toString()).build();
    return new StanzaServerClient(rest);
  }

}
