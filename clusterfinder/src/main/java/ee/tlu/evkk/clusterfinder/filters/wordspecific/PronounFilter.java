package ee.tlu.evkk.clusterfinder.filters.wordspecific;

import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.filters.util.FilteringUtil;
import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.*;

public class PronounFilter implements WordSpecificFilter
{
  private static final WordType WORD_TYPE = WordType.PRONOUN;

  private static final String P_PERS = "P pers";

  private static final Predicate< String > IS_PRONOUN_WITH_OPTIONS = p -> StringUtils.contains( p, P_PERS );

  @Override
  public List < String > getWordSpecificFilters( Map < String, String[] > requestParameters )
  {
    String[] pronounSubTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_SUBTYPE_PARAM_SUFFIX );
    String[] pronounPerspectiveTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_PERSPECTIVE_TYPE_PARAM_SUFFIX );
    String[] pronounPluralTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_PLURAL_TYPE_PARAM_SUFFIX );
    String[] pronounCaseTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_CASE_TYPE_PARAM_SUFFIX );

    if ( pronounSubTypeOptions != null )
    {
      List< String > filters = FilteringUtil.assembleWordTypeFilters( WORD_TYPE, pronounSubTypeOptions );
      int additionalSpaces = 0;

      if ( pronounPerspectiveTypeOptions != null )
      {
        filters.addAll( FilteringUtil.createVariations( filters, IS_PRONOUN_WITH_OPTIONS, pronounPerspectiveTypeOptions ) );
        additionalSpaces++;
      }

      if ( pronounPluralTypeOptions != null )
      {
        filters.addAll( FilteringUtil.createVariations( filters, pronounPluralTypeOptions ) );
        additionalSpaces++;
      }

      if ( pronounCaseTypeOptions != null )
      {
        filters.addAll( FilteringUtil.createVariations( filters, pronounCaseTypeOptions ) );
        additionalSpaces++;
      }

      if ( additionalSpaces != 0 )
      {
        int finalAdditionalSpaces = additionalSpaces;
        filters.removeIf( f -> IS_PRONOUN_WITH_OPTIONS.test( f ) && !FilteringUtil.hasMatchingNumberOfSpaces( f, finalAdditionalSpaces ) );
      }

      return filters;
    }

    return List.of( WORD_TYPE.getValue() );
  }
}
