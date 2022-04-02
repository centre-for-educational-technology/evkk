package ee.tlu.evkk.api.text.extractor.impl;

import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import org.springframework.stereotype.Component;
import org.springframework.util.MimeType;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.io.InputStream;

@Component
public class PDFContentExtractor extends AbstractContentExtractor {

  public PDFContentExtractor() {
    super(MimeType.valueOf("application/pdf"));
  }

  @Nonnull
  @Override
  protected String extractInternal(@Nonnull InputStream is) throws TextExtractionException {
    String text;

    try {
      PDDocument document = PDDocument.load(is);
      PDFTextStripper pdfStripper = new PDFTextStripper();
      text = pdfStripper.getText(document);
      document.close();
    } catch (IOException ex) {
      throw new TextExtractionException("Unable to read stream", ex);
    }
    
    return text;
  }

}
