package ee.tlu.evkk.clusterfinder.filters.wordspecific;

import ee.tlu.evkk.clusterfinder.constants.WordType;

import java.util.List;
import java.util.Map;

public class AdverbFilter implements WordSpecificFilter
{
  @Override
  public List < String > getWordSpecificFilters( Map < String, String[] > requestParameters )
  {
    return List.of( WordType.ADVERB.getValue() );
  }
}
