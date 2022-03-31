package ee.tlu.evkk.clusterfinder.constants;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

public enum SortingType
{
  BY_FREQUENCY( "freq" ),
  BY_FIRST_WORD( "fwrd" ),
  BY_SECOND_WORD( "swrd" ),
  BY_THIRD_WORD( "twrd" ),
  BY_FOURTH_WORD( "fowrd" ),
  BY_FIFTH_WORD( "fiwrd" );

  private final String value;

  private static final Map< String, SortingType > VALUE_TO_SORTING_TYPE_MAP = Arrays.stream(SortingType.values())
    .collect(Collectors.toMap(SortingType::getValue, c -> c ));

  SortingType( String value )
  {
    this.value = value;
  }

  public String getValue()
  {
    return value;
  }

  public static SortingType getByValue( String value )
  {
    return VALUE_TO_SORTING_TYPE_MAP.getOrDefault( value, BY_FREQUENCY );
  }

}
