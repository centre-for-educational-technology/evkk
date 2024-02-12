package ee.evkk.dto.integration;

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
public class FileResponseEntity {

  private UUID userFileId;
  private String name;
  private String url;
  private String mediaType;
  private Instant createdAt;
  private Boolean isPublic;
}
