package ee.tlu.evkk.dal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TextQueryRangeParamBaseHelper {

  private String table;
  private String parameter;
  private TextQueryRangeParamHelper[] values;
}
