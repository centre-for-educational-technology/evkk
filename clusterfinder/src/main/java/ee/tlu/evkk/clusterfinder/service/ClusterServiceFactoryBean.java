package ee.tlu.evkk.clusterfinder.service;

import ee.tlu.evkk.clusterfinder.service.mapping.ClusterResultMapper;
import ee.tlu.evkk.common.env.ServiceLocator;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import static ee.tlu.evkk.common.env.ServiceLocator.ServiceName.KLASTERDAJA;

/**
 * @author Mikk Tarvas
 * Date: 12.11.2021
 */
@Component
public class ClusterServiceFactoryBean implements FactoryBean<ClusterService> {

  private final ClusterResultMapper clusterResultMapper;
  private final RestTemplateBuilder restTemplateBuilder;
  private final ServiceLocator serviceLocator;

  @Autowired
  public ClusterServiceFactoryBean(ClusterResultMapper clusterResultMapper, RestTemplateBuilder restTemplateBuilder, ServiceLocator serviceLocator) {
    this.clusterResultMapper = clusterResultMapper;
    this.restTemplateBuilder = restTemplateBuilder;
    this.serviceLocator = serviceLocator;
  }

  @Override
  public ClusterService getObject() {
    String klasterdajaUri = serviceLocator.locate(KLASTERDAJA).toString();
    RestTemplate restTemplate = restTemplateBuilder.rootUri(klasterdajaUri).build();
    return new ClusterServiceImpl(clusterResultMapper, restTemplate);
  }

  @Override
  public Class<?> getObjectType() {
    return ClusterService.class;
  }

}
