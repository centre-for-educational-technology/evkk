package ee.tlu.evkk.dal.jdbc;

import org.springframework.jdbc.datasource.ConnectionHandle;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.datasource.SimpleConnectionHandle;

import javax.annotation.Nonnull;
import javax.sql.DataSource;
import java.sql.Connection;
import java.util.Objects;

/**
 * @author Mikk Tarvas
 * Date: 15.06.2021
 */
public class ConnectionHandleAdapter implements ConnectionHandle {

  private final ConnectionHandle connectionHandle;

  public ConnectionHandleAdapter(@Nonnull ConnectionHandle connectionHandle) {
    this.connectionHandle = Objects.requireNonNull(connectionHandle, "connectionHandle must not be null");
  }

  public ConnectionHandleAdapter(@Nonnull Connection connection) {
    this.connectionHandle = new SimpleConnectionHandle(connection);
  }

  public ConnectionHandleAdapter(@Nonnull DataSource dataSource) {
    this.connectionHandle = new DataSourceConnectionHandle(dataSource);
  }

  /**
   * {@inheritDoc}
   */
  @Nonnull
  @Override
  public Connection getConnection() {
    return connectionHandle.getConnection();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void releaseConnection(@Nonnull Connection connection) {
    connectionHandle.releaseConnection(connection);
  }

  private static final class DataSourceConnectionHandle implements ConnectionHandle {

    private final DataSource dataSource;

    private DataSourceConnectionHandle(DataSource dataSource) {
      this.dataSource = Objects.requireNonNull(dataSource, "dataSource must not be null");
    }

    @Nonnull
    @Override
    public Connection getConnection() {
      return DataSourceUtils.getConnection(dataSource);
    }

    @Override
    public void releaseConnection(@Nonnull Connection connection) {
      Objects.requireNonNull(connection, "connection must not be null");
      DataSourceUtils.releaseConnection(connection, dataSource);
    }

    @Override
    public String toString() {
      return "DataSourceConnectionHandle: " + dataSource;
    }

  }

}
