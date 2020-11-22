package ee.tlu.evkk.clusterfinder.filters;

import ee.tlu.evkk.clusterfinder.filters.clausetype.ClauseTypeFilter;
import ee.tlu.evkk.clusterfinder.filters.wordtype.WordTypeFilter;

import java.util.List;
import java.util.Map;

public class AllFilter implements WordTypeFilter, ClauseTypeFilter
{
  @Override
  public List<String> getClauseTypeFilters(Map<String, String[]> requestParameters)
  {
    return List.of();
  }

  @Override
  public List<String> getWordTypeFilters(Map<String, String[]> requestParameters)
  {
    return List.of();
  }
}
