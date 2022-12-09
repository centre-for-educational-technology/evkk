package ee.tlu.evkk.dal.dto;

import java.util.List;

public class TextQueryCorpusHelper {

  private String table;
  private String parameter;
  private List<String> values;

  public TextQueryCorpusHelper(String table, String parameter, List<String> values) {
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

  public List<String> getValues() {
    return values;
  }

  public void setValues(List<String> values) {
    this.values = values;
  }
}
