package ee.tlu.evkk.charcounter.client;

import org.springframework.beans.factory.FactoryBean;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 * @author Mikk Tarvas
 * Date: 18.02.2020
 */
@Component
public class EvkkClientFactoryBean implements FactoryBean<EvkkClient> {

  private final RestTemplateBuilder restTemplateBuilder;

  public EvkkClientFactoryBean(RestTemplateBuilder restTemplateBuilder) {
    this.restTemplateBuilder = restTemplateBuilder;
  }

  @Override
  public EvkkClient getObject() {
    RestTemplate restTemplate = restTemplateBuilder.rootUri("http://localhost:8080").build();
    return new EvkkClient(restTemplate);
  }

  @Override
  public Class<?> getObjectType() {
    return EvkkClient.class;
  }

}
