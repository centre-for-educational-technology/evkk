package ee.tlu.evkk.api.dao.io;

/**
 * @author Mikk Tarvas
 * Date: 14.11.2021
 */
public class TextSearch {

  private final String korpus; // core.text_property = 'korpus'
  private final String tekstityyp; // core.text_property = 'tekstityyp'
  private final String keeletase; // core.text_property = 'keeletase'
  private final String emakeel; // core.text_property = 'emakeel'
  private final String kodukeel; // core.text_property = 'kodukeel'
  private final String sugu; // core.text_property = 'sugu'
  private final String vanus; // core.text_property = 'vanus'
  private final String elukoht; // core.text_property = 'elukoht'

  public TextSearch(String korpus, String tekstityyp, String keeletase, String emakeel, String kodukeel, String sugu, String vanus, String elukoht) {
    this.korpus = korpus;
    this.tekstityyp = tekstityyp;
    this.keeletase = keeletase;
    this.emakeel = emakeel;
    this.kodukeel = kodukeel;
    this.sugu = sugu;
    this.vanus = vanus;
    this.elukoht = elukoht;
  }

  public String getKorpus() {
    return korpus;
  }

  public String getTekstityyp() {
    return tekstityyp;
  }

  public String getKeeletase() {
    return keeletase;
  }

  public String getEmakeel() {
    return emakeel;
  }

  public String getKodukeel() {
    return kodukeel;
  }

  public String getSugu() {
    return sugu;
  }

  public String getVanus() {
    return vanus;
  }

  public String getElukoht() {
    return elukoht;
  }

}
