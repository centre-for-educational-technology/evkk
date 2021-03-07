package ee.tlu.evkk.clusterfinder.filters.wordspecific;

import ee.tlu.evkk.clusterfinder.constants.FilteringConstants;
import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.filters.util.FilteringUtil;
import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.*;

public class AdjectiveFilter implements WordSpecificFilter
{
  private static final WordType WORD_TYPE = WordType.ADJECTIVE;

  private static final String ADJECTIVE_TYPE_A = "A";

  private static final String ADJECTIVE_TYPE_G = "G";

  private static final Predicate< String > IS_DECLINABLE = a -> StringUtils.contains( a, ADJECTIVE_TYPE_A );

  @Override
  public List < String > getWordSpecificFilters( Map < String, String[] > requestParameters )
  {
    String[] adjectiveSubTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_SUBTYPE_PARAM_SUFFIX );
    String[] adjectiveStepTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_STEP_TYPE_PARAM_SUFFIX );
    String[] adjectivePluralTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_PLURAL_TYPE_PARAM_SUFFIX );
    String[] adjectiveCaseTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_CASE_TYPE_PARAM_SUFFIX );

    if ( adjectiveSubTypeOptions != null )
    {
      List< String > filters = FilteringUtil.assembleWordTypeFilters( WORD_TYPE, adjectiveSubTypeOptions );
      int additionalSpaces = 0;

      if ( adjectiveStepTypeOptions != null )
      {
        filters.addAll( FilteringUtil.createVariations( filters, IS_DECLINABLE, adjectiveStepTypeOptions ) );
        additionalSpaces++;
      }

      if ( adjectivePluralTypeOptions != null )
      {
        filters.addAll( FilteringUtil.createVariations( filters, IS_DECLINABLE, adjectivePluralTypeOptions ) );
        additionalSpaces++;
      }

      if ( adjectiveCaseTypeOptions != null )
      {
        filters.addAll( FilteringUtil.createVariations( filters, IS_DECLINABLE, adjectiveCaseTypeOptions ) );
        additionalSpaces++;
      }

      if ( additionalSpaces != 0 )
      {
        int finalAdditionalSpaces = additionalSpaces;
        filters.removeIf(f -> IS_DECLINABLE.test( f ) && !FilteringUtil.hasMatchingNumberOfSpaces( f, finalAdditionalSpaces ) );
      }

      return filters;
    }

    return List.of( ADJECTIVE_TYPE_A, ADJECTIVE_TYPE_G );
  }
}
