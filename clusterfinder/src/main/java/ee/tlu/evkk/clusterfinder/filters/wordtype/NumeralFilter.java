package ee.tlu.evkk.clusterfinder.filters.wordtype;

import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.filters.util.FilteringUtil;

import java.util.List;
import java.util.Map;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.WORD_SUBTYPE_PARAM_SUFFIX;

public class NumeralFilter implements WordTypeFilter
{
  private static final WordType WORD_TYPE = WordType.NUMERAL;

  @Override
  public List<String> getWordTypeFilters(Map<String, String[]> requestParameters)
  {
    String[] numeralSubTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_SUBTYPE_PARAM_SUFFIX );
    if ( numeralSubTypeOptions != null )
    {
      return FilteringUtil.assembleWordTypeFilters( WORD_TYPE, numeralSubTypeOptions );
    }

    return List.of( WORD_TYPE.getValue() );
  }
}
