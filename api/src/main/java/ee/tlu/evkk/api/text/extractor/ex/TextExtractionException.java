package ee.tlu.evkk.api.text.extractor.ex;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
public class TextExtractionException extends Exception {

  public TextExtractionException(Throwable cause) {
    super(cause);
  }

  public TextExtractionException(String message) {
    super(message);
  }

  public TextExtractionException(String message, Throwable cause) {
    super(message, cause);
  }

}
