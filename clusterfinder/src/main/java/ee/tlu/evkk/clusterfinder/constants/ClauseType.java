package ee.tlu.evkk.clusterfinder.constants;

public enum ClauseType {

  PREDICATE( "F", "Öeldis" ),
  BASIS( "@SUBJ", "Alus" ),
  OBJECTIVE( "@OBJ", "Sihitis" ),
  PEDICATE( "@PRD", "Öledistäide" ),
  ADVERBIBAL( "@ADVL", "Määrus" ),
  MODIFIER( "M", "Laiend" ),
  CONJUNCTIVE_WORD( "@J", "Sidend" ),
  EXCLAMATION( "@I", "Hüüatus" );

  private final String value;

  private final String labelEst;


  ClauseType(String value, String labelEst) {
    this.value = value;
    this.labelEst = labelEst;
  }

  public String getValue() {
    return value;
  }

  public String getLabelEst() {
    return labelEst;
  }
}
