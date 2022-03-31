package ee.tlu.evkk.api.text.extractor;

import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import org.springframework.util.MimeType;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.io.InputStream;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
public interface ContentExtractor {

  @Nonnull
  String extract(@Nonnull InputStream is) throws TextExtractionException;

  boolean supports(@Nullable MimeType mimeType);

}
