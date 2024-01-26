package ee.tlu.evkk.dal.dto;

import ee.tlu.evkk.dal.json.Json;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 10.02.2020
 */
@Getter
@Setter
public class File {

  private UUID fileId;
  private Long oid;
  private FileType fileType;
  private String mediaType;
  private Json metadata;
}
