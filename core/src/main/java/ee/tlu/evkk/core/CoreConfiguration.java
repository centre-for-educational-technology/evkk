package ee.tlu.evkk.core;

import ee.tlu.evkk.common.env.ServiceLocatorFactoryBean;
import ee.tlu.evkk.dal.DalConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.*;

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

}
