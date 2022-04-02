package ee.tlu.evkk.api.text.extractor.impl;

import ee.tlu.evkk.api.text.extractor.ContentExtractor;
import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import org.springframework.util.MimeType;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.io.InputStream;
import java.util.Set;

/**
 * @author Mikk Tarvas
 * Date: 04.06.2020
 */
abstract class AbstractContentExtractor implements ContentExtractor {

  private final Set<MimeType> supportedTypes;

  protected AbstractContentExtractor(MimeType... supportedTypes) {
    this.supportedTypes = Set.of(supportedTypes);
  }

  @Nonnull
  @Override
  public final String extract(@Nonnull InputStream is) throws TextExtractionException {
    try {
      return extractInternal(is);
    } catch (TextExtractionException ex) {
      throw ex;
    } catch (Exception ex) {
      throw new TextExtractionException(ex);
    }
  }

  @Override
  public boolean supports(@Nullable MimeType mimeType) {
    if (mimeType == null) return false;
    for (MimeType type : supportedTypes) {
      if (type.includes(mimeType)) return true;
    }
    return false;
  }

  @Nonnull
  protected abstract String extractInternal(@Nonnull InputStream is) throws TextExtractionException;

}
