package ee.tlu.evkk.api.text.extractor.impl;

import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import org.springframework.stereotype.Component;
import org.springframework.util.MimeType;

import org.apache.poi.hwpf.extractor.WordExtractor;
import org.apache.poi.extractor.POIOLE2TextExtractor;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.io.InputStream;

@Component
public class DOCContentExtractor extends AbstractContentExtractor {

  public DOCContentExtractor() {
    super(MimeType.valueOf("application/msword"));
  }

  @Nonnull
  @Override
  protected String extractInternal(@Nonnull InputStream is) throws TextExtractionException {
    String text = "";

    try {
      WordExtractor document = new WordExtractor(is);
      text = document.getText();
    } catch (IOException ex) {
      throw new TextExtractionException("Unable to read stream", ex);
    }
    
    return text;
  }

}
