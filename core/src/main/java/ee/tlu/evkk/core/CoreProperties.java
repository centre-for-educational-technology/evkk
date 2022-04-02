package ee.tlu.evkk.core;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author Mikk Tarvas
 * Date: 22.01.2022
 */
@ConfigurationProperties(prefix = "evkk.core")
public class CoreProperties {

  private String serviceProfile;

  public String getServiceProfile() {
    return serviceProfile;
  }

  public void setServiceProfile(String serviceProfile) {
    this.serviceProfile = serviceProfile;
  }

}
