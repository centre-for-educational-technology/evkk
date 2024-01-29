package ee.tlu.evkk.common.jdbc;

import ch.qos.logback.classic.Level;
import lombok.extern.slf4j.Slf4j;
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

import static ch.qos.logback.classic.Level.OFF;
import static java.util.Map.of;

/**
 * @author Mikk Tarvas
 * Date: 18.09.2021
 */
@Component
@Slf4j
public class ConnectionPoller {

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
    logger.setLevel(OFF);
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
    return DataSourceUtils.getConnection(this.dataSource);
  }

  private void releaseConnection(Connection connection) {
    DataSourceUtils.releaseConnection(connection, dataSource);
  }

  private RetryOperations createRetry() {
    RetryTemplate retryTemplate = new RetryTemplate();

    SimpleRetryPolicy retryPolicy = new SimpleRetryPolicy(10, of(CannotGetJdbcConnectionException.class, true));
    retryTemplate.setRetryPolicy(retryPolicy);

    FixedBackOffPolicy backOffPolicy = new FixedBackOffPolicy();
    backOffPolicy.setBackOffPeriod(3000L);
    retryTemplate.setBackOffPolicy(backOffPolicy);

    return retryTemplate;
  }

}
