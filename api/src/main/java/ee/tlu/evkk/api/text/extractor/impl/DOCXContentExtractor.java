package ee.tlu.evkk.api.text.extractor.impl;

import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import org.springframework.stereotype.Component;
import org.springframework.util.MimeType;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import java.util.List;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.io.InputStream;

@Component
public class DOCXContentExtractor extends AbstractContentExtractor {

  public DOCXContentExtractor() {
    super(MimeType.valueOf("application/vnd.openxmlformats-officedocument.wordprocessingml.document"));
  }

  @Nonnull
  @Override
  protected String extractInternal(@Nonnull InputStream is) throws TextExtractionException {
    String text = "";

    try {
      XWPFDocument document = new XWPFDocument(is);
      List<XWPFParagraph> paragraphs = document.getParagraphs();
      for (XWPFParagraph para : paragraphs) {
        text += para.getText();
      }
      document.close();
    } catch (IOException ex) {
      throw new TextExtractionException("Unable to read stream", ex);
    }
    
    return text;
  }

}
