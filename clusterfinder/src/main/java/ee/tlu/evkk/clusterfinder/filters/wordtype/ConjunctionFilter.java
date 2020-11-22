package ee.tlu.evkk.clusterfinder.filters.wordtype;

import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.filters.util.FilteringUtil;

import java.util.List;
import java.util.Map;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.WORD_SUBTYPE_PARAM_SUFFIX;

public class ConjunctionFilter implements WordTypeFilter
{
  private static final WordType WORD_TYPE = WordType.CONJUNCTION;

  private static final List< String > ALL_CONJUNCTIONS = List.of( "J coord", "J sub" );

  @Override
  public List<String> getWordTypeFilters(Map<String, String[]> requestParameters)
  {
    String[] conjunctionOptions = requestParameters.get( WORD_TYPE.name() + WORD_SUBTYPE_PARAM_SUFFIX );
    if ( conjunctionOptions != null )
    {
      return FilteringUtil.assembleWordTypeFilters( WORD_TYPE, conjunctionOptions );
    }

    return ALL_CONJUNCTIONS;
  }
}
