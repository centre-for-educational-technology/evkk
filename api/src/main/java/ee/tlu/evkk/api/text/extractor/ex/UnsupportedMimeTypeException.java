package ee.tlu.evkk.api.text.extractor.ex;

import ee.tlu.evkk.api.exception.AbstractBusinessException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.util.MimeType;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
@Getter
@RequiredArgsConstructor
public class UnsupportedMimeTypeException extends AbstractBusinessException {

  private final MimeType mimeType;

  @Override
  public String getCode() {
    return "UnsupportedMimeType";
  }
}
