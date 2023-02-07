package ee.tlu.evkk.dal.dto;

public class TextQuerySingleParamHelper {

  private String table;
  private String parameter;
  private String value;

  public TextQuerySingleParamHelper(String table, String parameter, String value) {
    this.table = table;
    this.parameter = parameter;
    this.value = value;
  }

  public String getTable() {
    return table;
  }

  public void setTable(String table) {
    this.table = table;
  }

  public String getParameter() {
    return parameter;
  }

  public void setParameter(String parameter) {
    this.parameter = parameter;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }
}
