package ee.tlu.evkk.api.pg;

import org.apache.commons.io.IOUtils;
import org.postgresql.jdbc.PgConnection;
import org.postgresql.largeobject.LargeObject;
import org.postgresql.largeobject.LargeObjectManager;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.SQLException;

import static org.postgresql.largeobject.LargeObjectManager.READ;
import static org.postgresql.largeobject.LargeObjectManager.WRITE;
import static org.springframework.jdbc.datasource.DataSourceUtils.getConnection;
import static org.springframework.jdbc.datasource.DataSourceUtils.releaseConnection;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-13
 */
@Component
public class PostgresSupport {

  private final DataSource dataSource;

  public PostgresSupport(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  private PgConnection unwrapConnection(Connection connection) throws SQLException {
    return connection.unwrap(PgConnection.class);
  }

  private LargeObjectManager getLargeObjectManager(Connection connection) throws SQLException {
    PgConnection pgConnection = unwrapConnection(connection);
    return pgConnection.getLargeObjectAPI();
  }

  public long writeLOB(InputStream is) throws SQLException, IOException {
    Connection connection = getConnection(dataSource);
    try {
      LargeObjectManager lom = getLargeObjectManager(connection);
      long oid = lom.createLO(WRITE);
      LargeObject lo = lom.open(oid, WRITE);
      try (OutputStream os = lo.getOutputStream()) {
        IOUtils.copy(is, os, 1024 * 1024);
      }
      return oid;
    } finally {
      releaseConnection(connection, dataSource);
    }
  }

  public InputStream readLOB(long oid) throws SQLException {
    Connection connection = getConnection(dataSource);
    try {
      LargeObjectManager lom = getLargeObjectManager(connection);
      LargeObject lo = lom.open(oid, READ);
      return new BufferedInputStream(lo.getInputStream(), 1024 * 1024);
    } finally {
      releaseConnection(connection, dataSource);
    }
  }

  public void deleteLOB(long oid) throws SQLException {
    Connection connection = getConnection(dataSource);
    try {
      LargeObjectManager lom = getLargeObjectManager(connection);
      lom.delete(oid);
    } finally {
      releaseConnection(connection, dataSource);
    }
  }

}
