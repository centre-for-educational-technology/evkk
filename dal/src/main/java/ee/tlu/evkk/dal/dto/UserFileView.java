package ee.tlu.evkk.dal.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
@Getter
@Setter
public class UserFileView extends UserFile {

  private String mediaType;
  private Instant createdAt;
}
