package ee.evkk.db.flyway;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/**
 * @author Mikk Tarvas
 * Date: 01/10/2019
 */
@ConfigurationProperties(prefix = "flyway")
public class FlywayMigrationStrategyProperties {

  private Boolean seedDisabled = false;
  private List<String> seedLocations;
  private List<String> commands;

  public Boolean getSeedDisabled() {
    return seedDisabled;
  }

  public void setSeedDisabled(Boolean seedDisabled) {
    this.seedDisabled = seedDisabled;
  }

  public List<String> getSeedLocations() {
    return seedLocations;
  }

  public void setSeedLocations(List<String> seedLocations) {
    this.seedLocations = seedLocations;
  }

  public List<String> getCommands() {
    return commands;
  }

  public void setCommands(List<String> commands) {
    this.commands = commands;
  }

}
