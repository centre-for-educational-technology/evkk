package ee.tlu.evkk.common.env;

import ee.tlu.evkk.common.text.TablePrinter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationPreparedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.EnumerablePropertySource;
import org.springframework.lang.NonNull;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static ee.tlu.evkk.common.text.TablePrinter.Alignment.LEFT;
import static ee.tlu.evkk.common.text.TablePrinter.column;
import static java.lang.String.CASE_INSENSITIVE_ORDER;
import static java.lang.System.lineSeparator;
import static java.util.stream.Collectors.toUnmodifiableList;

/**
 * Prints all known application environment properties for debugging purposes.<br>
 * Please note that only sources with type of {@link EnumerablePropertySource} are included -
 * if property source does not provide property names, then it is impossible to generate property list from it.
 * <p>
 * Must be registered via /resources/META-INF/spring.factories
 *
 * @author Mikk Tarvas
 * Date: 25.08.2021
 */
@Slf4j
public class PropertiesLoggingListener implements ApplicationListener<ApplicationPreparedEvent> {

  private static final String LINE_SEPARATOR = lineSeparator();
  private static final TablePrinter TABLE_PRINTER = new TablePrinter(
    column("PROPERTY NAME", LEFT),
    column("PROPERTY VALUE", LEFT, 80)
  );

  @Override
  public void onApplicationEvent(@NonNull ApplicationPreparedEvent event) {
    if (!log.isInfoEnabled()) return;
    log.info(LINE_SEPARATOR
      + LINE_SEPARATOR
      + "~~~ NOTICE: ~~~" + LINE_SEPARATOR
      + "\t1) This table only contains properties from enumerable property sources. Properties from non-enumerable sources will not show up (for example JndiPropertySource)." + LINE_SEPARATOR
      + "\t2) Line breaks are escaped \\n->\\\\n \\r->\\\\r." + LINE_SEPARATOR
      + LINE_SEPARATOR
      + TABLE_PRINTER.print(getTableRows(event.getApplicationContext().getEnvironment())));
  }

  private List<String[]> getTableRows(ConfigurableEnvironment environment) {
    List<String[]> rows = new ArrayList<>();
    for (String propertyName : getPropertyNames(environment)) {
      String propertyValue;
      try {
        propertyValue = environment.getProperty(propertyName);
      } catch (Exception ex) {
        log.error("Unable to get property value", ex);
        propertyValue = "<< ERROR LOADING PROPERTY VALUE >>";
      }
      rows.add(new String[]{propertyName, propertyValue});
    }
    return rows;
  }

  private List<String> getPropertyNames(ConfigurableEnvironment environment) {
    return environment.getPropertySources().stream()
      .filter(EnumerablePropertySource.class::isInstance).map(EnumerablePropertySource.class::cast)
      .map(EnumerablePropertySource::getPropertyNames).flatMap(Arrays::stream)
      .distinct().sorted(CASE_INSENSITIVE_ORDER)
      .collect(toUnmodifiableList());
  }

}
