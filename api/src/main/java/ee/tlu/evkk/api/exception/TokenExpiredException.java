package ee.tlu.evkk.api.exception;

/**
 * @author Mikk Tarvas
 * Date: 19.11.2019
 */
public class TokenExpiredException extends AbstractBusinessException {

  @Override
  public String getCode() {
    return "TokenExpired";
  }

}
