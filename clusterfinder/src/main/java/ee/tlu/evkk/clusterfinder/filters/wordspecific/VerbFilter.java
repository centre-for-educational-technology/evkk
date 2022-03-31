package ee.tlu.evkk.clusterfinder.filters.wordspecific;

import ee.tlu.evkk.clusterfinder.constants.FilteringConstants;
import ee.tlu.evkk.clusterfinder.constants.WordType;
import ee.tlu.evkk.clusterfinder.filters.util.FilteringUtil;
import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

import static ee.tlu.evkk.clusterfinder.constants.FilteringConstants.*;

public class VerbFilter implements WordSpecificFilter
{
  private static final WordType WORD_TYPE = WordType.VERB;

  private static final String WORD_TYPE_NAME = WORD_TYPE.name();

  private static final String FINITE_TYPE_PARAM = WORD_TYPE_NAME + "-finitetype[]";

  private static final String TIME_TYPE_PARAM = WORD_TYPE_NAME + "-timeType[]";

  private static final String SPEECH_TYPE_PARAM = WORD_TYPE_NAME + "-speechtype[]";

  private static final String VOICE_TYPE_PARAM = WORD_TYPE_NAME + "-voiceType[]";

  private static final String SPEECH_SUBTYPE_PARAM = WORD_TYPE_NAME + "-speechsubtype[]";

  private static final String SUBTYPE_VK_PARAM = WORD_TYPE_NAME + "-subtypeVK[]";

  private static final String SUBTYPE_VK_PARTIC_PARAM = WORD_TYPE_NAME + "-subtypeVKPartic[]";

  private static final String SUBTYPE_VK_SUP_PARAM = WORD_TYPE_NAME + "-subtypeVKSup[]";

  private static final Predicate< String > IS_PARTIC_OPTION = v -> StringUtils.contains( v, "partic" );

  private static final Predicate< String > IS_SUP_OPTION = v -> StringUtils.contains( v, "sup" );

  @Override
  public List < String > getWordSpecificFilters( Map < String, String[] > requestParameters )
  {
    String[] verbSubTypeOptions = requestParameters.get( WORD_TYPE_NAME + WORD_SUBTYPE_PARAM_SUFFIX );
    if ( verbSubTypeOptions != null )
    {
      List< String > filters = FilteringUtil.assembleWordTypeFilters( WORD_TYPE, verbSubTypeOptions );

      if ( isDeclinableTypeSelected( requestParameters ) )
      {
        return createDeclibaleTypeFilters( filters, requestParameters );
      }

      if ( isFiniteTypeSelected( requestParameters ) )
      {
        return createFiniteTypeFilters( filters, requestParameters );
      }
    }

    return List.of( WORD_TYPE.getValue() );
  }

  private List<String> createDeclibaleTypeFilters( List< String > initialFilters, Map<String, String[]> requestParameters )
  {
    String[] verbVKSubTypeOptions = requestParameters.get( SUBTYPE_VK_PARAM );
    String[] verbVKParticOptions = requestParameters.get( SUBTYPE_VK_PARTIC_PARAM );
    String[] verbVKSupOptions = requestParameters.get( SUBTYPE_VK_SUP_PARAM );

    int additionalSpaces = 0;

    if ( verbVKSubTypeOptions != null )
    {
      initialFilters.addAll( FilteringUtil.createVariations( initialFilters, verbVKSubTypeOptions ) );
      additionalSpaces++;
    }

    if ( verbVKParticOptions != null )
    {
      initialFilters.addAll( FilteringUtil.createVariations( initialFilters, IS_PARTIC_OPTION, verbVKParticOptions ) );
      additionalSpaces++;
    }

    if ( verbVKSupOptions != null )
    {
      initialFilters.addAll( FilteringUtil.createVariations( initialFilters, IS_SUP_OPTION, verbVKSupOptions ) );
      additionalSpaces++;
    }

    if ( additionalSpaces != 0 )
    {
      int finalAdditionalSpaces = additionalSpaces;
      initialFilters.removeIf( f -> ( IS_PARTIC_OPTION.test( f ) || IS_SUP_OPTION.test( f ) ) && !FilteringUtil.hasMatchingNumberOfSpaces( f, finalAdditionalSpaces ) );
    }

    return initialFilters;
  }

  private List< String > createFiniteTypeFilters( List< String > initialFilters, Map< String, String[] > requestParameters )
  {
    String[] verbSpeechTypeOptions = requestParameters.get( SPEECH_TYPE_PARAM );
    String[] verbTimeTypeOptions = requestParameters.get( TIME_TYPE_PARAM );
    String[] verbVoiceTypeOptions = requestParameters.get( VOICE_TYPE_PARAM );
    String[] verbPerspectiveTypeOptions = requestParameters.get( WORD_TYPE_NAME + WORD_PERSPECTIVE_TYPE_PARAM_SUFFIX );
    String[] verbPluralTypeOptions = requestParameters.get( WORD_TYPE_NAME + WORD_PLURAL_TYPE_PARAM_SUFFIX );
    String[] verbSpeechSubTypeOptions = requestParameters.get( SPEECH_SUBTYPE_PARAM );

    int additionalSpaces = 0;

    if ( verbSpeechTypeOptions != null )
    {
      initialFilters.addAll( FilteringUtil.createVariations( initialFilters, verbSpeechTypeOptions ) );
      additionalSpaces++;
    }

    if ( verbTimeTypeOptions != null )
    {
      initialFilters.addAll( FilteringUtil.createVariations( initialFilters, verbTimeTypeOptions ) );
      additionalSpaces++;
    }

    if ( verbVoiceTypeOptions != null )
    {
      initialFilters.addAll( FilteringUtil.createVariations( initialFilters, verbVoiceTypeOptions ) );
      additionalSpaces++;
    }

    if ( verbPerspectiveTypeOptions != null )
    {
      initialFilters.addAll( FilteringUtil.createVariations( initialFilters, verbPerspectiveTypeOptions ) );
      additionalSpaces++;
    }

    if ( verbPluralTypeOptions != null )
    {
      initialFilters.addAll( FilteringUtil.createVariations( initialFilters, verbPluralTypeOptions ) );
      additionalSpaces++;
    }

    if ( verbSpeechSubTypeOptions != null )
    {
      initialFilters.addAll( FilteringUtil.createVariations( initialFilters, verbSpeechSubTypeOptions ) );
      additionalSpaces++;
    }

    if ( additionalSpaces != 0 )
    {
      int finalAdditionalSpaces = additionalSpaces;
      initialFilters.removeIf( f -> !FilteringUtil.hasMatchingNumberOfSpaces( f, finalAdditionalSpaces ) );
    }

    return initialFilters;
  }

  private boolean isFiniteTypeSelected( Map < String, String[] > requestParameters )
  {
    String[] verbFiniteTypeOptions = requestParameters.get( FINITE_TYPE_PARAM );
    return verbFiniteTypeOptions != null && verbFiniteTypeOptions[0].equals( "VP" );
  }

  private boolean isDeclinableTypeSelected( Map < String, String[] > requestParameters )
  {
    String[] verbFiniteOptions = requestParameters.get( FINITE_TYPE_PARAM );
    return verbFiniteOptions != null && verbFiniteOptions[0].equals( "VK" );
  }
}
