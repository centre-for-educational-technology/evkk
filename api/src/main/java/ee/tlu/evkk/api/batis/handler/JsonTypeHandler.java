package ee.tlu.evkk.api.batis.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import ee.tlu.evkk.api.dao.dto.Json;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;
import org.postgresql.util.PGobject;

import java.io.IOException;
import java.sql.*;

/**
 * @author Mikk Tarvas
 * Date: 29/10/2019
 */
public class JsonTypeHandler implements TypeHandler<Json> {

  @Override
  public void setParameter(PreparedStatement ps, int i, Json parameter, JdbcType jdbcType) throws SQLException {
    if (parameter == null) {
      ps.setNull(i, Types.OTHER, "jsonb");
      return;
    }

    String asString;
    try {
      asString = parameter.getAsString();
    } catch (JsonProcessingException ex) {
      throw new SQLException("Unable to write JSONB", ex);
    }

    PGobject pgObject = new PGobject();
    pgObject.setType("jsonb");
    pgObject.setValue(asString);
    ps.setObject(i, pgObject, Types.OTHER);
  }

  @Override
  public Json getResult(ResultSet rs, String columnName) throws SQLException {
    Object object = rs.getObject(columnName);
    if (rs.wasNull() || object == null) return null;
    return toJson(object);
  }

  @Override
  public Json getResult(ResultSet rs, int columnIndex) throws SQLException {
    Object object = rs.getObject(columnIndex);
    if (rs.wasNull() || object == null) return null;
    return toJson(object);
  }

  @Override
  public Json getResult(CallableStatement cs, int columnIndex) throws SQLException {
    Object object = cs.getObject(columnIndex);
    if (cs.wasNull() || object == null) return null;
    return toJson(object);
  }

  private Json toJson(Object object) throws SQLException {
    PGobject pgObject = (PGobject) object;
    String value = pgObject.getValue();
    if (value == null || value.isBlank()) return null;
    try {
      return Json.createFromString(value);
    } catch (IOException ex) {
      throw new SQLException("Unable to read JSONB", ex);
    }
  }

}
