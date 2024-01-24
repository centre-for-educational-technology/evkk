package ee.tlu.evkk.dal.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
@Getter
@Setter
public class UserFile {

  private UUID userFileId;
  private UUID fileId;
  private UUID userId;
  private String name;
  private String content;
}
