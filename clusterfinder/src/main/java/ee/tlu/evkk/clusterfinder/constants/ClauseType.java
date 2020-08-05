package ee.tlu.evkk.clusterfinder.constants;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

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

  private static final Map< String, ClauseType > VALUE_TO_CLAUSE_MAP = Arrays.stream(ClauseType.values())
    .collect(Collectors.toMap(ClauseType::getValue, c -> c ));

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

  public static ClauseType getByValue( String value ) {
    return VALUE_TO_CLAUSE_MAP.getOrDefault( value, null );
  }
}
