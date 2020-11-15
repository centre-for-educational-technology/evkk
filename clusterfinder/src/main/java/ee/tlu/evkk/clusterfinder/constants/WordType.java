package ee.tlu.evkk.clusterfinder.constants;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

public enum WordType {

  ALL( "ALL", "word.type.all" ),
  VERB( "V", "word.type.verb" ),
  SUBJECT( "S", "word.type.subject" ),
  ADJECTIVE( "A", "word.type.adjective" ),
  PRONOUN( "P", "word.type.pronoun" ),
  NUMERAL( "N", "word.type.numeral" ),
  ADVERB( "D", "word.type.adverb" ),
  CONJUNCTION( "J", "word.type.conjunction" ),
  ADPOSITION( "K", "word.type.adposition" ),
  ABBREVIATION( "Y", "word.type.abbreviation" ),
  PUNCTUATION( "Z", "word.type.punctuation" );

  private final String labelKey;

  private final String value;

  private static final Map< String, WordType > VALUE_TO_WORD_MAP = Arrays.stream(WordType.values())
    .collect(Collectors.toMap(WordType::getValue, w -> w));

  WordType( String value, String labelKey ) {
    this.value = value;
    this.labelKey = labelKey;
  }

  public String getLabelKey() {
    return labelKey;
  }

  public String getValue() {
    return value;
  }

  public static WordType getByValue( String value ) {
    return VALUE_TO_WORD_MAP.getOrDefault( value, ALL );
  }
}
