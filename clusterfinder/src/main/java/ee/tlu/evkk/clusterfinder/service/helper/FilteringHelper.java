package ee.tlu.evkk.clusterfinder.service.helper;

import ee.tlu.evkk.clusterfinder.constants.SortingType;
import ee.tlu.evkk.clusterfinder.model.ClusterSearchForm;
import ee.tlu.evkk.clusterfinder.service.model.ClusterEntry;

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

    return searchForm.getFilters().contains( entry.getMarkups().get( sortingType.ordinal() - POSITION_OFFSET ) );
  }
}
