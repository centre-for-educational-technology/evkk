package ee.tlu.evkk.api.text.extractor.impl;

import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.odf.OpenDocumentParser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Component;
import org.xml.sax.SAXException;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.io.InputStream;

import static org.springframework.util.MimeType.valueOf;

@Component
public class ODTContentExtractor extends AbstractContentExtractor {

  public ODTContentExtractor() {
    super(valueOf("application/vnd.oasis.opendocument.text"));
  }

  @Nonnull
  @Override
  protected String extractInternal(@Nonnull InputStream is) throws TextExtractionException {
    String text;

    try {
      BodyContentHandler handler = new BodyContentHandler();
      Metadata metadata = new Metadata();
      ParseContext pcontext = new ParseContext();

      OpenDocumentParser openOfficeParser = new OpenDocumentParser();
      openOfficeParser.parse(is, handler, metadata, pcontext);
      text = handler.toString();
    } catch (IOException | SAXException | TikaException ex) {
      throw new TextExtractionException("Unable to read stream", ex);
    }

    return text;
  }

}
