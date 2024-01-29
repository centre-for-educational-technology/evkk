package ee.tlu.evkk.dal.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
@Getter
@Setter
public class Text {

  private UUID id;
  private String content;
  private String hash;
}

