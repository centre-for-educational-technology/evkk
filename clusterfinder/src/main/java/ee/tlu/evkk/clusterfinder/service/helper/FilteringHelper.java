package ee.tlu.evkk.clusterfinder.service.helper;

import ee.tlu.evkk.clusterfinder.constants.SortingType;
import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.service.model.ClusterEntry;

import java.util.Arrays;
import java.util.List;

public final class FilteringHelper
{
  private static final int POSITION_OFFSET = 1;

  public static boolean filterEntries( ClusterEntry entry, ClusterSearchForm searchForm )
  {
    if ( searchForm.getFilters().isEmpty() )
    {
      return true;
    }

    return filterByPosition( searchForm, entry );
  }

  private static boolean filterByPosition(ClusterSearchForm searchForm, ClusterEntry entry)
  {
    SortingType sortingType = searchForm.getSortingType();
    if ( sortingType == SortingType.BY_FREQUENCY )
    {
      return true;
    }

    String markupAtPosition = entry.getMarkups().get( sortingType.ordinal() - POSITION_OFFSET );
    if ( searchForm.isPartialFilters() && searchForm.isMorfoOrMorfoSyntacticAnalysis() )
    {
      return filterEntryPartially( markupAtPosition, searchForm );
    }

    return searchForm.getFilters().contains( markupAtPosition );
  }

  /**
   * Filters the entry partially.
   *
   * @param comparableMarkup - the markup that is being matched.
   * @param searchForm - the provided search form, which contains the desired filters.
   * @return Whether or not the entry's markup matches partially with the given search form's filters.
   */
  private static boolean filterEntryPartially( String comparableMarkup, ClusterSearchForm searchForm )
  {
    List< String > splitMarkup = Arrays.asList( comparableMarkup.split( " " ) );
    for ( String filter : searchForm.getFilters() )
    {
      List< String > splitFilter = Arrays.asList( filter.split( " " ) );
      if ( splitMarkup.containsAll( splitFilter ) )
      {
        return true;
      }
    }

    return false;
  }
}
