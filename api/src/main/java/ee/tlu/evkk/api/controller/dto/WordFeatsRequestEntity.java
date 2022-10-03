package ee.tlu.evkk.api.controller.dto;

public class WordFeatsRequestEntity {

  private String tekst;
  private String language;

  public String getTekst() {
    return tekst;
  }

  public void setTekst(String tekst) {
    this.tekst = tekst;
  }

  public String getLanguage() {
    return language;
  }

  public void setLanguage(String language) {
    this.language = language;
  }
}
