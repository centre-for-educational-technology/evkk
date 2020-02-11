package ee.tlu.evkk.api.batis.handler;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.postgresql.util.PGInterval;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Duration;

/**
 * @author Mikk Tarvas
 * Date: 16.01.2020
 */
public class DurationTypeHandler extends BaseTypeHandler<Duration> {

  @Override
  public void setNonNullParameter(PreparedStatement ps, int i, Duration parameter, JdbcType jdbcType) throws SQLException {
    PGInterval interval = new PGInterval();
    interval.setSeconds(parameter.toSeconds());
    ps.setObject(i, interval);
  }

  @Override
  public Duration getNullableResult(ResultSet rs, String columnName) throws SQLException {
    throw new UnsupportedOperationException("Implement if needed");
  }

  @Override
  public Duration getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
    throw new UnsupportedOperationException("Implement if needed");
  }

  @Override
  public Duration getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
    throw new UnsupportedOperationException("Implement if needed");
  }

}
