package ee.tlu.evkk.clusterfinder.constants;

public enum PunctuationType {

  FULL_STOP( "Z Fst", "Punkt" ),
  COMMA( "Z Com", "Koma" ),
  EXCLAMATION_MARK( "Z Exc", "Hüüumärk" ),
  QUESTION_MARK( "Z Int", "Küsimärk" ),
  DASH( "Z Dsh", "Mõttekriips" ),
  COLON( "Z Col", "Koolon" ),
  SEMICOLON( "Z Scl", "Semikoolon" ),
  OPENING_BRACKET( "Z Opr", "Avav ümarsulg" ),
  CLOSING_BRACKET( "Z Cpr", "Sulgev ümarsulg" ),
  QUOTE( "Z Quo", "Jutumärk" );

  private final String labelEst;

  private final String value;

  PunctuationType( String value, String labelEst )
  {
    this.value = value;
    this.labelEst = labelEst;
  }

  public String getLabelEst() {
    return labelEst;
  }

  public String getValue() {
    return value;
  }
}
