package ee.tlu.evkk.api.controller.dto;

import java.util.Map;

/**
 * @author Mikk Tarvas
 * Date: 11.02.2020
 */
public class StatusResponseEntity {

  private String loggedInEmailAddress;
  private Map<String, String> integrationPaths;

  public String getLoggedInEmailAddress() {
    return loggedInEmailAddress;
  }

  public void setLoggedInEmailAddress(String loggedInEmailAddress) {
    this.loggedInEmailAddress = loggedInEmailAddress;
  }

  public Map<String, String> getIntegrationPaths() {
    return integrationPaths;
  }

  public void setIntegrationPaths(Map<String, String> integrationPaths) {
    this.integrationPaths = integrationPaths;
  }

}
