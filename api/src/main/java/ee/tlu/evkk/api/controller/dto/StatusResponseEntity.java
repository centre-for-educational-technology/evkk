package ee.tlu.evkk.api.controller.dto;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
public class StatusResponseEntity {

  private String loggedInEmailAddress;

  public String getLoggedInEmailAddress() {
    return loggedInEmailAddress;
  }

  public void setLoggedInEmailAddress(String loggedInEmailAddress) {
    this.loggedInEmailAddress = loggedInEmailAddress;
  }

}
