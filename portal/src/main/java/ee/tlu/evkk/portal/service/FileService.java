package ee.tlu.evkk.portal.service;

import ee.tlu.evkk.dal.dao.DateTimeDao;
import ee.tlu.evkk.dal.dao.FileDao;
import ee.tlu.evkk.dal.dto.File;
import ee.tlu.evkk.dal.util.PostgresUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-15
 */
@Service
public class FileService {

    @Autowired
    private FileDao fileDao;
    @Autowired
    private DateTimeDao dateTimeDao;
    @Autowired
    private DataSource dataSource;

    public UUID createFile(InputStream contents, String name, String contentType) throws SQLException, IOException {
        Connection connection = DataSourceUtils.getConnection(dataSource);
        long oid = PostgresUtils.createLargeObject(connection, contents);
        File file = new File();
        file.setOid(oid);
        file.setName(name);
        file.setContentType(contentType);
        file.setCreatedAt(dateTimeDao.currentDateTime());
        return fileDao.insert(file);
    }

    public InputStream getFileContents(UUID fileId) throws SQLException {
        File file = fileDao.getById(fileId);
        Connection connection = DataSourceUtils.getConnection(dataSource);
        return PostgresUtils.readLargeObject(connection, file.getOid());
    }

}