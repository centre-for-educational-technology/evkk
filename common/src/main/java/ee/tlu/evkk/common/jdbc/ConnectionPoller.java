package ee.tlu.evkk.common.jdbc;

import ch.qos.logback.classic.Level;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.retry.RetryOperations;
import org.springframework.retry.backoff.FixedBackOffPolicy;
import org.springframework.retry.policy.SimpleRetryPolicy;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.Map;

/**
 * @author Mikk Tarvas
 * Date: 18.09.2021
 */
@Component
public class ConnectionPoller {

  private static final Logger log = LoggerFactory.getLogger(ConnectionPoller.class);

  private final RetryOperations retry;
  private final DataSource dataSource;

  public ConnectionPoller(DataSource dataSource) {
    this.dataSource = dataSource;
    this.retry = createRetry();
  }

  public void poll() {
    retry.execute(context -> tryConnectionAndSilenceLogger());
  }

  private Void tryConnectionAndSilenceLogger() {
    ch.qos.logback.classic.Logger logger = getLogbackLogger();
    if (logger == null) return tryConnection();

    Level level = logger.getLevel();
    logger.setLevel(Level.OFF);
    try {
      return tryConnection();
    } finally {
      logger.setLevel(level);
    }
  }

  private ch.qos.logback.classic.Logger getLogbackLogger() {
    Logger logger = LoggerFactory.getLogger("com.zaxxer.hikari.pool.HikariPool");
    return logger instanceof ch.qos.logback.classic.Logger ? (ch.qos.logback.classic.Logger) logger : null;
  }

  private Void tryConnection() {
    log.info("Waiting for database connection ...");
    try {
      Connection connection = getConnection();
      releaseConnection(connection);
      log.info("Connected to the database");
      return null;
    } catch (Exception ex) {
      log.info("No database connection available, retrying ...");
      throw ex;
    }
  }

  private Connection getConnection() {
    return DataSourceUtils.getConnection(dataSource);
  }

  private void releaseConnection(Connection connection) {
    DataSourceUtils.releaseConnection(connection, dataSource);
  }

  private RetryOperations createRetry() {
    RetryTemplate retry = new RetryTemplate();

    SimpleRetryPolicy retryPolicy = new SimpleRetryPolicy(10, Map.of(CannotGetJdbcConnectionException.class, true));
    retry.setRetryPolicy(retryPolicy);

    FixedBackOffPolicy backOffPolicy = new FixedBackOffPolicy();
    backOffPolicy.setBackOffPeriod(3000L);
    retry.setBackOffPolicy(backOffPolicy);

    return retry;
  }

}
