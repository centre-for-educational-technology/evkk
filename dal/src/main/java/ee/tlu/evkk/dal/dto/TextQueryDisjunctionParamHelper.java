package ee.tlu.evkk.dal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TextQueryDisjunctionParamHelper {

  private String table;
  private String firstParameter;
  private String firstValue;
  private String secondParameter;
  private String secondValue;

  public TextQueryDisjunctionParamHelper(String table, String firstParameter, String secondParameter) {
    this.table = table;
    this.firstParameter = firstParameter;
    this.secondParameter = secondParameter;
  }
}
