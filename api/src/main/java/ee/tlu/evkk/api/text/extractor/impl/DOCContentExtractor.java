package ee.tlu.evkk.api.text.extractor.impl;

import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import org.apache.poi.hwpf.extractor.WordExtractor;
import org.springframework.stereotype.Component;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.io.InputStream;

import static org.springframework.util.MimeType.valueOf;

@Component
public class DOCContentExtractor extends AbstractContentExtractor {

  public DOCContentExtractor() {
    super(valueOf("application/msword"));
  }

  @Nonnull
  @Override
  protected String extractInternal(@Nonnull InputStream is) throws TextExtractionException {
    String text;

    try {
      WordExtractor document = new WordExtractor(is);
      text = document.getText();
    } catch (IOException ex) {
      throw new TextExtractionException("Unable to read stream", ex);
    }

    return text;
  }

}
