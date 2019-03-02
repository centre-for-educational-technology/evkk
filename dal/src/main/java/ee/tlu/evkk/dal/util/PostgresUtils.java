package ee.tlu.evkk.dal.util;

import org.apache.commons.io.IOUtils;
import org.postgresql.jdbc.PgConnection;
import org.postgresql.largeobject.LargeObject;
import org.postgresql.largeobject.LargeObjectManager;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-13
 */
public class PostgresUtils {

    public static PgConnection unwrapConnection(Connection connection) throws SQLException {
        return connection.unwrap(PgConnection.class);
    }

    public static LargeObjectManager getLargeObjectManager(Connection connection) throws SQLException {
        PgConnection pgConnection = unwrapConnection(connection);
        return pgConnection.getLargeObjectAPI();
    }

    public static long createLargeObject(Connection connection, InputStream is) throws SQLException, IOException {
        LargeObjectManager lom = getLargeObjectManager(connection);
        long oid = lom.createLO(LargeObjectManager.WRITE);
        LargeObject lo = lom.open(oid, LargeObjectManager.WRITE);
        try (OutputStream os = lo.getOutputStream()) {
            IOUtils.copy(is, os);
        }
        return oid;
    }

    public static InputStream readLargeObject(Connection connection, long oid) throws SQLException {
        LargeObjectManager lom = getLargeObjectManager(connection);
        LargeObject lo = lom.open(oid, LargeObjectManager.READ);
        return lo.getInputStream();
    }

}