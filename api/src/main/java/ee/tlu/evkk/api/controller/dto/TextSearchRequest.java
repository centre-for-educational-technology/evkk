package ee.tlu.evkk.api.controller.dto;

/**
 * @author Mikk Tarvas
 * Date: 17.04.2022
 */
public class TextSearchRequest {

  private String[] korpus;
  private String tekstityyp;
  private String tekstikeel;
  private String keeletase;
  private Boolean abivahendid;
  private String sugu;

  public String[] getKorpus() {
    return korpus;
  }

  public void setKorpus(String[] korpus) {
    this.korpus = korpus;
  }

  public String getTekstityyp() {
    return tekstityyp;
  }

  public void setTekstityyp(String tekstityyp) {
    this.tekstityyp = tekstityyp;
  }

  public String getTekstikeel() {
    return tekstikeel;
  }

  public void setTekstikeel(String tekstikeel) {
    this.tekstikeel = tekstikeel;
  }

  public String getKeeletase() {
    return keeletase;
  }

  public void setKeeletase(String keeletase) {
    this.keeletase = keeletase;
  }

  public Boolean getAbivahendid() {
    return abivahendid;
  }

  public void setAbivahendid(Boolean abivahendid) {
    this.abivahendid = abivahendid;
  }

  public String getSugu() {
    return sugu;
  }

  public void setSugu(String sugu) {
    this.sugu = sugu;
  }

}
