package ee.tlu.evkk.dal.util;

import ee.tlu.evkk.dal.AbstractDalTest;
import org.junit.Test;
import org.postgresql.jdbc.PgConnection;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
public class PostgresUtilsTest extends AbstractDalTest {

    @Autowired
    private DataSource dataSource;

    @Test
    public void unwrapConnection_GivenPostgresConnection_ShouldReturnPostgresDriverConnection() throws SQLException {
        Connection connection = dataSource.getConnection();
        PgConnection pgConnection = PostgresUtils.unwrapConnection(connection);
        assertNotNull(pgConnection);
    }

}