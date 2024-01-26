package ee.tlu.evkk.dal.dto;

import ee.tlu.evkk.dal.json.Json;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 18.11.2019
 */
@Getter
@Setter
public class Token {

  private UUID tokenId;
  private TokenType type;
  private Json data;
}
