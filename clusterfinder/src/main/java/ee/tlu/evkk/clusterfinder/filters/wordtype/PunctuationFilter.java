package ee.tlu.evkk.clusterfinder.filters.wordtype;

import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.filters.util.FilteringUtil;

import java.util.List;
import java.util.Map;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.WORD_SUBTYPE_PARAM_SUFFIX;

public class PunctuationFilter implements WordTypeFilter
{
  private static final WordType WORD_TYPE = WordType.PUNCTUATION;

  private static final List < String > ALL_PUNCTUATIONS = List.of( "Z Fst", "Z Com", "Z Exc", "Z Int", "Z Dsh",
    "Z Col", "Z Scl", "Z Opr", "Z Cpr", "Z Quo" );

  @Override
  public List<String> getWordTypeFilters(Map<String, String[]> requestParameters)
  {
    String[] punctuationOptions = requestParameters.get( WORD_TYPE.name() + WORD_SUBTYPE_PARAM_SUFFIX );
    if ( punctuationOptions != null )
    {
      return FilteringUtil.assembleWordTypeFilters( WORD_TYPE, punctuationOptions );
    }

    return ALL_PUNCTUATIONS;
  }
}
