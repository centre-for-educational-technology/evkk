package ee.tlu.evkk.dal.handler;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;
import org.postgresql.util.PGobject;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
public class UUIDHandler implements TypeHandler<UUID> {

    private static final String PG_OBJECT_TYPE = "uuid";

    @Override
    public void setParameter(PreparedStatement ps, int i, UUID parameter, JdbcType jdbcType) throws SQLException {
        if (parameter == null) {
            ps.setNull(i, jdbcType.TYPE_CODE);
        } else {
            PGobject object = new PGobject();
            object.setType(PG_OBJECT_TYPE);
            object.setValue(parameter.toString());
            ps.setObject(i, object);
        }
    }

    @Override
    public UUID getResult(ResultSet rs, String columnName) throws SQLException {
        String string = rs.getString(columnName);
        if (string == null || rs.wasNull()) {
            return null;
        }
        return getResultValue(string);
    }

    @Override
    public UUID getResult(ResultSet rs, int columnIndex) throws SQLException {
        String string = rs.getString(columnIndex);
        if (string == null || rs.wasNull()) {
            return null;
        }
        return getResultValue(string);
    }

    @Override
    public UUID getResult(CallableStatement cs, int columnIndex) throws SQLException {
        String string = cs.getString(columnIndex);
        if (string == null || cs.wasNull()) {
            return null;
        }
        return getResultValue(string);
    }

    private UUID getResultValue(String string) {
        return UUID.fromString(string);
    }

}