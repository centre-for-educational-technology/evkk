package ee.tlu.evkk.api.exception;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
public class UnsupportedFileFormatException extends AbstractBusinessException {

  @Override
  public String getCode() {
    return "UnsupportedFileFormat";
  }

}
