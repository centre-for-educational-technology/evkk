package ee.evkk.db.flyway;

import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.configuration.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @author Mikk Tarvas
 * Date: 01/10/2019
 */
public class FlywayDatabaseSeeder {

  private static final Logger log = LoggerFactory.getLogger(FlywayDatabaseSeeder.class);

  private final List<Resource> resources;
  private final TransactionTemplate transactionTemplate;

  public FlywayDatabaseSeeder(List<Resource> resources, TransactionTemplate transactionTemplate) {
    this.resources = Collections.unmodifiableList(resources);
    this.transactionTemplate = transactionTemplate;
  }

  public void seed(Flyway flyway) {
    Configuration configuration = flyway.getConfiguration();

    // Transform resources
    FlywayResourceTransformer resourceTransformer = ResourceTransformerFactory.createResourceTransformer(flyway);
    Resource[] transformed = this.resources.stream().map(resourceTransformer).toArray(Resource[]::new);

    // Create populator
    ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
    populator.setScripts(transformed);
    populator.setSqlScriptEncoding(configuration.getEncoding().name());

    // Execute
    log.info("Execute database seed using resources: {}", Arrays.toString(transformed));
    executeInTransaction(() -> DatabasePopulatorUtils.execute(populator, configuration.getDataSource()));
  }

  private void executeInTransaction(Runnable runnable) {
    transactionTemplate.execute(new TransactionCallbackWithoutResult() {
      @Override
      protected void doInTransactionWithoutResult(TransactionStatus status) {
        runnable.run();
      }
    });
  }

}
