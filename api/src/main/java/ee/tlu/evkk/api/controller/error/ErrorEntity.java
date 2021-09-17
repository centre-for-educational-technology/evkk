package ee.tlu.evkk.api.controller.error;

/**
 * @author Mikk Tarvas
 * Date: 05.06.2020
 */
public class ErrorEntity {

  private final String code;
  private final String message;
  private final String field;

  public ErrorEntity(String code, String message, String field) {
    this.code = code;
    this.message = message;
    this.field = field;
  }

  public String getCode() {
    return code;
  }

  public String getMessage() {
    return message;
  }

  public String getField() {
    return field;
  }

}
