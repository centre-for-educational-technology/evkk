package ee.tlu.evkk.clusterfinder.filters.wordspecific;

import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.filters.util.FilteringUtil;

import java.util.List;
import java.util.Map;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.WORD_SUBTYPE_PARAM_SUFFIX;

public class PunctuationFilter implements WordSpecificFilter
{
  private static final WordType WORD_TYPE = WordType.PUNCTUATION;

  @Override
  public List < String > getWordSpecificFilters( Map < String, String[] > requestParameters )
  {
    String[] punctuationOptions = requestParameters.get( WORD_TYPE.name() + WORD_SUBTYPE_PARAM_SUFFIX );
    if ( punctuationOptions != null )
    {
      return FilteringUtil.assembleWordTypeFilters( WORD_TYPE, punctuationOptions );
    }

    return List.of( WORD_TYPE.getValue() );
  }
}
