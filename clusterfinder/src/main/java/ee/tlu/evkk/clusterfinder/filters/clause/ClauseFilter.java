package ee.tlu.evkk.clusterfinder.filters.clause;

import java.util.List;
import java.util.Map;

public interface ClauseFilter
{
  List < String > getClauseFilters(Map<String, String[]> requestParameters);
}
