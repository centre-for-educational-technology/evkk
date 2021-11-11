package ee.tlu.evkk.clusterfinder.service;

import ee.tlu.evkk.clusterfinder.service.mapping.ClusterResultMapper;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 * @author Mikk Tarvas
 * Date: 12.11.2021
 */
@Component
public class ClusterServiceFactoryBean implements FactoryBean<ClusterService> {

  private final ClusterResultMapper clusterResultMapper;
  private final RestTemplateBuilder restTemplateBuilder;

  @Autowired
  public ClusterServiceFactoryBean(ClusterResultMapper clusterResultMapper, RestTemplateBuilder restTemplateBuilder) {
    this.clusterResultMapper = clusterResultMapper;
    this.restTemplateBuilder = restTemplateBuilder;
  }

  @Override
  public ClusterService getObject() {
    RestTemplate restTemplate = restTemplateBuilder.rootUri("http://localhost:5100").build();
    return new ClusterServiceImpl(clusterResultMapper, restTemplate);
  }

  @Override
  public Class<?> getObjectType() {
    return ClusterService.class;
  }

}
