package ee.tlu.evkk.api.service.dto;

import ee.tlu.evkk.api.dao.dto.UserFileView;

import java.io.IOException;
import java.io.InputStream;

/**
 * @author Mikk Tarvas
 * Date: 20.02.2020
 */
public interface GetUserFileResult {

  UserFileView getUserFile();

  InputStream getContent() throws IOException;

}
