package ee.tlu.evkk.dal.dto;

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

  public String getTable() {
    return table;
  }

  public void setTable(String table) {
    this.table = table;
  }

  public String getFirstParameter() {
    return firstParameter;
  }

  public void setFirstParameter(String firstParameter) {
    this.firstParameter = firstParameter;
  }

  public String getFirstValue() {
    return firstValue;
  }

  public void setFirstValue(String firstValue) {
    this.firstValue = firstValue;
  }

  public String getSecondParameter() {
    return secondParameter;
  }

  public void setSecondParameter(String secondParameter) {
    this.secondParameter = secondParameter;
  }

  public String getSecondValue() {
    return secondValue;
  }

  public void setSecondValue(String secondValue) {
    this.secondValue = secondValue;
  }
}
