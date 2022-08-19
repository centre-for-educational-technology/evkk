package ee.tlu.evkk.dal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TextQueryRangeParamBaseHelper {

  private String tabel;
  private String parameeter;
  private boolean castable;
  private TextQueryRangeParamHelper[] vaartused;
}
