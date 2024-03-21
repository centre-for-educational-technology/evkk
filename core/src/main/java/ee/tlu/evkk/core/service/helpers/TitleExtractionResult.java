package ee.tlu.evkk.core.service.helpers;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TitleExtractionResult {

  private String title;
  private String author;
  private String publisher;
}
