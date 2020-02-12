package ee.tlu.evkk.api.exception;

/**
 * @author Mikk Tarvas
 * Date: 12.02.2020
 */
public class SessionNotFoundException extends AbstractBusinessException {

  @Override
  public String getCode() {
    return "SessionNotFound";
  }

}
