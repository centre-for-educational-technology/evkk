package ee.tlu.evkk.api.service.dto;

/**
 * @author Mikk Tarvas
 * Date: 14.11.2021
 */
public class TextSearchParams {

  private final Option[] korpused;

  public TextSearchParams(Option[] korpused) {
    this.korpused = korpused;
  }

}
