package ee.tlu.evkk.clusterfinder.constants;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

public enum PunctuationType {

  ALL ("ALL", "punctuation.type.all" ),
  FULL_STOP( "Z Fst", "punctuation.type.full.stop" ),
  COMMA( "Z Com", "punctuation.type.comma" ),
  EXCLAMATION_MARK( "Z Exc", "punctuation.type.exclamation.mark" ),
  QUESTION_MARK( "Z Int", "punctuation.type.question.mark" ),
  DASH( "Z Dsh", "punctuation.type.dash" ),
  COLON( "Z Col", "punctuation.type.colon" ),
  SEMICOLON( "Z Scl", "punctuation.type.semicolon" ),
  OPENING_BRACKET( "Z Opr", "punctuation.type.opening.bracket" ),
  CLOSING_BRACKET( "Z Cpr", "punctuation.type.closing.bracket" ),
  QUOTE( "Z Quo", "punctuation.type.quote" );

  private final String labelKey;

  private final String value;

  private static final Map< String, PunctuationType > VALUE_TO_PUNCTUATION_MAP = Arrays.stream(PunctuationType.values())
    .collect(Collectors.toMap(PunctuationType::getValue, p -> p));

  PunctuationType( String value, String labelKey)
  {
    this.value = value;
    this.labelKey = labelKey;
  }

  public String getLabelKey() {
    return labelKey;
  }

  public String getValue() {
    return value;
  }

  public static PunctuationType getByValue( String value ) {
    return VALUE_TO_PUNCTUATION_MAP.getOrDefault( value, ALL );
  }
}
