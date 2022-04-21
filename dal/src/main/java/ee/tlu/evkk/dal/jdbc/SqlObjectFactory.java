package ee.tlu.evkk.dal.jdbc;

import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.jdbc.datasource.ConnectionHandle;

import javax.annotation.Nonnull;
import javax.sql.DataSource;
import java.sql.Array;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Objects;
import java.util.stream.StreamSupport;

/**
 * @author Mikk Tarvas
 * Date: 15.06.2021
 */
public final class SqlObjectFactory extends ConnectionHandleAdapter {

  public SqlObjectFactory(ConnectionHandle connectionHandle) {
    super(connectionHandle);
  }

  public SqlObjectFactory(Connection connection) {
    super(connection);
  }

  public SqlObjectFactory(DataSource dataSource) {
    super(dataSource);
  }

  /**
   * Create new SQL Array.
   *
   * @param typeName SQL type name
   * @param elements elements to use
   * @param <T>      element type
   * @return new {@link SqlArray}
   * @see Connection#createArrayOf(String, Object[])
   * @see SqlArray
   * @see Array
   */
  @Nonnull
  public <T> SqlArray<T> createSqlArray(@Nonnull String typeName, @Nonnull Iterable<T> elements) {
    Objects.requireNonNull(typeName, "typeName must not be null");
    Objects.requireNonNull(elements, "elements must not be null");

    @SuppressWarnings("unchecked") T[] elementArray = (T[]) StreamSupport.stream(elements.spliterator(), false).toArray(Object[]::new);
    Connection connection = getConnection();
    Array sqlArray;
    try {
      sqlArray = connection.createArrayOf(typeName, elementArray);
    } catch (SQLException ex) {
      throw new UncategorizedSQLException("Unable to create SQL array", null, ex);
    } finally {
      releaseConnection(connection);
    }
    return new SqlArray<>(sqlArray, elementArray);
  }

}
