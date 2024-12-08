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
  private Object speller;
  private List<String> laused;
  private List<Object> sonavara;

  private Object korrektoriLoendid;

  @JsonGetter("korrektoriLoendid")
  public Object getKorrektoriLoendid() {
    return korrektoriLoendid;
  }

  @JsonSetter("korrektori_loendid")
  public void setKorrektoriLoendid(Object korrektoriLoendid) {
    this.korrektoriLoendid = korrektoriLoendid;
  }
}
