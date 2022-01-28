package ee.tlu.evkk.core.jdbc;

import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.jdbc.datasource.ConnectionHandle;
import org.springframework.lang.NonNull;

import javax.sql.DataSource;
import java.sql.Array;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Objects;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * @author Mikk Tarvas
 * Date: 15.06.2021
 */
public class SqlObjectFactory extends ConnectionHandleHolder {

  public SqlObjectFactory(ConnectionHandle connectionHandle) {
    super(connectionHandle);
  }

  public SqlObjectFactory(Connection connection) {
    super(connection);
  }

  public SqlObjectFactory(DataSource dataSource) {
    super(dataSource);
  }

  @NonNull
  public ArrayHolder createArray(@NonNull String typeName, @NonNull Iterable<?> elements) {
    Objects.requireNonNull(typeName, "typeName must not be null");
    Objects.requireNonNull(elements, "elements must not be null");
    return createArray(typeName, StreamSupport.stream(elements.spliterator(), false));
  }

  @NonNull
  public ArrayHolder createArray(@NonNull String typeName, @NonNull Stream<?> elements) {
    Objects.requireNonNull(typeName, "typeName must not be null");
    Objects.requireNonNull(elements, "elements must not be null");
    return createArray(typeName, elements.toArray(Object[]::new));
  }

  @NonNull
  public ArrayHolder createArray(@NonNull String typeName, @NonNull Object[] elements) {
    Objects.requireNonNull(typeName, "typeName must not be null");
    Objects.requireNonNull(elements, "elements must not be null");

    Array sqlArray;
    Connection connection = getConnection();
    try {
      sqlArray = connection.createArrayOf(typeName, elements);
    } catch (SQLException ex) {
      throw new UncategorizedSQLException("Unable to create SQL array", null, ex);
    } finally {
      releaseConnection(connection);
    }
    return new ArrayHolder(sqlArray, elements);
  }

}
