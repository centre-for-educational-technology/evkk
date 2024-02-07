package ee.tlu.evkk.dal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TextQuerySingleParamHelper {

  private String table;
  private String parameter;
  private String value;
}
