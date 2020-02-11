package ee.tlu.evkk.api.batis.handler;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;
import org.postgresql.util.PGobject;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Mikk Tarvas
 * Date: 2019-01-14
 */
abstract class AbstractUUIDTypeHandler<T> implements TypeHandler<T> {

  private static final String PG_OBJECT_TYPE = "uuid";

  abstract T getResultValue(String string);

  abstract String getStringValue(T parameter);

  @Override
  public void setParameter(PreparedStatement ps, int i, T parameter, JdbcType jdbcType) throws SQLException {
    if (parameter == null) {
      ps.setNull(i, jdbcType.TYPE_CODE);
    } else {
      PGobject object = new PGobject();
      object.setType(PG_OBJECT_TYPE);
      object.setValue(getStringValue(parameter));
      ps.setObject(i, object);
    }
  }

  @Override
  public T getResult(ResultSet rs, String columnName) throws SQLException {
    String string = rs.getString(columnName);
    if (string == null || rs.wasNull()) {
      return null;
    }
    return getResultValue(string);
  }

  @Override
  public T getResult(ResultSet rs, int columnIndex) throws SQLException {
    String string = rs.getString(columnIndex);
    if (string == null || rs.wasNull()) {
      return null;
    }
    return getResultValue(string);
  }

  @Override
  public T getResult(CallableStatement cs, int columnIndex) throws SQLException {
    String string = cs.getString(columnIndex);
    if (string == null || cs.wasNull()) {
      return null;
    }
    return getResultValue(string);
  }

}
