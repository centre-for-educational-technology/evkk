package ee.tlu.evkk.api.jdbc;

import org.springframework.jdbc.datasource.ConnectionHandle;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.datasource.SimpleConnectionHandle;
import org.springframework.lang.NonNull;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.Objects;

/**
 * @author Mikk Tarvas
 * Date: 15.06.2021
 */
public abstract class ConnectionHandleHolder implements ConnectionHandle {

  private final ConnectionHandle connectionHandle;

  protected ConnectionHandleHolder(@NonNull ConnectionHandle connectionHandle) {
    this.connectionHandle = Objects.requireNonNull(connectionHandle, "connectionHandle must not be null");
  }

  protected ConnectionHandleHolder(@NonNull Connection connection) {
    this(new SimpleConnectionHandle(Objects.requireNonNull(connection, "connection must not be null")));
  }

  protected ConnectionHandleHolder(@NonNull DataSource dataSource) {
    this(new DataSourceConnectionHandle(Objects.requireNonNull(dataSource, "dataSource must not be null")));
  }

  /**
   * {@inheritDoc}
   */
  @NonNull
  @Override
  public Connection getConnection() {
    return connectionHandle.getConnection();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void releaseConnection(@NonNull Connection connection) {
    Objects.requireNonNull(connection, "connection must not be null");
    connectionHandle.releaseConnection(connection);
  }

  private static final class DataSourceConnectionHandle implements ConnectionHandle {

    private final DataSource dataSource;

    private DataSourceConnectionHandle(DataSource dataSource) {
      this.dataSource = dataSource;
    }

    @NonNull
    @Override
    public Connection getConnection() {
      return DataSourceUtils.getConnection(dataSource);
    }

    @Override
    public void releaseConnection(@NonNull Connection connection) {
      Objects.requireNonNull(connection, "connection must not be null");
      DataSourceUtils.releaseConnection(connection, dataSource);
    }

    @Override
    public String toString() {
      return "DataSourceConnectionHandle: " + dataSource;
    }

  }

}
