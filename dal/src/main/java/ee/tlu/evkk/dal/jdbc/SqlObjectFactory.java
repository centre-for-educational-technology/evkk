package ee.tlu.evkk.dal.jdbc;

import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.jdbc.datasource.ConnectionHandle;

import javax.annotation.Nonnull;
import javax.sql.DataSource;
import java.sql.Array;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Objects;

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
   * Create holder object for SQL {@link Array}.
   *
   * @param typeName sql type name
   * @param elements elements to use
   * @return new {@link ArrayHolder}
   * @see Connection#createArrayOf(String, Object[])
   * @see ArrayHolder
   */
  @Nonnull
  public ArrayHolder createArray(@Nonnull String typeName, @Nonnull Object[] elements) {
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
