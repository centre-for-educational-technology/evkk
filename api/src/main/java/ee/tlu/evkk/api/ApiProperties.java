package ee.tlu.evkk.api;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author Mikk Tarvas
 * Date: 09.02.2020
 */
@ConfigurationProperties(prefix = "evkk.api")
public class ApiProperties {

  private LibpathsProperties libpaths;

  public LibpathsProperties getLibpaths() {
    return libpaths;
  }

  public void setLibpaths(LibpathsProperties libpaths) {
    this.libpaths = libpaths;
  }

  public static class LibpathsProperties {

    private String masinoppeEnnustus;

    public String getMasinoppeEnnustus() {
      return masinoppeEnnustus;
    }

    public void setMasinoppeEnnustus(String masinoppeEnnustus) {
      this.masinoppeEnnustus = masinoppeEnnustus;
    }

  }

}
