package ee.tlu.evkk.core.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TextResponseDto {

  private List<String> sonad;
  private List<String> lemmad;
  private List<String> silbid;
  private List<String> laused;
  private List<String> sonaliigid;
  private List<String> vormimargendid;
}
