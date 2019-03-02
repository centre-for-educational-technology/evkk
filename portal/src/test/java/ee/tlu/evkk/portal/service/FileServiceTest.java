package ee.tlu.evkk.portal.service;

import ee.tlu.evkk.portal.AbstractPortalTest;
import org.apache.commons.io.IOUtils;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
public class FileServiceTest extends AbstractPortalTest {

    @Autowired
    private FileService fileService;

    @Test
    @Rollback
    @Transactional
    public void createFile_GivenInputStream_ShouldBeAbleToCreateFile() throws IOException, SQLException {
        byte[] bytes = new byte[10];
        ThreadLocalRandom.current().nextBytes(bytes);
        ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
        UUID fileId = fileService.createFile(bais, "test", null);
        assertNotNull(fileId);

        InputStream inputStream = fileService.getFileContents(fileId);
        byte[] read = IOUtils.toByteArray(inputStream);
        assertArrayEquals(bytes, read);
    }
}