package ee.tlu.evkk.clusterfinder.filters.wordspecific;

import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.filters.util.FilteringUtil;
import org.apache.commons.lang3.StringUtils;

import java.util.*;
import java.util.function.Predicate;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.*;

public class NumeralFilter implements WordSpecificFilter
{
  private static final WordType WORD_TYPE = WordType.NUMERAL;

  private static final String N_ORD = "N ord";

  private static final String N_CARD = "N card";

  private static final Predicate< String > IS_NUMERAL_WITH_OPTIONS = n -> StringUtils.containsAny( n, N_ORD, N_CARD );

  @Override
  public List < String > getWordSpecificFilters( Map<String, String[] > requestParameters )
  {
    String[] numeralSubTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_SUBTYPE_PARAM_SUFFIX );
    String[] numeralPluralTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_PLURAL_TYPE_PARAM_SUFFIX );
    String[] numeralCaseTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_CASE_TYPE_PARAM_SUFFIX );

    if ( numeralSubTypeOptions != null )
    {
      List< String > filters = FilteringUtil.assembleWordTypeFilters( WORD_TYPE, numeralSubTypeOptions );
      int additionalSpaces = 0;

      if ( numeralPluralTypeOptions != null )
      {
        filters.addAll( FilteringUtil.createVariations( filters, IS_NUMERAL_WITH_OPTIONS, numeralPluralTypeOptions ) );
        additionalSpaces++;
      }

      if ( numeralCaseTypeOptions != null )
      {
        filters.addAll( FilteringUtil.createVariations( filters, IS_NUMERAL_WITH_OPTIONS, numeralCaseTypeOptions ) );
        additionalSpaces++;
      }

      if ( additionalSpaces != 0 )
      {
        int finalAdditionalSpaces = additionalSpaces;
        filters.removeIf( f -> IS_NUMERAL_WITH_OPTIONS.test( f ) && !FilteringUtil.hasMatchingNumberOfSpaces( f, finalAdditionalSpaces ) );
      }

      return filters;
    }

    return List.of( WORD_TYPE.getValue() );
  }
}
