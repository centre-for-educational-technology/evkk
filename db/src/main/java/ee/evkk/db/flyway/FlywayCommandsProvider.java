package ee.evkk.db.flyway;

import org.springframework.boot.ApplicationArguments;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author Mikk Tarvas
 * Date: 15.09.2021
 */
@Component
public class FlywayCommandsProvider {

  private final ApplicationArguments applicationArguments;
  private final FlywayMigrationStrategyProperties properties;

  public FlywayCommandsProvider(ApplicationArguments applicationArguments, FlywayMigrationStrategyProperties properties) {
    this.applicationArguments = applicationArguments;
    this.properties = properties;
  }

  public List<String> getCommands() {
    List<String> args = applicationArguments.getNonOptionArgs();
    if (!isNullOrEmpty(args)) return args;
    return properties.getCommands();
  }

  private static boolean isNullOrEmpty(List<?> list) {
    return list == null || list.isEmpty();
  }

}
