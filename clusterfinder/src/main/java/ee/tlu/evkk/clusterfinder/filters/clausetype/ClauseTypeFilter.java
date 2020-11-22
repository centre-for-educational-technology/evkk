package ee.tlu.evkk.clusterfinder.filters.clausetype;

import java.util.List;
import java.util.Map;

public interface ClauseTypeFilter
{
  // TODO: Maybe replace with a Set instead
  List < String > getClauseTypeFilters(Map<String, String[]> requestParameters);
}
