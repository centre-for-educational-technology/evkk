package ee.tlu.evkk.api.text.extractor.impl;

import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import org.springframework.stereotype.Component;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.io.InputStream;

import static org.springframework.util.MimeType.valueOf;

/**
 * @author Mikk Tarvas
 * Date: 05.06.2020
 */
@Component
public class PlainTextContentExtractor extends AbstractContentExtractor {

  public PlainTextContentExtractor() {
    super(valueOf("text/plain"));
  }

  @Nonnull
  @Override
  protected String extractInternal(@Nonnull InputStream is) throws TextExtractionException {
    byte[] bytes;
    try {
      bytes = is.readAllBytes();
    } catch (IOException ex) {
      throw new TextExtractionException("Unable to read stream", ex);
    }
    return new String(bytes);
  }

}
