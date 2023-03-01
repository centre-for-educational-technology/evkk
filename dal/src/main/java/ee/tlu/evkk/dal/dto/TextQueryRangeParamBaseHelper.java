package ee.tlu.evkk.dal.dto;

public class TextQueryRangeParamBaseHelper {

  private String table;
  private String parameter;
  private boolean castable;
  private TextQueryRangeParamHelper[] values;

  public TextQueryRangeParamBaseHelper(String table, String parameter, boolean castable, TextQueryRangeParamHelper[] values) {
    this.table = table;
    this.parameter = parameter;
    this.castable = castable;
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

  public boolean isCastable() {
    return castable;
  }

  public void setCastable(boolean castable) {
    this.castable = castable;
  }

  public TextQueryRangeParamHelper[] getValues() {
    return values;
  }

  public void setValues(TextQueryRangeParamHelper[] values) {
    this.values = values;
  }
}
