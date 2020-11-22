package ee.tlu.evkk.clusterfinder.filters.clausetype;

import ee.tlu.evkk.clusterfinder.constants.ClauseType;

import java.util.List;
import java.util.Map;

public class BasisFilter implements ClauseTypeFilter
{
  @Override
  public List<String> getClauseTypeFilters(Map<String, String[]> requestParameters)
  {
    return List.of( ClauseType.BASIS.getValue() );
  }
}
