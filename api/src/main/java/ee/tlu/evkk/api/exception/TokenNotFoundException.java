package ee.tlu.evkk.api.exception;

/**
 * @author Mikk Tarvas
 * Date: 19.11.2019
 */
public class TokenNotFoundException extends AbstractBusinessException {

  @Override
  public String getCode() {
    return "TokenNotFound";
  }

}
