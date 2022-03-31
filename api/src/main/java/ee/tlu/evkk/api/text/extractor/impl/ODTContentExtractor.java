package ee.tlu.evkk.api.text.extractor.impl;

import ee.tlu.evkk.api.text.extractor.ex.TextExtractionException;
import org.springframework.stereotype.Component;
import org.springframework.util.MimeType;

import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.odf.OpenDocumentParser;
import org.apache.tika.sax.BodyContentHandler;
import org.xml.sax.SAXException;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.io.InputStream;

@Component
public class ODTContentExtractor extends AbstractContentExtractor {

  public ODTContentExtractor() {
    super(MimeType.valueOf("application/vnd.oasis.opendocument.text"));
  }

  @Nonnull
  @Override
  protected String extractInternal(@Nonnull InputStream is) throws TextExtractionException {
    String text = "";

    try {
      BodyContentHandler handler = new BodyContentHandler();
      Metadata metadata = new Metadata();
      ParseContext pcontext = new ParseContext();

      OpenDocumentParser openofficeparser = new OpenDocumentParser(); 
      openofficeparser.parse(is, handler, metadata, pcontext);
      text = handler.toString();
    } catch (IOException ex) {
      throw new TextExtractionException("Unable to read stream", ex);
    } catch (SAXException ex) {
      throw new TextExtractionException("Unable to read stream", ex);
    } catch (TikaException ex) {
      throw new TextExtractionException("Unable to read stream", ex);
    }
    
    return text;
  }

}
