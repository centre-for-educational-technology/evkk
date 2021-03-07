package ee.tlu.evkk.clusterfinder.filters.util;

import ee.tlu.evkk.clusterfinder.constants.FilteringConstants;
import ee.tlu.evkk.clusterfinder.constants.WordType;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Predicate;

public final class FilteringUtil
{
  private static final int MINIMUM_NUMBER_OF_SPACES_IN_FILTERS = 1;

  public static List < String > assembleWordTypeFilters( WordType wordType, String[] wordOptions )
  {
    List < String > filters = new ArrayList<>();
    for ( String wordOption : wordOptions )
    {
      filters.add( formatWordOption( wordType, wordOption ) );
    }

    return filters;
  }

  private static String formatWordOption(WordType wordType, String wordOption)
  {
    return StringUtils.prependIfMissingIgnoreCase( wordOption, wordType.getValue() + StringUtils.SPACE );
  }

  public static Set< String > createVariations( List< String > initialFilters, String[] additionalOptions )
  {
    Set< String > additionalFilters = new HashSet<>();
    for ( String filter : initialFilters )
    {
      for ( String additionalOption : additionalOptions )
      {
        additionalFilters.add( filter + StringUtils.SPACE + additionalOption );
      }
    }

    return additionalFilters;
  }

  public static Set< String > createVariations(List < String > initialFilters, Predicate< String > condition, String[] additionalOptions )
  {
    Set< String > additionalFilters = new HashSet<>();
    for ( String filter : initialFilters )
    {
      if ( condition.test( filter ) )
      {
        for ( String additionalOption : additionalOptions )
        {
          additionalFilters.add( filter + StringUtils.SPACE + additionalOption );
        }
      }
    }

    return additionalFilters;
  }

  public static boolean hasMatchingNumberOfSpaces( String filter, int additionalSpaces )
  {
    return StringUtils.countMatches( filter, " " ) == MINIMUM_NUMBER_OF_SPACES_IN_FILTERS + additionalSpaces;
  }

  public static List< String > getUnionizedFilters( List < String > wordTypeFilters, List < String > clauseTypeFilters )
  {
    List< String > filters = new ArrayList<>();
    for( String wordTypeFilter : wordTypeFilters )
    {
      for ( String clauseTypeFilter : clauseTypeFilters )
      {
        filters.add( joinFilters( wordTypeFilter, clauseTypeFilter ) );
      }
    }

    return filters;
  }

  private static String joinFilters(String wordTypeFilter, String clauseTypeFilter)
  {
    return wordTypeFilter + StringUtils.SPACE + FilteringConstants.CLAUSE_TYPE_SEPARATOR + StringUtils.SPACE + clauseTypeFilter;
  }
}
