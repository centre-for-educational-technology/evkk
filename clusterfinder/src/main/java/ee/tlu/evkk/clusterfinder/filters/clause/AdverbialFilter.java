package ee.tlu.evkk.clusterfinder.filters.clause;

import ee.tlu.evkk.clusterfinder.constants.ClauseType;

import java.util.List;
import java.util.Map;

public class AdverbialFilter implements ClauseFilter
{
  @Override
  public List<String> getClauseFilters(Map<String, String[]> requestParameters)
  {
    return List.of( ClauseType.ADVERBIAL.getValue() );
  }
}