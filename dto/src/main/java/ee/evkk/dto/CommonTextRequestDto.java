package ee.evkk.dto;

import ee.evkk.dto.enums.Language;

public class CommonTextRequestDto {

  private String tekst;
  private Language language;

  public String getTekst() {
    return tekst;
  }

  public void setTekst(String tekst) {
    this.tekst = tekst;
  }

  public Language getLanguage() {
    return language;
  }

  public void setLanguage(Language language) {
    this.language = language;
  }
}
