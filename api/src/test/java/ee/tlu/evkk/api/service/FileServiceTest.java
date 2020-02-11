package ee.tlu.evkk.api.service;

import ee.tlu.evkk.api.dao.dto.FileType;
import ee.tlu.evkk.api.exception.FileNotFoundException;
import ee.tlu.evkk.api.service.dto.GetFileResult;
import ee.tlu.evkk.api.test.AbstractApiTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
@Transactional
class FileServiceTest extends AbstractApiTest {

  @Autowired
  private FileService fileService;

  @Test
  void insert() {
    byte[] data = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    InputStreamSource iss = new ByteArrayResource(data);
    UUID fileId = fileService.insert(iss, FileType.TEMPORARY, "application/octet-stream", null);
    assertNotNull(fileId);
  }

  @Test
  void delete() {
    byte[] data = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    InputStreamSource iss = new ByteArrayResource(data);
    UUID fileId = fileService.insert(iss, FileType.TEMPORARY, "application/octet-stream", null);
    fileService.delete(fileId);
  }

  @Test
  void get() throws FileNotFoundException, IOException {
    byte[] data = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    InputStreamSource iss = new ByteArrayResource(data);
    UUID fileId = fileService.insert(iss, FileType.TEMPORARY, "application/octet-stream", null);
    GetFileResult result = fileService.get(fileId, FileType.TEMPORARY);
    byte[] found = result.getContent().readAllBytes();
    assertArrayEquals(data, found);
  }

}
