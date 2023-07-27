package ee.tlu.evkk.api.text.extractor.impl;

import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Component;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import static org.springframework.util.MimeType.valueOf;

@Component
public class DOCXContentExtractor extends AbstractContentExtractor {

  public DOCXContentExtractor() {
    super(valueOf("application/vnd.openxmlformats-officedocument.wordprocessingml.document"));
  }

  @Nonnull
  @Override
  protected String extractInternal(@Nonnull InputStream is) throws TextExtractionException {
    StringBuilder text = new StringBuilder();

    try {
      XWPFDocument document = new XWPFDocument(is);
      List<XWPFParagraph> paragraphs = document.getParagraphs();
      for (XWPFParagraph para : paragraphs) {
        text.append(para.getText()).append("\n");
      }
      document.close();
    } catch (IOException ex) {
      throw new TextExtractionException("Unable to read stream", ex);
    }

    return text.toString();
  }

}
