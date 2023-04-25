package ee.tlu.evkk.api.text.extractor.impl;

import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Component;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.io.InputStream;

import static org.apache.pdfbox.pdmodel.PDDocument.load;
import static org.springframework.util.MimeType.valueOf;

@Component
public class PDFContentExtractor extends AbstractContentExtractor {

  public PDFContentExtractor() {
    super(valueOf("application/pdf"));
  }

  @Nonnull
  @Override
  protected String extractInternal(@Nonnull InputStream is) throws TextExtractionException {
    String text;

    try {
      PDDocument document = load(is);
      PDFTextStripper pdfStripper = new PDFTextStripper();
      text = pdfStripper.getText(document);
      document.close();
    } catch (IOException ex) {
      throw new TextExtractionException("Unable to read stream", ex);
    }

    return text;
  }

}
