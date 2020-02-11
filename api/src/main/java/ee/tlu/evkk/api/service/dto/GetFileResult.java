package ee.tlu.evkk.api.service.dto;

import ee.tlu.evkk.api.dao.dto.File;

import java.io.IOException;
import java.io.InputStream;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
public interface GetFileResult {

  File getFile();

  InputStream getContent() throws IOException;

}
