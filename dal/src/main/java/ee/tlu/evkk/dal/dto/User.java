package ee.tlu.evkk.dal.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
@Getter
@Setter
public class User {

  private UUID userId;
  private String emailAddress;
  private String passwordHash;
  private String roleName;
}
