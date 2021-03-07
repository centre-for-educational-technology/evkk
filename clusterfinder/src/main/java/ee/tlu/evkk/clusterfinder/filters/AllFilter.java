package ee.tlu.evkk.clusterfinder.filters;

import ee.tlu.evkk.clusterfinder.filters.clause.ClauseFilter;
import ee.tlu.evkk.clusterfinder.filters.wordspecific.WordSpecificFilter;

import java.util.List;
import java.util.Map;

public class AllFilter implements WordSpecificFilter, ClauseFilter
{
  @Override
  public List<String> getClauseFilters(Map<String, String[]> requestParameters)
  {
    return List.of();
  }

  @Override
  public List<String> getWordSpecificFilters(Map<String, String[]> requestParameters)
  {
    return List.of();
  }
}
