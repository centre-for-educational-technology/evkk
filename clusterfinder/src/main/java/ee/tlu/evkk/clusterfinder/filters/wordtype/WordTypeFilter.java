package ee.tlu.evkk.clusterfinder.filters.wordtype;

import java.util.List;
import java.util.Map;

public interface WordTypeFilter
{
  // TODO: Maybe replace with a Set instead
  List < String > getWordTypeFilters(Map<String, String[]> requestParameters);
}
