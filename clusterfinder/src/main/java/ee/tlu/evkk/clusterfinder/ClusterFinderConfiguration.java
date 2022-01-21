package ee.tlu.evkk.clusterfinder;

import ee.tlu.evkk.common.env.ServiceLocatorFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
@Configuration
public class ClusterFinderConfiguration {

  @Bean
  public ServiceLocatorFactoryBean serviceDiscoveryFactoryBean() {
    return new ServiceLocatorFactoryBean("local"); //TODO: detect profile
  }

}
