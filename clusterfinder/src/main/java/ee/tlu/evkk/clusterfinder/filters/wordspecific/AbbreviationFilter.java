package ee.tlu.evkk.clusterfinder.filters.wordspecific;

import ee.tlu.evkk.clusterfinder.constants.WordType;

import java.util.List;
import java.util.Map;

public class AbbreviationFilter implements WordSpecificFilter
{
  private static final WordType WORD_TYPE = WordType.ABBREVIATION;

  @Override
  public List < String > getWordSpecificFilters( Map < String, String[] > requestParameters )
  {
    return List.of( WORD_TYPE.getValue() );
  }
}
