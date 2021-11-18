package ee.tlu.evkk.api.service.dto;

/**
 * @author Mikk Tarvas
 * Date: 14.11.2021
 */
public class Option {

  private final String code;
  private final String text;

  public Option(String code, String text) {
    this.code = code;
    this.text = text;
  }

  public String getCode() {
    return code;
  }

  public String getText() {
    return text;
  }

}
