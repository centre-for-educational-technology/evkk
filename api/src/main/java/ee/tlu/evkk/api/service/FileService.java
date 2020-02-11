package ee.tlu.evkk.api.service;

import ee.tlu.evkk.api.dao.FileDao;
import ee.tlu.evkk.api.dao.dto.File;
import ee.tlu.evkk.api.dao.dto.FileType;
import ee.tlu.evkk.api.dao.dto.Json;
import ee.tlu.evkk.api.exception.FileNotFoundException;
import ee.tlu.evkk.api.pg.PostgresSupport;
import ee.tlu.evkk.api.service.dto.GetFileResult;
import ee.tlu.evkk.api.util.DaoUtils;
import org.springframework.core.io.InputStreamSource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
@Service
public class FileService {

  private final FileDao fileDao;
  private final PostgresSupport postgresSupport;

  public FileService(FileDao fileDao, PostgresSupport postgresSupport) {
    this.fileDao = fileDao;
    this.postgresSupport = postgresSupport;
  }

  public UUID insert(InputStreamSource inputStreamSource, FileType fileType, String mediaType, Map<String, String> metadata) {
    Objects.requireNonNull(inputStreamSource);
    Objects.requireNonNull(fileType);
    Objects.requireNonNull(mediaType);
    if (metadata == null) metadata = new HashMap<>();

    long oid;
    try (InputStream is = inputStreamSource.getInputStream()) {
      oid = postgresSupport.writeLOB(is);
    } catch (SQLException | IOException ex) {
      throw new RuntimeException("Unable to write LOB", ex);
    }

    File file = new File();
    file.setOid(oid);
    file.setFileType(fileType);
    file.setMediaType(mediaType);
    file.setMetadata(Json.createFromObject(metadata));
    return fileDao.insert(file);
  }

  public void delete(UUID fileId) {
    Objects.requireNonNull(fileId);

    int affectedRowCount = fileDao.delete(fileId);
    DaoUtils.ensureAtMostOneAffectedRow(affectedRowCount);
  }

  public GetFileResult get(UUID fileId, FileType fileType) throws FileNotFoundException {
    Objects.requireNonNull(fileId);
    Objects.requireNonNull(fileType);

    File file = fileDao.findById(fileId);
    if (file == null || file.getFileType() != fileType) throw new FileNotFoundException();

    return new GetFileResult() {

      @Override
      public File getFile() {
        return file;
      }

      @Override
      public InputStream getContent() throws IOException {
        try {
          return postgresSupport.readLOB(file.getOid());
        } catch (SQLException ex) {
          throw new IOException("Unable to read LOB", ex);
        }
      }

    };
  }

}
