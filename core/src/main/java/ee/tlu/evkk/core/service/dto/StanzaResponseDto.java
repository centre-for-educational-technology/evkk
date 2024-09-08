package ee.tlu.evkk.core.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StanzaResponseDto {

  private List<String> sonad;
  private List<String> lemmad;
  private List<String> silbid;
  private List<String> laused;
  private List<String> sonaliigid;
  private List<List<String>> vormimargendid;
  private Object keeletase;
  private Object abstraktsus;
}
