package ee.evkk.db.flyway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

/**
 * @author Mikk Tarvas
 * Date: 01/10/2019
 */
@Configuration
@EnableConfigurationProperties(FlywayMigrationStrategyProperties.class)
public class FlywayMigrationStrategyConfiguration {

  private static final Logger log = LoggerFactory.getLogger(FlywayMigrationStrategyConfiguration.class);

  private final FlywayMigrationStrategyProperties properties;
  private final ResourcePatternResolver resourcePatternResolver;

  public FlywayMigrationStrategyConfiguration(FlywayMigrationStrategyProperties properties, ResourcePatternResolver resourcePatternResolver) {
    this.properties = properties;
    this.resourcePatternResolver = resourcePatternResolver;
  }

  @Bean
  public FlywayMigrationStrategy flywayMigrationStrategy(ApplicationArguments applicationArguments, FlywayDatabaseSeeder flywayDatabaseSeeder) {
    return new SeedingFlywayMigrationStrategy(applicationArguments.getNonOptionArgs(), flywayDatabaseSeeder, properties.getSeedDisabled());
  }

  @Bean
  public FlywayDatabaseSeeder flywayDatabaseSeeder(PlatformTransactionManager transactionManager) {
    TransactionTemplate transactionTemplate = new TransactionTemplate(transactionManager);
    return new FlywayDatabaseSeeder(getSeeds(), transactionTemplate);
  }

  private List<Resource> getSeeds() {
    ArrayList<Resource> result = new ArrayList<>();
    List<String> seedLocations = properties.getSeedLocations();
    log.debug("Search seeds from: {}", seedLocations);
    for (String seedLocation : seedLocations) {
      try {
        result.addAll(Arrays.asList(resourcePatternResolver.getResources(seedLocation)));
      } catch (IOException ex) {
        log.debug("Unable to read seeds from {}: {}", seedLocation, ex.getMessage());
      }
    }
    result.sort(ResourceFileNameComparator.INSTANCE);
    log.debug("Found seeds: {}", result);
    return result;
  }

  private static final class ResourceFileNameComparator implements Comparator<Resource> {

    private static final ResourceFileNameComparator INSTANCE = new ResourceFileNameComparator();

    @Override
    public int compare(Resource resource1, Resource resource2) {
      String filename1 = getFilename(resource1);
      String filename2 = getFilename(resource2);
      return filename1.compareTo(filename2);
    }

    private String getFilename(Resource resource) {
      String filename = resource.getFilename();
      return filename == null ? "" : filename;
    }

  }

}
