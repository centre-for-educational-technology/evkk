package ee.tlu.evkk.clusterfinder.filters.wordspecific;

import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.filters.util.FilteringUtil;

import java.util.List;
import java.util.Map;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.*;

public class SubjectFilter implements WordSpecificFilter
{
  private static final WordType WORD_TYPE = WordType.SUBJECT;

  @Override
  public List < String > getWordSpecificFilters( Map < String, String[] > requestParameters )
  {
    String[] subjectSubTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_SUBTYPE_PARAM_SUFFIX );
    String[] subjectPluralTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_PLURAL_TYPE_PARAM_SUFFIX );
    String[] subjectCaseTypeOptions = requestParameters.get( WORD_TYPE.name() + WORD_CASE_TYPE_PARAM_SUFFIX );

    if ( subjectSubTypeOptions != null )
    {
      List< String > filters = FilteringUtil.assembleWordTypeFilters( WORD_TYPE, subjectSubTypeOptions );
      int additionalSpaces = 0;

      if ( subjectPluralTypeOptions != null )
      {
        filters.addAll( FilteringUtil.createVariations( filters, subjectPluralTypeOptions ) );
        additionalSpaces++;
      }

      if ( subjectCaseTypeOptions != null )
      {
        filters.addAll( FilteringUtil.createVariations( filters, subjectCaseTypeOptions ) );
        additionalSpaces++;
      }

      if ( additionalSpaces != 0 )
      {
        int finalAdditionalSpaces = additionalSpaces;
        filters.removeIf(f -> !FilteringUtil.hasMatchingNumberOfSpaces( f, finalAdditionalSpaces) );
      }

      return filters;
    }

    return List.of( WORD_TYPE.getValue() );
  }
}
