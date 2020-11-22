package ee.tlu.evkk.clusterfinder.filters.wordtype;

import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.filters.util.FilteringUtil;

import java.util.List;
import java.util.Map;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.WORD_SUBTYPE_PARAM_SUFFIX;

public class AdpositionFilter implements WordTypeFilter
{
  private static final WordType WORD_TYPE = WordType.ADPOSITION;

  private static final List < String > ALL_ADPOSITIONS = List.of( "K post", "K sub" );

  @Override
  public List < String > getWordTypeFilters(Map<String, String[]> requestParameters)
  {
    String[] adpositionOptions = requestParameters.get( WORD_TYPE.name() + WORD_SUBTYPE_PARAM_SUFFIX );
    if ( adpositionOptions != null )
    {
      return FilteringUtil.assembleWordTypeFilters( WORD_TYPE, adpositionOptions );
    }

    return ALL_ADPOSITIONS;
  }
}
