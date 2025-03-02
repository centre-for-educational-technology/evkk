package ee.tlu.evkk.core.service.dto;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TextWithComplexity {

  private List<String> sonad;
  private List<String> sonaliigid;
  private List<String> keerukus;
  private List<String> lemmad;
  private List<String> mitmekesisus;
  private List<List<String>> keeletase;
  private Object uuskeeletase;
  private Object abstraktsus;
  private Object grammatika;
  private Object grammatikaVead;
  private Object speller;
  private Object spelleriVead;
  private List<String> laused;
  private List<Object> sonavara;
  private Object korrektoriLoendid;

  @JsonGetter("korrektoriLoendid")
  public Object getKorrektoriLoendid() {
    return korrektoriLoendid;
  }

  @JsonGetter("spelleriVead")
  public Object getSpelleriVead() {return spelleriVead;}

  @JsonSetter("spelleri_vead")
  public void setSpelleriVead(Object spelleriVead) {this.spelleriVead = spelleriVead;}

  @JsonSetter("korrektori_loendid")
  public void setKorrektoriLoendid(Object korrektoriLoendid) {
    this.korrektoriLoendid = korrektoriLoendid;
  }

  @JsonGetter("grammatikaVead")
  public Object getGrammatikaVead() {return grammatikaVead;}

  @JsonSetter("grammatika_vead")
  public void setGrammatikaVead(Object grammatikaVead) {this.grammatikaVead = grammatikaVead;}
}
