package ee.tlu.evkk.clusterfinder.client;

import org.springframework.beans.factory.FactoryBean;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class EvkkClientFactoryBean implements FactoryBean<EvkkClient> {

  private final RestTemplateBuilder restTemplateBuilder;

  public EvkkClientFactoryBean(RestTemplateBuilder restTemplateBuilder) {
    this.restTemplateBuilder = restTemplateBuilder;
  }

  @Override
  public EvkkClient getObject() {
    RestTemplate restTemplate = restTemplateBuilder.rootUri("http://localhost:9090").build();
    return new EvkkClient(restTemplate);
  }

  @Override
  public Class<?> getObjectType() {
    return EvkkClient.class;
  }

}
