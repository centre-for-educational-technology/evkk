package ee.tlu.evkk.api.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UnauthorizedException extends RuntimeException {

  public UnauthorizedException() {
    super();
  }
}
