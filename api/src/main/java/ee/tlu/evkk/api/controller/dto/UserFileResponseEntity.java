package ee.tlu.evkk.api.controller.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
@Getter
@Setter
public class UserFileResponseEntity {

  private UUID userFileId;
  private String name;
  private String mediaType;
  private Instant createdAt;
}
