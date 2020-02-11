package ee.evkk.db.flyway;

import org.flywaydb.core.Flyway;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

/**
 * @author Mikk Tarvas
 * Date: 01/10/2019
 */
public class SeedingFlywayMigrationStrategy implements FlywayMigrationStrategy {

  private static final Logger log = LoggerFactory.getLogger(SeedingFlywayMigrationStrategy.class);
  private static final Map<String, Consumer<Flyway>> COMMAND_MAP = new HashMap<>() {{
    put("migrate", Flyway::migrate);
    put("clean", Flyway::clean);
    put("info", Flyway::info);
    put("validate", Flyway::validate);
    put("baseline", Flyway::baseline);
    put("undo", Flyway::baseline);
    put("repair", Flyway::repair);
  }};

  private final List<String> commands;
  private final FlywayDatabaseSeeder flywayDatabaseSeeder;
  private final boolean seedDisabled;

  public SeedingFlywayMigrationStrategy(List<String> commands, FlywayDatabaseSeeder flywayDatabaseSeeder, boolean seedDisabled) {
    this.commands = commands;
    this.flywayDatabaseSeeder = flywayDatabaseSeeder;
    this.seedDisabled = seedDisabled;
  }

  @Override
  public void migrate(Flyway flyway) {
    List<String> commands = this.commands;
    boolean hasCommands = !(commands == null || commands.isEmpty());
    if (!hasCommands) throw new IllegalStateException("No commands provided for flyway");
    else for (String commandName : commands) executeCommandByName(commandName, flyway);
  }

  protected void executeCommandByName(String commandName, Flyway flyway) {
    Consumer<Flyway> command = findCommandByName(commandName);
    log.info("Executing command: {}", commandName);
    command.accept(flyway);
  }

  private Consumer<Flyway> findCommandByName(String commandName) {
    if (isSeedCommand(commandName)) {
      return flywayDatabaseSeeder::seed;
    } else {
      if (!COMMAND_MAP.containsKey(commandName)) throw new IllegalArgumentException("Unknown command: " + commandName);
      return COMMAND_MAP.get(commandName);
    }
  }

  private boolean isSeedCommand(String commandName) {
    boolean isSeedCommand = "seed".equals(commandName);
    if (isSeedCommand && seedDisabled) throw new IllegalStateException("Command: " + commandName + " not enabled");
    return isSeedCommand;
  }

}
