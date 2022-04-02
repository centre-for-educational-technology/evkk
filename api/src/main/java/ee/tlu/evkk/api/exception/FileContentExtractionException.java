package ee.tlu.evkk.api.exception;

/**
 * @author Mikk Tarvas
 * Date: 05.06.2020
 */
public class FileContentExtractionException extends AbstractBusinessException {

  @Override
  public String getCode() {
    return "FileContentExtractionException";
  }

}
