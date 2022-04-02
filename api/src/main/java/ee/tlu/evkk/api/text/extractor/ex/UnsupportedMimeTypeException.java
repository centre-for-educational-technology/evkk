package ee.tlu.evkk.api.text.extractor.ex;

import org.springframework.util.MimeType;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
public class UnsupportedMimeTypeException extends Exception {

  private final MimeType mimeType;

  public UnsupportedMimeTypeException(MimeType mimeType) {
    this.mimeType = mimeType;
  }

  public MimeType getMimeType() {
    return mimeType;
  }

}
