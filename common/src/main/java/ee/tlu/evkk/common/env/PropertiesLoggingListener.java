package ee.tlu.evkk.common.env;

import org.springframework.boot.context.event.ApplicationPreparedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.EnumerablePropertySource;
import org.springframework.lang.NonNull;

import java.util.Arrays;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Collectors;

/**
 * @author Mikk Tarvas
 * Date: 25.08.2021
 */
public class PropertiesLoggingListener implements ApplicationListener<ApplicationPreparedEvent> {

  @Override
  public void onApplicationEvent(@NonNull ApplicationPreparedEvent event) {
    ConfigurableEnvironment environment = event.getApplicationContext().getEnvironment();
    log(environment);
  }

  private void log(ConfigurableEnvironment environment) {
    System.out.println("##### PROPERTIES #####");
    for (String propertyName : getPropertyNames(environment)) {
      String propertyValue = environment.getProperty(propertyName); //TODO: may fail
      System.out.println(propertyName + "=" + propertyValue);
    }
  }

  private SortedSet<String> getPropertyNames(ConfigurableEnvironment environment) {
    return environment.getPropertySources().stream()
      .filter(EnumerablePropertySource.class::isInstance).map(EnumerablePropertySource.class::cast)
      .map(EnumerablePropertySource::getPropertyNames).flatMap(Arrays::stream)
      .collect(Collectors.collectingAndThen(Collectors.toSet(), TreeSet::new));
  }

}