package ee.tlu.evkk.api.exception;

import ee.tlu.evkk.api.exception.AbstractBusinessException;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
public class FileNotFoundException extends AbstractBusinessException {

  @Override
  public String getCode() {
    return "FileNotFound";
  }

}
