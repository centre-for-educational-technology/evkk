package ee.tlu.evkk.api.exception;

/**
 * @author Mikk Tarvas
 * Date: 19.11.2019
 */
public class TokenConsumedException extends AbstractBusinessException {

  @Override
  public String getCode() {
    return "TokenConsumed";
  }

}
