package ee.tlu.evkk.dal.dto;

import java.util.Set;

public class TextQueryMultiParamHelper {

  private String table;
  private String parameter;
  private Set<String> values;

  public TextQueryMultiParamHelper(String table, String parameter, Set<String> values) {
    this.table = table;
    this.parameter = parameter;
    this.values = values;
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

  public Set<String> getValues() {
    return values;
  }

  public void setValues(Set<String> values) {
    this.values = values;
  }
}
