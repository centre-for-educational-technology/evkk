package ee.tlu.evkk.api.controller.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WordFeatsRequestEntity {

  private String tekst;
  private String language;

}
